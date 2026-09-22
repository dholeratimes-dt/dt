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
//     <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105">
//       {/* Image */}
//       <Link href={`/dholera-updates/blogs/${post.slug.current}`} className="">
//         {/* Changed to aspect-[3/2] to match your image ratio */}
//         <div className="relative w-full aspect-[3/2]">
//           {post.mainImage ? (
//             <Image
//               src={getSanityImageUrl(post.mainImage, 1200, 800)}
//               alt={post.mainImage?.alt || post.title || "Dholera update"}
//               width={1200}
//               height={800}
//               unoptimized
//               className="object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-400">No image available</span>
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="flex flex-col flex-grow">
//           <div className="w-full px-4 py-2 transition-all font-semibold border-white hover:bg-[#d6b873] bg-[#151f28] hover:text-[#151f28] text-lg md:text-base text-[#d6b873] mt-auto space-y-3">
//             {/* Title */}
//             <h3 className="text-xl font-semibold line-clamp-2 h-14">
//               {post.title}
//             </h3>

//             {/* Meta info */}
//             <div className="text-sm text-gray-400">
//               <time>
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
//             <div className="underline underline-offset-4 text-lg">
//               Read More
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }


import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
} from "lucide-react";

import {
  getSanityImageUrl,
} from "@/sanity/lib/image";

/* ============================================================
   DATE
============================================================ */

const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date =
    new Date(dateString);

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
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
};

/* ============================================================
   CARD
============================================================ */

export default function BlogCard({
  post,
}) {
  const authorName =
    typeof post.author ===
    "object"
      ? post.author?.name ||
        "Dholera Times"
      : post.author ||
        "Dholera Times";

  const slug =
    post.slug?.current;

  const href =
    slug && slug !== "#"
      ? `/dholera-updates/blogs/${slug}`
      : "/dholera-updates/blogs";

  const publishedDate =
    post.publishedAt ||
    post._createdAt;

  const imageUrl =
    post.mainImage
      ? getSanityImageUrl(
          post.mainImage,
          1200,
          800,
        )
      : null;

  return (
    <article
      className="
        group

        flex
        h-full
        min-w-0
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-[#E0A4B5]/65

        bg-white

        shadow-[0_5px_18px_rgba(57,37,46,0.045)]

        transition-[border-color,box-shadow,transform]
        duration-300
        ease-out

        md:hover:-translate-y-1
        md:hover:border-[#8F2946]

        md:hover:shadow-[0_16px_38px_rgba(116,32,57,0.11)]

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
        {/* ===================================================
            IMAGE
        ==================================================== */}

        <div
          className="
            relative

            aspect-[3/2]
            w-full
            shrink-0

            overflow-hidden

            bg-[#F3E7EC]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                post.mainImage
                  ?.alt ||
                post.title ||
                "Dholera update"
              }
              fill
              unoptimized
              sizes="
                (max-width: 639px) calc(100vw - 32px),
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

                bg-gradient-to-br
                from-[#F3E7EC]
                via-[#F7EEF1]
                to-[#FAF7F8]
              "
            >
              <span
                className="
                  text-[14px]
                  font-medium

                  text-[#78666E]
                "
              >
                No image available
              </span>
            </div>
          )}

          {/* subtle overlay */}

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

        {/* ===================================================
            CONTENT
        ==================================================== */}

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
          {/* TITLE */}

          <h3
            className="
              line-clamp-2

              text-[17px]
              font-semibold
              leading-[25px]

              tracking-[-0.015em]

              text-[#39252E]

              transition-colors
              duration-200

              md:min-h-[50px]
              md:group-hover:text-[#8F2946]

              lg:text-[18px]
              lg:leading-[27px]
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

              text-[#78666E]

              sm:text-[14px]
            "
          >
            {publishedDate && (
              <time
                dateTime={
                  new Date(
                    publishedDate,
                  ).toISOString()
                }
                className="block"
              >
                {formatDate(
                  publishedDate,
                )}
              </time>
            )}

            <p>
              Posted By{" "}
              <span
                className="
                  font-semibold
                  text-[#51414A]
                "
              >
                {authorName}
              </span>
            </p>
          </div>

          {/* CTA */}

          <div
            className="
              mt-auto
              pt-5
            "
          >
            <div
              className="
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
              <span
                className="
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
                Read More
              </span>

              <span
                aria-hidden="true"
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

                  transition-[background-color,color,transform]
                  duration-200

                  md:group-hover:translate-x-0.5
                  md:group-hover:bg-[#8F2946]
                  md:group-hover:text-white

                  motion-reduce:transform-none
                "
              >
                <ArrowUpRight
                  size={17}
                  strokeWidth={2}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
