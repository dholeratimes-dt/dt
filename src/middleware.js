// src/middleware.js
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ✅ Current site ka naam
const SITE_NAME = process.env.SITE_NAME || "dholeratimes";

let redirectCache = null;
let cacheTime = 0;
let redirectRefresh = null;
let retryAfter = 0;
const CACHE_TTL = 60 * 1000;

function refreshRedirects() {
  // Concurrent page requests share one CMS request, including on cold starts.
  if (!redirectRefresh) {
    redirectRefresh = client.fetch(
      `*[_type == "redirect" && site == $site]{ source, destination, permanent }`,
      { site: SITE_NAME }
    ).then((redirects) => {
      if (!Array.isArray(redirects)) throw new Error("Invalid redirect data");
      redirectCache = redirects;
      cacheTime = Date.now();
      retryAfter = 0;
      return redirectCache;
    }).finally(() => {
      redirectRefresh = null;
    });
  }
  return redirectRefresh;
}

async function fetchRedirects(event) {
  // The first request must resolve redirects before serving the destination.
  if (!redirectCache) return refreshRedirects();

  if (Date.now() - cacheTime >= CACHE_TTL && Date.now() >= retryAfter) {
    const refresh = refreshRedirects().catch(() => {
      // Keep the last successful rules during a CMS outage, with a retry delay.
      retryAfter = Date.now() + 5000;
      console.warn("Could not refresh redirects; using the cached rules.");
    });
    // Keep background work alive without adding a CMS round trip to page TTFB.
    event.waitUntil(refresh);
  }
  return redirectCache;
}

export async function middleware(request, event) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // www force
  if (hostname === "dholeratimes.com") {
    url.host = "www.dholeratimes.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Sanity Redirects — site specific
  // The canonical homepage has no legacy path to resolve. Avoid a CMS
  // round trip here; www normalization above still applies.
  if (url.pathname === "/") return NextResponse.next();

  const redirects = await fetchRedirects(event);
  const pathname = request.nextUrl.pathname;
  const match = redirects.find((r) => r.source === pathname);

  if (match) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = match.destination;
    return NextResponse.redirect(redirectUrl, {
      status: match.permanent ? 301 : 302,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|studio).*)"],
};
