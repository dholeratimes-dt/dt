import Image from "next/image";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Globe,
  Landmark,
  Map,
  MapPin,
  Navigation,
  Scale,
  SearchCheck,
  ShieldCheck,
  Video,
  WalletCards,
} from "lucide-react";

import nri from "@/assets/nri-hero.webp";
import CommonFAQ from "../components/Common/Faq";

/* ============================================================
   SEO METADATA
============================================================ */

export const metadata = {
  title: {
    absolute:
      "NRI Investment in Dholera | Property Guide for NRIs",
  },

  description:
    "Explore NRI investment in Dholera, property rules, residential plots, documents, payment options, due diligence and advisory support from Dholera Times.",

  keywords: [
    "NRI investment in Dholera",
    "NRI property investment in Dholera",
    "Dholera investment for NRI",
    "NRI property in Dholera",
    "residential plots in Dholera for NRI",
    "Dholera Smart City investment",
    "NRI property investment in India",
  ],

  alternates: {
    canonical:
      "https://www.dholeratimes.com/nri-investment-guide-dholera",
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
      "NRI Investment in Dholera | Property Guide for NRIs",

    description:
      "Explore NRI investment in Dholera, property rules, residential plots, documents, payment options, due diligence and advisory support from Dholera Times.",

    url:
      "https://www.dholeratimes.com/nri-investment-guide-dholera",

    siteName: "Dholera Times",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "NRI Investment in Dholera | Property Guide for NRIs",

    description:
      "Explore NRI investment in Dholera, property rules, residential plots, documents, payment options, due diligence and advisory support from Dholera Times.",
  },
};

/* ============================================================
   DATA
============================================================ */

const nriInterestFactors = [
  "Dholera SIR development",
  "Ahmedabad-Dholera connectivity",
  "Dholera International Airport",
  "Semiconductor and industrial development",
  "Residential growth around Dholera",
  "Property prices and entry cost",
  "Long term development potential",
];

const paymentMethods = [
  {
    title: "Inward Remittance",
    description:
      "Inward remittance through banking channels",
    icon: Banknote,
  },
  {
    title: "NRE Account",
    description: "NRE account",
    icon: WalletCards,
  },
  {
    title: "NRO Account",
    description: "NRO account",
    icon: CircleDollarSign,
  },
  {
    title: "FCNR(B) Account",
    description:
      "FCNR(B) account, where applicable",
    icon: Landmark,
  },
];

const documents = [
  {
    title: "Property Title",
    description:
      "Confirm ownership and review the chain of title.",
    icon: FileCheck2,
  },
  {
    title: "Survey Number",
    description:
      "Verify the exact survey number and location of the land.",
    icon: MapPin,
  },
  {
    title: "Land Use",
    description:
      "Confirm whether the property is residential/non-agricultural and suitable for the proposed use.",
    icon: Map,
  },
  {
    title: "Project Approvals",
    description:
      "Review the relevant approvals and layout documents where applicable.",
    icon: ClipboardCheck,
  },
  {
    title: "Sale Documents",
    description:
      "Understand the agreement, payment schedule, possession terms and registration process.",
    icon: FileText,
  },
  {
    title: "Encumbrances",
    description:
      "Check whether there are existing charges, disputes or claims over the property.",
    icon: ShieldCheck,
  },
  // {
  //   title: "Location Verification",
  //   description:
  //     "Confirm whether the property is inside Dholera SIR, near Dholera SIR or elsewhere in the wider region.",
  //   icon: Navigation,
  // },
];

const remoteBuyingSteps = [
  {
    title: "Property Consultation",
    description:
      "Discuss your budget, investment horizon and preferred property type with our team.",
    icon: Globe,
  },
  {
    title: "Property Shortlisting",
    description:
      "Compare available residential plot options based on location, price and requirements.",
    icon: SearchCheck,
  },
  {
    title: "Video & Location Review",
    description:
      "Understand project locations through maps, videos, photographs and on-ground information.",
    icon: Video,
  },
  {
    title: "Documentation Support",
    description:
      "Receive relevant property information and documentation for review.",
    icon: FileCheck2,
  },
  {
    title: "Site Visit Assistance",
    description:
      "If you or a family member visits India, our team can arrange a guided Dholera site visit.",
    icon: MapPin,
  },
  {
    title: "Buying Process Support",
    description:
      "Our team can assist with coordination during the property selection, documentation and registration process.",
    icon: CheckCircle2,
  },
];

const evaluationFactors = [
  {
    title: "Location",
    description:
      "Where exactly is the property?",
    icon: MapPin,
  },
  {
    title: "SIR Proximity",
    description:
      "Is it inside Dholera SIR or near it?",
    icon: Navigation,
  },
  {
    title: "Infrastructure",
    description:
      "What existing and planned infrastructure serves the location?",
    icon: Building2,
  },
  {
    title: "Documentation",
    description:
      "Is the property's legal and approval documentation clear?",
    icon: FileCheck2,
  },
  {
    title: "Current Development",
    description:
      "What has actually been developed around the property today?",
    icon: Landmark,
  },
  {
    title: "Price",
    description:
      "How does the asking price compare with similar properties?",
    icon: CircleDollarSign,
  },
  {
    title: "Investment Horizon",
    description:
      "Dholera is a long-term development story. Consider how long you are prepared to hold the property.",
    icon: Globe,
  },
  {
    title: "Liquidity",
    description:
      "Land and plotted property may take time to resell. Do not assume immediate liquidity.",
    icon: WalletCards,
  },
];

const riskItems = [
  "Not all Dholera properties are inside Dholera SIR",
  "Infrastructure projects develop on different timelines",
  "Property prices can vary significantly by location",
  "Future appreciation cannot be guaranteed",
  "Documentation must be independently verified",
  "Agricultural land restrictions apply to NRIs/OCIs",
  "Emerging markets may have lower short-term liquidity",
  "Announced projects are not the same as completed projects",
];

const consultationItems = [
  "Understanding Dholera and Dholera SIR",
  "Comparing residential plot options",
  "Understanding locations",
  "Current pricing and availability",
  "Property documentation",
  "Infrastructure and development insights",
  "Site visits",
  "Remote coordination",
  "Property purchase support",
];

const whyChooseItems = [
  {
    title: "Dholera-Focused Expertise",
    description:
      "Our team follows Dholera Smart City, infrastructure, industries and the local property market.",
    icon: Landmark,
  },
  {
    title: "On-Ground Team",
    description:
      "We provide local observations, project information, photographs and site-visit support.",
    icon: MapPin,
  },
  {
    title: "Source-Backed Insights",
    description:
      "We track government announcements, project authorities and official company developments when evaluating Dholera's growth.",
    icon: SearchCheck,
  },
  {
    title: "Property Advisory Support",
    description:
      "We help buyers compare residential property opportunities based on their individual requirements.",
    icon: Building2,
  },
  {
    title: "Remote Assistance",
    description:
      "NRIs can research locations, projects and documents before planning a visit to India.",
    icon: Globe,
  },
  {
    title: "Clear Information",
    description:
      "We distinguish between completed, under-construction, approved, announced and proposed developments.",
    icon: CheckCircle2,
  },
];

const faqItems = [
  {
    question:
      "Can an NRI buy residential plots in Dholera?",
    answer:
      "Yes. NRIs and OCIs can generally purchase eligible residential and commercial property in India, including residential plots in the Dholera region, subject to FEMA and other applicable laws.",
  },
  {
    question:
      "Can NRIs buy agricultural land in Dholera?",
    answer:
      "NRIs and OCIs generally cannot purchase agricultural land, plantation property or farmhouses in India through a normal purchase transaction.",
  },
  {
    question:
      "Can an NRI buy property in Dholera without visiting India?",
    answer:
      "Many parts of the research and purchase process can be managed remotely. Depending on the transaction, a properly executed Power of Attorney may also be used for specific activities. Legal requirements should be checked before proceeding.",
  },
  {
    question:
      "How can an NRI pay for property in Dholera?",
    answer:
      "Eligible property purchases can generally be funded through permitted banking channels, including inward remittance or funds held in eligible NRE, NRO or FCNR(B) accounts.",
  },
  {
    question:
      "Is Dholera a good investment for NRIs?",
    answer:
      "Dholera has major infrastructure and industrial development activity, but the suitability of a particular investment depends on location, purchase price, legal status, development stage, liquidity, risk tolerance and investment horizon.",
  },
];

/* ============================================================
   FAQ SCHEMA
============================================================ */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,

    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* ============================================================
   SHARED SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  center = false,
}) {
  return (
    <header
      className={`
        ${
          center
            ? "mx-auto max-w-3xl text-center"
            : "max-w-4xl"
        }
      `}
    >
      {eyebrow && (
        <p
          className="
            mb-3

            text-[11px]
            font-bold
            uppercase
            leading-5

            tracking-[0.16em]

            text-[#EC1C40]

            sm:text-[12px]
          "
        >
          {eyebrow}
        </p>
      )}

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
          <span className="text-[#EC1C40]">
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

export default function NRIInvestmentGuide() {
  return (
    <>
      {/* =====================================================
          FAQ SCHEMA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main
        className="
          bg-white
          text-black

          selection:bg-[#EC1C40]
          selection:text-white
        "
      >
        {/* ===================================================
            HERO
        ==================================================== */}

        <section
          className="
            relative

            min-h-[610px]

            overflow-hidden

            bg-black

            sm:min-h-[620px]

            lg:min-h-[640px]
          "
        >
          {/* IMAGE */}

          <Image
            src={nri}
            alt="NRI investment in Dholera"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          {/* OVERLAY */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-black/65

              lg:bg-gradient-to-r
              lg:from-black/90
              lg:via-black/70
              lg:to-black/25
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              bottom-0

              h-40

              bg-gradient-to-t
              from-black/55
              to-transparent
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10

              mx-auto

              flex
              min-h-[610px]
              w-full
              max-w-7xl

              items-end

              px-4
              pb-10
              pt-24

              min-[414px]:px-5

              sm:min-h-[620px]
              sm:px-6
              sm:pb-12

              md:px-8

              lg:min-h-[640px]
              lg:items-center
              lg:px-10
              lg:pb-16
              lg:pt-24
            "
          >
            <div
              className="
                max-w-4xl
              "
            >

              <h1
                className="
                  max-w-4xl

                  text-[36px]
                  font-bold
                  leading-[1.08]

                  tracking-[-0.04em]

                  text-white

                  min-[414px]:text-[40px]

                  sm:text-[46px]

                  md:text-[54px]

                  lg:text-[62px]
                "
              >
                NRI Investment in Dholera:{" "}
                <span className="text-[#EC1C40]">
                  Property Guide for Overseas Indians
                </span>
              </h1>

              <div
                className="
                  mt-6

                  max-w-3xl

                  space-y-3

                  text-[15px]
                  leading-7

                  text-white/75

                  sm:text-[16px]

                  lg:text-[17px]
                  lg:leading-8
                "
              >
                <p>
                  Dholera Times helps NRIs understand
                  Dholera, compare residential property
                  options, verify important information and
                  manage the buying process with support
                  from our on ground team.
                </p>

                <p>
                  From Dholera SIR development and
                  infrastructure to property locations,
                  pricing, documentation and site visits,
                  our aim is to help you make a more
                  informed decision before investing.
                </p>
              </div>

              <div
                className="
                  mt-7

                  flex
                  flex-col

                  gap-3

                  min-[480px]:flex-row
                "
              >
                <Link
                  href="/contact/inquiry"
                  className="
                    inline-flex

                    min-h-[52px]

                    items-center
                    justify-center

                    gap-2

                    rounded-xl

                    bg-[#EC1C40]

                    px-6
                    py-3

                    text-[15px]
                    font-semibold

                    text-white

                    shadow-[0_12px_30px_-15px_rgba(236,28,64,0.8)]

                    transition-[background-color,transform,box-shadow]
                    duration-200

                    hover:-translate-y-0.5
                    hover:bg-[#d81839]
                    hover:shadow-[0_16px_34px_-16px_rgba(236,28,64,0.9)]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black

                    motion-reduce:transform-none
                  "
                >
                  Talk to a Dholera Expert

                  <ArrowRight
                    size={18}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            QUICK NAVIGATION
        ==================================================== */}

        <div
          className="
            sticky
            top-0
            z-30

            hidden

            border-b
            border-black/10

            bg-white/95

            backdrop-blur-xl

            lg:block
          "
        >
          <nav
            aria-label="NRI investment guide sections"
            className="
              mx-auto

              flex
              min-h-[64px]
              w-full
              max-w-7xl

              items-center

              gap-1

              overflow-x-auto

              px-10
            "
          >
            {[
              ["#can-nri-buy", "Property Rules"],
              ["#why-dholera", "Why Dholera"],
              ["#payments", "Payments"],
              ["#documents", "Documents"],
              ["#buying-abroad", "Buying Abroad"],
              ["#risks", "Risks"],
              ["#consultation", "NRI Consultation"],
              ["#faqs", "FAQs"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="
                  inline-flex
                  min-h-[42px]

                  shrink-0

                  items-center

                  rounded-lg

                  px-3.5

                  text-[13px]
                  font-semibold

                  text-black/60

                  transition-[background-color,color]
                  duration-200

                  hover:bg-[#EC1C40]/5
                  hover:text-[#EC1C40]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]
                "
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* ===================================================
            CAN NRIs BUY PROPERTY
        ==================================================== */}
        <section
          id="can-nri-buy"
          className="
            scroll-mt-24
            border-b
            border-black/10
            bg-white

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-20
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
              eyebrow="Property Rules"
              title="Can NRIs Buy Property"
              accent="in Dholera?"
            />

            <div
              className="
                mt-6
                w-full

                space-y-4

                text-[15px]
                leading-7
                text-black/65

                sm:text-[16px]

                lg:text-[17px]
                lg:leading-8
              "
            >
              <p>
                Yes. NRIs and OCIs can generally purchase residential and commercial
                immovable property in India, subject to FEMA and RBI rules.
              </p>

              <p>
                However, NRIs and OCIs cannot generally purchase agricultural land,
                plantation property or farmhouses in India through a normal purchase
                transaction.
              </p>

              <p className="font-semibold text-black">
                Before buying property in Dholera, always verify the land type, title,
                location and applicable approvals.
              </p>

       
            </div>
          </div>
        </section>


        {/* ===================================================
            WHY NRIs ARE LOOKING AT DHOLERA
        ==================================================== */}
        <section
          id="why-dholera"
          className="
            scroll-mt-24

            bg-black/[0.025]

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-16
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
                gap-10

                lg:grid-cols-[0.72fr_1.28fr]
                lg:items-start
                lg:gap-20

                xl:gap-24
              "
            >
              {/* =====================================================
                  LEFT CONTENT
                  STICKY LIKE REFERENCE VIDEO
              ====================================================== */}

              <div
                className="
                  min-w-0

                  lg:sticky
                  lg:top-48
                  lg:self-start
                  lg:h-fit
                "
              >
                {/* Heading */}
                <h2
                  className="
                    max-w-[500px]

                    text-[30px]
                    font-bold
                    leading-[1.12]
                    tracking-[-0.035em]

                    text-black

                    sm:text-[34px]

                    lg:text-[38px]

                    xl:text-[40px]
                  "
                >
                  Why Are NRIs Looking{" "}
                  <span className="text-[#EC1C40]">
                    at Dholera?
                  </span>
                </h2>

                {/* Description */}
                <p
                  className="
                    mt-4
                    max-w-md

                    text-[15px]
                    leading-7

                    text-black/60

                    sm:text-[16px]
                  "
                >
                  Dholera is attracting interest because of its
                  planned industrial development, major
                  infrastructure projects and growing manufacturing
                  ecosystem.
                </p>

                {/* Link */}
                <Link
                  href="/dholera-sir"
                  className="
                    group

                    mt-7

                    inline-flex
                    items-center
                    gap-2

                    text-[14px]
                    font-semibold

                    text-[#EC1C40]

                    transition-colors
                    duration-200

                    hover:text-black
                  "
                >
                  About Dholera SIR

                  <ArrowRight
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-200

                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>

              {/* =====================================================
                  RIGHT CONTENT
                  NORMAL PAGE SCROLL
              ====================================================== */}

              <div className="min-w-0">
                <div
                  className="
                    border-y
                    border-black/10
                  "
                >
                  {nriInterestFactors.map((item) => (
                    <div
                      key={item}
                      className="
                        group

                        flex
                        items-center
                        gap-4

                        border-b
                        border-black/10

                        py-5

                        last:border-b-0

                        sm:gap-5
                        sm:py-6

                        lg:min-h-[88px]
                        lg:py-6
                      "
                    >
                      {/* Check icon */}
                      <span
                        className="
                          flex
                          h-10
                          w-10

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[#EC1C40]/5
                          text-[#EC1C40]

                          transition-colors
                          duration-200

                          group-hover:bg-[#EC1C40]/10
                        "
                      >
                        <Check
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>

                      {/* Item text */}
                      <p
                        className="
                          min-w-0

                          text-[15px]
                          font-semibold
                          leading-6

                          text-black/70

                          transition-colors
                          duration-200

                          group-hover:text-black

                          sm:text-[16px]
                          sm:leading-7
                        "
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            PAYMENT
        ==================================================== */}

        <section
          id="payments"
          className="
            scroll-mt-24
            border-y
            border-black/10
            bg-white

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-20
          "
        >
          <div className="mx-auto w-full max-w-7xl">
            {/* =====================================================
                MAIN LAYOUT
            ====================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-10

                lg:grid-cols-[0.72fr_1.28fr]
                lg:items-start
                lg:gap-16

                xl:gap-24
              "
            >
              {/* =====================================================
                  LEFT CONTENT
              ====================================================== */}

              <div className="min-w-0">
                {/* Accent */}
              

                {/* Heading */}
                <h2
                  className="
                    max-w-[500px]

                    text-[30px]
                    font-bold
                    leading-[1.12]
                    tracking-[-0.035em]

                    text-black

                    sm:text-[34px]

                    md:text-[36px]

                    lg:text-[40px]
                  "
                >
                  How Can an NRI Pay for{" "}
                  <span className="text-[#EC1C40]">
                    Property in India?
                  </span>
                </h2>

                {/* Introduction */}
                <p
                  className="
                    mt-5
                    max-w-lg

                    text-[15px]
                    leading-7

                    text-black/60

                    sm:text-[16px]

                    lg:text-[17px]
                    lg:leading-8
                  "
                >
                  Under RBI rules, payment for eligible immovable
                  property should generally be made through permitted
                  banking channels.
                </p>

                {/* Desktop decorative visual */}
                <div
                  aria-hidden="true"
                  className="
                    relative
                    mt-10

                    hidden
                    h-[180px]

                    overflow-hidden

                    border
                    border-black/10

                    bg-black/[0.025]

                    lg:block
                  "
                >
                  {/* Vertical accent */}
                  <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#EC1C40]" />

                  {/* Large icon */}
                  <div
                    className="
                      absolute
                      left-8
                      top-1/2

                      flex
                      h-20
                      w-20

                      -translate-y-1/2

                      items-center
                      justify-center

                      rounded-full

                      bg-[#EC1C40]/5
                      text-[#EC1C40]
                    "
                  >
                    <Building2
                      size={34}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Decorative lines */}
                  <div className="absolute right-8 top-9 h-px w-[42%] bg-black/10" />

                  <div className="absolute right-8 top-[50%] h-px w-[55%] bg-black/10" />

                  <div className="absolute bottom-9 right-8 h-px w-[34%] bg-black/10" />

                  <div
                    className="
                      absolute
                      -bottom-14
                      -right-12

                      h-40
                      w-40

                      rounded-full

                      bg-[#EC1C40]/5
                    "
                  />
                </div>
              </div>

              {/* =====================================================
                  RIGHT PAYMENT METHODS
              ====================================================== */}

              <div className="min-w-0">
                <div
                  className="
                    border-t
                    border-black/10
                  "
                >
                  {paymentMethods.map(
                    ({ title, icon: Icon }, index) => (
                      <div
                        key={title}
                        className="
                          group

                          grid
                          grid-cols-[auto_1fr_auto]

                          items-center

                          gap-4

                          border-b
                          border-black/10

                          py-5

                          transition-colors
                          duration-200

                          hover:bg-[#EC1C40]/[0.025]

                          sm:gap-5
                          sm:py-6

                          lg:min-h-[112px]
                          lg:px-2
                        "
                      >
                        {/* Number */}
                        <span
                          className="
                            hidden

                            text-[11px]
                            font-bold

                            tracking-[0.14em]

                            text-black/35

                            sm:block
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Method */}
                        <div
                          className="
                            flex
                            min-w-0
                            items-center

                            gap-4

                            sm:gap-5
                          "
                        >
                          {/* Icon */}
                          <span
                            className="
                              flex
                              h-12
                              w-12

                              shrink-0

                              items-center
                              justify-center

                              rounded-xl

                              border
                              border-[#EC1C40]/10

                              bg-[#EC1C40]/5

                              text-[#EC1C40]

                              transition-[background-color,color,border-color]
                              duration-200

                              group-hover:border-[#EC1C40]/20
                              group-hover:bg-[#EC1C40]
                              group-hover:text-white

                              sm:h-14
                              sm:w-14
                            "
                          >
                            <Icon
                              size={22}
                              strokeWidth={1.7}
                              aria-hidden="true"
                            />
                          </span>

                          {/* Text */}
                          <p
                            className="
                              text-[15px]
                              font-semibold
                              leading-6

                              text-black/75

                              transition-colors
                              duration-200

                              group-hover:text-black

                              sm:text-[16px]
                              sm:leading-7

                              lg:text-[17px]
                            "
                          >
                            {title}
                          </p>
                        </div>

                        {/* Decorative marker */}
                        <span
                          aria-hidden="true"
                          className="
                            h-2
                            w-2

                            rounded-full

                            bg-black/10

                            transition-[background-color,transform]
                            duration-200

                            group-hover:scale-125
                            group-hover:bg-[#EC1C40]
                          "
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* =====================================================
                IMPORTANT INFORMATION
            ====================================================== */}

            <div
              className="
                mt-10

                grid
                grid-cols-1

                border
                border-black/10

                bg-black/[0.025]

                md:grid-cols-2
              "
            >
              {/* Payment restriction */}
              <div
                className="
                  flex
                  items-start
                  gap-4

                  border-b
                  border-black/10

                  p-5

                  sm:p-6

                  md:border-b-0
                  md:border-r

                  lg:p-7
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

                    rounded-full

                    bg-[#EC1C40]/10
                    text-[#EC1C40]
                  "
                >
                  <AlertTriangle
                    size={18}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </span>

                <p
                  className="
                    pt-1

                    text-[14px]
                    font-semibold
                    leading-6

                    text-black

                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  Property payments should not be made through foreign
                  currency notes or travellers&apos; cheques.
                </p>
              </div>

              {/* Advisory */}
              <div
                className="
                  flex
                  items-start
                  gap-4

                  p-5

                  sm:p-6

                  lg:p-7
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

                    rounded-full

                    bg-white

                    text-[#EC1C40]

                    ring-1
                    ring-black/10
                  "
                >
                  <Landmark
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                <p
                  className="
                    pt-1

                    text-[14px]
                    leading-6

                    text-black/65

                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  Your bank or financial adviser should confirm the
                  correct payment route for your individual transaction.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* ===================================================
            DOCUMENTS
        ==================================================== */}
      <section
        id="documents"
        className="
          scroll-mt-24

          bg-black/[0.025]

          px-4
          py-12

          min-[414px]:px-5

          sm:px-6
          sm:py-14

          md:px-8

          lg:px-10
          lg:py-20
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
            title="Documents NRIs Should Check"
            accent="Before Buying"
            description="Property due diligence is especially important when you are buying remotely. Before considering a plot in Dholera, check:"
          />

          {/* =====================================================
              DOCUMENT CARDS
          ====================================================== */}

          <div
            className="
              mt-8

              grid
              grid-cols-1
              gap-4

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
            {documents.map(
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
                    min-h-[190px]
                    flex-col

                    overflow-hidden

                    rounded-2xl

                    border
                    border-black/10

                    bg-white

                    p-5

                    transition-[border-color,box-shadow,transform]
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-[#EC1C40]/25
                    hover:shadow-[0_18px_40px_-32px_rgba(0,0,0,0.35)]

                    sm:min-h-[200px]
                    sm:p-6

                    lg:min-h-[210px]
                  "
                >
                  {/* =================================================
                      TOP ACCENT
                  ================================================= */}

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

                  {/* =================================================
                      ICON + TITLE
                  ================================================= */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center

                      gap-3

                      sm:gap-4
                    "
                  >
                    {/* Icon */}
                    <span
                      className="
                        flex
                        h-10
                        w-10

                        shrink-0

                        items-center
                        justify-center

                        rounded-xl

                        bg-[#EC1C40]/10

                        text-[#EC1C40]

                        transition-[background-color,color]
                        duration-300

                        group-hover:bg-[#EC1C40]
                        group-hover:text-white

                        sm:h-11
                        sm:w-11
                      "
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    {/* Title */}
                    <h3
                      className="
                        min-w-0

                        text-[16px]
                        font-bold
                        leading-6

                        tracking-[-0.01em]

                        text-black

                        sm:text-[17px]

                        lg:text-[18px]
                      "
                    >
                      {title}
                    </h3>
                  </div>

                  {/* =================================================
                      DIVIDER
                  ================================================= */}

                  <div
                    className="
                      my-4

                      h-px
                      w-full

                      bg-black/10

                      sm:my-5
                    "
                  />

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
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

          {/* =====================================================
              IMPORTANT NOTE
          ====================================================== */}

          <div
            className="
              mt-7

              border-l-[3px]
              border-[#EC1C40]

              bg-white

              px-5
              py-4

              text-[15px]
              font-semibold
              leading-7

              text-black

              sm:px-6
              sm:py-5

              lg:text-[16px]
            "
          >
            Do not rely only on brochures, maps or verbal assurances.
          </div>
        </div>
      </section>


        {/* ===================================================
            BUYING FROM ABROAD
        ==================================================== */}
      <section
        id="buying-abroad"
        className="
          scroll-mt-24

          border-y
          border-black/10

          bg-white

          px-4
          py-12

          min-[414px]:px-5

          sm:px-6
          sm:py-14

          md:px-8

          lg:px-10
          lg:py-20
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
            eyebrow="Remote Assistance"
            title="Buying Property in Dholera"
            accent="From Abroad"
            description="You do not necessarily need to travel to India for every step of the research process."
          />

            <p className="font-semibold text-black mt-1">
              Dholera Times can help overseas buyers with:
            </p>

          <div
            className="
              relative

              mt-9

              grid
              grid-cols-1

              gap-4

              md:grid-cols-2

              lg:grid-cols-3
            "
          >
            {remoteBuyingSteps.map(
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
                    relative

                    rounded-2xl

                    border
                    border-black/10

                    bg-white

                    p-5

                    shadow-[0_12px_40px_-34px_rgba(0,0,0,0.35)]

                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between

                      gap-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-xl

                        bg-black

                        text-white
                      "
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className="
                        text-[12px]
                        font-bold

                        tracking-[0.1em]

                        text-[#EC1C40]
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-5

                      text-[18px]
                      font-bold
                      leading-6

                      text-black
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
                    "
                  >
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
          
        <Link
          href="https://wa.me/919958993549"
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-8

            inline-flex

            min-h-[50px]

            items-center
            justify-center

            gap-2

            rounded-xl

            bg-[#EC1C40]

            px-5
            py-3

            text-[14px]
            font-semibold

            text-white

            transition-[background-color,transform]
            duration-200

            hover:-translate-y-0.5
            hover:bg-[#d81839]

            sm:text-[15px]

            motion-reduce:transform-none
          "
        >
          Request an NRI Consultation

          <ArrowRight
            size={17}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </Link>
        </div>
      </section>

        {/* ===================================================
            POWER OF ATTORNEY
        ==================================================== */}

        <section
          className="
            bg-black

            px-4
            py-10

            text-white

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

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

              gap-7

              lg:grid-cols-[auto_minmax(0,1fr)]
              lg:items-start
              lg:gap-8
            "
          >
            

            <div className="max-w-5xl">
              <h2
                className="
                  text-[28px]
                  font-bold
                  leading-[1.2]

                  tracking-[-0.03em]

                  text-white

                  sm:text-[32px]

                  lg:text-[38px]
                "
              >
                Can an NRI Buy Property Through{" "}
                <span className="text-[#EC1C40]">
                  Power of Attorney?
                </span>
              </h2>

              <div
                className="
                  mt-5

                  space-y-4

                  text-[15px]
                  leading-7

                  text-white/70

                  sm:text-[16px]
                "
              >
                <p>
                  A{" "}
                  <strong className="font-semibold text-white">
                    Power of Attorney (PoA)
                  </strong>{" "}
                  may be useful when an NRI cannot be
                  physically present in India for certain
                  property-related activities.
                </p>

                <p>
                  Depending on the transaction and
                  applicable state requirements, a properly
                  executed PoA may allow an authorised
                  person to assist with specific actions.
                </p>

                <p>
                  However, the exact format, notarisation,
                  apostille/consular requirements and
                  permitted powers should be confirmed with
                  a qualified legal professional before use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            EVALUATION
        ==================================================== */}

        <section
          className="
            bg-white

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-20
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
              eyebrow="Evaluation"
              title="NRI Property Investment:"
              accent="What Should You Evaluate?"
              description="Do not evaluate a Dholera property only by looking at the quoted price."
            />

            <div
              className="
                mt-8

                grid
                grid-cols-1

                gap-4

                sm:grid-cols-2

                lg:grid-cols-4
              "
            >
              {evaluationFactors.map(
                ({
                  title,
                  description,
                  icon: Icon,
                }) => (
                  <article
                    key={title}
                    className="
                      group

                      rounded-2xl

                      border
                      border-black/10

                      bg-white

                      p-5

                      transition-[background-color,border-color,transform]
                      duration-300

                      hover:-translate-y-1
                      hover:border-[#EC1C40]/30
                      hover:bg-[#EC1C40]/[0.025]

                      motion-reduce:transform-none
                    "
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="text-[#EC1C40]"
                    />

                    <h3
                      className="
                        mt-4

                        text-[17px]
                        font-bold

                        text-black
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
            RISKS
        ==================================================== */}
        <section
          id="risks"
          className="
            scroll-mt-24

            bg-black

            px-4
            py-12

            text-white

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-20
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            {/* =====================================================
                HEADING
            ====================================================== */}

            <div className="max-w-4xl">
              {/* Eyebrow */}
              <p
                className="
                  mb-3

                  text-[11px]
                  font-bold
                  uppercase
                  leading-5

                  tracking-[0.16em]

                  text-[#EC1C40]

                  sm:text-[12px]
                "
              >
                Risk Awareness
              </p>

              {/* Title */}
              <h2
                className="
                  text-[28px]
                  font-bold
                  leading-[1.15]

                  tracking-[-0.03em]

                  text-white

                  sm:text-[32px]

                  md:text-[36px]

                  lg:text-[40px]
                "
              >
                Risks NRIs{" "}
                <span className="text-[#EC1C40]">
                  Should Understand
                </span>
              </h2>

              {/* Description */}
              <p
                className="
                  mt-4

                  text-[15px]
                  leading-7

                  text-white/60

                  sm:text-[16px]

                  md:text-[17px]
                "
              >
                Every property investment carries risk.
              </p>
            </div>

            {/* =====================================================
                RISK ITEMS
            ====================================================== */}

            <div
              className="
                mt-8

                grid
                grid-cols-1
                gap-3

                md:grid-cols-2
              "
            >
              {riskItems.map((item) => (
                <div
                  key={item}
                  className="
                    group

                    flex
                    items-center

                    gap-3.5

                    rounded-xl

                    border
                    border-white/[0.14]

                    bg-white/[0.045]

                    p-4

                    transition-[background-color,border-color]
                    duration-200

                    hover:border-white/[0.24]
                    hover:bg-white/[0.07]

                    sm:min-h-[66px]
                    sm:p-5
                  "
                >
                  {/* Alert icon */}
                  <span
                    className="
                      flex
                      h-8
                      w-8

                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      bg-[#EC1C40]/10

                      text-[#EC1C40]

                      transition-colors
                      duration-200

                      group-hover:bg-[#EC1C40]/15
                    "
                  >
                    <AlertTriangle
                      size={17}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </span>

                  {/* Risk text */}
                  <p
                    className="
                      text-[14px]
                      font-medium
                      leading-6

                      text-white/75

                      transition-colors
                      duration-200

                      group-hover:text-white

                      sm:text-[15px]
                    "
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* =====================================================
                CLOSING MESSAGE
            ====================================================== */}

            <p
              className="
                mt-8

                max-w-4xl

                text-[18px]
                font-semibold
                leading-8

                text-white

                sm:text-[20px]
              "
            >
              A good investment decision starts with{" "}
              <span className="text-[#EC1C40]">
                verification, not speculation.
              </span>
            </p>
          </div>
        </section>

        {/* ===================================================
            CONSULTATION
        ==================================================== */}
        <section
          id="consultation"
          className="
            scroll-mt-24

            bg-white

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-20
          "
        >
          <div
            className="
              mx-auto

              grid
              w-full
              max-w-7xl

              grid-cols-1

              gap-9

              lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.8fr)]
              lg:gap-14
            "
          >
            <div>
              <SectionHeading
                eyebrow="Advisory Support"
                title="NRI Investment Consultation"
                accent="With Dholera Times"
              />

              <div
                className="
                  mt-6

                  max-w-3xl

                  space-y-4

                  text-[15px]
                  leading-7

                  text-black/65

                  sm:text-[16px]
                "
              >
                <p>
                  Investing from overseas can make local
                  information and on-ground verification
                  more important.
                </p>

                <p>
                  Dholera Times combines Dholera-focused
                  research, on-ground presence and property
                  advisory support to help NRIs understand
                  the region before making a decision.
                </p>
              </div>

            <Link
              href="https://wa.me/919958993549"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-7

                inline-flex
                min-h-[50px]

                items-center
                justify-center

                gap-2

                rounded-xl

                bg-[#EC1C40]

                px-5
                py-3

                text-[14px]
                font-semibold
                text-white

                transition-[background-color,transform]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#d81839]

                sm:text-[15px]

                motion-reduce:transform-none
              "
            >
              Talk to Our NRI Advisory Team

              <ArrowRight
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </Link>
            </div>

            <div
              className="
                rounded-[24px]

                border
                border-black/10

                bg-black/[0.025]

                p-5

                sm:p-6

                lg:p-7
              "
            >
              <div
                className="
                  space-y-3
                "
              >
                {consultationItems.map(
                  (item) => (
                    <div
                      key={item}
                      className="
                        flex
                        items-start

                        gap-3

                        border-b
                        border-black/10

                        pb-3

                        last:border-b-0
                        last:pb-0
                      "
                    >
                      <span
                        className="
                          mt-0.5

                          flex
                          h-6
                          w-6

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-black

                          text-white
                        "
                      >
                        <Check
                          size={13}
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      </span>

                      <p
                        className="
                          text-[14px]
                          font-medium
                          leading-6

                          text-black/75

                          sm:text-[15px]
                        "
                      >
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WHY CHOOSE
        ==================================================== */}

        <section
          className="
            border-y
            border-black/10

            bg-black/[0.025]

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8

            lg:px-10
            lg:py-20
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            {/* =====================================================
                SECTION HEADING
            ====================================================== */}

            <SectionHeading
              eyebrow="Dholera Times"
              title="Why NRIs Choose"
              accent="Dholera Times"
            />

            {/* =====================================================
                CARDS
            ====================================================== */}

            <div
              className="
                mt-9

                grid
                grid-cols-1

                gap-4

                sm:grid-cols-2

                lg:grid-cols-3
              "
            >
              {whyChooseItems.map(
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
                      min-h-[190px]
                      flex-col

                      overflow-hidden

                      rounded-2xl

                      border
                      border-black/10

                      bg-white

                      p-5

                      transition-[border-color,transform,box-shadow]
                      duration-300

                      hover:-translate-y-1
                      hover:border-[#EC1C40]/30
                      hover:shadow-[0_20px_45px_-32px_rgba(0,0,0,0.35)]

                      sm:min-h-[200px]
                      sm:p-6

                      lg:min-h-[210px]

                      motion-reduce:transform-none
                    "
                  >
                    {/* =================================================
                        TOP HOVER ACCENT
                    ================================================= */}

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

                    {/* =================================================
                        ICON + TITLE
                    ================================================= */}

                    <div
                      className="
                        flex
                        min-w-0
                        items-center

                        gap-3

                        sm:gap-4
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

                          bg-[#EC1C40]/10

                          text-[#EC1C40]

                          transition-[background-color,color]
                          duration-300

                          group-hover:bg-[#EC1C40]
                          group-hover:text-white

                          sm:h-11
                          sm:w-11
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

                          text-[16px]
                          font-bold
                          leading-6

                          tracking-[-0.01em]

                          text-black

                          sm:text-[17px]

                          lg:text-[18px]
                        "
                      >
                        {title}
                      </h3>
                    </div>

                    {/* =================================================
                        DIVIDER
                    ================================================= */}

                    <div
                      className="
                        my-4

                        h-px
                        w-full

                        bg-black/10

                        sm:my-5
                      "
                    />

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p
                      className="
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
            FAQs
        ==================================================== */}

        <CommonFAQ 
          faqItems={faqItems}
        />
      </main>
    </>
  );
}