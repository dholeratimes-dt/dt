import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const React = require("react");
const { JSDOM } = require("jsdom");
const { transformSync } = require("next/dist/build/swc");
const base = new URL("../src/", import.meta.url);

function compile(path) {
  return transformSync(readFileSync(new URL(path, base), "utf8"), {
    filename: path,
    jsc: {
      parser: { syntax: "ecmascript", jsx: true },
      transform: { react: { runtime: "automatic" } },
      target: "es2020",
    },
    module: { type: "commonjs" },
  }).code;
}

function apiHarness(env = {}, options = {}) {
  const calls = [];
  const compiledModule = { exports: {} };
  vm.runInNewContext(compile("app/(main)/api/submit-form/route.js"), {
    module: compiledModule, exports: compiledModule.exports,
    process: { env: {
      SITE_KEY: "public-site-key",
      RECAPTCHA_SECRET_KEY: "private-captcha-secret",
      TELECRM_API_KEY: "private-crm-key",
      ...env,
    } },
    console: { error() {} },
    URLSearchParams, AbortSignal,
    require: () => ({ NextResponse: { json: Response.json } }),
    fetch: async (url, init) => {
      calls.push({ url, init });
      if (url.includes("siteverify")) {
        if (options.offline) throw new Error("offline");
        return Response.json({ success: options.verified !== false });
      }
      return new Response(options.crmBody ?? "OK", { status: options.crmStatus ?? 200 });
    },
  });
  return {
    ...compiledModule.exports, calls,
    post: (payload = {}) => compiledModule.exports.POST(new Request("https://example.com/api/submit-form", {
      method: "POST",
      body: JSON.stringify({
        fields: { name: " Test Person ", phone: "+91 99999 99999", email: "test@example.com" },
        source: "Dholera Times Website",
        tags: ["Website Lead"],
        ...payload,
      }),
    })),
  };
}

test("configuration supports the deployed SITE_KEY name and exposes no secrets", async () => {
  const api = apiHarness();
  const response = await api.GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { siteKey: "public-site-key" });
  assert.equal(response.headers.get("cache-control"), "no-store");
  const preferred = apiHarness({ NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "public-override" });
  assert.equal((await (await preferred.GET()).json()).siteKey, "public-override");
  assert.equal((await apiHarness({ SITE_KEY: "" }).GET()).status, 503);
});

test("verified submissions use server credentials and retain lead fields and tags", async () => {
  const api = apiHarness({}, { crmBody: "" });
  const response = await api.post({ recaptchaToken: "valid-token" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(api.calls.length, 2);
  assert.equal(api.calls[0].init.body.get("response"), "valid-token");
  assert.equal(api.calls[0].init.body.get("secret"), "private-captcha-secret");
  assert.equal(api.calls[1].init.headers.Authorization, "Bearer private-crm-key");
  const payload = JSON.parse(api.calls[1].init.body);
  assert.equal(payload.fields.name, "Test Person");
  assert.equal(payload.fields.phone, "919999999999");
  assert.equal(payload.fields.email, "test@example.com");
  assert.equal(payload.source, "Dholera Times Website");
  assert.deepEqual(payload.tags, ["Website Lead"]);
  assert.equal("recaptchaToken" in payload, false);
});

test("empty, rejected, or unavailable CAPTCHA never creates a CRM lead", async () => {
  for (const token of ["", null, 12]) {
    const api = apiHarness();
    assert.equal((await api.post({ recaptchaToken: token })).status, 400);
    assert.equal(api.calls.length, 0);
  }
  const rejected = apiHarness({}, { verified: false });
  assert.equal((await rejected.post({ recaptchaToken: "expired" })).status, 400);
  assert.equal(rejected.calls.length, 1);
  const offline = apiHarness({}, { offline: true });
  assert.equal((await offline.post({ recaptchaToken: "token" })).status, 503);
  assert.equal(offline.calls.length, 1);
  const missingSecret = apiHarness({ RECAPTCHA_SECRET_KEY: "" });
  assert.equal((await missingSecret.post({ recaptchaToken: "token" })).status, 503);
  assert.equal(missingSecret.calls.length, 0);
});

test("existing forms without CAPTCHA keep their API contract and CRM errors remain failures", async () => {
  const api = apiHarness();
  assert.equal((await api.post()).status, 200);
  assert.equal(api.calls.length, 1);
  assert.ok(api.calls[0].url.includes("telecrm"));
  const failed = apiHarness({}, { crmStatus: 500 });
  assert.equal((await failed.post({ recaptchaToken: "valid" })).status, 502);
});

const tick = () => new Promise((resolve) => setImmediate(resolve));

function uiHarness() {
  const dom = new JSDOM('<body><div id="root"></div><button data-open-dholera-popup>Open</button></body>', {
    url: "https://www.dholeratimes.com/contact/inquiry?gad_source=test",
  });
  Object.assign(globalThis, {
    window: dom.window, document: dom.window.document,
    Element: dom.window.Element, HTMLElement: dom.window.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  const { createRoot } = require("react-dom/client");
  const root = createRoot(document.getElementById("root"));
  const cache = new Map();
  const calls = [];
  const widgets = [];
  const resets = [];
  let respond = () => Response.json({ success: true });
  let configure = () => Response.json({ siteKey: "public-site-key" });
  let pathname = "/contact/inquiry";
  const api = {
    ready: (fn) => fn(),
    render: (element, options) => {
      const id = widgets.length;
      widgets.push({ element, options });
      element.innerHTML = '<div data-mock-captcha>Verify</div>';
      return id;
    },
    reset: (id) => { assert.equal(typeof id, "number"); resets.push(id); },
    execute: () => assert.fail("Checkbox widgets must not call execute()"),
  };
  window.grecaptcha = api;
  const motion = new Proxy({}, { get: (target, tag) => {
    target[tag] ||= React.forwardRef(function Motion(props, ref) {
      const { initial, animate, exit, transition, whileHover, whileTap, variants, ...rest } = props;
      return React.createElement(tag, { ...rest, ref });
    });
    return target[tag];
  } });

  function load(path) {
    if (cache.has(path)) return cache.get(path).exports;
    const compiledModule = { exports: {} };
    cache.set(path, compiledModule);
    vm.runInNewContext(compile(path), {
      module: compiledModule, exports: compiledModule.exports,
      window, document, Element, HTMLElement, URLSearchParams, AbortSignal,
      localStorage: window.localStorage,
      console,
      setTimeout: (...args) => { const timer = setTimeout(...args); timer.unref(); return timer; },
      clearTimeout, setInterval, clearInterval,
      fetch: async (url, init) => {
        calls.push({ url, init });
        return init?.method === "POST" ? respond(url, init) : configure();
      },
      require: (name) => {
        if (name.startsWith("@/")) return load(`${name.slice(2)}.js`);
        if (name === "./popupTriggers") return load("app/(main)/components/home2/popupTriggers.js");
        if (name === "framer-motion") return { motion, AnimatePresence: ({ children }) => children };
        if (name === "lucide-react") return new Proxy({}, {
          get: () => (props) => React.createElement("svg", props),
        });
        if (name === "next/navigation") return { usePathname: () => pathname };
        if (name === "next/link") return { default: (props) => React.createElement("a", props) };
        if (name === "../../dholera-sir/LeadForm") return { default: () => null };
        return require(name);
      },
    });
    return compiledModule.exports;
  }

  return {
    dom, calls, widgets, resets, api, load,
    respondWith: (fn) => { respond = fn; },
    configureWith: (fn) => { configure = fn; },
    setPath: (value) => { pathname = value; },
    async mount(...paths) {
      await React.act(async () => {
        root.render(React.createElement(React.Fragment, null, ...paths.map((entry) => {
          const { path, props } = typeof entry === "string" ? { path: entry } : entry;
          return React.createElement(load(path).default, { key: path, initiallyOpen: true, ...props });
        })));
        await tick();
      });
    },
    async fill(form, values) {
      await React.act(async () => {
        for (const [name, value] of Object.entries(values)) {
          const input = form.querySelector(`[name="${name}"]`);
          Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(input, value);
          input.dispatchEvent(new window.Event("input", { bubbles: true }));
        }
      });
    },
    async submit(form) {
      await React.act(async () => {
        form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
        await tick();
      });
    },
    async complete(id, token = `token-${id}`) {
      await React.act(async () => { widgets[id].options.callback(token); await tick(); });
    },
    async close() {
      await React.act(async () => root.unmount());
      dom.window.close();
    },
  };
}

const popup = "app/(main)/components/home2/PopUpForm.jsx";
const sidebar = "app/(main)/dholera-updates/latest-updates/Sidebar.jsx";
const contact = "app/(main)/components/NewContactForm.jsx";
const posts = (ui) => ui.calls.filter(({ init }) => init?.method === "POST");

test("all three forms can submit on one page without sharing widgets or sending duplicate leads", async () => {
  const ui = uiHarness();
  try {
    await ui.mount(popup, sidebar, contact);
    const popupForm = document.querySelector("#common-popup-callback-btn").form;
    const sidebarForm = document.querySelector("#dholera-news-advisor-btn").form;
    const contactForm = document.querySelector("#contact-us-send-enquiry").form;
    await ui.fill(popupForm, { fullName: "Popup Person", mobileNumber: "9999999999" });
    await ui.fill(sidebarForm, { fullName: "Sidebar Person", phone: "8888888888" });
    await ui.fill(contactForm, { fullName: "Contact Person", phone: "+91 77777 77777", email: "person@example.com" });
    for (const form of [popupForm, sidebarForm, contactForm]) await ui.submit(form);
    await ui.submit(popupForm);
    assert.equal(ui.calls.filter(({ init }) => init?.method !== "POST").length, 1);
    assert.equal(ui.widgets.length, 3);
    assert.equal(posts(ui).length, 0);
    await ui.complete(1);
    assert.equal(posts(ui).length, 1);
    assert.equal(JSON.parse(posts(ui)[0].init.body).fields.name, "Sidebar Person");
    await ui.complete(0);
    await ui.complete(2);
    assert.equal(posts(ui).length, 3);
    const enquiry = JSON.parse(posts(ui)[2].init.body);
    assert.equal(enquiry.fields.phone, "917777777777");
    assert.equal(enquiry.fields.email, "person@example.com");
    assert.equal(enquiry.fields.source, "Dholera Times Google Ads");
    assert.deepEqual(ui.resets, [1, 0, 2]);
    assert.equal(window.dataLayer[0].event, "lead_form");
    assert.equal(contactForm.querySelector('[name="fullName"]').value, "");
  } finally { await ui.close(); }
});

test("verification and API errors preserve inputs, release the button, and allow retry with widget ID zero", async () => {
  const ui = uiHarness();
  try {
    await ui.mount(contact);
    const button = document.querySelector("#contact-us-send-enquiry");
    const form = button.form;
    await ui.fill(form, { fullName: "Retry Person", phone: "9999999999" });
    await ui.submit(form);
    await React.act(async () => { ui.widgets[0].options["error-callback"](); await tick(); });
    assert.equal(button.disabled, false);
    assert.equal(form.querySelector('[name="fullName"]').value, "Retry Person");
    assert.equal(posts(ui).length, 0);
    ui.respondWith(() => Response.json({ error: "Please retry" }, { status: 502 }));
    await ui.submit(form);
    await ui.complete(0);
    assert.equal(button.disabled, false);
    assert.match(document.querySelector('[role="alert"]').textContent, /Please retry/);
    ui.respondWith(() => Response.json({ success: true }));
    await ui.submit(form);
    await ui.complete(0, "fresh-token");
    assert.equal(ui.widgets.length, 1);
    assert.equal(posts(ui).length, 2);
    assert.equal(window.localStorage.getItem("formSubmissionCount"), "1");
  } finally { await ui.close(); }
});

test("closing and reopening the common popup cancels verification and creates a fresh widget", async () => {
  const ui = uiHarness();
  try {
    await ui.mount(popup);
    let form = document.querySelector("#common-popup-callback-btn").form;
    await ui.fill(form, { fullName: "Popup Person", mobileNumber: "9999999999" });
    await ui.submit(form);
    await React.act(async () => { document.querySelector('[aria-label="Close popup"]').click(); await tick(); });
    await ui.complete(0, "late-token");
    assert.equal(posts(ui).length, 0);
    await React.act(async () => { document.querySelector('[data-open-dholera-popup]').click(); await tick(); });
    form = document.querySelector("#common-popup-callback-btn").form;
    await ui.submit(form);
    assert.equal(ui.widgets.length, 2);
    await ui.complete(0, "old-widget-token");
    assert.equal(posts(ui).length, 0);
    await ui.complete(1, "new-widget-token");
    assert.equal(posts(ui).length, 1);
    assert.equal(JSON.parse(posts(ui)[0].init.body).recaptchaToken, "new-widget-token");
  } finally { await ui.close(); }
});

test("script loading is shared, waits for render(), and can retry after a network failure", async () => {
  const ui = uiHarness();
  try {
    delete window.grecaptcha;
    const loader = ui.load("lib/recaptchaClient.js").loadRecaptcha;
    const first = loader();
    const second = loader();
    const firstFailed = assert.rejects(first, /could not load/);
    const secondFailed = assert.rejects(second, /could not load/);
    await tick();
    assert.equal(document.querySelectorAll('script[src*="/recaptcha/api.js"]').length, 1);
    document.querySelector("script").dispatchEvent(new window.Event("error"));
    await Promise.all([firstFailed, secondFailed]);
    let settled = false;
    const retry = loader().then((result) => { settled = true; return result; });
    await tick();
    document.querySelector("script").dispatchEvent(new window.Event("load"));
    await tick();
    assert.equal(settled, false);
    window.grecaptcha = ui.api;
    assert.equal((await retry).api, ui.api);
  } finally { await ui.close(); }
});

test("configuration failures can retry without refreshing the page", async () => {
  const ui = uiHarness();
  try {
    ui.configureWith(() => Response.json({ error: "Temporarily unavailable" }, { status: 503 }));
    const loader = ui.load("lib/recaptchaClient.js").loadRecaptcha;
    await assert.rejects(loader(), /Temporarily unavailable/);
    ui.configureWith(() => Response.json({ siteKey: "restored-public-key" }));
    assert.equal((await loader()).siteKey, "restored-public-key");
    assert.equal(ui.calls.length, 2);
  } finally { await ui.close(); }
});

test("popup keeps its configured scroll threshold, once-per-visit behavior, and manual triggers", async () => {
  const ui = uiHarness();
  const closedPopup = { path: popup, props: { initiallyOpen: false } };
  const isOpen = () => Boolean(document.querySelector("#common-popup-callback-btn"));
  const scroll = async (offset) => {
    await React.act(async () => {
      window.pageYOffset = offset;
      window.dispatchEvent(new window.Event("scroll"));
      await tick();
    });
  };
  try {
    ui.setPath("/about");
    await ui.mount(closedPopup);
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 2000 });
    Object.defineProperty(document.documentElement, "clientHeight", { value: 1000 });
    await scroll(449);
    assert.equal(isOpen(), false);
    await scroll(450);
    assert.equal(isOpen(), true);
    await React.act(async () => document.querySelector('[aria-label="Close popup"]').click());
    await scroll(600);
    assert.equal(isOpen(), false);
    ui.setPath("/dholera-sir");
    await ui.mount(closedPopup);
    await scroll(450);
    assert.equal(isOpen(), true);
    ui.setPath("/contact/inquiry");
    await ui.mount(closedPopup);
    await scroll(800);
    assert.equal(isOpen(), false);
    await React.act(async () => document.querySelector('[data-open-dholera-popup]').click());
    assert.equal(isOpen(), true);
  } finally { await ui.close(); }
});

test("expired CAPTCHA releases the form and invalid phone numbers never start verification", async () => {
  const ui = uiHarness();
  try {
    await ui.mount(contact);
    const button = document.querySelector("#contact-us-send-enquiry");
    const form = button.form;
    await ui.fill(form, { fullName: "Test Person", phone: "123" });
    await ui.submit(form);
    assert.equal(ui.widgets.length, 0);
    assert.equal(posts(ui).length, 0);
    await ui.fill(form, { phone: "9999999999" });
    await ui.submit(form);
    await React.act(async () => { ui.widgets[0].options["expired-callback"](); await tick(); });
    assert.equal(button.disabled, false);
    assert.match(document.querySelector('[role="alert"]').textContent, /expired/);
    assert.equal(posts(ui).length, 0);
  } finally { await ui.close(); }
});
