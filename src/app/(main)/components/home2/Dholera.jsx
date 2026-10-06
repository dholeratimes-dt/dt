import Image from "next/image";

import {
  Building2,
  Cpu,
  Factory,
  Leaf,
  Map,
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
    description: "Large planned greenfield region in Gujarat",
    icon: Map,
  },
  {
    title: "Greenfield Smart City",
    description: "Modern infrastructure for industries and residents",
    icon: Leaf,
  },
  {
    title: "DMIC",
    description: "Part of the Delhi-Mumbai Industrial Corridor",
    icon: Route,
  },
  {
    title: "Plug & Play Infrastructure",
    description: "Digital systems and modern utilities",
    icon: Plug,
  },
  {
    title: "Industrial Hub",
    description: "Semiconductors, solar, defence and aerospace",
    icon: Factory,
  },
  {
    title: "Strong Connectivity",
    description: "Roads, rail, freight and Dholera Airport",
    icon: RadioTower,
  },
  {
    title: "Semiconductor Hub",
    description: "Major projects including Tata Electronics",
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

        bg-white

        px-4
        py-8

        text-black

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5

        sm:px-6
        sm:py-8

        md:px-8
        md:py-8

        lg:px-10
        lg:py-8
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

          bg-[#EC1C40]/5

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

          bg-[#EC1C40]/[0.035]

          blur-3xl
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div className="mx-auto w-full max-w-7xl">
        {/* ===================================================
            INTRODUCTION
        ==================================================== */}

        <header
          className="
            w-full

            border-b
            border-black/10

            pb-5

            sm:pb-5

            md:pb-6

            lg:pb-6
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

              text-black

              sm:text-[30px]

              md:text-[32px]

              lg:text-[34px]
            "
          >
            What is <span className="text-[#EC1C40]">Dholera Smart City?</span>
          </h2>

          <p
            className="
              mt-2.5

              w-full
              max-w-6xl

              text-[15px]
              leading-[26px]

              text-black/65

              sm:mt-3
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
            Image LEFT
            Highlights RIGHT

            Mobile:
            Image first
            Highlights below
        ==================================================== */}

        <div
          className="
            mt-5


            grid

            gap-5

            sm:mt-6
            sm:gap-6

            lg:grid-cols-[minmax(340px,0.65fr)_minmax(0,1.35fr)]
            lg:items-stretch
            lg:gap-6

            xl:grid-cols-[minmax(380px,0.6fr)_minmax(0,1.4fr)]
            xl:gap-7
          "
        >
          {/* =================================================
              IMAGE
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
              border-black/10

              bg-black/[0.03]

              shadow-[0_8px_24px_rgba(0,0,0,0.065)]

              sm:rounded-[20px]

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

                from-black/20
                via-transparent
                to-transparent
                lg:mb-10
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
          </figure>

          {/* =================================================
              HIGHLIGHTS CARD
          ================================================== */}

          <div
            className="
              min-w-0

              overflow-hidden

              rounded-2xl

              border
              border-black/10

              bg-white

              shadow-[0_7px_22px_rgba(0,0,0,0.045)]

              sm:rounded-[20px]
            "
          >
            {/* ===============================================
                TITLE
            ================================================ */}

            <div
              className="
                border-b
                border-black/10

                bg-gradient-to-r
                from-[#EC1C40]/5
                via-[#EC1C40]/[0.02]
                to-white

                px-4
                py-3.5

                sm:px-5
                sm:py-4

                lg:px-5
                lg:py-4
              "
            >
              <h3
                className="
                  text-[19px]
                  font-semibold
                  leading-6

                  tracking-[-0.02em]

                  text-black

                  sm:text-[21px]
                  sm:leading-7

                  lg:text-[23px]
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

                lg:px-5
              "
            >
              {highlights.map(({ title, description, icon: Icon }, index) => {
                const isLast = index === highlights.length - 1;

                const isLeftColumn = index % 2 === 0;

                const isLastDesktopRow = index >= highlights.length - 2;

                return (
                  <div
                    key={title}
                    className={`
                        group

                        flex
                        min-w-0

                        items-start

                        gap-3

                        border-black/10

                        py-3.5

                        sm:gap-3.5
                        sm:py-4

                        md:px-4

                        lg:px-5
                        lg:py-4

                        ${!isLast ? "border-b" : ""}

                        ${isLeftColumn ? "md:border-r" : ""}

                        ${isLastDesktopRow ? "md:border-b-0" : "md:border-b"}

                        ${isLeftColumn ? "md:pl-0" : "md:pr-0"}
                      `}
                  >
                    {/* ICON */}

                    <span
                      className="
                          flex

                          h-10
                          w-10

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[#EC1C40]/20

                          bg-[#EC1C40]/10

                          text-[#EC1C40]

                          transition-[background-color,color,border-color,transform]
                          duration-300
                          ease-out

                          sm:h-11
                          sm:w-11

                          md:group-hover:-translate-y-0.5

                          md:group-hover:border-[#EC1C40]/30
                          md:group-hover:bg-[#EC1C40]
                          md:group-hover:text-white

                          motion-reduce:transform-none
                          motion-reduce:transition-none
                        "
                    >
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    </span>

                    {/* TEXT */}

                    <div
                      className="
                          min-w-0
                          flex-1

                          pt-0.5
                        "
                    >
                      <p
                        className="
                            text-[15px]
                            font-semibold
                            leading-[22px]

                            text-black

                            sm:text-[16px]
                            sm:leading-6
                          "
                      >
                        {title}
                      </p>

                      <p
                        className="
                            mt-0.5

                            text-[13px]
                            leading-5

                            text-black/60

                            sm:mt-1
                            sm:text-[14px]
                            sm:leading-[21px]
                          "
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
