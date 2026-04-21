import React from "react";
import dholeraSite from "@/assets/residential/estates.webp";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  Train,
  Plane,
} from "lucide-react";

export default function AboutDT() {
  const locationFeatures = [
    { text: "5 Minutes from Bhimnath Railway Junction", icon: Train },
    { text: "15 Minutes from Dholera SIR boundary", icon: Clock },
    { text: "15 Minutes from RMS Multi-Specialty Hospital", icon: Clock },
    { text: "17 minutes from Ahmedabad Dholera Expressway", icon: Clock },
    { text: "30 minutes from Tata Semiconductor Plant", icon: Clock },
    { text: "45 minutes from Dholera International Airport", icon: Plane },
  ];

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[28px] font-bold text-center text-[#151f28] mb-6 leading-tight">
          WestWyn Estates - Where Smart Location Meets Smart Investment
        </h2>
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left side - Image */}
          <div className="md:w-1/2 w-full">
            <div className="relative">
              <Image
                src={dholeraSite}
                alt="WestWyn Estates in Dholera SIR"
                className="w-full h-auto md:h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:w-1/2 w-full">
            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-justify mb-4">
              WestWyn Estates is a premium residential plotting development
              located in Polarpur, Dholera, designed with a low-density layout
              to offer exclusivity and world-class amenities. Starting from ₹10 Lakh, 
              it caters to premium gentry seeking a smart investment
              opportunity in Dholera’s most active and high-demand region.
            </p>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {locationFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200"
                    >
                      <Icon className="w-5 h-5 text-[#b69b5e] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-snug">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/dholera-residential-plots/westwyn-estate"
              className="block pt-4"
            >
              <span className="w-96 bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <span>Explore WestWyn Estates</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
