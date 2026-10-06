// 'use client';
// import { useState } from 'react';
// import BlogCard from './BlogCard';

// const BLOGS_PER_PAGE = 10;

// export default function MobileBlogSwiper({ posts }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PER_PAGE));
//   const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
//   const visiblePosts = posts.slice(startIndex, startIndex + BLOGS_PER_PAGE);

//   const goToPage = (page) => {
//     setCurrentPage(Math.min(Math.max(page, 1), totalPages));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 gap-4">
//         {visiblePosts.map((post) => (
//           <BlogCard key={post._id} post={post} />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <nav
//           className="flex flex-wrap items-center justify-center gap-2"
//           aria-label="Mobile blog pagination"
//         >
//           <button
//             type="button"
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="rounded-md border border-[#d7b56d] px-4 py-2 text-sm font-semibold text-[#7a642e] transition-colors hover:bg-[#d7b56d] hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
//           >
//             Previous
//           </button>

//           {Array.from({ length: totalPages }, (_, index) => {
//             const pageNumber = index + 1;
//             const isCurrentPage = pageNumber === currentPage;

//             return (
//               <button
//                 key={pageNumber}
//                 type="button"
//                 onClick={() => goToPage(pageNumber)}
//                 aria-current={isCurrentPage ? 'page' : undefined}
//                 className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
//                   isCurrentPage
//                     ? 'border-[#d7b56d] bg-[#d7b56d] text-white'
//                     : 'border-gray-200 text-gray-700 hover:border-[#d7b56d] hover:text-[#7a642e]'
//                 }`}
//               >
//                 {pageNumber}
//               </button>
//             );
//           })}

//           <button
//             type="button"
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="rounded-md border border-[#d7b56d] px-4 py-2 text-sm font-semibold text-[#7a642e] transition-colors hover:bg-[#d7b56d] hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
//           >
//             Next
//           </button>
//         </nav>
//       )}
//     </div>
//   );
// }



"use client";

import {
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import BlogCard from "./BlogCard";

const BLOGS_PER_PAGE = 10;

/* ============================================================
   BLOG LIST
============================================================ */

export default function MobileBlogSwiper({
  posts = [],
}) {
  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const listRef =
    useRef(null);

  /* =========================================================
     TOTAL PAGES
  ========================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        posts.length /
          BLOGS_PER_PAGE,
      ),
    );

  /* =========================================================
     CURRENT POSTS
  ========================================================= */

  const startIndex =
    (currentPage - 1) *
    BLOGS_PER_PAGE;

  const visiblePosts =
    posts.slice(
      startIndex,
      startIndex +
        BLOGS_PER_PAGE,
    );

  /* =========================================================
     CHANGE PAGE
  ========================================================= */

  const goToPage = (
    page,
  ) => {
    const nextPage =
      Math.min(
        Math.max(
          page,
          1,
        ),
        totalPages,
      );

    if (
      nextPage ===
      currentPage
    ) {
      return;
    }

    setCurrentPage(
      nextPage,
    );

    window.requestAnimationFrame(
      () => {
        listRef.current?.scrollIntoView(
          {
            behavior:
              "smooth",

            block:
              "start",
          },
        );
      },
    );
  };

  /* =========================================================
     DESKTOP PAGE NUMBERS
  ========================================================= */

  const getVisiblePages =
    () => {
      if (
        totalPages <= 5
      ) {
        return Array.from(
          {
            length:
              totalPages,
          },
          (
            _,
            index,
          ) =>
            index + 1,
        );
      }

      if (
        currentPage <= 3
      ) {
        return [
          1,
          2,
          3,
          4,
          "...",
          totalPages,
        ];
      }

      if (
        currentPage >=
        totalPages - 2
      ) {
        return [
          1,
          "...",
          totalPages -
            3,
          totalPages -
            2,
          totalPages -
            1,
          totalPages,
        ];
      }

      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    };

  if (!posts.length) {
    return null;
  }

  return (
    <section
      ref={listRef}
      className="
        scroll-mt-28

        space-y-7

        sm:space-y-8
      "
    >
      {/* =====================================================
          BLOG GRID

          Same BlogCard design on:
          - Phone
          - Tablet
          - Desktop
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1

          items-stretch

          gap-5

          sm:grid-cols-2
          sm:gap-6

          lg:grid-cols-3
          lg:gap-6

          xl:gap-7
        "
      >
        {visiblePosts.map(
          (
            post,
            index,
          ) => (
            <BlogCard
              key={
                post._id ||
                post.slug
                  ?.current ||
                `${startIndex}-${index}`
              }
              post={post}
            />
          ),
        )}
      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="
            flex
            flex-col

            items-center

            gap-4

            border-t
            border-black/10

            pt-6

            sm:pt-7
          "
        >
          {/* =================================================
              PHONE PAGINATION
          ================================================== */}

          <div
            className="
              flex
              w-full

              items-center
              justify-between

              gap-3

              sm:hidden
            "
          >
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage -
                    1,
                )
              }
              disabled={
                currentPage ===
                1
              }
              aria-label="Previous page"
              className="
                inline-flex

                min-h-11

                items-center
                justify-center

                gap-1.5

                rounded-xl

                border
                border-black/10

                bg-white

                px-3
                py-2

                text-[14px]
                font-semibold
                leading-5

                text-black

                shadow-[0_3px_12px_rgba(0,0,0,0.04)]

                transition-[background-color,border-color,color,transform]
                duration-200

                active:bg-black/[0.03]

                disabled:cursor-not-allowed
                disabled:border-black/[0.06]
                disabled:bg-black/[0.02]
                disabled:text-black/30

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={
                  2
                }
                aria-hidden="true"
              />

              Prev
            </button>

            {/* PAGE COUNT */}

            <div
              className="
                text-center

                text-[14px]
                font-medium

                text-black/60
              "
            >
              Page{" "}
              <span
                className="
                  font-semibold

                  text-[#EC1C40]
                "
              >
                {
                  currentPage
                }
              </span>{" "}
              of{" "}
              {
                totalPages
              }
            </div>

            {/* NEXT */}

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage +
                    1,
                )
              }
              disabled={
                currentPage ===
                totalPages
              }
              aria-label="Next page"
              className="
                inline-flex

                min-h-11

                items-center
                justify-center

                gap-1.5

                rounded-xl

                border
                border-black/10

                bg-white

                px-3
                py-2

                text-[14px]
                font-semibold
                leading-5

                text-black

                shadow-[0_3px_12px_rgba(0,0,0,0.04)]

                transition-[background-color,border-color,color,transform]
                duration-200

                active:bg-black/[0.03]

                disabled:cursor-not-allowed
                disabled:border-black/[0.06]
                disabled:bg-black/[0.02]
                disabled:text-black/30

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
              "
            >
              Next

              <ChevronRight
                size={17}
                strokeWidth={
                  2
                }
                aria-hidden="true"
              />
            </button>
          </div>

          {/* =================================================
              TABLET + DESKTOP PAGINATION
          ================================================== */}

          <div
            className="
              hidden

              flex-wrap

              items-center
              justify-center

              gap-2

              sm:flex
            "
          >
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage -
                    1,
                )
              }
              disabled={
                currentPage ===
                1
              }
              aria-label="Previous page"
              className="
                mr-1

                inline-flex

                min-h-11

                items-center
                justify-center

                gap-1.5

                rounded-xl

                border
                border-black/10

                bg-white

                px-4
                py-2

                text-[14px]
                font-semibold

                text-black

                shadow-[0_3px_12px_rgba(0,0,0,0.035)]

                transition-[background-color,border-color,color,transform,box-shadow]
                duration-200

                hover:-translate-y-px
                hover:border-[#EC1C40]/40
                hover:bg-[#EC1C40]/5
                hover:text-[#EC1C40]

                hover:shadow-[0_6px_18px_rgba(0,0,0,0.055)]

                disabled:pointer-events-none
                disabled:border-black/[0.06]
                disabled:bg-black/[0.02]
                disabled:text-black/30
                disabled:shadow-none

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={
                  2
                }
                aria-hidden="true"
              />

              Previous
            </button>

            {/* PAGE NUMBERS */}

            {getVisiblePages().map(
              (
                page,
                index,
              ) => {
                if (
                  page ===
                  "..."
                ) {
                  return (
                    <span
                      key={`dots-${index}`}
                      aria-hidden="true"
                      className="
                        flex

                        h-11
                        min-w-8

                        items-center
                        justify-center

                        text-[14px]
                        font-semibold

                        text-black/40
                      "
                    >
                      •••
                    </span>
                  );
                }

                const isCurrent =
                  page ===
                  currentPage;

                return (
                  <button
                    key={
                      page
                    }
                    type="button"
                    onClick={() =>
                      goToPage(
                        page,
                      )
                    }
                    aria-label={`Go to page ${page}`}
                    aria-current={
                      isCurrent
                        ? "page"
                        : undefined
                    }
                    className={`
                      inline-flex

                      h-11
                      min-w-11

                      items-center
                      justify-center

                      rounded-xl

                      px-3

                      text-[14px]
                      font-semibold

                      transition-[background-color,border-color,color,box-shadow,transform]
                      duration-200

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#EC1C40]
                      focus-visible:ring-offset-2

                      motion-reduce:transform-none

                      ${
                        isCurrent
                          ? `
                            border
                            border-[#EC1C40]

                            bg-[#EC1C40]

                            text-white

                            shadow-[0_6px_16px_rgba(236,28,64,0.20)]
                          `
                          : `
                            border
                            border-black/10

                            bg-white

                            text-black

                            shadow-[0_2px_8px_rgba(0,0,0,0.025)]

                            hover:-translate-y-px

                            hover:border-[#EC1C40]/40

                            hover:bg-[#EC1C40]/5

                            hover:text-[#EC1C40]

                            hover:shadow-[0_5px_14px_rgba(0,0,0,0.05)]
                          `
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              },
            )}

            {/* NEXT */}

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage +
                    1,
                )
              }
              disabled={
                currentPage ===
                totalPages
              }
              aria-label="Next page"
              className="
                ml-1

                inline-flex

                min-h-11

                items-center
                justify-center

                gap-1.5

                rounded-xl

                border
                border-black/10

                bg-white

                px-4
                py-2

                text-[14px]
                font-semibold

                text-black

                shadow-[0_3px_12px_rgba(0,0,0,0.035)]

                transition-[background-color,border-color,color,transform,box-shadow]
                duration-200

                hover:-translate-y-px
                hover:border-[#EC1C40]/40
                hover:bg-[#EC1C40]/5
                hover:text-[#EC1C40]

                hover:shadow-[0_6px_18px_rgba(0,0,0,0.055)]

                disabled:pointer-events-none
                disabled:border-black/[0.06]
                disabled:bg-black/[0.02]
                disabled:text-black/30
                disabled:shadow-none

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
              "
            >
              Next

              <ChevronRight
                size={17}
                strokeWidth={
                  2
                }
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}