// app/sitemap.js

import { client } from "@/sanity/lib/client";
import { resolveBlogDates } from "@/lib/blogDates";

const BASE_URL = "https://www.dholeratimes.com";

const SANITY_OPTIONS = {
  next: {
    revalidate: 60,
  },
};

export default async function sitemap() {
  const [blogs, updates, aboutDholera] = await Promise.all([

    client.fetch(
      `
        *[
          _type == "post"
          && "Blog" in categories[]->title
          && site == "dholera-times"
          && defined(slug.current)
          && coalesce(seo.noIndex, noIndex, false) == false
        ]
        | order(_updatedAt desc)
        {
          "slug": slug.current,
          createdAt,
          publishedAt,
          _createdAt,
          _updatedAt
        }
      `,
      {},
      SANITY_OPTIONS
    ),

    client.fetch(
      `
        *[
          _type == "post"
          && "Updates" in categories[]->title
          && site == "dholera-times"
          && defined(slug.current)
          && coalesce(seo.noIndex, noIndex, false) == false
        ]
        | order(_updatedAt desc)
        {
          "slug": slug.current,
          _updatedAt
        }
      `,
      {},
      SANITY_OPTIONS
    ),


    client.fetch(
      `
        *[
          _type == "post"
          && "project-Info" in categories[]->title
          && site == "dholera-times"
          && defined(slug.current)
          && coalesce(seo.noIndex, noIndex, false) == false
        ]
        | order(_updatedAt desc)
        {
          "slug": slug.current,
          _updatedAt
        }
      `,
      {},
      SANITY_OPTIONS
    ),
  ]);

  const staticPages = [
    {
      url: BASE_URL,
      priority: 1.0,
      changeFrequency: "daily",
    },

    {
      url: `${BASE_URL}/about`,
      priority: 0.7,
      changeFrequency: "monthly",
    },

    {
      url: `${BASE_URL}/contact/inquiry`,
      priority: 0.6,
      changeFrequency: "monthly",
    },

    {
      url: `${BASE_URL}/channel-partner`,
      priority: 0.6,
      changeFrequency: "monthly",
    },

    {
      url: `${BASE_URL}/gallery/dholera-sir-progress`,
      priority: 0.5,
      changeFrequency: "monthly",
    },

    {
      url: `${BASE_URL}/dholera-updates/blogs`,
      priority: 0.8,
      changeFrequency: "daily",
    },

    {
      url: `${BASE_URL}/dholera-updates/latest-updates`,
      priority: 0.7,
      changeFrequency: "daily",
    },

    {
      url: `${BASE_URL}/dholera-sir`,
      priority: 0.7,
      changeFrequency: "monthly",
    },

    {
      url: `${BASE_URL}/nri-investment-guide-dholera`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
  ];

  const blogUrls = blogs.map((post) => {
    const { modificationDate } = resolveBlogDates(post);

    return {
      url: `${BASE_URL}/dholera-updates/blogs/${post.slug}`,
      lastModified: modificationDate,
      changeFrequency: "daily",
      priority: 0.8,
    };
  });


  const updateUrls = updates.map((post) => ({
    url: `${BASE_URL}/dholera-updates/latest-updates/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const aboutDholeraUrls = aboutDholera.map((post) => ({
    url: `${BASE_URL}/dholera-sir/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  
  return [
    ...staticPages,
    ...updateUrls,
    ...blogUrls,
    ...aboutDholeraUrls,
  ];
}
