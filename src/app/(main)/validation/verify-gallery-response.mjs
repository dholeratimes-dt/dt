/* Validates basic production HTML without installing a package. */
const origin = process.env.GALLERY_TEST_ORIGIN || "http://localhost:3000";
const path = "/gallery/dholera-sir-progress";
const response = await fetch(new URL(path, origin), { redirect: "manual" });
const html = await response.text();

const checks = {
  "HTTP 200": response.status === 200,
  "SEO title": html.includes("Dholera Smart City Gallery | Dholera Times"),
  "Meta description": html.includes("Explore the Dholera Smart City gallery by Dholera Times"),
  "Canonical URL": html.includes("https://www.dholeratimes.com/gallery/dholera-sir-progress"),
  "Page heading": html.includes("Dholera SIR Progress in Every Frame"),
  "Image accessible text": html.includes("Solar Park Dholera"),
  "Not noindexed by headers": !/\bnoindex\b/i.test(response.headers.get("x-robots-tag") || ""),
  "No duplicate page h1": (html.match(/<h1\b/g) || []).length === 1,
};

for (const [label, ok] of Object.entries(checks)) {
  console.log(`${ok ? "PASS" : "FAIL"}: ${label}`);
}

console.log(`HTTP status: ${response.status}`);
console.log(`URL tested: ${new URL(path, origin).href}`);
if (Object.values(checks).some((ok) => !ok)) process.exitCode = 1;
