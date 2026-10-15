import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/* SOURCE INTEGRATION SMOKE CHECK*/

const directory = join(import.meta.dirname, "home2");
const read = (name) => readFileSync(join(directory, name), "utf8");
const checks = [
  ["All homepage files exist", [
    "Home2Main.jsx", "carosuel.jsx", "HeroDesktopFormGate.jsx",
    "HeroDesktopFormLayer.jsx", "HeroForm.jsx", "Magnet.jsx",
    "Testimonials.jsx", "LazyHomeSections.jsx", "AboutDT.jsx",
  ].every((name) => existsSync(join(directory, name)))],
  ["SEO canonical preserved", read("Home2Main.jsx").includes('canonical: "https://www.dholeratimes.com/"')],
  ["SEO meta title preserved", read("Home2Main.jsx").includes('Dholera Times | Dholera Smart City News, Updates & Investment Insights')],
  ["Original mobile hero preserved", read("carosuel.jsx").includes('DT-Home-Banner-Phone2.webp')],
  ["Original desktop hero preserved", read("carosuel.jsx").includes('DT-Home-Banner-Web.webp')],
  ["Responsive hero image", read("carosuel.jsx").includes('<picture')],
  ["High-priority hero preload", read("carosuel.jsx").includes('fetchPriority="high"')],
  ["Desktop form isolated", read("carosuel.jsx").includes('HeroDesktopFormGate')],
  ["Desktop form retains success callback", read("HeroDesktopFormLayer.jsx").includes('handleFormSuccess')],
  ["Original lead submit endpoint", read("HeroForm.jsx").includes('/api/submit-form')],
  ["Magnet CRM endpoint preserved", read("Magnet.jsx").includes('api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead')],
  ["Magnet lead tracking preserved", read("Magnet.jsx").includes('event: "lead_form"')],
  ["Popup code retained", read("PopUpForm.jsx").includes('data-open-dholera-popup')],
];

let failed = false;
for (const [label, pass] of checks) {
  console.log(`${pass ? "PASS" : "FAIL"}: ${label}`);
  if (!pass) failed = true;
}
if (failed) process.exitCode = 1;
console.log("This source check is not a substitute for npm run build or a Lighthouse audit.");
