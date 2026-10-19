import { getNews } from "@/sanity/lib/api";

import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

import SidebarWithForm from "./Sidebar";
import MobileNews from "./MobileNews";

/* ============================================================
   SETTINGS
============================================================ */

const PAGE_PATH =
  "/dholera-updates/latest-updates";

/* ============================================================
   DATE
============================================================ */

const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/* ============================================================
   DESKTOP NEWS CARD
============================================================ */

function NewsCard({
  post,
  index,
}) {
  const href =
    post.slug?.current &&
    post.slug.current !== "#"
      ? `${PAGE_PATH}/${post.slug.current}`
      : PAGE_PATH;

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

        shadow-[0_5px_18px_rgba(0,0,0,0.045)]

        transition-[border-color,box-shadow,transform]
        duration-300
        ease-out

        md:hover:-translate-y-1
        md:hover:border-[#EC1C40]/40
        md:hover:shadow-[0_16px_36px_rgba(236,28,64,0.10)]

        focus-within:border-[#EC1C40]

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      <Link
        href={href}
        className="
          flex
          h-full
          min-w-0
          flex-col

          rounded-2xl

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#EC1C40]
        "
      >
        {/* ===================================================
            IMAGE
        ==================================================== */}

        <div
          className="
            relative

            aspect-[16/9]

            w-full
            shrink-0

            overflow-hidden

            bg-black/[0.03]
          "
        >
          {post.mainImage ? (
            <Image
              src={urlFor(
                post.mainImage,
              )
                .width(800)
                .height(450)
                .auto("format")
                .quality(75)
                .url()}
              alt={
                post.mainImage?.alt ||
                post.title ||
                "Dholera SIR news"
              }
              fill
              sizes="
                (max-width: 1279px) 45vw,
                430px
              "
              className="
                object-cover

                transition-transform
                duration-500
                ease-out

                md:group-hover:scale-[1.035]

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

                bg-gradient-to-br
                from-[#EC1C40]/[0.055]
                via-[#EC1C40]/[0.025]
                to-white
              "
            >
              <span
                className="
                  text-[14px]
                  font-medium

                  text-black/55
                "
              >
                No image available
              </span>
            </div>
          )}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-t
              from-black/15
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col

            p-5
          "
        >
          <h2
            className="
              line-clamp-2

              min-h-[52px]

              text-[17px]
              font-semibold
              leading-[25px]

              tracking-[-0.015em]

              text-black

              lg:text-[18px]
              lg:leading-[27px]
            "
          >
            {post.title ||
              `Dholera Investment Guide ${
                index + 1
              }`}
          </h2>

          <div
            className="
              mt-5

              flex
              min-h-[48px]

              items-center
              justify-between

              gap-3

              border-t
              border-black/10

              pt-3
            "
          >
            <p
              className="
                text-[14px]
                leading-5

                text-black/55
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
                justify-center

                text-[15px]
                font-semibold
                leading-6

                text-[#EC1C40]
              "
            >
              Read More →
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

export default async function New() {
  /* =========================================================
     FETCH NEWS
  ========================================================= */

  let posts = [];

  try {
    const postsData =
      await getNews();

    posts = Array.isArray(
      postsData,
    )
      ? [...postsData]
      : [];

    /* =======================================================
       SORT NEWEST FIRST
    ======================================================= */

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
  } catch (error) {
    console.error(
      "Error fetching news:",
      error,
    );
  }

  /* =========================================================
     NORMALIZE POSTS
  ========================================================= */

  const safePosts = posts.map(
    (post) => ({
      ...post,

      mainImage:
        post.mainImage || null,

      slug:
        post.slug?.current
          ? {
              current:
                post.slug.current,
            }
          : {
              current: "#",
            },
    }),
  );

  /* =========================================================
     POPULAR ARTICLES
  ========================================================= */

  const popularArticles = [
    ...safePosts,
  ]
    .sort((a, b) => {
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
    })
    .slice(0, 3);

  return (
    <>
      {/* =====================================================
          SEO
      ====================================================== */}

      <title>
        Dholera Latest News &amp;
        Project Updates | Smart City
        Progress
      </title>

      <meta
        name="description"
        content="Discover the latest on Dholera SIR! Get real-time updates on airport, metro, expressways, and industrial projects to help you make smart investment choices."
      />

      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-updates/latest-updates"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      {/* =====================================================
          PAGE

          IMPORTANT:
          overflow-x-clip is safe for sticky.

          Do NOT use:
          overflow-hidden
          overflow-auto
          overflow-y-auto

          on this element.
      ====================================================== */}

      <main
        className="
          relative

          min-h-screen

          overflow-x-clip

          bg-white

          text-black

          selection:bg-[#EC1C40]
          selection:text-white
        "
      >
        {/* ===================================================
            BACKGROUND
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-[280px]

            sm:h-[320px]
          "
        />

        {/* ===================================================
            MAIN CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            z-10

            mx-auto

            w-full
            max-w-7xl

            px-4
            pb-12
            pt-7

            min-[414px]:px-5
            min-[414px]:pt-8

            sm:px-6
            sm:pb-14
            sm:pt-10

            md:px-8
            md:pb-16
            md:pt-12

            lg:pb-20
            lg:pt-14
          "
        >
          {/* =================================================
              TWO COLUMN LAYOUT

              IMPORTANT:
              items-stretch makes the LEFT grid column
              as tall as the RIGHT news column.

              That gives sticky enough vertical room.
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-10

              lg:grid-cols-[320px_minmax(0,1fr)]

              lg:items-stretch

              lg:gap-10

              xl:grid-cols-[350px_minmax(0,1fr)]

              xl:gap-12
            "
          >
            {/* =================================================
                LEFT SIDEBAR

                Desktop:
                column stretches to same height as news.

                Mobile:
                appears after the news.
            ================================================== */}

            <aside
              className="
                order-2

                min-w-0

                lg:order-1

                lg:h-full

                lg:self-stretch
              "
            >
              {/* ===============================================
                  STICKY SIDEBAR

                  top-24 = 96px from viewport top.

                  This leaves space for your fixed/sticky header.
              ================================================ */}

              <div
                className="
                  lg:sticky

                  lg:top-24

                  lg:self-start
                "
              >
                <SidebarWithForm
                  popularArticles={
                    popularArticles
                  }
                />
              </div>
            </aside>

            {/* =================================================
                RIGHT NEWS COLUMN

                IMPORTANT:
                There is NO fixed height.
                There is NO internal overflow.

                Therefore the normal browser/page scroll moves
                this news column while the left sidebar stays
                sticky.
            ================================================== */}

            <section
              aria-labelledby="latest-news-heading"
              className="
                order-1

                min-w-0

                lg:order-2
              "
            >
              {/* =================================================
                  HEADER
              ================================================== */}

              <header
                className="
                  mb-6

                  min-[414px]:mb-7

                  sm:mb-8

                  lg:mb-9
                "
              >
                <h1
                  id="latest-news-heading"
                  className="
                    scroll-mt-24

                    max-w-[760px]

                    text-[28px]
                    font-semibold
                    leading-[1.2]

                    tracking-[-0.025em]

                    text-black

                    min-[414px]:text-[30px]

                    sm:text-[34px]

                    md:text-[38px]

                    lg:text-[42px]
                  "
                >
                  Dholera Smart City{" "}
                  <span
                    className="
                      text-[#EC1C40]
                    "
                  >
                    Latest News &amp;
                    Updates
                  </span>
                </h1>

                <p
                  className="
                    mt-3

                    max-w-[760px]

                    text-[15px]
                    leading-[25px]

                    text-black/65

                    min-[414px]:leading-7

                    sm:mt-4
                    sm:text-[16px]

                    md:mt-5
                  "
                >
                  Follow the latest
                  Dholera news and
                  Dholera SIR updates
                  covering
                  infrastructure,
                  industries,
                  semiconductors,
                  government decisions
                  and major development
                  projects.
                </p>
              </header>

              {/* =================================================
                  POSTS
              ================================================== */}

              {safePosts.length >
              0 ? (
                <>
                  {/* =============================================
                      PHONE

                      Client-side pagination.
                  ============================================== */}

                  <div className="md:hidden">
                    <MobileNews
                      posts={
                        safePosts
                      }
                    />
                  </div>

                  {/* =============================================
                      TABLET + DESKTOP

                      All posts appear here.
                      This column creates the long scrolling height.
                  ============================================== */}

                  <div
                    className="
                      hidden

                      grid-cols-2

                      gap-x-6
                      gap-y-6

                      md:grid

                      lg:gap-y-7
                    "
                  >
                    {safePosts.map(
                      (
                        post,
                        index,
                      ) => (
                        <NewsCard
                          key={
                            post._id ||
                            post.slug
                              ?.current ||
                            index
                          }
                          post={
                            post
                          }
                          index={
                            index
                          }
                        />
                      ),
                    )}
                  </div>
                </>
              ) : (
                /* ===============================================
                   EMPTY STATE
                ================================================ */

                <div
                  className="
                    rounded-2xl

                    border
                    border-black/10

                    bg-white

                    p-5

                    shadow-[0_8px_28px_rgba(0,0,0,0.05)]

                    min-[414px]:p-6

                    md:p-8
                  "
                >
                  <h2
                    className="
                      text-[20px]
                      font-semibold
                      leading-[1.3]

                      text-black

                      sm:text-[22px]
                    "
                  >
                    Dholera SIR
                    Investment Updates
                    Coming Soon
                  </h2>

                  <p
                    className="
                      mt-3

                      max-w-xl

                      text-[15px]
                      leading-7

                      text-black/65
                    "
                  >
                    We&apos;re preparing
                    comprehensive guides
                    about investment
                    opportunities in
                    Dholera Special
                    Investment Region.
                    Stay tuned for expert
                    insights on
                    India&apos;s first
                    smart city.
                  </p>

                  <p
                    className="
                      mt-4

                      text-[13px]
                      font-medium

                      text-black/45
                    "
                  >
                    Content will be
                    available soon
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}