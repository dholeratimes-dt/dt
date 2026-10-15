import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const base = path.join(process.cwd(), "src", "app", "(main)", "gallery", "dholera-sir-progress");
const read = (name) => readFile(path.join(base, name), "utf8");
const files = ["page.jsx", "galleryData.js", "GalleryDesktop.jsx", "GalleryDesktopInteractions.jsx", "GalleryMobileFan.jsx", "GalleryModal.jsx"];
const source = await Promise.all(files.map(read));
const data = Object.fromEntries(files.map((name, index) => [name, source[index]]));

assert.ok(!data["page.jsx"].includes('"use client"'), "Gallery page should be server-rendered");
assert.ok(data["page.jsx"].includes('import hero from "@/assets/gallery/galleryHero.webp"'));
assert.equal((data["page.jsx"].match(/<h1\b/g) || []).length, 1, "Exactly one gallery H1 is expected");
for (const seo of ["Dholera Smart City Gallery | Dholera Times", "Dholera SIR Progress in Every Frame", "https://www.dholeratimes.com/gallery/dholera-sir-progress"]) {
  assert.ok(data["page.jsx"].includes(seo), `SEO field missing: ${seo}`);
}
assert.deepEqual([...data["galleryData.js"].matchAll(/    id: (\d+),/g)].map((m) => Number(m[1])), Array.from({ length: 14 }, (_, index) => index + 1), "Expected 14 gallery images");
assert.ok(data["GalleryMobileFan.jsx"].includes('const MOBILE_VISIBLE_CARDS = 6'));
assert.ok(data["GalleryMobileFan.jsx"].includes('sizes={position <= 1'));
assert.ok(data["GalleryMobileFan.jsx"].includes("requestAnimationFrame"));
assert.ok(data["GalleryDesktop.jsx"].includes('loading="lazy"'));
assert.ok(data["GalleryMobileFan.jsx"].includes('import dynamic from "next/dynamic"'));
console.log(`PASS: ${files.length} required files found, route SEO, data and mobile image optimization checks`);
console.log("This is a source smoke test, not a substitute for a full Next.js build or Lighthouse.");
