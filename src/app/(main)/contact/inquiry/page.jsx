import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileSearch,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  SearchCheck,
  TrendingUp,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import ContactForm from "../../components/NewContactForm";
import getM from "@/assets/contact-dholera-times-mobile.webp";
import get from "@/assets/contactPage/DTcontactBanner.webp";

import CommonFAQ from "../../components/Common/Faq";



/* ============================================================
   SEO METADATA
============================================================ */

export const metadata = {
  title: {
    absolute: "Contact Dholera Times | Dholera News & Property Enquiries",
  },

  description:
    "Contact Dholera Times for Dholera Smart City information, news enquiries, residential plots, pricing, site visits and property assistance.",

  keywords: [
    "Contact Dholera Times",
    "Dholera Times contact",
    "Dholera property enquiry",
    "Dholera plots enquiry",
    "Dholera site visit",
    "Dholera Smart City information",
  ],

  alternates: {
    canonical: "https://www.dholeratimes.com/contact/inquiry",
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
    title: "Contact Dholera Times | Dholera News & Property Enquiries",

    description:
      "Contact Dholera Times for Dholera Smart City information, news enquiries, residential plots, pricing, site visits and property assistance.",

    url: "https://www.dholeratimes.com/contact/inquiry",

    siteName: "Dholera Times",

    type: "website",
  },

  twitter: {
    card: "summary",

    title: "Contact Dholera Times | Dholera News & Property Enquiries",

    description:
      "Contact Dholera Times for Dholera Smart City information, news enquiries, residential plots, pricing, site visits and property assistance.",
  },
};

/* ============================================================
   DATA
============================================================ */

const helpItems = [
  {
    title: "Investment Consultation & Advisory",

    description:
      "Get guidance on Dholera investment opportunities, locations, infrastructure impact, property options, pricing and key risks before making a decision.",

    icon: TrendingUp,
  },
  {
    title: "Dholera Investment Insights",

    description:
      "Understand market trends, development progress, land and plot prices, major infrastructure projects and emerging investment opportunities across Dholera.",

    icon: SearchCheck,
  },
  {
    title: "Residential Plots in Dholera",

    description:
      "Explore residential plots in the Dholera region with details on location, plot sizes, pricing, documentation and current availability with Dholera Times.",

    icon: Building2,
  },
  {
    title: "Property Comparison & Due Diligence",

    description:
      "Compare locations and property options based on development status, connectivity, documentation, pricing and proximity to Dholera SIR.",

    icon: FileSearch,
  },
  {
    title: "Dholera Information & Business Enquiries",

    description:
      "Contact us for information about Dholera SIR, infrastructure, industries, company developments, media enquiries, partnerships or business opportunities.",

    icon: Newspaper,
  },
];

const faqItems = [
  {
    question: "How can I contact Dholera Times?",

    answer:
      "You can contact Dholera Times by phone, WhatsApp, email or the enquiry form on this page.",
  },
  {
    question: "Can I enquire about residential plots in Dholera?",

    answer:
      "Yes. Our team can provide information about available residential plots, locations, sizes, pricing and documentation.",
  },
  {
    question: "Can Dholera Times arrange a site visit?",

    answer:
      "Yes. Our team can help arrange a site visit in Dholera so you can understand the location and surrounding development.",
  },
  {
    question: "Can I share Dholera news or development information?",

    answer:
      "Yes. Companies, authorities, readers and local sources can contact us to share Dholera-related news, announcements or development information for review.",
  },
  {
    question: "How do I report incorrect information?",

    answer:
      "You can email or contact our team with the page URL and correction details. We review reliable new information and update our coverage when required.",
  },
];

/* ============================================================
   STRUCTURED DATA
============================================================ */

const contactPageSchema = {
  "@context": "https://schema.org",

  "@type": "ContactPage",

  name: "Contact Dholera Times",

  description:
    "Contact Dholera Times for Dholera Smart City information, news enquiries, residential plots, pricing, site visits and property assistance.",

  url: "https://www.dholeratimes.com/contact/inquiry",

  mainEntity: {
    "@type": "Organization",

    name: "Dholera Times",

    url: "https://www.dholeratimes.com/",

    email: "info@dholeratimes.com",

    telephone: "+91 99589 93549",

    address: {
      "@type": "PostalAddress",

      streetAddress:
        "CGJ - 194, DLF Capital Greens, Shivaji Marg, Karampura Industrial Area",

      addressLocality: "Karam Pura",

      addressRegion: "Delhi",

      postalCode: "110015",

      addressCountry: "IN",
    },

    contactPoint: {
      "@type": "ContactPoint",

      telephone: "+91 99589 93549",

      email: "info@dholeratimes.com",

      contactType: "customer service",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",

  "@type": "FAQPage",

  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",

  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: "https://www.dholeratimes.com/",
    },
    {
      "@type": "ListItem",

      position: 2,

      name: "Contact Us",

      item: "https://www.dholeratimes.com/contact/inquiry",
    },
  ],
};

/* ============================================================
   PAGE
============================================================ */

export default function ContactPage() {
  return (
    <>
      {/* =====================================================
          SCHEMA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ============================================================
          CONTACT PAGE BANNER
        ============================================================ */}

      <section
        aria-label="Contact Dholera Times"
        className="
        w-full

        overflow-hidden

        bg-white
      "
      >
        {/* MOBILE BANNER */}

        <Image
          src={getM}
          alt="Contact Dholera Times"
          priority
          quality={90}
          sizes="100vw"
          className="
          block
          h-auto
          w-full

          object-cover

          md:hidden
        "
        />

        {/* DESKTOP / TABLET BANNER */}

        <Image
          src={get}
          alt="Contact Dholera Times"
          priority
          quality={90}
          sizes="100vw"
          className="
          hidden
          h-auto
          w-full

          object-cover

          md:block
        "
        />
      </section>

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
            HERO / CONTACT INTRO
        ==================================================== */}

        {/* ===================================================
            HOW CAN WE HELP
        ==================================================== */}

        <section
          className="
            bg-black/[0.025]

            px-4
            py-6

            min-[414px]:px-5

            sm:px-6
            sm:py-10

            md:px-8

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
            <header
              className="
                max-w-4xl
              "
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
                How Can We <span className="text-[#EC1C40]">Help?</span>
              </h2>

              <p
                className="
                  mt-4

                  w-full

                  text-[15px]
                  leading-7

                  text-black/65

                  sm:text-[16px]

                  md:text-[17px]
                "
              >
                Dholera Times helps investors, property buyers and businesses
                understand Dholera with on ground insights, investment
                consultation and property advisory support.
              </p>
            </header>

            {/* CARDS */}

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
              {helpItems.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className={`
                      group

                      relative

                      overflow-hidden

                      rounded-[22px]

                      border
                      border-black/10

                      bg-white

                      p-5

                      shadow-[0_12px_38px_-32px_rgba(0,0,0,0.28)]

                      transition-[transform,border-color,box-shadow]
                      duration-300

                      hover:-translate-y-1
                      hover:border-[#EC1C40]/30
                      hover:shadow-[0_22px_50px_-34px_rgba(0,0,0,0.38)]

                      sm:p-6

                      ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}

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

                        text-[#EC1C40]

                        transition-[background-color,color]
                        duration-300

                        group-hover:bg-[#EC1C40]
                        group-hover:text-white
                      "
                  >
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
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
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            CLOSING
        ==================================================== */}

        <section
          className="
            bg-black

            px-4
            py-8

            text-white

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8

            lg:px-10
            lg:py-10
          "
        >
          <div
            className="
              mx-auto

              flex
              w-full
              max-w-7xl

              flex-col

              gap-6

              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-10
            "
          >
            <div className="max-w-3xl">
              <h2
                className="
                  text-[28px]
                  font-bold
                  leading-[1.15]

                  tracking-[-0.03em]

                  text-white

                  sm:text-[32px]

                  lg:text-[38px]
                "
              >
                Dholera Matlab{" "}
                <span className="text-[#EC1C40]">Dholera Times</span>
              </h2>

              <p
                className="
                  mt-4

                  text-[15px]
                  leading-7

                  text-white/65

                  sm:text-[16px]
                "
              >
                Whether you want to understand Dholera, share an update or
                explore property opportunities, our team is here to help.
              </p>
            </div>

            <Link
              href="https://wa.me/919958993549"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                min-h-[50px]
                w-fit

                shrink-0

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
              Send Us an Enquiry
            </Link>
          </div>
        </section>

        {/* ===================================================
            ENQUIRY
        ==================================================== */}

        <section
          id="send-enquiry"
          className="
            scroll-mt-24

            bg-white

            px-4
            pt-8
            pb-4

            min-[414px]:px-5

            sm:px-6
            sm:py-10

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

              gap-10

              lg:grid-cols-[minmax(0,0.82fr)_minmax(500px,1.18fr)]
              lg:items-center
              lg:gap-16

              xl:gap-20
            "
          >
            {/* ========================================================
                LEFT CONTENT
            ========================================================= */}

            <div
              className="
                max-w-xl

                lg:pr-4
              "
            >
              
              {/* HEADING */}

              <h2
                className="
                  text-[30px]
                  font-bold
                  leading-[1.12]

                  tracking-[-0.035em]

                  text-black

                  min-[414px]:text-[32px]

                  sm:text-[36px]

                  lg:text-[42px]
                "
              >
                Tell Us What You <span className="text-[#EC1C40]">Need</span>
              </h2>

              {/* INTRO */}

              <div
                className="
                  mt-5

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
                  Whether you want to understand Dholera Smart City, explore
                  residential plots, check pricing or arrange a site visit,
                  share your requirements with our team.
                </p>

                <p>
                  You can also contact Dholera Times for Dholera development
                  updates, news information, media enquiries and
                  business-related communication.
                </p>
              </div>
            </div>

            {/* ========================================================
                RIGHT FORM
            ========================================================= */}

            <div
              className="
                w-full

                lg:justify-self-end
              "
            >
              <ContactForm
                title="Send Us an Enquiry"
                headline="Tell us what you need and the relevant Dholera Times team will get back to you."
                buttonName="Send Enquiry"
                maxWidth="620px"
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            FAQ
        ==================================================== */}

        <CommonFAQ  
            className="bg-black/[0.025]"
        faqItems={faqItems} />
      </main>
    </>
  );
}
