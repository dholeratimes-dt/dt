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

export default function MobileBlogSwiper({
  posts = [],
}) {
  const [currentPage, setCurrentPage] =
    useState(1);

  const listRef = useRef(null);

  const totalPages = Math.max(
    1,
    Math.ceil(
      posts.length /
        BLOGS_PER_PAGE,
    ),
  );

  const startIndex =
    (currentPage - 1) *
    BLOGS_PER_PAGE;

  const visiblePosts =
    posts.slice(
      startIndex,
      startIndex +
        BLOGS_PER_PAGE,
    );

  const goToPage = (page) => {
    const nextPage = Math.min(
      Math.max(page, 1),
      totalPages,
    );

    if (nextPage === currentPage) {
      return;
    }

    setCurrentPage(nextPage);

    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /* =========================================================
     PAGINATION NUMBERS

     Instead of showing too many numbers:
     1 2 3 ... 8
  ========================================================= */

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) =>
          index + 1,
      );
    }

    if (currentPage <= 3) {
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
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
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
      ====================================================== */}

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
        {visiblePosts.map(
          (post, index) => (
            <BlogCard
              key={
                post._id ||
                post.slug?.current ||
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
            border-[#EAD9DF]

            pt-6

            sm:pt-7
          "
        >
          {/* MOBILE PAGINATION */}

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
            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage - 1,
                )
              }
              disabled={
                currentPage === 1
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
                border-[#DFC9D1]

                bg-white

                px-3
                py-2

                text-[14px]
                font-semibold
                leading-5

                text-[#39252E]

                shadow-[0_3px_12px_rgba(57,37,46,0.04)]

                transition-[background-color,border-color,color]

                active:bg-[#F7EBEF]

                disabled:cursor-not-allowed
                disabled:border-[#EEE4E8]
                disabled:bg-[#FAF8F9]
                disabled:text-[#B7A8AE]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />

              Prev
            </button>

            <div
              className="
                text-center

                text-[14px]
                font-medium

                text-[#68565E]
              "
            >
              Page{" "}
              <span
                className="
                  font-semibold
                  text-[#8F2946]
                "
              >
                {currentPage}
              </span>{" "}
              of {totalPages}
            </div>

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage + 1,
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
                border-[#DFC9D1]

                bg-white

                px-3
                py-2

                text-[14px]
                font-semibold
                leading-5

                text-[#39252E]

                shadow-[0_3px_12px_rgba(57,37,46,0.04)]

                transition-[background-color,border-color,color]

                active:bg-[#F7EBEF]

                disabled:cursor-not-allowed
                disabled:border-[#EEE4E8]
                disabled:bg-[#FAF8F9]
                disabled:text-[#B7A8AE]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2
              "
            >
              Next

              <ChevronRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* TABLET / DESKTOP PAGINATION */}

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
            {/* Previous */}

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage - 1,
                )
              }
              disabled={
                currentPage === 1
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
                border-[#DFC9D1]

                bg-white

                px-4
                py-2

                text-[14px]
                font-semibold

                text-[#39252E]

                transition-[background-color,border-color,color,transform]
                duration-200

                hover:-translate-y-px
                hover:border-[#8F2946]
                hover:bg-[#F7EBEF]
                hover:text-[#8F2946]

                disabled:pointer-events-none
                disabled:border-[#EEE4E8]
                disabled:bg-[#FAF8F9]
                disabled:text-[#B7A8AE]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={2}
              />

              Previous
            </button>

            {/* Page numbers */}

            {getVisiblePages().map(
              (page, index) => {
                if (
                  page === "..."
                ) {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="
                        flex
                        h-11
                        min-w-8

                        items-center
                        justify-center

                        text-[14px]
                        font-semibold

                        text-[#917B84]
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
                    key={page}
                    type="button"
                    onClick={() =>
                      goToPage(page)
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
                      focus-visible:ring-[#8F2946]
                      focus-visible:ring-offset-2

                      motion-reduce:transform-none

                      ${
                        isCurrent
                          ? `
                              border
                              border-[#8F2946]

                              bg-[#8F2946]

                              text-white

                              shadow-[0_5px_14px_rgba(143,41,70,0.20)]
                            `
                          : `
                              border
                              border-[#DFC9D1]

                              bg-white

                              text-[#39252E]

                              hover:-translate-y-px
                              hover:border-[#8F2946]
                              hover:bg-[#F7EBEF]
                              hover:text-[#8F2946]
                            `
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              },
            )}

            {/* Next */}

            <button
              type="button"
              onClick={() =>
                goToPage(
                  currentPage + 1,
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
                border-[#DFC9D1]

                bg-white

                px-4
                py-2

                text-[14px]
                font-semibold

                text-[#39252E]

                transition-[background-color,border-color,color,transform]
                duration-200

                hover:-translate-y-px
                hover:border-[#8F2946]
                hover:bg-[#F7EBEF]
                hover:text-[#8F2946]

                disabled:pointer-events-none
                disabled:border-[#EEE4E8]
                disabled:bg-[#FAF8F9]
                disabled:text-[#B7A8AE]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
              "
            >
              Next

              <ChevronRight
                size={17}
                strokeWidth={2}
              />
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}
