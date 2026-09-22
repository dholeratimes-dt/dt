// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import hero1 from "@/assets/hero/abcd-building-dholera-homepage.webp";
// import hero2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage.webp";
// import hero3 from "@/assets/hero/dholera-smart-city-indias-planned-smart-city-homepage.webp";
// import heroM1 from "@/assets/hero/abcd-building-dholera-homepage-mobile.webp";
// import heroM2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage-mobile.webp";
// import heroM3 from "@/assets/hero/dholera-smart-city-mobile-banner-dholera-times.webp";
// import HeroForm from "./HeroForm";

// const slides = [
//   { desktop: hero1, mobile: heroM1, alt: "ABCD Building Dholera" },
//   { desktop: hero2, mobile: heroM2, alt: "TATA Semiconductor Plant Dholera" },
//   { desktop: hero3, mobile: heroM3, alt: "Dholera Activation Area" },
// ];

// const DESKTOP_WIDTHS = [640, 750, 828, 1080, 1200, 1920];
// const MOBILE_WIDTHS = [640];

// function nextImageUrl(src, width, quality = 85) {
//   return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
// }

// function buildSrcSet(image, widths, quality = 85) {
//   return widths
//     .map((width) => `${nextImageUrl(image.src, width, quality)} ${width}w`)
//     .join(", ");
// }

// function HeroSlideImage({ slide, isFirst }) {
//   return (
//     <picture className="block h-full w-full">
//       <source
//         media="(min-width: 768px)"
//         sizes="100vw"
//         srcSet={buildSrcSet(slide.desktop, DESKTOP_WIDTHS)}
//       />
//       <source
//         media="(max-width: 767px)"
//         sizes="100vw"
//         srcSet={buildSrcSet(slide.mobile, MOBILE_WIDTHS)}
//       />
//       <img
//         src={nextImageUrl(slide.mobile.src, 640)}
//         alt={slide.alt}
//         width={slide.mobile.width}
//         height={slide.mobile.height}
//         loading={isFirst ? "eager" : "lazy"}
//         fetchPriority={isFirst ? "high" : "auto"}
//         decoding="async"
//         className="h-full w-full object-cover"
//       />
//     </picture>
//   );
// }

// export default function HOME2() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [submissionCount, setSubmissionCount] = useState(0);
//   const [isDisabled, setIsDisabled] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const storedCount = parseInt(
//       localStorage.getItem("heroFormSubmissionCount") || "0",
//       10,
//     );
//     const lastSubmission = parseInt(
//       localStorage.getItem("heroFormLastSubmissionTime") || "0",
//       10,
//     );

//     if (lastSubmission) {
//       const hoursPassed = (Date.now() - lastSubmission) / (1000 * 60 * 60);

//       if (hoursPassed >= 24) {
//         localStorage.setItem("heroFormSubmissionCount", "0");
//         localStorage.setItem(
//           "heroFormLastSubmissionTime",
//           Date.now().toString(),
//         );
//       } else {
//         setSubmissionCount(storedCount);
//         if (storedCount >= 20) setIsDisabled(true);
//       }
//     } else {
//       setSubmissionCount(storedCount);
//     }
//   }, []);

//   const updateSubmissionCount = useCallback(() => {
//     setSubmissionCount((prev) => {
//       const next = prev + 1;

//       if (typeof window !== "undefined") {
//         localStorage.setItem("heroFormSubmissionCount", String(next));
//         localStorage.setItem("heroFormLastSubmissionTime", String(Date.now()));
//       }

//       if (next >= 20) setIsDisabled(true);
//       return next;
//     });
//   }, []);

//   const handleFormSuccess = useCallback(() => {
//     setShowPopup(true);
//     updateSubmissionCount();
//   }, [updateSubmissionCount]);

//   const nextSlide = useCallback(
//     () => setCurrentSlide((p) => (p + 1) % slides.length),
//     [],
//   );

//   const prevSlide = useCallback(
//     () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length),
//     [],
//   );

//   useEffect(() => {
//     const id = setInterval(nextSlide, 5000);
//     return () => clearInterval(id);
//   }, [nextSlide]);

//   return (
//     <>
//       {showPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl">
//             <h2 className="text-xl font-bold text-black mb-2">Thank You!</h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Our team will get back to you shortly.
//             </p>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="bg-[#deae3c] hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="relative w-full overflow-hidden">
//         <div
//           className="flex w-full transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {slides.map((slide, index) => {
//             const isFirst = index === 0;

//             return (
//               <div key={index} className="w-full flex-shrink-0 relative">
//                 <div className="relative w-full aspect-[5/8] md:aspect-auto md:h-[80vh]">
//                   <HeroSlideImage slide={slide} isFirst={isFirst} />
//                   <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/60" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div
//           className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 -translate-x-1/3"
//           style={{ right: "clamp(4.5rem, calc(3rem + 2.5vw), 7rem)" }}
//         >
//           <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
//         </div>

//         <div className="flex md:hidden absolute bottom-20 left-0 right-0 z-20 px-4 pb-6">
//           <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
//         </div>

//         <button
//           onClick={prevSlide}
//           className="absolute max-sm:hidden top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft size={24} className="text-[#151f28]" />
//         </button>

//         <button
//           onClick={nextSlide}
//           className="absolute max-sm:hidden top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
//           aria-label="Next slide"
//         >
//           <ChevronRight size={24} className="text-[#151f28]" />
//         </button>
//       </div>
//     </>
//   );
// }




"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import hero1 from "@/assets/hero/abcd-building-dholera-homepage.webp";
import hero2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage.webp";
import hero3 from "@/assets/hero/dholera-smart-city-indias-planned-smart-city-homepage.webp";

import heroM1 from "@/assets/hero/abcd-building-dholera-homepage-mobile.webp";
import heroM2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage-mobile.webp";
import heroM3 from "@/assets/hero/dholera-smart-city-mobile-banner-dholera-times.webp";

import HeroForm from "./HeroForm";

/* ============================================================
   SLIDES
============================================================ */

const slides = [
  {
    desktop: hero1,
    mobile: heroM1,
    alt: "ABCD Building Dholera",
  },
  {
    desktop: hero2,
    mobile: heroM2,
    alt: "TATA Semiconductor Plant Dholera",
  },
  {
    desktop: hero3,
    mobile: heroM3,
    alt: "Dholera Activation Area",
  },
];

/* ============================================================
   HERO IMAGE

   Phone:
   Existing vertical 5/8 behavior.

   Tablet/Desktop:
   Desktop image is rendered at its NATURAL aspect ratio.
   There is no fixed hero height and no object-contain box.
============================================================ */

function HeroSlideImage({
  slide,
  isFirst,
}) {
  return (
    <>
      {/* MOBILE */}

      <div
        className="
          relative

          aspect-[5/8]
          w-full

          md:hidden
        "
      >
        <Image
          src={slide.mobile}
          alt={slide.alt}
          fill
          priority={isFirst}
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* TABLET / DESKTOP */}

      <Image
        src={slide.desktop}
        alt={slide.alt}
        priority={isFirst}
        sizes="100vw"
        className="
          hidden

          h-auto
          w-full

          md:block
        "
      />
    </>
  );
}

/* ============================================================
   COMPONENT
============================================================ */

export default function HOME2() {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const [
    showPopup,
    setShowPopup,
  ] = useState(false);

  const [
    submissionCount,
    setSubmissionCount,
  ] = useState(0);

  const [
    isDisabled,
    setIsDisabled,
  ] = useState(false);

  /* ==========================================================
     RESTORE SUBMISSION COUNT
  ========================================================== */

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const storedCount =
      Number.parseInt(
        localStorage.getItem(
          "heroFormSubmissionCount",
        ) || "0",
        10,
      );

    const lastSubmission =
      Number.parseInt(
        localStorage.getItem(
          "heroFormLastSubmissionTime",
        ) || "0",
        10,
      );

    if (lastSubmission) {
      const hoursPassed =
        (Date.now() -
          lastSubmission) /
        (1000 * 60 * 60);

      if (hoursPassed >= 24) {
        localStorage.setItem(
          "heroFormSubmissionCount",
          "0",
        );

        localStorage.setItem(
          "heroFormLastSubmissionTime",
          Date.now().toString(),
        );

        setSubmissionCount(0);
        setIsDisabled(false);
      } else {
        setSubmissionCount(
          storedCount,
        );

        if (storedCount >= 20) {
          setIsDisabled(true);
        }
      }
    } else {
      setSubmissionCount(
        storedCount,
      );

      if (storedCount >= 20) {
        setIsDisabled(true);
      }
    }
  }, []);

  /* ==========================================================
     UPDATE COUNT
  ========================================================== */

  const updateSubmissionCount =
    useCallback(() => {
      setSubmissionCount(
        (previousCount) => {
          const next =
            previousCount + 1;

          if (
            typeof window !==
            "undefined"
          ) {
            localStorage.setItem(
              "heroFormSubmissionCount",
              String(next),
            );

            localStorage.setItem(
              "heroFormLastSubmissionTime",
              String(Date.now()),
            );
          }

          if (next >= 20) {
            setIsDisabled(true);
          }

          return next;
        },
      );
    }, []);

  /* ==========================================================
     SUCCESS
  ========================================================== */

  const handleFormSuccess =
    useCallback(() => {
      setShowPopup(true);

      updateSubmissionCount();
    }, [updateSubmissionCount]);

  /* ==========================================================
     SLIDER
  ========================================================== */

  const nextSlide =
    useCallback(() => {
      setCurrentSlide(
        (previous) =>
          (previous + 1) %
          slides.length,
      );
    }, []);

  const prevSlide =
    useCallback(() => {
      setCurrentSlide(
        (previous) =>
          (previous -
            1 +
            slides.length) %
          slides.length,
      );
    }, []);

  /* ==========================================================
     AUTO PLAY
  ========================================================== */

  useEffect(() => {
    const interval =
      setInterval(
        nextSlide,
        5000,
      );

    return () => {
      clearInterval(
        interval,
      );
    };
  }, [nextSlide]);

  /* ==========================================================
     SLIDER POSITION
  ========================================================== */

  const trackPosition = [
    "translate-x-0",
    "-translate-x-full",
    "-translate-x-[200%]",
  ][currentSlide];

  return (
    <>
      {/* =====================================================
          SUCCESS POPUP
      ====================================================== */}

      {showPopup && (
        <div
          className="
            fixed
            inset-0
            z-[100]

            flex
            items-center
            justify-center

            bg-[#39252E]/65

            px-4
            py-6

            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full
              max-w-sm

              rounded-2xl

              border
              border-[#EAD9DF]

              bg-white

              p-6

              text-center

              shadow-[0_24px_70px_-24px_rgba(57,37,46,0.45)]

              sm:p-8
            "
          >
            <h2
              className="
                text-[22px]
                font-semibold
                leading-7

                tracking-[-0.02em]

                text-[#39252E]
              "
            >
              Thank You!
            </h2>

            <p
              className="
                mt-2

                text-[15px]
                leading-6

                text-[#68565E]
              "
            >
              Our team will get back to you shortly.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowPopup(false)
              }
              className="
                mt-5

                inline-flex
                min-h-[48px]

                items-center
                justify-center

                rounded-lg

                bg-[#8F2946]

                px-6
                py-3

                text-[15px]
                font-semibold

                text-white

                transition-colors
                duration-200

                hover:bg-[#742039]
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          HERO

          IMPORTANT:

          Mobile:
          Navbar is still overlay-style, therefore the existing
          72px / 76px compensation remains.

          >=768px:
          Navbar is normal flow.
          No padding.
          No margin.
          No fixed hero height.
      ====================================================== */}

      <section
        aria-roledescription="carousel"
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
        {/* ===================================================
            SLIDER
        ==================================================== */}

        <div
          className={`
            flex
            w-full

            items-start

            transform-gpu

            ${trackPosition}

            transition-transform
            duration-700

            ease-[cubic-bezier(0.22,1,0.36,1)]

            motion-reduce:transition-none
          `}
        >
          {slides.map(
            (slide, index) => {
              const isFirst =
                index === 0;

              return (
                <div
                  key={index}
                  aria-hidden={
                    currentSlide !==
                    index
                  }
                  className="
                    relative

                    w-full
                    min-w-full

                    flex-shrink-0

                    m-0
                    p-0
                  "
                >
                  {/* =========================================
                      IMAGE CONTAINER

                      NO desktop fixed height.
                      NO object-contain letterboxing.
                  ========================================== */}

                  <div
                    className="
                      relative

                      m-0
                      w-full

                      overflow-hidden

                      p-0
                    "
                  >
                    <HeroSlideImage
                      slide={slide}
                      isFirst={
                        isFirst
                      }
                    />

                    {/* MOBILE OVERLAY */}

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

                    {/* DESKTOP OVERLAY */}

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
                </div>
              );
            },
          )}
        </div>

        {/* ===================================================
            DESKTOP / TABLET FORM

            top-1/2 now references only the actual banner,
            because there is no desktop top spacer.
        ==================================================== */}

        <div
          className="
            absolute

            right-[clamp(1.5rem,4.5vw,5rem)]
            top-1/2

            z-20

            hidden

            -translate-y-1/2

            md:block
            md:w-[330px]

            lg:w-[380px]

            xl:w-[420px]
          "
        >
          <HeroForm
            isDisabled={
              isDisabled
            }
            onSuccess={
              handleFormSuccess
            }
          />
        </div>

        {/* ===================================================
            PHONE FORM
        ==================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-4

            z-20

            px-4

            md:hidden
          "
        >
          <div
            className="
              mx-auto

              w-full
              max-w-[520px]
            "
          >
            <HeroForm
              isDisabled={
                isDisabled
              }
              onSuccess={
                handleFormSuccess
              }
            />
          </div>
        </div>

        {/* ===================================================
            CONTROLS
        ==================================================== */}

        <div
          className="
            absolute

            bottom-4
            left-4

            z-20

            hidden

            items-center

            gap-2

            md:flex

            lg:bottom-5
            lg:left-6

            xl:left-8
          "
        >
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              grid
              h-12
              w-12

              place-items-center

              rounded-full

              border
              border-white/45

              bg-[#39252E]/38

              text-white

              shadow-[0_4px_18px_rgba(57,37,46,0.18)]

              backdrop-blur-md

              transition-[background-color,border-color,transform]
              duration-200

              hover:-translate-y-px
              hover:border-white/70
              hover:bg-[#39252E]/55

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white

              motion-reduce:transform-none
            "
          >
            <ChevronLeft
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              grid
              h-12
              w-12

              place-items-center

              rounded-full

              border
              border-white/45

              bg-[#39252E]/38

              text-white

              shadow-[0_4px_18px_rgba(57,37,46,0.18)]

              backdrop-blur-md

              transition-[background-color,border-color,transform]
              duration-200

              hover:-translate-y-px
              hover:border-white/70
              hover:bg-[#39252E]/55

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white

              motion-reduce:transform-none
            "
          >
            <ChevronRight
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>
      </section>
    </>
  );
}