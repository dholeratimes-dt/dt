import { FaLinkedin } from "react-icons/fa";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const shareOptions = [
  {
    name: "WhatsApp",
    Icon: FaWhatsapp,
    iconClassName: "text-green-600",
    getUrl: ({ encodedText }) =>
      `https://api.whatsapp.com/send?text=${encodedText}`,
  },
  {
    name: "Facebook",
    Icon: FaFacebook,
    iconClassName: "text-blue-600",
    getUrl: ({ encodedUrl }) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedin,
    iconClassName: "text-blue-800",
    getUrl: ({ encodedUrl }) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  },
  {
    name: "X",
    Icon: FaXTwitter,
    iconClassName: "text-gray-900",
    getUrl: ({ encodedTitle, encodedUrl }) =>
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  },
];

export default function SocialShare({ title, url }) {
  if (!url) return null;

  const encodedTitle = encodeURIComponent(title || "Dholera Times");
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(
    title ? `${title} - ${url}` : url,
  );
  const urlValues = { encodedText, encodedTitle, encodedUrl };

  return (
    <section
      className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-800 shadow-sm sm:justify-start"
      aria-label="Share this article"
    >
      <p className="font-semibold">Share With Your Friends &amp; Family:</p>
      <div className="flex items-center gap-2">
        {shareOptions.map(({ name, Icon, iconClassName, getUrl }) => (
          <a
            key={name}
            href={getUrl(urlValues)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share this article on ${name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69C21]"
          >
            <Icon className={`h-6 w-6 ${iconClassName}`} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
