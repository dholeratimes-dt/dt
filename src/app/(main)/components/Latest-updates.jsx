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
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function RelatedBlogCard({ item, type }) {
  const basePath = type === "blog"
    ? "/dholera-updates/blogs"
    : "/dholera-updates/latest-updates";
  const href = item.slug?.current
    ? `${basePath}/${item.slug.current}`
    : basePath;
  const publishedDate = item.publishedAt || item._createdAt;
  const parsedDate = parseDate(publishedDate);
  const imageUrl = item.mainImage
    ? getSanityImageUrl(item.mainImage, 1200, 800)
    : null;

  return (
    <article
      className="group flex w-[86vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#E0A4B5]/60 bg-white shadow-[0_4px_18px_rgba(143,41,70,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-[#8F2946] hover:shadow-[0_12px_32px_rgba(143,41,70,0.10)] focus-within:border-[#8F2946] sm:w-[340px] lg:w-full lg:min-w-0 lg:max-w-none motion-reduce:transition-none"
    >
      <Link
        href={href}
        className="flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8F2946]"
      >
        <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden border-b border-[#EAD9DF] bg-[#FAF7F8]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.mainImage?.alt || item.title || "Dholera update"}
              fill
              sizes="(min-width: 1440px) 326px, (min-width: 1024px) calc((100vw - 136px) / 4), (min-width: 396px) 340px, 86vw"
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#FAF7F8]">
              <span className="text-sm text-[#525252]">No image</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="line-clamp-2 text-base font-semibold leading-[26px] tracking-[-0.01em] text-[#171717] transition-colors duration-200 group-hover:text-[#742039] motion-reduce:transition-none md:text-[18px] md:leading-7">
            {item.title}
          </h3>

          <div className="mt-3 text-[13px] leading-5 text-[#525252]">
            {parsedDate && (
              <time dateTime={parsedDate.toISOString()} className="block">
                {formatDate(publishedDate)}
              </time>
            )}
            <span className="mt-1 block text-sm font-medium leading-6 text-[#171717]">
              Dholera Times
            </span>
          </div>

          <div className="mt-auto pt-5">
            <div className="flex min-h-11 items-center justify-between gap-3 border-t border-[#EAD9DF] pt-3">
              <span className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#8F2946] px-4 py-2.5 text-sm font-semibold leading-6 text-white transition-colors duration-200 group-hover:bg-[#742039] group-focus-visible:bg-[#742039] motion-reduce:transition-none">
                Explore More
              </span>

            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function LatestUpdates() {
  const [blogsData, updatesData] = await Promise.all([getblogs(), getNews()]);

  const content = [
    ...(blogsData || []).map((item) => ({ ...item, _type: "blog" })),
    ...(updatesData || []).map((item) => ({ ...item, _type: "news" })),
  ]
    .sort((a, b) => {
      const dateA = parseDate(a.publishedAt || a._createdAt)?.getTime() ?? 0;
      const dateB = parseDate(b.publishedAt || b._createdAt)?.getTime() ?? 0;
      return dateB - dateA;
    })
    .slice(0, 4);

  if (!content.length) return null;

  return (
    <section
      aria-labelledby="latest-updates-heading"
      className="bg-[#FAF7F8] py-10 selection:bg-[#E0A4B5] selection:text-[#171717] md:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 min-[414px]:px-6 md:px-8">
        <header className="mb-6 md:mb-8">
          <div aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#E0A4B5] md:mx-auto" />
          <h2
            id="latest-updates-heading"
            className="max-w-[960px] text-left text-[26px] font-semibold leading-[1.3] tracking-tight text-[#8F2946] sm:text-[30px] md:mx-auto md:text-center md:text-[34px] lg:text-[38px]"
          >
            Stay Updated with Dholera&apos;s Latest Developments
          </h2>
        </header>

        <div
          role="region"
          aria-labelledby="latest-updates-heading"
          tabIndex={0}
          className="flex snap-x snap-proximity items-stretch gap-4 overflow-x-auto overscroll-x-contain rounded-lg pb-4 pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8F2946] md:gap-6 lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#8F2946] [&::-webkit-scrollbar-track]:bg-[#EAD9DF] [scrollbar-width:thin] [scrollbar-color:#8F2946_#EAD9DF]"
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
