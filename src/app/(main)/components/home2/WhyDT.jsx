import {
  CheckCircle2,
  FileCheck2,
  MapPinned,
  Newspaper,
  RefreshCw,
  SearchCheck,
} from "lucide-react";

/* ============================================================
   WHY FOLLOW DHOLERA TIMES
============================================================ */

const reasons = [
  {
    title: "On Ground Coverage",
    description:
      "Our local team tracks site progress, infrastructure activity and important developments across Dholera.",
    icon: MapPinned,
  },
  {
    title: "Verified Sources",
    description:
      "We use government releases, official authorities, company announcements and other credible sources.",
    icon: SearchCheck,
  },
  {
    title: "Clear Project Status",
    description:
      "We distinguish between operational, under construction, approved, announced and proposed projects.",
    icon: CheckCircle2,
  },
  {
    title: "Dholera Focused Reporting",
    description:
      "Our coverage focuses on Dholera SIR, infrastructure, industries, companies and major development activity.",
    icon: Newspaper,
  },
  {
    title: "Practical Investment Insights",
    description:
      "We explain opportunities with context on location, pricing, documentation, infrastructure and potential risks.",
    icon: FileCheck2,
  },
  {
    title: "Regular Updates & Corrections",
    description:
      "We update our reports as projects progress and correct information when reliable new details become available.",
    icon: RefreshCw,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function WhyDT() {
  return (
    <section
      aria-labelledby="why-follow-dholera-times-heading"
      className="
        relative
        isolate
        overflow-hidden


        bg-[#FAF7F8]

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
          SUBTLE BACKGROUND ACCENTS
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-28
          -top-28
          -z-10

          h-[300px]
          w-[300px]

          rounded-full

          bg-[#E0A4B5]/10

          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-32
          -left-24
          -z-10

          h-[320px]
          w-[320px]

          rounded-full

          bg-[#8F2946]/[0.04]

          blur-3xl
        "
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}

        <header
          className="
            mb-7

            max-w-5xl

            sm:mb-8

            lg:mb-9
          "
        >
          <h2
            id="why-follow-dholera-times-heading"
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
            Why Follow{" "}
            <span className="text-[#8F2946]">
              Dholera Times?
            </span>
          </h2>

          <p
            className="
              mt-3
              text-[15px]
              leading-7
              text-[#68565E]
              sm:text-[16px]
              sm:leading-7
            "
          >
            Dholera Times covers Dholera Smart City news,
            development updates and investment insights with a
            focus on verified information, local reporting and
            clear project status.
          </p>
        </header>

        {/* ===================================================
            REASONS GRID

            Mobile: 1 column
            Tablet: 2 columns
            Desktop: 3 columns
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1

            gap-4

            sm:gap-5

            md:grid-cols-2

            lg:grid-cols-3
            lg:gap-5

            xl:gap-6
          "
        >
          {reasons.map(
            ({
              title,
              description,
              icon: Icon,
            }) => (
              <article
                key={title}
                className="
                  group

                  relative

                  flex
                  min-w-0
                  flex-col

                  overflow-hidden

                  rounded-2xl

                  border
                  border-[#DEC7CF]

                  bg-white

                  p-5

                  shadow-[0_6px_20px_rgba(57,37,46,0.04)]

                  transition-[transform,border-color,box-shadow]
                  duration-300
                  ease-out

                  sm:p-6

                  md:hover:-translate-y-1
                  md:hover:border-[#8F2946]/35
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

                    gap-3.5
                  "
                >
                  <span
                    className="
                      flex

                      h-11
                      w-11

                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-[#E0A4B5]/45

                      bg-[#F7EBEF]

                      text-[#8F2946]

                      transition-[background-color,color,border-color,transform]
                      duration-300
                      ease-out

                      md:group-hover:-translate-y-0.5
                      md:group-hover:border-[#8F2946]
                      md:group-hover:bg-[#8F2946]
                      md:group-hover:text-white

                      motion-reduce:transform-none
                      motion-reduce:transition-none
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

                      tracking-[-0.015em]

                      text-[#39252E]

                      sm:text-[19px]

                      lg:text-[18px]

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
                    sm:leading-7

                    lg:text-[14px]
                    lg:leading-[24px]

                    xl:text-[14.5px]
                  "
                >
                  {description}
                </p>

                {/* =========================================
                    BOTTOM ACCENT
                ========================================== */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-0

                    h-[3px]
                    w-0

                    bg-[#8F2946]

                    transition-[width]
                    duration-300
                    ease-out

                    md:group-hover:w-full
                  "
                />
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}