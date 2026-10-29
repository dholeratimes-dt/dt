// TrendingBlogItem.jsx
import Link from "next/link";
import NewsDate from "./NewsDate";

export default function TrendingBlogItem({ post }) {
  if (!post) return null;

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
      <Link href={`/dholera-updates/latest-updates/${post.slug?.current}`} className="group">
        <h3 className="text-lg font-semibold text-[#151f28] group-hover:text-[#FDB913] transition">
          {post.title}
        </h3>
        <p className="text-sm text-[#2863e5] mt-4">
          <span><NewsDate post={post} className="text-gray-500" /></span>
          <br />
          

        </p>
      </Link>
    </div>
  );
}
