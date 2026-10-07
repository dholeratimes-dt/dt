import Image from "next/image";

import {
  Building2,
  CheckCircle2,
  Eye,
  FileText,
  MapPin,
  Newspaper,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import hero from "@/assets/AboutUsHero.webp";
import ConnectedFocusGraphic from "./connect";
import CommonFAQ from "../components/Common/Faq";

/* ============================================================
   SEO METADATA
============================================================ */

export const metadata = {
  title: {
    absolute:
      "About Dholera Times | Dholera Smart City News & Insights",
  },

  description:
    "Learn about Dholera Times, a Dholera-focused platform covering Dholera Smart City news, development updates, infrastructure, industries and investment insights.",

  keywords: [
    "Dholera Times",
    "Dholera Smart City news",
    "Dholera news",
    "Dholera latest updates",
    "Dholera SIR updates",
    "Dholera development",
    "Dholera investment insights",
  ],

  alternates: {
    canonical:
      "https://www.dholeratimes.com/about",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "About Dholera Times | Dholera Smart City News & Insights",

    description:
      "Learn about Dholera Times, a Dholera-focused platform covering Dholera Smart City news, development updates, infrastructure, industries and investment insights.",

    url:
      "https://www.dholeratimes.com/about",

    siteName:
      "Dholera Times",

    type:
      "website",
  },

  twitter: {
    card:
      "summary",

    title:
      "About Dholera Times | Dholera Smart City News & Insights",

    description:
      "Learn about Dholera Times, a Dholera-focused platform covering Dholera Smart City news, development updates, infrastructure, industries and investment insights.",
  },
};

/* ============================================================
   PAGE DATA
============================================================ */

const focusItems = [
  {
    title:
      "Focused on Dholera",
    icon:
      MapPin,
  },
  {
    title:
      "On Ground Team",
    icon:
      Users,
  },
  {
    title:
      "Source Backed Information",
    icon:
      ShieldCheck,
  },
  {
    title:
      "Investment Insights",
    icon:
      TrendingUp,
  },
  {
    title:
      "Residential Plot",
    icon:
      Building2,
  },
  {
    title:
      "End-to-End Buyer Support",
    icon:
      CheckCircle2,
  },
];


const whatWeDoItems = [
  {
    title:
      "Dholera News & Updates",

    description:
      "Important announcements, project milestones and the latest developments from across Dholera.",

    icon:
      Newspaper,
  },
  {
    title:
      "Infrastructure Development",

    description:
      "Updates on Dholera Airport, road and rail connectivity, utilities and major infrastructure projects.",

    icon:
      Building2,
  },
  {
    title:
      "Industries & Companies",

    description:
      "Coverage of semiconductors, manufacturing, renewable energy and companies investing or expanding in Dholera.",

    icon:
      Building2,
  },
  {
    title:
      "Investment Insights",

    description:
      "Practical information on Dholera's property market, land prices, locations, development trends and investment considerations.",

    icon:
      TrendingUp,
  },
  {
    title:
      "Dholera Real Estate",

    description:
      "Information on residential plots, bulk land and selected property opportunities in the Dholera region.",

    icon:
      Building2,
  },
];

const promiseItems = [
  "Deliver verified updates you can trust.",
  "Provide transparent guidance with no hidden agendas.",
  "Keep you informed with real-time growth insights.",
  "Stand as your long-term partner in every investment decision.",
];

const investItems = [
  {
    title:
      "Local Dholera Knowledge",

    description:
      "Our focus on Dholera gives our team practical knowledge of locations, projects, infrastructure and ongoing development.",

    icon:
      MapPin,
  },
  {
    title:
      "On Ground Team",

    description:
      "Our local presence helps buyers understand the actual project location and surrounding development instead of relying only on brochures.",

    icon:
      Users,
  },
  {
    title:
      "Multiple Plot Options",

    description:
      "Compare residential plot options based on location, size, price and individual requirements.",

    icon:
      Building2,
  },
  {
    title:
      "Documentation Support",

    description:
      "We help buyers understand relevant project and property documentation before proceeding.",

    icon:
      FileText,
  },
  {
    title:
      "Site Visit Assistance",

    description:
      "Visit shortlisted projects and understand the location before making your property decision.",

    icon:
      MapPin,
  },
  {
    title:
      "End-to-End Buyer Support",

    description:
      "Our team assists through the selection, documentation and purchase process.",

    icon:
      CheckCircle2,
  },
];

const faqItems = [
  {
    question:
      "What is Dholera Times?",

    answer:
      "Dholera Times is a Dholera-focused platform covering Dholera Smart City news, development updates, investment insights and residential property opportunities.",
  },
  {
    question:
      "Does Dholera Times provide residential plots in Dholera?",

    answer:
      "Yes. Dholera Times helps buyers explore selected residential plots in the Dholera region, with support for project comparison, site visits, documentation and the buying process.",
  },
  {
    question:
      "What type of Dholera news does Dholera Times cover?",

    answer:
      "Dholera Times covers Dholera SIR updates, infrastructure, industries, government announcements, semiconductor developments, property trends and investment-related news.",
  },
  {
    question:
      "Can Dholera Times arrange a site visit for property buyers?",

    answer:
      "Yes. Our team can assist with site visits in Dholera so buyers can understand the project location, surrounding development and connectivity before making a decision.",
  },
  {
    question:
      "Why should I follow Dholera Times?",

    answer:
      "Dholera Times combines source-backed information, on-ground coverage, Dholera-focused reporting and practical property insights in one place.",
  },
];

/* ============================================================
   FAQ SCHEMA
============================================================ */

const faqSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "FAQPage",

  mainEntity:
    faqItems.map(
      ({
        question,
        answer,
      }) => ({
        "@type":
          "Question",

        name:
          question,

        acceptedAnswer: {
          "@type":
            "Answer",

          text:
            answer,
        },
      }),
    ),
};

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  title,
  accent,
  description,
  center = false,
}) {
  return (
    <header
      className={
        center
          ? "mx-auto max-w-4xl text-center"
          : "max-w-4xl"
      }
    >
      <h2
        className="
          text-[28px]
          font-bold
          leading-[1.15]

          tracking-[-0.03em]

          text-black

          sm:text-[32px]

          md:text-[36px]

          lg:text-[40px]
        "
      >
        {title}{" "}

        {accent && (
          <span
            className="
              text-[#EC1C40]
            "
          >
            {accent}
          </span>
        )}
      </h2>

      {description && (
        <p
          className="
            mt-4

            text-[15px]
            leading-7

            text-black/65

            sm:text-[16px]

            md:text-[17px]
          "
        >
          {description}
        </p>
      )}
    </header>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function AboutPage() {
  return (
    <>
      {/* =====================================================
          FAQ STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqSchema,
            ),
        }}
      />

      <main
        className="
          overflow-hidden

          bg-white

          text-black

          selection:bg-[#EC1C40]
          selection:text-white
        "
      >
        {/* ===================================================
            TOP BANNER

            Controlled banner height so the image does not
            occupy the complete viewport.

            Phone:   210 - 260px
            Tablet:  300px
            Desktop: 330 - 360px
        ==================================================== */}

        <section
          aria-label="About Dholera Times"
          className="
            relative
            w-full
            overflow-hidden
            bg-white
          "
        >
          <Image
            src={hero}
            alt="About Dholera Times"
            priority
            quality={95}
            sizes="100vw"
            className="
              block
              h-auto
              w-full
              max-w-none
              object-contain
            "
          />
        </section>

        {/* ===================================================
            ABOUT HERO
        ==================================================== */}

        <section
          className="
            relative
            overflow-hidden

            bg-white

            px-4
            pt-8
            pb-2

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-12

            lg:px-10
            lg:pt-10
            lg:pb-2
          "
        >

          {/* =====================================================
              CONTENT CONTAINER
          ====================================================== */}

          <div
            className="
              relative
              z-10

              mx-auto
              w-full
              max-w-7xl
            "
          >
            <div
              className="
                grid
                grid-cols-1

                gap-12

                lg:grid-cols-[minmax(0,1.02fr)_minmax(470px,0.98fr)]
                lg:items-center
                lg:gap-14

                xl:grid-cols-[minmax(0,1.05fr)_minmax(520px,0.95fr)]
                xl:gap-20
              "
            >
              {/* =================================================
                  LEFT CONTENT
              ================================================== */}

              <div className="max-w-4xl">
                <h1
                  className="
                    text-[38px]
                    font-bold
                    leading-[1.05]

                    tracking-[-0.045em]

                    text-black

                    min-[414px]:text-[42px]

                    sm:text-[48px]

                    md:text-[56px]

                    lg:text-[58px]

                    xl:text-[64px]
                  "
                >
                  About{" "}
                  <span className="text-[#EC1C40]">
                    Dholera Times
                  </span>
                </h1>

                <p
                  className="
                    mt-6

                    max-w-3xl

                    text-[16px]
                    leading-8

                    text-black/65

                    sm:text-[17px]

                    lg:text-[18px]
                    lg:leading-8
                  "
                >
                  Dholera Times is a dedicated platform for
                  Dholera Smart City news, development
                  updates, investment insights and investment
                  opportunities.
                </p>
              </div>

              {/* =================================================
                  RIGHT — STEPPED PYRAMID INFOGRAPHIC
              ================================================== */}

              <div
                className="
                  relative

                  mx-auto
                  w-full
                  max-w-[620px]
                  lg:ml-auto
                  lg:mr-0
                "
              >
                {/* ===============================================
                    VERY SUBTLE BACKGROUND SHAPE
                ================================================ */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-1/2
                    top-1/2

                    h-[82%]
                    w-[88%]

                    -translate-x-1/2
                    -translate-y-1/2

                    bg-[#EC1C40]/[0.025]

                    blur-[70px]
                  "
                />

                  <ConnectedFocusGraphic />

              </div>
            </div>
          </div>
        </section>
        {/* ===================================================
            WHAT WE DO
        ==================================================== */}

        <section
          className="
            bg-black/[0.025]

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-10

            lg:px-10
            lg:py-10
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            <SectionHeading
              title="What"
              accent="We Do"
              description="Dholera is developing across multiple sectors, and important information often comes from different sources. Dholera Times brings these developments together in one place."
            />

            <div
              className="
                mt-8

                grid
                grid-cols-1

                gap-4

                md:grid-cols-2

                lg:grid-cols-6
              "
            >
              {whatWeDoItems.map(
                (
                  {
                    title,
                    description,
                    icon: Icon,
                  },
                  index,
                ) => (
                  <article
                    key={
                      title
                    }
                    className={`
                      group

                      relative

                      overflow-hidden

                      rounded-[22px]

                      border
                      border-black/10

                      bg-white

                      p-5

                      shadow-[0_14px_40px_-34px_rgba(0,0,0,0.3)]

                      transition-[border-color,box-shadow,transform]
                      duration-300

                      md:hover:-translate-y-1
                      md:hover:border-[#EC1C40]/30
                      md:hover:shadow-[0_22px_50px_-35px_rgba(0,0,0,0.38)]

                      sm:p-6

                      ${
                        index <
                        3
                          ? "lg:col-span-2"
                          : "lg:col-span-3"
                      }

                      motion-reduce:transform-none
                    `}
                  >
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-x-0
                        top-0

                        h-[3px]

                        origin-left
                        scale-x-0

                        bg-[#EC1C40]

                        transition-transform
                        duration-300

                        group-hover:scale-x-100
                      "
                    />

                    <span
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-xl

                        bg-[#EC1C40]/10
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          h-5
                          w-5

                          stroke-[#EC1C40]
                        "
                        strokeWidth={
                          2
                        }
                      />
                    </span>

                    <h3
                      className="
                        mt-5

                        text-[18px]
                        font-bold
                        leading-6

                        tracking-[-0.015em]

                        text-black

                        sm:text-[19px]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-3

                        text-[14px]
                        leading-6

                        text-black/60

                        sm:text-[15px]
                        sm:leading-7
                      "
                    >
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            MISSION / VISION
        ==================================================== */}
        <section
          className="
            bg-white

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

            lg:px-10
            lg:py-12
          "
        >
          <div
            className="
              mx-auto

              grid
              w-full
              max-w-7xl

              grid-cols-1

              gap-5

              lg:grid-cols-2
              lg:gap-6
            "
          >
            {/* =====================================================
                MISSION
            ====================================================== */}

            <article
              className="
                relative

                overflow-hidden

                rounded-[24px]

                border
                border-black/10

                bg-white

                p-6

                shadow-[0_18px_52px_-40px_rgba(0,0,0,0.4)]

                sm:p-8

                lg:p-10
              "
            >
              {/* =================================================
                  ICON + TITLE
              ================================================== */}

              <div
                className="
                  flex
                  items-center

                  gap-4

                  sm:gap-5
                "
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

                    rounded-xl

                    border
                    border-[#EC1C40]/10

                    bg-[#EC1C40]/10
                  "
                >
                  <Target
                    aria-hidden="true"
                    className="
                      h-5
                      w-5

                      stroke-[#EC1C40]
                    "
                    strokeWidth={2}
                  />
                </span>

                {/* TITLE */}

                <h2
                  className="
                    min-w-0

                    text-[26px]
                    font-bold
                    leading-[1.2]

                    tracking-[-0.03em]

                    text-black

                    sm:text-[30px]

                    lg:text-[32px]
                  "
                >
                  Our{" "}
                  <span className="text-[#EC1C40]">
                    Mission
                  </span>
                </h2>
              </div>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  my-6

                  h-px
                  w-full

                  bg-black/10
                "
              />

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  text-[15px]
                  font-normal
                  leading-7

                  text-black/65

                  sm:text-[16px]
                  sm:leading-8
                "
              >
                To make Dholera easier to understand,
                explore and invest in by bringing together
                reliable information, on-ground updates
                and property opportunities on one
                dedicated platform.
              </p>
            </article>

            {/* =====================================================
                VISION
            ====================================================== */}

            <article
              className="
                relative

                overflow-hidden

                rounded-[24px]

                border
                border-black/10

                bg-white

                p-6

                shadow-[0_18px_52px_-40px_rgba(0,0,0,0.4)]

                sm:p-8

                lg:p-10
              "
            >
              {/* =================================================
                  ICON + TITLE
              ================================================== */}

              <div
                className="
                  flex
                  items-center

                  gap-4

                  sm:gap-5
                "
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

                    rounded-xl

                    border
                    border-[#EC1C40]/10

                    bg-[#EC1C40]/10
                  "
                >
                  <Eye
                    aria-hidden="true"
                    className="
                      h-5
                      w-5

                      stroke-[#EC1C40]
                    "
                    strokeWidth={2}
                  />
                </span>

                {/* TITLE */}

                <h2
                  className="
                    min-w-0

                    text-[26px]
                    font-bold
                    leading-[1.2]

                    tracking-[-0.03em]

                    text-black

                    sm:text-[30px]

                    lg:text-[32px]
                  "
                >
                  Our{" "}
                  <span className="text-[#EC1C40]">
                    Vision
                  </span>
                </h2>
              </div>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  my-6

                  h-px
                  w-full

                  bg-black/10
                "
              />

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  text-[15px]
                  font-normal
                  leading-7

                  text-black/65

                  sm:text-[16px]
                  sm:leading-8
                "
              >
                To build Dholera Times into a leading
                destination for anyone researching Dholera
                Smart City, Dholera SIR, investment
                opportunities or residential property in
                the Dholera region.
              </p>
            </article>
          </div>
        </section>    
                
        
        {/* ===================================================
                  OUR PROMISE
        ==================================================== */}
        <section
          aria-labelledby="our-promise-heading"
          className="
            w-full


            bg-black/[0.025]

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-10

            md:px-8
            md:py-10

            lg:px-10
            lg:py-10
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            <div
              className="
                grid
                grid-cols-1

                gap-7

                md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)]
                md:items-start
                md:gap-10

                lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)]
                lg:gap-12

                xl:grid-cols-[minmax(310px,0.78fr)_minmax(0,1.22fr)]
                xl:gap-14
              "
            >
              {/* =================================================
                  LEFT SIDE
              ================================================== */}

              <div
                className="
                  w-full

                  py-0

                  lg:grid
                  lg:h-full
                  lg:min-h-[340px]
                  lg:grid-rows-[30%_70%]
                "
              >
                <div
                  className="
                    text-left

                    lg:row-start-2
                    lg:self-start
                  "
                >
                  <h2
                    id="our-promise-heading"
                    className="
                      max-w-[340px]

                      text-left

                      text-[28px]
                      font-bold
                      leading-[1.1]

                      tracking-[-0.035em]

                      text-black

                      min-[414px]:text-[29px]

                      sm:text-[32px]

                      md:text-[34px]

                      lg:text-[38px]
                    "
                  >
                    Our{" "}
                    <span className="text-[#EC1C40]">
                      Promise
                    </span>
                  </h2>

                  <p
                    className="
                      mt-3

                      max-w-[420px]

                      text-left

                      text-[15px]
                      font-normal
                      leading-7

                      text-black/60

                      sm:mt-4
                      sm:text-[16px]
                    "
                  >
                    At Dholera Times, we promise to:
                  </p>
                </div>
              </div>
              {/* =================================================
                  RIGHT SIDE — PROMISE LIST
              ================================================== */}

              <div
                className="
                  min-w-0

                  border-t
                  border-black/10
                "
              >
                {promiseItems.map(
                  (item) => (
                    <article
                      key={item}
                      className="
                        group

                        grid
                        grid-cols-[40px_minmax(0,1fr)]

                        items-center

                        gap-4

                        border-b
                        border-black/10

                        py-4

                        min-[414px]:grid-cols-[42px_minmax(0,1fr)]

                        sm:gap-5
                        sm:py-5

                        lg:grid-cols-[44px_minmax(0,1fr)]
                        lg:gap-5
                        lg:py-[22px]
                      "
                    >
                      {/* =========================================
                          ICON
                      ========================================== */}

                      <span
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[#EC1C40]/5

                          text-[#EC1C40]

                          transition-[background-color,transform]
                          duration-300
                          ease-out

                          group-hover:scale-105
                          group-hover:bg-[#EC1C40]/10

                          sm:h-10
                          sm:w-10

                          motion-reduce:transform-none
                          motion-reduce:transition-none
                        "
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          strokeWidth={1.9}
                          className="
                            h-[18px]
                            w-[18px]

                            sm:h-[19px]
                            sm:w-[19px]
                          "
                        />
                      </span>

                      {/* =========================================
                          PROMISE TEXT
                      ========================================== */}

                      <p
                        className="
                          min-w-0

                          text-[15px]
                          font-semibold
                          leading-6

                          tracking-[-0.012em]

                          text-black/75

                          transition-colors
                          duration-200

                          group-hover:text-black

                          sm:text-[16px]
                          sm:leading-7

                          lg:text-[17px]
                        "
                      >
                        {item}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>    
        

        {/* ===================================================
            WHY INVEST THROUGH DHOLERA TIMES
        ==================================================== */}
        <section
          className="
            bg-white

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-12

            lg:px-10
            lg:py-10
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            <SectionHeading
              title="Why Invest in Dholera Through"
              accent="Dholera Times?"
            />

            <div
              className="
                mt-8

                grid
                grid-cols-1

                gap-4

                sm:grid-cols-2

                lg:grid-cols-3
              "
            >
              {investItems.map(
                (
                  {
                    title,
                    description,
                    icon: Icon,
                  },
                  index,
                ) => (
                  <article
                    key={title}
                    className="
                      group

                      relative

                      overflow-hidden

                      rounded-[22px]

                      border
                      border-black/10

                      bg-white

                      p-5

                      shadow-[0_12px_38px_-32px_rgba(0,0,0,0.3)]

                      transition-[border-color,transform,box-shadow]
                      duration-300
                      ease-out

                      md:hover:-translate-y-1
                      md:hover:border-[#EC1C40]/30
                      md:hover:shadow-[0_20px_46px_-34px_rgba(0,0,0,0.4)]

                      sm:p-6

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  >
                    {/* ===============================================
                        ICON + TITLE + NUMBER
                    ================================================ */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between

                        gap-4
                      "
                    >
                      {/* ICON + TITLE */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1

                          items-center

                          gap-3.5

                          sm:gap-4
                        "
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

                            rounded-xl

                            border
                            border-[#EC1C40]/10

                            bg-[#EC1C40]/10
                          "
                        >
                          <Icon
                            aria-hidden="true"
                            className="
                              h-5
                              w-5

                              stroke-[#EC1C40]
                            "
                            strokeWidth={2}
                          />
                        </span>

                        {/* TITLE */}

                        <h3
                          className="
                            min-w-0

                            text-[17px]
                            font-bold
                            leading-[1.4]

                            tracking-[-0.015em]

                            text-black

                            sm:text-[18px]
                          "
                        >
                          {title}
                        </h3>
                      </div>
                    </div>

                    {/* ===============================================
                        DIVIDER
                    ================================================ */}

                    <div
                      aria-hidden="true"
                      className="
                        my-5

                        h-px
                        w-full

                        bg-black/10
                      "
                    />

                    {/* ===============================================
                        DESCRIPTION
                    ================================================ */}

                    <p
                      className="
                        text-[14px]
                        font-normal
                        leading-6

                        text-black/60

                        sm:text-[15px]
                        sm:leading-7
                      "
                    >
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>


        {/* ===================================================
            FAQ
        ==================================================== */}
        <CommonFAQ 
          faqItems={faqItems}
        />
      </main>
    </>
  );
}