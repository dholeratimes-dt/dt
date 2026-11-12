import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import nextConfig from "../next.config.mjs";
import {
  getRetiredRouteDestination,
  resolveRetiredHref,
} from "../src/lib/retiredRoutes.mjs";

const require = createRequire(import.meta.url);
const { getPathMatch } = require("next/dist/shared/lib/router/utils/path-match");
const { prepareDestination } = require("next/dist/shared/lib/router/utils/prepare-destination");
const redirects = await nextConfig.redirects();

function redirectFor(path) {
  const url = new URL(path, "https://www.dholeratimes.com");
  for (const rule of redirects) {
    const params = getPathMatch(rule.source, { removeUnnamedParams: true })(url.pathname);
    if (!params) continue;
    const { parsedDestination } = prepareDestination({
      destination: rule.destination,
      params,
      query: Object.fromEntries(url.searchParams),
      appendParamsToQuery: true,
    });
    return { rule, destination: parsedDestination.pathname, query: parsedDestination.query };
  }
}

const auditedPaths = [
  ["/bulk-land", "/contact/inquiry"],
  ["/dholera-residential-plots", "/dholera-updates/blogs/dholera-real-estate-market-outlook"],
  ["/dholera-residential-plots/westwyn-estate", "/contact/inquiry"],
  ["/dholera-residential-plots/westwyn-residency", "/contact/inquiry"],
  ["/infopack", "/dholera-sir"],
];

test("all five audited URLs permanently redirect to a final, active route", () => {
  for (const [source, destination] of auditedPaths) {
    const result = redirectFor(`${source}?utm_source=audit&gclid=test`);
    assert.equal(result?.rule.permanent, true, source);
    assert.equal(result.destination, destination, source);
    assert.equal(result.query.utm_source, "audit");
    assert.equal(result.query.gclid, "test");
    assert.deepEqual(Object.keys(result.query).sort(), ["gclid", "utm_source"]);
    assert.equal(redirectFor(destination), undefined, "destination must not redirect again");
    assert.equal(getRetiredRouteDestination(source), destination);
  }
});

test("retired child routes and older project aliases no longer end at a deleted page", () => {
  for (const source of ["/bulk-land/industrial", "/infopack/videos", "/infopack/Brochure", "/projects", "/projects/maple", "/posts/paradise-1"]) {
    let path = source;
    let hops = 0;
    while (redirectFor(path) && hops < 5) {
      path = redirectFor(path).destination;
      hops++;
    }
    assert.ok(hops > 0 && hops < 5, source);
    assert.ok(!getRetiredRouteDestination(path), source);
  }
  assert.equal(redirectFor("/infopack/videos").destination, "/gallery/dholera-sir-progress");
  assert.equal(redirectFor("/dholera-residential-plots/abcd-building").destination, "/dholera-sir/the-abcd-building-in-dholera");
  assert.equal(redirectFor("/dholera-residential-plots/dholera-connectivity").destination, "/dholera-sir/connectivity-makes-dholera-the-next-big-investment-hub");
});

test("CMS links resolve directly, including non-www URLs, casing and trailing slashes", () => {
  for (const [source, destination] of auditedPaths) {
    for (const prefix of ["", "https://www.dholeratimes.com", "http://dholeratimes.com", "//www.dholeratimes.com"]) {
      assert.equal(resolveRetiredHref(`${prefix}${source.toUpperCase()}/?utm_source=blog#details`), `${destination}?utm_source=blog#details`);
    }
  }
  assert.equal(resolveRetiredHref("/infopack/videos"), "/gallery/dholera-sir-progress");
});

test("unrelated paths, external links and non-web links are left intact", () => {
  for (const href of [
    "/dholera-sir", "/bulk-land-prices", "/infopackage", "/dholera-residential-plots-guide",
    "https://example.com/bulk-land", "//example.com/infopack",
    "https://www.dholeratimes.com.example.com/infopack",
    "mailto:info@dholeratimes.com", "tel:+919958993549", "#details", "?preview=true",
    "https://[invalid", undefined, null,
  ]) assert.equal(resolveRetiredHref(href), href);
});
