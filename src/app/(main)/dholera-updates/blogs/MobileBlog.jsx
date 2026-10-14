"use client";

import { useRef, useState } from "react";
import BlogCard from "./BlogCard";

const BLOGS_PER_PAGE = 10;

/* PAGINATION STYLES*/

const paginationButtonClass = `
  inline-flex min-h-11 touch-manipulation items-center justify-center
  gap-1.5 rounded-xl border border-black/10 bg-white
  py-2 text-[14px] font-semibold text-black
  shadow-[0_3px_12px_rgba(0,0,0,0.035)]
  transition-colors duration-150
  enabled:hover:border-[#EC1C40]/40
  enabled:hover:bg-[#EC1C40]/5
  enabled:hover:text-[#EC1C40]
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-[#EC1C40] focus-visible:ring-offset-2
  disabled:cursor-not-allowed disabled:border-black/[0.06]
  disabled:bg-black/[0.02] disabled:text-black/30
  disabled:shadow-none motion-reduce:transition-none
`;

const pageNumberClass = `
  inline-flex h-11 min-w-11 touch-manipulation
  items-center justify-center rounded-xl border px-3
  text-[14px] font-semibold transition-colors duration-150
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-[#EC1C40] focus-visible:ring-offset-2
  motion-reduce:transition-none
`;

/* PAGINATION ICON*/

function ChevronIcon({ direction }) {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

/* VISIBLE PAGE NUMBERS*/

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
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
}

/* PAGINATION ARROW BUTTON*/

function PaginationArrowButton({
  direction,
  disabled,
  onClick,
  mobile = false,
}) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrevious ? "Previous page" : "Next page"}
      className={`${paginationButtonClass} ${mobile ? "px-3" : "px-4"}`}
    >
      {isPrevious && <ChevronIcon direction="left" />}

      <span>
        {isPrevious ? (mobile ? "Prev" : "Previous") : "Next"}
      </span>

      {!isPrevious && <ChevronIcon direction="right" />}
    </button>
  );
}

/* BLOG PAGINATION*/

export default function MobileBlogSwiper({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef(null);

  const totalPages = Math.max(
    1,
    Math.ceil(posts.length / BLOGS_PER_PAGE),
  );

  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * BLOGS_PER_PAGE;

  const visiblePosts = posts.slice(
    startIndex,
    startIndex + BLOGS_PER_PAGE,
  );

  const visiblePages = getVisiblePages(activePage, totalPages);

  /* CHANGE PAGE*/

  function goToPage(page) {
    const nextPage = Math.min(
      Math.max(page, 1),
      totalPages,
    );

    if (nextPage === activePage) {
      return;
    }

    setCurrentPage(nextPage);

    window.requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section
      ref={listRef}
      className="scroll-mt-28 space-y-7 sm:space-y-8"
    >
      {/* BLOG GRID*/}

      <div
        className="
          grid grid-cols-1 items-stretch gap-5
          sm:grid-cols-2 sm:gap-6
          lg:grid-cols-3 lg:gap-6
          xl:gap-7
        "
      >
        {visiblePosts.map((post, index) => (
          <BlogCard
            key={
              post._id ||
              post.slug?.current ||
              `${startIndex}-${index}`
            }
            post={post}
          />
        ))}
      </div>

      {/* PAGINATION*/}

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="
            flex flex-col items-center gap-4
            border-t border-black/10 pt-6 sm:pt-7
          "
        >
          {/* MOBILE PAGINATION*/}

          <div
            className="
              flex w-full items-center
              justify-between gap-3 sm:hidden
            "
          >
            <PaginationArrowButton
              direction="previous"
              mobile
              disabled={activePage === 1}
              onClick={() => goToPage(activePage - 1)}
            />

            <div
              aria-live="polite"
              aria-atomic="true"
              className="
                whitespace-nowrap text-center
                text-[14px] font-medium text-black/60
              "
            >
              Page{" "}
              <span className="font-semibold text-[#EC1C40]">
                {activePage}
              </span>{" "}
              of {totalPages}
            </div>

            <PaginationArrowButton
              direction="next"
              mobile
              disabled={activePage === totalPages}
              onClick={() => goToPage(activePage + 1)}
            />
          </div>

          {/* TABLET + DESKTOP PAGINATION*/}

          <div
            className="
              hidden flex-wrap items-center
              justify-center gap-2 sm:flex
            "
          >
            <PaginationArrowButton
              direction="previous"
              disabled={activePage === 1}
              onClick={() => goToPage(activePage - 1)}
            />

            {/* PAGE NUMBERS*/}

            {visiblePages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    aria-hidden="true"
                    className="
                      flex h-11 min-w-8 items-center
                      justify-center text-[14px]
                      font-semibold text-black/40
                    "
                  >
                    •••
                  </span>
                );
              }

              const isCurrent = page === activePage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`
                    ${pageNumberClass}
                    ${
                      isCurrent
                        ? `
                          border-[#EC1C40]
                          bg-[#EC1C40]
                          text-white
                          shadow-[0_6px_16px_rgba(236,28,64,0.20)]
                        `
                        : `
                          border-black/10
                          bg-white
                          text-black
                          shadow-[0_2px_8px_rgba(0,0,0,0.025)]
                          hover:border-[#EC1C40]/40
                          hover:bg-[#EC1C40]/5
                          hover:text-[#EC1C40]
                        `
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

            <PaginationArrowButton
              direction="next"
              disabled={activePage === totalPages}
              onClick={() => goToPage(activePage + 1)}
            />
          </div>
        </nav>
      )}
    </section>
  );
}