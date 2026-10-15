import Image from "next/image";
import hero from "@/assets/gallery/galleryHero.webp";
import { galleryClientItems } from "./galleryData";
import GalleryMobileFan from "./GalleryMobileFan";
import GalleryDesktop from "./GalleryDesktop";

/* SEO METADATA*/

export const metadata = {
  title: "Dholera Smart City Gallery | Dholera Times",
  description:
    "Explore the Dholera Smart City gallery by Dholera Times featuring project visuals, site progress, and development updates in Dholera SIR",
  keywords:
    "Dholera Smart City, Dholera SIR, Dholera Gujarat, Smart City Dholera, Dholera Project, Dholera Investment",
  alternates: {
    canonical: "https://www.dholeratimes.com/gallery/dholera-sir-progress",
  },
  robots: { index: true, follow: true },
};

/* GALLERY HERO*/

function GalleryHero() {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* HERO IMAGE*/}
      <div className="relative h-[175px] w-full overflow-hidden min-[375px]:h-[188px] min-[414px]:h-[200px] sm:h-[42vh] sm:min-h-[340px] md:h-[46vh] md:min-h-[380px] lg:h-[48vh] lg:min-h-[420px]">
        <Image
          src={hero}
          alt="Dholera SIR Progress"
          fill
          priority
          quality={65}
          sizes="100vw"
          className="object-cover object-center"
        />
        
      </div>
      {/* PAGE TITLE*/}
      <div className="relative z-10 mx-auto w-full max-w-[430px] px-5 pb-7 pt-6 min-[390px]:px-6 min-[390px]:pb-8 min-[390px]:pt-7 sm:absolute sm:inset-0 sm:flex sm:max-w-7xl sm:items-center sm:justify-center sm:px-6 sm:py-0 md:px-8">
        <h1
          id="gallery-heading"
          className="mx-auto max-w-[355px] text-center text-[26px] font-semibold leading-[1.18] tracking-[-0.035em] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.20)] min-[375px]:text-[27px] min-[390px]:text-[28px] min-[414px]:text-[29px] sm:max-w-[800px] sm:text-[38px] sm:leading-[1.15] sm:tracking-[-0.03em] md:text-[44px] lg:text-[50px]"
        >
          Dholera SIR Progress in Every Frame
        </h1>
      </div>
    </section>
  );
}

/* GALLERY PAGE*/

export default function DholeraProgressPage() {
  return (
    <main className="overflow-x-clip bg-black text-black selection:bg-[#EC1C40]/15 selection:text-black sm:min-h-screen sm:bg-white">
      {/* HERO*/}
      <GalleryHero />
      {/* MOBILE GALLERY*/}
      <GalleryMobileFan items={galleryClientItems} />
      {/* DESKTOP GALLERY*/}
      <GalleryDesktop />
    </main>
  );
}
