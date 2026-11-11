import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const { transformSync } = require("next/dist/build/swc");
const source = readFileSync(new URL("../src/middleware.js", import.meta.url), "utf8");
const { code } = transformSync(source, {
  filename: "middleware.js",
  jsc: { parser: { syntax: "ecmascript" }, target: "es2020" },
  module: { type: "commonjs" },
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((done, fail) => { resolve = done; reject = fail; });
  return { promise, resolve, reject };
}

function setup() {
  let now = 1000;
  let respond = async () => [];
  const calls = [];
  const background = [];
  const module = { exports: {} };
  class Clock extends Date {
    static now() { return now; }
  }
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    Date: Clock,
    process: { env: { SITE_NAME: "dholera-times" } },
    console: { warn() {} },
    require(name) {
      if (name === "next/server") return {
        NextResponse: {
          next: () => ({ type: "next" }),
          redirect: (url, { status }) => ({ type: "redirect", url: url.toString(), status }),
        },
      };
      if (name === "@sanity/client") return {
        createClient: () => ({
          fetch: async (query, params) => { calls.push({ query, params }); return respond(); },
        }),
      };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  function nextUrl(value) {
    const url = new URL(value);
    url.clone = () => nextUrl(url.href);
    return url;
  }
  return {
    calls,
    background,
    advance(ms) { now += ms; },
    respondWith(fn) { respond = fn; },
    request(path = "/about", host = "www.dholeratimes.com") {
      return module.exports.middleware({
        nextUrl: nextUrl(`https://${host}${path}`),
        headers: new Map([["host", host]]),
      }, { waitUntil: promise => background.push(promise) });
    },
  };
}

const rule = (destination = "/new", permanent = true) => [
  { source: "/old", destination, permanent },
];

test("www normalization and the homepage do not need a CMS lookup", async () => {
  const app = setup();
  const canonical = await app.request("/old?utm_source=test", "dholeratimes.com");
  assert.equal(canonical.status, 301);
  assert.equal(canonical.url, "https://www.dholeratimes.com/old?utm_source=test");
  assert.equal((await app.request("/")).type, "next");
  assert.equal(app.calls.length, 0);
});

test("cold requests share one lookup and retain redirect status and query strings", async () => {
  const app = setup();
  const response = deferred();
  app.respondWith(() => response.promise);
  const requests = [app.request("/old?utm_source=test"), app.request("/about")];
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0].params.site, "dholera-times");
  response.resolve(rule("/new", false));
  const [redirect, page] = await Promise.all(requests);
  assert.equal(redirect.status, 302);
  assert.equal(redirect.url, "https://www.dholeratimes.com/new?utm_source=test");
  assert.equal(page.type, "next");
  await app.request();
  assert.equal(app.calls.length, 1);
});

test("expired rules serve immediately while one background lookup refreshes them", async () => {
  const app = setup();
  app.respondWith(async () => rule());
  await app.request();
  app.advance(60000);
  const refresh = deferred();
  app.respondWith(() => refresh.promise);
  const stale = await app.request("/old");
  assert.equal(stale.url, "https://www.dholeratimes.com/new");
  assert.equal(stale.status, 301);
  await app.request();
  assert.equal(app.calls.length, 2);
  assert.ok(app.background.length);
  refresh.resolve(rule("/updated"));
  await Promise.all(app.background);
  assert.equal((await app.request("/old")).url, "https://www.dholeratimes.com/updated");
  assert.equal(app.calls.length, 2);
});

test("failed refresh keeps successful rules and backs off before retrying", async () => {
  const app = setup();
  app.respondWith(async () => rule());
  await app.request();
  app.advance(60000);
  app.respondWith(async () => { throw new Error("CMS unavailable"); });
  assert.equal((await app.request("/old")).status, 301);
  await Promise.all(app.background);
  await app.request("/old");
  assert.equal(app.calls.length, 2);
  app.advance(5000);
  app.respondWith(async () => rule("/recovered"));
  await app.request();
  await Promise.all(app.background);
  assert.equal((await app.request("/old")).url, "https://www.dholeratimes.com/recovered");
  assert.equal(app.calls.length, 3);
});

test("an empty rule list is cached and an unsuccessful cold lookup can retry", async () => {
  const app = setup();
  app.respondWith(async () => { throw new Error("CMS unavailable"); });
  await assert.rejects(app.request(), /CMS unavailable/);
  app.respondWith(async () => []);
  await app.request();
  await app.request();
  assert.equal(app.calls.length, 2);
});
