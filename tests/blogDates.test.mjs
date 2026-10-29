import assert from "node:assert/strict";
import test from "node:test";
import {
  getBlogRecency,
  getVisibleBlogDate,
  resolveBlogDates,
} from "../src/lib/blogDates.js";

test("Sanity's editorial date fields preserve publication and update dates", () => {
  const dates = resolveBlogDates({
    createdAt: "2026-07-01T09:00:00Z",
    publishedAt: "2026-08-19T09:00:00Z",
    _updatedAt: "2026-10-29T09:00:00Z",
  });

  assert.equal(dates.originalPublicationDate, "2026-07-01T09:00:00.000Z");
  assert.equal(dates.updatedDate, "2026-08-19T09:00:00.000Z");
  assert.equal(dates.hasVisibleUpdate, true);
  assert.equal(dates.modificationDate, dates.updatedDate);
});

test("a publication-only article does not invent an editorial update date", () => {
  const post = {
    createdAt: "2026-07-01T09:00:00Z",
    _updatedAt: "2026-10-29T09:00:00Z",
  };

  assert.equal(resolveBlogDates(post).updatedDate, undefined);
  assert.equal(getVisibleBlogDate(post).label, "Published On");
});

test("equal dates show only the publication date and retain metadata", () => {
  const post = {
    createdAt: "2026-08-19T09:00:00Z",
    publishedAt: "2026-08-19T09:00:00Z",
  };
  const dates = resolveBlogDates(post);

  assert.equal(dates.originalPublicationDate, dates.updatedDate);
  assert.equal(dates.hasVisibleUpdate, false);
  assert.equal(getVisibleBlogDate(post).label, "Published On");
});

test("different times on the same local day show only Published On", () => {
  const post = {
    createdAt: "2026-08-18T20:00:00Z",
    publishedAt: "2026-08-19T12:00:00Z",
  };

  assert.equal(resolveBlogDates(post).hasVisibleUpdate, false);
  assert.equal(getVisibleBlogDate(post).label, "Published On");
  assert.equal(getVisibleBlogDate(post).formatted, "August 19, 2026");
});

test("an update crossing local midnight remains visible", () => {
  const post = {
    createdAt: "2026-08-19T18:00:00Z",
    publishedAt: "2026-08-19T19:00:00Z",
  };

  assert.equal(resolveBlogDates(post).hasVisibleUpdate, true);
  assert.equal(getVisibleBlogDate(post).label, "Updated On");
  assert.equal(getVisibleBlogDate(post).formatted, "August 20, 2026");
});

test("legacy and invalid dates fall back without throwing", () => {
  const dates = resolveBlogDates({
    createdAt: "invalid",
    publishedAt: "invalid",
    _createdAt: "2026-07-01T09:00:00Z",
  });

  assert.equal(dates.originalPublicationDate, "2026-07-01T09:00:00.000Z");
  assert.equal(dates.updatedDate, undefined);
  assert.equal(getVisibleBlogDate({}), null);
  assert.equal(getBlogRecency({}), 0);
});

test("card dates use the explicit update date and the site's timezone", () => {
  const date = getVisibleBlogDate({ publishedAt: "2026-08-19T20:00:00Z" });

  assert.equal(date.label, "Updated On");
  assert.equal(date.formatted, "August 20, 2026");
  assert.equal(date.dateTime, "2026-08-19T20:00:00.000Z");
});

test("an editorial update moves an older blog above newer published posts", () => {
  const posts = [
    {
      slug: "new-blog",
      createdAt: "2026-10-20T09:00:00Z",
      _updatedAt: "2026-10-20T09:00:00Z",
    },
    {
      slug: "updated-old-blog",
      createdAt: "2025-01-01T09:00:00Z",
      publishedAt: "2026-10-29T09:00:00Z",
      _updatedAt: "2026-10-29T09:00:00Z",
    },
  ];

  posts.sort((a, b) => getBlogRecency(b) - getBlogRecency(a));
  assert.equal(posts[0].slug, "updated-old-blog");
});

test("blogs sort newest year, month, and day first despite internal edits", () => {
  const posts = [
    { slug: "august", createdAt: "2026-08-19T09:00:00Z", _updatedAt: "2026-10-29T09:00:00Z" },
    { slug: "june", createdAt: "2026-06-01T09:00:00Z" },
    { slug: "october-early", createdAt: "2026-10-01T09:00:00Z" },
    { slug: "september", createdAt: "2026-09-20T09:00:00Z" },
    { slug: "last-december", createdAt: "2025-12-31T09:00:00Z" },
    { slug: "july", createdAt: "2026-07-01T09:00:00Z" },
    { slug: "october-late", createdAt: "2026-10-20T09:00:00Z" },
  ];

  posts.sort((a, b) => getBlogRecency(b) - getBlogRecency(a));
  assert.deepEqual(posts.map(({ slug }) => slug), [
    "october-late", "october-early", "september", "august", "july", "june", "last-december",
  ]);
});
