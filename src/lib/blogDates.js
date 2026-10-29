const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

function toValidDate(value) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

// Older articles include manually typed metadata in their Portable Text body.
// Hide date-only paragraphs because the article header already shows the dates.
const bodyDateLinePattern = /^(?:published\s+(?:on|at)|(?:last\s+)?updated(?:\s+(?:on|at))?)\s*[:\-\u2013\u2014]?\s*(?:\d{1,2}\s+[a-z]+\s+\d{4}|[a-z]+\s+\d{1,2},?\s+\d{4}|\d{4}-\d{2}-\d{2})\s*$/i;

export function removeBlogBodyDateBlocks(body) {
  if (!Array.isArray(body)) return [];

  const blocks = body.filter((block) => {
    if (
      block?._type !== "block" ||
      !Array.isArray(block.children) ||
      !block.children.every((child) => child?._type === "span")
    ) {
      return true;
    }

    const lines = block.children
      .map((child) => child.text || "")
      .join("")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    return !lines.length || !lines.every((line) => bodyDateLinePattern.test(line));
  });

  // Remove blank paragraphs and line breaks left before the opening content.
  // Keep the remaining article's spacing and inline formatting intact.
  let hasContent = false;
  return blocks.flatMap((block) => {
    if (hasContent) return [block];

    if (
      block?._type !== "block" ||
      !Array.isArray(block.children) ||
      !block.children.every((child) => child?._type === "span")
    ) {
      hasContent = true;
      return [block];
    }

    const children = block.children.map((child) => {
      if (hasContent) return child;
      const text = (child.text || "").trimStart();
      if (text) hasContent = true;
      return text === child.text ? child : { ...child, text };
    });

    return hasContent ? [{ ...block, children }] : [];
  });
}

// Sanity's schema labels createdAt as "Published On" and publishedAt as
// "Updated On". Keep document-operation timestamps out of the public dates.
export function resolveBlogDates(post = {}) {
  const originalPublication =
    toValidDate(post.createdAt) ||
    toValidDate(post._createdAt);
  const updated = toValidDate(post.publishedAt);
  const hasVisibleUpdate = Boolean(
    updated &&
    (!originalPublication ||
      dateFormatter.format(updated) !== dateFormatter.format(originalPublication)),
  );

  return {
    originalPublicationDate: originalPublication?.toISOString(),
    updatedDate: updated?.toISOString(),
    hasVisibleUpdate,
    modificationDate: (updated || originalPublication)?.toISOString(),
  };
}

// Order by the editorial dates shown to readers. Sanity's document-operation
// timestamp must not move an older month above a newer article.
export function getBlogRecency(post = {}) {
  const latestActivity =
    toValidDate(post.publishedAt) ||
    toValidDate(post.createdAt) ||
    toValidDate(post._createdAt);

  return latestActivity?.getTime() || 0;
}

export function getVisibleBlogDate(post = {}) {
  const dates = resolveBlogDates(post);
  const wasModified = dates.hasVisibleUpdate;
  const visibleValue = wasModified
    ? dates.updatedDate
    : dates.originalPublicationDate;

  if (!visibleValue) return null;

  const date = new Date(visibleValue);

  return {
    ...dates,
    wasModified,
    label: wasModified ? "Updated On" : "Published On",
    formatted: dateFormatter.format(date),
    dateTime: date.toISOString(),
  };
}
