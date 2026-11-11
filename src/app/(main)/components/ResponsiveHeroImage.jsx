import { getImageProps } from "next/image";

// A single picture lets the browser request only the banner for its viewport.
// CSS-hidden, priority Image components still preload both image files.
export default function ResponsiveHeroImage({
  mobile,
  desktop,
  alt,
  quality = 75,
  className = "block h-auto w-full",
}) {
  const { props: mobileProps } = getImageProps({
    src: mobile,
    alt,
    sizes: "100vw",
    quality,
  });
  const { props: desktopProps } = getImageProps({
    src: desktop,
    alt,
    sizes: "100vw",
    quality,
  });

  return (
    <>
      <link
        rel="preload"
        as="image"
        media="(max-width: 767.98px)"
        imageSrcSet={mobileProps.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(min-width: 768px)"
        imageSrcSet={desktopProps.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <picture className="block w-full">
        <source
          media="(max-width: 767.98px)"
          srcSet={mobileProps.srcSet}
          sizes="100vw"
          width={mobileProps.width}
          height={mobileProps.height}
        />
        <img
          {...desktopProps}
          alt={alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={className}
        />
      </picture>
    </>
  );
}
