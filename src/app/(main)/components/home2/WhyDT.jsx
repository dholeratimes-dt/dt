"use client";
import React, { useState, useEffect } from "react";
import govtApprovedProject from "@/assets/icons/verified-auda-approved.webp";
import salesDeed from "@/assets/icons/immediate-sale-deed.webp";
import afterSales from "@/assets/icons/resale-support.webp";
import buybackguarantee from "@/assets/icons/high-roi-potential.webp";
import days365 from "@/assets/icons/365-day-site-visit.webp";
import dueD from "@/assets/icons/due-diligence-team.webp";

import Image from "next/image";
import {
  Users,
  Building,
  Check,
  Star,
  BadgeCheck,
  AreaChart,
} from "lucide-react";
const features = [
  {
    icon: govtApprovedProject,
    title: "Verified AUDA-approved Dholera plots",
    description: "Fully government approved and verified",
  },
  {
    icon: salesDeed,
    title: "Immediate Sale-deed Registration",
    description: "Quick documentation and registration",
  },
  {
    icon: days365,
    title: "365-day Site Visit Assistance",
    description: "Comprehensive post-purchase assistance",
  },
  {
    icon: dueD,
    title: "In-house Due Diligence Team",
    description: "No hidden charges, clear pricing structure",
  },
  {
    icon: buybackguarantee,
    title: "Projects with High ROI Potential",
    description: "*Terms & Conditions Apply*",
  },
  {
    icon: afterSales,
    title: "Resale Support & Buyback Option*",
    description: "*Terms & Conditions Apply*",
  },
];

export default function WhyDT() {
  const [investmentYear, setInvestmentYear] = useState(5);
  const [plotSize, setPlotSize] = useState(200);
  const [customYear, setCustomYear] = useState("");

  const baseRate = 9250; // Current price per sq. yard
  const targetRate = 17000; // Price after 5 years
  const annualGrowthRate = 0.05; // 5% annual growth

  const calculateFutureValue = (years) => {
    // If years is 2 or less, use linear interpolation to match exactly 13000 at 2 years
    if (years <= 5) {
      const incrementPerYear = (targetRate - baseRate) / 5;
      return baseRate + incrementPerYear * years;
    } else {
      // For years > 2, use compound growth at 5% from the 2-year mark
      return targetRate * Math.pow(1 + annualGrowthRate, years - 5);
    }
  };

  const calculateInvestment = () => {
    let years = investmentYear;
    if (customYear) {
      years = parseInt(customYear);
    }

    const futureRate = calculateFutureValue(years);
    const currentInvestment = baseRate * plotSize;
    const futureValue = futureRate * plotSize;
    const profit = futureValue - currentInvestment;
    const percentageGrowth = (futureValue / currentInvestment - 1) * 100;

    return {
      currentValue: currentInvestment,
      futureValue: futureValue,
      profit: profit,
      percentageGrowth: percentageGrowth,
      ratePerSqYard: futureRate,
    };
  };

  const investmentDetails = calculateInvestment();

  useEffect(() => {
    // Initialize animation observers when component mounts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document
      .querySelectorAll(
        ".fade-in-up, .feature-item, .project-image, .amenity-item, .investment-calculator",
      )
      .forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      // Ensure we clean up by enabling scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <style jsx global>
        {`
          /* Fade in animation */
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.6s ease,
              transform 0.6s ease;
          }

          .fade-in-up.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Staggered animation for feature items */
          .feature-item,
          .amenity-item {
            opacity: 0;
            transform: translateX(-30px);
            transition:
              opacity 0.5s ease,
              transform 0.5s ease;
          }

          .feature-item.animate-visible,
          .amenity-item.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }

          .feature-item:nth-child(1),
          .amenity-item:nth-child(1) {
            transition-delay: 0.1s;
          }
          .feature-item:nth-child(2),
          .amenity-item:nth-child(2) {
            transition-delay: 0.2s;
          }
          .feature-item:nth-child(3),
          .amenity-item:nth-child(3) {
            transition-delay: 0.3s;
          }
          .feature-item:nth-child(4),
          .amenity-item:nth-child(4) {
            transition-delay: 0.4s;
          }
          .feature-item:nth-child(5) {
            transition-delay: 0.5s;
          }
          .feature-item:nth-child(6) {
            transition-delay: 0.6s;
          }

          /* Project image animation */
          .project-image {
            opacity: 0;
            transform: translateX(50px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
          }

          .project-image.animate-visible {
            opacity: 1;
            transform: translateX(0);
          }

          /* Calculator animation */
          .investment-calculator {
            opacity: 0;
            transform: translateY(30px);
            transition:
              opacity 0.8s ease,
              transform 0.8s ease;
            transition-delay: 0.3s;
          }

          .investment-calculator.animate-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Modal styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }

          .modal-content {
            background: white;
            border-radius: 0.5rem;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }

          /* Add spacing between sections */
          .westwyn-container section {
            margin-bottom: 5rem;
          }
        `}
      </style>

      <div id="westwyn-county" className="westwyn-container bg-gray-50 py-8">
        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Header */}
            <div className="md:col-span-2 text-center">
              <h2 className="text-2xl md:text-[28px] font-bold text-[#151f28] mt-6 mb-6">
                Your Trusted Partner in Dholera SIR
              </h2>
              <p className="text-gray-600">
                Dholera Times focuses on verified information, structured
                guidance, and transparent processes for buyers exploring
                opportunities in Dholera SIR. Our approach emphasizes
                legal clarity, location awareness, and long-term development
                potential so investors can make well-informed property
                decisions.
                
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="westwyn-feature-card feature-item flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={112}
                          height={126}
                          className="object-contain "
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-[#151f28]">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              {
                value: "9",
                label: "Residential Projects",
                icon: <Building className="h-8 w-8" />,
              },
              {
                value: "544+",
                label: "Plots Sold",
                icon: <BadgeCheck className="h-8 w-8" />,
              },
              {
                value: "411+",
                label: "Happy Customers",
                icon: <Users className="h-8 w-8" />,
              },
              {
                value: "1.5 Lakh Sq. Yards",
                label: "Sold",
                icon: <AreaChart className="h-8 w-8" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900 p-2 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#d8b66e]/20 flex flex-col items-center"
              >
                <div className="text-[#d8b66e] mb-3">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-semibold text-[#d8b66e] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
