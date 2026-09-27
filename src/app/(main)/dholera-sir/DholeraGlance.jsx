import {
  Building2,
  Cpu,
  Factory,
  Map,
  MapPin,
  Network,
  Plane,
  Route,
  ShieldCheck,
  Zap,
  Landmark,
} from "lucide-react";

/* ============================================================
   DHOLERA SIR AT A GLANCE DATA
============================================================ */

const dholeraFacts = [
  {
    label: "Location",
    value: "Gujarat, India",
    icon: MapPin,
  },
  {
    label: "Area",
    value: "Around 920 sq. km.",
    icon: Map,
  },
  {
    label: "Villages",
    value: "22",
    icon: Building2,
  },
  {
    label: "DMIC",
    value:
      "Key node of the Delhi-Mumbai Industrial Corridor",
    icon: Network,
  },
  {
    label: "Activation Area",
    value: "22.54 sq. km.",
    icon: Route,
  },
  {
    label: "Focus",
    value:
      "Manufacturing, semiconductors, solar, defence and other industries",
    icon: Factory,
  },
  {
    label: "Connectivity",
    value:
      "Airport, expressway, rail and freight connectivity",
    icon: Plane,
  },
  {
    label: "Infrastructure",
    value:
      "Power, water, roads and smart utilities",
    icon: Zap,
  },
  {
    label: "Development",
    value:
      "Planned greenfield industrial city",
    icon: ShieldCheck,
  },
  {
    label: "Major Sector",
    value:
      "Semiconductor manufacturing",
    icon: Cpu,
  },
  {
    label: "Urban Development",
    value:
      "Residential, commercial and public use areas",
    icon: Landmark,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function DholeraSirAtGlance() {
  return (
    <section
      aria-labelledby="dholera-sir-glance-heading"
      className="
        w-full

        border-y
        border-[#EAD9DF]

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
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ===================================================
            MAIN LAYOUT
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1

            gap-7

            md:gap-8

            lg:grid-cols-[minmax(260px,0.42fr)_minmax(0,1.58fr)]
            lg:items-start
            lg:gap-10

            xl:grid-cols-[minmax(300px,0.4fr)_minmax(0,1.6fr)]
            xl:gap-14
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div
            className="
              min-w-0

              lg:sticky
              lg:top-24
            "
          >
            <h2
              id="dholera-sir-glance-heading"
              className="
                max-w-[390px]

                text-[28px]
                font-bold
                leading-[1.15]

                tracking-[-0.03em]

                text-[#39252E]

                sm:text-[30px]

                md:text-[32px]

                lg:text-[36px]
                lg:leading-[1.12]
              "
            >
              Dholera SIR{" "}
              <span
                className="
                  text-[#8F2946]

                  lg:block
                "
              >
                at a Glance
              </span>
            </h2>

            {/* ACCENT */}

            <div
              aria-hidden="true"
              className="
                mt-5

                h-[3px]
                w-14

                rounded-full

                bg-[#8F2946]
              "
            />

            {/* SUPPORTING TEXT */}

            <p
              className="
                mt-5

                max-w-[340px]

                text-[15px]
                leading-7

                text-[#68565E]

                sm:text-[16px]

                lg:mt-6
              "
            >
              Key facts covering Dholera SIR&apos;s
              location, scale, infrastructure,
              connectivity, industrial focus and urban
              development.
            </p>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div
            className="
              min-w-0

              rounded-2xl

              border
              border-[#EAD9DF]

              bg-white

              px-4
              py-2

              shadow-[0_10px_30px_rgba(57,37,46,0.04)]

              min-[414px]:px-5

              sm:px-6
              sm:py-3

              md:px-7

              lg:px-8
            "
          >
            {/* ===============================================
                NUMBERED TIMELINE
            ================================================ */}

            <div
              className="
                relative
              "
            >
              {/* VERTICAL CONNECTING LINE */}

              <div
                aria-hidden="true"
                className="
                  absolute

                  bottom-7
                  left-[17px]
                  top-7

                  w-px

                  bg-[#DEC7CF]

                  sm:left-[19px]
                "
              />

              {/* =============================================
                  FACTS
              ============================================== */}

              {dholeraFacts.map(
                (
                  {
                    label,
                    value,
                    icon: Icon,
                  },
                  index,
                ) => {
                  const number = String(
                    index + 1,
                  ).padStart(2, "0");

                  const isLast =
                    index ===
                    dholeraFacts.length - 1;

                  return (
                    <article
                      key={label}
                      className={`
                        relative

                        grid
                        grid-cols-[36px_40px_minmax(0,1fr)]

                        items-start

                        gap-x-3

                        py-3.5

                        sm:grid-cols-[40px_44px_minmax(0,1fr)]
                        sm:gap-x-4
                        sm:py-4

                        ${
                          !isLast
                            ? `
                                border-b
                                border-[#EAD9DF]
                              `
                            : ""
                        }
                      `}
                    >
                      {/* =====================================
                          COUNT NUMBER
                      ====================================== */}

                      <div
                        className="
                          relative
                          z-10

                          flex

                          h-[34px]
                          w-[34px]

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[#E0A4B5]

                          bg-[#F7EBEF]

                          text-[11px]
                          font-bold
                          leading-none

                          tracking-[-0.01em]

                          text-[#8F2946]

                          sm:h-[38px]
                          sm:w-[38px]
                          sm:text-[12px]
                        "
                      >
                        {number}
                      </div>

                      {/* =====================================
                          ICON
                      ====================================== */}

                      <div
                        className="
                          flex

                          h-10
                          w-10

                          shrink-0

                          items-center
                          justify-center

                          rounded-xl

                          bg-[#FAF7F8]

                          text-[#8F2946]

                          transition-[background-color,color]
                          duration-200

                          sm:h-11
                          sm:w-11
                        "
                      >
                        <Icon
                          size={19}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>

                      {/* =====================================
                          CONTENT
                      ====================================== */}

                      <div
                        className="
                          min-w-0

                          pt-0.5
                        "
                      >
                        <h3
                          className="
                            text-[14px]
                            font-semibold
                            leading-5

                            tracking-[-0.01em]

                            text-[#39252E]

                            sm:text-[15px]
                            sm:leading-6

                            md:text-[15.5px]
                          "
                        >
                          {label}
                        </h3>

                        <p
                          className="
                            mt-0.5

                            text-[13.5px]
                            font-normal
                            leading-[21px]

                            text-[#68565E]

                            sm:text-[14px]
                            sm:leading-[22px]

                            md:text-[14.5px]
                          "
                        >
                          {value}
                        </p>
                      </div>
                    </article>
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