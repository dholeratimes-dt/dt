import Link from "next/link";

import {
  Building2,
  Cpu,
  Factory,
  Plane,
  Route,
  Ship,
  Sun,
  TrainFront,
  Warehouse,
  Waypoints,
} from "lucide-react";

import {
  getNews,
  getUpdates,
} from "@/sanity/lib/api";

/* ============================================================
   MEGA PROJECTS DATA
============================================================ */

const megaProjects = [
  {
    title: "Ahmedabad-Dholera Expressway",
    description:
      "109 km expressway connecting Ahmedabad and Dholera.",
    icon: Route,
  },
  {
    title: "Dholera International Airport",
    description:
      "Planned airport for Dholera’s passenger and cargo connectivity.",
    icon: Plane,
  },
  {
    title: "Ahmedabad Dholera Rail Project",
    description:
      "Semi-high-speed rail link connecting Ahmedabad and Dholera.",
    icon: TrainFront,
  },
  {
    title: "Dholera Solar Park",
    description:
      "Large-scale solar energy infrastructure supporting clean power.",
    icon: Sun,
  },
  {
    title: "Dedicated Freight Corridor (DFC)",
    description:
      "Freight rail connectivity supporting industrial logistics.",
    icon: Waypoints,
  },
  {
    title: "Tata Semiconductor Plant",
    description:
      "Major semiconductor manufacturing project in Dholera SIR.",
    icon: Cpu,
  },
  {
    title: "Smart Infrastructure",
    description:
      "Modern roads, utilities, ICT and digital city systems.",
    icon: Building2,
  },
  {
    title: "Sea Port",
    description:
      "Planned port connectivity supporting Dholera’s trade and logistics.",
    icon: Ship,
  },
  {
    title: "ABCD Building",
    description:
      "Dholera's Central Command Hub",
    icon: Building2,
  },
];

/* ============================================================
   DATE HELPERS
============================================================ */

function parseDate(date) {
  if (!date) return null;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? null
    : parsed;
}

function getDateValue(item) {
  const date = parseDate(
    item?.publishedAt ||
      item?._createdAt,
  );

  return date
    ? date.getTime()
    : 0;
}

function formatDate(date) {
  const parsed =
    parseDate(date);

  if (!parsed) {
    return "";
  }

  return parsed.toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    },
  );
}

function sortNewestFirst(items) {
  return [...items].sort(
    (a, b) =>
      getDateValue(b) -
      getDateValue(a),
  );
}

/* ============================================================
   LATEST NEWS ITEM

   Correct news route:
   /dholera-updates/latest-updates/[slug]
============================================================ */

function LatestNewsItem({
  post,
}) {
  if (!post) {
    return null;
  }

  const slug =
    post.slug?.current;

  const href = slug
    ? `/dholera-updates/latest-updates/${slug}`
    : "/dholera-updates/latest-updates";

  const publishedDate =
    post.publishedAt ||
    post._createdAt;

  const parsedDate =
    parseDate(publishedDate);

  return (
    <article className="min-w-0">
      <Link
        href={href}
        className="
          group
          block

          rounded-lg

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#EC1C40]
          focus-visible:ring-offset-4
        "
      >
        <h3
          className="
            line-clamp-2

            text-[16px]
            font-semibold
            leading-[24px]

            tracking-[-0.01em]

            text-black

            transition-colors
            duration-200


            sm:text-[17px]
            sm:leading-[25px]

            lg:text-[16px]
            lg:leading-[24px]

            xl:text-[17px]

            motion-reduce:transition-none
          "
        >
          {post.title}
        </h3>

        {parsedDate && (
          <time
            dateTime={
              parsedDate.toISOString()
            }
            className="
              mt-3
              block

              text-[13px]
              font-normal
              leading-5

              text-black/60

              sm:text-[14px]
            "
          >
            {formatDate(
              publishedDate,
            )}
          </time>
        )}

        <p
          className="
            mt-0.5

            text-[13px]
            font-medium
            leading-5

            text-black/60

            transition-colors
            duration-200
            group-hover:text-[#EC1C40]

            sm:text-[14px]

            motion-reduce:transition-none
          "
        >
          Explore
        </p>
      </Link>
    </article>
  );
}

/* ============================================================
   MEGA PROJECT CARD
============================================================ */

function MegaProjectCard({
  project,
}) {
  const Icon =
    project.icon;

  return (
    <article
      className="
        group

        flex
        min-w-0
        items-start

        gap-3.5

        rounded-xl

        border
        border-black/10

        bg-white

        p-4

        shadow-[0_5px_18px_rgba(0,0,0,0.035)]

        transition-[border-color,box-shadow,transform]
        duration-300


        sm:gap-4
        sm:p-[18px]

        lg:min-h-[116px]
        lg:p-4

        xl:min-h-[122px]
        xl:p-[18px]

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      {/* ICON */}
      <div
        className="
          flex
          h-11
          w-11
          shrink-0

          items-center
          justify-center

          rounded-xl

          border
          border-[#EC1C40]/20

          bg-black/[0.025]

          text-[#EC1C40]

          transition-colors
          duration-300

          group-hover:border-[#EC1C40]/30
          group-hover:bg-[#EC1C40]/10

          sm:h-12
          sm:w-12
        "
      >
        <Icon
          aria-hidden="true"
          strokeWidth={1.8}
          className="
            h-[21px]
            w-[21px]

            sm:h-[23px]
            sm:w-[23px]
          "
        />
      </div>

      {/* TEXT */}
      <div
        className="
          min-w-0
          flex-1
        "
      >
        <h3
          className="
            text-[15px]
            font-semibold
            leading-[22px]

            tracking-[-0.01em]

            text-black

            sm:text-[16px]
            sm:leading-6

            xl:text-[17px]
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-1

            text-[13px]
            font-normal
            leading-5

            text-black/60

            sm:mt-1.5
            sm:text-[14px]
            sm:leading-[22px]
          "
        >
          {project.description}
        </p>
      </div>
    </article>
  );
}

/* ============================================================
   MAIN SECTION

   DESKTOP:
   LEFT  = Sticky Latest News
   RIGHT = Mega Projects scrolling with page

   MOBILE:
   Mega Projects first
   Latest News after projects
============================================================ */

export default async function MegaProjectsSection() {
  /* =========================================================
     FETCH LATEST NEWS
  ========================================================= */

  let trendingBlogs = [];

  try {
    const newsData =
      await getNews();

    if (
      Array.isArray(
        newsData,
      ) &&
      newsData.length > 0
    ) {
      trendingBlogs =
        sortNewestFirst(
          newsData,
        ).slice(0, 3);
    }
  } catch (error) {
    console.error(
      "Error fetching latest news:",
      error,
    );
  }

  /* =========================================================
     FALLBACK TO UPDATES
  ========================================================= */

  if (
    trendingBlogs.length === 0
  ) {
    try {
      const updatesData =
        await getUpdates();

      if (
        Array.isArray(
          updatesData,
        ) &&
        updatesData.length > 0
      ) {
        trendingBlogs =
          sortNewestFirst(
            updatesData,
          ).slice(0, 3);
      }
    } catch (error) {
      console.error(
        "Error fetching fallback updates:",
        error,
      );
    }
  }

  return (
    <section
      aria-labelledby="mega-projects-heading"
      className="
        w-full

        bg-black/[0.025]

        px-4
        py-8

        text-black

        selection:bg-[#EC1C40]/10
        selection:text-black

        min-[414px]:px-6

        sm:py-12

        md:px-8
        md:py-14

        lg:py-14
      "
    >
      {/* =====================================================
          STANDARD SITE WIDTH
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ===================================================
            DESKTOP GRID

            IMPORTANT:
            No overflow-hidden / overflow-auto here.
            Sticky needs normal page overflow.
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1

            gap-9

            lg:grid-cols-[minmax(280px,0.29fr)_minmax(0,0.71fr)]
            lg:items-start
            lg:gap-8

            xl:grid-cols-[minmax(300px,0.28fr)_minmax(0,0.72fr)]
            xl:gap-10
          "
        >
          {/* =================================================
              LEFT — STICKY LATEST NEWS
          ================================================== */}

          <aside
            aria-labelledby="latest-news-heading"
            className="
              order-2
              min-w-0

              lg:order-1

              lg:sticky
              lg:top-40
              lg:self-start
            "
          >
            <div
              className="
                overflow-hidden

                rounded-2xl

                border
                border-black/10

                bg-white

                p-5

                shadow-[0_8px_26px_rgba(0,0,0,0.04)]

                sm:p-6
              "
            >
              {/* =============================================
                  NEWS HEADER
              ============================================== */}

              <div
                className="
                  mb-5

                  border-b
                  border-black/10

                  pb-4
                "
              >
                <h2
                  id="latest-news-heading"
                  className="
                    text-[22px]
                    font-semibold
                    leading-[1.25]

                    tracking-[-0.02em]

                    text-black

                    sm:text-[24px]

                    lg:text-[22px]

                    xl:text-[24px]
                  "
                >
                  Latest News on{" "}
                  <span className="text-[#EC1C40]">
                    Dholera SIR
                  </span>
                </h2>
              </div>

              {/* =============================================
                  NEWS LIST
              ============================================== */}

              {trendingBlogs.length >
              0 ? (
                <div
                  className="
                    divide-y
                    divide-black/10
                  "
                >
                  {trendingBlogs.map(
                    (post) => (
                      <div
                        key={
                          post._id ||
                          post.slug
                            ?.current ||
                          post.title
                        }
                        className="
                          py-5

                          first:pt-0
                          last:pb-0
                        "
                      >
                        <LatestNewsItem
                          post={post}
                        />
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p
                  className="
                    text-[14px]
                    leading-6

                    text-black/60
                  "
                >
                  No news available
                  at the moment.
                </p>
              )}
            </div>
          </aside>

          {/* =================================================
              RIGHT — MEGA PROJECTS

              This column is NOT sticky.
              It scrolls naturally with the page.
          ================================================== */}

          <div
            className="
              order-1
              min-w-0

              lg:order-2
            "
          >
            {/* =============================================
                PROJECT HEADING
            ============================================== */}

            <header
              className="
                mb-6

                sm:mb-7

                md:mb-8
              "
            >
              <h2
                id="mega-projects-heading"
                className="
                  text-left

                  text-[clamp(1.75rem,2.5vw,2.375rem)]

                  font-semibold
                  leading-[1.2]

                  tracking-[-0.025em]

                  text-black

                  md:text-center
                "
              >
                Major Infrastructure in Dholera
              </h2>
            </header>

            {/* =============================================
                PROJECT GRID
            ============================================== */}

            <div
              className="
                grid
                grid-cols-1

                gap-3.5

                min-[520px]:grid-cols-2
                min-[520px]:gap-4

                lg:grid-cols-2
                lg:gap-4

                xl:grid-cols-3
                xl:gap-4
              "
            >
              {megaProjects.map(
                (project) => (
                  <MegaProjectCard
                    key={
                      project.title
                    }
                    project={
                      project
                    }
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}