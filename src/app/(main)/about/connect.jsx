import { MapPin, ShieldCheck, Users } from "lucide-react";

/* ============================================================
   CONTENT
============================================================ */

const focusItems = [
  {
    number: "01",
    title: "Focused on Dholera",
    icon: MapPin,
  },
  {
    number: "02",
    title: "End to End Buyer Support",
    icon: Users,
  },
  {
    number: "03",
    title: "Source Backed Information",
    icon: ShieldCheck,
  },
];

/* ============================================================
   ITEM CONTENT
============================================================ */

function ItemContent({ item, variant = "light" }) {
  const Icon = item.icon;

  const isLight = variant === "light";

  const isAccent = variant === "accent";

  return (
    <div
      className="
        relative
        z-20

        grid
        h-full

        grid-cols-[58px_minmax(0,1fr)]

        items-center

        gap-3

        px-5
        py-4

        sm:grid-cols-[66px_minmax(0,1fr)]
        sm:gap-4
        sm:px-6
      "
    >
      {/* NUMBER */}

      <div
        className="
          flex
          min-w-0
          flex-col
          items-start
          justify-center
        "
      >
        <span
          className={`
            text-[34px]
            font-light
            leading-none

            tracking-[-0.065em]

            sm:text-[40px]

            ${isLight ? "text-[#EC1C40]" : "text-white"}
          `}
        >
          {item.number}
        </span>
      </div>

      {/* TITLE */}

      <div className="min-w-0">
        <div
          className="
            mb-2

            flex
            items-center

            gap-2.5
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.9}
            className={`
              h-[18px]
              w-[18px]

              shrink-0

              ${isLight ? "text-[#EC1C40]" : "text-white"}
            `}
          />
        </div>

        <h3
          className={`
            max-w-[220px]

            text-[15px]
            font-bold
            leading-[1.25]

            tracking-[-0.02em]

            sm:text-[16px]

            ${isLight ? "text-black" : "text-white"}
          `}
        >
          {item.title}
        </h3>
      </div>
    </div>
  );
}

/* ============================================================
   DESKTOP INFOGRAPHIC
============================================================ */

function DesktopGraphic() {
  return (
    <div
      className="
        relative

        mx-auto

        hidden

        h-[430px]
        w-full
        max-w-[650px]

        lg:block
      "
    >
      {/* =====================================================
          CENTRAL SPINE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute

          left-1/2
          top-[80px]

          z-[2]

          h-[294px]
          w-[3px]

          -translate-x-1/2

          rounded-full

          bg-black
        "
      />

      {/* =====================================================
          TOP CURVED CONNECTOR
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute

          left-1/2
          top-[71px]

          z-[1]

          h-[58px]
          w-[86px]

          border-l-[3px]
          border-t-[3px]
          border-black

          rounded-tl-[80px]
        "
      />

      {/* =====================================================
          ITEM 01 — TOP RIGHT / WHITE
      ====================================================== */}

      <article
        className="
          group

          absolute

          right-0
          top-0

          z-20

          h-[112px]
          w-[55%]

          overflow-hidden

          rounded-[26px]

          border
          border-black/10

          bg-white

          shadow-[0_12px_34px_rgba(0,0,0,0.09)]

          transition-[transform,box-shadow]
          duration-300
          ease-out

          hover:scale-[1.01]
          hover:shadow-[0_16px_38px_rgba(0,0,0,0.11)]

          motion-reduce:transform-none
          motion-reduce:transition-none
        "
      >
        {/* subtle connector extension */}

        <div
          aria-hidden="true"
          className="
            absolute

            -left-[18px]
            bottom-[8px]

            h-[28px]
            w-[40px]

            rounded-bl-[30px]

            bg-white
          "
        />

        <ItemContent item={focusItems[0]} variant="light" />
      </article>

      {/* =====================================================
          ITEM 02 — LEFT / ACCENT

          Fully filled red.
          White blank/cutout removed.
      ====================================================== */}

      <article
        className="
          group

          absolute

          left-0
          top-[82px]

          z-10

          h-[158px]
          w-[55%]

          overflow-hidden

          rounded-l-[30px]
          rounded-tr-[28px]

          bg-[#EC1C40]

          shadow-[0_14px_34px_rgba(236,28,64,0.14)]

          transition-[transform,box-shadow]
          duration-300
          ease-out

          hover:scale-[1.01]
          hover:shadow-[0_18px_40px_rgba(236,28,64,0.18)]

          motion-reduce:transform-none
          motion-reduce:transition-none
        "
      >
        <ItemContent item={focusItems[1]} variant="accent" />
      </article>

      {/* =====================================================
          ITEM 03 — RIGHT / BLACK

          Fully filled black.
          White blank/cutout removed.
      ====================================================== */}

      <article
        className="
          group

          absolute

          right-0
          top-[144px]

          z-20

          h-[132px]
          w-[55%]

          overflow-hidden

          rounded-r-[30px]
          rounded-tl-[24px]

          bg-black

          shadow-[0_14px_34px_rgba(0,0,0,0.12)]

          transition-[transform,box-shadow]
          duration-300
          ease-out

          hover:scale-[1.01]
          hover:shadow-[0_18px_42px_rgba(0,0,0,0.16)]

          motion-reduce:transform-none
          motion-reduce:transition-none
        "
      >
        <ItemContent item={focusItems[2]} variant="dark" />
      </article>

      {/* =====================================================
          SMALL JUNCTION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute

          left-1/2
          top-[142px]

          z-[3]

          h-[7px]
          w-[7px]

          -translate-x-1/2

          rounded-full

          bg-black
        "
      />

      {/* =====================================================
          TERMINAL DROP
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute

          bottom-[32px]
          left-1/2

          z-[3]

          h-[22px]
          w-[13px]

          -translate-x-1/2

          bg-black

          [clip-path:polygon(50%_0,100%_70%,82%_100%,18%_100%,0_70%)]
        "
      />
    </div>
  );
}

/* ============================================================
   MOBILE / TABLET INFOGRAPHIC
============================================================ */

function MobileGraphic() {
  return (
    <div
      className="
        relative

        mx-auto

        h-[520px]
        w-full
        max-w-[560px]

        lg:hidden
      "
    >
      {/* =====================================================
          CENTRAL SPINE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute

          left-1/2
          top-[80px]

          z-[2]

          h-[378px]
          w-[2px]

          -translate-x-1/2

          rounded-full

          bg-black
        "
      />

      {/* =====================================================
          ITEM 01
      ====================================================== */}

      <article
        className="
          absolute

          right-0
          top-0

          z-20

          min-h-[108px]
          w-[84%]

          overflow-hidden

          rounded-[24px]

          border
          border-black/10

          bg-white

          shadow-[0_10px_28px_rgba(0,0,0,0.08)]

          min-[430px]:w-[78%]

          sm:w-[72%]
        "
      >
        <ItemContent item={focusItems[0]} variant="light" />
      </article>

      {/* =====================================================
          ITEM 02

          Fully filled red.
          No white curved blank area.
      ====================================================== */}

      <article
        className="
          absolute

          left-0
          top-[128px]

          z-10

          min-h-[134px]
          w-[84%]

          overflow-hidden

          rounded-l-[26px]
          rounded-tr-[24px]

          bg-[#EC1C40]

          shadow-[0_12px_30px_rgba(236,28,64,0.14)]

          min-[430px]:w-[78%]

          sm:w-[72%]
        "
      >
        <ItemContent item={focusItems[1]} variant="accent" />
      </article>

      {/* =====================================================
          ITEM 03

          Fully filled black.
          No white curved blank area.
      ====================================================== */}

      <article
        className="
          absolute

          right-0
          top-[274px]

          z-20

          min-h-[126px]
          w-[84%]

          overflow-hidden

          rounded-r-[26px]
          rounded-tl-[22px]

          bg-black

          shadow-[0_12px_30px_rgba(0,0,0,0.12)]

          min-[430px]:w-[78%]

          sm:w-[72%]
        "
      >
        <ItemContent item={focusItems[2]} variant="dark" />
      </article>

      {/* =====================================================
          TERMINAL DROP
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute

          bottom-[28px]
          left-1/2

          z-[3]

          h-[20px]
          w-[12px]

          -translate-x-1/2

          bg-black

          [clip-path:polygon(50%_0,100%_70%,82%_100%,18%_100%,0_70%)]
        "
      />
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function ConnectedFocusGraphic() {
  return (
    <section
      aria-label="Dholera Times focus"
      className="
        relative

        w-full

        overflow-hidden

        bg-white

      "
    >
      <MobileGraphic />

      <DesktopGraphic />
    </section>
  );
}
