import { resolveBlogDates } from "@/lib/blogDates";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export default function BlogDates({ post }) {
  const { originalPublicationDate, updatedDate, hasVisibleUpdate } =
    resolveBlogDates(post);
  const dates = [
    { label: "Published On", value: originalPublicationDate },
    { label: "Updated On", value: hasVisibleUpdate ? updatedDate : undefined },
  ].filter(({ value }) => value);

  if (!dates.length) return null;

  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8">
      {dates.map(({ label, value }) => (
        <div key={label} className="flex items-start gap-2 sm:gap-2.5">
          <svg
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
          <div>
            <dt className="text-xs font-medium leading-5 text-gray-500">
              {label}
            </dt>
            <dd className="m-0 text-xs font-semibold leading-6 text-gray-700 sm:text-sm">
              <time dateTime={value}>{dateFormatter.format(new Date(value))}</time>
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
