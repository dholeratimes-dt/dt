// import {
//   getblogs,
//   getProjectInfo,
//   getUpdates,
//   getNews,
// } from "@/sanity/lib/api";
// import hero from "@/assets/DholeraSirhero.webp";
// import Image from "next/image";
// import BlogCard from "./BlogCard";
// import TrendingBlogItem from "./TrendingBlog";
// import Link from "next/link";
// import LeadFormSlug from "../dholera-updates/latest-updates/[slug]/LeadForm";
// import { FaPhone, FaWhatsapp } from "react-icons/fa";
// import BulkLand from "../components/BulkLandForm";
// import BlogSlider from "./BlogSlider";

// import MegaProjectsSection from "./MegaProject";
// import WhyInvestDholera from "./WhyInvest";
// import DholeraSirAtGlance from "./DholeraGlance";

// export async function generateMetadata() {
//   return {
//     title: "Dholera SIR: Smart City, Projects & Updates | Dholera Times",

//     description:
//       "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",

//     keywords: [
//       "Dholera SIR",
//       "Dholera Smart City",
//       "Dholera Special Investment Region",
//       "Dholera SIR Gujarat",
//       "Dholera Smart City project",
//       "Dholera development",
//       "Dholera infrastructure",
//       "Dholera Activation Area",
//       "Dholera master plan",
//       "Dholera latest updates",
//     ],

//     alternates: {
//       canonical: "https://www.dholeratimes.com/dholera-sir",
//     },

//     robots: {
//       index: true,
//       follow: true,
//     },

//     authors: [
//       {
//         name: "Dholera Times",
//       },
//     ],

//     openGraph: {
//       title: "Dholera SIR: Smart City, Projects & Updates | Dholera Times",
//       description:
//         "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",
//       url: "https://www.dholeratimes.com/dholera-sir",
//       siteName: "Dholera Times",
//       type: "website",
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: "Dholera SIR: Smart City, Projects & Updates | Dholera Times",
//       description:
//         "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",
//     },
//   };
// }

// export default async function BlogsPage() {
//   // Fetch data and handle potential errors
//   let posts = [];
//   try {
//     const postsData = await getProjectInfo();
//     posts = Array.isArray(postsData) ? postsData : [];

//     // Sort by publishedAt date (newest first)
//     posts.sort((a, b) => {
//       const dateA = new Date(a.publishedAt || a._createdAt || 0);
//       const dateB = new Date(b.publishedAt || b._createdAt || 0);
//       return dateB - dateA; // Descending order (newest first)
//     });

//     console.log("Posts data fetched:", posts.length);
//   } catch (error) {
//     console.error("Error fetching blog posts:", error);
//   }

//   // Add error handling for post data
//   const safePosts = posts.map((post) => ({
//     ...post,
//     author: post.author || "BookMyAssets",
//     mainImage: post.mainImage || null,
//     slug: post.slug?.current
//       ? { current: post.slug.current }
//       : { current: "#" },
//   }));

//   // Fetch news for sidebar (changed from getUpdates to getnews)
//   let trendingBlogs = [];
//   try {
//     const newsData = await getNews();
//     trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
//     console.log("News data fetched:", trendingBlogs.length);
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     // Fallback to getUpdates if getnews fails
//     try {
//       const updatesData = await getUpdates();
//       trendingBlogs = Array.isArray(updatesData) ? updatesData.slice(0, 5) : [];
//       console.log("Fallback to updates data:", trendingBlogs.length);
//     } catch (fallbackError) {
//       console.error("Error fetching updates as fallback:", fallbackError);
//     }
//   }

//   const whatsappMessage =
//     "Hello Dholera Times, I am interested in buying a plot in Dholera. Please share the available details.";

//   const whatsappLink = `https://wa.me/919958993549?text=${encodeURIComponent(
//     whatsappMessage,
//   )}`;


//   return (
//     <>
//       {/* Hero Section */}
//       <div className="bg-black text-white">
//         <div className="md:relative md:h-[65vh] overflow-hidden">
//           <Image
//             src={hero}
//             alt="Dholera SIR Aerial View"
//             className="w-full md:h-full h-auto object-contain md:object-cover"
//             priority
//             quality={85}
//             sizes="100vw"
//           />
//           <div className="absolute inset-0 md:bg-black/60"></div>
//           <div className="absolute inset-0 md:flex md:items-center md:justify-center">
//             <div className="text-center">
//               <h1 className="text-2xl md:text-5xl font-bold text-white">
//                 About Dholera SIR
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* What Is Dholera Smart City Section */}
//       <section
//         aria-labelledby="about-dholera-sir-heading"
//         className="
//         w-full
//         bg-[#FFFBFC]
//         px-4
//         py-10

//         min-[414px]:px-6
//         min-[414px]:py-11

//         sm:py-12

//         md:px-8
//         md:py-14

//         lg:py-16
//         "
//       >
//         <div className="mx-auto w-full max-w-7xl">
//           {/* Heading */}
//           <h2
//             id="about-dholera-sir-heading"
//             className="
//           text-[28px]
//           font-bold
//           leading-[1.2]
//           tracking-[-0.025em]
//           text-[#39252E]

//           sm:text-[30px]

//           md:text-[34px]

//           lg:text-[36px]
//         "
//           >
//             About <span className="text-[#8F2946]">Dholera SIR</span>
//           </h2>

//           {/* Content */}
//           <p
//             className="
//             mt-5
//             max-w-7xl

//             text-[16px]
//             font-normal
//             leading-[1.8]
//             text-[#5C4851]

//             sm:mt-6
//             sm:text-[17px]
//             sm:leading-[1.85]

//             md:text-[17px]

//             lg:text-[18px]
//             lg:leading-[1.85]
//           "
//           >
//             Dholera Special Investment Region (Dholera SIR) is a planned
//             greenfield industrial city in Gujarat and the largest node of the
//             Delhi-Mumbai Industrial Corridor (DMIC). Spread across approximately
//             920 sq. km, Dholera SIR is being developed with industrial land,
//             modern infrastructure, residential and commercial areas, utilities
//             and multimodal connectivity.
//           </p>
//         </div>
//       </section>

//       <DholeraSirAtGlance />

//       {/* <BulkLand
//         title="Invest in Registry-Ready Plots in Dholera Starting from ₹10 Lakh"
//         buttonName="Get A Call Back"
//         pageName="aboutSir"
//       /> */}

//       {/* Bottom CTA Section */}
//       <div
//         className="
//           w-full

//           bg-gradient-to-r
//           from-[#39252E]
//           via-[#742039]
//           to-[#8F2946]

//           px-4
//           py-6
//           pb-8

//           text-white

//           min-[414px]:px-6
//           min-[414px]:py-11

//           sm:py-12

//           md:px-8
//           md:py-12

//           lg:py-12
//         "
//       >
//         <div
//           className="
//             mx-auto
//             w-full
//             max-w-7xl

//             text-center
//           "
//         >
//           <h2
//             className="
//               mx-auto
//               max-w-3xl

//               text-[clamp(1.75rem,2.5vw,2.375rem)]

//               font-semibold
//               leading-[1.2]
//               tracking-[-0.025em]

//               text-white
//             "
//           >
//             Stay Updated with Dholera SIR
//           </h2>

//           <p
//             className="
//               mx-auto

//               mt-4
//               max-w-2xl

//               text-[15px]
//               font-normal
//               leading-7

//               text-[#F1DDE3]

//               sm:mt-5
//               sm:text-[16px]

//               md:text-[17px]
//             "
//           >
//             Subscribe to our newsletter for the latest dholera investment
//             opportunities and updates.
//           </p>

//           <Link
//             href="/contact"
//             className="
//               mt-6

//               inline-flex
//               min-h-[48px]

//               items-center
//               justify-center

//               rounded-lg

//               bg-white

//               px-6
//               py-3

//               text-[15px]
//               font-semibold
//               leading-6

//               text-[#8F2946]

//               shadow-[0_10px_28px_rgba(57,37,46,0.22)]

//               transition-[background-color,color,transform,box-shadow]
//               duration-200

//               hover:-translate-y-0.5
//               hover:bg-[#F7EBEF]
//               hover:text-[#742039]
//               hover:shadow-[0_14px_32px_rgba(57,37,46,0.28)]

//               active:translate-y-0

//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-white
//               focus-visible:ring-offset-2
//               focus-visible:ring-offset-[#742039]

//               sm:mt-7
//               sm:px-7

//               md:min-h-[50px]
//               md:text-[16px]

//               motion-reduce:transform-none
//               motion-reduce:transition-none
//             "
//           >
//             Contact Us
//           </Link>
//         </div>
//       </div>

//       {/* Mega Projects Section */}
//       <MegaProjectsSection />

//       {/* Why Invest in Dholera Section */}

//       <WhyInvestDholera />

//       <div
//         className="
//           w-full

//           px-4

//           min-[414px]:px-6
//           md:px-8
//         "
//       >
//         <div className="mx-auto w-full max-w-7xl">
//           <div
//             className="
//               group
//               relative
//               overflow-hidden

//               rounded-2xl

//               border
//               border-[#EAD9DF]

//               bg-white

//               px-5
//               py-6

//               shadow-[0_8px_28px_rgba(57,37,46,0.05)]

//               transition-[border-color,box-shadow]
//               duration-300

//               hover:border-[#DCA9B8]
//               hover:shadow-[0_16px_40px_rgba(143,41,70,0.09)]

//               sm:px-6
//               sm:py-7

//               md:px-8
//               md:py-8

//               lg:px-10
//               lg:py-9

//               motion-reduce:transition-none
//             "
//           >
//             {/* Top accent */}
//             <div
//               aria-hidden="true"
//               className="
//                 absolute
//                 inset-x-0
//                 top-0

//                 h-[3px]

//                 origin-left
//                 scale-x-[0.22]

//                 bg-gradient-to-r
//                 from-[#8F2946]
//                 via-[#B95672]
//                 to-[#E0A4B5]

//                 transition-transform
//                 duration-500
//                 ease-out

//                 group-hover:scale-x-100

//                 motion-reduce:transition-none
//               "
//             />

//             <div
//               className="
//                 flex
//                 flex-col

//                 items-center
//                 justify-between

//                 gap-6

//                 lg:flex-row
//                 lg:gap-10
//               "
//             >
//               {/* ==================================================
//                   CONTENT
//               =================================================== */}

//               <div
//                 className="
//                   min-w-0
//                   flex-1

//                   text-center

//                   lg:text-left
//                 "
//               >
//                 <h2
//                   className="
//                     text-[24px]
//                     font-semibold
//                     leading-[1.25]

//                     tracking-[-0.02em]

//                     text-[#39252E]

//                     sm:text-[26px]

//                     lg:text-[28px]
//                   "
//                 >
//                   Ready to Invest in{" "}
//                   <span className="text-[#8F2946]">Dholera SIR?</span>
//                 </h2>

//                 <p
//                   className="
//                     mx-auto
//                     mt-2.5

//                     max-w-2xl

//                     text-[15px]
//                     font-normal
//                     leading-7

//                     text-[#68565E]

//                     sm:text-[16px]

//                     lg:mx-0
//                     lg:mt-3
//                     lg:text-[17px]
//                   "
//                 >
//                   Get expert guidance and exclusive investment opportunities
//                 </p>
//               </div>

//               {/* ==================================================
//                   ACTIONS
//               =================================================== */}

//               <div
//                 className="
//                   flex
//                   w-full
//                   flex-col

//                   gap-3

//                   sm:w-auto
//                   sm:flex-row
//                   sm:gap-4

//                   lg:shrink-0
//                 "
//               >
//                 {/* CALL */}
//                 <Link
//                   href="tel:+919958993549"
//                   className="
//                     inline-flex
//                     min-h-[50px]
//                     w-full

//                     items-center
//                     justify-center
//                     gap-2.5

//                     rounded-xl

//                     bg-[#8F2946]

//                     px-6
//                     py-3

//                     text-[15px]
//                     font-semibold
//                     leading-6

//                     text-white

//                     shadow-[0_8px_20px_rgba(143,41,70,0.18)]

//                     transition-[background-color,transform,box-shadow]
//                     duration-200

//                     hover:-translate-y-0.5
//                     hover:bg-[#742039]
//                     hover:shadow-[0_12px_26px_rgba(116,32,57,0.24)]

//                     active:translate-y-0

//                     focus-visible:outline-none
//                     focus-visible:ring-2
//                     focus-visible:ring-[#8F2946]
//                     focus-visible:ring-offset-2

//                     sm:w-auto
//                     sm:min-w-[150px]

//                     motion-reduce:transform-none
//                     motion-reduce:transition-none
//                   "
//                 >
//                   <FaPhone
//                     aria-hidden="true"
//                     className="
//                       shrink-0
//                       rotate-90

//                       text-[15px]
//                     "
//                   />

//                   <span>Call Now</span>
//                 </Link>

//                 {/* WHATSAPP */}

//                 <Link
//                   href={whatsappLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="
//                       inline-flex
//                       min-h-[50px]
//                       w-full

//                       items-center
//                       justify-center
//                       gap-2.5

//                       rounded-xl

//                       border
//                       border-[#8F2946]/50

//                       bg-[#F7EBEF]

//                       px-6
//                       py-3

//                       text-[15px]
//                       font-semibold
//                       leading-6

//                       text-[#8F2946]

//                       shadow-[0_4px_14px_rgba(143,41,70,0.05)]

//                       transition-[background-color,border-color,color,transform,box-shadow]
//                       duration-200
//                       ease-out

//                       active:bg-[#742039]
//                       active:text-white

//                       focus-visible:outline-none
//                       focus-visible:ring-2
//                       focus-visible:ring-[#8F2946]
//                       focus-visible:ring-offset-2

//                       sm:w-auto
//                       sm:min-w-[160px]

//                       md:hover:-translate-y-0.5
//                       md:hover:border-[#8F2946]
//                       md:hover:bg-[#8F2946]
//                       md:hover:text-white
//                       md:hover:shadow-[0_10px_24px_rgba(143,41,70,0.16)]

//                       motion-reduce:transform-none
//                       motion-reduce:transition-none
//                     "
//                 >
//                   <FaWhatsapp
//                     aria-hidden="true"
//                     className="
//                         shrink-0
//                         text-[19px]
//                       "
//                   />

//                   <span>WhatsApp Us</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content — Sidebar + Blog Grid */}
//       <div className="bg-gray-50 px-4 py-12">
//         <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
//           {/* Left Sidebar */}

//           {/* Blog Grid */}
//         </div>
//         <BlogSlider posts={safePosts} />
//       </div>
//     </>
//   );
// }



import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  FileText,
  Globe2,
  Landmark,
  Map,
  MapPin,
  Plane,
  Route,
  Ship,
  Sun,
  Train,
  Zap,
} from "lucide-react";

import { getNews } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

import hero from "@/assets/DholeraSirhero.webp";

/* ============================================================
   SEO
============================================================ */

export const metadata = {
  title: {
    absolute:
      "Dholera SIR: Smart City, Projects & Updates | Dholera Times",
  },

  description:
    "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",

  keywords: [
    "Dholera SIR",
    "Dholera Smart City",
    "Dholera Special Investment Region",
    "Dholera SIR Gujarat",
    "Dholera Smart City project",
    "Dholera development",
    "Dholera infrastructure",
    "Dholera Activation Area",
    "Dholera master plan",
    "Dholera latest updates",
  ],

  alternates: {
    canonical:
      "https://www.dholeratimes.com/dholera-sir",
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
      "Dholera SIR: Smart City, Projects & Updates | Dholera Times",

    description:
      "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",

    url:
      "https://www.dholeratimes.com/dholera-sir",

    siteName:
      "Dholera Times",

    type:
      "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Dholera SIR: Smart City, Projects & Updates | Dholera Times",

    description:
      "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",
  },
};

/* ============================================================
   DHOLERA SIR AT A GLANCE
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
    value:
      "Key node of the Delhi-Mumbai Industrial Corridor",
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
    icon: Globe2,
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
    icon: Building2,
  },
];

/* ============================================================
   INFRASTRUCTURE
============================================================ */

const infrastructureItems = [
  {
    title:
      "Ahmedabad-Dholera Expressway",

    description:
      "109 km expressway connecting Ahmedabad and Dholera.",

    icon:
      Route,
  },
  {
    title:
      "Dholera International Airport",

    description:
      "Planned airport for Dholera’s passenger and cargo connectivity.",

    icon:
      Plane,
  },
  {
    title:
      "Ahmedabad–Dholera Rail Project",

    description:
      "Semi-high-speed rail link connecting Ahmedabad and Dholera.",

    icon:
      Train,
  },
  {
    title:
      "Dholera Solar Park",

    description:
      "Large-scale solar energy infrastructure supporting clean power.",

    icon:
      Sun,
  },
  {
    title:
      "Dedicated Freight Corridor (DFC)",

    description:
      "Freight rail connectivity supporting industrial logistics.",

    icon:
      Train,
  },
  {
    title:
      "Tata Semiconductor Plant",

    description:
      "Major semiconductor manufacturing project in Dholera SIR.",

    icon:
      Cpu,
  },
  {
    title:
      "Smart Infrastructure",

    description:
      "Modern roads, utilities, ICT and digital city systems.",

    icon:
      Zap,
  },
  {
    title:
      "Sea Port",

    description:
      "Planned port connectivity supporting Dholera’s trade and logistics.",

    icon:
      Ship,
  },
];

/* ============================================================
   FAQ
============================================================ */

const faqItems = [
  {
    question:
      "What is Dholera SIR?",

    answer:
      "Dholera SIR is the Dholera Special Investment Region, a planned greenfield industrial city in Gujarat and the largest node of the Delhi-Mumbai Industrial Corridor.",
  },
  {
    question:
      "How big is Dholera SIR?",

    answer:
      "Dholera SIR covers approximately 920 sq. km, while the initial Activation Area covers about 22.54 sq. km.",
  },
  {
    question:
      "What is the Dholera Activation Area?",

    answer:
      "The Activation Area is the first major development zone of Dholera SIR, where trunk infrastructure such as roads and utilities has been developed.",
  },
  {
    question:
      "Is Dholera SIR fully developed?",

    answer:
      "No. Dholera SIR is being developed in phases. Some infrastructure has been completed, while other industrial, airport, rail and urban projects are still under development or at different stages.",
  },
  {
    question:
      "Which major companies are investing in Dholera?",

    answer:
      "One of the largest projects is the Tata Electronics semiconductor fab, which is currently being developed in Dholera. Other industrial and supply-chain developments are also emerging around the semiconductor ecosystem.",
  },
  {
    question:
      "Is Dholera Airport operational?",

    answer:
      "As of the latest official July 2026 update, Dholera International Airport was still under construction and development.",
  },
  {
    question:
      "Can I buy residential plots in Dholera SIR?",

    answer:
      "Property is available across the wider Dholera region, but buyers should verify whether a specific plot is inside Dholera SIR or near Dholera SIR. The location, survey number, land use and approvals should be checked before purchase.",
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
   DATE
============================================================ */

function formatDate(
  dateString,
) {
  if (!dateString) {
    return "";
  }

  const date =
    new Date(
      dateString,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      year:
        "numeric",

      month:
        "short",

      day:
        "numeric",
    },
  );
}

/* ============================================================
   LATEST UPDATE CARD
============================================================ */

function UpdateCard({
  post,
}) {
  const href =
    post.slug?.current
      ? `/dholera-updates/latest-updates/${post.slug.current}`
      : "/dholera-updates/latest-updates";

  return (
    <article
      className="
        group

        flex
        min-w-0
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-black/10

        bg-white

        shadow-[0_10px_34px_-30px_rgba(0,0,0,0.4)]

        transition-[transform,border-color,box-shadow]
        duration-300

        md:hover:-translate-y-1
        md:hover:border-[#EC1C40]/30
        md:hover:shadow-[0_22px_48px_-32px_rgba(0,0,0,0.42)]

        motion-reduce:transform-none
      "
    >
      <Link
        href={href}
        className="
          flex
          h-full
          flex-col

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#EC1C40]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative

            aspect-[16/9]

            w-full

            overflow-hidden

            bg-black/[0.04]
          "
        >
          {post.mainImage ? (
            <Image
              src={urlFor(
                post.mainImage,
              )
                .width(800)
                .height(450)
                .url()}
              alt={
                post.mainImage
                  ?.alt ||
                post.title ||
                "Dholera SIR update"
              }
              fill
              sizes="
                (max-width: 639px) calc(100vw - 32px),
                (max-width: 1023px) 50vw,
                33vw
              "
              className="
                object-cover

                transition-transform
                duration-500

                md:group-hover:scale-[1.035]

                motion-reduce:transform-none
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full

                items-center
                justify-center

                bg-[#EC1C40]/5
              "
            >
              <span
                className="
                  text-[13px]

                  text-black/45
                "
              >
                Dholera SIR
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}

        <div
          className="
            flex
            flex-1
            flex-col

            p-4

            sm:p-5
          "
        >
          <h3
            className="
              line-clamp-2

              text-[17px]
              font-bold
              leading-6

              tracking-[-0.015em]

              text-black

              transition-colors
              duration-200

              md:group-hover:text-[#EC1C40]

              sm:text-[18px]
              sm:leading-7
            "
          >
            {post.title}
          </h3>

          <div
            className="
              mt-5

              flex
              min-h-[46px]

              items-end
              justify-between

              gap-3

              border-t
              border-black/10

              pt-3
            "
          >
            <p
              className="
                text-[13px]

                text-black/50
              "
            >
              {formatDate(
                post.publishedAt ||
                  post._createdAt,
              )}
            </p>

            <span
              className="
                inline-flex

                shrink-0

                items-center

                gap-1.5

                text-[13px]
                font-semibold

                text-[#EC1C40]

                sm:text-[14px]
              "
            >
              Read More

              <ArrowRight
                aria-hidden="true"
                className="
                  h-4
                  w-4

                  shrink-0

                  stroke-[#EC1C40]
                "
                strokeWidth={2}
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default async function DholeraSirPage() {
  /* =========================================================
     LATEST NEWS
  ========================================================= */

  let latestPosts = [];

  try {
    const news =
      await getNews();

    latestPosts =
      Array.isArray(
        news,
      )
        ? [...news]
            .sort(
              (
                a,
                b,
              ) => {
                const aDate =
                  new Date(
                    a.publishedAt ||
                      a._createdAt ||
                      0,
                  );

                const bDate =
                  new Date(
                    b.publishedAt ||
                      b._createdAt ||
                      0,
                  );

                return (
                  bDate -
                  aDate
                );
              },
            )
            .slice(
              0,
              6,
            )
        : [];
  } catch (error) {
    console.error(
      "Error fetching Dholera updates:",
      error,
    );
  }

  return (
    <>
      {/* =====================================================
          FAQ SCHEMA
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
            HERO
        ==================================================== */}

        <section
          className="
            relative

            min-h-[500px]

            overflow-hidden

            bg-black

            sm:min-h-[540px]

            md:min-h-[570px]

            lg:min-h-[620px]
          "
        >
          <Image
            src={hero}
            alt="Dholera SIR Smart City"
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

              bg-black/60

              lg:bg-gradient-to-r
              lg:from-black/90
              lg:via-black/65
              lg:to-black/20
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              bottom-0

              h-[220px]

              bg-gradient-to-t
              from-black/70
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
              min-h-[500px]
              w-full
              max-w-7xl

              items-end

              px-4
              pb-10
              pt-24

              min-[414px]:px-5

              sm:min-h-[540px]
              sm:px-6
              sm:pb-12

              md:min-h-[570px]
              md:px-8

              lg:min-h-[620px]
              lg:items-center
              lg:px-10
              lg:pb-16
            "
          >
            <div
              className="
                max-w-4xl
              "
            >
              <h1
                className="
                  text-[36px]
                  font-bold
                  leading-[1.07]

                  tracking-[-0.04em]

                  text-white

                  min-[414px]:text-[40px]

                  sm:text-[46px]

                  md:text-[54px]

                  lg:text-[62px]
                "
              >
                About{" "}

                <span
                  className="
                    text-[#EC1C40]
                  "
                >
                  Dholera SIR
                </span>
              </h1>

              <p
                className="
                  mt-6

                  max-w-3xl

                  text-[15px]
                  leading-7

                  text-white/75

                  sm:text-[16px]

                  lg:text-[17px]
                  lg:leading-8
                "
              >
                Dholera Special Investment Region
                (Dholera SIR) is a planned greenfield
                industrial city in Gujarat and the largest
                node of the Delhi-Mumbai Industrial Corridor
                (DMIC). Spread across approximately 920 sq.
                km, Dholera SIR is being developed with
                industrial land, modern infrastructure,
                residential and commercial areas, utilities
                and multimodal connectivity.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            DHOLERA SIR AT A GLANCE
        ==================================================== */}

        <section
          className="
            bg-white

            px-4
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

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
              Dholera SIR{" "}

              <span
                className="
                  text-[#EC1C40]
                "
              >
                at a Glance
              </span>
            </h2>

            {/* ===============================================
                FACT GRID
            ================================================ */}

            <div
              className="
                mt-7

                grid
                grid-cols-1

                gap-3

                min-[480px]:grid-cols-2

                md:gap-4

                lg:mt-9
                lg:grid-cols-4
              "
            >
              {glanceItems.map(
                ({
                  label,
                  value,
                  icon,
                }) => {
                  const Icon =
                    icon ||
                    Building2;

                  return (
                    <article
                      key={
                        label
                      }
                      className="
                        group

                        relative

                        min-h-[165px]

                        overflow-hidden

                        rounded-2xl

                        border
                        border-black/10

                        bg-white

                        p-5

                        transition-[border-color,box-shadow,transform]
                        duration-300

                        md:hover:-translate-y-1
                        md:hover:border-[#EC1C40]/30
                        md:hover:shadow-[0_18px_42px_-32px_rgba(0,0,0,0.35)]

                        sm:p-5

                        lg:min-h-[170px]

                        motion-reduce:transform-none
                      "
                    >
                      {/* ICON */}

                      <span
                        className="
                          flex
                          h-10
                          w-10

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

                            shrink-0

                            stroke-[#EC1C40]
                          "
                          strokeWidth={
                            2
                          }
                        />
                      </span>

                      {/* LABEL */}

                      <p
                        className="
                          mt-5

                          text-[11px]
                          font-bold
                          uppercase
                          leading-4

                          tracking-[0.1em]

                          text-black/40
                        "
                      >
                        {label}
                      </p>

                      {/* VALUE */}

                      <p
                        className="
                          mt-1.5

                          text-[15px]
                          font-semibold
                          leading-6

                          text-black

                          sm:text-[16px]
                        "
                      >
                        {value}
                      </p>
                    </article>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            SIR ACT
        ==================================================== */}

        <section
          className="
            border-y
            border-black/10

            bg-black/[0.025]

            px-4
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

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

                gap-7

                lg:grid-cols-[280px_minmax(0,1fr)]
                lg:items-center
                lg:gap-12
              "
            >
              <div>
                <span
                  className="
                    flex
                    h-12
                    w-12

                    items-center
                    justify-center

                    rounded-xl

                    bg-[#EC1C40]/10
                  "
                >
                  <FileText
                    aria-hidden="true"
                    className="
                      h-6
                      w-6

                      stroke-[#EC1C40]
                    "
                    strokeWidth={
                      2
                    }
                  />
                </span>

                <h2
                  className="
                    mt-5

                    text-[27px]
                    font-bold
                    leading-[1.18]

                    tracking-[-0.03em]

                    text-black

                    sm:text-[30px]
                  "
                >
                  What is the{" "}

                  <span
                    className="
                      text-[#EC1C40]
                    "
                  >
                    SIR Act 2009?
                  </span>
                </h2>
              </div>

              <div
                className="
                  rounded-[22px]

                  border
                  border-black/10

                  bg-white

                  p-5

                  shadow-[0_16px_48px_-38px_rgba(0,0,0,0.35)]

                  sm:p-7
                "
              >
                <p
                  className="
                    text-[15px]
                    leading-7

                    text-black/65

                    sm:text-[16px]
                    sm:leading-8
                  "
                >
                  The Gujarat Special Investment Region Act,
                  2009, commonly called the Gujarat SIR Act,
                  2009, is a law created by the Gujarat
                  Government to establish, develop, operate
                  and manage large Special Investment Regions
                  (SIRs) and industrial areas in Gujarat. The
                  Act came into force on 6 January 2009.
                  Dholera SIR is developed under this
                  framework as a planned industrial and
                  investment region, with infrastructure for
                  industries, businesses and urban
                  development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WHO IS DEVELOPING DHOLERA SIR
        ==================================================== */}

        <section
          className="
            bg-white

            px-4
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

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
              Who Is Developing{" "}

              <span
                className="
                  text-[#EC1C40]
                "
              >
                Dholera SIR?
              </span>
            </h2>

            <p
              className="
                mt-4

                max-w-4xl

                text-[15px]
                leading-7

                text-black/65

                sm:text-[16px]
              "
            >
              Dholera SIR is being developed through a
              partnership between the Government of India and
              the Government of Gujarat.
            </p>

            <div
              className="
                mt-7

                grid
                grid-cols-1

                gap-4

                md:grid-cols-2
              "
            >
              <article
                className="
                  rounded-2xl

                  bg-black

                  p-6

                  sm:p-7
                "
              >
                <Landmark
                  aria-hidden="true"
                  className="
                    h-7
                    w-7

                    stroke-[#EC1C40]
                  "
                  strokeWidth={
                    2
                  }
                />

                <h3
                  className="
                    mt-5

                    text-[20px]
                    font-bold
                    leading-7

                    text-white

                    sm:text-[22px]
                  "
                >
                  Dholera Industrial City Development Limited
                  (DICDL)
                </h3>

                <p
                  className="
                    mt-3

                    text-[14px]
                    leading-7

                    text-white/65

                    sm:text-[15px]
                  "
                >
                  Dholera Industrial City Development Limited
                  (DICDL) is the special purpose vehicle
                  responsible for developing the industrial
                  city.
                </p>
              </article>

              <article
                className="
                  rounded-2xl

                  border
                  border-black/10

                  bg-white

                  p-6

                  shadow-[0_14px_40px_-32px_rgba(0,0,0,0.35)]

                  sm:p-7
                "
              >
                <Building2
                  aria-hidden="true"
                  className="
                    h-7
                    w-7

                    stroke-[#EC1C40]
                  "
                  strokeWidth={
                    2
                  }
                />

                <h3
                  className="
                    mt-5

                    text-[20px]
                    font-bold
                    leading-7

                    text-black

                    sm:text-[22px]
                  "
                >
                  Dholera Special Investment Region
                  Development Authority (DSIRDA)
                </h3>

                <p
                  className="
                    mt-3

                    text-[14px]
                    leading-7

                    text-black/60

                    sm:text-[15px]
                  "
                >
                  The Dholera Special Investment Region
                  Development Authority (DSIRDA) has an
                  important role in planning and development
                  regulation.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ===================================================
            MAJOR INFRASTRUCTURE
        ==================================================== */}

        <section
          className="
            border-y
            border-black/10

            bg-black/[0.025]

            px-4
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

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
              Major Infrastructure{" "}

              <span
                className="
                  text-[#EC1C40]
                "
              >
                in Dholera
              </span>
            </h2>

            <p
              className="
                mt-4

                max-w-4xl

                text-[15px]
                leading-7

                text-black/65

                sm:text-[16px]
              "
            >
              Infrastructure is one of the main drivers
              behind the development of Dholera Smart City.
            </p>

            {/* INFRASTRUCTURE GRID */}

            <div
              className="
                mt-8

                grid
                grid-cols-1

                gap-4

                min-[520px]:grid-cols-2

                lg:grid-cols-4
              "
            >
              {infrastructureItems.map(
                (
                  {
                    title,
                    description,
                    icon,
                  },
                  index,
                ) => {
                  const Icon =
                    icon ||
                    Building2;

                  return (
                    <article
                      key={
                        title
                      }
                      className="
                        group

                        relative

                        min-h-[225px]

                        overflow-hidden

                        rounded-2xl

                        border
                        border-black/10

                        bg-white

                        p-5

                        transition-[transform,border-color,box-shadow]
                        duration-300

                        md:hover:-translate-y-1
                        md:hover:border-[#EC1C40]/30
                        md:hover:shadow-[0_20px_44px_-32px_rgba(0,0,0,0.38)]

                        sm:p-6

                        lg:min-h-[245px]

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

                            bg-[#EC1C40]/10
                          "
                        >
                          <Icon
                            aria-hidden="true"
                            className="
                              h-5
                              w-5

                              shrink-0

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

                            text-black/30
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

                          text-[17px]
                          font-bold
                          leading-6

                          text-black

                          sm:text-[18px]
                        "
                      >
                        {title}
                      </h3>

                      <p
                        className="
                          mt-2.5

                          text-[14px]
                          leading-6

                          text-black/55

                          sm:text-[15px]
                          sm:leading-7
                        "
                      >
                        {description}
                      </p>
                    </article>
                  );
                },
              )}
            </div>

            {/* ABCD + ACTIVATION AREA */}

            <div
              className="
                mt-4

                grid
                grid-cols-1

                gap-4

                md:grid-cols-2
              "
            >
              <article
                className="
                  rounded-2xl

                  bg-black

                  p-6

                  sm:p-7
                "
              >
                <p
                  className="
                    text-[12px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-[#EC1C40]
                  "
                >
                  ABCD Building
                </p>

                <h3
                  className="
                    mt-3

                    text-[23px]
                    font-bold
                    leading-[1.2]

                    tracking-[-0.025em]

                    text-white

                    sm:text-[26px]
                  "
                >
                  Dholera&apos;s Central Command Hub
                </h3>
              </article>

              <article
                className="
                  rounded-2xl

                  border
                  border-[#EC1C40]/20

                  bg-[#EC1C40]/5

                  p-6

                  sm:p-7
                "
              >
                <p
                  className="
                    text-[12px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-[#EC1C40]
                  "
                >
                  Activation Area
                </p>

                <h3
                  className="
                    mt-3

                    text-[23px]
                    font-bold
                    leading-[1.2]

                    tracking-[-0.025em]

                    text-black

                    sm:text-[26px]
                  "
                >
                  Dholera&apos;s First Operational Smart
                  Zone
                </h3>
              </article>
            </div>
          </div>
        </section>

        {/* ===================================================
            WHY INVEST
        ==================================================== */}

        <section
          className="
            bg-black

            px-4
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

            lg:px-10
            lg:py-16
          "
        >
          <div
            className="
              mx-auto

              grid
              w-full
              max-w-7xl

              grid-cols-1

              gap-6

              lg:grid-cols-[0.55fr_1.45fr]
              lg:items-start
              lg:gap-14
            "
          >
            <h2
              className="
                text-[30px]
                font-bold
                leading-[1.12]

                tracking-[-0.035em]

                text-white

                sm:text-[36px]

                lg:text-[42px]
              "
            >
              Why Invest in{" "}

              <span
                className="
                  text-[#EC1C40]
                "
              >
                Dholera?
              </span>
            </h2>

            <p
              className="
                text-[15px]
                leading-7

                text-white/70

                sm:text-[16px]
                sm:leading-8

                lg:text-[17px]
              "
            >
              Dholera offers planned infrastructure, strong
              connectivity and growing industrial
              development. With projects such as the Tata
              semiconductor plant, Dholera Airport,
              Ahmedabad-Dholera Expressway, DFC and solar
              infrastructure, Dholera is developing as a
              major industrial and smart city region. Its
              planned residential and commercial development
              also creates opportunities for long term real
              estate investment.
            </p>
          </div>
        </section>

        {/* ===================================================
            LATEST NEWS
        ==================================================== */}

        <section
          className="
            bg-white

            px-4
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

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
            {/* ===============================================
                HEADING

                PHONE:
                Wraps normally.

                DESKTOP:
                One line.
            ================================================ */}

            <div
              className="
                flex
                flex-col

                gap-4

                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:gap-6
              "
            >
              <h2
                className="
                  min-w-0

                  text-[28px]
                  font-bold
                  leading-[1.15]

                  tracking-[-0.03em]

                  text-black

                  sm:text-[32px]

                  md:text-[34px]

                  lg:flex-1
                  lg:whitespace-nowrap
                  lg:text-[32px]

                  xl:text-[36px]
                "
              >
                Stay Updated with Latest{" "}

                <span
                  className="
                    text-[#EC1C40]
                  "
                >
                  Dholera SIR News &amp; Updates
                </span>
              </h2>

              <Link
                href="/dholera-updates/latest-updates"
                className="
                  inline-flex

                  min-h-[44px]
                  w-fit

                  shrink-0

                  items-center
                  justify-center

                  gap-2

                  text-[14px]
                  font-semibold

                  text-[#EC1C40]

                  transition-colors
                  duration-200

                  hover:text-black

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]
                  focus-visible:ring-offset-2
                "
              >
                View All Updates

                <ArrowRight
                  aria-hidden="true"
                  className="
                    h-4
                    w-4

                    shrink-0

                    stroke-[#EC1C40]
                  "
                  strokeWidth={
                    2
                  }
                />
              </Link>
            </div>

            {/* NEWS CARDS */}

            {latestPosts.length >
              0 && (
              <div
                className="
                  mt-7

                  grid
                  grid-cols-1

                  gap-5

                  sm:grid-cols-2

                  lg:mt-9
                  lg:grid-cols-3
                  lg:gap-6
                "
              >
                {latestPosts.map(
                  (
                    post,
                    index,
                  ) => (
                    <UpdateCard
                      key={
                        post._id ||
                        post.slug
                          ?.current ||
                        index
                      }
                      post={
                        post
                      }
                    />
                  ),
                )}
              </div>
            )}
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
            py-10

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8
            md:py-14

            lg:px-10
            lg:py-16
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

              lg:grid-cols-[280px_minmax(0,1fr)]
              lg:gap-12
            "
          >
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
                Dholera SIR{" "}

                <span
                  className="
                    text-[#EC1C40]
                  "
                >
                  FAQs
                </span>
              </h2>
            </div>

            <div
              className="
                overflow-hidden

                rounded-2xl

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
                        min-h-[72px]

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