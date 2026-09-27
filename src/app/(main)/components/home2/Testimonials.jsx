"use client";

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

/* ============================================================
   TESTIMONIAL DATA
============================================================ */

const testimonials = [
  {
    quote:
      "Dholera Times is a helpful platform for staying updated with the latest news and developments in Dholera. The content is simple, clear, and easy to understand.",
    name: "Amit Khurana",
    location: "India",
  },
  {
    quote:
      "The website explains Dholera Smart City, infrastructure updates, airport news, expressway progress, and investment-related topics in a very practical way.",
    name: "Sandeep Mishra",
    location: "India",
  },
  {
    quote:
      "I like how Dholera Times shares updates without making the information confusing. It is useful for anyone who wants to understand Dholera from the basics.",
    name: "Pulkit Sharma",
    location: "India",
  },
  {
    quote:
      "Main Dholera ke latest updates ke liye Dholera Times follow karta hoon. Yahan airport, expressway, industries aur smart city development ki information simple language mein milti hai.",
    name: "Sumit Kumar",
    location: "Gujarat",
  },
  {
    quote:
      "Dholera Times gives clear and regular information about Dholera’s progress. It helps readers understand what is happening on the ground in a trusted way.",
    name: "Sohail",
    location: "India",
  },
  {
    quote:
      "Dholera mein investment explore karne se pehle maine Dholera Times se kaafi updates samjhe. Website par information simple, useful aur easy to read hai.",
    name: "Nikhil Goel",
    location: "India",
  },
];

/* ============================================================
   SETTINGS
============================================================ */

const TESTIMONIALS_PER_PAGE = 3;

/* ============================================================
   COMPONENT
============================================================ */

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    testimonials.length /
      TESTIMONIALS_PER_PAGE,
  );

  const firstIndex =
    (currentPage - 1) *
    TESTIMONIALS_PER_PAGE;

  const currentTestimonials =
    testimonials.slice(
      firstIndex,
      firstIndex +
        TESTIMONIALS_PER_PAGE,
    );

  const paginationButtonClass = `
    inline-flex

    h-11
    w-11

    shrink-0

    items-center
    justify-center

    rounded-full

    border

    transition-[background-color,border-color,color,transform,box-shadow]
    duration-200
    ease-out

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#8F2946]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-white

    sm:h-12
    sm:w-12

    motion-reduce:transform-none
    motion-reduce:transition-none
  `;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-white

        px-4
        py-8

        text-[#39252E]

        selection:bg-[#E0A4B5]
        selection:text-[#39252E]

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-10

        lg:px-10
        lg:py-12
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND DETAIL

          White remains the dominant section background.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          -z-10

          overflow-hidden
        "
      >
        <div
          className="
            absolute

            -left-44
            -top-52

            h-[420px]
            w-[420px]

            rounded-full

            bg-[#E0A4B5]/[0.055]

            blur-3xl
          "
        />

        <div
          className="
            absolute

            -bottom-52
            -right-40

            h-[440px]
            w-[440px]

            rounded-full

            bg-[#8F2946]/[0.025]

            blur-3xl
          "
        />
      </div>

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ===================================================
            HEADING
        ==================================================== */}

        <header
          className="
            mx-auto

            mb-7

            max-w-3xl

            text-center

            sm:mb-8

            md:mb-9

            lg:mb-10
          "
        >
          {/* EYEBROW */}

          <p
            className="
              mb-2

              text-[11px]
              font-semibold
              uppercase
              leading-5

              tracking-[0.15em]

              text-[#8F2946]

              sm:mb-3
              sm:text-xs
            "
          >
            Customer Experiences
          </p>

          {/* TITLE */}

          <h2
            id="testimonials-heading"
            className="
              text-[28px]
              font-bold
              leading-[1.2]

              tracking-[-0.025em]

              text-[#39252E]

              sm:text-[30px]

              md:text-[32px]

              lg:text-[34px]
            "
          >
            What our customers{" "}
            <span className="text-[#8F2946]">
              say
            </span>
          </h2>
        </header>

        {/* ===================================================
            TESTIMONIAL CARDS
        ==================================================== */}

        <div
          id="testimonial-cards"
          aria-live="polite"
          aria-atomic="true"
          className="
            grid
            grid-cols-1

            items-stretch

            gap-4

            sm:gap-5

            md:grid-cols-3
            md:gap-5

            lg:gap-6
          "
        >
          {currentTestimonials.map(
            (testimonial) => (
              <figure
                key={
                  testimonial.name
                }
                className="
                  group

                  relative

                  flex
                  h-full
                  min-w-0
                  flex-col

                  overflow-hidden

                  rounded-2xl

                  border
                  border-[#EAD9DF]

                  bg-[#FAF7F8]

                  p-5

                  shadow-[0_6px_20px_rgba(57,37,46,0.035)]

                  transition-[background-color,border-color,transform,box-shadow]
                  duration-300
                  ease-out

                  hover:-translate-y-0.5
                  hover:border-[#E0A4B5]
                  hover:bg-white
                  hover:shadow-[0_14px_34px_rgba(116,32,57,0.08)]

                  min-[414px]:p-6

                  sm:p-6

                  lg:p-7

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                {/* =========================================
                    TOP HOVER ACCENT
                ========================================== */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    top-0

                    h-[3px]

                    origin-left
                    scale-x-0

                    bg-[#8F2946]

                    transition-transform
                    duration-300
                    ease-out

                    group-hover:scale-x-100

                    motion-reduce:transition-none
                  "
                />

                {/* =========================================
                    QUOTE ICON
                ========================================== */}

                <div
                  aria-hidden="true"
                  className="
                    mb-5

                    flex
                    h-11
                    w-11

                    shrink-0

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#E0A4B5]/55

                    bg-[#F7EBEF]

                    text-[#8F2946]

                    transition-[background-color,border-color,color]
                    duration-200

                    group-hover:border-[#8F2946]
                    group-hover:bg-[#8F2946]
                    group-hover:text-white

                    sm:mb-6

                    motion-reduce:transition-none
                  "
                >
                  <Quote
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                {/* =========================================
                    TESTIMONIAL
                ========================================== */}

                <blockquote
                  className="
                    flex-1
                  "
                >
                  <p
                    className="
                      text-[15px]
                      font-normal
                      leading-[27px]

                      text-[#68565E]

                      sm:text-[16px]
                      sm:leading-[28px]
                    "
                  >
                    {
                      testimonial.quote
                    }
                  </p>
                </blockquote>

                {/* =========================================
                    CUSTOMER
                ========================================== */}

                <figcaption
                  className="
                    mt-6

                    border-t
                    border-[#EAD9DF]

                    pt-5

                    sm:mt-7
                  "
                >
                  <p
                    className="
                      text-[16px]
                      font-semibold
                      leading-6

                      tracking-tight

                      text-[#39252E]
                    "
                  >
                    {
                      testimonial.name
                    }
                  </p>

                  <p
                    className="
                      mt-1

                      text-[13px]
                      font-medium
                      leading-5

                      text-[#78666E]
                    "
                  >
                    {
                      testimonial.location
                    }
                  </p>
                </figcaption>
              </figure>
            ),
          )}
        </div>

        {/* ===================================================
            PAGINATION
        ==================================================== */}

        <nav
          aria-label="Testimonial pagination"
          className="
            mt-7

            flex
            items-center
            justify-center

            gap-2.5

            sm:mt-8
            sm:gap-3

            lg:mt-9
          "
        >
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.max(
                    1,
                    page - 1,
                  ),
              )
            }
            disabled={
              currentPage === 1
            }
            aria-label="Previous testimonials"
            aria-controls="testimonial-cards"
            className={`
              ${paginationButtonClass}

              border-[#DEC7CF]

              bg-white

              text-[#742039]

              enabled:hover:-translate-y-0.5
              enabled:hover:border-[#8F2946]
              enabled:hover:bg-[#F7EBEF]
              enabled:hover:text-[#8F2946]

              disabled:cursor-not-allowed
              disabled:border-[#EAD9DF]
              disabled:bg-[#FAF7F8]
              disabled:text-[#A8999F]
              disabled:opacity-60
            `}
          >
            <ChevronLeft
              aria-hidden="true"
              size={20}
              strokeWidth={2}
            />
          </button>

          {/* PAGE NUMBERS */}

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, index) => {
              const pageNumber =
                index + 1;

              const isActive =
                currentPage ===
                pageNumber;

              return (
                <button
                  key={
                    pageNumber
                  }
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      pageNumber,
                    )
                  }
                  aria-label={`Testimonial page ${pageNumber}`}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  aria-controls="testimonial-cards"
                  className={`
                    ${paginationButtonClass}

                    text-[15px]
                    font-semibold

                    ${
                      isActive
                        ? `
                            border-[#8F2946]

                            bg-[#8F2946]

                            text-white

                            shadow-[0_8px_20px_-12px_rgba(116,32,57,0.48)]
                          `
                        : `
                            border-[#DEC7CF]

                            bg-white

                            text-[#742039]

                            hover:-translate-y-0.5
                            hover:border-[#8F2946]
                            hover:bg-[#F7EBEF]
                            hover:text-[#8F2946]
                          `
                    }
                  `}
                >
                  {
                    pageNumber
                  }
                </button>
              );
            },
          )}

          {/* NEXT */}

          <button
            type="button"
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.min(
                    totalPages,
                    page + 1,
                  ),
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
            aria-label="Next testimonials"
            aria-controls="testimonial-cards"
            className={`
              ${paginationButtonClass}

              border-[#DEC7CF]

              bg-white

              text-[#742039]

              enabled:hover:-translate-y-0.5
              enabled:hover:border-[#8F2946]
              enabled:hover:bg-[#F7EBEF]
              enabled:hover:text-[#8F2946]

              disabled:cursor-not-allowed
              disabled:border-[#EAD9DF]
              disabled:bg-[#FAF7F8]
              disabled:text-[#A8999F]
              disabled:opacity-60
            `}
          >
            <ChevronRight
              aria-hidden="true"
              size={20}
              strokeWidth={2}
            />
          </button>
        </nav>
      </div>
    </section>
  );
};

export default TestimonialPagination;