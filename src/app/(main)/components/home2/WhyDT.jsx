import {
  CheckCircle2,
  FileCheck2,
  MapPinned,
  Newspaper,
  RefreshCw,
  SearchCheck,
} from "lucide-react";
import Link from "next/link";
/* ============================================================
   DATA
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
   MOBILE ROAD PATH
============================================================ */

const mobileRoadPath = `
  M 8 0
  V 55
  C 8 95 20 110 36 110
  H 64
  C 80 110 92 125 92 165
  V 210
  C 92 250 80 270 64 270
  H 36
  C 20 270 8 290 8 330
  V 370
  C 8 410 20 430 36 430
  H 64
  C 80 430 92 450 92 490
  V 530
  C 92 570 80 590 64 590
  H 36
  C 20 590 8 610 8 650
  V 690
  C 8 730 20 750 36 750
  H 64
  C 80 750 92 770 92 810
  V 850
  C 92 890 80 910 64 910
  H 36
  C 20 910 8 930 8 970
  V 1000
`;

/* ============================================================
   DESKTOP ROAD PATH
============================================================ */

const desktopRoadPath = `
  M 0 90
  H 1080
  C 1145 90 1175 120 1175 180
  V 265
  C 1175 325 1145 350 1080 350
  H 120
  C 55 350 25 380 25 440
  V 560
`;

/* ============================================================
   DESKTOP POSITIONS
============================================================ */

const desktopPositions = [
  "lg:left-[4%] lg:top-[54px]",
  "lg:left-[36%] lg:top-[54px]",
  "lg:left-[68%] lg:top-[54px]",
  "lg:left-[68%] lg:top-[318px]",
  "lg:left-[36%] lg:top-[318px]",
  "lg:left-[4%] lg:top-[318px]",
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
        bg-white

        px-4
        py-8

        text-black

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5
        sm:px-6
        md:px-8
        lg:px-10
      "
    >
      {/* =====================================================
          LIGHTWEIGHT BACKGROUND

          Replaces large blur-3xl elements.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
        "
        style={{
          background: `
            radial-gradient(
              circle at 100% 0%,
              rgba(236, 28, 64, 0.045),
              transparent 28%
            ),
            radial-gradient(
              circle at 0% 100%,
              rgba(0, 0, 0, 0.022),
              transparent 30%
            )
          `,
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}

        <header className="max-w-5xl text-left">
          <h2
            id="why-follow-dholera-times-heading"
            className="
              text-[28px]
              font-bold
              leading-[1.15]
              tracking-[-0.03em]
              text-black

              sm:text-[30px]
              md:text-[32px]
              lg:text-[34px]
            "
          >
            Why Follow{" "}
            <span className="text-[#EC1C40]">
              Dholera Times?
            </span>
          </h2>

          <p
            className="
              mt-3
              max-w-4xl

              text-[15px]
              leading-7
              text-black/65

              sm:mt-4
              sm:text-[16px]
            "
          >
            <Link
              href="/about"
              className="text-blue-600 hover:underline"
            >
              Dholera Times
            </Link>
            {" "}covers धोलेरा Smart City news,
            development updates and investment insights with a
            focus on verified जानकारी, local reporting and
            clear project status.
          </p>
        </header>

        {/* ===================================================
            RESPONSIVE ROAD

            One card structure for mobile + desktop.
        ==================================================== */}

        <div
          className="
            relative

            mx-auto
            mt-10

            max-w-[720px]

            lg:mt-0
            lg:min-h-[575px]
            lg:max-w-none
          "
        >
          {/* =================================================
              MOBILE / TABLET ROAD
          ================================================== */}

          <svg
            aria-hidden="true"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="
              pointer-events-none

              absolute
              inset-0

              h-full
              w-full

              overflow-visible

              lg:hidden
            "
          >
            <path
              d={mobileRoadPath}
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d={mobileRoadPath}
              fill="none"
              stroke="rgba(236,28,64,0.28)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* =================================================
              DESKTOP ROAD
          ================================================== */}

          <svg
            aria-hidden="true"
            viewBox="0 0 1200 560"
            preserveAspectRatio="none"
            className="
              pointer-events-none

              absolute
              inset-0

              hidden

              h-full
              w-full

              lg:block
            "
          >
            <path
              d={desktopRoadPath}
              fill="none"
              stroke="rgba(0,0,0,0.075)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d={desktopRoadPath}
              fill="none"
              stroke="rgba(236,28,64,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* =================================================
              ITEMS

              Only 6 articles exist now.
              Previously mobile + desktop produced duplicates.
          ================================================== */}

          {reasons.map(
            ({ title, description, icon: Icon }, index) => {
              const isRight = index % 2 !== 0;

              return (
                <article
                  key={title}
                  className={`
                    group
                    relative
                    z-10

                    min-h-[176px]

                    sm:min-h-[168px]

                    lg:absolute
                    lg:min-h-0
                    lg:w-[28%]

                    ${desktopPositions[index]}
                  `}
                >
                  <div
                    className={`
                      grid

                      min-h-[176px]

                      items-center

                      gap-4

                      sm:min-h-[168px]
                      sm:gap-6

                      lg:block
                      lg:min-h-0

                      ${
                        isRight
                          ? `
                            grid-cols-[minmax(0,1fr)_58px]
                            sm:grid-cols-[minmax(0,1fr)_64px]
                          `
                          : `
                            grid-cols-[58px_minmax(0,1fr)]
                            sm:grid-cols-[64px_minmax(0,1fr)]
                          `
                      }
                    `}
                  >
                    {/* =========================================
                        ICON
                    ========================================== */}

                    <div
                      className={`
                        flex

                        ${
                          isRight
                            ? "order-2 justify-end"
                            : "order-1 justify-start"
                        }

                        lg:order-none
                        lg:block
                      `}
                    >
                      <span
                        className="
                          relative
                          z-10

                          flex

                          h-[58px]
                          w-[58px]

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border-[5px]
                          border-white

                          bg-[#EC1C40]

                          text-white

                          shadow-[0_8px_22px_rgba(236,28,64,0.22)]

                          transition-transform
                          duration-300
                          ease-out

                          hover:-translate-y-1
                          hover:scale-[1.03]

                          sm:h-16
                          sm:w-16

                          lg:h-[72px]
                          lg:w-[72px]
                          lg:border-[7px]

                          lg:group-hover:-translate-y-1
                          lg:group-hover:scale-[1.04]

                          xl:h-[78px]
                          xl:w-[78px]

                          motion-reduce:transform-none
                          motion-reduce:transition-none
                        "
                      >
                        <Icon
                          size={27}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    {/* =========================================
                        CONTENT
                    ========================================== */}

                    <div
                      className={`
                        min-w-0

                        rounded-2xl

                        border
                        border-black/[0.07]

                        bg-white

                        p-4

                        shadow-[0_10px_30px_-24px_rgba(0,0,0,0.22)]

                        transition-[transform,border-color]
                        duration-300
                        ease-out

                        sm:p-5

                        ${
                          isRight
                            ? "order-1"
                            : "order-2"
                        }

                        lg:order-none

                        lg:mt-4
                        lg:max-w-[330px]
                        lg:p-4

                        lg:group-hover:-translate-y-0.5
                        lg:group-hover:border-[#EC1C40]/20

                        xl:p-5

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      `}
                    >
                      <h3
                        className="
                          text-[17px]
                          font-bold
                          leading-6

                          tracking-[-0.015em]

                          text-black

                          sm:text-[18px]

                          lg:text-[17px]

                          xl:text-[18px]
                        "
                      >
                        {title}
                      </h3>

                      <p
                        className="
                          mt-2

                          text-[14px]
                          leading-6

                          text-black/60

                          sm:text-[15px]
                          sm:leading-7

                          lg:text-[13.5px]
                          lg:leading-6

                          xl:text-[14px]
                        "
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}