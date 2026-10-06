import {
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  Map,
  MapPin,
  Plane,
  Route,
  Zap,
} from "lucide-react";

/* ============================================================
   DATA
============================================================ */

const glanceItems = [
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
    value: "Key node of the Delhi-Mumbai Industrial Corridor",
    icon: Route,
  },
  {
    label: "Activation Area",
    value: "22.54 sq. km.",
    icon: CheckCircle2,
  },
  {
    label: "Focus",
    value:
      "Manufacturing, semiconductors, solar, defence and other industries",
    icon: Factory,
  },
  {
    label: "Connectivity",
    value: "Airport, expressway, rail and freight connectivity",
    icon: Plane,
  },
  {
    label: "Infrastructure",
    value: "Power, water, roads and smart utilities",
    icon: Zap,
  },
  {
    label: "Development",
    value: "Planned greenfield industrial city",
    icon: Building2,
  },
  {
    label: "Major Sector",
    value: "Semiconductor manufacturing",
    icon: Cpu,
  },
  {
    label: "Urban Development",
    value: "Residential, commercial and public use areas",
    icon: Building2,
  },
];

/* ============================================================
   HEXAGON
============================================================ */

function GlanceHexagon({
  item,
  size = "desktop",
}) {
  const {
    label,
    value,
    icon: Icon = Building2,
  } = item;

  const normalizedLabel =
    label.toLowerCase().trim();

  const isPrimary =
    normalizedLabel === "area" ||
    normalizedLabel === "focus";

  const isSoftAccent =
    normalizedLabel === "connectivity";

  const isNeutral =
    normalizedLabel === "villages" ||
    normalizedLabel === "development" ||
    normalizedLabel === "urban development";

  const sizeClasses = {
    mobile: `
      w-[138px]
      min-[360px]:w-[145px]
      min-[390px]:w-[152px]
      min-[430px]:w-[158px]
    `,

    tablet: `
      w-[168px]
      md:w-[174px]
    `,

    desktop: `
      w-[154px]
      lg:w-[158px]
      xl:w-[168px]
    `,
  };

  return (
    <article
      className={`
        group
        relative

        aspect-[1.12/1]

        shrink-0

        origin-center

        transition-transform
        duration-300
        ease-out

        hover:scale-[1.025]

        ${sizeClasses[size]}

        motion-reduce:transition-none
      `}
    >
      {/* =====================================================
          OUTER HEXAGON
      ====================================================== */}

      <div
        aria-hidden="true"
        className={`
          absolute
          inset-0

          [clip-path:polygon(
            25%_6.7%,
            75%_6.7%,
            100%_50%,
            75%_93.3%,
            25%_93.3%,
            0_50%
          )]

          ${
            isPrimary
              ? "bg-[#EC1C40]"
              : "bg-black/10"
          }
        `}
      />

      {/* =====================================================
          INNER HEXAGON
      ====================================================== */}

      <div
        className={`
          absolute
          inset-[1px]

          flex
          flex-col
          items-center
          justify-center

          overflow-hidden

          px-3
          py-3

          text-center

          [clip-path:polygon(
            25%_6.7%,
            75%_6.7%,
            100%_50%,
            75%_93.3%,
            25%_93.3%,
            0_50%
          )]

          ${
            isPrimary
              ? `
                  bg-[#EC1C40]
                  shadow-[0_12px_26px_rgba(236,28,64,0.12)]
                `
              : isSoftAccent
                ? `
                    bg-[#EC1C40]/10
                  `
                : isNeutral
                  ? `
                      bg-black/[0.045]
                    `
                  : `
                      bg-white
                    `
          }
        `}
      >
        {/* ICON */}

        <Icon
          aria-hidden="true"
          strokeWidth={2}
          className={`
            h-[19px]
            w-[19px]

            shrink-0

            sm:h-5
            sm:w-5

            lg:h-[21px]
            lg:w-[21px]

            ${
              isPrimary
                ? "text-white"
                : "text-[#EC1C40]"
            }
          `}
        />

        {/* LABEL */}

        <p
          className={`
            mt-2

            max-w-[125px]

            text-[8px]
            font-bold
            uppercase
            leading-[1.25]

            tracking-[0.09em]

            sm:text-[8.5px]

            lg:text-[9px]

            ${
              isPrimary
                ? "text-white/70"
                : "text-black/40"
            }
          `}
        >
          {label}
        </p>

        {/* VALUE */}

        <p
          className={`
            mt-1

            max-w-[138px]

            text-[11px]
            font-semibold
            leading-[1.32]

            tracking-[-0.015em]

            sm:text-[11.5px]

            lg:text-[12px]

            xl:text-[12.5px]

            ${
              isPrimary
                ? "text-white"
                : "text-black"
            }
          `}
        >
          {value}
        </p>
      </div>
    </article>
  );
}

/* ============================================================
   DECORATIVE HEXAGON
============================================================ */

function DecorativeHexagon({
  className = "",
  accent = false,
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none
        absolute

        aspect-[1.12/1]

        ${
          accent
            ? "bg-[#EC1C40]/5"
            : "bg-black/[0.035]"
        }

        [clip-path:polygon(
          25%_6.7%,
          75%_6.7%,
          100%_50%,
          75%_93.3%,
          25%_93.3%,
          0_50%
        )]

        ${className}
      `}
    />
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function DholeraGlance() {
  /* =========================================================
     MOBILE ROWS

     2 / 1 / 2 / 1 / 2 / 1 / 2
  ========================================================== */

  const mobileRows = [
    [0, 1],
    [2],
    [3, 4],
    [5],
    [6, 7],
    [8],
    [9, 10],
  ];

  /* =========================================================
     TABLET ROWS

     3 / 2 / 3 / 2 / 1
  ========================================================== */

  const tabletRows = [
    [0, 1, 2],
    [3, 4],
    [5, 6, 7],
    [8, 9],
    [10],
  ];

  return (
    <section
      aria-labelledby="dholera-glance-heading"
      className="
        relative

        w-full
        overflow-hidden

        bg-white

        px-4
        py-10

        min-[414px]:px-5

        sm:px-6
        sm:py-12

        md:px-8

        lg:px-10
        lg:py-14
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-20
          top-14

          hidden

          h-[220px]
          w-[220px]

          rounded-full

          bg-[#EC1C40]/[0.025]

          blur-[90px]

          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-20
          bottom-10

          hidden

          h-[200px]
          w-[200px]

          rounded-full

          bg-black/[0.018]

          blur-[90px]

          lg:block
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ===================================================
            HEADING
        ==================================================== */}

        <header>
          <h2
            id="dholera-glance-heading"
            className="
              text-[28px]
              font-bold
              leading-[1.12]

              tracking-[-0.035em]

              text-black

              sm:text-[31px]

              md:text-[34px]

              lg:text-[38px]

              xl:text-[40px]
            "
          >
            Dholera SIR{" "}
            <span className="text-[#EC1C40]">
              at a Glance
            </span>
          </h2>
        </header>

        {/* ===================================================
            PHONE

            Pattern:

            ●     ●
               ●
            ●     ●
               ●
            ●     ●
               ●
            ●     ●
        ==================================================== */}

        <div
          className="
            relative

            mx-auto
            mt-9

            w-full
            max-w-[370px]

            pb-5

            md:hidden
          "
        >
          {/* Small decorative cells */}

          <DecorativeHexagon
            className="
              -right-3
              top-[15%]

              w-[38px]
            "
            accent
          />

          <DecorativeHexagon
            className="
              -left-2
              bottom-[10%]

              w-[34px]
            "
          />

          {mobileRows.map(
            (row, rowIndex) => (
              <div
                key={rowIndex}
                className={`
                  relative

                  flex
                  items-center
                  justify-center

                  ${
                    row.length === 2
                      ? "gap-2 min-[390px]:gap-3"
                      : ""
                  }

                  ${
                    rowIndex > 0
                      ? "-mt-[22px] min-[390px]:-mt-[24px]"
                      : ""
                  }
                `}
              >
                {row.map((itemIndex) => (
                  <GlanceHexagon
                    key={
                      glanceItems[itemIndex].label
                    }
                    item={
                      glanceItems[itemIndex]
                    }
                    size="mobile"
                  />
                ))}
              </div>
            ),
          )}
        </div>

        {/* ===================================================
            TABLET

            Pattern:

              ●   ●   ●
                ●   ●
              ●   ●   ●
                ●   ●
                  ●
        ==================================================== */}

        <div
          className="
            relative

            mx-auto
            mt-10

            hidden
            w-full
            max-w-[640px]

            pb-4

            md:block
            lg:hidden
          "
        >
          <DecorativeHexagon
            className="
              right-2
              top-[18%]

              w-[48px]
            "
            accent
          />

          <DecorativeHexagon
            className="
              left-2
              bottom-[8%]

              w-[42px]
            "
          />

          {tabletRows.map(
            (row, rowIndex) => (
              <div
                key={rowIndex}
                className={`
                  relative

                  flex
                  items-center
                  justify-center

                  gap-2

                  ${
                    rowIndex > 0
                      ? "-mt-[30px]"
                      : ""
                  }
                `}
              >
                {row.map((itemIndex) => (
                  <GlanceHexagon
                    key={
                      glanceItems[itemIndex].label
                    }
                    item={
                      glanceItems[itemIndex]
                    }
                    size="tablet"
                  />
                ))}
              </div>
            ),
          )}
        </div>

        {/* ===================================================
            DESKTOP

            True 6 + 5 honeycomb:

               ●  ●  ●  ●  ●  ●
                 ●  ●  ●  ●  ●

            Because both rows use equal-width hexagons and
            are independently centered, the second row
            automatically sits halfway between the first row.
        ==================================================== */}

        <div
          className="
            relative

            mx-auto
            mt-10

            hidden

            w-full
            max-w-[1100px]

            pb-8

            lg:block
          "
        >
          {/* =================================================
              DECORATIVE SUPPORT HEXAGONS
          ================================================== */}

          <DecorativeHexagon
            className="
              -left-1
              top-[18%]

              w-[50px]

              xl:-left-8
              xl:w-[58px]
            "
          />

          <DecorativeHexagon
            className="
              -right-1
              top-[5%]

              w-[58px]

              xl:-right-8
              xl:w-[66px]
            "
            accent
          />

          <DecorativeHexagon
            className="
              -bottom-1
              left-[7%]

              w-[42px]
            "
          />

          <DecorativeHexagon
            className="
              -bottom-1
              right-[7%]

              w-[38px]
            "
            accent
          />

          {/* =================================================
              FIRST ROW — 6 ITEMS
          ================================================== */}

          <div
            className="
              relative
              z-10

              flex

              items-center
              justify-center

              gap-1

              xl:gap-2
            "
          >
            {glanceItems
              .slice(0, 6)
              .map((item) => (
                <GlanceHexagon
                  key={item.label}
                  item={item}
                  size="desktop"
                />
              ))}
          </div>

          {/* =================================================
              SECOND ROW — 5 ITEMS

              Reduced negative margin:
              enough to interlock,
              not enough to collide with row one.
          ================================================== */}

          <div
            className="
              relative
              z-20

              -mt-[30px]

              flex

              items-center
              justify-center

              gap-1

              xl:-mt-[32px]
              xl:gap-2
            "
          >
            {glanceItems
              .slice(6)
              .map((item) => (
                <GlanceHexagon
                  key={item.label}
                  item={item}
                  size="desktop"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}