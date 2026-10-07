import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { getSanityImageUrl } from "@/sanity/lib/image";

/* ============================================================
   DATE HELPERS
============================================================ */

function parseDate(value) {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

function formatDate(value) {
  const date = parseDate(value);

  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/* ============================================================
   BLOG CARD
============================================================ */

export default function BlogCard({ post }) {
  if (!post) return null;

  const slug = post.slug?.current;

  const href = slug
    ? `/dholera-sir/${slug}`
    : "/dholera-sir";

  const publishedDate =
    post.publishedAt ||
    post._createdAt;

  const parsedDate =
    parseDate(publishedDate);

  const imageUrl = post.mainImage
    ? getSanityImageUrl(
        post.mainImage,
        1200,
        675,
      )
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
        rounded-[20px]
        border
        border-[#EC1C40]/45
        bg-white
        shadow-[0_6px_22px_rgba(0,0,0,0.035)]
        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out
        md:hover:-translate-y-1
        md:hover:border-[#EC1C40]/65
        md:hover:shadow-[0_16px_36px_rgba(236,28,64,0.08)]

        motion-reduce:transform-none
        motion-reduce:transition-none

        sm:rounded-[22px]
      "
    >
      <Link
        href={href}
        className="
          flex
          h-full
          min-w-0
          flex-col

          rounded-[inherit]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#EC1C40]
        "
      >
        {/* =====================================================
            IMAGE
        ====================================================== */}

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
              alt={
                post.mainImage?.alt ||
                post.title ||
                "Dholera SIR"
              }
              fill
              sizes="
                (max-width: 639px) calc(100vw - 32px),
                (max-width: 1023px) 50vw,
                33vw
              "
              className="
                object-cover
                object-center

                transition-transform
                duration-500
                ease-out

                md:group-hover:scale-[1.025]

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

                px-4
              "
            >
              <span
                className="
                  text-center

                  text-[13px]
                  font-medium

                  text-black/50

                  sm:text-[14px]
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
              from-black/[0.08]
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col

            bg-white

            px-3
            pb-3
            pt-4

            min-[414px]:px-5
            min-[414px]:pb-5
            min-[414px]:pt-5

            sm:px-5
            sm:pb-5
            sm:pt-5

            lg:px-3
            lg:pb-3
            lg:pt-3
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

              tracking-[-0.018em]

              text-black

              sm:min-h-[56px]
              sm:text-[18px]
              sm:leading-[28px]

              lg:text-[18px]

              xl:text-[19px]
              xl:leading-[28px]
            "
          >
            {post.title}
          </h3>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              mt-5

              w-full

              border-t
              border-black/10
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
              pb-1
              items-end
              justify-between

              gap-3
            "
          >
            {/* DATE */}

            {parsedDate ? (
              <time
                dateTime={
                  parsedDate.toISOString()
                }
                className="
                  shrink-0

                  text-[14px]
                  font-normal
                  leading-5

                  text-black/50

                  sm:text-[15px]

                  lg:text-[14px]

                  xl:text-[15px]
                "
              >
                {formatDate(
                  publishedDate,
                )}
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

                gap-1.5

                whitespace-nowrap

                text-[14px]
                font-semibold
                leading-5

                text-[#EC1C40]

                transition-colors
                duration-200
                ease-out

                group-hover:text-[#D9183A]

                sm:text-[15px]
              "
            >
              <span>
                Read More
              </span>

              <ArrowRight
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
                className="
                  shrink-0

                  transition-transform
                  duration-200
                  ease-out

                  group-hover:translate-x-1

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}