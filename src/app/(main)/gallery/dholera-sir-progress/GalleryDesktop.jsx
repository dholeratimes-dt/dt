import Image from "next/image";
import { galleryImages } from "./galleryData";
import GalleryDesktopInteractions from "./GalleryDesktopInteractions";

/* DESKTOP GALLERY CARD*/

function DesktopGalleryCard({ image }) {
  return (
    <a
      href={image.link || image.src.src}
      data-gallery-id={image.id}
      data-gallery-src={image.src.src}
      data-gallery-alt={image.alt}
      data-gallery-link={image.link || ""}
      aria-label={image.link ? `Play ${image.alt} video` : `View ${image.alt}`}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-[0_6px_22px_rgba(0,0,0,0.045)] transition-[border-color,box-shadow,transform] duration-300 ease-out md:hover:-translate-y-1 md:hover:border-[#EC1C40]/40 md:hover:shadow-[0_16px_38px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1C40] focus-visible:ring-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
    >
      {/* IMAGE*/}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/[0.035]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 1023px) calc(50vw - 36px), (max-width: 1535px) calc(33.333vw - 56px), 410px"
          className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition-opacity duration-300 md:group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/95 text-[#EC1C40] shadow-[0_4px_16px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-[background-color,color,transform,opacity] duration-200 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 motion-reduce:transform-none"
        >
          <svg
            aria-hidden="true"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m10 8 6 4-6 4V8Z" />
          </svg>
        </div>
      </div>
      {/* TITLE*/}
      <div className="flex min-h-[76px] w-full items-center px-4 py-4 min-[414px]:px-5 sm:min-h-[82px] sm:py-5">
        <h2 className="text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-black transition-colors duration-200 md:group-hover:text-[#EC1C40] sm:text-[17px] sm:leading-[25px]">
          {image.alt}
        </h2>
      </div>
    </a>
  );
}

/* DESKTOP GALLERY*/

export default function GalleryDesktop() {
  return (
    <section
      id="dholera-progress-desktop-gallery"
      aria-label="Dholera project progress gallery"
      className="hidden bg-white px-6 py-12 sm:block md:px-8 md:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-7">
          {galleryImages.map((image) => (
            <DesktopGalleryCard key={image.id} image={image} />
          ))}
        </div>
      </div>
      {/* LIGHTWEIGHT CLICK CONTROLLER*/}
      <GalleryDesktopInteractions />
    </section>
  );
}
