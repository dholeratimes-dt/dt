import { getImageProps } from "next/image";
import hero3 from "@/assets/hero/DT-Home-Banner-Web.webp";
import heroM2 from "@/assets/hero/DT-Home-Banner-Phone2.webp";
import HeroDesktopFormGate from "./HeroDesktopFormGate";

/* RESPONSIVE HERO IMAGE*/

function HeroImage() {
  const {
    props: {
      srcSet: mobileSrcSet,
      width: mobileWidth,
      height: mobileHeight,
    },
  } = getImageProps({
    src: heroM2,
    alt: "Dholera Times",
    sizes: "100vw",
    quality: 68,
  });

  const {
    props: {
      srcSet: desktopSrcSet,
      src: desktopSrc,
      width: desktopWidth,
      height: desktopHeight,
    },
  } = getImageProps({
    src: hero3,
    alt: "Dholera Times",
    sizes: "100vw",
    quality: 68,
  });

  return (
    <>
      {/* VIEWPORT-SPECIFIC PRELOADS*/}
      <link
        rel="preload"
        as="image"
        media="(max-width: 767px)"
        imageSrcSet={mobileSrcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(min-width: 768px)"
        imageSrcSet={desktopSrcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />

      {/* SINGLE RESPONSIVE HERO*/}
      <picture className="block w-full">
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrcSet}
          sizes="100vw"
          width={mobileWidth}
          height={mobileHeight}
        />
        <img
          src={desktopSrc}
          srcSet={desktopSrcSet}
          sizes="100vw"
          width={desktopWidth}
          height={desktopHeight}
          alt="Dholera Times"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="block h-auto w-full"
        />
      </picture>
    </>
  );
}

/* HOME HERO*/

export default function HOME2() {
  return (
    <section
      aria-label="Dholera Times"
      className="relative m-0 w-full overflow-hidden bg-transparent p-0 pt-[72px] min-[480px]:pt-[76px] md:pt-0"
    >
      {/* HERO BANNER*/}
      <div className="relative m-0 w-full overflow-hidden p-0">
        <HeroImage />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#39252E]/20 via-transparent to-[#39252E]/35 md:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#39252E]/10 via-transparent to-[#742039]/10 md:block"
        />
      </div>

      {/* DESKTOP LEAD FORM*/}
      <HeroDesktopFormGate />
    </section>
  );
}
