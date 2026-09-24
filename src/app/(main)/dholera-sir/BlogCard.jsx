// import Image from "next/image";
// import Link from "next/link";
// import { getSanityImageUrl } from "@/sanity/lib/image";

// export default function BlogCard({ post }) {
//   // Handle author object properly
//   const authorName =
//     typeof post.author === "object"
//       ? post.author.name || "Unknown"
//       : post.author;

//   return (
//     <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-2xl transition-transform duration-300 md:hover:scale-[1.02]">
//       {/* Image */}
//       <Link
//         href={`/dholera-sir/${post.slug.current}`}
//         className="flex h-full flex-col"
//       >
//         {/* Changed to aspect-[3/2] to match your image ratio */}
//         <div className="relative aspect-[3/2] w-full">
//           {post.mainImage ? (
//             <Image
//               src={getSanityImageUrl(post.mainImage, 1200, 800)}
//               alt={post.mainImage?.alt || post.title || "Dholera SIR"}
//               width={1200}
//               height={800}
//               unoptimized
//               sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
//               className="object-cover"
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center bg-gray-200">
//               <span className="text-gray-400">No image available</span>
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="flex flex-grow flex-col">
//           <div className="mt-auto flex h-full w-full flex-col space-y-3 bg-[#151f28] px-4 py-3 font-semibold text-[#d6b873] transition-all hover:bg-[#d6b873] hover:text-[#151f28]">
//             {/* Title */}
//             <h3 className="min-h-[3.5rem] text-[clamp(1.125rem,2vw,1.25rem)] font-semibold leading-[1.4] line-clamp-2">
//               {post.title}
//             </h3>

//             {/* Meta info */}
//             <div className="text-sm leading-[1.6] text-gray-400">
//               <time
//                 dateTime={new Date(post.publishedAt).toISOString()}
//                 className="text-gray-500"
//               >
//                 {new Date(post.publishedAt).toLocaleDateString("en-US", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </time>
//               <div>
//                 Posted By{" "}
//                 <span className="font-medium text-white">{authorName}</span>
//               </div>
//             </div>

//             {/* CTA */}
//             <div className="text-base underline underline-offset-4">
//               Explore More
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }



import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getSanityImageUrl } from "@/sanity/lib/image";

function parseDate(value) {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = parseDate(value);

  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function BlogCard({ post }) {
  if (!post) return null;

  const authorName =
    typeof post.author === "object"
      ? post.author?.name || "Dholera Times"
      : post.author || "Dholera Times";

  const slug = post.slug?.current;

  const href = slug
    ? `/dholera-sir/${slug}`
    : "/dholera-sir";

  const publishedDate =
    post.publishedAt || post._createdAt;

  const parsedDate = parseDate(publishedDate);

  const imageUrl = post.mainImage
    ? getSanityImageUrl(post.mainImage, 1200, 800)
    : null;

  return (
    <article
      className="
        group
        relative

        flex
        h-full
        min-w-0
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-[#8F2946]/55

        bg-white

        shadow-[0_6px_22px_rgba(57,37,46,0.05)]

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        md:hover:-translate-y-1
        md:hover:border-[#DCA9B8]
        md:hover:shadow-[0_16px_36px_rgba(143,41,70,0.10)]

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
          focus-visible:ring-[#8F2946]
          focus-visible:ring-offset-2
        "
      >
        {/* IMAGE */}
        <div
          className="
            relative
            aspect-[3/2]
            w-full
            shrink-0
            overflow-hidden
            bg-[#F7EBEF]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                post.mainImage?.alt ||
                post.title ||
                "Dholera SIR"
              }
              fill
              sizes="
                (max-width: 767px) calc(100vw - 32px),
                (max-width: 1023px) 50vw,
                33vw
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
                bg-[#F7EBEF]
                px-4
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
              from-[#39252E]/12
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

            px-4
            pb-4
            pt-5

            sm:px-5
            sm:pb-5
          "
        >
          {/* TITLE */}
          <h3
            className="
              line-clamp-2

              min-h-[50px]

              text-[17px]
              font-semibold
              leading-[25px]

              tracking-[-0.015em]

              text-[#39252E]

              transition-colors
              duration-200

              group-hover:text-[#8F2946]

              sm:min-h-[52px]
              sm:text-[18px]
              sm:leading-[26px]

              xl:text-[19px]

              motion-reduce:transition-none
            "
          >
            {post.title}
          </h3>

          {/* META */}
          <div
            className="
              mt-3
              space-y-1

              text-[13px]
              leading-5

              font-medium
              text-[#2563EB]

              sm:text-[14px]
            "
          >
            {parsedDate && (
              <time
                dateTime={parsedDate.toISOString()}
                className="block"
              >
                {formatDate(publishedDate)}
              </time>
            )}

            {/* <div>
              <span className="text-[#78666E]">
                Posted By{" "}
              </span>

              <span
                className="
                  font-medium
                  text-[#2563EB]
                "
              >
                {authorName}
              </span>
            </div> */}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-5">
            <div
              className="
                flex
                min-h-[48px]

                items-center
                justify-between

                border-t
                border-[#EAD9DF]

                pt-3
              "
            >
              <span
                className="
                  text-[14px]
                  font-semibold
                  leading-6

                  text-[#8F2946]

                  transition-colors
                  duration-200

                  group-hover:text-[#742039]

                  sm:text-[15px]
                "
              >
                Explore More
              </span>

              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#F7EBEF]

                  text-[#8F2946]

                  shadow-[0_4px_12px_rgba(143,41,70,0.06)]

                  transition-[background-color,color,transform,box-shadow]
                  duration-200

                  md:group-hover:-translate-y-0.5
                  md:group-hover:translate-x-0.5
                  md:group-hover:bg-[#8F2946]
                  md:group-hover:text-white

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-[17px] w-[17px]"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}