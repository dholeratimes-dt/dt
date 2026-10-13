import { client } from "@/sanity/lib/client";

// Fetch only the eight cards displayed on the homepage, without article bodies.
export async function getHomeUpdates() {
  return client.fetch(`*[
    _type == "post" && site == "dholera-times" && defined(slug.current)
    && !(_id in path("drafts.**")) && !(_id in path("versions.**"))
    && ("Blog" in categories[]->title || "News" in categories[]->title)
  ] | order(coalesce(publishedAt, _createdAt) desc, _id asc)[0...8] {
    _id, title, slug, mainImage, publishedAt, _createdAt,
    "_type": select("Blog" in categories[]->title => "blog", "news")
  }`, {}, { next: { revalidate: 300, tags: ["home-updates"] }, perspective: "published" });
}
