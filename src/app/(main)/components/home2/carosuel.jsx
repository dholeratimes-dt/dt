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

const DESKTOP_WIDTHS = [
  640,
  750,
  828,
  1080,
  1200,
  1920,
];

const MOBILE_WIDTHS = [640];

/* ============================================================
   NEXT IMAGE URL
============================================================ */

function nextImageUrl(
  src,
  width,
  quality = 85,
) {
  return `/_next/image?url=${encodeURIComponent(
    src,
  )}&w=${width}&q=${quality}`;
}

function buildSrcSet(
  image,
  widths,
  quality = 85,
) {
  return widths
    .map(
      (width) =>
        `${nextImageUrl(
          image.src,
          width,
          quality,
        )} ${width}w`,
    )
    .join(", ");
}

/* ============================================================
   RESPONSIVE HERO IMAGE
============================================================ */

function HeroSlideImage({
  slide,
  isFirst,
}) {
  return (
    <picture
      className="
        block
        h-full
        w-full
      "
    >
      <source
        media="(min-width: 768px)"
        sizes="100vw"
        srcSet={buildSrcSet(
          slide.desktop,
          DESKTOP_WIDTHS,
        )}
      />

      <source
        media="(max-width: 767px)"
        sizes="100vw"
        srcSet={buildSrcSet(
          slide.mobile,
          MOBILE_WIDTHS,
        )}
      />

      <img
        src={nextImageUrl(
          slide.mobile.src,
          640,
        )}
        alt={slide.alt}
        width={slide.mobile.width}
        height={slide.mobile.height}
        loading={
          isFirst
            ? "eager"
            : "lazy"
        }
        fetchPriority={
          isFirst
            ? "high"
            : "auto"
        }
        decoding="async"
        className="
          h-full
          w-full

          object-cover
          object-center
        "
      />
    </picture>
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
     RESTORE FORM SUBMISSION COUNT
  ========================================================== */

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const storedCount = parseInt(
      localStorage.getItem(
        "heroFormSubmissionCount",
      ) || "0",
      10,
    );

    const lastSubmission = parseInt(
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
      } else {
        setSubmissionCount(
          storedCount,
        );

        if (
          storedCount >= 20
        ) {
          setIsDisabled(true);
        }
      }
    } else {
      setSubmissionCount(
        storedCount,
      );
    }
  }, []);

  /* ==========================================================
     UPDATE SUBMISSION COUNT
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
     FORM SUCCESS
  ========================================================== */

  const handleFormSuccess =
    useCallback(() => {
      setShowPopup(true);

      updateSubmissionCount();
    }, [updateSubmissionCount]);

  /* ==========================================================
     SLIDER CONTROLS
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
     AUTO SLIDE
  ========================================================== */

  useEffect(() => {
    const id = setInterval(
      nextSlide,
      5000,
    );

    return () =>
      clearInterval(id);
  }, [nextSlide]);

  /* ==========================================================
     TAILWIND-ONLY SLIDER POSITION
  ========================================================== */

  const trackPosition = [
    "translate-x-0",
    "-translate-x-full",
    "-translate-x-[200%]",
  ][currentSlide];

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      {/* ======================================================
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
                font-normal
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
                leading-6

                text-white

                transition-[background-color,transform]
                duration-200

                hover:-translate-y-px
                hover:bg-[#742039]

                active:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative

          w-full

          overflow-hidden

          bg-[#39252E]
        "
        aria-roledescription="carousel"
      >
        {/* ====================================================
            SLIDER TRACK
        ==================================================== */}

        <div
          className={`
            flex
            w-full

            transform-gpu

            ${trackPosition}

            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            motion-reduce:transition-none
          `}
        >
          {slides.map(
            (
              slide,
              index,
            ) => {
              const isFirst =
                index === 0;

              return (
                <div
                  key={index}
                  className="
                    relative

                    w-full
                    min-w-full
                    flex-shrink-0
                  "
                  aria-hidden={
                    currentSlide !==
                    index
                  }
                >
                  <div
                    className="
                      relative

                      w-full

                      aspect-[5/8]

                      md:aspect-auto
                      md:h-[clamp(650px,84vh,880px)]
                    "
                  >
                    <HeroSlideImage
                      slide={slide}
                      isFirst={
                        isFirst
                      }
                    />

                    {/* Mobile image treatment */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-b
                        from-[#39252E]/20
                        via-transparent
                        to-[#39252E]/35

                        md:hidden
                      "
                    />

                    {/* Desktop premium overlay */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0

                        hidden

                        bg-gradient-to-r
                        from-[#39252E]/38
                        via-[#39252E]/5
                        to-[#742039]/38

                        md:block
                      "
                    />

                    {/* Soft top treatment for transparent navbar */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-x-0
                        top-0

                        h-36

                        bg-gradient-to-b
                        from-[#39252E]/30
                        to-transparent

                        md:h-40
                      "
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>

        {/* ====================================================
            DESKTOP HERO FORM
        ==================================================== */}

        <div
          className="
            absolute
            top-1/2
            right-[clamp(3.5rem,5vw,6rem)]

            z-20

            hidden

            -translate-y-1/2

            md:block
            md:w-[360px]

            lg:w-[400px]

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

        {/* ====================================================
            MOBILE HERO FORM
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

        {/* ====================================================
            DESKTOP CAROUSEL CONTROLS
        ==================================================== */}

        <div
          className="
            absolute

            bottom-7
            left-6

            z-20

            hidden

            items-center

            gap-2

            md:flex

            lg:bottom-8
            lg:left-8
          "
        >
          {/* Previous */}

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
              border-white/30

              bg-white/12

              text-white

              backdrop-blur-md

              transition-[background-color,border-color,transform]
              duration-200

              hover:-translate-y-px
              hover:border-white/50
              hover:bg-white/20

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#39252E]

              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <ChevronLeft
              size={22}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          {/* Next */}

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
              border-white/30

              bg-white/12

              text-white

              backdrop-blur-md

              transition-[background-color,border-color,transform]
              duration-200

              hover:-translate-y-px
              hover:border-white/50
              hover:bg-white/20

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#39252E]

              motion-reduce:transform-none
              motion-reduce:transition-none
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
