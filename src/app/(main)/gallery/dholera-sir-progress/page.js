// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import hero from "@/assets/gallery/galleryHero.webp";
// import img1 from "@/assets/gallery/sir/5000mw-solar-park-dholera-times.webp";
// import img2 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-butterfly-dholera-times.webp";
// import img3 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-dholera-times.webp";
// import img4 from "@/assets/gallery/sir/cargo-terminal-dholera-international-airport-dholera-times.webp";
// import img5 from "@/assets/gallery/sir/infrastruction-activation-area-dholera-times.webp";
// import img6 from "@/assets/gallery/sir/main-gate-tata-semiconductor-plant-dholera-times.webp";
// import img7 from "@/assets/gallery/sir/renew-solar-cell-manufacturing-plant-dholera-times.webp";
// import img8 from "@/assets/gallery/sir/riverfront-dholera-activation-area-dholera-times.webp";
// import img9 from "@/assets/gallery/sir/runway-dholera-international-airport-dholera-times.webp";
// import img10 from "@/assets/gallery/sir/silk-route-park-activation-area-dholera-times.webp";
// import img11 from "@/assets/gallery/sir/tata-semiconductor-plant-construction-dholera-times.webp";
// import img12 from "@/assets/gallery/sir/tata-solar-park-dholera-times.webp";
// import img13 from "@/assets/gallery/sir/water-treatment-plant-dholera-times.webp";
// import img14 from "@/assets/gallery/sir/westwyn-estate-dholera-residential-plots.webp";


// export default function DholeraProgressPage() {
//  const galleryImages = [
//   {
//     id: 1,
//     src: img1,
//     alt: "Solar Park Dholera",
//     caption: "5000 MW Solar Park – Dholera",
//   },
//   {
//     id: 2,
//     src: img2,
//     alt: "Ahmedabad-Dholera Expressway",
//     caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
//   },
//   {
//     id: 3,
//     src: img4,
//     alt: "Dholera International Airport",
//     caption: "Ahmedabad–Dholera Expressway",
//   },
//   {
//     id: 4,
//     src: img7,
//     alt: "Dholera ReNew Power Plant ",
//     caption: "Cargo Terminal – Dholera International Airport",
//   },
//   {
//     id: 5,
//     src: img5,
//     alt: "Dholera Activation Area Infrastructure",
//     caption: "Infrastructure – Dholera Activation Area",
//   },
//   {
//     id: 6,
//     src: img6,
//     alt: "Tata Semiconductor Plant Dholera",
//     caption: "Main Gate – Tata Semiconductor Plant",
//   },
//   {
//     id: 7,
//     src: img3,
//     alt: "Dholera Expressway",
//     caption: "ReNew Solar Cell Manufacturing Plant",
//   },
//   {
//     id: 8,
//     src: img8,
//     alt: "Dholera Riverfront Development",
//     caption: "Riverfront – Dholera Activation Area",
//   },
//   {
//     id: 9,
//     src: img9,
//     alt: "Dholera International Airport Runway",
//     caption: "Runway – Dholera International Airport",
//   },
//   {
//     id: 10,
//     src: img10,
//     alt: "Dholera Silk Route Park",
//     caption: "Silk Route Park – Activation Area",
//   },
//   {
//     id: 11,
//     src: img11,
//     alt: "Semiconductor Plant in Dholera ",
//     caption: "Tata Semiconductor Plant – Construction Phase",
//   },
//   {
//     id: 12,
//     src: img12,
//     alt: "Tata Solar Park Dholera",
//     caption: "Tata Solar Park – Dholera",
//   },
//   {
//     id: 13,
//     src: img13,
//     alt: "Water Treatment Plant Dholera",
//     caption: "Water Treatment Plant – Dholera",
//   },
//   {
//     id: 14,
//     src: img14,
//     alt: "Residential Plots in Dholera",
//     caption: "WestWyn Estate – Dholera Residential Plots",
//   },
// ];


//   const [selectedImage, setSelectedImage] = useState(null);

//   const openPopup = (image) => {
//     setSelectedImage(image);
//   };

//   const closePopup = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
//       <title>Dholera Smart City Gallery | Dholera Times</title>
//       <meta
//         name="description"
//         content="Explore the Dholera Smart City gallery by Dholera Times featuring project visuals, site progress, and development updates in Dholera SIR"
//       />
//       <meta
//         name="keywords"
//         content="Dholera Smart City, Dholera SIR, Dholera Gujarat, Smart City Dholera, Dholera Project, Dholera Investment"
//       />
//       <link
//         rel="canonical"
//         href="https://www.dholeratimes.com/gallery/dholera-sir-progress"
//       />
//       <meta name="robots" content="index, follow" />

//       {/* Hero Section */}
//       <div className="relative h-[50vh] overflow-hidden">
//         <Image
//           src={hero}
//           alt="Dholera SIR Progress"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
//           <div className="text-center px-6 py-10 max-w-4xl">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
//               Dholera SIR Progress in Every Frame
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Gallery Section */}
//       <div className="max-w-7xl mx-auto px-4 py-8">

//         {/* Gallery Grid with Enhanced Hover Effects */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {galleryImages.map((image) => (
//             <div
//               key={image.id}
//               className="group relative overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer bg-white"
//               onClick={() => openPopup(image)}
//             >
//               {/* Image Container */}
//               <div className="relative h-64 overflow-hidden">
//                 <Image
//                   src={image.src}
//                   alt={image.alt}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>
              
//               {/* Caption */}
//               <div className="p-4 text-center">
//                 <h2 className="text-lg font-bold text-gray-800 mb-2">{image.alt}</h2>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//      {/* Image Popup */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={closePopup}
//         >
//           <div className="relative max-w-4xl max-h-[90vh] mx-4">
//             <button
//               onClick={closePopup}
//               className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold z-10"
//             >
//               ×
//             </button>
//             <div className="relative w-full h-full">
//               <Image
//                 src={selectedImage.src}
//                 alt={selectedImage.alt}
//                 width={1200}
//                 height={800}
//                 className="max-h-[90vh] w-auto object-contain"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//             <div className="bg-white p-4 text-center">
//               <h3 className="text-lg font-bold">{selectedImage.alt}</h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

import hero from "@/assets/gallery/galleryHero.webp";

import img1 from "@/assets/gallery/sir/5000mw-solar-park-dholera-times.webp";
import img2 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-butterfly-dholera-times.webp";
import img3 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-dholera-times.webp";
import img4 from "@/assets/gallery/sir/cargo-terminal-dholera-international-airport-dholera-times.webp";
import img5 from "@/assets/gallery/sir/infrastruction-activation-area-dholera-times.webp";
import img6 from "@/assets/gallery/sir/main-gate-tata-semiconductor-plant-dholera-times.webp";
import img7 from "@/assets/gallery/sir/renew-solar-cell-manufacturing-plant-dholera-times.webp";
import img8 from "@/assets/gallery/sir/riverfront-dholera-activation-area-dholera-times.webp";
import img9 from "@/assets/gallery/sir/runway-dholera-international-airport-dholera-times.webp";
import img10 from "@/assets/gallery/sir/silk-route-park-activation-area-dholera-times.webp";
import img11 from "@/assets/gallery/sir/tata-semiconductor-plant-construction-dholera-times.webp";
import img12 from "@/assets/gallery/sir/tata-solar-park-dholera-times.webp";
import img13 from "@/assets/gallery/sir/water-treatment-plant-dholera-times.webp";
import img14 from "@/assets/gallery/sir/westwyn-estate-dholera-residential-plots.webp";

/* ============================================================
   GALLERY DATA
============================================================ */

const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: "Solar Park Dholera",
    caption: "5000 MW Solar Park – Dholera",
  },
  {
    id: 2,
    src: img2,
    alt: "Ahmedabad-Dholera Expressway",
    caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
  },
  {
    id: 3,
    src: img4,
    alt: "Dholera International Airport",
    caption: "Ahmedabad–Dholera Expressway",
  },
  {
    id: 4,
    src: img7,
    alt: "Dholera ReNew Power Plant ",
    caption: "Cargo Terminal – Dholera International Airport",
  },
  {
    id: 5,
    src: img5,
    alt: "Dholera Activation Area Infrastructure",
    caption: "Infrastructure – Dholera Activation Area",
  },
  {
    id: 6,
    src: img6,
    alt: "Tata Semiconductor Plant Dholera",
    caption: "Main Gate – Tata Semiconductor Plant",
  },
  {
    id: 7,
    src: img3,
    alt: "Dholera Expressway",
    caption: "ReNew Solar Cell Manufacturing Plant",
  },
  {
    id: 8,
    src: img8,
    alt: "Dholera Riverfront Development",
    caption: "Riverfront – Dholera Activation Area",
  },
  {
    id: 9,
    src: img9,
    alt: "Dholera International Airport Runway",
    caption: "Runway – Dholera International Airport",
  },
  {
    id: 10,
    src: img10,
    alt: "Dholera Silk Route Park",
    caption: "Silk Route Park – Activation Area",
  },
  {
    id: 11,
    src: img11,
    alt: "Semiconductor Plant in Dholera ",
    caption: "Tata Semiconductor Plant – Construction Phase",
  },
  {
    id: 12,
    src: img12,
    alt: "Tata Solar Park Dholera",
    caption: "Tata Solar Park – Dholera",
  },
  {
    id: 13,
    src: img13,
    alt: "Water Treatment Plant Dholera",
    caption: "Water Treatment Plant – Dholera",
  },
  {
    id: 14,
    src: img14,
    alt: "Residential Plots in Dholera",
    caption: "WestWyn Estate – Dholera Residential Plots",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function DholeraProgressPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  /* =========================================================
     MODAL UX
  ========================================================= */

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [selectedImage]);

  return (
    <>
      <title>
        Dholera Smart City Gallery | Dholera Times
      </title>

      <meta
        name="description"
        content="Explore the Dholera Smart City gallery by Dholera Times featuring project visuals, site progress, and development updates in Dholera SIR"
      />

      <meta
        name="keywords"
        content="Dholera Smart City, Dholera SIR, Dholera Gujarat, Smart City Dholera, Dholera Project, Dholera Investment"
      />

      <link
        rel="canonical"
        href="https://www.dholeratimes.com/gallery/dholera-sir-progress"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <main
        className="
          min-h-screen

          bg-[#FAF7F8]

          text-[#39252E]

          selection:bg-[#E0A4B5]
          selection:text-[#39252E]
        "
      >
        {/* ===================================================
            HERO
        ==================================================== */}

        <section
          aria-labelledby="gallery-heading"
          className="
            relative

            h-[38vh]
            min-h-[300px]

            overflow-hidden

            sm:h-[42vh]
            sm:min-h-[340px]

            md:h-[46vh]
            md:min-h-[380px]

            lg:h-[48vh]
            lg:min-h-[420px]
          "
        >
          <Image
            src={hero}
            alt="Dholera SIR Progress"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          {/* softer overlay */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-[#39252E]/55
              via-[#39252E]/25
              to-[#8F2946]/18
            "
          />

          {/* bottom depth */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              bottom-0

              h-32

              bg-gradient-to-t
              from-[#39252E]/35
              to-transparent
            "
          />

          <div
            className="
              relative
              z-10

              mx-auto

              flex
              h-full
              w-full
              max-w-7xl

              items-center
              justify-center

              px-4

              min-[414px]:px-5

              sm:px-6

              md:px-8
            "
          >
            <h1
              id="gallery-heading"
              className="
                max-w-[800px]

                text-center

                text-[30px]
                font-semibold
                leading-[1.15]

                tracking-[-0.03em]

                text-white

                drop-shadow-[0_2px_10px_rgba(57,37,46,0.28)]

                min-[414px]:text-[32px]

                sm:text-[38px]

                md:text-[44px]

                lg:text-[50px]
              "
            >
              Dholera SIR Progress in Every Frame
            </h1>
          </div>
        </section>

        {/* ===================================================
            GALLERY
        ==================================================== */}

        <section
          className="
            px-8

            py-10

            min-[414px]:px-5
            min-[414px]:py-10

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

            lg:py-16
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            <div
              className="
                grid
                grid-cols-1

                gap-5

                sm:grid-cols-2
                sm:gap-6

                lg:grid-cols-3

                xl:gap-7
              "
            >
              {galleryImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => openPopup(image)}
                  aria-label={`View ${image.alt}`}
                  className="
                    group

                    relative

                    flex
                    min-w-0
                    flex-col

                    overflow-hidden

                    rounded-2xl

                    border
                    border-[#E0A4B5]/65

                    bg-white

                    text-left

                    shadow-[0_6px_22px_rgba(57,37,46,0.05)]

                    transition-[border-color,box-shadow,transform]
                    duration-300
                    ease-out

                    md:hover:-translate-y-1
                    md:hover:border-[#8F2946]

                    md:hover:shadow-[0_16px_38px_rgba(116,32,57,0.12)]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#8F2946]
                    focus-visible:ring-offset-3

                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative

                      aspect-[4/3]
                      w-full

                      overflow-hidden

                      bg-[#F3E7EC]
                    "
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="
                        (max-width: 639px) calc(100vw - 32px),
                        (max-width: 1023px) 50vw,
                        33vw
                      "
                      className="
                        object-cover

                        transition-transform
                        duration-500
                        ease-out

                        md:group-hover:scale-[1.035]

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                    />

                    {/* subtle image overlay */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-[#39252E]/28
                        via-transparent
                        to-transparent

                        opacity-70

                        transition-opacity
                        duration-300

                        md:group-hover:opacity-100
                      "
                    />

                    {/* Zoom indicator */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-3
                        right-3

                        flex
                        h-10
                        w-10

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/35

                        bg-white/90

                        text-[#8F2946]

                        shadow-[0_4px_16px_rgba(57,37,46,0.15)]

                        backdrop-blur-sm

                        transition-[background-color,color,transform]
                        duration-200

                        md:translate-y-1
                        md:opacity-0

                        md:group-hover:translate-y-0
                        md:group-hover:opacity-100

                        motion-reduce:transform-none
                      "
                    >
                      <ZoomIn
                        size={19}
                        strokeWidth={1.9}
                      />
                    </div>
                  </div>

                  {/* TITLE */}

                  <div
                    className="
                      flex
                      min-h-[76px]
                      w-full

                      items-center

                      px-4
                      py-4

                      min-[414px]:px-5

                      sm:min-h-[82px]
                      sm:py-5
                    "
                  >
                    <h2
                      className="
                        text-[16px]
                        font-semibold
                        leading-[24px]

                        tracking-[-0.01em]

                        text-[#39252E]

                        transition-colors
                        duration-200

                        md:group-hover:text-[#8F2946]

                        sm:text-[17px]
                        sm:leading-[25px]
                      "
                    >
                      {image.alt}
                    </h2>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            IMAGE POPUP
        ==================================================== */}

        {selectedImage && (
          <div
            role="presentation"
            className="
              fixed
              inset-0
              z-[1000]

              flex
              items-center
              justify-center

              bg-[#39252E]/80

              p-3

              backdrop-blur-[5px]

              sm:p-5
              lg:p-6
            "
            onClick={closePopup}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={selectedImage.alt}
              onClick={(event) => event.stopPropagation()}
              className="
                relative

                flex

                h-[70dvh]
                w-full
                max-w-[94vw]

                flex-col

                overflow-hidden

                rounded-[18px]

                border
                border-[#EAD9DF]

                bg-white

                shadow-[0_28px_80px_rgba(34,17,24,0.36)]

                min-[414px]:rounded-[20px]

                sm:h-[82vh]
                sm:max-w-4xl
                sm:rounded-[24px]

                lg:h-[88vh]
                lg:max-w-6xl
              "
            >
          

              {/* Close Button */}
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close image preview"
                className="
                  absolute
                  right-3
                  top-3
                  z-40

                  flex
                  h-11
                  w-11

                  touch-manipulation

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/35

                  bg-black/45

                  text-white

                  shadow-[0_6px_20px_rgba(0,0,0,0.25)]

                  backdrop-blur-md

                  transition-[background-color,color,transform]
                  duration-200

                  active:scale-95

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#39252E]

                  sm:right-4
                  sm:top-4

                  sm:border-[#EAD9DF]
                  sm:bg-white/95
                  sm:text-[#39252E]

                  sm:hover:bg-[#F7EBEF]
                  sm:hover:text-[#8F2946]

                  motion-reduce:transform-none
                "
              >
                <X
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>

              {/* Image Area */}
              <div
                className="
                  relative

                  min-h-0
                  w-full
                  flex-1

                  overflow-hidden

                  bg-[#39252E]
                "
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority
                  sizes="
                    (max-width: 639px) 94vw,
                    (max-width: 1024px) 90vw,
                    1152px
                  "
                  className="
                    h-full
                    w-full

                    object-cover
                    object-center
                  "
                />

                {/* Top gradient */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0

                    h-24

                    bg-gradient-to-b
                    from-black/35
                    to-transparent
                  "
                />

                {/* Mobile caption overlay */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-20

                    px-4
                    pb-4
                    pt-14

                    bg-gradient-to-t
                    from-black/75
                    via-black/30
                    to-transparent

                    sm:hidden
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      mb-2.5
                      h-1
                      w-9
                      rounded-full
                      bg-[#E0A4B5]
                    "
                  />

                  <h3
                    className="
                      max-w-[90%]

                      text-[17px]
                      font-semibold
                      leading-[1.4]

                      tracking-[-0.01em]

                      text-white
                    "
                  >
                    {selectedImage.alt}
                  </h3>
                </div>
              </div>

              {/* Desktop / Tablet Caption */}
              <div
                className="
                  hidden

                  shrink-0

                  border-t
                  border-[#EAD9DF]

                  bg-white

                  px-6
                  py-5

                  sm:block
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    mb-2.5
                    h-1
                    w-9
                    rounded-full
                    bg-[#E0A4B5]
                  "
                />

                <h3
                  className="
                    pr-4

                    text-[18px]
                    font-semibold
                    leading-[1.35]

                    tracking-[-0.01em]

                    text-[#39252E]

                    sm:text-[20px]
                  "
                >
                  {selectedImage.alt}
                </h3>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
