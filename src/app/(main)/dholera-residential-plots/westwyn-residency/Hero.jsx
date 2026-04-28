"use client";
import React, { useState } from "react";
import Image from "next/image";
import wc from "@/assets/residential/westwyn-residency-dholera-project-section.webp";
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
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Image Container */}
            <div className="relative min-h-[250px] md:min-h-[min(600px,80vh)]">
              {/* Background Image */}
              <Image
                src={wc}
                alt="WestWyn Estates in Dholera Gujarat"
                fill
                className="absolute object-cover aspect-[3/2]"
                fetchPriority="high"
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
