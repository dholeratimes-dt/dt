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

import { getblogs, getNews } from "@/sanity/lib/api";
import { getSanityImageUrl } from "@/sanity/lib/image";

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================================================
   RELATED BLOG / NEWS CARD
========================================================= */

function RelatedBlogCard({ item, type }) {
  const basePath =
    type === "blog"
      ? "/dholera-updates/blogs"
      : "/dholera-updates/latest-updates";

  const href = item.slug?.current
    ? `${basePath}/${item.slug.current}`
    : basePath;

  const publishedDate = item.publishedAt || item._createdAt;

  return (
    <article
      className="
        group w-[82vw] max-w-[280px] shrink-0 snap-start
        overflow-hidden rounded-2xl
        border border-[#14381F]/15 bg-white
        shadow-[0_3px_14px_-8px_rgba(20,56,31,0.18)]
        transition-[border-color,box-shadow] duration-200
        hover:border-[#F4D35E]
        hover:shadow-[0_10px_28px_-12px_rgba(20,56,31,0.25)]
        focus-within:border-[#14381F]
        sm:w-[280px]
        md:w-[290px] md:max-w-[290px]
        lg:w-full lg:min-w-0 lg:max-w-none
        motion-reduce:transition-none
      "
    >
      <Link
        href={href}
        className="
          flex h-full flex-col rounded-2xl
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#14381F]
          focus-visible:ring-inset
        "
      >
        {/* Image */}
        <div
          className="
            relative aspect-[3/2] w-full shrink-0
            overflow-hidden bg-[#14381F]/5
          "
        >
          {item.mainImage ? (
            <Image
              src={getSanityImageUrl(item.mainImage, 1200, 800)}
              alt={item.mainImage?.alt || item.title || "Dholera update"}
              fill
              sizes="
                (min-width: 1280px) 286px,
                (min-width: 1024px) calc((100vw - 136px) / 4),
                (min-width: 768px) 290px,
                (min-width: 342px) 280px,
                82vw
              "
              loading="lazy"
              className="
                object-cover transition-transform duration-300
                group-hover:scale-[1.03]
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          ) : (
            <div
              className="
                flex h-full w-full items-center justify-center
                bg-[#14381F]/5
              "
            >
              <span className="text-sm text-[#14381F]/70">
                No image
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3
            className="
              line-clamp-2 text-[16px] font-semibold
              leading-6 text-[#14381F]
              md:text-[17px] md:leading-[26px]
            "
          >
            {item.title}
          </h3>

          <div className="mt-3 text-[13px] leading-5 text-[#14381F]/70">
            <time className="block">
              {formatDate(publishedDate)}
            </time>

            <span className="mt-1 block font-medium text-[#14381F]">
              Dholera Times
            </span>
          </div>

          <div className="mt-auto pt-5">
            <span
              className="
                inline-flex items-center
                text-[14px] font-semibold leading-5 text-[#14381F]
                underline decoration-[#F4D35E] decoration-2
                underline-offset-[6px]
                transition-colors duration-200
                group-hover:decoration-[#14381F]
                motion-reduce:transition-none
              "
            >
              Explore More
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =========================================================
   LATEST UPDATES
========================================================= */

export default async function LatestUpdates() {
  const [blogsData, updatesData] = await Promise.all([
    getblogs(),
    getNews(),
  ]);

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
      const dateA = new Date(a.publishedAt || a._createdAt).getTime();
      const dateB = new Date(b.publishedAt || b._createdAt).getTime();

      return (Number.isNaN(dateB) ? 0 : dateB) -
        (Number.isNaN(dateA) ? 0 : dateA);
    })
    .slice(0, 4);

  if (!content.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="latest-updates-heading"
      className="
        bg-[#FAFAF6] py-10
        md:py-12 lg:py-14
        selection:bg-[#F4D35E] selection:text-[#14381F]
      "
    >
      <div
        className="
          mx-auto w-full max-w-7xl
          px-4 min-[414px]:px-6 md:px-8
        "
      >
        {/* Heading */}
        <header className="mb-7 md:mb-9">
          <h2
            id="latest-updates-heading"
            className="
              max-w-[960px] text-left
              text-[28px] font-bold leading-[36px]
              tracking-tight text-[#14381F]
              md:mx-auto md:text-center
              md:text-[36px] md:leading-[44px]
              lg:text-[40px] lg:leading-[48px]
            "
          >
            Stay Updated with Dholera&apos;s Latest Developments
          </h2>
        </header>

        {/* Cards */}
        <div
          className="
            flex items-stretch gap-4
            snap-x snap-proximity overflow-x-auto
            pb-4 pt-1
            md:gap-6
            lg:grid lg:grid-cols-4
            lg:overflow-visible
            [&::-webkit-scrollbar]:hidden
            [scrollbar-width:none]
          "
        >
          {content.map((item) => (
            <RelatedBlogCard
              key={`${item._type}-${item._id || item.slug?.current || item.title}`}
              item={item}
              type={item._type}
            />
          ))}
        </div>
      </div>
    </section>
  );
}