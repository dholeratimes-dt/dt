import React from "react";
import dholeraSite from "@/assets/dholera-smart-city-home-image2.webp";
import Image from "next/image";
import Link from "next/link";
import Magnet from "./Magnet";

export default function Dholera() {
  return (
    <>
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[28px] text-center font-bold text-[#151f28] mb-6 leading-tight">
            Dholera Smart City - Where India’s Future Is Being Built
          </h1>
          <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-12">
            {/* Left side - Image */}
            <div className="md:w-1/2 w-full">
              <div className="relative">
                <Image
                  src={dholeraSite}
                  alt="ABCD Building"
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="md:w-1/2 w-full">
              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-justify mb-8">
                Dholera Smart City is India’s first planned smart city, being
                developed under the prestigious Delhi–Mumbai Industrial Corridor
                (DMIC). Spread across 922.5 sq. km, Dholera SIR is planned as a
                world-class industrial and manufacturing hub with modern
                infrastructure, smart utilities, sustainable energy solutions,
                and seamless global connectivity.
                <br />
                Strategically located just 109 km from Ahmedabad, the city is
                well connected through the Ahmedabad–Dholera Expressway and the
                upcoming Dholera International Airport, which is set to be one
                of India’s largest airports. Backed by major investments such as
                Tata Semiconductor Plant (₹91,000 CR), ReNew Power Project
                (₹1,200 CR), and one of the world’s largest solar power parks,
                Dholera SIR is rapidly emerging as a next-generation economic
                and industrial powerhouse of India.
              </p>

              <Link
                href="/dholera-sir"
                className="bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
              >
                Dholera SIR →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Magnet />
      </div>
    </>
  );
}
