

import { getblogs } from "@/sanity/lib/api";
import BlogCard from "./BlogCard";
import MobileBlogSwiper from "./MobileBlog";
import TrendingBlogItem from "./TrendingBlog";
import hero from "@/assets/DTBlogBanner.webp";


import heroM from "@/assets/blog-m-v.webp";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import LeadForm from "../../dholera-sir/LeadForm";
import Link from "next/link";

export default async function BlogsPage() {
  let posts = [];

  try {
    const postsData = await getblogs();

    posts = Array.isArray(postsData)
      ? postsData
      : [];

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(
        a.publishedAt ||
          a._createdAt ||
          0,
      );

      const dateB = new Date(
        b.publishedAt ||
          b._createdAt ||
          0,
      );

      return dateB - dateA;
    });

    console.log(
      "Posts data fetched:",
      posts.length,
    );
  } catch (error) {
    console.error(
      "Error fetching blog posts:",
      error,
    );
  }

  // Add error handling for post data
  const safePosts = posts.map(
    (post) => ({
      ...post,

      author:
        post.author ||
        "Dholera Times",

      mainImage:
        post.mainImage ||
        null,

      slug:
        post.slug || {
          current: "#",
        },
    }),
  );

  const trendingBlogs =
    safePosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
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

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-black
        "
      >
        {/* ===================================================
            DESKTOP / TABLET BANNER

            Important:
            No fixed height.
            Image keeps its original aspect ratio.
        ==================================================== */}

        <Image
          src={hero}
          alt="Dholera Smart City Gujarat"
          priority
          sizes="100vw"
          className="
            hidden
            h-auto
            w-full

            md:block
          "
        />

        {/* ===================================================
            MOBILE BANNER

            Uses its own original mobile aspect ratio.
        ==================================================== */}

        <Image
          src={heroM}
          alt="Dholera Smart City Gujarat"
          priority
          sizes="100vw"
          className="
            block
            h-auto
            w-full

            md:hidden
          "
        />
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          max-w-8xl
          mx-auto
          px-4
          py-8

          md:ml-12
          md:mr-12
          md:py-12
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6

            lg:flex-row
          "
        >
          {/* =================================================
              BLOG GRID
          ================================================== */}

          <div className="lg:w-3/4">
            {/* Mobile */}

            <div className="md:hidden">
              <MobileBlogSwiper
                posts={safePosts}
              />
            </div>

            {/* Desktop / Tablet */}

            <div
              className="
                hidden

                gap-4

                md:grid
                md:grid-cols-2
                md:gap-6

                lg:grid-cols-3
              "
            >
              {safePosts.map(
                (post) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                  />
                ),
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div
            className="
              lg:w-1/4

              lg:sticky
              lg:top-[-178px]
              lg:z-30

              lg:mt-0
              lg:self-start
            "
          >
            {/* =================================================
                LEAD FORM
            ================================================== */}

            <LeadForm
              title="Plan Your Dholera Investment"
              buttonName="Get Property Details"
            />

            {/* =================================================
                RECENT POSTS
            ================================================== */}

            <div
              className="
                relative
                overflow-hidden

                mt-10

                rounded-2xl

                border
                border-black/10

                bg-white

                p-5

                shadow-[0_8px_26px_rgba(0,0,0,0.05)]

                sm:p-6

                lg:mt-10
              "
            >
              {/* Accent */}

              <div
                aria-hidden="true"
                className="
                  mb-4

                  h-1
                  w-10

                  rounded-full

                  bg-[#EC1C40]
                "
              />

              {/* Heading */}

              <h2
                className="
                  text-[20px]
                  font-semibold
                  leading-[1.3]

                  tracking-[-0.02em]

                  text-black

                  sm:text-[21px]
                "
              >
                Recent Posts
              </h2>

              {/* Posts */}

              <div
                className="
                  mt-5

                  divide-y
                  divide-black/10
                "
              >
                {trendingBlogs.map(
                  (post) => (
                    <TrendingBlogItem
                      key={post._id}
                      post={post}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}