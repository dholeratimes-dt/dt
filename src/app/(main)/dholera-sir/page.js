import {
  getblogs,
  getProjectInfo,
  getUpdates,
  getNews,
} from "@/sanity/lib/api";
import hero from "@/assets/DholeraSirhero.webp";
import herom from "@/assets/dholera-sir-m-v.webp";
import Image from "next/image";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";
import Link from "next/link";
import LeadFormSlug from "../dholera-updates/latest-updates/[slug]/LeadForm";

export default async function BlogsPage() {
  // Fetch data and handle potential errors
  let posts = [];
  try {
    const postsData = await getProjectInfo();
    posts = Array.isArray(postsData) ? postsData : [];

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);
      const dateB = new Date(b.publishedAt || b._createdAt || 0);
      return dateB - dateA; // Descending order (newest first)
    });

    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  // Fetch news for sidebar (changed from getUpdates to getnews)
  let trendingBlogs = [];
  try {
    const newsData = await getNews();
    trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
    console.log("News data fetched:", trendingBlogs.length);
  } catch (error) {
    console.error("Error fetching news:", error);
    // Fallback to getUpdates if getnews fails
    try {
      const updatesData = await getUpdates();
      trendingBlogs = Array.isArray(updatesData) ? updatesData.slice(0, 5) : [];
      console.log("Fallback to updates data:", trendingBlogs.length);
    } catch (fallbackError) {
      console.error("Error fetching updates as fallback:", fallbackError);
    }
  }

  return (
    <>
      <title>About Dholera SIR | Smart City Dholera Gujarat</title>
      <meta
        name="description"
        content="Learn about Dholera SIR, Gujarat’s first and largest smart city project, offering investment opportunities, infrastructure, and growth potential."
      />
      <meta
        name="keywords"
        content="Dholera SIR, Dholera Smart City, Smart City Dholera, Dholera Gujarat, Dholera Project, Dholera Investment"
      />
      {/* Hero Section with Black Background */}
      <link rel="canonical" href="https://www.dholeratimes.com/dholera-sir" />
      <meta name="robots" content="index, dofollow" />

      <div className="bg-black text-white">
        <div className="md:relative md:h-[65vh] overflow-hidden">
          <Image
            src={hero}
            alt="Dholera SIR Aerial View"
            className="w-full md:h-full h-auto object-contain md:object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              About Dholera SIR
            </h1>
          </div>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-12 ">
        <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
          {/* Trending Section - Left Sidebar */}
          <div className="lg:w-1/4 sticky top-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#d7b56d]  mb-8">
              <LeadFormSlug
                title="Invest in Registry Ready Dholera Plots near Dholera Expressway under ₹10 Lakh"
                buttonName="Get A Call Back"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#d7b56d] ">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Latest News on Dholera SIR
              </h2>
              {trendingBlogs.length > 0 ? (
                <div className="space-y-6">
                  {trendingBlogs.map((post) => (
                    <TrendingBlogItem key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No news available at the moment.
                </p>
              )}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="lg:w-3/4 ">
            {safePosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safePosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Blog Posts Available
                </h3>
                <p className="text-gray-600">
                  Check back soon for information about Dholera SIR investment
                  opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-[#151f28] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Dholera SIR
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest dholera investment
            opportunities and updates.
          </p>
          <Link
            href="/contact"
            className="bg-[#b69b5e] hover:bg-[#d3b36b] text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
