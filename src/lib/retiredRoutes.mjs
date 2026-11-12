// These sections were retired in October 2026. Keep old bookmarks and CMS
// links useful without restoring the removed property pages.
export const retiredRouteRedirects = [
  { source: "/bulk-land/:path*", destination: "/contact/inquiry", permanent: true },
  {
    source: "/dholera-residential-plots",
    destination: "/dholera-updates/blogs/dholera-real-estate-market-outlook",
    permanent: true,
  },
  // Preserve the existing, more specific article redirects before the fallback.
  {
    source: "/dholera-residential-plots/abcd-building",
    destination: "/dholera-sir/the-abcd-building-in-dholera",
    permanent: true,
  },
  {
    source: "/dholera-residential-plots/dholera-connectivity",
    destination: "/dholera-sir/connectivity-makes-dholera-the-next-big-investment-hub",
    permanent: true,
  },
  {
    source: "/dholera-residential-plots/westwyn-estate",
    destination: "/contact/inquiry",
    permanent: true,
  },
  {
    source: "/dholera-residential-plots/westwyn-residency",
    destination: "/contact/inquiry",
    permanent: true,
  },
  {
    source: "/dholera-residential-plots/:path*",
    destination: "/contact/inquiry",
    permanent: true,
  },
  {
    source: "/infopack/videos",
    destination: "/gallery/dholera-sir-progress",
    permanent: true,
  },
  { source: "/infopack/:path*", destination: "/dholera-sir", permanent: true },
];

export function getRetiredRouteDestination(pathname) {
  const path = pathname.replace(/\/+$/, "").toLowerCase() || "/";

  return retiredRouteRedirects.find(({ source }) => {
    const prefix = source.replace(/\/:path\*$/, "").toLowerCase();
    return path === prefix || (source.endsWith("/:path*") && path.startsWith(`${prefix}/`));
  })?.destination;
}

// Sanity stores both absolute and relative links. Render the final internal
// destination so crawlers and visitors do not have to follow a redirect.
export function resolveRetiredHref(href) {
  if (typeof href !== "string" || !/^(\/|https?:\/\/)/i.test(href)) return href;

  try {
    const url = new URL(href, "https://www.dholeratimes.com");
    if (!["http:", "https:"].includes(url.protocol) ||
        !["www.dholeratimes.com", "dholeratimes.com"].includes(url.hostname)) return href;

    const destination = getRetiredRouteDestination(url.pathname);
    return destination ? `${destination}${url.search}${url.hash}` : href;
  } catch {
    return href;
  }
}
