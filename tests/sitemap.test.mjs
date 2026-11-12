import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import { resolveBlogDates } from "../src/lib/blogDates.js";

const require = createRequire(import.meta.url);
const { transformSync } = require("next/dist/build/swc");
const { code } = transformSync(
  readFileSync(new URL("../src/app/sitemap.js", import.meta.url), "utf8"),
  {
    filename: "sitemap.js",
    jsc: { parser: { syntax: "ecmascript" }, target: "es2020" },
    module: { type: "commonjs" },
  },
);

async function generate({ blogs = [], updates = [], aboutDholera = [], redirects = [] } = {}) {
  const calls = [];
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, URL,
    require(name) {
      if (name === "@/lib/blogDates") return { resolveBlogDates };
      if (name !== "@/sanity/lib/client") throw new Error(`Unexpected import: ${name}`);
      return { client: { fetch: async (query, params, options) => {
        calls.push({ query, params, options });
        if (query.includes('_type == "redirect"')) return redirects;
        if (query.includes('"Blog" in categories')) return blogs;
        if (query.includes('"News" in categories')) return updates;
        if (query.includes('"project-Info" in categories')) return aboutDholera;
        throw new Error(`Unexpected query: ${query}`);
      } } };
    },
  });
  const pages = JSON.parse(JSON.stringify(await module.exports.default()));
  return { pages, calls };
}

const base = "https://www.dholeratimes.com";
const auditedPaths = [
  "/dholera-sir/about-dholera-sir",
  "/dholera-sir/mega-industries-in-dholera",
  "/dholera-updates/latest-updates/ahmedabad-dholera-expressway-december-2025",
  "/dholera-updates/blogs/dholera-international-airport-project",
  "/dholera-updates/latest-updates/dholera-international-airport-latest-news-2025",
];
const post = (slug) => ({
  slug,
  createdAt: "2026-10-01T09:00:00.000Z",
  publishedAt: "2026-11-01T09:00:00.000Z",
  _updatedAt: "2026-11-11T09:00:00.000Z",
});
const content = {
  blogs: [
    "dholera-international-airport-project",
    "what-is-dholera-sir-real-estate-investment-benefits",
    "the-top-10-companies-invested-in-dholera-smart-city",
    "about-dholera-sir", // Same slug, different section: this URL stays valid.
    "unrelated-blog",
  ].map(post),
  updates: [
    "ahmedabad-dholera-expressway-december-2025",
    "dholera-international-airport-latest-news-2025",
    "dholera-expressway-inauguration-gujarat-20000-cr-projects",
    "dholera-international-airport-nears-completion",
    "unrelated-news",
  ].map(post),
  aboutDholera: [
    "about-dholera-sir", "mega-industries-in-dholera",
    "international-airport-dholera", "unrelated-sir-page",
  ].map(post),
};

test("the five audited URLs are excluded and every other sitemap entry keeps its metadata", async () => {
  const { pages: before } = await generate(content);
  const { pages: after } = await generate({
    ...content,
    redirects: auditedPaths.map((source) => ({ source })),
  });
  assert.equal(after.length, before.length - 5);
  for (const path of auditedPaths) assert.ok(!after.some(({ url }) => url === base + path), path);
  for (const entry of before) {
    if (auditedPaths.includes(new URL(entry.url).pathname)) continue;
    assert.deepEqual(after.find(({ url }) => url === entry.url), entry, entry.url);
  }
  assert.ok(after.some(({ url }) => url === `${base}/dholera-updates/blogs/about-dholera-sir`));
});

test("new CMS redirect sources are excluded automatically, including temporary redirects", async () => {
  const { pages } = await generate({
    blogs: [post("future-moved-post"), post("future-moved-post-followup")],
    redirects: [{ source: "/dholera-updates/blogs/future-moved-post", permanent: false }],
  });
  assert.ok(!pages.some(({ url }) => url.endsWith("/future-moved-post")));
  assert.ok(pages.some(({ url }) => url.endsWith("/future-moved-post-followup")));
});

test("sitemap queries stay scoped to this site, preserve noindex exclusions and cache for 60 seconds", async () => {
  const { pages, calls } = await generate();
  assert.equal(pages.length, 8, "all eight existing static pages remain");
  assert.equal(calls.length, 4);
  for (const { query, options } of calls) {
    assert.ok(query.includes('site == "dholera-times"'));
    assert.equal(options.next.revalidate, 60);
    if (query.includes('_type == "post"')) {
      assert.ok(query.includes("coalesce(seo.noIndex, noIndex, false) == false"));
    }
  }
});
