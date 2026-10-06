import Link from "next/link";

import { Building2, Factory, Home, Landmark, Phone } from "lucide-react";

import PopupForm from "./PopUpForm";

/* ============================================================
   EXPLORE DHOLERA DATA
============================================================ */

const exploreItems = [
  {
    title: "Dholera SIR",
    description:
      "Understand the master plan, Activation Area, infrastructure and development of Dholera Smart City.",
    button: "Explore Dholera SIR",
    href: "/dholera-sir",
    icon: Landmark,
  },
  {
    title: "Companies & Industries",
    description:
      "Track semiconductor, manufacturing, renewable energy and other industries entering Dholera.",
    button: "Companies in Dholera",
    href: "/dholera-updates/blogs/the-top-10-companies-invested-in-dholera-smart-city",
    icon: Factory,
  },
  {
    title: "Dholera Real Estate Market",
    description:
      "Research residential plots, land prices, locations and property opportunities around Dholera.",
    button: "Explore Property",
    href: "/dholera-updates/blogs/dholera-real-estate-market-outlook",
    icon: Building2,
  },
  {
    title: "NRI Investment",
    description:
      "Understand documentation, rules and property-investment considerations for NRIs.",
    button: "NRI Guide",
    href: "/nri-investment-guide-dholera",
    icon: Home,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function ExploreDholera() {
  return (
    <>
      {/* =====================================================
          PLOT INVESTMENT CTA
      ====================================================== */}

      <section
        aria-labelledby="plot-investment-heading"
        className="
          relative
          isolate
          overflow-hidden

          bg-black

          px-4
          py-8
          mt-4

          text-white

          selection:bg-[#EC1C40]
          selection:text-white

          min-[375px]:px-5
          min-[414px]:px-6

          sm:px-8
          sm:py-10


          md:px-10
          md:py-10

          lg:px-8
          lg:py-10
        "
      >
        {/* =====================================================
            SOFT BACKGROUND DECORATION
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-24
            -top-28

            h-[260px]
            w-[260px]

            rounded-full

            bg-white/[0.05]

            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -bottom-32
            -right-20

            h-[280px]
            w-[280px]

            rounded-full

            bg-[#EC1C40]/15

            blur-3xl
          "
        />

        {/* =====================================================
            SUBTLE TOP / BOTTOM DEPTH
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-px

            bg-white/15
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-x-0
            bottom-0

            h-px

            bg-white/10
          "
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-10

            mx-auto

            flex
            w-full
            max-w-5xl

            flex-col

            items-center
            justify-center

            text-center
          "
        >
          {/* HEADING */}

          <h2
            id="plot-investment-heading"
            className="
              w-full

              text-[25px]
              font-bold
              leading-[1.28]

              tracking-[-0.025em]

              text-white

              min-[375px]:text-[26px]

              sm:text-[30px]
              sm:leading-[1.25]

              md:text-[32px]

              lg:text-[34px]
            "
          >
            Invest in Registry Ready Plots in Dholera{" "}
            <span className="text-[#EC1C40]">From ₹10 Lakh</span>
          </h2>

          {/* =====================================================
              CTA BUTTONS

              MOBILE:
              same horizontal left/right layout as desktop
          ====================================================== */}

          <div
            className="
              mt-7

              grid
              w-full
              max-w-[390px]

              grid-cols-2

              items-stretch

              gap-3

              min-[375px]:gap-3.5

              sm:mt-8
              sm:flex
              sm:w-auto
              sm:max-w-none
              sm:items-center
              sm:justify-center
              sm:gap-4
            "
          >
            {/* =================================================
                GET A CALL BACK
            ================================================== */}

            <a
              href="tel:+919958993549"
              className="
                group

                inline-flex

                min-h-[50px]
                min-w-0

                items-center
                justify-center

                gap-2

                rounded-none

                border
                border-white/30

                bg-white

                px-3
                py-3

                text-[13px]
                font-semibold
                leading-5

                text-black

                shadow-[0_8px_24px_rgba(0,0,0,0.20)]

                transition-[background-color,color,border-color,transform,box-shadow]
                duration-200
                ease-out

                hover:-translate-y-0.5
                hover:border-[#EC1C40]
                hover:bg-[#EC1C40]
                hover:text-white
                hover:shadow-[0_12px_28px_rgba(236,28,64,0.24)]

                active:translate-y-0

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white

                min-[375px]:px-3.5
                min-[375px]:text-[13.5px]

                sm:min-h-[52px]
                sm:min-w-[196px]
                sm:px-6
                sm:text-[16px]

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <Phone
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
                className="
                  shrink-0

                  sm:h-[18px]
                  sm:w-[18px]
                "
              />

              <span className="whitespace-nowrap">Get A Call Back</span>
            </a>

            {/* =================================================
                GET IN TOUCH
            ================================================== */}

            <button
              type="button"
              data-open-dholera-popup
              className="
                group

                inline-flex

                min-h-[50px]
                min-w-0

                items-center
                justify-center

                rounded-none

                border
                border-[#EC1C40]

                bg-[#EC1C40]

                px-3
                py-3

                text-[13px]
                font-semibold
                leading-5

                text-white

                shadow-[0_8px_24px_rgba(236,28,64,0.20)]

                transition-[background-color,color,border-color,transform,box-shadow]
                duration-200
                ease-out

                hover:-translate-y-0.5
                hover:border-white
                hover:bg-white
                hover:text-black
                hover:shadow-[0_12px_28px_rgba(0,0,0,0.20)]

                active:translate-y-0

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white

                min-[375px]:px-3.5
                min-[375px]:text-[13.5px]

                sm:min-h-[52px]
                sm:min-w-[148px]
                sm:px-6
                sm:text-[16px]

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <span className="whitespace-nowrap">Get In Touch</span>
            </button>
          </div>

          {/* =====================================================
              POPUP
          ====================================================== */}

          <PopupForm />
        </div>
      </section>

      {/* =====================================================
          EXPLORE DHOLERA
      ====================================================== */}

      <section
        aria-labelledby="explore-dholera-heading"
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

          min-[375px]:px-5
          min-[414px]:px-6

          sm:px-8
          sm:py-12

          md:px-10
          md:py-12

          lg:px-12
          lg:py-10
        "
      >
        {/* =====================================================
            BACKGROUND ACCENTS
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-24
            -top-28
            -z-10

            h-[260px]
            w-[260px]

            rounded-full

            bg-[#EC1C40]/5

            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -bottom-28
            -left-24
            -z-10

            h-[300px]
            w-[300px]

            rounded-full

            bg-black/[0.02]

            blur-3xl
          "
        />

        <div
          className="
            mx-auto

            w-full
            max-w-7xl
          "
        >
          {/* ===================================================
              HEADER
          ==================================================== */}

          <header
            className="
              mb-7

              sm:mb-8

              lg:mb-9
            "
          >
            <h2
              id="explore-dholera-heading"
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
              Explore <span className="text-[#EC1C40]">Dholera</span>
            </h2>

            <p
              className="
                mt-3

                w-full
                max-w-4xl

                text-[15px]
                leading-7

                text-black/65

                sm:mt-4
                sm:text-[16px]

                lg:max-w-none
                lg:whitespace-nowrap
              "
            >
              Explore key information about Dholera Smart City, industries, real
              estate and investment guidance.
            </p>
          </header>

          {/* ===================================================
              CARDS

              Mobile: 1 column
              Tablet: 2 columns
              Desktop: 4 columns
          ==================================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-5

              sm:gap-6

              md:grid-cols-2

              lg:grid-cols-4
              lg:gap-5

              xl:gap-6
            "
          >
            {exploreItems.map(
              ({ title, description, button, href, icon: Icon }) => (
                <article
                  key={title}
                  className="
                    group

                    flex
                    min-w-0
                    flex-col

                    rounded-2xl

                    border
                    border-black/10

                    bg-white

                    p-5

                    shadow-[0_5px_18px_rgba(0,0,0,0.035)]

                    transition-[transform,border-color,background-color,box-shadow]
                    duration-300
                    ease-out

                    min-[414px]:p-6

                    md:p-5

                    lg:min-h-[245px]
                    lg:p-5

                    xl:min-h-[255px]
                    xl:p-6

                    md:hover:-translate-y-1
                    md:hover:border-[#EC1C40]/25
                    md:hover:bg-white
                    md:hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]

                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                >
                  {/* =========================================
                      ICON + TITLE
                  ========================================== */}

                  <div
                    className="
                      flex

                      items-center

                      gap-3
                    "
                  >
                    <span
                      className="
                        flex

                        h-10
                        w-10

                        shrink-0

                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-[#EC1C40]/20

                        bg-[#EC1C40]/10

                        text-[#EC1C40]

                        transition-[background-color,color,border-color]
                        duration-300

                        sm:h-11
                        sm:w-11

                        md:group-hover:border-[#EC1C40]
                        md:group-hover:bg-[#EC1C40]
                        md:group-hover:text-white
                      "
                    >
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </span>

                    <h3
                      className="
                        min-w-0

                        text-[18px]
                        font-semibold
                        leading-6

                        tracking-[-0.02em]

                        text-black

                        sm:text-[19px]

                        lg:text-[18px]
                        lg:leading-[24px]

                        xl:text-[19px]
                      "
                    >
                      {title}
                    </h3>
                  </div>

                  {/* =========================================
                      DESCRIPTION
                  ========================================== */}

                  <p
                    className="
                      mt-4

                      text-[14px]
                      leading-6

                      text-black/60

                      sm:text-[14.5px]

                      lg:text-[14px]
                      lg:leading-[23px]

                      xl:text-[14.5px]
                    "
                  >
                    {description}
                  </p>

                  {/* =========================================
                      BUTTON
                  ========================================== */}

                  <div
                    className="
                      mt-auto

                      pt-5
                    "
                  >
                    <Link
                      href={href}
                      className="
                        inline-flex

                        min-h-[44px]

                        items-center
                        justify-center

                        rounded-lg

                        border
                        border-black/15

                        bg-black/[0.045]

                        px-4
                        py-2.5

                        text-[13.5px]
                        font-semibold
                        leading-5

                        text-black

                        shadow-[0_2px_8px_rgba(0,0,0,0.025)]

                        transition-[background-color,border-color,color,transform,box-shadow]
                        duration-200
                        ease-out

                        hover:border-[#EC1C40]
                        hover:bg-[#EC1C40]
                        hover:text-white

                        hover:shadow-[0_6px_16px_rgba(236,28,64,0.16)]

                        active:scale-[0.98]

                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-3
                        focus-visible:outline-[#EC1C40]

                        sm:text-[14px]

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                    >
                      {button}
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
