"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import BlogCard from "./BlogCard";

export default function BlogSlider({
  posts = [],
}) {
  const [current, setCurrent] =
    useState(0);

  const [cols, setCols] =
    useState(1);

  /* ============================================================
     RESPONSIVE COLUMN COUNT
  ============================================================ */

  useEffect(() => {
    const updateColumns = () => {
      const width =
        window.innerWidth;

      if (width >= 1024) {
        setCols(3);
      } else if (
        width >= 768
      ) {
        setCols(2);
      } else {
        setCols(1);
      }
    };

    updateColumns();

    window.addEventListener(
      "resize",
      updateColumns,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateColumns,
      );
    };
  }, []);

  /* ============================================================
     RESET SLIDER WHEN COLUMN COUNT CHANGES
  ============================================================ */

  useEffect(() => {
    setCurrent(0);
  }, [cols]);

  /* ============================================================
     PAGES
  ============================================================ */

  const pages = useMemo(() => {
    if (!posts.length) {
      return [];
    }

    const result = [];

    for (
      let index = 0;
      index < posts.length;
      index += cols
    ) {
      result.push(
        posts.slice(
          index,
          index + cols,
        ),
      );
    }

    return result;
  }, [posts, cols]);

  const totalSlides =
    pages.length;

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const prev = () => {
    setCurrent((value) =>
      Math.max(
        value - 1,
        0,
      ),
    );
  };

  const next = () => {
    setCurrent((value) =>
      Math.min(
        value + 1,
        totalSlides - 1,
      ),
    );
  };

  /* ============================================================
     EMPTY STATE
  ============================================================ */

  if (!posts.length) {
    return (
      <div
        className="
          w-full

          bg-black/[0.025]

          px-5
          py-8

          text-center

          sm:px-6
          sm:py-10
        "
      >
        <h3
          className="
            text-[20px]
            font-semibold
            leading-[1.3]

            tracking-[-0.015em]

            text-black

            sm:text-[22px]
          "
        >
          No Blog Posts Available
        </h3>

        <p
          className="
            mx-auto
            mt-2

            max-w-xl

            text-[14px]
            leading-6

            text-black/60

            sm:text-[15px]
          "
        >
          Check back soon for information about Dholera SIR investment
          opportunities.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
      "
    >
      {/* ======================================================
          SLIDER VIEWPORT
      ======================================================= */}

      <div
        className="
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            flex

            transition-transform
            duration-500
            ease-out

            motion-reduce:transition-none
          "
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {pages.map(
            (
              page,
              pageIndex,
            ) => (
              <div
                key={pageIndex}
                className="
                  grid
                  w-full
                  min-w-full
                  shrink-0

                  auto-rows-fr

                  gap-4

                  md:gap-5

                  lg:gap-6
                "
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {page.map(
                  (post) => (
                    <div
                      key={
                        post._id ||
                        post.slug
                          ?.current ||
                        post.title
                      }
                      className="
                        min-w-0
                        h-full

                        [&>*]:h-full
                      "
                    >
                      <BlogCard
                        post={post}
                      />
                    </div>
                  ),
                )}

                {/* Keep the last page aligned on tablet/desktop */}
                {page.length <
                  cols &&
                  Array.from({
                    length:
                      cols -
                      page.length,
                  }).map(
                    (
                      _,
                      index,
                    ) => (
                      <div
                        key={`empty-${index}`}
                        aria-hidden="true"
                        className="
                          hidden
                          min-w-0

                          md:block
                        "
                      />
                    ),
                  )}
              </div>
            ),
          )}
        </div>
      </div>

      {/* ======================================================
          SLIDER CONTROLS
      ======================================================= */}

      {totalSlides > 1 && (
        <div
          className="
            mt-5

            flex
            items-center
            justify-between

            gap-4

            sm:mt-6
          "
        >
          {/* ==================================================
              DOTS
          =================================================== */}

          <div
            className="
              flex
              min-w-0
              flex-1

              flex-wrap
              items-center

              gap-2
            "
          >
            {pages.map(
              (
                _,
                index,
              ) => {
                const isActive =
                  current ===
                  index;

                return (
                  <button
                    key={
                      index
                    }
                    type="button"
                    onClick={() =>
                      setCurrent(
                        index,
                      )
                    }
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={
                      isActive
                        ? "true"
                        : undefined
                    }
                    className={`
                      h-2

                      rounded-full

                      transition-[width,background-color]
                      duration-300

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#EC1C40]
                      focus-visible:ring-offset-2

                      ${
                        isActive
                          ? "w-7 bg-[#EC1C40]"
                          : "w-2 bg-black/15 hover:bg-[#EC1C40]/40"
                      }

                      motion-reduce:transition-none
                    `}
                  />
                );
              },
            )}
          </div>

          {/* ==================================================
              ARROWS
          =================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center

              gap-2.5

              sm:gap-3
            "
          >
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={prev}
              disabled={
                current === 0
              }
              aria-label="Previous slide"
              className="
                inline-flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                border
                border-[#EC1C40]/10

                bg-[#EC1C40]/5

                text-[#EC1C40]

                shadow-[0_5px_16px_rgba(0,0,0,0.05)]

                transition-[background-color,color,border-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:border-[#EC1C40]
                hover:bg-[#EC1C40]
                hover:text-white
                hover:shadow-[0_9px_20px_rgba(0,0,0,0.10)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:border-black/5
                disabled:bg-black/[0.025]
                disabled:text-black/25
                disabled:shadow-none

                disabled:hover:translate-y-0
                disabled:hover:border-black/5
                disabled:hover:bg-black/[0.025]
                disabled:hover:text-black/25

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                sm:h-12
                sm:w-12

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <ChevronLeft
                aria-hidden="true"
                strokeWidth={2}
                className="
                  h-5
                  w-5

                  sm:h-[22px]
                  sm:w-[22px]
                "
              />
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={next}
              disabled={
                current ===
                totalSlides - 1
              }
              aria-label="Next slide"
              className="
                inline-flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                border
                border-[#EC1C40]

                bg-[#EC1C40]

                text-white

                shadow-[0_7px_18px_rgba(236,28,64,0.18)]

                transition-[background-color,border-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#EC1C40]
                hover:shadow-[0_10px_24px_rgba(236,28,64,0.24)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:border-black/5
                disabled:bg-black/[0.04]
                disabled:text-black/25
                disabled:shadow-none

                disabled:hover:translate-y-0
                disabled:hover:border-black/5
                disabled:hover:bg-black/[0.04]
                disabled:hover:text-black/25

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                sm:h-12
                sm:w-12

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <ChevronRight
                aria-hidden="true"
                strokeWidth={2}
                className="
                  h-5
                  w-5

                  sm:h-[22px]
                  sm:w-[22px]
                "
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}