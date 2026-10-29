import { getVisibleBlogDate } from "@/lib/blogDates";

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export default function NewsDate({ post, compact = false, className }) {
  const date = getVisibleBlogDate(post);
  if (!date) return null;

  return (
    <time
      dateTime={date.dateTime}
      title={`${date.label}: ${date.formatted}`}
      className={className}
    >
      {compact
        ? shortDateFormatter.format(new Date(date.dateTime))
        : date.formatted}
    </time>
  );
}
