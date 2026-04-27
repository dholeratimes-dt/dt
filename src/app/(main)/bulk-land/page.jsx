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
import { FaHome } from "react-icons/fa";

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

  const cards = [
    {
      icon: <FaHome />,
      title: "Residential Planning",
      description:
        "Bulk land options suitable for plotted development and township-style planning",
    },
    {
      icon: <FaHome />,
      title: "Commercial Use",
      description:
        "Land options for buyers exploring business, retail, or service-based development.",
    },
    {
      icon: <FaHome />,
      title: "Industrial Zone",
      description:
        "Location guidance for land near industrial and infrastructure-linked growth areas.",
    },
    {
      icon: <FaHome />,
      title: "Long-Term Holding",
      description:
        "Suitable for investors looking at long-term land banking in Dholera’s growth corridor.",
    },
  ];

  const CardItem = ({ icon, title, description }) => (
    <div className="shadow-xl space-y-2 rounded-xl border-[#d3b36b] border-2 p-4">
      <div className="flex gap-4 justify-center items-center text-[#d3b36b] text-xl">
        {icon}
        <p>{title}</p>
      </div>
      <p className="text-center">{description}</p>
    </div>
  );

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

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="p-2 flex flex-col justify-center items-center">
          <p className="text-left max-w-4xl mx-auto px-4 leading-relaxed">
            Dholera SIR is becoming a key location for investors, developers,
            and business groups looking for large land parcels in a planned
            smart city region. With improving connectivity, infrastructure
            development, and industrial activity around Dholera, bulk land can
            be considered for residential planning, commercial use, industrial
            interest, and long-term land holding.
            <br />
            Explore location-based bulk land options with guidance on access,
            nearby development, land purpose, documentation clarity, and site
            visit support.
          </p>
          <div className=" flex justify-center items-center gap-8 p-4 translate-y-4">
            <button className="bg-[#d3b36b] w-full p-2 rounded-xl shadow-xl  hover:scale-110 duration-300 whitespace-nowrap">Get Bulk Land Deals</button>
          
          </div>
        </div>
        <div className="p-2">
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map((card, index) => (
              <CardItem key={index} {...card} />
            ))}
          </div>
        </div>
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
