const URLFormatter = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const getHeadingText = (block) =>
  Array.isArray(block?.children)
    ? block.children.map((child) => child?.text || "").join("").trim()
    : "";

export const createTableOfContents = (body) => {
  if (!Array.isArray(body)) {
    return { items: [], headingIds: new Map() };
  }

  const usedIds = new Map();
  const headings = body
    .filter(
      (block) =>
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block?.style) &&
        getHeadingText(block).length > 0,
    )
    .map((block, index) => {
      const text = getHeadingText(block);
      const baseId = URLFormatter(text) || `section-${index + 1}`;
      const occurrence = (usedIds.get(baseId) || 0) + 1;
      usedIds.set(baseId, occurrence);

      return {
        key: block._key || `${baseId}-${index}`,
        blockKey: block._key,
        text,
        level: Number.parseInt(block.style.replace("h", ""), 10),
        id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
      };
    });

  const items = [];
  const stack = [];

  headings.forEach((heading) => {
    const node = { ...heading, children: [] };

    while (stack.length && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length) stack[stack.length - 1].children.push(node);
    else items.push(node);

    stack.push(node);
  });

  const headingIds = new Map(
    headings
      .filter((heading) => heading.blockKey)
      .map((heading) => [heading.blockKey, heading.id]),
  );

  return { items, headingIds };
};
