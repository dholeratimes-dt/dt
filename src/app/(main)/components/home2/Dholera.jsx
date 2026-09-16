import Image from "next/image";
import Link from "next/link";
import dholeraSite from "@/assets/dholera-smart-city-home-image2.webp";

const locationFeatures = [
  "India’s First Special Investment Region (SIR)",
  "Strong backing from both State and Central Governments",
  "Rapid industrial and infrastructure development underway",
  "Plug and play infrastructure for faster project execution",
  "High appreciation potential over the next 5 years",
];

export default function Dholera() {
  return (
    <section
      aria-labelledby="dholera-heading"
      className="bg-[#F9FAFB] px-4 py-12 text-black min-[414px]:px-6 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 md:mb-8">
          <h1
            id="dholera-heading"
            className="text-[30px] font-bold leading-[38px] tracking-normal text-black md:text-[40px] md:leading-[48px]"
          >
            Invest in India&apos;s First Planned Smart City: Dholera SIR
          </h1>

          <p className="mt-4 text-[16px] font-normal leading-[26px] text-black md:text-[17px] md:leading-[28px]">
            Spanning over 920 sq km, Dholera SIR is part of Delhi–Mumbai
            Industrial Corridor (DMIC). With large-scale infrastructure
            planning, industrial growth, and future-ready connectivity, it
            has become India&apos;s top investment zone.
          </p>
        </header>

        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
          {/* Image */}
          <div className="relative aspect-[10/7] min-w-0 overflow-hidden lg:aspect-auto lg:min-h-[440px]">
            <Image
              src={dholeraSite}
              alt="ABCD Building"
              fill
              sizes="(min-width: 1344px) 744px, (min-width: 1024px) 58vw, (min-width: 768px) calc(100vw - 64px), (min-width: 414px) calc(100vw - 48px), calc(100vw - 32px)"
              className="object-cover object-center"
            />
          </div>

          {/* Highlights */}
          <div className="flex min-w-0 flex-col">
            <p className="text-[16px] font-normal leading-[26px] text-black md:text-[17px] md:leading-[28px]">
              Key highlights of Dholera Smart City:
            </p>

            <ul className="mt-2 divide-y divide-[#E5E7EB]">
              {locationFeatures.map((feature) => (
                <li
                  key={feature}
                  className="py-4 text-[16px] font-normal leading-[26px] text-black md:text-[17px] md:leading-[28px]"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2">
              <Link
                href="/dholera-sir"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#B69B5E] px-6 py-3 text-[16px] font-semibold leading-6 text-black transition-colors duration-200 hover:bg-[#DDBF78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15232C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9FAFB] motion-reduce:transition-none sm:w-auto"
              >
                About Dholera SIR
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}