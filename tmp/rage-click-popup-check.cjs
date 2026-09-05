const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { JSDOM } = require('jsdom');
const React = require('react');
const { transformSync } = require('next/dist/build/swc');

const dom = new JSDOM('<body><div id="root"></div><div id="target">Content</div></body>', { url: 'https://www.dholeratimes.com/about?utm_source=test' });
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
dom.window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
const { createRoot } = require('react-dom/client');
const listeners = new Map();
const originalAdd = document.addEventListener.bind(document);
const originalRemove = document.removeEventListener.bind(document);
document.addEventListener = (name, handler, options) => {
  if (options === true) listeners.set(name, handler);
  originalAdd(name, handler, options);
};
document.removeEventListener = (name, handler, options) => {
  if (listeners.get(name) === handler) listeners.delete(name);
  originalRemove(name, handler, options);
};
let pathname = '/about';
let now = 0;
let calls = [];
let respond = async () => ({ ok: true, json: async () => ({ success: true }) });
const source = fs.readFileSync('src/app/(main)/components/RageClickPopup.jsx', 'utf8');
const compiled = transformSync(source, {
  filename: 'RageClickPopup.jsx',
  jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } }, target: 'es2020' },
  module: { type: 'commonjs' },
}).code;
const mod = { exports: {} };
vm.runInNewContext(compiled, {
  module: mod, exports: mod.exports,
  require: (name) => name === 'next/navigation' ? { usePathname: () => pathname } : require(name),
  window, document, Element, HTMLElement, URLSearchParams,
  performance: { now: () => now },
  fetch: async (...args) => { calls.push(args); return respond(); },
});
const Popup = mod.exports.default;
let root;
const render = async () => { await React.act(async () => root.render(React.createElement(Popup))); };
const mount = async () => { root = createRoot(document.getElementById('root')); await render(); };
const unmount = async () => { await React.act(async () => root.unmount()); };
const visible = () => !!document.querySelector('dialog[open]');
async function click(overrides = {}, gap = 150) {
  now += gap;
  await React.act(async () => listeners.get('click')?.({ isTrusted: true, button: 0, detail: 1, clientX: 100, clientY: 100, target: document.getElementById('target'), ...overrides }));
}
async function rage() { for (let i = 0; i < 4; i++) await click(); }
async function fresh() {
  if (root) await unmount();
  window.localStorage.clear(); pathname = '/about'; calls = []; window.dataLayer = [];
  await mount();
}
async function fill(name, phone) {
  await React.act(async () => {
    for (const [id, value] of [['rage-popup-name', name], ['rage-popup-phone', phone]]) {
      const input = document.getElementById(id);
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new window.Event('input', { bubbles: true }));
    }
  });
}
async function submit() {
  await React.act(async () => document.querySelector('form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })));
}

(async () => {
  await mount();
  assert.equal(visible(), false, 'No popup on load');
  for (let i = 0; i < 5; i++) await click({}, 600);
  assert.equal(visible(), false, 'Slow clicks do not open');
  for (let i = 0; i < 5; i++) await click({ clientX: i * 100 });
  assert.equal(visible(), false, 'Scattered clicks do not open');
  for (let i = 0; i < 4; i++) await click({ detail: 0 });
  assert.equal(visible(), false, 'Keyboard clicks do not open');
  await click(); await click();
  listeners.get('scroll')();
  await click(); await click();
  assert.equal(visible(), false, 'Scrolling resets the sequence');
  pathname = '/'; await render();
  await click(); await click();
  assert.equal(visible(), false, 'Navigation resets the sequence');
  await click(); await click();
  assert.equal(visible(), true, 'Four nearby clicks open on homepage');
  assert.equal(document.querySelectorAll('input').length, 2, 'Only name and phone fields');
  assert.equal(window.localStorage.getItem('dt:rage-click-popup-shown'), 'true');
  await React.act(async () => document.querySelector('[aria-label="Close enquiry form"]').click());
  assert.equal(visible(), false);
  await rage(); assert.equal(visible(), false, 'No repeat after closing');
  pathname = '/about'; await render(); pathname = '/'; await render();
  await rage(); assert.equal(visible(), false, 'No repeat returning home');
  await unmount(); await mount(); await rage();
  assert.equal(visible(), false, 'No repeat after remount/reload');
  console.log('PASS: triggering, scroll/navigation reset, two fields, persistent dismissal');

  await fresh();
  const otherForm = document.createElement('form'); document.body.appendChild(otherForm);
  for (let i = 0; i < 4; i++) await click({ target: otherForm });
  assert.equal(visible(), false, 'Existing forms ignored'); otherForm.remove();
  pathname = '/studio'; await render(); await rage(); assert.equal(visible(), false);
  pathname = '/thankyou'; await render(); await rage(); assert.equal(visible(), false);
  pathname = '/about'; await render();
  window.localStorage.setItem('dt:rage-click-popup-shown', 'true');
  await rage(); assert.equal(visible(), false, 'Flag from another tab respected');
  console.log('PASS: existing forms, excluded routes, shared storage');

  await fresh(); await rage();
  await fill('   ', '123'); await submit();
  assert.equal(calls.length, 0, 'Invalid data never submitted');
  await fill('Test Visitor', '+91 98765 43210');
  let resolveResponse;
  respond = () => new Promise((resolve) => { resolveResponse = resolve; });
  await submit(); await submit();
  assert.equal(calls.length, 1, 'Double submission blocked');
  assert.equal(window.dataLayer.length, 0, 'No event before success');
  const payload = JSON.parse(calls[0][1].body);
  assert.equal(calls[0][0], '/api/submit-form');
  assert.equal(payload.fields.phone, '919876543210');
  assert.equal(payload.fields.email, undefined);
  assert.match(payload.fields.notes, /utm_source: test/);
  await React.act(async () => resolveResponse({ ok: true, json: async () => ({ success: true }) }));
  assert.match(document.querySelector('dialog').textContent, /Your request has been received/);
  assert.equal(window.dataLayer.length, 1, 'Exactly one success event');
  console.log('PASS: validation, payload, duplicate protection, success and tracking');

  await fresh(); await rage(); await fill('Test Visitor', '9876543210');
  respond = async () => ({ ok: false, json: async () => ({ error: 'Failed' }) });
  await submit();
  assert.equal(window.dataLayer.length, 0);
  assert.match(document.querySelector('[role="alert"]').textContent, /could not submit/);
  respond = async () => ({ ok: true, json: async () => ({ success: true }) });
  await submit(); assert.equal(calls.length, 2); assert.equal(window.dataLayer.length, 1);
  await unmount(); assert.equal(document.body.style.overflow, '');
  assert.equal(listeners.has('click'), false);
  console.log('PASS: failure/retry, no failed conversion, listener/scroll cleanup');
  console.log('All checks passed. CRM requests were mocked; no real leads sent.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
