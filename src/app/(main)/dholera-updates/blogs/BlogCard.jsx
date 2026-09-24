import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getSanityImageUrl } from "@/sanity/lib/image";

/* ============================================================
   DATE HELPERS
============================================================ */

const getValidDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (dateString) => {
  const date = getValidDate(dateString);

  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* ============================================================
   BLOG CARD
============================================================ */

export default function BlogCard({ post }) {
  const slug = post.slug?.current;

  const href =
    slug && slug !== "#"
      ? `/dholera-updates/blogs/${slug}`
      : "/dholera-updates/blogs";

  const publishedDate =
    post.publishedAt || post._createdAt;

  const validPublishedDate =
    getValidDate(publishedDate);

  const imageUrl = post.mainImage
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

        aspect-[4/5]

        w-full
        min-w-0

        overflow-hidden

        rounded-[16px]

        border
        border-[#E0A4B5]/60

        bg-white

        shadow-[0_5px_18px_rgba(57,37,46,0.05)]

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        focus-within:border-[#8F2946]

        sm:rounded-[18px]

        md:hover:-translate-y-1
        md:hover:border-[#8F2946]
        md:hover:shadow-[0_14px_32px_rgba(116,32,57,0.10)]

        lg:rounded-[20px]

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      <Link
        href={href}
        className="
          grid
          h-full
          min-h-0

          grid-rows-[55fr_45fr]

          rounded-[inherit]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#8F2946]
        "
      >
        {/* ===================================================
            IMAGE — 55%
        ==================================================== */}

        <div
          className="
            relative

            min-h-0
            w-full

            overflow-hidden

            bg-[#F3E7EC]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                post.mainImage?.alt ||
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
                object-center

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
                  px-4

                  text-center

                  text-[13px]
                  font-medium

                  text-[#78666E]

                  sm:text-[14px]
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
              from-[#39252E]/14
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            CONTENT — 45%
        ==================================================== */}

        <div
          className="
            flex
            min-h-0
            flex-col

            px-4
            pb-4
            pt-4

            min-[390px]:px-[18px]
            min-[390px]:pb-[17px]
            min-[390px]:pt-[17px]

            sm:px-5
            sm:pb-5
            sm:pt-[18px]

            lg:px-5
            lg:pb-5
            lg:pt-5

            xl:px-6
          "
        >
          {/* =================================================
              TITLE
              Maximum 2 lines + ellipsis
          ================================================== */}

          <h3
            className="
              line-clamp-2
              overflow-hidden

              text-[16px]
              font-semibold
              leading-[22px]

              tracking-[-0.015em]

              text-[#39252E]

              transition-colors
              duration-200

              min-[390px]:text-[16.5px]
              min-[390px]:leading-[23px]

              sm:text-[17px]
              sm:leading-[24px]

              md:group-hover:text-[#8F2946]

              lg:text-[17.5px]
              lg:leading-[25px]
            "
          >
            {post.title}
          </h3>

          {/* =================================================
              DATE
          ================================================== */}

          {validPublishedDate && (
            <div
              className="
                mt-2.5

                shrink-0

                sm:mt-3

                lg:mt-3
              "
            >
              <time
                dateTime={
                  validPublishedDate.toISOString()
                }
                className="
                  block

                  text-[13px]
                  font-medium
                  leading-5

                  text-[#76636B]

                  sm:text-[13.5px]

                  lg:text-[14px]
                "
              >
                {formatDate(
                  publishedDate,
                )}
              </time>
            </div>
          )}

          {/* =================================================
              CTA
          ================================================== */}

          <div
            className="
              mt-auto

              shrink-0

              border-t
              border-[#EAD9DF]

              pt-3

              min-[390px]:pt-3.5

              sm:pt-3.5

              lg:pt-4
            "
          >
            <div
              className="
                flex

                items-center
                justify-between

                gap-3
              "
            >
              {/* READ MORE */}

              <span
                className="
                  text-[14px]
                  font-semibold
                  leading-5

                  text-[#8F2946]

                  transition-colors
                  duration-200

                  sm:text-[14.5px]

                  md:group-hover:text-[#742039]

                  lg:text-[15px]
                  lg:leading-6
                "
              >
                Read More
              </span>

              {/* ARROW */}

              <span
                aria-hidden="true"
                className="
                  flex

                  h-8
                  w-8

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#F7EBEF]

                  text-[#8F2946]

                  transition-[transform,background-color,color]
                  duration-200
                  ease-out

                  min-[390px]:h-9
                  min-[390px]:w-9

                  sm:h-9
                  sm:w-9

                  md:group-hover:translate-x-0.5
                  md:group-hover:bg-[#8F2946]
                  md:group-hover:text-white

                  motion-reduce:transform-none
                "
              >
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="
                    min-[390px]:h-[17px]
                    min-[390px]:w-[17px]
                  "
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}