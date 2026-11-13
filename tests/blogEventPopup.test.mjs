import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const React = require("react");
const { JSDOM } = require("jsdom");
const { transformSync } = require("next/dist/build/swc");
const source = readFileSync(new URL("../src/app/(main)/dholera-updates/blogs/BlogEventPopup.jsx", import.meta.url), "utf8");
const compiled = transformSync(source, {
  filename: "BlogEventPopup.jsx",
  jsc: {
    parser: { syntax: "ecmascript", jsx: true },
    transform: { react: { runtime: "automatic" } },
    target: "es2020",
  },
  module: { type: "commonjs" },
}).code;

function harness({ strictMode = false } = {}) {
  const dom = new JSDOM('<body style="overflow: auto"><button id="previous">Read blog</button><div id="root"></div></body>', {
    url: "https://www.dholeratimes.com/dholera-updates/blogs?utm_source=event-test",
  });
  Object.assign(globalThis, {
    window: dom.window, document: dom.window.document,
    HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true,
  });
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    queueMicrotask(() => this.dispatchEvent(new dom.window.Event("close")));
  };
  const { createRoot } = require("react-dom/client");
  const root = createRoot(document.getElementById("root"));
  const calls = [];
  let pathname = "/dholera-updates/blogs";
  let respond = () => Response.json({ success: true });
  const mod = { exports: {} };
  vm.runInNewContext(compiled, {
    module: mod, exports: mod.exports, window, document, HTMLElement,
    URLSearchParams, AbortSignal,
    fetch: async (url, init) => { calls.push({ url, init }); return respond(); },
    require: (name) => {
      if (name === "next/navigation") return { usePathname: () => pathname };
      if (name === "next/image") return { getImageProps: () => ({ props: { src: "/event.png", alt: "" } }) };
      if (name === "lucide-react") return new Proxy({}, {
        get: () => (props) => React.createElement("svg", props),
      });
      if (name.endsWith(".png")) return {};
      if (name.endsWith(".module.css")) return { default: {} };
      return require(name);
    },
  });
  return {
    calls,
    respondWith(fn) { respond = fn; },
    async render(path = pathname) {
      pathname = path;
      await React.act(async () => {
        const popup = React.createElement(mod.exports.default);
        root.render(strictMode ? React.createElement(React.StrictMode, null, popup) : popup);
      });
    },
    async fill(name, phone) {
      await React.act(async () => {
        for (const [field, value] of [["name", name], ["phone", phone]]) {
          const input = document.getElementById(`blog-event-${field}`);
          Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(input, value);
          input.dispatchEvent(new window.Event("input", { bubbles: true }));
        }
      });
    },
    async submit() {
      await React.act(async () => document.querySelector("form").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    },
    async close() {
      await React.act(async () => root.unmount());
      dom.window.close();
    },
  };
}

test("event registrations retain attribution, use the server API, and prevent duplicate submissions", async () => {
  const ui = harness();
  try {
    await ui.render();
    assert.ok(document.querySelector("dialog[open]"));
    await ui.fill("  Event Visitor  ", "9876543210");
    let resolve;
    ui.respondWith(() => new Promise((done) => { resolve = done; }));
    await ui.submit();
    await ui.submit();
    assert.equal(ui.calls.length, 1);
    assert.equal(document.querySelector('[type="submit"]').disabled, true);
    assert.equal(ui.calls[0].url, "/api/submit-form");
    const payload = JSON.parse(ui.calls[0].init.body);
    assert.equal(payload.fields.name, "Event Visitor");
    assert.equal(payload.fields.phone, "919876543210");
    assert.match(payload.fields.notes, /21-22 November 2026/);
    assert.match(payload.fields.notes, /utm_source: event-test/);
    assert.ok(payload.tags.includes("Blog Event Popup"));
    await React.act(async () => { resolve(Response.json({ success: true })); });
    assert.match(document.querySelector('[role="status"]').textContent, /Thank you for registering/);
    assert.equal(window.dataLayer[0].form_name, "blog_event_popup");
  } finally { await ui.close(); }
});

test("invalid details never reach CRM; rejected requests preserve input and allow retry", async () => {
  const ui = harness();
  try {
    await ui.render();
    await ui.fill(" ", "1234567890");
    await ui.submit();
    assert.equal(ui.calls.length, 0);
    await ui.fill("Retry Visitor", "9876543210");
    ui.respondWith(() => Response.json({ error: "CRM unavailable" }, { status: 502 }));
    await ui.submit();
    assert.match(document.querySelector('[role="alert"]').textContent, /Please try again/);
    assert.equal(document.getElementById("blog-event-name").value, "Retry Visitor");
    assert.equal(document.querySelector('[type="submit"]').disabled, false);
    ui.respondWith(() => Response.json({ success: false }));
    await ui.submit();
    assert.equal(document.querySelector('[role="status"]'), null);
    ui.respondWith(() => Response.json({ success: true }));
    await ui.submit();
    assert.ok(document.querySelector('[role="status"]'));
    assert.equal(ui.calls.length, 3);
  } finally { await ui.close(); }
});

test("Strict Mode keeps the popup open; closing restores focus and every blog visit reopens it", async () => {
  const ui = harness({ strictMode: true });
  try {
    document.getElementById("previous").focus();
    await ui.render();
    assert.equal(document.body.style.overflow, "hidden");
    await React.act(async () => document.querySelector('[aria-label="Close event popup"]').click());
    assert.equal(document.querySelector("dialog[open]"), null);
    assert.equal(document.body.style.overflow, "auto");
    assert.equal(document.activeElement.id, "previous");
    await ui.render();
    assert.equal(document.querySelector("dialog[open]"), null);
    await ui.render("/dholera-updates/blogs/example-article");
    assert.ok(document.querySelector("dialog[open]"));
    await React.act(async () => document.querySelector("dialog").dispatchEvent(new window.Event("cancel")));
    assert.equal(document.querySelector("dialog[open]"), null);
    assert.equal(document.body.style.overflow, "auto");
    await ui.render("/dholera-updates/blogs");
    assert.ok(document.querySelector("dialog[open]"), "Returning to the blog listing reopens the popup");
    await React.act(async () => document.querySelector('[aria-label="Close event popup"]').click());
    await ui.render("/dholera-updates/blogs/example-article");
    assert.ok(document.querySelector("dialog[open]"), "Returning to an article reopens the popup");
  } finally { await ui.close(); }
});
