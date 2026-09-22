// // TrendingBlogItem.jsx
// "use client";

// import Link from "next/link";

// export default function TrendingBlogItem({ post }) {
//   if (!post) return null;

//   return (
//     <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
//       <Link
//         href={`/dholera-updates/blogs/${post.slug?.current}`}
//         className="group"
//       >
//         <h3 className="text-lg font-semibold text-[#151f28] group-hover:text-[#FDB913] transition">
//           {post.title}
//         </h3>
//         <p className="text-sm text-[#2863e5] mt-4">
//           <span>
//             <time
//               dateTime={new Date(post.publishedAt).toISOString()}
//               className="text-gray-500"
//             >
//               {new Date(post.publishedAt).toLocaleDateString("en-US", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </time>
//           </span>
//           <br />
//           Posted By{" "}
//           {typeof post.author === "object" ? post.author.name : post.author}
//         </p>
//       </Link>
//     </div>
//   );
// }



"use client";

import Link from "next/link";

/* ============================================================
   DATE FORMATTER
============================================================ */

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* ============================================================
   TRENDING BLOG ITEM
============================================================ */

export default function TrendingBlogItem({ post }) {
  if (!post) return null;

  const slug = post.slug?.current;

  const href =
    slug && slug !== "#"
      ? `/dholera-updates/blogs/${slug}`
      : "/dholera-updates/blogs";

  const authorName =
    typeof post.author === "object"
      ? post.author?.name || "Dholera Times"
      : post.author || "Dholera Times";

  const publishedDate =
    post.publishedAt || post._createdAt;

  return (
    <article
      className="
        border-b
        border-[#EAD9DF]

        py-5

        first:pt-0
        last:border-b-0
        last:pb-0

        sm:py-6
      "
    >
      <Link
        href={href}
        className="
          group

          block

          rounded-lg

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#8F2946]
          focus-visible:ring-offset-4
        "
      >
        {/* ===================================================
            TITLE
        ==================================================== */}

        <h3
          className="
            line-clamp-3

            text-[16px]
            font-semibold
            leading-[24px]

            tracking-[-0.01em]

            text-[#39252E]

            transition-colors
            duration-200

            group-hover:text-[#8F2946]

            sm:text-[17px]
            sm:leading-[25px]

            lg:text-[18px]
            lg:leading-[27px]
          "
        >
          {post.title}
        </h3>

        {/* ===================================================
            META INFORMATION
        ==================================================== */}

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
                new Date(publishedDate).toISOString()
              }
              className="block"
            >
              {formatDate(publishedDate)}
            </time>
          )}

          <p>
            Posted By{" "}
            <span
              className="
                font-semibold

                text-[#2563EB]

                transition-colors
                duration-200

                group-hover:text-[#1D4ED8]
              "
            >
              {authorName}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}