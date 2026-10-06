"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   RELATED BLOG CAROUSEL

   - Uses existing RelatedBlogCard children
   - Does not change card design
   - Does not fetch data
   - Does not duplicate card markup
============================================================ */

export default function RelatedBlogCarousel({
  children,
}) {
  const sliderRef =
    useRef(null);

  const [
    canScrollLeft,
    setCanScrollLeft,
  ] = useState(false);

  const [
    canScrollRight,
    setCanScrollRight,
  ] = useState(false);

  const [
    currentPosition,
    setCurrentPosition,
  ] = useState(0);

  const [
    totalPositions,
    setTotalPositions,
  ] = useState(1);

  /* =========================================================
     MEASURE EXISTING CARD
  ========================================================= */

  const getMeasurements =
    () => {
      const slider =
        sliderRef.current;

      if (!slider) {
        return null;
      }

      const card =
        slider.querySelector(
          "[data-related-blog-card]",
        );

      if (!card) {
        return null;
      }

      const cardWidth =
        card.getBoundingClientRect()
          .width;

      const styles =
        window.getComputedStyle(
          slider,
        );

      const gap =
        Number.parseFloat(
          styles.columnGap ||
            styles.gap ||
            "0",
        ) || 0;

      return {
        slider,

        step:
          cardWidth + gap,
      };
    };

  /* =========================================================
     UPDATE ARROWS + INDICATORS
  ========================================================= */

  const updateSlider =
    () => {
      const measurements =
        getMeasurements();

      if (!measurements) {
        return;
      }

      const {
        slider,
        step,
      } = measurements;

      const maxScroll =
        Math.max(
          slider.scrollWidth -
            slider.clientWidth,
          0,
        );

      const currentScroll =
        Math.max(
          slider.scrollLeft,
          0,
        );

      const position =
        step > 0
          ? Math.round(
              currentScroll /
                step,
            )
          : 0;

      const maxPosition =
        step > 0
          ? Math.round(
              maxScroll /
                step,
            )
          : 0;

      setCurrentPosition(
        Math.min(
          position,
          maxPosition,
        ),
      );

      setTotalPositions(
        Math.max(
          maxPosition + 1,
          1,
        ),
      );

      setCanScrollLeft(
        currentScroll > 4,
      );

      setCanScrollRight(
        currentScroll <
          maxScroll - 4,
      );
    };

  /* =========================================================
     SCROLL / RESIZE
  ========================================================= */

  useEffect(() => {
    const slider =
      sliderRef.current;

    if (!slider) {
      return;
    }

    const frame =
      window.requestAnimationFrame(
        updateSlider,
      );

    slider.addEventListener(
      "scroll",
      updateSlider,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateSlider,
    );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      slider.removeEventListener(
        "scroll",
        updateSlider,
      );

      window.removeEventListener(
        "resize",
        updateSlider,
      );
    };
  }, []);

  /* =========================================================
     ONE CARD PER CLICK

     Desktop:
     1 card

     Tablet:
     1 card

     Mobile:
     1 card

     Always the same behaviour.
  ========================================================= */

  const slideOneCard = (
    direction,
  ) => {
    const measurements =
      getMeasurements();

    if (!measurements) {
      return;
    }

    const {
      slider,
      step,
    } = measurements;

    slider.scrollBy({
      left:
        direction *
        step,

      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        w-full
      "
    >
      {/* =====================================================
          CARDS

          IMPORTANT:
          Existing gaps retained:

          mobile = gap-4
          sm/md = gap-5
          lg = gap-4
          xl = gap-5
      ====================================================== */}

      <div
        ref={sliderRef}
        role="region"
        aria-labelledby="latest-updates-heading"
        tabIndex={0}
        className="
          flex

          snap-x
          snap-mandatory

          items-stretch

          gap-4

          overflow-x-auto
          overflow-y-hidden

          overscroll-x-contain

          scroll-smooth

          pb-1
          pt-1

          touch-pan-x

          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#EC1C40]

          sm:gap-5

          md:gap-5

          lg:gap-4

          xl:gap-5

          [&::-webkit-scrollbar]:hidden

          [-ms-overflow-style:none]

          [scrollbar-width:none]
        "
      >
        {children}
      </div>

      {/* =====================================================
          SLIDER CONTROLS

          Same pattern as reference:
          indicator left
          arrows right
      ====================================================== */}

      <div
        className="
          mt-6

          flex

          items-center
          justify-between
        "
      >
        {/* =================================================
            INDICATORS
        ================================================== */}

        <div
          className="
            flex

            items-center

            gap-2
          "
          aria-label={`Slide ${
            currentPosition + 1
          } of ${totalPositions}`}
        >
          {Array.from({
            length:
              totalPositions,
          }).map(
            (
              _,
              index,
            ) => (
              <span
                key={index}
                aria-hidden="true"
                className={`
                  block

                  shrink-0

                  rounded-full

                  transition-[width,background-color]
                  duration-200
                  ease-out

                  ${
                    index ===
                    currentPosition
                      ? `
                        h-[6px]
                        w-[28px]

                        bg-[#EC1C40]
                      `
                      : `
                        h-[7px]
                        w-[7px]

                        bg-black/15
                      `
                  }
                `}
              />
            ),
          )}
        </div>

        {/* =================================================
            ARROWS
        ================================================== */}

        <div
          className="
            flex

            items-center

            gap-3
          "
        >
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={() =>
              slideOneCard(-1)
            }
            disabled={
              !canScrollLeft
            }
            aria-label="Previous update"
            className="
              inline-flex

              h-11
              w-11

              touch-manipulation

              items-center
              justify-center

              rounded-full

              border
              border-black/[0.07]

              bg-black/[0.025]

              text-black/45

              shadow-[0_4px_14px_rgba(0,0,0,0.035)]

              transition-[background-color,border-color,color,transform,box-shadow]
              duration-200
              ease-out

              enabled:hover:-translate-y-0.5

              enabled:hover:border-[#EC1C40]/20
              enabled:hover:bg-[#EC1C40]/5
              enabled:hover:text-[#EC1C40]

              enabled:active:translate-y-0
              enabled:active:scale-95

              disabled:cursor-not-allowed
              disabled:border-black/[0.045]
              disabled:bg-black/[0.018]
              disabled:text-black/20
              disabled:shadow-none

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]/40
              focus-visible:ring-offset-2

              sm:h-12
              sm:w-12

              motion-reduce:transform-none
            "
          >
            <ChevronLeft
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={() =>
              slideOneCard(1)
            }
            disabled={
              !canScrollRight
            }
            aria-label="Next update"
            className="
              inline-flex

              h-11
              w-11

              touch-manipulation

              items-center
              justify-center

              rounded-full

              border
              border-[#EC1C40]

              bg-[#EC1C40]

              text-white

              shadow-[0_8px_22px_rgba(236,28,64,0.22)]

              transition-[background-color,border-color,color,transform,box-shadow]
              duration-200
              ease-out

              enabled:hover:-translate-y-0.5

              enabled:hover:bg-[#d9183a]

              enabled:hover:shadow-[0_10px_28px_rgba(236,28,64,0.28)]

              enabled:active:translate-y-0
              enabled:active:scale-95

              disabled:cursor-not-allowed
              disabled:border-black/[0.05]
              disabled:bg-black/[0.025]
              disabled:text-black/20
              disabled:shadow-none

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]/40
              focus-visible:ring-offset-2

              sm:h-12
              sm:w-12

              motion-reduce:transform-none
            "
          >
            <ChevronRight
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}