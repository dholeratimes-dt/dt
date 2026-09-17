// "use client";
// import React, { useEffect } from "react";
// import govtApprovedProject from "@/assets/icons/verified-auda-approved.webp";
// import salesDeed from "@/assets/icons/immediate-sale-deed.webp";
// import afterSales from "@/assets/icons/resale-support.webp";
// import buybackguarantee from "@/assets/icons/high-roi-potential.webp";
// import days365 from "@/assets/icons/365-day-site-visit.webp";
// import dueD from "@/assets/icons/due-diligence-team.webp";

// import Image from "next/image";
// import {
//   Users,
//   Building,
//   BadgeCheck,
//   AreaChart,
// } from "lucide-react";
// const features = [
//   {
//     icon: govtApprovedProject,
//     title: "Verified AUDA-approved Dholera plots",
//     description: "Fully government approved and verified",
//   },
//   {
//     icon: salesDeed,
//     title: "Immediate Sale-deed Registration",
//     description: "Quick documentation and registration",
//   },
//   {
//     icon: days365,
//     title: "365-day Site Visit Assistance",
//     description: "Comprehensive post-purchase assistance",
//   },
//   {
//     icon: dueD,
//     title: "In-house Due Diligence Team",
//     description: "No hidden charges, clear pricing structure",
//   },
//   {
//     icon: buybackguarantee,
//     title: "Projects with High ROI Potential",
//     description: "*Terms & Conditions Apply*",
//   },
//   {
//     icon: afterSales,
//     title: "Resale Support & Buyback Assistance*",
//     description: "*Terms & Conditions Apply*",
//   },
// ];

// export default function WhyDT() {
  

//   useEffect(() => {
//     // Initialize animation observers when component mounts
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px",
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("animate-visible");
//           observer.unobserve(entry.target);
//         }
//       });
//     }, observerOptions);

//     // Observe all animation elements
//     document
//       .querySelectorAll(
//         ".fade-in-up, .feature-item, .project-image, .amenity-item, .investment-calculator",
//       )
//       .forEach((el) => observer.observe(el));

//     return () => {
//       observer.disconnect();
//       // Ensure we clean up by enabling scrolling when component unmounts
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <>
     

//       <div id="westwyn-county" className="westwyn-container bg-gray-50 py-8">
//         {/* Main Content Section */}
//         <section className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Header */}
//             <div className="md:col-span-2 text-center">
//               <h2 className="text-2xl md:text-[28px] font-bold text-[#151f28] mt-6 mb-6">
//                 Dholera Times : Trusted Developers in Dholera
//               </h2>
//               <p className="text-gray-600">
//                 Dholera Times helps buyers find residential plots in good
//                 locations across Dholera with registry-ready documents and full
//                 support from enquiry to booking.
//               </p>
//             </div>
//           </div>
//         </section>

//         <div className="max-w-7xl mx-auto px-4 py-4">

//            <div className="md:col-span-2">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {features.map((feature, index) => (
//                   <div
//                     key={index}
//                     className="westwyn-feature-card feature-item flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
//                   >
//                     <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
//                       <div className="relative w-full h-full">
//                         <Image
//                           src={feature.icon}
//                           alt={feature.title}
//                           width={112}
//                           height={126}
//                           className="object-contain "
//                         />
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg text-[#151f28]">
//                         {feature.title}
//                       </h3>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
      
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import Image from "next/image";

import govtApprovedProject from "@/assets/icons/verified-auda-approved.webp";
import salesDeed from "@/assets/icons/immediate-sale-deed.webp";
import afterSales from "@/assets/icons/resale-support.webp";
import buybackguarantee from "@/assets/icons/high-roi-potential.webp";
import days365 from "@/assets/icons/365-day-site-visit.webp";
import dueD from "@/assets/icons/due-diligence-team.webp";

const features = [
  {
    icon: govtApprovedProject,
    title: "Verified AUDA approved Dholera plots",
    description: "Fully government approved and verified",
  },
  {
    icon: salesDeed,
    title: "Immediate Sale deed Registration",
    description: "Quick documentation and registration",
  },
  {
    icon: days365,
    title: "365 day Site Visit Assistance",
    description: "Comprehensive post-purchase assistance",
  },
  {
    icon: dueD,
    title: "In house Due Diligence Team",
    description: "No hidden charges, clear pricing structure",
  },
  {
    icon: buybackguarantee,
    title: "Projects with High ROI Potential",
    description: "Terms & Conditions Apply",
  },
  {
    icon: afterSales,
    title: "Resale Support & Buyback Assistance",
    description: "Terms & Conditions Apply",
  },
];

export default function WhyDT() {
  return (
    <section
      id="westwyn-county"
      aria-labelledby="why-dt-heading"
      className="
        bg-[#14381F] bg-gradient-to-br
        from-[#20472C] via-[#14381F] to-[#0D2918]
        px-4 py-10
        min-[414px]:px-6
        md:px-8 md:py-14
        lg:py-16
        selection:bg-[#F4D35E] selection:text-[#14381F]
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section intro */}
        <div
          className="
            grid grid-cols-1 gap-5
            md:gap-6
            lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
            lg:items-end lg:gap-14
          "
        >
          <div>
            <h2
              id="why-dt-heading"
              className="
                max-w-[560px]
                text-[28px] font-bold leading-[36px]
                tracking-tight text-[#FFF8DC]
                md:text-[32px] md:leading-[40px]
                lg:text-[36px] lg:leading-[44px]
              "
            >
              Dholera Times : Trusted Developers in Dholera
            </h2>
          </div>

          <p
            className="
              max-w-[680px]
              text-[16px] font-normal leading-[27px] text-[#DCE6D9]
              md:text-[17px] md:leading-[28px]
              lg:justify-self-end
            "
          >
            Dholera Times helps buyers find residential plots in good
            locations across Dholera with registry-ready documents and full
            support from enquiry to booking.
          </p>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="
            my-7 h-px w-full
            bg-gradient-to-r
            from-[#F4D35E]/50 via-[#F4D35E]/20 to-transparent
            md:my-9
          "
        />

        {/* Features */}
        <div
          className="
            grid grid-cols-1 gap-3
            sm:grid-cols-2 sm:gap-4
            lg:grid-cols-3 lg:gap-5
          "
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              className="
                flex min-h-[112px] min-w-0 items-center gap-4
                rounded-2xl border border-[#F4D35E]/20
                bg-[#1C4228] bg-gradient-to-br
                from-[#244B30] to-[#183D24]
                p-4
                shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]
                transition-[border-color,box-shadow] duration-200
                hover:border-[#F4D35E]/50
                hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]
                md:min-h-[122px] md:p-5
                motion-reduce:transition-none
              "
            >
              {/* Icon */}
              <div
                className="
                  flex h-16 w-16 shrink-0 items-center justify-center
                  rounded-xl border border-[#F4D35E]/40
                  bg-[#FFF8DC] bg-gradient-to-br
                  from-[#FFF8DC] to-[#FAE9A0]
                  p-2.5
                  md:h-[68px] md:w-[68px]
                "
              >
                <Image
                  src={feature.icon}
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3
                  className="
                    text-[17px] font-semibold leading-[25px]
                    text-[#FFF8DC]
                    md:text-[18px] md:leading-[26px]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-1.5 text-[14px] font-normal
                    leading-[22px] text-[#DCE6D9]
                  "
                >
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}