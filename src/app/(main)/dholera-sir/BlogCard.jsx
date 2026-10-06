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
        border-black/10

        bg-white

        shadow-[0_6px_22px_rgba(0,0,0,0.04)]

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        md:hover:-translate-y-1
        md:hover:border-[#EC1C40]/30
        md:hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]

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
          focus-visible:ring-[#EC1C40]
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
            bg-black/[0.025]
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

                bg-black/[0.025]

                px-4
              "
            >
              <span
                className="
                  text-[14px]
                  font-medium
                  text-black/60
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
              from-black/10
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

              text-black


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
              font-medium
              leading-5

              text-black/60

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
              <span className="text-black/60">
                Posted By{" "}
              </span>

              <span
                className="
                  font-medium
                  text-[#EC1C40]
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
                border-black/10

                pt-3
              "
            >
              <span
                className="
                  text-[14px]
                  font-semibold
                  leading-6

                  text-[#EC1C40]

                  transition-colors
                  duration-200

                  group-hover:text-[#EC1C40]

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

                  border
                  border-[#EC1C40]/10

                  bg-[#EC1C40]/5

                  text-[#EC1C40]

                  shadow-[0_4px_12px_rgba(0,0,0,0.04)]

                  transition-[background-color,color,border-color,transform,box-shadow]
                  duration-200

                  md:group-hover:-translate-y-0.5
                  md:group-hover:translate-x-0.5
                  md:group-hover:border-[#EC1C40]
                  md:group-hover:bg-[#EC1C40]
                  md:group-hover:text-white
                  md:group-hover:shadow-[0_6px_16px_rgba(236,28,64,0.18)]

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