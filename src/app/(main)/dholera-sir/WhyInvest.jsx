import {
  Building2,
  Factory,
  MapPinned,
  Sparkles,
} from "lucide-react";

const reasons = [
  {
    icon: MapPinned,
    title: "Strategic Location",
    description:
      "Dholera enjoys a highly strategic location in Gujarat, making it one of the most promising emerging investment destinations in India. Its planned connectivity with Ahmedabad and other major industrial corridors increases its importance for business, logistics, trade, and future urban growth. With road, airport, sea port, and railway connectivity, Dholera is being seen as a gateway for long-term development and economic expansion.",
  },
  {
    icon: Building2,
    title: "India's First Planned Greenfield Smart City",
    description:
      "Dholera is India's first planned greenfield smart city, developing with a modern vision from scratch. Unlike other cities that expand in an unstructured way, Dholera is being designed with planned roads, utility networks, industrial zones, residential areas, and plug & play infrastructure. This planned development model creates strong potential for sustainable growth, better livability, and organized urban expansion.",
  },
  {
    icon: Factory,
    title: "Major Companies in Dholera",
    description:
      "Many big companies have invested in Dholera such as Tata Electronics, Tata Chemicals, ReNew, Polycab India, Jabil, and more. With investments exceeding ₹3 lakh crore, Dholera SIR is evolving into a long-term hub for advanced manufacturing, clean energy, and planned urban infrastructure.",
  },
  {
    icon: Sparkles,
    title: "Future-Ready Urban Vision",
    description:
      "Dholera is not just being developed as an industrial zone, but as a future-ready smart city built for the next generation. Its vision includes modern infrastructure, better mobility, efficient urban planning, integrated utilities, and a strong environment for business growth. This future-focused approach makes Dholera appealing to investors who want to be part of a location that is planned for tomorrow's economy, urban lifestyle, and industrial transformation.",
  },
];

export default function WhyInvestDholera() {
  return (
    <section
      aria-labelledby="why-invest-dholera-heading"
      className="
        relative
        w-full
        overflow-hidden

       

        bg-white

        px-4
        py-8
        pb-12

        text-[#39252E]

        selection:bg-[#E0A4B5]
        selection:text-[#39252E]

        min-[414px]:px-6
        min-[414px]:py-11

        sm:py-12

        md:px-8
        md:py-12

        lg:py-12
      "
    >
      {/* subtle background accents */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-0
          top-0

          h-56
          w-56

          bg-gradient-to-bl
          from-[#F7EBEF]/60
          to-transparent

          blur-3xl

          sm:h-72
          sm:w-72
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          bottom-0
          left-0

          h-48
          w-48

          bg-gradient-to-tr
          from-[#F3E7EC]/50
          to-transparent

          blur-3xl

          sm:h-64
          sm:w-64
        "
      />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <header
          className="
            mx-auto
            mb-8
            max-w-4xl

            text-left

            sm:mb-10

            md:text-center

            lg:mb-12
          "
        >
          <div
            aria-hidden="true"
            className="
              mb-4

              h-[3px]
              w-12

              rounded-full

              bg-gradient-to-r
              from-[#8F2946]
              via-[#B95672]
              to-[#E0A4B5]

              md:mx-auto
            "
          />

          <h2
            id="why-invest-dholera-heading"
            className="
              text-[clamp(1.75rem,2.6vw,2.5rem)]

              font-semibold
              leading-[1.2]

              tracking-[-0.025em]

              text-[#39252E]
            "
          >
            Why Invest in{" "}
            <span className="text-[#8F2946]">
              Dholera?
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-3xl

              text-[15px]
              font-normal
              leading-7

              text-[#68565E]

              sm:mt-5
              sm:text-[16px]

              md:mx-auto

              lg:text-[17px]
              lg:leading-8
            "
          >
            Investing in Dholera attracts attention because the city is being
            built around long-term infrastructure, industrial growth, and
            strategic connectivity. It is not just a land story; it is an
            infrastructure-led development story. Here are the strongest reasons
            why Dholera investment stands out:
          </p>
        </header>

        {/* ===================================================
            CARDS
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1

            gap-4

            md:grid-cols-2
            md:gap-5

            lg:gap-6
          "
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.title}
                className="
                  group
                  relative

                  min-w-0
                  overflow-hidden

                  rounded-2xl

                  border
                  border-[#EAD9DF]

                  bg-white

                  p-5

                  shadow-[0_8px_28px_rgba(57,37,46,0.045)]

                  transition-[transform,border-color,box-shadow]
                  duration-300
                  ease-out

                  hover:-translate-y-1
                  hover:border-[#DCA9B8]
                  hover:shadow-[0_18px_42px_rgba(143,41,70,0.10)]

                  sm:p-6

                  lg:p-7

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                {/* top accent */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    top-0

                    h-[3px]

                    origin-left
                    scale-x-[0.22]

                    bg-gradient-to-r
                    from-[#8F2946]
                    via-[#B95672]
                    to-[#E0A4B5]

                    transition-transform
                    duration-500
                    ease-out

                    group-hover:scale-x-100

                    motion-reduce:transition-none
                  "
                />

                {/* icon + title */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-[#E0A4B5]/55

                      bg-gradient-to-br
                      from-[#F7EBEF]
                      to-[#FFF9FB]

                      text-[#8F2946]

                      shadow-[0_5px_14px_rgba(143,41,70,0.06)]

                      transition-[transform,box-shadow,background-color]
                      duration-300

                      group-hover:-translate-y-0.5
                      group-hover:bg-[#F7EBEF]
                      group-hover:shadow-[0_8px_18px_rgba(143,41,70,0.10)]

                      sm:h-12
                      sm:w-12

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className="
                        h-[21px]
                        w-[21px]

                        sm:h-[23px]
                        sm:w-[23px]
                      "
                    />
                  </div>

                  <h3
                    className="
                      min-w-0
                      flex-1

                      text-[18px]
                      font-semibold
                      leading-[1.35]

                      tracking-[-0.015em]

                      text-[#39252E]

                      sm:text-[19px]

                      lg:text-[20px]
                    "
                  >
                    {reason.title}
                  </h3>
                </div>

                {/* description */}
                <p
                  className="
                    mt-4

                    text-[15px]
                    font-normal
                    leading-7

                    text-[#68565E]

                    sm:text-[16px]
                    sm:leading-[1.75]
                  "
                >
                  {reason.description}
                </p>

                {/* bottom subtle accent */}
                <div
                  aria-hidden="true"
                  className="
                    mt-5

                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-px
                      w-7

                      bg-[#8F2946]/50

                      transition-[width,background-color]
                      duration-300

                      group-hover:w-12
                      group-hover:bg-[#8F2946]

                      motion-reduce:transition-none
                    "
                  />

                  <span
                    className="
                      h-1
                      w-1

                      rounded-full

                      bg-[#E0A4B5]
                    "
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}