"use client";

import Image from "next/image";
import whatsapp from "@/assets/whatsapp.svg";

export default function Whatsapp() {
  const handleWhatsAppClick = () => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "whatsapp_click_organic",
      lead_type: "whatsapp",
      device:
        window.innerWidth <= 768
          ? "mobile"
          : "desktop",
    });

    window.open(
      "https://wa.me/919958993549?text=Hi",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      aria-label="Chat with us on WhatsApp"
      className="
        group
        fixed
        bottom-5
        right-5
        z-40

        h-[58px]
        w-[58px]

        border-0
        bg-transparent
        p-0

        transition-transform
        duration-300

        hover:-translate-y-0.5
        hover:scale-[1.04]

        active:translate-y-0
        active:scale-95

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#25D366]
        focus-visible:ring-offset-2

        sm:bottom-6
        sm:right-6
        sm:h-[62px]
        sm:w-[62px]
      "
    >
      {/* WhatsApp icon only */}
      <Image
        src={whatsapp}
        alt=""
        width={62}
        height={62}
        className="
          h-full
          w-full
          object-contain

          drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)]

          transition-transform
          duration-300

          group-hover:scale-[1.02]
        "
      />

      {/* Notification badge */}
      <span
        aria-label="1 unread message"
        className="
          absolute
          -right-[2px]
          -top-[3px]
          z-10

          flex
          h-[23px]
          min-w-[23px]
          items-center
          justify-center

          rounded-full
          border-2
          border-white
          bg-[#EF2B2D]

          px-1

          text-[12px]
          font-bold
          leading-none
          text-white

          shadow-[0_3px_8px_rgba(0,0,0,0.2)]

          transition-transform
          duration-300

          group-hover:scale-110
        "
      >
        1
      </span>
    </button>
  );
}