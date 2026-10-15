"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* YOUTUBE URL HELPER*/

function getYouTubeInfo(link) {
  if (!link) return null;

  try {
    const url = new URL(link);
    const hosts = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"];
    if (url.protocol !== "https:" || !hosts.includes(url.hostname)) return null;

    const isShort = url.pathname.startsWith("/shorts/");
    const videoId = url.hostname === "youtu.be"
      ? url.pathname.split("/")[1]
      : isShort || url.pathname.startsWith("/embed/")
        ? url.pathname.split("/")[2]
        : url.searchParams.get("v");

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId || "")) return null;
    return {
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`,
      isShort,
    };
  } catch {
    return null;
  }
}

/* MEDIA MODAL*/

export default function GalleryModal({ image, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const video = getYouTubeInfo(image.link);

  /* FOCUS, ESCAPE AND SCROLL LOCK*/

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  const videoStyle = video
    ? {
      width: video.isShort ? "min(92vw, calc(88dvh * 9 / 16))" : "min(94vw, 1152px)",
      aspectRatio: video.isShort ? "9 / 16" : "16 / 9",
    }
    : undefined;

  return (
    <div
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-[5px] sm:p-5 lg:p-6"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={video ? `${image.alt} video` : image.alt}
        style={videoStyle}
        className={video
          ? "relative shrink-0 overflow-hidden rounded-[18px] bg-black shadow-[0_28px_90px_rgba(0,0,0,0.5)] min-[414px]:rounded-[20px] sm:rounded-[22px]"
          : "relative flex h-[70dvh] w-full max-w-[94vw] flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.36)] min-[414px]:rounded-[20px] sm:h-[82vh] sm:max-w-4xl sm:rounded-[24px] lg:h-[88vh] lg:max-w-6xl"}
      >
        {/* CLOSE*/}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={video ? "Close video" : "Close media preview"}
          className={video
            ? "absolute right-3 top-3 z-50 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-white/95 text-black shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-[background-color,color,transform] duration-200 hover:bg-[#EC1C40] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1C40] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4 sm:top-4 sm:h-11 sm:w-11 motion-reduce:transform-none"
            : "absolute right-3 top-3 z-40 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-white/35 bg-black/45 text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-[background-color,color,transform] duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1C40] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4 sm:top-4 sm:border-black/10 sm:bg-white/95 sm:text-black sm:hover:bg-[#EC1C40]/5 sm:hover:text-[#EC1C40] motion-reduce:transform-none"}
        >
          <svg
            aria-hidden="true"
            width={video ? "21" : "22"}
            height={video ? "21" : "22"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {/* VIDEO*/}
        {video ? (
          <iframe
            src={video.src}
            title={`${image.alt} video`}
            className="absolute inset-0 h-full w-full border-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {/* IMAGE*/}
            <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-black">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="eager"
                sizes="(max-width: 639px) 94vw, (max-width: 1023px) 90vw, 1152px"
                className="h-full w-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent"
              />
              {/* MOBILE IMAGE CAPTION*/}
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-14 sm:hidden">
                <div aria-hidden="true" className="mb-2.5 h-1 w-9 rounded-full bg-[#EC1C40]" />
                <h3 className="max-w-[90%] text-[17px] font-semibold leading-[1.4] tracking-[-0.01em] text-white">
                  {image.alt}
                </h3>
              </div>
            </div>
            {/* DESKTOP IMAGE CAPTION*/}
            <div className="hidden shrink-0 border-t border-black/10 bg-white px-6 py-5 sm:block">
              <div aria-hidden="true" className="mb-2.5 h-1 w-9 rounded-full bg-[#EC1C40]" />
              <h3 className="pr-4 text-[18px] font-semibold leading-[1.35] tracking-[-0.01em] text-black sm:text-[20px]">
                {image.alt}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
