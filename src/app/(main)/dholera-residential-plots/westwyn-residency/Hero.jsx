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
                priority
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
        </div>

        {/* Mobile Section */}
        <div className="md:hidden mt-6 px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 w-full">
            <div className="grid gap-4 p-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="px-3 py-1.5 text-white bg-green-500 rounded-full text-sm font-medium">
                    Ongoing
                  </span>
                </div>
                <div className="text-xl font-bold text-[#151f28]">
                  ₹6,500
                  <span className="text-sm text-gray-600 ml-1">/Sq.Yd</span>
                </div>
              </div>

              <div className="pt-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  WestWyn Residency
                </h1>
              </div>

              <div className="flex flex-col justify-between">
                <div className="text-[#151f28] text-lg font-semibold mb-2">
                  <p>Registry Ready Plot Starting From ₹7.50 Lakh</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919958993549"
                    className="flex-1 text-center bg-[#d3b36b] hover:bg-[#d3b15c] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    📞 Site Visit
                  </a>
                  <button
                    onClick={openBrochureForm}
                    className="flex-1 bg-[#151f28] text-[#d3b15c] hover:bg-[#d3b15c] hover:text-[#151f28] px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    📄 Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        
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
