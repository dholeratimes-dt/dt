import Link from "next/link";

import {
  Building2,
  Factory,
  Home,
  Landmark,
  Phone,
} from "lucide-react";

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
    <section
      aria-labelledby="plot-investment-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-gradient-to-r
        from-[#39252E]
        via-[#742039]
        to-[#8F2946]

        px-4
        py-9

        text-white

        selection:bg-white
        selection:text-[#8F2946]

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-11

        lg:px-10
        lg:py-12
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

          bg-[#E0A4B5]/10

          blur-3xl
        "
      />

      {/* =====================================================
          SUBTLE TOP/BOTTOM DEPTH
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

          bg-black/10
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
            max-w-4xl

            text-[26px]
            font-bold
            leading-[1.25]

            tracking-[-0.025em]

            text-white

            sm:text-[30px]

            md:text-[32px]

            lg:text-[34px]
          "
        >
          Invest in Registry Ready Plots in Dholera{" "}
          <span className="text-[#F3DDE4]">
            From ₹10 Lakh
          </span>
        </h2>

        {/* CTA */}

        <div className="mt-6 sm:mt-7">
            <a
            href="tel:+919958993549"
            className="
                group

                inline-flex

                min-h-[50px]

                items-center
                justify-center

                gap-2.5

                rounded-xl

                border
                border-white/30

                bg-white

                px-5
                py-3

                text-[15px]
                font-semibold
                leading-6

                text-[#8F2946]

                shadow-[0_8px_24px_rgba(32,10,18,0.16)]

                transition-[background-color,color,border-color,transform,box-shadow]
                duration-200
                ease-out

                hover:-translate-y-0.5
                hover:border-white
                hover:bg-[#F7EBEF]
                hover:text-[#742039]
                hover:shadow-[0_12px_28px_rgba(32,10,18,0.22)]

                active:translate-y-0

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white

                sm:min-h-[52px]
                sm:px-6
                sm:text-[16px]

                motion-reduce:transform-none
                motion-reduce:transition-none
            "
            >
            <Phone
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
                className="shrink-0"
            />

            <span>Get A Call Back</span>
            </a>
        </div>

        {/* SECONDARY CONTACT LINK */}

        <Link
          href="/contact/inquiry"
          className="
            mt-4

            text-[13px]
            font-medium
            leading-5

            text-white/80

            underline
            decoration-white/30
            underline-offset-4

            transition-colors
            duration-200

            hover:text-white

            sm:text-[14px]
          "
        >
          Get in Touch
        </Link>
      </div>
    </section>
    

    <section
    aria-labelledby="explore-dholera-heading"
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
        VERY SUBTLE BACKGROUND ACCENTS
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

        bg-[#E0A4B5]/[0.06]

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

        bg-[#8F2946]/[0.025]

        blur-3xl
        "
    />

    <div className="mx-auto w-full max-w-7xl">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <header
        className="
            mb-6

            sm:mb-7

            lg:mb-8
        "
        >
        <h2
            id="explore-dholera-heading"
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
            Explore{" "}
            <span className="text-[#8F2946]">
            Dholera
            </span>
        </h2>

        <p
            className="
            mt-3

            w-full

            text-[15px]
            leading-7

            text-[#68565E]

            sm:text-[16px]

            lg:whitespace-nowrap
            "
        >
            Explore key information about Dholera Smart City, industries,
            real estate and investment guidance.
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

            gap-4

            sm:gap-5

            md:grid-cols-2

            lg:grid-cols-4
            lg:gap-5

            xl:gap-6
        "
        >
        {exploreItems.map(
            ({
            title,
            description,
            button,
            href,
            icon: Icon,
            }) => (
            <article
                key={title}
                className="
                group

                flex
                min-w-0
                flex-col

                rounded-2xl

                border
                border-[#EAD9DF]

                bg-[#FAF7F8]

                p-5

                shadow-[0_5px_18px_rgba(57,37,46,0.035)]

                transition-[transform,border-color,background-color,box-shadow]
                duration-300
                ease-out

                sm:p-5

                lg:min-h-[245px]
                lg:p-5

                xl:min-h-[255px]
                xl:p-6

                md:hover:-translate-y-1
                md:hover:border-[#E0A4B5]
                md:hover:bg-white
                md:hover:shadow-[0_14px_32px_rgba(116,32,57,0.08)]

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
                    border-[#E0A4B5]/50

                    bg-[#F7EBEF]

                    text-[#8F2946]

                    transition-[background-color,color,border-color]
                    duration-300

                    sm:h-11
                    sm:w-11

                    md:group-hover:border-[#8F2946]
                    md:group-hover:bg-[#8F2946]
                    md:group-hover:text-white
                    "
                >
                    <Icon
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    />
                </span>

                <h3
                    className="
                    min-w-0

                    text-[18px]
                    font-semibold
                    leading-6

                    tracking-[-0.02em]

                    text-[#39252E]

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

                    text-[#68565E]

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
                    border-[#DEC7CF]

                    bg-white

                    px-4
                    py-2.5

                    text-[13.5px]
                    font-semibold
                    leading-5

                    text-[#8F2946]

                    shadow-[0_2px_8px_rgba(57,37,46,0.025)]

                    transition-[background-color,border-color,color,transform,box-shadow]
                    duration-200
                    ease-out

                    hover:border-[#8F2946]
                    hover:bg-[#8F2946]
                    hover:text-white
                    hover:shadow-[0_6px_16px_rgba(143,41,70,0.12)]

                    active:scale-[0.98]

                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-3
                    focus-visible:outline-[#8F2946]

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