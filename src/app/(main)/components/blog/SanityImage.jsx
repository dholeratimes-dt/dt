import { getImageProps } from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Generate responsive URLs on the server and let Sanity resize the original
// once. No image builder or additional image component hydrates in the browser.
export default function SanityImage({
  image,
  alt = "",
  width = 1200,
  height = 800,
  fill = false,
  sizes,
  quality = 60,
  priority = false,
  ...rest
}) {
  if (!image?.asset) return null;

  const loader = ({ width: requestedWidth, quality: requestedQuality }) =>
    urlFor(image)
      .width(requestedWidth)
      .height(Math.round((requestedWidth * height) / width))
      .fit("crop")
      .quality(requestedQuality || quality)
      .auto("format")
      .url();

  const { props } = getImageProps({
    ...rest,
    src: urlFor(image).url(),
    loader,
    alt,
    ...(fill ? { fill: true } : { width, height }),
    sizes,
    quality,
    priority,
    ...(priority ? { loading: "eager", fetchPriority: "high" } : {}),
  });

  return (
    <>
      {priority && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={props.srcSet}
          imageSizes={props.sizes}
          fetchPriority="high"
        />
      )}
      {/* The server-generated srcset uses Sanity's image optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} />
    </>
  );
}
