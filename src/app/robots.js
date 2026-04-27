// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/studio/",
          "/costsheet/",
          "/infopack/",
        ],
      },
    ],
    sitemap: "https://www.dholeratimes.com/sitemap.xml",
    host: "https://www.dholeratimes.com",
  };
}