// import Image from "next/image";
// import Link from "next/link";

// import { ArrowRight } from "lucide-react";

// import {
//   getblogs,
//   getNews,
// } from "@/sanity/lib/api";

// import { getSanityImageUrl } from "@/sanity/lib/image";

// /* ============================================================
//    DATE HELPERS
// ============================================================ */

// function parseDate(date) {
//   if (!date) return null;

//   const parsed = new Date(date);

//   return Number.isNaN(parsed.getTime())
//     ? null
//     : parsed;
// }

// function formatDate(date) {
//   const parsed = parseDate(date);

//   if (!parsed) return "";

//   return parsed.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     timeZone: "Asia/Kolkata",
//   });
// }

// /* ============================================================
//    UPDATE CARD
// ============================================================ */

// function RelatedBlogCard({
//   item,
//   type,
// }) {
//   const basePath =
//     type === "blog"
//       ? "/dholera-updates/blogs"
//       : "/dholera-updates/latest-updates";

//   const href =
//     item.slug?.current
//       ? `${basePath}/${item.slug.current}`
//       : basePath;

//   const publishedDate =
//     item.publishedAt ||
//     item._createdAt;

//   const parsedDate =
//     parseDate(
//       publishedDate,
//     );

//   const imageUrl =
//     item.mainImage
//       ? getSanityImageUrl(
//           item.mainImage,
//           900,
//           506,
//         )
//       : null;

//   return (
//     <article
//       className="
//         group

//         flex
//         min-w-0
//         flex-col

//         w-[86vw]
//         max-w-[390px]

//         shrink-0
//         snap-start

//         overflow-hidden

//         rounded-2xl

//         border
//         border-[#EC1C40]/30

//         bg-white

//         shadow-[0_5px_18px_rgba(0,0,0,0.045)]

//         transition-[transform,border-color,box-shadow]
//         duration-300
//         ease-out

//         focus-within:border-[#EC1C40]

//         sm:w-[320px]

//         md:w-[340px]

//         lg:w-full
//         lg:max-w-none
//         lg:min-w-0

//         lg:hover:-translate-y-1
//         lg:hover:border-[#EC1C40]/45
//         lg:hover:shadow-[0_14px_32px_rgba(236,28,64,0.08)]

//         motion-reduce:transform-none
//         motion-reduce:transition-none
//       "
//     >
//       <Link
//         href={href}
//         className="
//           flex
//           h-full
//           min-w-0
//           flex-col

//           rounded-[inherit]

//           focus-visible:outline-none
//           focus-visible:ring-2
//           focus-visible:ring-inset
//           focus-visible:ring-[#EC1C40]
//         "
//       >
//         {/* ===================================================
//             IMAGE
//         ==================================================== */}

//         <div
//           className="
//             relative

//             aspect-[16/9]

//             w-full
//             shrink-0

//             overflow-hidden

//             bg-black/[0.025]
//           "
//         >
//           {imageUrl ? (
//             <Image
//               src={imageUrl}
//               alt={
//                 item.mainImage?.alt ||
//                 item.title ||
//                 "Dholera update"
//               }
//               fill
//               sizes="
//                 (max-width: 639px) 86vw,
//                 (max-width: 1023px) 340px,
//                 20vw
//               "
//               className="
//                 object-cover
//                 object-center

//                 transition-transform
//                 duration-500
//                 ease-out

//                 lg:group-hover:scale-[1.025]

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               "
//             />
//           ) : (
//             <div
//               className="
//                 flex
//                 h-full
//                 w-full

//                 items-center
//                 justify-center

//                 bg-gradient-to-br
//                 from-[#EC1C40]/10
//                 via-[#EC1C40]/5
//                 to-white
//               "
//             >
//               <span
//                 className="
//                   px-4

//                   text-center

//                   text-[13px]
//                   font-medium

//                   text-black/45
//                 "
//               >
//                 No image available
//               </span>
//             </div>
//           )}

//           {/* SUBTLE IMAGE DEPTH */}

//           <div
//             aria-hidden="true"
//             className="
//               pointer-events-none

//               absolute
//               inset-0

//               bg-gradient-to-t
//               from-black/10
//               via-transparent
//               to-transparent
//             "
//           />
//         </div>

//         {/* ===================================================
//             CONTENT
//         ==================================================== */}

//         <div
//           className="
//             flex
//             flex-1
//             flex-col

//             bg-white

//             px-3
//             pb-3
//             pt-3

//             min-[414px]:px-3
//             min-[414px]:pb-3
//             min-[414px]:pt-3

//             sm:px-3
//             sm:pb-3
//             sm:pt-3

//             lg:px-3
//             lg:pb-3
//             lg:pt-3

//             xl:px-3
//             xl:pb-3
//             xl:pt-3
//           "
//         >
//           {/* =================================================
//               TITLE
//           ================================================== */}

//           <h3
//             className="
//               line-clamp-2

//               min-h-[52px]

//               overflow-hidden

//               text-[17px]
//               font-semibold
//               leading-[26px]

//               tracking-[-0.015em]

//               text-black

//               sm:text-[17px]
//               sm:leading-[25px]

//               lg:min-h-[48px]
//               lg:text-[15.5px]
//               lg:leading-[23px]

//               xl:min-h-[52px]
//               xl:text-[16px]
//               xl:leading-[24px]
//             "
//           >
//             {item.title}
//           </h3>

//           {/* =================================================
//               DIVIDER
//           ================================================== */}

//           <div
//             className="
//               mt-3

//               border-t
//               border-black/10

//               sm:mt-3

//               lg:mt-3
//             "
//           />

//           {/* =================================================
//               DATE + READ MORE
//           ================================================== */}

//           <div
//             className="
//               mt-auto

//               flex
//               min-h-[40px]

//               items-end
//               justify-between

//               gap-2

//               pt-2
//             "
//           >
//             {/* DATE */}

//             {parsedDate ? (
//               <time
//                 dateTime={
//                   parsedDate.toISOString()
//                 }
//                 className="
//                   shrink-0

//                   text-[13px]
//                   font-normal
//                   leading-5

//                   text-black/50

//                   sm:text-[13.5px]

//                   lg:text-[12.5px]

//                   xl:text-[13px]
//                 "
//               >
//                 {formatDate(
//                   publishedDate,
//                 )}
//               </time>
//             ) : (
//               <span />
//             )}

//             {/* READ MORE */}

//             <span
//               className="
//                 inline-flex
//                 shrink-0

//                 items-center
//                 justify-center

//                 whitespace-nowrap

//                 text-[14px]
//                 font-semibold
//                 leading-5

//                 text-[#EC1C40]

//                 transition-[color,transform]
//                 duration-200
//                 ease-out

//                 group-hover:text-[#d9183a]

//                 lg:text-[13.5px]

//                 xl:text-[14px]

//                 motion-reduce:transform-none
//               "
//             >
//               Read More{" "}
//               {/* <span
//                 className="
//                   ml-1

//                   inline-block

//                   transition-transform
//                   duration-200

//                   group-hover:translate-x-1

//                   motion-reduce:transform-none
//                 "
//               >
//                 →
//               </span> */}
//             </span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }

// /* ============================================================
//    LATEST UPDATES
// ============================================================ */

// export default async function LatestUpdates() {
//   const [
//     blogsData,
//     updatesData,
//   ] = await Promise.all([
//     getblogs(),
//     getNews(),
//   ]);

//   /* ============================================================
//      MERGE BLOGS + NEWS
//   ============================================================ */

//   const content = [
//     ...(blogsData || []).map(
//       (item) => ({
//         ...item,
//         _type: "blog",
//       }),
//     ),

//     ...(updatesData || []).map(
//       (item) => ({
//         ...item,
//         _type: "news",
//       }),
//     ),
//   ]
//     .sort((a, b) => {
//       const dateA =
//         parseDate(
//           a.publishedAt ||
//             a._createdAt,
//         )?.getTime() ?? 0;

//       const dateB =
//         parseDate(
//           b.publishedAt ||
//             b._createdAt,
//         )?.getTime() ?? 0;

//       return dateB - dateA;
//     })
//     .slice(0, 5);

//   if (!content.length) {
//     return null;
//   }

//   return (
//     <section
//       aria-labelledby="latest-updates-heading"
//       className="
//         w-full

//         bg-white

//         px-4
//         py-8

//         selection:bg-[#EC1C40]
//         selection:text-white

//         min-[414px]:px-5

//         sm:px-6
//         sm:py-10

//         md:px-8
//         md:py-10

//         lg:px-10
//         lg:py-12
//       "
//     >
//       <div
//         className="
//           mx-auto
//           w-full
//           max-w-7xl
//         "
//       >
//         {/* ===================================================
//             SECTION HEADER
//         ==================================================== */}

//         <header
//           className="
//             mb-5

//             flex
//             flex-col

//             gap-3

//             sm:mb-6

//             lg:flex-row
//             lg:items-center
//             lg:justify-between
//             lg:gap-6

//             lg:mb-7
//           "
//         >
//           {/* TITLE */}

//           <h2
//             id="latest-updates-heading"
//             className="
//               text-left

//               text-[28px]
//               font-bold
//               leading-[1.2]

//               tracking-[-0.025em]

//               text-black

//               sm:text-[30px]

//               md:text-[32px]

//               lg:text-[34px]
//             "
//           >
//             Latest Dholera{" "}

//             <span className="text-[#EC1C40]">
//               News &amp; Updates
//             </span>
//           </h2>

//           {/* =================================================
//               DESKTOP — VIEW ALL UPDATES

//               Hidden on phone/tablet.
//               Desktop remains the same as before.
//           ================================================== */}

//           <Link
//             href="/dholera-updates/latest-updates"
//             className="
//               group/view

//               hidden
//               w-fit
//               shrink-0

//               items-center

//               gap-1.5

//               text-[14px]
//               font-semibold
//               leading-5

//               text-[#EC1C40]

//               transition-colors
//               duration-200

//               hover:text-black

//               focus-visible:outline
//               focus-visible:outline-2
//               focus-visible:outline-offset-4
//               focus-visible:outline-[#EC1C40]

//               lg:inline-flex
//               lg:self-center
//             "
//           >
//             <span>
//               View All Updates
//             </span>

//             <ArrowRight
//               size={16}
//               strokeWidth={1.9}
//               aria-hidden="true"
//               className="
//                 shrink-0

//                 transition-transform
//                 duration-200

//                 group-hover/view:translate-x-1

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               "
//             />
//           </Link>
//         </header>

//         {/* ===================================================
//             CARDS

//             Phone / Tablet:
//             Horizontal swipe remains enabled.

//             Desktop:
//             5 cards in one row.
//         ==================================================== */}

//         <div
//           role="region"
//           aria-labelledby="latest-updates-heading"
//           tabIndex={0}
//           className="
//             flex

//             snap-x
//             snap-mandatory

//             items-stretch

//             gap-4

//             overflow-x-auto
//             overscroll-x-contain

//             pb-1
//             pt-1

//             focus-visible:outline
//             focus-visible:outline-2
//             focus-visible:outline-offset-4
//             focus-visible:outline-[#EC1C40]

//             sm:gap-5

//             md:gap-5

//             lg:grid
//             lg:grid-cols-5
//             lg:gap-4

//             lg:overflow-visible
//             lg:pb-0

//             xl:gap-5

//             [&::-webkit-scrollbar]:hidden

//             [-ms-overflow-style:none]

//             [scrollbar-width:none]
//           "
//         >
//           {content.map(
//             (item) => (
//               <RelatedBlogCard
//                 key={`${item._type}-${
//                   item._id ||
//                   item.slug?.current ||
//                   item.title
//                 }`}
//                 item={item}
//                 type={item._type}
//               />
//             ),
//           )}
//         </div>

//         {/* ===================================================
//             PHONE / TABLET — VIEW ALL UPDATES BUTTON

//             Replaces:
//             - Swipe text
//             - Left chevron
//             - Right chevron

//             Hidden on desktop.
//         ==================================================== */}

//         <div
//           className="
//             mt-6

//             flex
//             items-center
//             justify-center

//             lg:hidden
//           "
//         >
//           <Link
//             href="/dholera-updates/latest-updates"
//             className="
//               inline-flex
//               items-center
//               justify-center

//               text-[14px]
//               font-semibold
//               leading-5

//               text-[#EC1C40]

//               transition-colors
//               duration-200
//               ease-out

//               hover:text-[#EC1C40]

//               focus-visible:outline-none
//               focus-visible:text-[#EC1C40]

//               sm:text-[14.5px]

//               motion-reduce:transition-none
//             "
//           >
//             View All Updates
//             <ArrowRight
//               size={16}
//               strokeWidth={1.9}
//               aria-hidden="true"
//               className="
//                 shrink-0

//                 transition-transform
//                 duration-200

//                 group-hover/view:translate-x-1

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               "
//             />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { getblogs, getNews } from "@/sanity/lib/api";

import { getSanityImageUrl } from "@/sanity/lib/image";

import RelatedBlogCarousel from "./LatestBlogCrousel";

/* ============================================================
   DATE HELPERS
============================================================ */

function parseDate(date) {
  if (!date) return null;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date) {
  const parsed = parseDate(date);

  if (!parsed) return "";

  return parsed.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/* ============================================================
   EXISTING RELATED BLOG CARD

   IMPORTANT:
   Padding / margins / typography / image ratio remain the same.

   Only desktop width changes so 5 cards remain visible
   inside the horizontal slider.
============================================================ */

function RelatedBlogCard({ item, type }) {
  const basePath =
    type === "blog"
      ? "/dholera-updates/blogs"
      : "/dholera-updates/latest-updates";

  const href = item.slug?.current
    ? `${basePath}/${item.slug.current}`
    : basePath;

  const publishedDate = item.publishedAt || item._createdAt;

  const parsedDate = parseDate(publishedDate);

  const imageUrl = item.mainImage
    ? getSanityImageUrl(item.mainImage, 900, 506)
    : null;

  return (
    <article
      data-related-blog-card
      className="
        group

        flex
        min-w-0
        flex-col

        w-[86vw]
        max-w-[390px]

        shrink-0
        snap-start

        overflow-hidden

        rounded-2xl

        border
        border-[#EC1C40]/30

        bg-white

        shadow-[0_5px_18px_rgba(0,0,0,0.045)]

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        focus-within:border-[#EC1C40]

        sm:w-[320px]

        md:w-[340px]

        lg:w-[calc((100%_-_4rem)/5)]
        lg:max-w-none
        lg:min-w-0

        xl:w-[calc((100%_-_5rem)/5)]

        lg:hover:-translate-y-1
        lg:hover:border-[#EC1C40]/45
        lg:hover:shadow-[0_14px_32px_rgba(236,28,64,0.08)]

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      <Link
        href={href}
        className="
          flex
          h-full
          min-h-0
          flex-col

          rounded-[inherit]

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

            bg-black/[0.025]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.mainImage?.alt || item.title || "Dholera update"}
              fill
              sizes="
                (max-width: 639px) 86vw,
                (max-width: 1023px) 340px,
                20vw
              "
              className="
                object-cover
                object-center

                transition-transform
                duration-500
                ease-out

                lg:group-hover:scale-[1.025]

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
                from-[#EC1C40]/10
                via-[#EC1C40]/5
                to-white
              "
            >
              <span
                className="
                  px-4

                  text-center

                  text-[13px]
                  font-medium

                  text-black/45
                "
              >
                No image available
              </span>
            </div>
          )}

          {/* SUBTLE IMAGE DEPTH */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-t
              from-black/10
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            CONTENT

            EXACT EXISTING PADDING KEPT
        ==================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col

            bg-white

            px-3
            pb-3
            pt-3

            min-[414px]:px-3
            min-[414px]:pb-3
            min-[414px]:pt-3

            sm:px-3
            sm:pb-3
            sm:pt-3

            lg:px-3
            lg:pb-3
            lg:pt-3

            xl:px-3
            xl:pb-3
            xl:pt-3
          "
        >
          {/* =================================================
              TITLE
          ================================================== */}

          <h3
            className="
              line-clamp-2

              min-h-[52px]

              overflow-hidden

              text-[17px]
              font-semibold
              leading-[26px]

              tracking-[-0.015em]

              text-black

              sm:text-[17px]
              sm:leading-[25px]

              lg:min-h-[48px]
              lg:text-[15.5px]
              lg:leading-[23px]

              xl:min-h-[52px]
              xl:text-[16px]
              xl:leading-[24px]
            "
          >
            {item.title}
          </h3>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              mt-3

              border-t
              border-black/10

              sm:mt-3

              lg:mt-3
            "
          />

          {/* =================================================
              DATE + READ MORE
          ================================================== */}

          <div
            className="
              mt-auto

              flex
              min-h-[40px]

              items-end
              justify-between

              gap-2

              pt-2
            "
          >
            {/* DATE */}

            {parsedDate ? (
              <time
                dateTime={parsedDate.toISOString()}
                className="
                  shrink-0

                  text-[13px]
                  font-normal
                  leading-5

                  text-black/50

                  sm:text-[13.5px]

                  lg:text-[12.5px]

                  xl:text-[13px]
                "
              >
                {formatDate(publishedDate)}
              </time>
            ) : (
              <span />
            )}

            {/* READ MORE */}

            <span
              className="
                inline-flex
                shrink-0

                items-center
                justify-center

                whitespace-nowrap

                text-[14px]
                font-semibold
                leading-5

                text-[#EC1C40]

                transition-[color,transform]
                duration-200
                ease-out

                group-hover:text-[#d9183a]

                lg:text-[13.5px]

                xl:text-[14px]

                motion-reduce:transform-none
              "
            >
              Read More
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   LATEST UPDATES
============================================================ */

export default async function LatestUpdates() {
  const [blogsData, updatesData] = await Promise.all([getblogs(), getNews()]);

  /* ============================================================
     MERGE BLOGS + NEWS
  ============================================================ */

  const content = [
    ...(blogsData || []).map((item) => ({
      ...item,
      _type: "blog",
    })),

    ...(updatesData || []).map((item) => ({
      ...item,
      _type: "news",
    })),
  ]
    .sort((a, b) => {
      const dateA = parseDate(a.publishedAt || a._createdAt)?.getTime() ?? 0;

      const dateB = parseDate(b.publishedAt || b._createdAt)?.getTime() ?? 0;

      return dateB - dateA;
    })

    /* ========================================================
       ONLY CHANGE:
       5 -> 8
    ======================================================== */

    .slice(0, 8);

  if (!content.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="latest-updates-heading"
      className="
        w-full

        bg-white

        px-4
        pt-8
        pb-5

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5

        sm:px-6
        sm:pt-10
        sm:pb-6

        md:px-8
        md:pt-10
        md:pb-6

        lg:px-10
        lg:pt-10
        lg:pb-6
      "
    >
      <div
        className="
          mx-auto

          w-full
          max-w-7xl
        "
      >
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}

        <header
          className="
            mb-5

            flex
            flex-col

            gap-3

            sm:mb-6

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-6

            lg:mb-7
          "
        >
          {/* TITLE */}

          <h2
            id="latest-updates-heading"
            className="
              text-left

              text-[28px]
              font-bold
              leading-[1.2]

              tracking-[-0.025em]

              text-black

              sm:text-[30px]

              md:text-[32px]

              lg:text-[34px]
            "
          >
            Latest Dholera{" "}
            <span
              className="
                text-[#EC1C40]
              "
            >
              News &amp; Updates
            </span>
          </h2>

          {/* =================================================
              DESKTOP VIEW ALL
          ================================================== */}

          <Link
            href="/dholera-updates/latest-updates"
            className="
              group/view

              hidden
              w-fit
              shrink-0

              items-center

              gap-1.5

              text-[14px]
              font-semibold
              leading-5

              text-[#EC1C40]

              transition-colors
              duration-200

              hover:text-black

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#EC1C40]

              lg:inline-flex
              lg:self-center
            "
          >
            <span>View All Updates</span>

            <ArrowRight
              size={16}
              strokeWidth={1.9}
              aria-hidden="true"
              className="
                shrink-0

                transition-transform
                duration-200

                group-hover/view:translate-x-1

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          </Link>
        </header>

        {/* ===================================================
            EXISTING RELATED BLOG CARDS

            No new card component is being created.

            RelatedBlogCarousel only controls:
            - scrolling
            - arrows
            - indicators
        ==================================================== */}

        <RelatedBlogCarousel>
          {content.map((item) => (
            <RelatedBlogCard
              key={`${item._type}-${
                item._id || item.slug?.current || item.title
              }`}
              item={item}
              type={item._type}
            />
          ))}
        </RelatedBlogCarousel>

        {/* ===================================================
            PHONE / TABLET VIEW ALL

            Existing spacing preserved.
        ==================================================== */}

        <div
          className="
            mt-6

            flex
            items-center
            justify-center

            lg:hidden
          "
        >
          <Link
            href="/dholera-updates/latest-updates"
            className="
              group/view

              inline-flex

              items-center
              justify-center

              gap-1

              text-[14px]
              font-semibold
              leading-5

              text-[#EC1C40]

              transition-colors
              duration-200
              ease-out

              hover:text-[#EC1C40]

              focus-visible:outline-none
              focus-visible:text-[#EC1C40]

              sm:text-[14.5px]

              motion-reduce:transition-none
            "
          >
            View All Updates
            <ArrowRight
              size={16}
              strokeWidth={1.9}
              aria-hidden="true"
              className="
                shrink-0

                transition-transform
                duration-200

                group-hover/view:translate-x-1

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
