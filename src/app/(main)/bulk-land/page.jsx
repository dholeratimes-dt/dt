import Image from "next/image";
import React from "react";
import Link from "next/link";
import hero from "@/assets/bulk-land-in-dholera-desktop-banner.webp";
import heroM from "@/assets/bulk-land-in-dholera-mobile-banner.webp";
import residential from "@/assets/bulkLand/residential-bulk-land-cover.webp";
import industrial from "@/assets/bulkLand/industrial-bulk-land-cover.webp";
import hac from "@/assets/bulkLand/high-access-corridor-bulk-land-cover.webp";
import cityCenter from "@/assets/bulkLand/city-centre-bulk-land-cover.webp";
import knowledge from "@/assets/bulkLand/knowledge-it-bulk-land-cover.webp";
import recreation from "@/assets/bulkLand/recreation-sports-bulk-land-cover.webp";
import BulkLand from "../components/BulkLandForm";

export default function page() {
  const bulkLandCategories = [
    {
      id: 1,
      title: "Residential Zone",
      image: residential,
      href: "/bulk-land/residential",
      description: "Perfect for residential townships and housing projects",
    },
    {
      id: 2,
      title: "Industrial Zone",
      image: industrial,
      href: "/bulk-land/industrial",
      description: "Ideal for manufacturing and industrial developments",
    },
    {
      id: 3,
      title: "High Access Corridor",
      image: hac,
      href: "/bulk-land/high-access-corridor",
      description: "Prime locations with excellent connectivity",
    },
    {
      id: 4,
      title: "City Centre",
      image: cityCenter,
      href: "/bulk-land/city-centre",
      description: "Central business district opportunities",
    },
    {
      id: 5,
      title: "Knowledge & IT",
      image: knowledge,
      href: "/bulk-land/knowledge-it",
      description: "Tech parks and knowledge-based industries",
    },
    {
      id: 6,
      title: "Recreation & Sports",
      image: recreation,
      href: "/bulk-land/recreation-sports",
      description: "Entertainment and sports facility development",
    },
  ];

  return (
    <>
      <title>Bulk Land in Dholera Smart City | High ROI Investment</title>
      <meta
        name="description"
        content="Invest in bulk land in Dholera Smart City with AUDA-approved plots ideal for residential, commercial, and industrial projects near Dholera International Airport."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera Gujarat, Dholera SIR, Dholera Project, Invest in Dholera, Dholera Property Investment"
      />
      <link rel="canonical" href="https://www.dholeratimes.com/bulk-land" />
      <div className="relative md:h-96 w-full h-[30vh] overflow-hidden">
        <Image
          src={hero}
          alt="Dholera Land"
          className="object-cover w-full h-auto max-sm:hidden"
          priority
        />
        <Image
          src={heroM}
          alt="Dholera Land"
          className="object-cover w-full h-[60vh] md:hidden"
          priority
        />
      </div>

      <div>
        <h1 className="text-2xl  md:text-3xl pt-8 font-bold text-black text-center mb-2">
          Explore Bulk Land Growth Zones in Dholera SIR
        </h1>
      </div>

      <div>
        <p className="text-center max-w-4xl mx-auto px-4 leading-relaxed">
          Looking to invest in bulk land in Dholera Smart City? This is the
          right time to explore large, legally approved land parcels designed
          for high-growth opportunities. With modern infrastructure, planned
          development, and government-backed progress, Dholera SIR is becoming a
          prime destination for residential, commercial, and industrial
          projects. Whether you are planning a township, business hub, or
          long-term investment, bulk land in Dholera SIR offers strategic location
          advantages and strong future potential. Connect with us to get
          verified details on premium bulk land options and make an informed
          investment decision.
        </p>
      </div>
      
      <div className="text-xl text-center font-semibold pt-4">
        Explore zones in bulk land
      </div>

      {/* 3-Column Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bulkLandCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[#d3b36b] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-white">
                    Where Potential Meets Progress
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BulkLand title="Looking to Invest in Bulk Land Parcels in Dholera SIR" />
    </>
  );
}
