"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GalleryModal = dynamic(() => import("./GalleryModal"), { ssr: false });

/* DESKTOP CLICK CONTROLLER*/

export default function GalleryDesktopInteractions() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const gallery = document.getElementById("dholera-progress-desktop-gallery");
    if (!gallery) return;

    function handleClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const card = event.target instanceof Element
        ? event.target.closest("[data-gallery-id]")
        : null;
      if (!card || !gallery.contains(card)) return;

      event.preventDefault();
      setSelected({
        id: Number(card.dataset.galleryId),
        src: card.dataset.gallerySrc,
        alt: card.dataset.galleryAlt,
        link: card.dataset.galleryLink || null,
      });
    }

    gallery.addEventListener("click", handleClick);
    return () => gallery.removeEventListener("click", handleClick);
  }, []);

  return selected ? (
    <GalleryModal image={selected} onClose={() => setSelected(null)} />
  ) : null;
}
