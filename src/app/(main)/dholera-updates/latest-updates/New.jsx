// import { getNews } from "@/sanity/lib/api";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import SidebarWithForm from "./Sidebar";
// import MobileNews from "./MobileNews";

// const formatDate = (dateString) => {
//   if (!dateString) return "";

//   const date = new Date(dateString);
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   };

//   return date.toLocaleDateString("en-US", options);
// };

// export default async function New() {
//   let posts = [];
//   try {
//     const postsData = await getNews();
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

//   const safePosts = posts.map((post) => ({
//     ...post,
//     mainImage: post.mainImage || null,
//     slug: post.slug?.current
//       ? { current: post.slug.current }
//       : { current: "#" },
//   }));

//   // Get the 3 most recently published posts for popular articles
//   const popularArticles = [...safePosts]
//     .sort(
//       (a, b) =>
//         new Date(b.publishedAt || b._createdAt) -
//         new Date(a.publishedAt || a._createdAt),
//     )
//     .slice(0, 3);

//   return (
//     <>
//       <title>Dholera Latest News & Project Updates | Smart City Progress</title>
//       <meta
//         name="description"
//         content=" Discover the latest on Dholera SIR! Get real-time updates on airport, metro, expressways, and industrial projects to help you make smart investment choices."
//       />
//       <link
//         rel="canonical"
//         href="https://www.dholeratimes.com/dholera-updates/latest-updates"
//       />
//       <meta name="robots" content="index, follow" />
//       <div className="min-h-screen relative overflow-hidden">
//         <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-16">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Main Content - Blog Posts (comes first on mobile) */}
//             <div className="lg:w-2/3 space-y-8 order-1 lg:order-2">
//               <div>
//                 <h1 className="text-4xl font-bold text-[#d3b36b] mb-2">
//                   Dholera SIR Latest Updates
//                 </h1>
//                 <p className="text-[#151f28] mb-8">
//                   Stay updated with the latest insights about Dholera SIR,
//                   infrastructure developments, and smart city investment
//                   opportunities.
//                 </p>
//               </div>

//               {safePosts.length > 0 ? (
//                 <div className="space-y-8">
//                   {/* Featured Blog Post */}

//                   {/* Smaller Blog Posts Grid */}
//                   <div className="md:hidden">
//                     <MobileNews posts={safePosts} />
//                   </div>

//                   <div className="hidden md:grid md:grid-cols-2 gap-6">
//                     {safePosts.slice(0).map((post, index) => (
//                       <article
//                         key={post._id}
//                         className="bg-[#151f28] border border-[#d3b36b]/20 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#d3b36b]/20 hover:scale-[1.03] hover:border-[#d3b36b]/40"
//                       >
//                         <Link
//                           href={`/dholera-updates/latest-updates/${post.slug.current}`}
//                         >
//                           <div className=" bg-gray-200 flex items-center justify-center overflow-hidden">
//                             {post.mainImage ? (
//                               <Image
//                                 src={urlFor(post.mainImage)
//                                   .width(800)
//                                   .height(400)
//                                   .url()}
//                                 alt={post.title || "Dholera SIR Blog Post"}
//                                 width={800}
//                                 height={400}
//                                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                               />
//                             ) : (
//                               <div className="w-full h-48 bg-gradient-to-br from-[#d3b36b]/20 to-[#151f28]/20 flex items-center justify-center">
//                                 <div className="text-6xl">📰</div>
//                               </div>
//                             )}
//                           </div>
//                           <div className="p-4 text-white hover:text-[#d3b36b] transition-colors duration-300">
//                             <h3 className="text-lg font-semibold mb-2 cursor-pointer line-clamp-2">
//                               {post.title ||
//                                 `Dholera Investment Guide ${index + 2}`}
//                             </h3>
//                             <div className="flex items-center justify-between">
//                               <p className="text-sm text-gray-400">
//                                 {formatDate(
//                                   post.publishedAt || post._createdAt,
//                                 )}
//                               </p>
//                               <span className="font-medium hover:underline text-[#d3b36b]">
//                                 Read More →
//                               </span>
//                             </div>
//                           </div>
//                         </Link>
//                       </article>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl shadow-sm p-8 text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#d3b36b]/20 hover:scale-[1.01]">
//                   <div className="h-48 bg-gradient-to-br from-[#d3b36b]/20 to-[#151f28]/20 rounded-lg mb-6 flex items-center justify-center">
//                     <div className="text-6xl">🏙️</div>
//                   </div>
//                   <h2 className="text-xl font-bold text-[#151f28] mb-3">
//                     Dholera SIR Investment Updates Coming Soon
//                   </h2>
//                   <p className="text-gray-600 mb-4">
//                     We're preparing comprehensive guides about investment
//                     opportunities in Dholera Special Investment Region. Stay
//                     tuned for expert insights on India's first smart city.
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Content will be available soon
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Sidebar (comes second on mobile) */}
//             <div className="lg:w-1/3 order-2 lg:order-1">
//               <SidebarWithForm
//                 popularArticles={popularArticles}
//                 className="lg:sticky lg:top-24 space-y-6"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { getNews } from "@/sanity/lib/api";

import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

import SidebarWithForm from "./Sidebar";

/* ============================================================
   SETTINGS
============================================================ */

const POSTS_PER_PAGE = 10;

const PAGE_PATH = "/dholera-updates/latest-updates";

/* ============================================================
   DATE
============================================================ */

const formatDate = (dateString) => {
  if (!dateString) return "";

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
   PAGINATION URL
============================================================ */

const getPageHref = (page) => {
  if (page <= 1) {
    return PAGE_PATH;
  }

  return `${PAGE_PATH}?page=${page}`;
};

/* ============================================================
   NEWS CARD
============================================================ */

function NewsCard({ post, index }) {
  const href =
    post.slug?.current && post.slug.current !== "#"
      ? `/dholera-updates/latest-updates/${post.slug.current}`
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
        border-[#E0A4B5]/70

        bg-white

        shadow-[0_5px_18px_rgba(57,37,46,0.045)]

        transition-[border-color,box-shadow,transform]
        duration-300
        ease-out

        md:hover:-translate-y-1
        md:hover:border-[#8F2946]
        md:hover:shadow-[0_16px_36px_rgba(116,32,57,0.11)]

        focus-within:border-[#8F2946]

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
          focus-visible:ring-[#8F2946]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            aspect-[16/9]
            w-full
            shrink-0
            overflow-hidden
            bg-[#F3E7EC]
          "
        >
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(900).height(506).url()}
              alt={post.mainImage?.alt || post.title || "Dholera SIR news"}
              fill
              sizes="
                (max-width: 767px) calc(100vw - 32px),
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
                from-[#F3E7EC]
                via-[#F7EEF1]
                to-[#FAF7F8]
              "
            >
              <span className="text-[14px] font-medium text-[#78666E]">
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
              from-[#39252E]/15
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* CONTENT */}

        <div
          className="
            flex
            flex-1
            flex-col

            p-4

            min-[414px]:p-[18px]

            sm:p-5
          "
        >
          <h2
            className="
              line-clamp-2

              text-[17px]
              font-semibold
              leading-[25px]

              tracking-[-0.015em]

              text-[#39252E]

              transition-colors
              duration-200

              md:min-h-[52px]
              md:group-hover:text-[#8F2946]

              lg:text-[18px]
              lg:leading-[27px]
            "
          >
            {post.title || `Dholera Investment Guide ${index + 1}`}
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
              border-[#EAD9DF]

              pt-3
            "
          >
            <p
              className="
                text-[13px]
                leading-5

                text-[#78666E]

                sm:text-[14px]
              "
            >
              {formatDate(post.publishedAt || post._createdAt)}
            </p>

            <span
              className="
                inline-flex
                min-h-11
                shrink-0

                items-center
                justify-center

                text-[14px]
                font-semibold
                leading-6

                text-[#8F2946]

                transition-colors
                duration-200

                md:group-hover:text-[#742039]

                sm:text-[15px]
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
   PAGINATION
============================================================ */

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    {
      length: totalPages,
    },
    (_, index) => index + 1,
  );

  return (
    <nav
      aria-label="News pagination"
      className="
        mt-8

        flex
        flex-wrap

        items-center
        justify-center

        gap-2

        sm:mt-10
        sm:gap-3
      "
    >
      {/* PREVIOUS */}

      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          aria-label="Previous page"
          className="
            inline-flex
            min-h-11

            items-center
            justify-center

            rounded-lg

            border
            border-[#DFC9D1]

            bg-white

            px-4
            py-2

            text-[14px]
            font-semibold

            text-[#39252E]

            transition-[background-color,border-color,color]
            duration-200

            hover:border-[#8F2946]
            hover:bg-[#F7EBEF]
            hover:text-[#8F2946]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#8F2946]
            focus-visible:ring-offset-2
          "
        >
          ← Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="
            inline-flex
            min-h-11

            cursor-not-allowed

            items-center
            justify-center

            rounded-lg

            border
            border-[#EAD9DF]

            bg-[#F7F4F5]

            px-4
            py-2

            text-[14px]
            font-semibold

            text-[#A18E96]
          "
        >
          ← Previous
        </span>
      )}

      {/* PAGE NUMBERS */}

      <div
        className="
          flex
          flex-wrap

          items-center
          justify-center

          gap-2
        "
      >
        {pages.map((page) => {
          const active = page === currentPage;

          return active ? (
            <span
              key={page}
              aria-current="page"
              className="
                inline-flex
                h-11
                min-w-11

                items-center
                justify-center

                rounded-lg

                bg-[#8F2946]

                px-3

                text-[14px]
                font-semibold

                text-white

                shadow-[0_5px_14px_rgba(143,41,70,0.18)]
              "
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={getPageHref(page)}
              aria-label={`Go to page ${page}`}
              className="
                inline-flex
                h-11
                min-w-11

                items-center
                justify-center

                rounded-lg

                border
                border-[#DFC9D1]

                bg-white

                px-3

                text-[14px]
                font-semibold

                text-[#39252E]

                transition-[background-color,border-color,color]
                duration-200

                hover:border-[#8F2946]
                hover:bg-[#F7EBEF]
                hover:text-[#8F2946]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2
              "
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* NEXT */}

      {currentPage < totalPages ? (
        <Link
          href={getPageHref(currentPage + 1)}
          aria-label="Next page"
          className="
            inline-flex
            min-h-11

            items-center
            justify-center

            rounded-lg

            border
            border-[#DFC9D1]

            bg-white

            px-4
            py-2

            text-[14px]
            font-semibold

            text-[#39252E]

            transition-[background-color,border-color,color]
            duration-200

            hover:border-[#8F2946]
            hover:bg-[#F7EBEF]
            hover:text-[#8F2946]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#8F2946]
            focus-visible:ring-offset-2
          "
        >
          Next →
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="
            inline-flex
            min-h-11

            cursor-not-allowed

            items-center
            justify-center

            rounded-lg

            border
            border-[#EAD9DF]

            bg-[#F7F4F5]

            px-4
            py-2

            text-[14px]
            font-semibold

            text-[#A18E96]
          "
        >
          Next →
        </span>
      )}
    </nav>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default async function New({ searchParams }) {
  /* =========================================================
     FETCH NEWS
  ========================================================= */

  let posts = [];

  try {
    const postsData = await getNews();

    posts = Array.isArray(postsData) ? [...postsData] : [];

    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);

      const dateB = new Date(b.publishedAt || b._createdAt || 0);

      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  /* =========================================================
     NORMALIZE
  ========================================================= */

  const safePosts = posts.map((post) => ({
    ...post,

    mainImage: post.mainImage || null,

    slug: post.slug?.current
      ? {
          current: post.slug.current,
        }
      : {
          current: "#",
        },
  }));

  /* =========================================================
     SIDEBAR ARTICLES
     These stay based on all posts, not current page.
  ========================================================= */

  const popularArticles = [...safePosts]
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);

      const dateB = new Date(b.publishedAt || b._createdAt || 0);

      return dateB - dateA;
    })
    .slice(0, 3);

  /* =========================================================
     PAGINATION

     Next.js 15 searchParams can be async,
     therefore await it first.
  ========================================================= */

  const resolvedSearchParams = await searchParams;

  const requestedPage = Number.parseInt(resolvedSearchParams?.page || "1", 10);

  const totalPosts = safePosts.length;

  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

  const paginatedPosts = safePosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  return (
    <>
      <title>
        Dholera Latest News &amp; Project Updates | Smart City Progress
      </title>

      <meta
        name="description"
        content="Discover the latest on Dholera SIR! Get real-time updates on airport, metro, expressways, and industrial projects to help you make smart investment choices."
      />

      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-updates/latest-updates"
      />

      <meta name="robots" content="index, follow" />

      <main
        className="
          relative
          min-h-screen

          bg-[#FAF7F8]

          selection:bg-[#E0A4B5]
          selection:text-[#39252E]
        "
      >
        {/* BACKGROUND */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-[280px]

            bg-gradient-to-b
            from-[#F3E7EC]
            via-[#F8F0F3]
            to-transparent

            sm:h-[320px]
          "
        />

        {/* CONTAINER */}

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
            {/* SIDEBAR */}

            <aside
              className="
                order-2
                min-w-0

                lg:order-1
                lg:h-full
                lg:self-stretch
              "
            >
              <SidebarWithForm popularArticles={popularArticles} />
            </aside>

            {/* NEWS */}

            <section
              aria-labelledby="latest-news-heading"
              className="
                order-1
                min-w-0

                lg:order-2
              "
            >
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
                    max-w-[760px]

                    text-[28px]
                    font-semibold
                    leading-[1.2]

                    tracking-[-0.025em]

                    text-[#39252E]

                    min-[414px]:text-[30px]

                    sm:text-[34px]

                    md:text-[38px]

                    lg:text-[42px]
                  "
                >
                  Dholera SIR{" "}
                  <span className="text-[#8F2946]">Latest Updates</span>
                </h1>

                <p
                  className="
                    mt-3

                    max-w-[760px]

                    text-[15px]
                    leading-[25px]

                    text-[#68565E]

                    min-[414px]:leading-7

                    sm:mt-4
                    sm:text-[16px]

                    md:mt-5
                  "
                >
                  Stay updated with the latest insights about Dholera SIR,
                  infrastructure developments, and smart city investment
                  opportunities.
                </p>
              </header>

              {safePosts.length > 0 ? (
                <>
                  {/* 10 POSTS PER PAGE */}

                  <div
                    className="
                      grid
                      grid-cols-1

                      gap-5

                      md:grid-cols-2
                      md:gap-6
                    "
                  >
                    {paginatedPosts.map((post, index) => (
                      <NewsCard
                        key={post._id || post.slug?.current || index}
                        post={post}
                        index={startIndex + index}
                      />
                    ))}
                  </div>

                  {/* PAGINATION */}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </>
              ) : (
                <div
                  className="
                    rounded-2xl

                    border
                    border-[#E0A4B5]/60

                    bg-white

                    p-5

                    shadow-[0_8px_28px_rgba(57,37,46,0.05)]

                    min-[414px]:p-6

                    md:p-8
                  "
                >
                  <h2
                    className="
                      text-[20px]
                      font-semibold
                      leading-[1.3]

                      text-[#39252E]

                      sm:text-[22px]
                    "
                  >
                    Dholera SIR Investment Updates Coming Soon
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-xl

                      text-[15px]
                      leading-7

                      text-[#68565E]
                    "
                  >
                    We&apos;re preparing comprehensive guides about investment
                    opportunities in Dholera Special Investment Region. Stay
                    tuned for expert insights on India&apos;s first smart city.
                  </p>

                  <p
                    className="
                      mt-4

                      text-[13px]
                      font-medium

                      text-[#8A747D]
                    "
                  >
                    Content will be available soon
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
