import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

/* DATE FORMATTER*/

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

/* DATE HELPER*/

function getPublicationDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    dateTime: date.toISOString(),
    display: dateFormatter.format(date),
  };
}

/* BLOG CARD*/

export default function BlogCard({ post }) {
  if (!post) {
    return null;
  }

  const slug = post.slug?.current;

  const href =
    slug && slug !== "#"
      ? `/dholera-updates/blogs/${slug}`
      : "/dholera-updates/blogs";

  const publishedDate = getPublicationDate(
    post.publishedAt || post._createdAt,
  );

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).height(400).auto("format").quality(75).url()
    : null;

  return (
    <article
      className="
        group flex min-w-0 flex-col overflow-hidden
        rounded-xl border border-[#EC1C40]/30 bg-white
        shadow-[0_5px_18px_rgba(0,0,0,0.045)]
        transition-[border-color,transform] duration-300 ease-out
        md:hover:-translate-y-1 md:hover:border-[#EC1C40]/50
        focus-within:border-[#EC1C40]
        motion-reduce:transform-none motion-reduce:transition-none
      "
    >
      <Link
        href={href}
        className="
          flex h-full min-w-0 flex-col rounded-[inherit]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-inset focus-visible:ring-[#EC1C40]
        "
      >
        {/* IMAGE*/}

        <div
          className="
            relative aspect-[2/1] w-full shrink-0
            overflow-hidden bg-black/[0.025]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                post.mainImage?.alt ||
                post.title ||
                "Dholera blog"
              }
              fill
              sizes="
                (max-width: 639px) 86vw,
                (max-width: 767px) 70vw,
                (max-width: 1023px) calc(50vw - 40px),
                (max-width: 1535px) 25vw,
                400px
              "
              className="
                object-cover object-center
                transition-transform duration-300 ease-out
                md:group-hover:scale-[1.025]
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          ) : (
            <div
              className="
                flex h-full w-full items-center justify-center
                bg-gradient-to-br from-[#EC1C40]/10
                via-[#EC1C40]/5 to-white
              "
            >
              <span className="text-[14px] font-medium text-black/45">
                No image available
              </span>
            </div>
          )}
        </div>

        {/* CONTENT*/}

        <div
          className="
            flex flex-1 flex-col bg-white
            px-3 pb-3 pt-4
            min-[414px]:p-5 sm:p-3
          "
        >
          {/* TITLE*/}

          <h2
            className="
              line-clamp-2 min-h-[50px]
              text-[17px] font-semibold leading-[25px]
              tracking-[-0.015em] text-black
              sm:min-h-[52px] sm:text-[17px] sm:leading-[26px]
              lg:text-[18px] lg:leading-[27px]
            "
          >
            {post.title || "Dholera Smart City Update"}
          </h2>

          {/* DIVIDER*/}

          <div className="mt-4 border-t border-black/10" />

          {/* DATE + READ MORE*/}

          <div
            className="
              mt-auto flex min-h-[38px] items-end
              justify-between gap-3 pb-1
            "
          >
            {publishedDate && (
              <time
                dateTime={publishedDate.dateTime}
                className="
                  shrink-0 text-[13px] font-normal
                  leading-5 text-black/50 sm:text-[14px]
                "
              >
                {publishedDate.display}
              </time>
            )}

            <span
              className="
                inline-flex shrink-0 items-center whitespace-nowrap
                text-[14px] font-semibold leading-5 text-[#EC1C40]
                transition-colors duration-200
                group-hover:text-[#d9183a]
                sm:text-[15px]
                motion-reduce:transition-none
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