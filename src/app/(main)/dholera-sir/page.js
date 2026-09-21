import {
  getblogs,
  getProjectInfo,
  getUpdates,
  getNews,
} from "@/sanity/lib/api";
import hero from "@/assets/DholeraSirhero.webp";
import Image from "next/image";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";
import Link from "next/link";
import LeadFormSlug from "../dholera-updates/latest-updates/[slug]/LeadForm";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import BulkLand from "../components/BulkLandForm";
import BlogSlider from "./BlogSlider";

import MegaProjectsSection from "./MegaProject";
import WhyInvestDholera from "./WhyInvest";

export default async function BlogsPage() {
  // Fetch data and handle potential errors
  let posts = [];
  try {
    const postsData = await getProjectInfo();
    posts = Array.isArray(postsData) ? postsData : [];

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);
      const dateB = new Date(b.publishedAt || b._createdAt || 0);
      return dateB - dateA; // Descending order (newest first)
    });

    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  // Fetch news for sidebar (changed from getUpdates to getnews)
  let trendingBlogs = [];
  try {
    const newsData = await getNews();
    trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
    console.log("News data fetched:", trendingBlogs.length);
  } catch (error) {
    console.error("Error fetching news:", error);
    // Fallback to getUpdates if getnews fails
    try {
      const updatesData = await getUpdates();
      trendingBlogs = Array.isArray(updatesData) ? updatesData.slice(0, 5) : [];
      console.log("Fallback to updates data:", trendingBlogs.length);
    } catch (fallbackError) {
      console.error("Error fetching updates as fallback:", fallbackError);
    }
  }

  const whatsappMessage =
    "Hello Dholera Times, I am interested in buying a plot in Dholera. Please share the available details.";

  const whatsappLink = `https://wa.me/919958993549?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <>
      <title>About Dholera SIR | Smart City Dholera Gujarat</title>
      <meta
        name="description"
        content="Learn about Dholera SIR, Gujarat's first and largest smart city project, offering investment opportunities, infrastructure, and growth potential."
      />
      <link rel="canonical" href="https://www.dholeratimes.com/dholera-sir" />
      <meta name="robots" content="index, follow" />

      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="md:relative md:h-[65vh] overflow-hidden">
          <Image
            src={hero}
            alt="Dholera SIR Aerial View"
            className="w-full md:h-full h-auto object-contain md:object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 md:bg-black/60"></div>
          <div className="absolute inset-0 md:flex md:items-center md:justify-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-5xl font-bold text-white">
                About Dholera SIR
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* What Is Dholera Smart City Section */}
      <section
        aria-labelledby="dholera-smart-city-heading"
        className="
          w-full
          bg-white

          px-4
          py-8

          min-[414px]:px-6

          sm:py-12

          md:px-8
          md:py-12

          lg:py-12
        "
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Heading */}
          <h2
            id="dholera-smart-city-heading"
            className="
              max-w-4xl

              text-left
              text-[clamp(1.75rem,2.5vw,2.5rem)]

              font-semibold
              leading-[1.2]
              tracking-[-0.025em]

              text-[#8F2946]

              md:mx-auto
              md:text-center
            "
          >
            What Is Dholera Smart City?
          </h2>

          {/* Content */}
          <div
            className="
              mx-auto
              mt-4
              max-w-5xl

              space-y-5

              text-[16px]
              font-normal
              leading-[1.75]

              text-[#5C4851]

              sm:mt-5
              sm:text-[16px]
              sm:leading-[1.8]

              md:mt-8
              md:space-y-6
              md:text-[17px]

              lg:text-[18px]
              lg:leading-[1.8]
            "
          >
            <p>
              Dholera SIR (Special Investment Region) is one of India&apos;s
              most ambitious greenfield smart city developments, planned in
              Gujarat as a future-ready industrial and economic hub. Located
              within the Delhi-Mumbai Industrial Corridor (DMIC) framework,
              Dholera is designed to support large-scale manufacturing, advanced
              industries, logistics, and modern urban living. It is also
              described by NICDC as the largest node under DMIC, with a planned
              area of around 920 sq. km.
            </p>

            <p>
              What makes Dholera Smart City different is its long-term planning.
              Instead of growing in an unplanned way, the city is being
              developed with integrated infrastructure such as wide roads,
              utility corridors, water systems, power networks, digital
              connectivity, and industrial zoning. This planned approach is
              intended to create a strong foundation for industries, businesses,
              professionals, and future residents.
            </p>

            <p>
              For businesses searching for a location with scale,
              infrastructure, and future growth potential, Dholera SIR Gujarat
              is positioned as a next-generation destination for manufacturing,
              logistics, technology, and industrial investment.
            </p>
          </div>
        </div>
      </section>

      <BulkLand
        title="Invest in Registry-Ready Plots in Dholera Starting from ₹10 Lakh"
        buttonName="Get A Call Back"
        pageName="aboutSir"
      />

      {/* Bottom CTA Section */}
      <div
        className="
          w-full

          bg-gradient-to-r
          from-[#39252E]
          via-[#742039]
          to-[#8F2946]

          px-4
          py-6
          pb-8

          text-white

          min-[414px]:px-6
          min-[414px]:py-11

          sm:py-12

          md:px-8
          md:py-12

          lg:py-12
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl

            text-center
          "
        >
          <h2
            className="
              mx-auto
              max-w-3xl

              text-[clamp(1.75rem,2.5vw,2.375rem)]

              font-semibold
              leading-[1.2]
              tracking-[-0.025em]

              text-white
            "
          >
            Stay Updated with Dholera SIR
          </h2>

          <p
            className="
              mx-auto

              mt-4
              max-w-2xl

              text-[15px]
              font-normal
              leading-7

              text-[#F1DDE3]

              sm:mt-5
              sm:text-[16px]

              md:text-[17px]
            "
          >
            Subscribe to our newsletter for the latest dholera investment
            opportunities and updates.
          </p>

          <Link
            href="/contact"
            className="
              mt-6

              inline-flex
              min-h-[48px]

              items-center
              justify-center

              rounded-lg

              bg-white

              px-6
              py-3

              text-[15px]
              font-semibold
              leading-6

              text-[#8F2946]

              shadow-[0_10px_28px_rgba(57,37,46,0.22)]

              transition-[background-color,color,transform,box-shadow]
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#F7EBEF]
              hover:text-[#742039]
              hover:shadow-[0_14px_32px_rgba(57,37,46,0.28)]

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#742039]

              sm:mt-7
              sm:px-7

              md:min-h-[50px]
              md:text-[16px]

              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mega Projects Section */}
      <MegaProjectsSection />

      {/* Why Invest in Dholera Section */}

      <WhyInvestDholera />

      <div
        className="
          w-full

          px-4

          min-[414px]:px-6
          md:px-8
        "
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="
              group
              relative
              overflow-hidden

              rounded-2xl

              border
              border-[#EAD9DF]

              bg-white

              px-5
              py-6

              shadow-[0_8px_28px_rgba(57,37,46,0.05)]

              transition-[border-color,box-shadow]
              duration-300

              hover:border-[#DCA9B8]
              hover:shadow-[0_16px_40px_rgba(143,41,70,0.09)]

              sm:px-6
              sm:py-7

              md:px-8
              md:py-8

              lg:px-10
              lg:py-9

              motion-reduce:transition-none
            "
          >
            {/* Top accent */}
            <div
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

            <div
              className="
                flex
                flex-col

                items-center
                justify-between

                gap-6

                lg:flex-row
                lg:gap-10
              "
            >
              {/* ==================================================
                  CONTENT
              =================================================== */}

              <div
                className="
                  min-w-0
                  flex-1

                  text-center

                  lg:text-left
                "
              >
                <h2
                  className="
                    text-[24px]
                    font-semibold
                    leading-[1.25]

                    tracking-[-0.02em]

                    text-[#39252E]

                    sm:text-[26px]

                    lg:text-[28px]
                  "
                >
                  Ready to Invest in{" "}
                  <span className="text-[#8F2946]">Dholera SIR?</span>
                </h2>

                <p
                  className="
                    mx-auto
                    mt-2.5

                    max-w-2xl

                    text-[15px]
                    font-normal
                    leading-7

                    text-[#68565E]

                    sm:text-[16px]

                    lg:mx-0
                    lg:mt-3
                    lg:text-[17px]
                  "
                >
                  Get expert guidance and exclusive investment opportunities
                </p>
              </div>

              {/* ==================================================
                  ACTIONS
              =================================================== */}

              <div
                className="
                  flex
                  w-full
                  flex-col

                  gap-3

                  sm:w-auto
                  sm:flex-row
                  sm:gap-4

                  lg:shrink-0
                "
              >
                {/* CALL */}
                <Link
                  href="tel:+919958993549"
                  className="
                    inline-flex
                    min-h-[50px]
                    w-full

                    items-center
                    justify-center
                    gap-2.5

                    rounded-xl

                    bg-[#8F2946]

                    px-6
                    py-3

                    text-[15px]
                    font-semibold
                    leading-6

                    text-white

                    shadow-[0_8px_20px_rgba(143,41,70,0.18)]

                    transition-[background-color,transform,box-shadow]
                    duration-200

                    hover:-translate-y-0.5
                    hover:bg-[#742039]
                    hover:shadow-[0_12px_26px_rgba(116,32,57,0.24)]

                    active:translate-y-0

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#8F2946]
                    focus-visible:ring-offset-2

                    sm:w-auto
                    sm:min-w-[150px]

                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                >
                  <FaPhone
                    aria-hidden="true"
                    className="
                      shrink-0
                      rotate-90

                      text-[15px]
                    "
                  />

                  <span>Call Now</span>
                </Link>

                {/* WHATSAPP */}

                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                      inline-flex
                      min-h-[50px]
                      w-full

                      items-center
                      justify-center
                      gap-2.5

                      rounded-xl

                      border
                      border-[#8F2946]/50

                      bg-[#F7EBEF]

                      px-6
                      py-3

                      text-[15px]
                      font-semibold
                      leading-6

                      text-[#8F2946]

                      shadow-[0_4px_14px_rgba(143,41,70,0.05)]

                      transition-[background-color,border-color,color,transform,box-shadow]
                      duration-200
                      ease-out

                      active:bg-[#742039]
                      active:text-white

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#8F2946]
                      focus-visible:ring-offset-2

                      sm:w-auto
                      sm:min-w-[160px]

                      md:hover:-translate-y-0.5
                      md:hover:border-[#8F2946]
                      md:hover:bg-[#8F2946]
                      md:hover:text-white
                      md:hover:shadow-[0_10px_24px_rgba(143,41,70,0.16)]

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                >
                  <FaWhatsapp
                    aria-hidden="true"
                    className="
                        shrink-0
                        text-[19px]
                      "
                  />

                  <span>WhatsApp Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — Sidebar + Blog Grid */}
      <div className="bg-gray-50 px-4 py-12">
        <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
          {/* Left Sidebar */}

          {/* Blog Grid */}
        </div>
        <BlogSlider posts={safePosts} />
      </div>
    </>
  );
}
