import assert from "node:assert/strict";
import { getRetiredRouteDestination } from "../src/lib/retiredRoutes.mjs";

// Run against a local production server, or pass the deployed site's origin.
// node scripts/check-retired-routes.mjs https://www.dholeratimes.com
const origin = process.argv[2] || "http://127.0.0.1:3000";
const paths = [
  "/bulk-land",
  "/dholera-residential-plots",
  "/dholera-residential-plots/westwyn-estate",
  "/dholera-residential-plots/westwyn-residency",
  "/infopack",
];
const request = (path) => fetch(new URL(path, origin), {
  redirect: "manual",
  signal: AbortSignal.timeout(30000),
});

const destinations = new Set();
for (const path of paths) {
  const response = await request(`${path}?utm_source=route-audit&gclid=audit-check`);
  assert.equal(response.status, 308, `${path} must return a permanent redirect`);
  const location = response.headers.get("location");
  assert.ok(location, `${path} must supply a Location header`);
  const destination = new URL(location, origin);
  assert.equal(destination.pathname, getRetiredRouteDestination(path));
  assert.equal(destination.searchParams.get("utm_source"), "route-audit");
  assert.equal(destination.searchParams.get("gclid"), "audit-check");
  assert.equal(destination.searchParams.size, 2, "Do not add wildcard parameters to audited URLs");
  destinations.add(destination.pathname);
  await response.body?.cancel();
  console.log(`PASS ${path} -> 308 ${destination.pathname}`);
}

for (const path of destinations) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path} must return 200 without another redirect`);
  const html = await response.text();
  // Next includes its not-found boundary in the RSC payload on valid pages.
  // Inspect the rendered title/heading rather than that embedded fallback text.
  assert.ok(!/<title>404:|<h1\b[^>]*>404<\/h1>/.test(html), `${path} must render its content`);
  console.log(`PASS ${path} -> 200`);
}

const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200, "The sitemap must remain available");
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, "The sitemap must contain published pages");
for (const url of urls) {
  assert.equal(getRetiredRouteDestination(new URL(url).pathname), undefined, `${url} must not appear in the sitemap`);
}
console.log(`PASS sitemap contains ${urls.length} URLs and no retired routes`);
