
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import Image from "next/image";

// import hero3 from "@/assets/hero/DT-Home-Banner-Web.webp";
// import heroM2 from "@/assets/hero/DT-Home-Banner-Phone2.webp";
// import HeroForm from "./HeroForm";

// // Hero Image
// function HeroImage() {
//   return (
//     <>
//       {/* Mobile */}
//       <div className="w-full overflow-hidden md:hidden">
//         <Image
//           src={heroM2}
//           alt="Dholera Times"
//           priority
//           sizes="100vw"
//           className="block h-auto w-full object-contain"
//         />
//       </div>

//       {/* Tablet / Desktop */}
//       <Image
//         src={hero3}
//         alt="Dholera Times"
//         priority
//         sizes="100vw"
//         className="hidden h-auto w-full md:block"
//       />
//     </>
//   );
// }

// // Main Component
// export default function HOME2() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [submissionCount, setSubmissionCount] = useState(0);
//   const [isDisabled, setIsDisabled] = useState(false);

//   // Restore Submission Count
//   useEffect(() => {
//     if (typeof window === "undefined") {
//       return;
//     }

//     const storedCount = Number.parseInt(
//       localStorage.getItem("heroFormSubmissionCount") || "0",
//       10,
//     );

//     const lastSubmission = Number.parseInt(
//       localStorage.getItem("heroFormLastSubmissionTime") || "0",
//       10,
//     );

//     if (lastSubmission) {
//       const hoursPassed = (Date.now() - lastSubmission) / (1000 * 60 * 60);

//       if (hoursPassed >= 24) {
//         localStorage.setItem("heroFormSubmissionCount", "0");
//         localStorage.setItem("heroFormLastSubmissionTime", Date.now().toString());

//         setSubmissionCount(0);
//         setIsDisabled(false);
//       } else {
//         setSubmissionCount(storedCount);

//         if (storedCount >= 20) {
//           setIsDisabled(true);
//         }
//       }
//     } else {
//       setSubmissionCount(storedCount);

//       if (storedCount >= 20) {
//         setIsDisabled(true);
//       }
//     }
//   }, []);

//   // Update Submission Count
//   const updateSubmissionCount = useCallback(() => {
//     setSubmissionCount((previousCount) => {
//       const next = previousCount + 1;

//       if (typeof window !== "undefined") {
//         localStorage.setItem("heroFormSubmissionCount", String(next));
//         localStorage.setItem("heroFormLastSubmissionTime", String(Date.now()));
//       }

//       if (next >= 20) {
//         setIsDisabled(true);
//       }

//       return next;
//     });
//   }, []);

//   // Form Success
//   const handleFormSuccess = useCallback(() => {
//     setShowPopup(true);
//     updateSubmissionCount();
//   }, [updateSubmissionCount]);

//   return (
//     <>
//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#39252E]/65 px-4 py-6 backdrop-blur-[2px]">
//           <div className="w-full max-w-sm rounded-2xl border border-[#EAD9DF] bg-white p-6 text-center shadow-[0_24px_70px_-24px_rgba(57,37,46,0.45)] sm:p-8">
//             <h2 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-[#39252E]">
//               Thank You!
//             </h2>

//             <p className="mt-2 text-[15px] leading-6 text-[#68565E]">
//               Our team will get back to you shortly.
//             </p>

//             <button
//               type="button"
//               onClick={() => setShowPopup(false)}
//               className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#8F2946] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#742039]"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section
//         aria-label="Dholera Times"
//         className="relative m-0 w-full overflow-hidden bg-transparent p-0 pt-[72px] min-[480px]:pt-[76px] md:pt-0"
//       >
//         {/* Static Banner */}
//         <div className="relative m-0 w-full overflow-hidden p-0">
//           <HeroImage />

//           {/* Mobile Overlay */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#39252E]/20 via-transparent to-[#39252E]/35 md:hidden"
//           />

//           {/* Tablet / Desktop Overlay */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#39252E]/10 via-transparent to-[#742039]/10 md:block"
//           />
//         </div>

//         {/* Tablet / Desktop Form */}
//         <div className="absolute right-[clamp(1.5rem,4.5vw,5rem)] top-1/2 z-20 hidden -translate-y-1/2 md:block md:w-[330px] lg:w-[380px] xl:w-[420px]">
//           <HeroForm
//             isDisabled={isDisabled}
//             onSuccess={handleFormSuccess}
//           />
//         </div>
//       </section>
//     </>
//   );
// }


import { getImageProps } from "next/image";

import hero3 from "@/assets/hero/DT-Home-Banner-Web.webp";
import heroM2 from "@/assets/hero/DT-Home-Banner-Phone2.webp";

import HeroDesktopFormLayer from "./HeroDesktopFormLayer";

/* ============================================================
   HERO IMAGE
============================================================ */

function HeroImage() {
  const {
    props: {
      srcSet: mobileSrcSet,
      width: mobileWidth,
      height: mobileHeight,
    },
  } = getImageProps({
    src: heroM2,
    alt: "Dholera Times",
    sizes: "100vw",
    quality: 72,
  });

  const {
    props: {
      srcSet: desktopSrcSet,
      src: desktopSrc,
      width: desktopWidth,
      height: desktopHeight,
    },
  } = getImageProps({
    src: hero3,
    alt: "Dholera Times",
    sizes: "100vw",
    quality: 72,
  });

  return (
    <>
      <link rel="preload" as="image" media="(max-width: 767px)"
        imageSrcSet={mobileSrcSet} imageSizes="100vw" fetchPriority="high" />
      <link rel="preload" as="image" media="(min-width: 768px)"
        imageSrcSet={desktopSrcSet} imageSizes="100vw" fetchPriority="high" />
      <picture className="block w-full">
      {/* =====================================================
          MOBILE IMAGE

          Browser chooses this image BEFORE downloading.
          Desktop image is not downloaded on mobile.
      ====================================================== */}

      <source
        media="(max-width: 767px)"
        srcSet={mobileSrcSet}
        sizes="100vw"
        width={mobileWidth}
        height={mobileHeight}
      />

      {/* =====================================================
          DESKTOP FALLBACK

          fetchPriority=high tells browser that this is the
          important above-the-fold/LCP resource.
      ====================================================== */}

      <img
        src={desktopSrc}
        srcSet={desktopSrcSet}
        sizes="100vw"
        width={desktopWidth}
        height={desktopHeight}
        alt="Dholera Times"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="block h-auto w-full"
      />
    </picture>
    </>
  );
}

/* ============================================================
   MAIN HERO
============================================================ */

export default function HOME2() {
  return (
    <section
      aria-label="Dholera Times"
      className="
        relative
        m-0
        w-full
        overflow-hidden
        bg-transparent
        p-0

        pt-[72px]
        min-[480px]:pt-[76px]

        md:pt-0
      "
    >
      {/* =====================================================
          HERO BANNER
      ====================================================== */}

      <div className="relative m-0 w-full overflow-hidden p-0">
        <HeroImage />

        {/* Mobile overlay */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-b
            from-[#39252E]/20
            via-transparent
            to-[#39252E]/35

            md:hidden
          "
        />

        {/* Tablet / Desktop overlay */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            hidden

            bg-gradient-to-r
            from-[#39252E]/10
            via-transparent
            to-[#742039]/10

            md:block
          "
        />
      </div>

      {/* =====================================================
          DESKTOP FORM + POPUP

          Isolated client-side component.
          Mobile does not download the HeroForm chunk.
      ====================================================== */}

      <HeroDesktopFormLayer />
    </section>
  );
}
