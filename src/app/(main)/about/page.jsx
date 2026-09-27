// import React from "react";
// import {
//   Building,
//   Users,
//   AreaChart,
//   BadgeCheck,
//   MapPin,
//   FileCheck,
//   Clock,
//   Target,
//   Eye,
//   Award,
//   CheckCircle,
//   Phone,
//   Shield,
//   Search,
//   FileText,
//   Headphones,
// } from "lucide-react";
// import hero from "@/assets/consultation-image.webp";
// import Image from "next/image";

// export default function AboutUs() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <title>About Dholera Times | Dholera Smart City Updates</title>
//       <meta
//         name="description"
//         content="Dholera Times offers trusted insights, project details, and investment updates about Dholera Smart City and Dholera SIR development."
//       />
//       <meta
//         name="keywords"
//         content="Dholera Smart City, Dholera SIR, Dholera Gujarat, Dholera Project, Dholera Investment, Smart City Dholera"
//       />
//       <link
//           rel="canonical"
//           href="https://www.dholeratimes.com/about"
//         />
//       {/* Hero Section */}
//       <div className="relative h-96 w-full overflow-hidden bg-[#151f28]">
//         <div className="absolute inset-0 "></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center px-6 py-10">
//             <h1 className="text-center text-2xl md:text-4xl text-white font-bold mb-4">
//               Transforming Visions into Reality:
//               <br />
//               <span className="text-[#d3b36b]">About Dholera Times</span>
//             </h1>
//             <p className="text-white/90 text-lg max-w-2xl mx-auto">
//               Step Into India’s First Greenfield Smart City – Dholera with
//               Dholera Times
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Our Story & Values Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div>
//               <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#151f28]">
//                 About Dholera Times
//               </h2>
//               <div className="space-y-6 text-gray-700  leading-relaxed">
//                 <p>
//                   At <strong className="text-[#d3b36b]">Dholera Times</strong>,
//                   we are redefining how people discover and understand real
//                   estate opportunities in India's first greenfield smart city –
//                   Dholera Smart City.
//                 </p>
//                 <p>
//                   We specialize in delivering transparent, secure, and
//                   growth-oriented insights on AUDA-approved projects, ensuring
//                   that investors, brokers, and homebuyers access legally clear,
//                   registry-ready plots with the potential for assured
//                   appreciation.
//                 </p>
//                 <p>
//                   With a strong focus on trust, timely updates, and an
//                   investor-first approach,{" "}
//                   <strong className="text-[#d3b36b]">Dholera Times</strong>{" "}
//                   bridges the gap between opportunity and authentic information.
//                 </p>
//               </div>
//             </div>

//             {/* Right - Value Icons */}
//             <div className="grid grid-cols-2 gap-6">
//               <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
//                 <Shield className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-bold text-[#151f28] mb-2">
//                   Trust & Transparency
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   100% verified information
//                 </p>
//               </div>
//               <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
//                 <Award className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-bold text-[#151f28] mb-2">
//                   8+ Years Of Expertise
//                 </h3>
//                 <p className="text-sm text-gray-600">Proven track record</p>
//               </div>
//               <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
//                 <FileCheck className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-bold text-[#151f28] mb-2">
//                   Government-Approved
//                 </h3>
//                 <p className="text-sm text-gray-600">AUDA certified projects</p>
//               </div>
//               <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
//                 <Users className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-bold text-[#151f28] mb-2">
//                   Client-Centric Approach
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your success is our priority
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Do Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#151f28]">
//             What We Do
//           </h2>

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Left - Services Grid */}
//             <div className="grid grid-cols-2 gap-6">
//               <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
//                 <Phone className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-semibold text-[#151f28] mb-2">
//                   Consultation & Site Visits
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Expert guidance & free site visits
//                 </p>
//               </div>
//               <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
//                 <Search className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-semibold text-[#151f28] mb-2">
//                   Project Selection Guidance
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Find the perfect investment
//                 </p>
//               </div>
//               <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
//                 <FileText className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-semibold text-[#151f28] mb-2">
//                   Legal & Registration Support
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Complete documentation help
//                 </p>
//               </div>
//               <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
//                 <Headphones className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
//                 <h3 className="font-semibold text-[#151f28] mb-2">
//                   Post-sale Service & Updates
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Ongoing support & updates
//                 </p>
//               </div>
//             </div>

//             {/* Right - House Image */}
//             <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
//               <Image
//                 src={hero}
//                 alt="Dholera Smart City Vision"
//                 width={600}
//                 height={400}
//                 className="w-full h-auto"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Achievements */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#151f28]">
//             Our Achievements
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               {
//                 value: "7",
//                 label: "Total No. of Projects",
//                 icon: <Building className="h-8 w-8" />,
//               },
//               {
//                 value: "1000",
//                 label: "Plots Sold",
//                 icon: <BadgeCheck className="h-8 w-8" />,
//               },
//               {
//                 value: "400",
//                 label: "Happy Customers",
//                 icon: <Users className="h-8 w-8" />,
//               },
//               {
//                 value: "5 Lakh Sq. Yards",
//                 label: "Sold",
//                 icon: <AreaChart className="h-8 w-8" />,
//               },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 p-6 rounded-lg text-center border hover:border-[#d3b36b] transition-colors"
//               >
//                 <div className="text-[#d3b36b] mb-3 flex justify-center">
//                   {stat.icon}
//                 </div>
//                 <div className="text-2xl md:text-3xl font-bold text-[#151f28] mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm md:text-base text-gray-600">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission, Vision, Journey, Promise */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           {/* Mission */}
//           <div className="mb-12">
//             <div className="bg-[#d3b36b] p-10 rounded-2xl text-white relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-[#151f28]/10 rounded-full -translate-y-16 translate-x-16"></div>
//               <div className="flex items-center mb-6 relative z-10">
//                 <div className="bg-[#151f28]/10 p-3 rounded-xl mr-4">
//                   <Target className="h-8 w-8 text-white" />
//                 </div>
//                 <h3 className="text-3xl font-bold">Our Mission</h3>
//               </div>
//               <div className="space-y-4 relative z-10">
//                 <div className="flex items-start">
//                   <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                   <span className="text-gray-100">
//                     To make property exploration hassle-free, transparent, and
//                     reliable.
//                   </span>
//                 </div>
//                 <div className="flex items-start">
//                   <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                   <span className="text-gray-100">
//                     To guide investors, NRIs, and channel partners with expert
//                     insights and trusted updates.
//                   </span>
//                 </div>
//                 <div className="flex items-start">
//                   <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                   <span className="text-gray-100">
//                     To deliver long-term value through verified information on
//                     premium projects in India's fastest-growing smart city.
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8 mb-8">
//             {/* Vision */}
//             <div className="bg-[#151f28] p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
//               <div className="flex items-center mb-6">
//                 <Eye className="h-8 w-8 text-white mr-3" />
//                 <h3 className="text-2xl font-bold">Our Vision</h3>
//               </div>
//               <p className="text-white/90 leading-relaxed text-lg">
//                 To become the most reliable information hub for Dholera Smart
//                 City – empowering buyers, investors, and businesses with
//                 knowledge-driven decisions that shape a smarter tomorrow.
//               </p>
//             </div>

//             {/* Journey */}
//             <div className="bg-[#151f28] p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
//               <div className="flex items-center mb-6">
//                 <MapPin className="h-8 w-8 text-white mr-3" />
//                 <h3 className="text-2xl font-bold">Our Journey</h3>
//               </div>
//               <p className="text-white/90 leading-relaxed">
//                 Born with a vision to provide clarity and authenticity,{" "}
//                 <strong className="text-[#d3b36b]">Dholera Times</strong> has
//                 grown into a trusted platform for real estate seekers. From
//                 ground reports and project updates to government notifications
//                 and market insights, our journey is built on credibility and
//                 continuous growth alongside Dholera Smart City's progress.
//               </p>
//             </div>
//           </div>

//           {/* Promise */}
//           <div className="border-2 border-[#d3b36b] p-8 rounded-2xl bg-[#d3b36b] shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center mb-6">
//               <div className="bg-[#151f28]/10 p-3 rounded-xl mr-4">
//                 <Shield className="h-8 w-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white">Our Promise</h3>
//             </div>
//             <p className="text-white mb-6 text-lg">
//               At <strong className="text-white">Dholera Times</strong>, we
//               promise to:
//             </p>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="flex items-start">
//                 <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                 <span className="text-white">
//                   Deliver verified updates you can trust.
//                 </span>
//               </div>
//               <div className="flex items-start">
//                 <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                 <span className="text-white">
//                   Provide transparent guidance with no hidden agendas.
//                 </span>
//               </div>
//               <div className="flex items-start">
//                 <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                 <span className="text-white">
//                   Keep you informed with real-time growth insights.
//                 </span>
//               </div>
//               <div className="flex items-start">
//                 <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
//                 <span className="text-white">
//                   Stand as your long-term partner in every investment decision.
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
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

import hero from "@/assets/consultation-image.webp";

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

            bg-black
          "
        >
          <div
            className="
              relative

              h-[210px]
              w-full

              min-[414px]:h-[230px]

              sm:h-[260px]

              md:h-[300px]

              lg:h-[330px]

              xl:h-[360px]
            "
          >
            <Image
              src={hero}
              alt="About Dholera Times"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="
                object-cover
                object-center
              "
            />
          </div>
        </section>

        {/* ===================================================
            ABOUT HERO
        ==================================================== */}

        <section
          className="
            relative

            overflow-hidden

            border-b
            border-black/10

            bg-white

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-16

            lg:px-10
            lg:py-20
          "
        >
          {/* BACKGROUND DECORATION */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute

              -right-32
              -top-40

              h-[440px]
              w-[440px]

              rounded-full

              bg-[#EC1C40]/[0.055]

              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              bottom-[-180px]
              left-[-180px]

              h-[400px]
              w-[400px]

              rounded-full

              bg-black/[0.025]

              blur-3xl
            "
          />

          <div
            className="
              relative

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

                lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]
                lg:items-center
                lg:gap-16
              "
            >
              {/* LEFT */}

              <div
                className="
                  max-w-4xl
                "
              >
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase

                    tracking-[0.16em]

                    text-[#EC1C40]

                    sm:text-[12px]
                  "
                >
                  Dholera Matlab Dholera Times
                </p>

                <h1
                  className="
                    mt-4

                    text-[38px]
                    font-bold
                    leading-[1.05]

                    tracking-[-0.045em]

                    text-black

                    min-[414px]:text-[42px]

                    sm:text-[48px]

                    md:text-[56px]

                    lg:text-[64px]
                  "
                >
                  About{" "}

                  <span
                    className="
                      text-[#EC1C40]
                    "
                  >
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

              {/* RIGHT — FOCUS GRID */}

              <div
                className="
                  grid
                  grid-cols-1

                  gap-3

                  min-[480px]:grid-cols-2
                "
              >
                {focusItems.map(
                  (
                    {
                      title,
                      icon: Icon,
                    },
                    index,
                  ) => (
                    <article
                      key={
                        title
                      }
                      className="
                        group

                        relative

                        min-h-[118px]

                        overflow-hidden

                        rounded-2xl

                        border
                        border-black/10

                        bg-white

                        p-4

                        shadow-[0_12px_38px_-32px_rgba(0,0,0,0.30)]

                        transition-[border-color,transform,box-shadow]
                        duration-300

                        md:hover:-translate-y-1
                        md:hover:border-[#EC1C40]/30
                        md:hover:shadow-[0_18px_45px_-32px_rgba(0,0,0,0.38)]

                        sm:p-5

                        motion-reduce:transform-none
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between

                          gap-4
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

                        <span
                          className="
                            text-[10px]
                            font-bold

                            tracking-[0.12em]

                            text-black/25
                          "
                        >
                          {String(
                            index +
                              1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </div>

                      <h2
                        className="
                          mt-4

                          text-[15px]
                          font-bold
                          leading-6

                          text-black

                          sm:text-[16px]
                        "
                      >
                        {title}
                      </h2>
                    </article>
                  ),
                )}
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
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-16

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
            border-y
            border-black/10

            bg-white

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-16

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

              gap-4

              lg:grid-cols-2
              lg:gap-5
            "
          >
            {/* MISSION */}

            <article
              className="
                relative

                overflow-hidden

                rounded-[24px]

                bg-black

                p-6

                text-white

                sm:p-8

                lg:p-10
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  -right-24
                  -top-24

                  h-[220px]
                  w-[220px]

                  rounded-full

                  bg-[#EC1C40]/20

                  blur-3xl
                "
              />

              <div
                className="
                  relative
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

                    bg-white/10
                  "
                >
                  <Target
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

                <h2
                  className="
                    mt-6

                    text-[28px]
                    font-bold

                    tracking-[-0.03em]

                    text-white

                    sm:text-[32px]
                  "
                >
                  Our{" "}

                  <span
                    className="
                      text-[#EC1C40]
                    "
                  >
                    Mission
                  </span>
                </h2>

                <p
                  className="
                    mt-5

                    text-[15px]
                    leading-7

                    text-white/70

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
              </div>
            </article>

            {/* VISION */}

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
                <Eye
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

              <h2
                className="
                  mt-6

                  text-[28px]
                  font-bold

                  tracking-[-0.03em]

                  text-black

                  sm:text-[32px]
                "
              >
                Our{" "}

                <span
                  className="
                    text-[#EC1C40]
                  "
                >
                  Vision
                </span>
              </h2>

              <p
                className="
                  mt-5

                  text-[15px]
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
          className="
            relative

            overflow-hidden

            bg-black

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-16

            lg:px-10
            lg:py-20
          "
        >
          {/* SUBTLE BACKGROUND DETAIL */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute

              -right-24
              -top-28

              h-[320px]
              w-[320px]

              rounded-full

              bg-[#EC1C40]/10

              blur-3xl
            "
          />

          <div
            className="
              relative

              mx-auto
              w-full
              max-w-7xl
            "
          >
            <h2
              className="
                text-[30px]
                font-bold
                leading-[1.1]

                tracking-[-0.035em]

                text-white

                sm:text-[34px]

                md:text-[38px]
              "
            >
              Our Promise
            </h2>

            <p
              className="
                mt-3

                text-[15px]
                leading-7

                text-white/60

                sm:text-[16px]
              "
            >
              At Dholera Times, we promise to:
            </p>

            {/* PROMISE CARDS */}

            <div
              className="
                mt-8

                grid
                grid-cols-1

                gap-3

                sm:grid-cols-2
                sm:gap-4

                lg:grid-cols-4
              "
            >
              {promiseItems.map(
                (
                  item,
                  index,
                ) => (
                  <article
                    key={
                      item
                    }
                    className="
                      group

                      relative

                      min-h-[150px]

                      overflow-hidden

                      rounded-2xl

                      border
                      border-white/10

                      bg-white/[0.045]

                      p-5

                      transition-[background-color,border-color,transform]
                      duration-300

                      hover:border-[#EC1C40]/35
                      hover:bg-white/[0.065]

                      md:hover:-translate-y-1

                      sm:min-h-[160px]
                      sm:p-6

                      motion-reduce:transform-none
                    "
                  >
                    {/* TOP ACCENT */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-x-0
                        top-0

                        h-[2px]

                        bg-[#EC1C40]

                        opacity-70

                        transition-opacity
                        duration-300

                        group-hover:opacity-100
                      "
                    />

                    <div
                      className="
                        flex
                        items-center
                        justify-between

                        gap-4
                      "
                    >
                      {/* ICON */}

                      <span
                        className="
                          flex
                          h-9
                          w-9

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[#EC1C40]/10
                        "
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="
                            h-[19px]
                            w-[19px]

                            stroke-[#EC1C40]
                          "
                          strokeWidth={
                            2
                          }
                        />
                      </span>

                      {/* NUMBER */}

                      <span
                        className="
                          text-[11px]
                          font-bold

                          tracking-[0.1em]

                          text-white/25
                        "
                      >
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>
                    </div>

                    <p
                      className="
                        mt-5

                        text-[15px]
                        font-semibold
                        leading-6

                        text-white

                        sm:text-[16px]
                      "
                    >
                      {item}
                    </p>
                  </article>
                ),
              )}
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
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-16

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
                    key={
                      title
                    }
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

                      md:hover:-translate-y-1
                      md:hover:border-[#EC1C40]/30
                      md:hover:shadow-[0_20px_46px_-34px_rgba(0,0,0,0.4)]

                      sm:p-6

                      motion-reduce:transform-none
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

                      <span
                        className="
                          text-[11px]
                          font-bold

                          tracking-[0.1em]

                          text-black/25
                        "
                      >
                        {String(
                          index +
                            1,
                        ).padStart(
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
            FAQ
        ==================================================== */}

        <section
          className="
            border-t
            border-black/10

            bg-black/[0.025]

            px-4
            py-12

            min-[414px]:px-5

            sm:px-6
            sm:py-14

            md:px-8
            md:py-16

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

              gap-8

              lg:grid-cols-[280px_minmax(0,1fr)]
              lg:gap-12
            "
          >
            {/* FAQ HEADING */}

            <div>
              <h2
                className="
                  text-[30px]
                  font-bold
                  leading-[1.12]

                  tracking-[-0.035em]

                  text-black

                  sm:text-[34px]

                  lg:text-[40px]
                "
              >
                Frequently Asked{" "}

                <span className="text-[#EC1C40]">
                  Questions
                </span>
              </h2>
            </div>

            {/* FAQ ACCORDION */}

            <div
              className="
                overflow-hidden

                rounded-[22px]

                border
                border-black/10

                bg-white
              "
            >
              {faqItems.map(
                ({
                  question,
                  answer,
                }) => (
                  <details
                    key={
                      question
                    }
                    className="
                      group

                      border-b
                      border-black/10

                      last:border-b-0
                    "
                  >
                    <summary
                      className="
                        flex
                        min-h-[76px]

                        cursor-pointer
                        list-none

                        items-center
                        justify-between

                        gap-4

                        px-4
                        py-4

                        [&::-webkit-details-marker]:hidden

                        min-[414px]:px-5

                        sm:px-6

                        lg:px-7
                      "
                    >
                      <span
                        className="
                          text-[15px]
                          font-semibold
                          leading-6

                          text-black

                          sm:text-[16px]
                        "
                      >
                        {question}
                      </span>

                      {/* PLUS / MINUS */}

                      <span
                        className="
                          relative

                          flex
                          h-9
                          w-9

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-black/10

                          bg-[#EC1C40]/5
                        "
                      >
                        <span
                          className="
                            absolute

                            h-[2px]
                            w-3.5

                            rounded-full

                            bg-[#EC1C40]
                          "
                        />

                        <span
                          className="
                            absolute

                            h-3.5
                            w-[2px]

                            rounded-full

                            bg-[#EC1C40]

                            transition-transform
                            duration-200

                            group-open:scale-y-0
                          "
                        />
                      </span>
                    </summary>

                    <div
                      className="
                        px-4
                        pb-5

                        min-[414px]:px-5

                        sm:px-6
                        sm:pb-6

                        lg:px-7
                      "
                    >
                      <p
                        className="
                          border-t
                          border-black/10

                          pt-4

                          text-[15px]
                          leading-7

                          text-black/65

                          sm:text-[16px]
                        "
                      >
                        {answer}
                      </p>
                    </div>
                  </details>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}