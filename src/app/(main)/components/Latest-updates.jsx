import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { getHomeUpdates } from "@/lib/homeUpdates";
import { getSanityImageUrl } from "@/sanity/lib/image";

import RelatedBlogCarousel from "./LatestBlogCrousel";

/* ============================================================
   DATE FORMATTER

   Create this once instead of recreating formatting options
   for every card during every render.
============================================================ */

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/* ============================================================
   DATE HELPER
============================================================ */

function getFormattedDate(date) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return {
    iso: parsedDate.toISOString(),
    display: dateFormatter.format(parsedDate),
  };
}

/* ============================================================
   RELATED BLOG / UPDATE CARD

   SERVER RENDERED
   No hooks
   No browser APIs
   No client-side state
============================================================ */

function RelatedBlogCard({ item, type }) {
  const basePath =
    type === "blog"
      ? "/dholera-updates/blogs"
      : "/dholera-updates/latest-updates";

  const href = item.slug?.current
    ? `${basePath}/${item.slug.current}`
    : basePath;

  const publishedDate =
    item.publishedAt || item.createdAt || item._createdAt;

  const formattedDate =
    getFormattedDate(publishedDate);

  /*
   * 800px is sufficient here because:
   *
   * Mobile card max width ≈ 390px
   * 2x DPR ≈ 780px
   *
   * Previously 900px was requested from Sanity.
   */
  const imageUrl = item.mainImage
    ? getSanityImageUrl(
        item.mainImage,
        800,
        450,
      )
    : null;

  return (
    <article
      data-related-blog-card
      className="
        group

        flex
        w-[86vw]
        max-w-[390px]
        min-w-0
        shrink-0
        snap-start
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-[#EC1C40]/30

        bg-white

        shadow-[0_5px_18px_rgba(0,0,0,0.045)]

        transition-[transform,border-color]
        duration-300
        ease-out

        focus-within:border-[#EC1C40]

        sm:w-[320px]

        md:w-[340px]

        lg:w-[calc((100%_-_4rem)/5)]
        lg:max-w-none
        lg:min-w-0

        lg:hover:-translate-y-1
        lg:hover:border-[#EC1C40]/45

        xl:w-[calc((100%_-_5rem)/5)]

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
                item.mainImage?.alt ||
                item.title ||
                "Dholera update"
              }
              fill
              loading="lazy"
              sizes="
                (max-width: 639px) 86vw,
                (max-width: 767px) 320px,
                (max-width: 1023px) 340px,
                (max-width: 1279px) 18vw,
                240px
              "
              className="
                object-cover
                object-center

                transition-transform
                duration-300
                ease-out

                lg:group-hover:scale-[1.02]

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
                  px-4

                  text-center
                  text-[13px]
                  font-medium

                  text-black/45
                "
              >
                No image available
              </span>
            </div>
          )}

          {/* Lightweight image overlay */}

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

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col

            bg-white

            p-3
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

              tracking-[-0.015em]

              text-black

              sm:text-[17px]
              sm:leading-[25px]

              lg:min-h-[48px]
              lg:text-[15.5px]
              lg:leading-[23px]

              xl:min-h-[52px]
              xl:text-[16px]
              xl:leading-[24px]
            "
          >
            {item.title}
          </h3>

          {/* Divider */}

          <div
            className="
              mt-3

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

              items-end
              justify-between

              gap-2
              pt-2
            "
          >
            {formattedDate ? (
              <time
                dateTime={formattedDate.iso}
                className="
                  shrink-0

                  text-[13px]
                  font-normal
                  leading-5

                  text-black/50

                  sm:text-[13.5px]

                  lg:text-[12.5px]

                  xl:text-[13px]
                "
              >
                {formattedDate.display}
              </time>
            ) : (
              <span />
            )}

            <span
              className="
                inline-flex
                shrink-0

                items-center
                justify-center

                whitespace-nowrap

                text-[14px]
                font-semibold
                leading-5

                text-[#EC1C40]

                transition-colors
                duration-200
                ease-out

                group-hover:text-[#d9183a]

                lg:text-[13.5px]

                xl:text-[14px]

                motion-reduce:transition-none
              "
            >
              Read More
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   VIEW ALL LINK

   Rendered ONCE.

   Mobile:
   Appears after the carousel.

   Desktop:
   CSS Grid visually moves it beside the heading.
============================================================ */

function ViewAllUpdatesLink() {
  return (
    <Link
      href="/dholera-updates/latest-updates"
      className="
        group/view

        inline-flex
        w-fit

        items-center
        justify-center

        gap-1.5

        text-[14px]
        font-semibold
        leading-5

        text-[#EC1C40]

        transition-colors
        duration-200
        ease-out

        hover:text-black

        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#EC1C40]

        sm:text-[14.5px]

        lg:self-center
        lg:justify-self-end
        lg:text-[14px]

        motion-reduce:transition-none
      "
    >
      <span>View All Updates</span>

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
  );
}

/* ============================================================
   LATEST UPDATES
============================================================ */

export default async function LatestUpdates() {
  const content = await getHomeUpdates();

  if (!content?.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="latest-updates-heading"
      className="
        w-full

        bg-white

        px-4
        pb-5
        pt-8

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5

        sm:px-6
        sm:pb-6
        sm:pt-10

        md:px-8

        lg:px-10
      "
    >
      {/* =====================================================
          GRID

          Allows the SAME View All link to appear:

          mobile:
          title
          carousel
          view all

          desktop:
          title        view all
          carousel     carousel
      ====================================================== */}

      <div
        className="
          mx-auto

          grid
          w-full
          max-w-7xl

          grid-cols-1

          lg:grid-cols-[minmax(0,1fr)_auto]
          lg:items-center
          lg:gap-x-6
        "
      >
        {/* ===================================================
            TITLE
        ==================================================== */}

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

            lg:col-start-1
            lg:row-start-1
            lg:text-[34px]
          "
        >
          Latest Dholera{" "}
          <span className="text-[#EC1C40]">
            News &amp; Updates
          </span>
        </h2>

        {/* ===================================================
            CAROUSEL

            Existing component preserved so scrolling,
            arrows and indicators continue working.
        ==================================================== */}

        <div
          className="
            mt-5

            min-w-0

            lg:col-span-2
            lg:col-start-1
            lg:row-start-2
            lg:mt-7
          "
        >
          <RelatedBlogCarousel>
            {content.map((item) => (
              <RelatedBlogCard
                key={`${item._type}-${
                  item._id ||
                  item.slug?.current ||
                  item.title
                }`}
                item={item}
                type={item._type}
              />
            ))}
          </RelatedBlogCarousel>
        </div>

        {/* ===================================================
            ONE VIEW ALL LINK

            Mobile -> row 3
            Desktop -> row 1, column 2
        ==================================================== */}

        <div
          className="
            mt-6

            flex
            items-center
            justify-center

            lg:col-start-2
            lg:row-start-1
            lg:mt-0
            lg:block
          "
        >
          <ViewAllUpdatesLink />
        </div>
      </div>
    </section>
  );
}
