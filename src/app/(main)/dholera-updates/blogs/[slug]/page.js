import { PortableText } from "@portabletext/react";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getSanityImageUrl } from "@/sanity/lib/image";
import { getblogs, getNews, getBlogBySlug } from "@/sanity/lib/api";
import LeadFormSlug from "../../latest-updates/[slug]/LeadForm";
import LeadFormBlock from "@/app/(main)/components/blog/LeadFormBlock";
import SchemaMarkup from "../SchemaMarkup";
import SocialShare from "../../../components/blog/SocialShare";
import TableOfContents from "../../../components/blog/TableOfContents.jsx";
import {
  createTableOfContents,
  getHeadingText,
} from "../../../components/blog/tableOfContents.js";

/* SETTINGS*/

const SITE = "dholera-times";
const BLOGS_PATH = "/dholera-updates/blogs";
const NEWS_PATH = "/dholera-updates/latest-updates";

export const revalidate = 300;

/* CACHED PUBLIC CONTENT*/

const getCachedBlogBySlug = unstable_cache(
  async (slug) => getBlogBySlug(slug, SITE),
  ["dholera-blog-detail-v1"],
  {
    revalidate: 300,
    tags: ["dholera-blog-detail"],
  },
);

const getBlogPost = cache((slug) => getCachedBlogBySlug(slug));

const getCachedTrendingBlogs = unstable_cache(
  async () => getblogs(4),
  ["dholera-blog-trending-v1"],
  {
    revalidate: 300,
    tags: ["dholera-blogs"],
  },
);

const getCachedRelatedNews = unstable_cache(
  async (slug) => getNews(slug, 3),
  ["dholera-blog-related-news-v1"],
  {
    revalidate: 300,
    tags: ["dholera-news"],
  },
);

/* DATE HELPERS*/

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const mobileDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function parseDate(dateValue) {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatPostDate(dateValue) {
  const date = parseDate(dateValue);

  if (!date) return null;

  return {
    dateTime: date.toISOString().slice(0, 10),
    label: fullDateFormatter.format(date),
  };
}

function formatRelatedDate(dateValue) {
  const date = parseDate(dateValue);

  if (!date) return null;

  return {
    dateTime: date.toISOString().slice(0, 10),
    mobile: mobileDateFormatter.format(date),
    desktop: shortDateFormatter.format(date),
  };
}

/* ARTICLE HELPERS*/

function urlFormatter(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractText(node) {
  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (node?.props?.children) {
    return extractText(node.props.children);
  }

  if (typeof node?.props?.text === "string") {
    return node.props.text;
  }

  return "";
}

function createHeadingComponent(Tag, className, headingIds) {
  return function ArticleHeading({ children, value }) {
    const text = getHeadingText(value) || extractText(children);
    const id = headingIds.get(value?._key) || urlFormatter(text);

    return (
      <Tag id={id} className={className}>
        <span
          aria-hidden="true"
          className="
            absolute -left-1 top-0 h-full w-1 rounded-full
            bg-gradient-to-b from-[#d3b66b] to-[#b69b5e]
          "
        />
        {children}
      </Tag>
    );
  };
}

/* PORTABLE TEXT COMPONENTS*/

function createPortableTextComponents(headingIds) {
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;

        const imageUrl =
          value.asset.url || getSanityImageUrl(value, 1200, 800);

        if (!imageUrl) return null;

        const canOptimize = imageUrl.startsWith(
          "https://cdn.sanity.io/",
        );

        const imageClass =
          "my-6 aspect-[3/2] h-auto w-full rounded-lg object-cover";

        const imageNode = canOptimize ? (
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1200}
            height={800}
            sizes="(max-width: 1023px) calc(100vw - 64px), 760px"
            loading="lazy"
            className={imageClass}
          />
        ) : (
          <img
            src={imageUrl}
            alt={value.alt || ""}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className={imageClass}
          />
        );

        return (
          <figure className="my-6">
            {value.url ? (
              <a
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block cursor-pointer transition-opacity
                  hover:opacity-90
                "
              >
                {imageNode}
              </a>
            ) : (
              imageNode
            )}

            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      leadFormBlock: ({ value }) => <LeadFormBlock {...value} />,

      table: ({ value }) => {
        if (!Array.isArray(value?.rows)) return null;

        return (
          <div
            className="
              my-12 overflow-x-auto rounded-2xl
              border border-gray-100 bg-white shadow-lg
            "
          >
            <table className="min-w-full">
              <tbody>
                {value.rows.map((row, index) => {
                  const cells = row?.cells || row;

                  if (!Array.isArray(cells)) return null;

                  return (
                    <tr
                      key={index}
                      className={`transition-colors duration-200 hover:bg-gray-50 ${
                        index === 0
                          ? "bg-gradient-to-r from-[#d3b66b]/10 to-[#b69b5e]/10 font-semibold"
                          : index % 2 === 0
                            ? "bg-gray-50/50"
                            : "bg-white"
                      }`}
                    >
                      {cells.map((cell, cellIndex) => {
                        const content =
                          typeof cell === "string"
                            ? cell
                            : cell?.text || cell?.value || "";

                        return (
                          <td
                            key={cellIndex}
                            className="
                              border-b border-gray-100 px-6 py-4
                              text-gray-700 last:border-r-0
                            "
                          >
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      },

      htmlTableBlock: ({ value }) => {
        if (!value?.html) return null;

        return (
          <div
            className="
              my-8 overflow-x-auto rounded-lg
              border border-gray-200 shadow-sm
            "
          >
            <div
              className="
                [&_table]:w-full
                [&_table]:border-collapse
                [&_table]:bg-white
                [&_th]:px-6
                [&_th]:py-4
                [&_th]:text-left
                [&_th]:font-semibold
                [&_th]:text-gray-700
                [&_th]:bg-gray-50
                [&_th]:border-b
                [&_th]:border-gray-200
                [&_td]:px-6
                [&_td]:py-4
                [&_td]:text-gray-600
                [&_td]:border-b
                [&_td]:border-gray-200
                [&_tr:last-child_td]:border-b-0
                [&_tr:hover]:bg-gray-50/50
                [&_th:first-child]:rounded-tl-lg
                [&_th:last-child]:rounded-tr-lg
                [&_tr:last-child_td:first-child]:rounded-bl-lg
                [&_tr:last-child_td:last-child]:rounded-br-lg
              "
              dangerouslySetInnerHTML={{ __html: value.html }}
            />
          </div>
        );
      },

      code: ({ value }) => (
        <div
          className="
            my-8 rounded-2xl bg-gradient-to-br
            from-gray-900 to-black p-1 shadow-2xl
          "
        >
          <pre className="overflow-x-auto rounded-xl bg-gray-900 p-6 text-gray-100">
            <code className="font-mono text-sm leading-relaxed">
              {value?.code}
            </code>
          </pre>
        </div>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        if (!value?.href) return children;

        return (
          <Link
            href={value.href}
            title={value.title || extractText(children)}
            rel="noopener noreferrer"
            className="
              rounded px-1 py-0.5 text-[#d3b36b]
              underline decoration-[#b69b5e]/30
              decoration-2 underline-offset-4
              transition-colors duration-200
              hover:bg-[#b69b5e]/5 hover:text-[#b69b5e]
              hover:decoration-[#b69b5e]
            "
          >
            {children}
          </Link>
        );
      },

      strong: ({ children }) => (
        <strong className="rounded px-1 py-0.5 font-bold text-gray-900">
          {children}
        </strong>
      ),

      em: ({ children }) => (
        <em className="rounded bg-gray-50 px-1 py-0.5 italic text-[#151f28]">
          {children}
        </em>
      ),

      code: ({ children }) => (
        <code
          className="
            rounded-md border border-gray-300
            bg-gradient-to-r from-gray-100 to-gray-200
            px-2 py-1 font-mono text-sm text-[#151f28]
          "
        >
          {children}
        </code>
      ),

      button: ({ children, value }) => {
        const buttonClasses =
          value?.style === "secondary"
            ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-[#151f28] shadow-lg hover:shadow-xl"
            : value?.style === "outline"
              ? "bg-transparent border-2 border-[#d3b66b] text-[#d3b66b] hover:bg-[#d3b66b] hover:text-white shadow-md hover:shadow-lg"
              : "bg-gradient-to-r from-[#d3b66b] to-[#b69b5e] hover:from-[#b69b5e] hover:to-[#d3b66b] shadow-lg hover:shadow-xl";

        if (!value?.href) return children;

        return (
          <Link
            href={value.href}
            className={`
              inline-block rounded-xl px-8 py-3
              font-semibold text-white
              transition-colors duration-200
              ${buttonClasses}
            `}
          >
            {value.text || children}
          </Link>
        );
      },
    },

    block: {
      h1: createHeadingComponent(
        "h1",
        "relative mb-6 mt-8 border-l-4 border-[#b69b5e] bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-4 pl-6 text-2xl font-black text-gray-800 scroll-mt-24 md:text-5xl [&+ul]:mt-4 [&+ol]:mt-4",
        headingIds,
      ),

      h2: createHeadingComponent(
        "h2",
        "relative mb-6 mt-8 border-l-4 border-[#b69b5e] bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-3 pl-6 text-2xl font-bold text-gray-800 scroll-mt-24 md:text-3xl [&+ul]:mt-4 [&+ol]:mt-4",
        headingIds,
      ),

      h3: createHeadingComponent(
        "h3",
        "relative mb-5 mt-8 border-l-4 border-[#b69b5e] bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-2 pl-6 text-xl font-bold text-gray-800 scroll-mt-24 md:text-2xl [&+ul]:mt-4 [&+ol]:mt-4",
        headingIds,
      ),

      h4: createHeadingComponent(
        "h4",
        "relative mb-4 mt-10 border-l-4 border-[#b69b5e] bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-2 pl-6 text-lg font-semibold text-gray-800 scroll-mt-24 md:text-2xl [&+ul]:mt-3 [&+ol]:mt-3",
        headingIds,
      ),

      h5: createHeadingComponent(
        "h5",
        "relative mb-3 mt-8 border-l-4 border-[#b69b5e] bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-2 pl-6 text-lg font-semibold text-gray-800 scroll-mt-24 md:text-xl [&+ul]:mt-3 [&+ol]:mt-3",
        headingIds,
      ),

      h6: createHeadingComponent(
        "h6",
        "relative mb-2 mt-6 border-l-4 border-[#b69b5e] bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-1 pl-6 text-lg font-semibold text-gray-800 scroll-mt-24 [&+ul]:mt-2 [&+ol]:mt-2",
        headingIds,
      ),

      normal: ({ children }) => (
        <p className="mb-4 text-left text-lg font-light leading-loose md:text-justify">
          {children}
        </p>
      ),

      blockquote: ({ children }) => (
        <blockquote
          className="
            relative my-12 rounded-2xl border border-[#d3b66b]/20
            bg-gradient-to-br from-[#d3b66b]/5 to-[#b69b5e]/10
            p-8 shadow-lg
          "
        >
          <div className="absolute left-6 top-4 font-serif text-6xl text-[#d3b66b]/30">
            &quot;
          </div>
          <div className="pl-8 text-xl font-medium italic leading-relaxed">
            {children}
          </div>
        </blockquote>
      ),

      centerAlign: ({ children }) => (
        <p className="mb-8 rounded-xl bg-gray-50 py-6 text-center text-lg leading-loose">
          {children}
        </p>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="mb-10 space-y-4 pl-0">{children}</ul>
      ),

      number: ({ children }) => (
        <ol
          className="mb-10 list-none space-y-4 pl-0"
          style={{ counterReset: "item" }}
        >
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li
          className="
            flex items-start gap-4 rounded-lg border
            border-gray-100 bg-white p-4 text-lg
            leading-relaxed shadow-sm
            transition-shadow duration-200 hover:shadow-md
          "
        >
          <div
            className="
              mt-2 h-2 w-2 flex-shrink-0 rounded-full
              bg-gradient-to-b from-[#d3b66b] to-[#b69b5e]
            "
          />
          <div
            className="
              flex-1 [&>ul]:mb-0 [&>ul]:mt-4
              [&>ol]:mb-0 [&>ol]:mt-4
              [&>ul>li]:border-0 [&>ul>li]:p-2
              [&>ul>li]:shadow-none
              [&>ol>li]:border-0 [&>ol>li]:p-2
              [&>ol>li]:shadow-none
            "
          >
            {children}
          </div>
        </li>
      ),

      number: ({ children }) => (
        <li
          className="
            relative flex items-start gap-4 rounded-lg
            border border-gray-100 bg-white p-4
            text-lg leading-relaxed shadow-sm
            before:absolute before:left-4 before:top-4
            before:flex before:h-8 before:w-8
            before:items-center before:justify-center
            before:rounded-full
            before:bg-gradient-to-r
            before:from-[#d3b66b] before:to-[#b69b5e]
            before:text-sm before:font-bold before:text-white
            before:content-[counter(item)]
          "
          style={{ counterIncrement: "item" }}
        >
          <div
            className="
              ml-10 flex-1 [&>ul]:mb-0 [&>ul]:mt-4
              [&>ol]:mb-0 [&>ol]:mt-4
              [&>ul>li]:border-0 [&>ul>li]:p-2
              [&>ul>li]:shadow-none
              [&>ol>li]:border-0 [&>ol>li]:p-2
              [&>ol>li]:shadow-none
            "
          >
            {children}
          </div>
        </li>
      ),
    },
  };
}

/* SIDEBAR CARD*/

function TrendingBlogItem({ post }) {
  const slug = post?.slug?.current;

  if (!slug) return null;

  return (
    <Link href={`${BLOGS_PATH}/${slug}`}>
      <div
        className="
          flex items-center gap-4 rounded-lg
          border border-gray-100 bg-white p-4
          transition-colors hover:bg-gray-50
        "
      >
        {post.mainImage && (
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={getSanityImageUrl(post.mainImage, 160, 160)}
              alt={post.title || "Dholera Times"}
              width={80}
              height={80}
              sizes="80px"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="min-w-0">
          <h4 className="line-clamp-2 font-semibold text-gray-900">
            {post.title}
          </h4>

          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
            {post.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* RELATED ARTICLE CARD*/

function RelatedBlogCard({ blog }) {
  const slug = blog?.slug?.current;

  if (!slug) return null;

  const date = formatRelatedDate(blog.publishedAt);

  return (
    <Link
      href={`${NEWS_PATH}/${slug}`}
      className="
        group w-[calc(100vw-3rem)] flex-shrink-0
        snap-start first:ml-0 md:w-auto md:min-w-0
      "
    >
      <article
        className="
          relative flex h-full flex-col overflow-hidden
          rounded-2xl border border-gray-100 bg-white shadow-lg
          transition-[border-color,transform] duration-300
          md:hover:-translate-y-1 md:hover:border-[#d3b66b]/40
          motion-reduce:transform-none
        "
      >
        <div className="relative h-48 overflow-hidden bg-gray-100 md:h-56">
          {blog.mainImage ? (
            <Image
              src={getSanityImageUrl(blog.mainImage, 900, 600)}
              alt={blog.title || "Dholera update"}
              fill
              sizes="
                (max-width: 767px) calc(100vw - 48px),
                (max-width: 1023px) calc(50vw - 48px),
                370px
              "
              className="
                object-cover transition-transform duration-300
                md:group-hover:scale-[1.025]
                motion-reduce:transform-none
              "
            />
          ) : (
            <div
              className="
                relative flex h-full w-full items-center justify-center
                overflow-hidden bg-gradient-to-br from-[#d3b66b]
                via-[#b69b5e] to-[#9e8750]
              "
            >
              <span className="relative z-10 text-sm font-medium text-white/80 md:hidden">
                No image
              </span>

              <span className="relative z-10 hidden text-base font-medium text-white/80 md:block">
                No image available
              </span>
            </div>
          )}

          {blog.category && (
            <div className="absolute left-4 top-4 z-10">
              <span
                className="
                  rounded-full bg-white/95 px-3 py-1
                  text-xs font-semibold text-[#b69b5e] shadow-lg
                  md:px-4 md:py-1.5
                "
              >
                {blog.category}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3
            className="
              mb-2.5 line-clamp-2 text-lg font-bold
              leading-snug text-gray-900 transition-colors
              duration-200 group-hover:text-[#b69b5e]
              md:mb-3 md:text-xl md:leading-tight
            "
          >
            {blog.title}
          </h3>

          {blog.description && (
            <p
              className="
                mb-4 line-clamp-2 text-sm leading-relaxed
                text-gray-600 md:mb-5 md:line-clamp-3 md:flex-1
              "
            >
              {blog.description}
            </p>
          )}

          <div
            className="
              mt-auto flex items-center justify-between gap-2
              border-t border-gray-100 pt-4
            "
          >
            {date && (
              <time
                dateTime={date.dateTime}
                className="shrink-0 text-xs font-medium text-gray-400 md:text-sm"
              >
                <span className="md:hidden">{date.mobile}</span>
                <span className="hidden md:inline">{date.desktop}</span>
              </time>
            )}

            <span
              className="
                ml-auto inline-flex shrink-0 items-center
                gap-2 text-sm font-semibold text-[#b69b5e]
              "
            >
              <span className="md:hidden">Explore More</span>
              <span className="hidden md:inline">Read More</span>

              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>

        <div
          className="
            absolute bottom-0 left-0 right-0 h-1
            origin-left scale-x-0 bg-gradient-to-r
            from-[#d3b66b] via-[#b69b5e] to-[#9e8750]
            transition-transform duration-300
            md:group-hover:scale-x-100
          "
        />
      </article>
    </Link>
  );
}

/* RELATED ARTICLES*/

function RelatedBlogsSection({ relatedBlogs }) {
  return (
    <section className="mt-4 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            You might also like
          </h2>

          <Link
            href={NEWS_PATH}
            className="
              rounded-xl bg-[#d7b56d] p-1
              font-semibold text-white hover:bg-[#c6a45d]
            "
          >
            View all
          </Link>
        </div>

        {relatedBlogs.length > 0 ? (
          <>
            <div
              className="
                -mx-4 flex snap-x snap-mandatory gap-4
                overflow-x-auto px-4 pb-6 scrollbar-hide
                md:mx-0 md:grid md:grid-cols-2
                md:gap-6 md:overflow-visible md:px-0 md:pb-0
                lg:grid-cols-3
              "
            >
              {relatedBlogs.map((blog) => (
                <RelatedBlogCard
                  key={blog._id || blog.slug?.current}
                  blog={blog}
                />
              ))}
            </div>

            <div
              aria-hidden="true"
              className="mt-2 flex justify-center gap-2 md:hidden"
            >
              {relatedBlogs.map((blog, index) => (
                <span
                  key={blog._id || index}
                  className="h-2 w-2 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                aria-hidden="true"
                className="
                  overflow-hidden rounded-2xl border
                  border-gray-100 bg-white shadow-lg
                "
              >
                <div className="h-48 animate-pulse bg-gray-200 md:h-56" />

                <div className="space-y-3 p-5 md:p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* BREADCRUMB ICON*/

function BreadcrumbChevron() {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-3 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* DATE ICON*/

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mr-1 h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

/* ARTICLE METADATA*/

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    title: post?.metaTitle,
    description: post?.metaDescription,
    keywords: post?.keywords,
    alternates: {
      canonical: `https://www.dholeratimes.com${BLOGS_PATH}/${slug}`,
    },
    robots: "index, follow",
    authors: [{ name: "Dholera Times" }],
  };
}

/* BLOG DETAIL PAGE*/

export default async function BlogDetail({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  let post;
  let trendingBlogs = [];
  let relatedBlogs = [];

  try {
    const start = performance.now();

    const results = await Promise.allSettled([
      getBlogPost(slug),
      getCachedTrendingBlogs(),
      getCachedRelatedNews(slug),
    ]);

    if (results[0].status === "rejected") {
      throw results[0].reason;
    }

    post = results[0].value;

    trendingBlogs =
      results[1].status === "fulfilled" &&
      Array.isArray(results[1].value)
        ? results[1].value
        : [];

    relatedBlogs =
      results[2].status === "fulfilled" &&
      Array.isArray(results[2].value)
        ? results[2].value
        : [];

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[BlogDetail] Data loaded in ${(performance.now() - start).toFixed(0)}ms`,
      );
    }
  } catch (error) {
    console.error("Error loading blog post:", slug, error);

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">
            Error loading blog post
          </h1>

          <p className="text-gray-600">Please try again later</p>

          <Link
            href={BLOGS_PATH}
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!post) notFound();

  const { items: headingTree, headingIds } = createTableOfContents(
    post.body || [],
  );

  const components = createPortableTextComponents(headingIds);

  /* ARTICLE DATES*/

  const publishedDate = formatPostDate(post.createdAt);
  const updatedDate = formatPostDate(post.publishedAt);

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup post={post} relatedBlog={relatedBlogs} />

      {/* ARTICLE LAYOUT*/}

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <article className="lg:w-2/3">
            {/* BREADCRUMBS*/}

            <div className="mb-4">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link
                      href="/"
                      className="
                        inline-flex items-center text-sm
                        font-medium text-gray-500 hover:text-gray-700
                      "
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <div className="flex items-center">
                      <BreadcrumbChevron />

                      <Link
                        href={BLOGS_PATH}
                        className="
                          ml-1 text-sm font-medium
                          text-gray-500 hover:text-gray-700 md:ml-2
                        "
                      >
                        Blogs
                      </Link>
                    </div>
                  </li>

                  <li aria-current="page">
                    <div className="flex items-center">
                      <BreadcrumbChevron />

                      <span
                        className="
                          ml-1 line-clamp-1 text-sm
                          font-medium text-gray-500 md:ml-2
                        "
                      >
                        {post.title}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            {/* CATEGORIES AND TITLE*/}

            <div className="mb-8">
              {post.categories?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category._id || category.title}
                      className="
                        rounded-full bg-blue-50 px-3 py-1
                        text-sm text-blue-600
                      "
                    >
                      Blogs
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-4xl">
                {post.title}
              </h1>

              {(updatedDate || post.readingTime) && (
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {updatedDate && (
                    <div className="flex items-center">
                      <CalendarIcon />

                      <span className="mr-1">Updated On:</span>

                      <time
                        className="text-gray-500"
                        dateTime={updatedDate.dateTime}
                      >
                        {updatedDate.label}
                      </time>
                    </div>
                  )}

                  {post.readingTime && (
                    <div className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className="mr-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>{post.readingTime} min read</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FEATURED IMAGE*/}

            {post.mainImage && (
              <div className="mb-7 w-full sm:mb-8 lg:mb-9">
                <div
                  className="
                    relative mx-auto w-full max-w-[700px]
                    overflow-hidden rounded-xl bg-[#F3E7EC]
                    shadow-[0_8px_28px_rgba(57,37,46,0.10)]
                    sm:rounded-2xl
                  "
                >
                  <Image
                    src={getSanityImageUrl(post.mainImage, 1200, 800)}
                    alt={
                      post.mainImage?.alt ||
                      post.title ||
                      "Dholera update"
                    }
                    width={1200}
                    height={800}
                    priority
                    sizes="
                      (max-width: 639px) calc(100vw - 32px),
                      (max-width: 1023px) 680px,
                      680px
                    "
                    className="block h-auto w-full object-contain"
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute inset-0
                      bg-gradient-to-t from-black/[0.08]
                      via-transparent to-transparent
                    "
                  />

                  <div
                    className="
                      absolute bottom-3 left-3 z-20
                      inline-flex items-center gap-1.5
                      rounded-full border border-black/[0.08]
                      bg-white/95 px-2.5 py-1.5
                      text-[10px] font-semibold leading-none
                      text-black/70 shadow-[0_4px_14px_rgba(0,0,0,0.12)]
                      backdrop-blur-md
                      min-[390px]:bottom-4 min-[390px]:left-4
                      min-[390px]:px-3 min-[390px]:text-[11px]
                      sm:bottom-5 sm:left-5 sm:px-3.5
                      sm:py-[7px] sm:text-[12px]
                      lg:bottom-6 lg:left-6 lg:px-4
                      lg:py-2 lg:text-[13px]
                    "
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-3.5 w-3.5 text-[#EC1C40] sm:h-4 sm:w-4"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M12 7v5l3 2"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>4 min read</span>
                  </div>
                </div>
              </div>
            )}

            {/* TABLE OF CONTENTS*/}

            <TableOfContents items={headingTree} />

            {/* ARTICLE CONTENT*/}

            <div
              className="
                rounded-xl border border-gray-200
                bg-white p-8 leading-5 text-black shadow-2xl
              "
            >
              <div className="max-w-none text-xl">
                <PortableText
                  value={post.body || []}
                  components={components}
                />
              </div>

              {/* RELATED TOPICS*/}

              {post.tags?.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pt-6">
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Related Topics:
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`${BLOGS_PATH}/tag/${tag}`}
                        className="
                          rounded-full bg-gray-100 px-3 py-1
                          text-sm text-gray-700
                          transition-colors hover:bg-gray-200
                        "
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* PUBLICATION DATE*/}

              {publishedDate && (
                <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon />

                    <span className="mr-1">Published On:</span>

                    <time
                      className="text-gray-500"
                      dateTime={publishedDate.dateTime}
                    >
                      {publishedDate.label}
                    </time>
                  </div>
                </div>
              )}
            </div>

            {/* SOCIAL SHARE*/}

            <SocialShare
              title={post.title}
              url={`https://www.dholeratimes.com${BLOGS_PATH}/${post.slug.current}`}
            />
          </article>

          {/* SIDEBAR*/}

          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-4">
              <div className="mx-auto max-w-xl pt-4">
                <LeadFormSlug
                  title="Buy Residential Plot near Dholera SIR Starting From ₹10 Lakh"
                  buttonName="Know More"
                />
              </div>

              {/* LATEST BLOGS*/}

              <div
                className="
                  overflow-hidden rounded-2xl border border-black/[0.08]
                  bg-white shadow-[0_18px_50px_-36px_rgba(0,0,0,0.30)]
                "
              >
                <div
                  className="
                    flex items-center justify-between
                    border-b border-black/[0.07]
                    px-4 py-4 sm:px-5 sm:py-5
                  "
                >
                  <h3
                    className="
                      text-[20px] font-bold leading-7
                      tracking-[-0.025em] text-black
                      sm:text-[22px]
                    "
                  >
                    Latest Blogs
                  </h3>
                </div>

                <div className="divide-y divide-black/[0.07]">
                  {trendingBlogs.length > 0 ? (
                    trendingBlogs
                      .filter((item) => item?.slug?.current !== slug)
                      .slice(0, 5)
                      .map((item) => (
                        <TrendingBlogItem
                          key={item._id || item.slug?.current}
                          post={item}
                        />
                      ))
                  ) : (
                    <p className="px-4 py-6 text-[14px] leading-6 text-black/50 sm:px-5">
                      No trending articles found.
                    </p>
                  )}
                </div>

                <div className="border-t border-black/[0.07] px-4 py-4 sm:px-5">
                  <Link
                    href={BLOGS_PATH}
                    className="
                      inline-flex min-h-[42px] w-full
                      items-center justify-center rounded-xl
                      bg-[#EC1C40] px-4 py-2.5
                      text-[13px] font-semibold text-white
                      transition-colors duration-200
                      hover:bg-[#d9183a] sm:text-[14px]
                    "
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* RELATED ARTICLES*/}

      <RelatedBlogsSection relatedBlogs={relatedBlogs} />
    </div>
  );
}