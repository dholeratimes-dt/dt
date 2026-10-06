"use client";

import {
  useRef,
  useState,
} from "react";

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
   TESTIMONIAL CARD
============================================================ */

function TestimonialCard({
  testimonial,
  mobile = false,
}) {
  return (
    <figure
      className={`
        group

        relative

        flex
        h-full
        min-w-0
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-black/10

        bg-white

        p-5

        shadow-[0_6px_20px_rgba(0,0,0,0.035)]

        transition-[background-color,border-color,transform,box-shadow]
        duration-300
        ease-out

        hover:-translate-y-0.5
        hover:border-[#EC1C40]/30
        hover:bg-white
        hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]

        min-[414px]:p-6

        sm:p-6

        lg:p-7

        motion-reduce:transform-none
        motion-reduce:transition-none

        ${
          mobile
            ? `
              min-h-[340px]
              w-full
            `
            : ""
        }
      `}
    >
      {/* =====================================================
          TOP ACCENT
      ====================================================== */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0

          h-[3px]

          origin-left
          scale-x-0

          bg-[#EC1C40]

          transition-transform
          duration-300
          ease-out

          group-hover:scale-x-100

          motion-reduce:transition-none
        "
      />

      {/* =====================================================
          QUOTE ICON
      ====================================================== */}

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
          border-[#EC1C40]/20

          bg-[#EC1C40]/10

          text-[#EC1C40]

          transition-[background-color,border-color,color]
          duration-200

          group-hover:border-[#EC1C40]
          group-hover:bg-[#EC1C40]
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

      {/* =====================================================
          TESTIMONIAL TEXT
      ====================================================== */}

      <blockquote className="flex-1">
        <p
          className="
            text-[15px]
            font-normal
            leading-[27px]

            text-black/65

            sm:text-[16px]
            sm:leading-[28px]
          "
        >
          {testimonial.quote}
        </p>
      </blockquote>

      {/* =====================================================
          CUSTOMER
      ====================================================== */}

      <figcaption
        className="
          mt-6

          border-t
          border-black/10

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

            text-black
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

            text-black/50
          "
        >
          {testimonial.location}
        </p>
      </figcaption>
    </figure>
  );
}

/* ============================================================
   COMPONENT
============================================================ */

const TestimonialPagination = () => {
  /* =========================================================
     DESKTOP PAGINATION
  ========================================================= */

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

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

  /* =========================================================
     MOBILE SLIDER
  ========================================================= */

  const sliderRef =
    useRef(null);

  const [
    mobileSlide,
    setMobileSlide,
  ] = useState(0);

  /* =========================================================
     GO TO MOBILE SLIDE
  ========================================================= */

  const goToSlide = (index) => {
    const safeIndex =
      Math.max(
        0,
        Math.min(
          testimonials.length -
            1,
          index,
        ),
      );

    const slider =
      sliderRef.current;

    if (!slider) {
      return;
    }

    const width =
      slider.clientWidth;

    slider.scrollTo({
      left:
        width *
        safeIndex,
      behavior: "smooth",
    });

    setMobileSlide(
      safeIndex,
    );
  };

  /* =========================================================
     DETECT SWIPE / SCROLL POSITION
  ========================================================= */

  const handleMobileScroll =
    () => {
      const slider =
        sliderRef.current;

      if (!slider) {
        return;
      }

      const width =
        slider.clientWidth;

      if (!width) {
        return;
      }

      const index =
        Math.round(
          slider.scrollLeft /
            width,
        );

      const safeIndex =
        Math.max(
          0,
          Math.min(
            testimonials.length -
              1,
            index,
          ),
        );

      setMobileSlide(
        safeIndex,
      );
    };

  /* =========================================================
     DESKTOP BUTTON CLASS
  ========================================================= */

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
    focus-visible:ring-[#EC1C40]
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

        text-black

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-10

        lg:px-10
        lg:py-10
      "
    >
      {/* =====================================================
          BACKGROUND DETAIL
      ====================================================== */}

      

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
            mb-7

            max-w-3xl

            text-left

            sm:mb-8

            md:mb-9

            lg:mb-10
          "
        >
          <h2
            id="testimonials-heading"
            className="
              text-[28px]
              font-bold
              leading-[1.2]

              tracking-[-0.025em]

              text-black

              sm:text-[30px]

              md:text-[32px]

              lg:text-[34px]
            "
          >
            What our customers{" "}
            <span className="text-[#EC1C40]">
              say
            </span>
          </h2>
        </header>

        {/* ===================================================
            MOBILE SLIDER

            Below md:
            - one testimonial per view
            - finger swipe
            - scroll snap
        ==================================================== */}

        <div className="md:hidden">
          <div
            ref={sliderRef}
            id="testimonial-mobile-slider"
            onScroll={
              handleMobileScroll
            }
            className="
              flex

              w-full

              snap-x
              snap-mandatory

              overflow-x-auto
              overflow-y-hidden

              scroll-smooth

              overscroll-x-contain

              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden
            "
          >
            {testimonials.map(
              (
                testimonial,
                index,
              ) => (
                <div
                  key={
                    testimonial.name
                  }
                  className="
                    w-full
                    min-w-full
                    shrink-0

                    snap-center

                    px-[1px]
                  "
                >
                  <TestimonialCard
                    testimonial={
                      testimonial
                    }
                    mobile
                  />
                </div>
              ),
            )}
          </div>

          {/* =================================================
              MOBILE SLIDER CONTROLS
          ================================================== */}

          <div
            className="
              mt-5

              flex

              items-center
              justify-between

              gap-4
            "
          >
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={() =>
                goToSlide(
                  mobileSlide -
                    1,
                )
              }
              disabled={
                mobileSlide === 0
              }
              aria-label="Previous testimonial"
              aria-controls="testimonial-mobile-slider"
              className="
                inline-flex

                h-11
                w-11

                shrink-0

                items-center
                justify-center

                rounded-full

                border
                border-black/15

                bg-white

                text-black

                shadow-[0_4px_14px_rgba(0,0,0,0.04)]

                transition-[background-color,border-color,color,transform]
                duration-200

                enabled:active:scale-95

                enabled:hover:border-[#EC1C40]
                enabled:hover:bg-[#EC1C40]/5
                enabled:hover:text-[#EC1C40]

                disabled:cursor-not-allowed
                disabled:bg-black/[0.025]
                disabled:text-black/25

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2
              "
            >
              <ChevronLeft
                size={19}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>

            {/* ===============================================
                DOTS + COUNTER
            ================================================ */}

            <div
              className="
                flex

                flex-1

                flex-col

                items-center
                justify-center

                gap-2
              "
            >
              {/* DOTS */}

              <div
                className="
                  flex

                  items-center
                  justify-center

                  gap-1.5
                "
              >
                {testimonials.map(
                  (
                    testimonial,
                    index,
                  ) => {
                    const active =
                      mobileSlide ===
                      index;

                    return (
                      <button
                        key={
                          testimonial.name
                        }
                        type="button"
                        onClick={() =>
                          goToSlide(
                            index,
                          )
                        }
                        aria-label={`Go to testimonial ${
                          index +
                          1
                        }`}
                        aria-current={
                          active
                            ? "true"
                            : undefined
                        }
                        className={`
                          h-2

                          rounded-full

                          transition-[width,background-color]
                          duration-200

                          ${
                            active
                              ? `
                                w-6

                                bg-[#EC1C40]
                              `
                              : `
                                w-2

                                bg-black/15

                                hover:bg-black/25
                              `
                          }
                        `}
                      />
                    );
                  },
                )}
              </div>

              {/* COUNTER */}

              <p
                aria-live="polite"
                className="
                  text-[13px]
                  font-medium
                  leading-5

                  text-black/50
                "
              >
                <span
                  className="
                    font-semibold
                    text-[#EC1C40]
                  "
                >
                  {mobileSlide +
                    1}
                </span>{" "}
                /{" "}
                {
                  testimonials.length
                }
              </p>
            </div>

            {/* NEXT */}

            <button
              type="button"
              onClick={() =>
                goToSlide(
                  mobileSlide +
                    1,
                )
              }
              disabled={
                mobileSlide ===
                testimonials.length -
                  1
              }
              aria-label="Next testimonial"
              aria-controls="testimonial-mobile-slider"
              className="
                inline-flex

                h-11
                w-11

                shrink-0

                items-center
                justify-center

                rounded-full

                border
                border-black/15

                bg-white

                text-black

                shadow-[0_4px_14px_rgba(0,0,0,0.04)]

                transition-[background-color,border-color,color,transform]
                duration-200

                enabled:active:scale-95

                enabled:hover:border-[#EC1C40]
                enabled:hover:bg-[#EC1C40]/5
                enabled:hover:text-[#EC1C40]

                disabled:cursor-not-allowed
                disabled:bg-black/[0.025]
                disabled:text-black/25

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2
              "
            >
              <ChevronRight
                size={19}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* ===================================================
            DESKTOP TESTIMONIAL GRID

            md and above:
            original 3-column design
        ==================================================== */}

        <div
          id="testimonial-cards"
          aria-live="polite"
          aria-atomic="true"
          className="
            hidden

            grid-cols-3

            items-stretch

            gap-5

            md:grid

            lg:gap-6
          "
        >
          {currentTestimonials.map(
            (testimonial) => (
              <TestimonialCard
                key={
                  testimonial.name
                }
                testimonial={
                  testimonial
                }
              />
            ),
          )}
        </div>

        {/* ===================================================
            DESKTOP PAGINATION

            Hidden on mobile.
        ==================================================== */}

        <nav
          aria-label="Testimonial pagination"
          className="
            mt-8

            hidden

            items-center
            justify-center

            gap-3

            md:flex

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

              border-black/15

              bg-white

              text-black

              enabled:hover:-translate-y-0.5
              enabled:hover:border-[#EC1C40]
              enabled:hover:bg-[#EC1C40]/5
              enabled:hover:text-[#EC1C40]

              disabled:cursor-not-allowed
              disabled:border-black/10
              disabled:bg-black/[0.025]
              disabled:text-black/30
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
                          border-[#EC1C40]

                          bg-[#EC1C40]

                          text-white

                          shadow-[0_8px_20px_-12px_rgba(236,28,64,0.48)]
                        `
                        : `
                          border-black/15

                          bg-white

                          text-black

                          hover:-translate-y-0.5
                          hover:border-[#EC1C40]
                          hover:bg-[#EC1C40]/5
                          hover:text-[#EC1C40]
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

              border-black/15

              bg-white

              text-black

              enabled:hover:-translate-y-0.5
              enabled:hover:border-[#EC1C40]
              enabled:hover:bg-[#EC1C40]/5
              enabled:hover:text-[#EC1C40]

              disabled:cursor-not-allowed
              disabled:border-black/10
              disabled:bg-black/[0.025]
              disabled:text-black/30
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