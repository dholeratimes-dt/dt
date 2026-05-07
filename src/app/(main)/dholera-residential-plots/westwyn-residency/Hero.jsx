"use client";
import React, { useState } from "react";
import Image from "next/image";
import residency from "@/assets/residential/residency/westwyn-residency-dholera-times-desktop.webp";
import residencyM from "@/assets/residential/residency/westwyn-residency-dholera-times-mobile.webp";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "../../components/BrochureDownload";

export default function Hero() {
  const [brochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => setIsBrochureFormOpen(true);
  const closeBrochureForm = () => setIsBrochureFormOpen(false);

  return (
    <>
      <title>WestWyn Residency Dholera | Premium Plots in Smart City</title>
      <meta
        name="description"
        content="Discover WestWyn Residency Dholera plots exclusively on Dholera Times - premium smart city plots with high investment growth potential in Gujarat."
      />
      <meta
        name="keywords"
        content="WestWyn Residency Dholera, Dholera plots, Dholera Smart City, Dholera investment, investment in Dholera"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-residential-plots/westwyn-residency"
      />

      <div className="bg-gray-100">
        <div className="bg-[#151f28] text-white">
          <div className="py-4">
            {/* Image Container */}
            <div className="relative aspect-[5/4] md:aspect-[3/1] w-full overflow-hidden">
              {/* Background Image */}
              <Image
                src={residency}
                alt="WestWyn County residential plots in Dholera Gujarat"
                fill
                className="hidden object-cover md:block"
                sizes="(min-width: 1280px) 1280px, 100vw"
                priority
              />
              <Image
                src={residencyM}
                alt="WestWyn County residential plots in Dholera Gujarat"
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                priority
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {brochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Get the Complete Project Brief"
              buttonName="Download Brochure"
              onClose={closeBrochureForm}
              link="https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
