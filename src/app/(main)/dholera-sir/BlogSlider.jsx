// "use client";

// import { useState, useEffect } from "react";
// import BlogCard from "./BlogCard";

// export default function BlogSlider({ posts }) {
//   const [current, setCurrent] = useState(0);
//   const [cols, setCols] = useState(3);

//   useEffect(() => {
//     const update = () => {
//       if (window.innerWidth >= 1024) setCols(3);
//       else if (window.innerWidth >= 768) setCols(2);
//       else setCols(1);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   // Reset to first slide when cols change
//   useEffect(() => {
//     setCurrent(0);
//   }, [cols]);

//   const totalSlides = Math.ceil(posts.length / cols);
//   const clamp = (n) => Math.min(Math.max(n, 0), totalSlides - 1);

//   const prev = () => setCurrent((c) => clamp(c - 1));
//   const next = () => setCurrent((c) => clamp(c + 1));

//   if (!posts.length) {
//     return (
//       <div className="rounded-xl bg-white p-[clamp(1.25rem,2.5vw,2rem)] text-center shadow-md">
//         <h3 className="mb-2 text-xl font-semibold text-gray-800">
//           No Blog Posts Available
//         </h3>
//         <p className="text-gray-600">
//           Check back soon for information about Dholera SIR investment
//           opportunities.
//         </p>
//       </div>
//     );
//   }

//   // Group posts into pages of `cols`
//   const pages = Array.from({ length: totalSlides }, (_, i) =>
//     posts.slice(i * cols, i * cols + cols)
//   );

//   return (
//     <div className="mx-auto max-w-7xl">
//       {/* Viewport */}
//       <div className="w-full overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {pages.map((page, pageIdx) => (
//             <div
//               key={pageIdx}
//               className="grid w-full min-w-0 flex-shrink-0 gap-[clamp(1rem,2vw,1.5rem)]"
//               style={{
//                 gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
//                 minWidth: "100%",
//               }}
//             >
//               {page.map((post) => (
//                 <div key={post._id} className="min-w-0">
//                   <BlogCard post={post} />
//                 </div>
//               ))}

//               {/* Fill empty slots on last page so layout doesn't break */}
//               {page.length < cols &&
//                 Array.from({ length: cols - page.length }).map((_, i) => (
//                   <div key={`empty-${i}`} className="hidden min-w-0 md:block" />
//                 ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
//         {/* Dots */}
//         <div className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:justify-start">
//           {pages.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               aria-label={`Go to slide ${i + 1}`}
//               className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b56d] focus-visible:ring-offset-2"
//               style={{
//                 height: 8,
//                 width: i === current ? 28 : 8,
//                 background: i === current ? "#d7b56d" : "#d1c9b8",
//               }}
//             />
//           ))}
//         </div>

//         {/* Arrows */}
//         <div className="flex gap-3">
//           <button
//             onClick={prev}
//             disabled={current === 0}
//             aria-label="Previous"
//             className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
//             style={{ borderColor: "#d7b56d", color: "#d7b56d" }}
//           >
//             <span aria-hidden="true">&larr;</span>
//           </button>
//           <button
//             onClick={next}
//             disabled={current === totalSlides - 1}
//             aria-label="Next"
//             className="flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
//             style={{ background: "#d7b56d" }}
//           >
//             <span aria-hidden="true">&rarr;</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


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

          bg-[#FAF7F8]

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

            text-[#39252E]

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

            text-[#68565E]

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
                      focus-visible:ring-[#8F2946]
                      focus-visible:ring-offset-2

                      ${
                        isActive
                          ? "w-7 bg-[#8F2946]"
                          : "w-2 bg-[#E0A4B5]"
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

                bg-[#F7EBEF]

                text-[#8F2946]

                shadow-[0_5px_16px_rgba(143,41,70,0.08)]

                transition-[background-color,color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#8F2946]
                hover:text-white
                hover:shadow-[0_9px_20px_rgba(143,41,70,0.16)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:bg-[#F5EFF1]
                disabled:text-[#C9B8BE]
                disabled:shadow-none

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
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

                bg-[#8F2946]

                text-white

                shadow-[0_7px_18px_rgba(143,41,70,0.18)]

                transition-[background-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#742039]
                hover:shadow-[0_10px_24px_rgba(116,32,57,0.24)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:bg-[#E8DADF]
                disabled:text-[#A9949C]
                disabled:shadow-none

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
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
