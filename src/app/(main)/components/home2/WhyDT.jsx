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
      className="border-y  bg-[#F3E7EC] bg-gradient-to-br from-[#EEDDE4] via-[#F7EFF2] to-white px-4 py-10 text-[#39252E] selection:bg-[#E0A4B5] selection:text-[#39252E] min-[414px]:px-6 md:px-8 md:py-12 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="grid min-w-0 grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <h2
            id="why-dt-heading"
            className="max-w-[580px] text-[26px] font-semibold leading-[1.3] tracking-tight text-[#39252E] sm:text-[30px] md:text-[34px] lg:text-[38px]"
          >
            Dholera Times :{" "}
            <span className="text-[#8F2946]">Trusted Developers in Dholera</span>
          </h2>
          <p className="max-w-[640px] text-base font-normal leading-7 text-[#5C4851] lg:justify-self-end">
            Dholera Times helps buyers find residential plots in good
            locations across Dholera with registry-ready documents and full
            support from enquiry to booking.
          </p>
        </header>

        <div aria-hidden="true" className="my-7 h-px w-full bg-gradient-to-r from-[#8F2946]/35 via-[#E0A4B5]/50 to-transparent md:my-9" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex min-w-0 items-start gap-4 rounded-xl border border-[#DFC9D1] bg-white p-5 shadow-[0_6px_20px_rgba(116,32,57,0.05)] lg:min-h-[156px] lg:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E0A4B5]/40 bg-[#F7EFF2] p-2">
                <Image
                  src={feature.icon}
                  alt=""
                  width={72}
                  height={72}
                  sizes="30px"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold leading-[25px] text-[#39252E] lg:text-[18px] lg:leading-[27px]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base font-normal leading-6 text-[#5C4851]">
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
