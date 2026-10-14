import { getblogs } from "@/sanity/lib/api";
import { unstable_cache } from "next/cache";
import { getImageProps } from "next/image";

import BlogCard from "./BlogCard";
import MobileBlogSwiper from "./MobileBlog";
import TrendingBlogItem from "./TrendingBlog";
import LeadForm from "../../dholera-sir/LeadForm";

import hero from "@/assets/DTBlogBanner.webp";
import heroM from "@/assets/DT-Blog-phone.webp";

/* SETTINGS*/

export const revalidate = 300;

/* CACHED BLOGS*/

const getCachedBlogs = unstable_cache(
  async () => {
    const startTime = performance.now();

    try {
      const data = await getblogs();

      if (!Array.isArray(data)) {
        throw new Error("Invalid blog data returned from Sanity");
      }

      return data;
    } finally {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Sanity] getblogs: ${(performance.now() - startTime).toFixed(0)}ms`,
        );
      }
    }
  },
  ["dholera-public-blogs-v1"],
  {
    revalidate: 300,
    tags: ["dholera-blogs"],
  },
);

/* DATE SORTING*/

function getDateValue(post) {
  const dateString = post?.publishedAt || post?._createdAt;

  if (!dateString) {
    return 0;
  }

  const timestamp = Date.parse(dateString);

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

/* RESPONSIVE HERO*/

function BlogHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: hero,
    alt: "Dholera Smart City Gujarat",
    sizes: "100vw",
  });

  const {
    props: mobileImageProps,
  } = getImageProps({
    src: heroM,
    alt: "Dholera Smart City Gujarat",
    sizes: "100vw",
  });

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <picture className="block w-full">
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet}
          sizes="100vw"
          width={hero.width}
          height={hero.height}
        />

        <img
          {...mobileImageProps}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full"
        />
      </picture>
    </section>
  );
}

/* BLOGS PAGE*/

export default async function BlogsPage() {
  let posts = [];

  try {
    const postsData = await getCachedBlogs();

    posts = [...postsData].sort(
      (a, b) => getDateValue(b) - getDateValue(a),
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  /* NORMALIZE POSTS*/

  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "Dholera Times",
    mainImage: post.mainImage || null,
    slug: post.slug || { current: "#" },
  }));

  /* MOBILE DATA*/

  const mobilePosts = safePosts.map((post) => ({
    _id: post._id,
    title: post.title,
    slug: post.slug,
    publishedAt: post.publishedAt,
    _createdAt: post._createdAt,
    mainImage: post.mainImage,
  }));

  /* RECENT POSTS*/

  const trendingBlogs = safePosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO*/}

      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-updates/blogs"
      />

      <title>
        Explore Dholera SIR Growth and Updates
      </title>

      <meta
        name="description"
        content="Read expert Dholera Smart City blogs, investment guides, price analysis and infrastructure updates from Dholera Times."
      />

      <meta
        name="robots"
        content="index, follow"
      />

      {/* HERO*/}

      <BlogHero />

      {/* MAIN CONTENT*/}

      <div className="max-w-8xl mx-auto px-4 py-8 md:ml-12 md:mr-12 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* BLOG GRID*/}

          <div className="lg:w-3/4">
            {/* MOBILE*/}

            <div className="md:hidden">
              <MobileBlogSwiper posts={mobilePosts} />
            </div>

            {/* TABLET AND DESKTOP*/}

            <div className="hidden gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {safePosts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                />
              ))}
            </div>
          </div>

          {/* SIDEBAR*/}

          <div
            className="
              lg:sticky lg:top-[-178px] lg:z-30 lg:mt-0
              lg:w-1/4 lg:self-start
            "
          >
            {/* LEAD FORM*/}

            <LeadForm
              title="Plan Your Dholera Investment"
              buttonName="Get Property Details"
            />

            {/* RECENT POSTS*/}

            <div
              className="
                relative mt-10 overflow-hidden rounded-2xl
                border border-black/10 bg-white p-5
                shadow-[0_8px_26px_rgba(0,0,0,0.05)]
                sm:p-6 lg:mt-10
              "
            >
              {/* ACCENT*/}

              <div
                aria-hidden="true"
                className="mb-4 h-1 w-10 rounded-full bg-[#EC1C40]"
              />

              {/* HEADING*/}

              <h2
                className="
                  text-[20px] font-semibold leading-[1.3]
                  tracking-[-0.02em] text-black sm:text-[21px]
                "
              >
                Recent Posts
              </h2>

              {/* POSTS*/}

              <div className="mt-5 divide-y divide-black/10">
                {trendingBlogs.map((post) => (
                  <TrendingBlogItem
                    key={post._id}
                    post={post}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}