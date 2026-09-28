// import { getblogs, getNews } from '@/sanity/lib/api';
// import Image from 'next/image';
// import Link from 'next/link';
// import { getSanityImageUrl } from '@/sanity/lib/image';

// function RelatedBlogCard({ item, type }) {
//   const slug =
//     type === 'blog'
//       ? `/dholera-updates/blogs/${item.slug?.current || '#'}`
//       : `/dholera-updates/latest-updates/${item.slug?.current || '#'}`;

//   return (
//     <div className='flex-shrink-0  w-56 md:w-72 mx-3 snap-center cursor-pointer'>
//       <div className='rounded-xl  overflow-hidden bg-white border border-[#426A77] transition-all duration-300 hover:scale-105'>
//         <div className='relative w-full h-36 md:h-48 aspect-[3/2]'>
//           {item.mainImage ? (
//             <Image
//               src={getSanityImageUrl(item.mainImage, 1200, 800)}
//               alt={item.mainImage?.alt || item.title || 'Dholera update'}
//               fill
//               sizes='(max-width: 768px) 75vw, 288px'
//               loading='lazy'
//               className='object-cover'
//             />
//           ) : (
//             <div className='w-full h-full bg-gray-700 flex items-center justify-center'>
//               <span className='text-gray-400'>No image</span>
//             </div>
//           )}
//         </div>

//         <div className='p-4'>
//           <Link href={slug} className='block'>
//             <h3 className='text-base font-semibold text-[#081719] line-clamp-2 mb-2  transition-colors duration-300'>
//               {item.title}
//             </h3>
//             <div className='text-xs text-[#081719]-600 mb-3'>
//               <time className='block mb-1'>
//                 {new Date(item.publishedAt || item._createdAt).toLocaleDateString(
//                   'en-US',
//                   {
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric',
//                   },
//                 )}
//               </time>
//               <span className='font-medium text-[#081719]'>Dholera Times</span>
//             </div>

//             <span className='text-[#426A77] hover:text-white text-sm font-medium inline-flex items-center group underline underline-offset-4'>
//               Explore More
//             </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function LatestUpdates() {
//   const [blogsData, updatesData] = await Promise.all([getblogs(), getNews()]);

//   const content = [
//   ...(blogsData || []).map((item) => ({ ...item, _type: 'blog' })),
//   ...(updatesData || []).map((item) => ({ ...item, _type: 'news' })),
// ]
//   .sort(
//     (a, b) =>
//       new Date(b.publishedAt || b._createdAt) -
//       new Date(a.publishedAt || a._createdAt),
//   )
//   .slice(0, 4);

//   return (
//     <section className='py-12'>
//       <div className='max-w-7xl mx-auto px-4'>
//         <h2 className='text-2xl md:text-4xl text-center font-bold text-[#081719] mb-4'>
//           Stay Updated with Dholera’s Latest Developments
//         </h2>

//         <div className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6'>
//           {content.map((item) => (
//             <RelatedBlogCard
//               key={item._id || item.slug?.current || item.title}
//               item={item}
//               type={item._type}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getblogs,
  getNews,
} from "@/sanity/lib/api";

import { getSanityImageUrl } from "@/sanity/lib/image";

/* ============================================================
   DATE HELPERS
============================================================ */

function parseDate(date) {
  if (!date) return null;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? null
    : parsed;
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
   UPDATE CARD
============================================================ */

function RelatedBlogCard({
  item,
  type,
}) {
  const basePath =
    type === "blog"
      ? "/dholera-updates/blogs"
      : "/dholera-updates/latest-updates";

  const href =
    item.slug?.current
      ? `${basePath}/${item.slug.current}`
      : basePath;

  const publishedDate =
    item.publishedAt ||
    item._createdAt;

  const parsedDate =
    parseDate(publishedDate);

  const imageUrl =
    item.mainImage
      ? getSanityImageUrl(
          item.mainImage,
          900,
          600,
        )
      : null;

  return (
    <article
      className="
        group

        w-[78vw]
        max-w-[290px]

        shrink-0
        snap-start

        overflow-hidden

        rounded-xl

        border
        border-black/10

        bg-white

        shadow-[0_4px_16px_rgba(0,0,0,0.045)]

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        focus-within:border-[#EC1C40]

        sm:w-[280px]

        md:w-[290px]

        lg:w-full
        lg:max-w-none
        lg:min-w-0

        lg:hover:-translate-y-1
        lg:hover:border-[#EC1C40]/30
        lg:hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]

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

            aspect-[16/10]
            w-full

            shrink-0

            overflow-hidden

            border-b
            border-black/10

            bg-[#EC1C40]/5
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                item.mainImage?.alt ||
                item.title ||
                "Dholera update"
              }
              fill
              sizes="
                (max-width: 639px) 78vw,
                (max-width: 1023px) 290px,
                20vw
              "
              className="
                object-cover
                object-center

                transition-transform
                duration-500
                ease-out

                lg:group-hover:scale-[1.035]

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
                from-[#EC1C40]/5
                via-[#EC1C40]/[0.035]
                to-white
              "
            >
              <span
                className="
                  px-4

                  text-center

                  text-[13px]
                  font-medium

                  text-black/60
                "
              >
                No image available
              </span>
            </div>
          )}

          {/* IMAGE DEPTH */}

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
        ==================================================== */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col

            px-4
            pb-4
            pt-4
          "
        >
          {/* =================================================
              TITLE
          ================================================== */}

          <h3
            className="
              line-clamp-2
              overflow-hidden

              text-[14.5px]
              font-semibold
              leading-[21px]

              tracking-[-0.01em]

              text-black

              sm:text-[15px]
              sm:leading-[22px]

              lg:text-[15px]
              lg:leading-[22px]
            "
          >
            {item.title}
          </h3>

          {/* =================================================
              DATE
          ================================================== */}

          {parsedDate && (
            <time
              dateTime={
                parsedDate.toISOString()
              }
              className="
                mt-2.5

                block
                shrink-0

                text-[12px]
                font-medium
                leading-5

                text-[#EC1C40]

                sm:text-[12.5px]
              "
            >
              {formatDate(
                publishedDate,
              )}
            </time>
          )}

          {/* =================================================
              EXPLORE MORE
          ================================================== */}

          <div
            className="
              mt-auto

              pt-4
            "
          >
            <div
              className="
                border-t
                border-black/10

                pt-3
              "
            >
              <span
                className="
                  inline-flex

                  min-h-[38px]

                  items-center
                  justify-center

                  gap-1.5

                  rounded-lg

                  bg-black/[0.045]

                  px-3.5
                  py-2

                  text-[13px]
                  font-semibold
                  leading-5

                  text-black

                  transition-[background-color,color,transform]
                  duration-200
                  ease-out

                  group-hover:bg-[#EC1C40]
                  group-hover:text-white

                  sm:text-[13.5px]

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <span>
                  Explore More
                </span>
              </span>
            </div>
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
  const [
    blogsData,
    updatesData,
  ] = await Promise.all([
    getblogs(),
    getNews(),
  ]);

  /* ============================================================
     MERGE BLOGS + NEWS
  ============================================================ */

  const content = [
    ...(blogsData || []).map(
      (item) => ({
        ...item,
        _type: "blog",
      }),
    ),

    ...(updatesData || []).map(
      (item) => ({
        ...item,
        _type: "news",
      }),
    ),
  ]
    .sort((a, b) => {
      const dateA =
        parseDate(
          a.publishedAt ||
            a._createdAt,
        )?.getTime() ?? 0;

      const dateB =
        parseDate(
          b.publishedAt ||
            b._createdAt,
        )?.getTime() ?? 0;

      return dateB - dateA;
    })
    .slice(0, 5);

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
        py-8

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-10

        lg:px-10
        lg:py-12
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

            md:flex-row
            md:items-center
            md:justify-between
            md:gap-6

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

            <span className="text-[#EC1C40]">
              News &amp; Updates
            </span>
          </h2>

          {/* =================================================
              VIEW ALL UPDATES
          ================================================== */}

          <Link
            href="/dholera-updates/latest-updates"
            className="
              group/view

              inline-flex
              w-fit

              shrink-0

              items-center

              gap-1.5

              text-[13px]
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

              sm:text-[14px]

              md:self-center
            "
          >
            <span>
              View All Updates
            </span>

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
            CARDS

            Phone / Tablet:
            Horizontal swipe

            Desktop:
            5 cards in one row
        ==================================================== */}

        <div
          role="region"
          aria-labelledby="latest-updates-heading"
          tabIndex={0}
          className="
            flex

            snap-x
            snap-mandatory

            items-stretch

            gap-4

            overflow-x-auto
            overscroll-x-contain

            pb-1
            pt-1

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-[#EC1C40]

            sm:gap-5

            md:gap-5

            lg:grid
            lg:grid-cols-5
            lg:gap-4

            lg:overflow-visible
            lg:pb-0

            xl:gap-5

            [&::-webkit-scrollbar]:hidden

            [-ms-overflow-style:none]

            [scrollbar-width:none]
          "
        >
          {content.map(
            (item) => (
              <RelatedBlogCard
                key={`${item._type}-${
                  item._id ||
                  item.slug?.current ||
                  item.title
                }`}
                item={item}
                type={item._type}
              />
            ),
          )}
        </div>

        {/* ===================================================
            SWIPE INDICATOR
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            mt-5

            flex
            items-center
            justify-center

            lg:hidden
          "
        >
          <div
            className="
              inline-flex

              items-center
              justify-center

              gap-3

              text-[#EC1C40]
            "
          >
            {/* LEFT */}

            <span
              className="
                flex

                h-8
                w-8

                items-center
                justify-center

                rounded-full

                border
                border-[#EC1C40]/20

                bg-[#EC1C40]/5

                text-[#EC1C40]
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>

            {/* TEXT */}

            <span
              className="
                text-[12px]
                font-semibold
                leading-5

                tracking-[0.04em]

                text-[#EC1C40]

                sm:text-[13px]
              "
            >
              Swipe
            </span>

            {/* RIGHT */}

            <span
              className="
                flex

                h-8
                w-8

                items-center
                justify-center

                rounded-full

                border
                border-[#EC1C40]/20

                bg-[#EC1C40]/5

                text-[#EC1C40]
              "
            >
              <ChevronRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}