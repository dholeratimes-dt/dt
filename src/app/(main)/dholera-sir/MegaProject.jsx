import Link from "next/link";
import {
  Building2,
  Cpu,
  Plane,
  Route,
  Ship,
  Sun,
  TrainFront,
  Waypoints,
} from "lucide-react";

/* MEGA PROJECTS*/

const megaProjects = [
  {
    title: "Ahmedabad-Dholera Expressway",
    description:
      "109 km expressway connecting Ahmedabad and Dholera.",
    icon: Route,
    href: "dholera-updates/blogs/ahmedabad-dholera-expressway-investment-corridor",
  },
  {
    title: "Dholera International Airport",
    description:
      "Planned airport for Dholera’s passenger and cargo connectivity.",
    icon: Plane,
    href: "dholera-updates/blogs/dholera-international-airport-impact-gujarat-global-reach",

    
  },
  {
    title: "Ahmedabad Dholera Rail Project",
    description:
      "Semi-high-speed rail link connecting Ahmedabad and Dholera.",
    icon: TrainFront,
    href: "dholera-updates/latest-updates/ahmedabad-dholera-rail-news-project-approved",

  },
  {
    title: "Dholera Solar Park",
    description:
      "Large-scale solar energy infrastructure supporting clean power.",
    icon: Sun,
    href: "dholera-updates/blogs/dholera-solar-park-shaping-plot-demand-dholera-sir",

  },
  {
    title: "Dedicated Freight Corridor (DFC)",
    description:"Freight rail connectivity supporting industrial logistics.",
    icon: Waypoints,
    href: "dholera-updates/blogs/western-dedicated-freight-corridor-dholera-smart-city",

  },
  {
    title: "Tata Semiconductor Plant",
    description:
      "Major semiconductor manufacturing project in Dholera SIR.",
    icon: Cpu,
    href: "dholera-updates/blogs/tata-semiconductor-dholera-project-timeline-2024-2028",

  },
  {
    title: "Smart Infrastructure",
    description:
      "Modern roads, utilities, ICT and digital city systems.",
    icon: Building2,
    href: "dholera-updates/latest-updates/gujarat-hudco-mou-dholera-infrastructure-boost",

  },
  {
    title: "Sea Port",
    description:
      "Planned port connectivity supporting Dholera’s trade and logistics.",
    icon: Ship,
    href: "dholera-updates/blogs/dholera-sea-port-growth",

  },
  {
    title: "ABCD Building",
    description:
      "Dholera's Central Command Hub",
    icon: Building2,
    href: "dholera-sir/the-abcd-building-in-dholera",

  },
];

/* DATE FORMATTER*/

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/* DATE HELPERS*/

function getDateValue(item) {
  const value =
    item?.publishedAt ||
    item?._createdAt;

  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);

  return Number.isNaN(timestamp)
    ? 0
    : timestamp;
}

function getFormattedDate(value) {
  if (!value) {
    return null;
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  const date = new Date(timestamp);

  return {
    iso: date.toISOString(),
    display: dateFormatter.format(date),
  };
}

/* LATEST NEWS ITEM*/

function LatestNewsItem({ post }) {
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

  const date =
    getFormattedDate(publishedDate);

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

        {date && (
          <time
            dateTime={date.iso}
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
            {date.display}
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

/* PROJECT CARD*/

function MegaProjectCard({ project }) {
  const Icon = project.icon;

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
        sm:gap-4
        sm:p-[18px]
        lg:min-h-[116px]
        lg:p-4
        xl:min-h-[122px]
        xl:p-[18px]
      "
    >
      {/* ICON*/}

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
          duration-200
          group-hover:border-[#EC1C40]/30
          group-hover:bg-[#EC1C40]/10
          sm:h-12
          sm:w-12
          motion-reduce:transition-none
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

      {/* CONTENT*/}

      <div className="min-w-0 flex-1">
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

/* MAIN SECTION*/

export default function MegaProjectsSection() {
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
        sm:py-10
        md:px-10
        lg:px-10
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* MEGA PROJECTS */}

        <div className="min-w-0">
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
                text-[28px]
                font-bold
                leading-[1.15]
                tracking-[-0.03em]
                text-black
                sm:text-[32px]
                md:text-[36px]
                lg:text-[40px]
              "
            >
              Major Infrastructure{" "}
              <span className="text-[#EC1C40]">
                in Dholera
              </span>
            </h2>
          </header>

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
            "
          >
            {megaProjects.map((project) => (
              <Link
                key={project.id || project.title}
                href={project.href || "#"}
                className="block"
              >
                <MegaProjectCard project={project} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}