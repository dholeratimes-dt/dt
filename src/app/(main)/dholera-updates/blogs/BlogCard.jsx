import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

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
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
};

/* ============================================================
   BLOG CARD
============================================================ */

export default function BlogCard({
  post,
}) {
  const href =
    post.slug?.current
      ? `/dholera-updates/blogs/${post.slug.current}`
      : "/dholera-updates/blogs";

  const publishedDate =
    post.publishedAt ||
    post._createdAt;

  return (
    <article
      className="
        group

        flex
        min-w-0
        flex-col

        overflow-hidden

        rounded-xl

        border
        border-[#EC1C40]/30

        bg-white

        shadow-[0_5px_18px_rgba(0,0,0,0.045)]

        transition-[border-color,box-shadow,transform]
        duration-300
        ease-out

        md:hover:-translate-y-1

        md:hover:border-[#EC1C40]/50

        md:hover:shadow-[0_14px_32px_rgba(236,28,64,0.09)]

        focus-within:border-[#EC1C40]

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

          rounded-[inherit]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#EC1C40]
        "
      >
        {/* ===================================================
            IMAGE

            Same structure on phone + desktop
        ==================================================== */}

        <div
          className="
            relative

            aspect-[2/1]

            w-full

            shrink-0

            overflow-hidden

            bg-black/[0.025]
          "
        >
          {post.mainImage ? (
            <Image
              src={urlFor(
                post.mainImage,
              )
                .width(900)
                .height(450)
                .url()}
              alt={
                post.mainImage
                  ?.alt ||
                post.title ||
                "Dholera blog"
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
              "
            >
              <span
                className="
                  text-[14px]
                  font-medium

                  text-black/45
                "
              >
                No image available
              </span>
            </div>
          )}
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col

            bg-white

            px-4
            pb-4
            pt-4

            min-[414px]:px-[18px]
            min-[414px]:pb-[18px]

            sm:p-5
          "
        >
          {/* =================================================
              TITLE
          ================================================== */}

          <h2
            className="
              line-clamp-2

              min-h-[50px]

              text-[17px]
              font-semibold
              leading-[25px]

              tracking-[-0.015em]

              text-black

              sm:min-h-[52px]
              sm:text-[17px]
              sm:leading-[26px]

              lg:text-[18px]
              lg:leading-[27px]
            "
          >
            {post.title ||
              "Dholera Smart City Update"}
          </h2>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              mt-4

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

              min-h-[38px]

              items-end
              justify-between

              gap-3

            "
          >
            {/* DATE */}

            <time
              dateTime={
                publishedDate
                  ? new Date(
                      publishedDate,
                    ).toISOString()
                  : undefined
              }
              className="
                shrink-0

                text-[13px]
                font-normal
                leading-5

                text-black/50

                sm:text-[14px]
              "
            >
              {formatDate(
                publishedDate,
              )}
            </time>

            {/* READ MORE */}

            <span
              className="
                inline-flex
                shrink-0

                items-center

                whitespace-nowrap

                text-[14px]
                font-semibold
                leading-5

                text-[#EC1C40]

                transition-colors
                duration-200

                group-hover:text-[#d9183a]

                sm:text-[15px]
              "
            >
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}