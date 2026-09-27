import Image from "next/image";

import {
  Building2,
  Cpu,
  Factory,
  Leaf,
  Map,
  MapPin,
  Plug,
  RadioTower,
  Route,
} from "lucide-react";

import dholeraSite from "@/assets/dholera-smart-city-home-image2.webp";

/* ============================================================
   KEY HIGHLIGHTS
============================================================ */

const highlights = [
  {
    title: "920 Sq. Km. Dholera SIR",
    description:
      "Large planned greenfield region in Gujarat",
    icon: Map,
  },
  {
    title: "Greenfield Smart City",
    description:
      "Modern infrastructure for industries and residents",
    icon: Leaf,
  },
  {
    title: "DMIC",
    description:
      "Part of the Delhi-Mumbai Industrial Corridor",
    icon: Route,
  },
  {
    title: "Plug & Play Infrastructure",
    description:
      "Digital systems and modern utilities",
    icon: Plug,
  },
  {
    title: "Industrial Hub",
    description:
      "Semiconductors, solar, defence and aerospace",
    icon: Factory,
  },
  {
    title: "Strong Connectivity",
    description:
      "Roads, rail, freight and Dholera Airport",
    icon: RadioTower,
  },
  {
    title: "Semiconductor Hub",
    description:
      "Major projects including Tata Electronics",
    icon: Cpu,
  },
  {
    title: "Residential & Public Services",
    description:
      "Planned infrastructure for residential areas and public services",
    icon: Building2,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function Dholera() {
  return (
    <section
      aria-labelledby="dholera-heading"
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
          SOFT BACKGROUND ACCENTS
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-32
          -top-32
          -z-10

          h-[320px]
          w-[320px]

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
          -bottom-36
          -right-28
          -z-10

          h-[400px]
          w-[400px]

          rounded-full

          bg-[#8F2946]/[0.05]

          blur-3xl
        "
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* ===================================================
            FULL WIDTH INTRODUCTION
        ==================================================== */}

        <header
          className="
            w-full

            border-b
            border-[#EAD9DF]

            pb-5

            sm:pb-6

            lg:pb-7
          "
        >
          <h2
            id="dholera-heading"
            className="
              w-full

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
            What Is{" "}
            <span className="text-[#8F2946]">
              Dholera Smart City?
            </span>
          </h2>

          <p
            className="
              mt-3

              w-full
              max-w-6xl

              text-[15px]
              leading-7

              text-[#68565E]

              sm:mt-4
              sm:text-[16px]
              sm:leading-7

              lg:text-[16px]
              lg:leading-7
            "
          >
            Dholera Smart City is a planned greenfield smart city in Gujarat,
            developed within the Dholera Special Investment Region (Dholera
            SIR). It is part of the Delhi-Mumbai Industrial Corridor (DMIC) and
            is being developed with modern infrastructure for industries,
            businesses, residential areas and public services.
          </p>
        </header>

        {/* ===================================================
            MAIN CONTENT

            Desktop:
            Image on LEFT
            Highlights on RIGHT

            Both cards remain equal height.

            Mobile:
            Image first
            Highlights below
        ==================================================== */}

        <div
          className="
            mt-6

            grid

            gap-6

            sm:mt-7

            lg:grid-cols-[minmax(340px,0.65fr)_minmax(0,1.35fr)]
            lg:items-stretch
            lg:gap-7

            xl:grid-cols-[minmax(380px,0.6fr)_minmax(0,1.4fr)]
            xl:gap-8
          "
        >
          {/* =================================================
              IMAGE — LEFT SIDE
          ================================================== */}

          <figure
            className="
              relative
              m-0

              aspect-[4/3]

              w-full

              overflow-hidden

              rounded-2xl

              border
              border-[#DEC7CF]

              bg-[#EEDDE4]

              shadow-[0_10px_30px_rgba(57,37,46,0.08)]

              sm:rounded-[22px]

              lg:h-full
              lg:min-h-0
              lg:aspect-auto
            "
          >
            <Image
              src={dholeraSite}
              alt="Dholera Smart City"
              fill
              sizes="
                (min-width: 1280px) 400px,
                (min-width: 1024px) 34vw,
                (min-width: 768px) calc(100vw - 64px),
                calc(100vw - 32px)
              "
              className="
                object-cover
                object-center

                transition-transform
                duration-700
                ease-out

                md:hover:scale-[1.02]

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />

            {/* IMAGE OVERLAY */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-t

                from-[#39252E]/26
                via-transparent
                to-transparent
              "
            />

            {/* INNER BORDER */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-3

                rounded-xl

                border
                border-white/25

                sm:inset-4
              "
            />

            {/* LOCATION CARD */}

            <figcaption
              className="
                absolute

                bottom-4
                left-4
                right-4

                flex
                items-center

                gap-3

                rounded-xl

                border
                border-white/60

                bg-white/95

                px-3.5
                py-3

                shadow-[0_6px_20px_rgba(57,37,46,0.12)]

                backdrop-blur-sm

                sm:right-auto
                sm:min-w-[230px]
                sm:px-4

                lg:bottom-5
                lg:left-5
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

                  rounded-lg

                  bg-[#F7EBEF]

                  text-[#8F2946]
                "
              >
                <MapPin
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <div className="min-w-0">
                <p
                  className="
                    text-[14px]
                    font-semibold
                    leading-5

                    text-[#39252E]

                    sm:text-[15px]
                  "
                >
                  Dholera Smart City
                </p>

                <p
                  className="
                    mt-0.5

                    text-[12px]
                    leading-5

                    text-[#68565E]

                    sm:text-[13px]
                  "
                >
                  Gujarat, India
                </p>
              </div>
            </figcaption>
          </figure>

          {/* =================================================
              HIGHLIGHTS — RIGHT SIDE
          ================================================== */}

          <div
            className="
              min-w-0

              overflow-hidden

              rounded-2xl

              border
              border-[#DEC7CF]

              bg-white

              shadow-[0_8px_26px_rgba(57,37,46,0.05)]

              sm:rounded-[22px]
            "
          >
            {/* ===============================================
                HIGHLIGHTS TITLE
            ================================================ */}

            <div
              className="
                border-b
                border-[#EAD9DF]

                bg-gradient-to-r
                from-[#F3E7EC]
                via-[#F7EFF2]
                to-white

                px-4
                py-4

                sm:px-5
                sm:py-5

                lg:px-6
              "
            >
              <h3
                className="
                  text-[19px]
                  font-semibold
                  leading-6

                  tracking-[-0.02em]

                  text-[#39252E]

                  sm:text-[21px]
                  sm:leading-7

                  lg:text-[24px]
                "
              >
                Key Highlights of Dholera Smart City
              </h3>
            </div>

            {/* ===============================================
                HIGHLIGHTS GRID
            ================================================ */}

            <div
              className="
                grid
                grid-cols-1

                px-4

                sm:px-5

                md:grid-cols-2

                lg:px-6
              "
            >
              {highlights.map(
                (
                  {
                    title,
                    description,
                    icon: Icon,
                  },
                  index,
                ) => {
                  const isLast =
                    index === highlights.length - 1;

                  const isLeftColumn =
                    index % 2 === 0;

                  const isLastDesktopRow =
                    index >= highlights.length - 2;

                  return (
                    <div
                      key={title}
                      className={`
                        group

                        flex
                        min-w-0

                        items-start

                        gap-3.5

                        border-[#EFE3E7]

                        py-4

                        sm:gap-4
                        sm:py-5

                        md:px-5

                        ${
                          !isLast
                            ? "border-b"
                            : ""
                        }

                        ${
                          isLeftColumn
                            ? "md:border-r"
                            : ""
                        }

                        ${
                          isLastDesktopRow
                            ? "md:border-b-0"
                            : "md:border-b"
                        }

                        ${
                          isLeftColumn
                            ? "md:pl-0"
                            : "md:pr-0"
                        }
                      `}
                    >
                      {/* ICON */}

                      <span
                        className="
                          flex

                          h-11
                          w-11

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[#E0A4B5]/45

                          bg-[#F7EBEF]

                          text-[#8F2946]

                          transition-[background-color,color,border-color,transform]
                          duration-300
                          ease-out

                          md:group-hover:-translate-y-0.5
                          md:group-hover:border-[#8F2946]/30
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

                      {/* TEXT */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-[15px]
                            font-semibold
                            leading-6

                            text-[#39252E]

                            sm:text-[16px]
                          "
                        >
                          {title}
                        </p>

                        <p
                          className="
                            mt-1

                            text-[13px]
                            leading-5

                            text-[#68565E]

                            sm:text-[14px]
                            sm:leading-[22px]
                          "
                        >
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}