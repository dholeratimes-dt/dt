

"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

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

const TESTIMONIALS_PER_PAGE = 3;

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    testimonials.length / TESTIMONIALS_PER_PAGE,
  );

  const firstIndex =
    (currentPage - 1) * TESTIMONIALS_PER_PAGE;

  const currentTestimonials = testimonials.slice(
    firstIndex,
    firstIndex + TESTIMONIALS_PER_PAGE,
  );

  const paginationButtonClass = `
    inline-flex
    h-12
    w-12
    shrink-0
    items-center
    justify-center

    rounded-full
    border

    transition-[background-color,border-color,color,transform,box-shadow]
    duration-200

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#8F2946]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#FAF7F8]

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

        border-y
        border-[#E8DDE1]

        bg-[#FAF7F8]

        px-4
        py-12

        text-[#35272D]

        selection:bg-[#E8C6D1]
        selection:text-[#35272D]

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-12

        lg:py-14
      "
    >
      {/* =====================================================
          BACKGROUND DETAILS
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
            -left-48
            -top-56

            h-[460px]
            w-[460px]

            rounded-full

            bg-[#8F2946]/[0.025]

            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-56
            -right-44

            h-[480px]
            w-[480px]

            rounded-full

            bg-[#E8C6D1]/20

            blur-3xl
          "
        />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* =====================================================
            HEADING
        ====================================================== */}

        <header
          className="
            mx-auto
            mb-9
            max-w-3xl
            text-center

            sm:mb-11

            md:mb-12

            lg:mb-14
          "
        >
          {/* Eyebrow */}
          <div
            className="
              mb-3

              flex
              items-center
              justify-center

              gap-3

              sm:mb-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                shrink-0

                bg-[#8F2946]
              "
            />

            <p
              className="
                text-xs
                font-semibold
                uppercase
                leading-5

                tracking-[0.16em]

                text-[#8F2946]
              "
            >
              Customer Experiences
            </p>

            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                shrink-0

                bg-[#8F2946]
              "
            />
          </div>

          {/* Heading */}
          <h2
            id="testimonials-heading"
            className="
              text-[30px]
              font-semibold
              leading-[1.2]

              tracking-[-0.025em]

              text-[#35272D]

              min-[414px]:text-[32px]

              sm:text-[36px]

              lg:text-[42px]
              lg:leading-[1.16]
            "
          >
            What our customers{" "}
            <span className="text-[#8F2946]">
              say
            </span>
          </h2>
        </header>

        {/* =====================================================
            TESTIMONIAL CARDS
        ====================================================== */}

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
          {currentTestimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="
                group

                relative

                flex
                h-full
                min-w-0
                flex-col

                overflow-hidden

                rounded-xl

                border
                border-[#E8DDE1]

                bg-white

                p-5

                shadow-[0_12px_34px_-24px_rgba(70,37,49,0.18)]

                transition-[border-color,transform,box-shadow]
                duration-300

                hover:-translate-y-0.5
                hover:border-[#DFC8D0]
                hover:shadow-[0_18px_42px_-26px_rgba(70,37,49,0.24)]

                min-[414px]:p-6

                sm:rounded-2xl
                sm:p-7

                md:p-6

                lg:p-7

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              {/* Top hover accent */}
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

                  group-hover:scale-x-100

                  motion-reduce:transition-none
                "
              />

              {/* Quote icon */}
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
                  border-[#DFC8D0]

                  bg-[#F7ECEF]

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
                  className="h-5 w-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p
                  className="
                    text-[15px]
                    font-normal
                    leading-[27px]

                    text-[#53464C]

                    sm:text-[16px]
                    sm:leading-[28px]
                  "
                >
                  {testimonial.quote}
                </p>
              </blockquote>

              {/* Customer */}
              <figcaption
                className="
                  mt-6

                  border-t
                  border-[#E8DDE1]

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

                    text-[#35272D]
                  "
                >
                  {testimonial.name}
                </p>

                <p
                  className="
                    mt-1

                    text-[13px]
                    font-medium
                    leading-5

                    text-[#74666C]
                  "
                >
                  {testimonial.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        <nav
          aria-label="Testimonial pagination"
          className="
            mt-7

            flex
            items-center
            justify-center

            gap-2.5

            sm:mt-9
            sm:gap-3

            lg:mt-10
          "
        >
          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(1, page - 1),
              )
            }
            disabled={currentPage === 1}
            aria-label="Previous testimonials"
            aria-controls="testimonial-cards"
            className={`
              ${paginationButtonClass}

              border-[#DFC8D0]
              bg-white
              text-[#742039]

              enabled:hover:-translate-y-0.5
              enabled:hover:border-[#8F2946]
              enabled:hover:bg-[#F7ECEF]
              enabled:hover:text-[#8F2946]

              disabled:cursor-not-allowed
              disabled:border-[#E8DDE1]
              disabled:text-[#A8999F]
              disabled:opacity-60
            `}
          >
            <ChevronLeft
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2}
            />
          </button>

          {/* Page numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => {
              const pageNumber = index + 1;

              const isActive =
                currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() =>
                    setCurrentPage(pageNumber)
                  }
                  aria-label={`Testimonial page ${pageNumber}`}
                  aria-current={
                    isActive ? "page" : undefined
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
                          border-[#DFC8D0]
                          bg-white
                          text-[#742039]

                          hover:-translate-y-0.5
                          hover:border-[#8F2946]
                          hover:bg-[#F7ECEF]
                          hover:text-[#8F2946]
                        `
                    }
                  `}
                >
                  {pageNumber}
                </button>
              );
            },
          )}

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1),
              )
            }
            disabled={currentPage === totalPages}
            aria-label="Next testimonials"
            aria-controls="testimonial-cards"
            className={`
              ${paginationButtonClass}

              border-[#DFC8D0]
              bg-white
              text-[#742039]

              enabled:hover:-translate-y-0.5
              enabled:hover:border-[#8F2946]
              enabled:hover:bg-[#F7ECEF]
              enabled:hover:text-[#8F2946]

              disabled:cursor-not-allowed
              disabled:border-[#E8DDE1]
              disabled:text-[#A8999F]
              disabled:opacity-60
            `}
          >
            <ChevronRight
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2}
            />
          </button>
        </nav>

        {/* =====================================================
            CTA
        ====================================================== */}

        <div
          className="
            relative

            mt-10

            overflow-hidden

            rounded-xl

            border
            border-[#DFC8D0]

            bg-[#F7ECEF]

            p-5

            shadow-[0_18px_48px_-34px_rgba(70,37,49,0.24)]

            min-[414px]:p-6

            sm:mt-12
            sm:rounded-2xl
            sm:p-7

            md:mt-14
            md:p-8

            lg:mt-16
            lg:p-10
          "
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              -right-20
              -top-28

              h-72
              w-72

              rounded-full

              bg-white/60

              blur-3xl
            "
          />

          {/* Top accent */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-0
              top-0

              h-[3px]
              w-full

              bg-[#8F2946]
            "
          />

          <div
            className="
              relative

              flex
              flex-col

              items-center
              justify-between

              gap-7

              lg:flex-row
              lg:gap-12
            "
          >
            {/* CTA copy */}
            <div
              className="
                max-w-xl

                text-center

                lg:text-left
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  leading-5

                  tracking-[0.15em]

                  text-[#8F2946]
                "
              >
                Investment Assistance
              </p>

              <h2
                className="
                  mt-2

                  text-[26px]
                  font-semibold
                  leading-[1.25]

                  tracking-[-0.02em]

                  text-[#35272D]

                  min-[414px]:text-[28px]

                  sm:text-[32px]
                "
              >
                Ready to Invest in Dholera?
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-xl

                  text-[15px]
                  font-normal
                  leading-[26px]

                  text-[#62545A]

                  sm:text-[16px]
                  sm:leading-7

                  lg:mx-0
                "
              >
                Get expert guidance and exclusive investment
                opportunities
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className="
                flex
                w-full

                flex-col

                gap-3

                sm:w-auto
                sm:flex-row

                lg:shrink-0
              "
            >
              {/* Call */}
              <a
                href="tel:+919958993549"
                className="
                  inline-flex
                  min-h-[52px]

                  items-center
                  justify-center

                  gap-2.5

                  rounded-lg

                  border
                  border-[#8F2946]

                  bg-[#8F2946]

                  px-6
                  py-3

                  text-[15px]
                  font-semibold
                  leading-6

                  text-white

                  shadow-[0_8px_20px_-12px_rgba(116,32,57,0.5)]

                  transition-[background-color,border-color,transform,box-shadow]
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-[#742039]
                  hover:bg-[#742039]
                  hover:shadow-[0_10px_24px_-12px_rgba(116,32,57,0.55)]

                  active:translate-y-0

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8F2946]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#F7ECEF]

                  sm:min-w-[140px]

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <FaPhone
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    shrink-0
                    rotate-90
                  "
                />

                <span>Call Now</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919958993549?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-[52px]

                  items-center
                  justify-center

                  gap-2.5

                  rounded-lg

                  border
                  border-[#CFA9B6]

                  bg-white

                  px-6
                  py-3

                  text-[15px]
                  font-semibold
                  leading-6

                  text-[#742039]

                  transition-[background-color,border-color,color,transform]
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-[#8F2946]
                  hover:bg-[#FAF7F8]
                  hover:text-[#8F2946]

                  active:translate-y-0

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8F2946]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#F7ECEF]

                  sm:min-w-[160px]

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <FaWhatsapp
                  aria-hidden="true"
                  className="
                    h-5
                    w-5
                    shrink-0
                  "
                />

                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPagination;