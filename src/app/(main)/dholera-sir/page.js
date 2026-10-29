
import { Suspense } from "react";

import Image, { getImageProps } from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Landmark,
} from "lucide-react";

import {
  getNews,
  getProjectInfo,
} from "@/sanity/lib/api";

import { urlFor } from "@/sanity/lib/image";

import hero from "@/assets/DholeraSirhero2.webp";
import heroMobile from "@/assets/DholerSirHeroPhone.webp";

import CommonFAQ from "../components/Common/Faq";
import MegaProjectsSection from "./MegaProject";
import BlogSlider from "./BlogSlider";

/* SEO*/

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

    siteName: "Dholera Times",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Dholera SIR: Smart City, Projects & Updates | Dholera Times",

    description:
      "Explore Dholera SIR, its master plan, Activation Area, infrastructure, connectivity, industries, major projects and latest development status.",
  },
};

/* FAQ*/

const faqItems = [
  {
    question: "What is Dholera SIR?",
    answer:
      "Dholera SIR is the Dholera Special Investment Region, a planned greenfield industrial city in Gujarat and the largest node of the Delhi-Mumbai Industrial Corridor.",
  },
  {
    question: "How big is Dholera SIR?",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: faqItems.map(
    ({ question, answer }) => ({
      "@type": "Question",
      name: question,

      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    }),
  ),
};

/* DATE*/

const dateFormatter = new Intl.DateTimeFormat(
  "en-US",
  {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
);

function getFormattedDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    iso: date.toISOString(),
    display: dateFormatter.format(date),
  };
}

/* HERO*/

function HeroBanner() {
  const { props: mobileProps } =
    getImageProps({
      src: heroMobile,
      alt: "About Dholera SIR",
      sizes: "100vw",
      quality: 75,
    });

  const { props: desktopProps } =
    getImageProps({
      src: hero,
      alt: "About Dholera SIR",
      sizes: "100vw",
      quality: 75,
    });

  return (
    <section
      aria-label="Dholera SIR"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
      "
    >
      <picture className="block w-full">
        <source
          media="(max-width: 767px)"
          srcSet={mobileProps.srcSet}
          sizes="100vw"
          width={mobileProps.width}
          height={mobileProps.height}
        />

        <source
          media="(min-width: 768px)"
          srcSet={desktopProps.srcSet}
          sizes="100vw"
          width={desktopProps.width}
          height={desktopProps.height}
        />

        <img
          src={desktopProps.src}
          srcSet={desktopProps.srcSet}
          sizes="100vw"
          width={desktopProps.width}
          height={desktopProps.height}
          alt="About Dholera SIR"
          loading="eager"
          fetchPriority="high"
          className="
            block
            h-auto
            w-full
            max-w-none
          "
        />
      </picture>
    </section>
  );
}

/* UPDATE CARD*/

function UpdateCard({ post }) {
  const href = post.slug?.current
    ? `/dholera-updates/latest-updates/${post.slug.current}`
    : "/dholera-updates/latest-updates";

  const date = getFormattedDate(
    post.publishedAt || post._createdAt,
  );

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage)
        .width(800)
        .height(450)
        .url()
    : null;

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

        transition-[transform,border-color]
        duration-300
        ease-out

        md:hover:-translate-y-1
        md:hover:border-[#EC1C40]/30

        motion-reduce:transform-none
        motion-reduce:transition-none
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
        {/* IMAGE*/}

        <div
          className="
            relative

            aspect-[16/9]
            w-full

            overflow-hidden

            bg-black/[0.04]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                post.mainImage?.alt ||
                post.title ||
                "Dholera SIR update"
              }
              fill
              loading="lazy"
              quality={70}
              sizes="
                (max-width: 639px) calc(100vw - 32px),
                (max-width: 1023px) calc(50vw - 36px),
                400px
              "
              className="
                object-cover

                transition-transform
                duration-300
                ease-out

                md:group-hover:scale-[1.02]

                motion-reduce:transform-none
                motion-reduce:transition-none
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

        {/* CONTENT*/}

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
            {date ? (
              <time
                dateTime={date.iso}
                className="
                  text-[13px]
                  text-black/50
                "
              >
                {date.display}
              </time>
            ) : (
              <span />
            )}

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

/* BLOG SLIDER DATA*/

async function ProjectBlogSection() {
  let safePosts = [];

  try {
    const postsData =
      await getProjectInfo();

    const posts = Array.isArray(postsData)
      ? [...postsData]
      : [];

    posts.sort((a, b) => {
      const dateA = new Date(
        a.publishedAt ||
          a._createdAt ||
          0,
      );

      const dateB = new Date(
        b.publishedAt ||
          b._createdAt ||
          0,
      );

      return dateB - dateA;
    });

    safePosts = posts.map((post) => ({
      ...post,

      author:
        post.author ||
        "BookMyAssets",

      mainImage:
        post.mainImage || null,

      slug: post.slug?.current
        ? {
            current:
              post.slug.current,
          }
        : {
            current: "#",
          },
    }));
  } catch (error) {
    console.error(
      "Error fetching blog posts:",
      error,
    );
  }

  return (
    <section
      className="
        bg-gray-50

        px-4
        py-2

        min-[414px]:px-5
        min-[414px]:py-7

        sm:px-10
        sm:py-6
      "
    >
      <BlogSlider posts={safePosts} />
    </section>
  );
}

/* PROJECT BLOG FALLBACK*/

function ProjectBlogFallback() {
  return (
    <div
      aria-hidden="true"
      className="
        min-h-[300px]
        bg-gray-50
      "
    />
  );
}

/* LATEST NEWS*/

async function LatestNewsSection() {
  let latestPosts = [];

  try {
    const news = await getNews();

    latestPosts = Array.isArray(news)
      ? [...news]
          .sort((a, b) => {
            const aDate = new Date(
              a.publishedAt ||
                a._createdAt ||
                0,
            );

            const bDate = new Date(
              b.publishedAt ||
                b._createdAt ||
                0,
            );

            return bDate - aDate;
          })
          .slice(0, 3)
      : [];
  } catch (error) {
    console.error(
      "Error fetching Dholera updates:",
      error,
    );
  }

  return (
    <section
      className="
        bg-white

        px-4
        py-8

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8

        lg:px-10
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* HEADER*/}

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
            <span className="text-[#EC1C40]">
              Dholera SIR News &amp;
              Updates
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
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* NEWS*/}

        {latestPosts.length > 0 && (
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
              (post, index) => (
                <UpdateCard
                  key={
                    post._id ||
                    post.slug?.current ||
                    index
                  }
                  post={post}
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* NEWS FALLBACK*/

function LatestNewsFallback() {
  return (
    <div
      aria-hidden="true"
      className="
        min-h-[420px]
        bg-white
      "
    />
  );
}

/* PAGE*/

export default function DholeraSirPage() {
  return (
    <>
      {/* FAQ SCHEMA*/}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(faqSchema),
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
        {/* HERO*/}

        <HeroBanner />

        {/* ABOUT*/}

        <section
          aria-labelledby="about-dholera-sir-heading"
          className="
            bg-white

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-10

            md:px-8

            lg:px-10
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
              id="about-dholera-sir-heading"
              className="
                w-full

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
              About{" "}
              <span className="text-[#EC1C40]">
                Dholera SIR
              </span>
            </h2>

            <p
              className="
                mt-4

                w-full

                text-[15px]
                leading-7

                text-black/65

                sm:text-[16px]
                sm:leading-8

                lg:text-[17px]
              "
            >
              Dholera Special Investment
              Region{" "}
              <Link
                href="/dholera-updates/blogs/what-is-dholera-sir-real-estate-investment-benefits"
                className="text-blue-600 hover:underline"
              >
                (Dholera SIR)
              </Link>
              {" "}is a
              planned greenfield industrial
              city in Gujarat and the largest
              node of the Delhi-Mumbai
              Industrial Corridor (DMIC).
              Spread across approximately 920
              sq. km, Dholera SIR is being
              developed with industrial land,
              modern infrastructure,
              residential and commercial
              areas, utilities and multimodal
              connectivity.
            </p>
          </div>
        </section>

        {/* SIR ACT*/}

        <section
          className="
            bg-black/[0.025]

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-12

            md:px-8

            lg:px-10
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
                <h2
                  className="
                    text-[27px]
                    font-bold
                    leading-[1.18]

                    tracking-[-0.03em]

                    text-black

                    sm:text-[30px]

                    lg:mt-5
                  "
                >
                  What is the{" "}
                  <span className="text-[#EC1C40]">
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
                  The Gujarat Special
                  Investment Region Act, 2009,
                  commonly called the Gujarat
                  SIR Act, 2009, is a law
                  created by the Gujarat
                  Government to establish,
                  develop, operate and manage
                  large Special Investment
                  Regions (SIRs) and industrial
                  areas in Gujarat. The Act
                  came into force on 6 January
                  2009. Dholera SIR is
                  developed under this
                  framework as a planned
                  industrial and investment
                  region, with infrastructure
                  for industries, businesses
                  and urban development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPERS*/}

        <section
          className="
            bg-white

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-10

            md:px-8

            lg:px-10
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
              Who is Developing{" "}
              <span className="text-[#EC1C40]">
                Dholera SIR?
              </span>
            </h2>

            <p
              className="
                mt-4

                w-full

                text-[15px]
                leading-7

                text-black/65

                sm:text-[16px]
              "
            >
              Dholera SIR is being developed
              through a partnership between
              the Government of India and the
              Government of Gujarat.
            </p>

            <div
              className="
                mt-7

                grid
                grid-cols-1

                gap-5

                md:grid-cols-2
              "
            >
              {/* DICDL*/}

              <article
                className="
                  rounded-2xl

                  border
                  border-black/10

                  bg-white

                  p-5

                  shadow-[0_14px_40px_-32px_rgba(0,0,0,0.35)]

                  sm:p-6

                  lg:p-7
                "
              >
                <div
                  className="
                    flex
                    items-start

                    gap-3.5

                    sm:gap-4
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

                      bg-[#EC1C40]/10
                    "
                  >
                    <Landmark
                      aria-hidden="true"
                      className="
                        h-[22px]
                        w-[22px]

                        stroke-[#EC1C40]
                      "
                      strokeWidth={2}
                    />
                  </div>

                  <h3
                    className="
                      min-w-0

                      pt-1

                      text-[18px]
                      font-bold
                      leading-[1.4]

                      tracking-[-0.015em]

                      text-black

                      sm:text-[20px]

                      lg:text-[21px]
                    "
                  >
                    Dholera Industrial City
                    Development Limited
                    (DICDL)
                  </h3>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    my-5
                    h-px
                    w-full

                    bg-black/10
                  "
                />

                <p
                  className="
                    text-[14px]
                    font-normal
                    leading-7

                    text-black/60

                    sm:text-[15px]
                  "
                >
                  Dholera Industrial City
                  Development Limited (DICDL)
                  is the special purpose
                  vehicle responsible for
                  developing the industrial
                  city.
                </p>
              </article>

              {/* DSIRDA*/}

              <article
                className="
                  rounded-2xl

                  border
                  border-black/10

                  bg-white

                  p-5

                  shadow-[0_14px_40px_-32px_rgba(0,0,0,0.35)]

                  sm:p-6

                  lg:p-7
                "
              >
                <div
                  className="
                    flex
                    items-start

                    gap-3.5

                    sm:gap-4
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
                      border-[#EC1C40]/10

                      bg-[#EC1C40]/5
                    "
                  >
                    <Building2
                      aria-hidden="true"
                      className="
                        h-[22px]
                        w-[22px]

                        stroke-[#EC1C40]
                      "
                      strokeWidth={2}
                    />
                  </div>

                  <h3
                    className="
                      min-w-0

                      pt-1

                      text-[18px]
                      font-bold
                      leading-[1.4]

                      tracking-[-0.015em]

                      text-black

                      sm:text-[20px]

                      lg:text-[21px]
                    "
                  >
                    Dholera Special Investment
                    Region Development
                    Authority (DSIRDA)
                  </h3>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    my-5
                    h-px
                    w-full

                    bg-black/10
                  "
                />

                <p
                  className="
                    text-[14px]
                    font-normal
                    leading-7

                    text-black/60

                    sm:text-[15px]
                  "
                >
                  The Dholera Special
                  Investment Region
                  Development Authority
                  (DSIRDA) has an important
                  role in planning and
                  development regulation.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* MAJOR INFRASTRUCTURE*/}

        <MegaProjectsSection />

        {/* BLOG SLIDER*/}

        <Suspense
          fallback={
            <ProjectBlogFallback />
          }
        >
          <ProjectBlogSection />
        </Suspense>

        {/* WHY INVEST*/}

        <section
          className="
            bg-black

            px-4
            py-8

            min-[414px]:px-5

            sm:px-6
            sm:py-10

            md:px-8

            lg:px-10
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
              <span className="text-[#EC1C40]">
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
              Dholera offers planned
              infrastructure, strong
              connectivity and growing
              industrial development. With
              projects such as the Tata
              semiconductor plant, Dholera
              Airport, Ahmedabad-Dholera
              Expressway, DFC and solar
              infrastructure, Dholera is
              developing as a major
              industrial and smart city
              region. Its planned residential
              and commercial development also
              creates opportunities for long
              term real estate investment.
            </p>
          </div>
        </section>

        {/* LATEST NEWS*/}

        <Suspense
          fallback={
            <LatestNewsFallback />
          }
        >
          <LatestNewsSection />
        </Suspense>

        {/* FAQ*/}

        <CommonFAQ
          faqItems={faqItems}
        />
      </main>
    </>
  );
}