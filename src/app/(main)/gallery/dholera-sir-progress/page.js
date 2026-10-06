"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import hero from "@/assets/gallery/galleryHero.webp";

import img1 from "@/assets/gallery/sir/5000mw-solar-park-dholera-times.webp";
import img2 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-butterfly-dholera-times.webp";
import img3 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-dholera-times.webp";
import img4 from "@/assets/gallery/sir/cargo-terminal-dholera-international-airport-dholera-times.webp";
import img5 from "@/assets/gallery/sir/infrastruction-activation-area-dholera-times.webp";
import img6 from "@/assets/gallery/sir/main-gate-tata-semiconductor-plant-dholera-times.webp";
import img7 from "@/assets/gallery/sir/renew-solar-cell-manufacturing-plant-dholera-times.webp";
import img8 from "@/assets/gallery/sir/riverfront-dholera-activation-area-dholera-times.webp";
import img9 from "@/assets/gallery/sir/runway-dholera-international-airport-dholera-times.webp";
import img10 from "@/assets/gallery/sir/silk-route-park-activation-area-dholera-times.webp";
import img11 from "@/assets/gallery/sir/tata-semiconductor-plant-construction-dholera-times.webp";
import img12 from "@/assets/gallery/sir/tata-solar-park-dholera-times.webp";
import img13 from "@/assets/gallery/sir/water-treatment-plant-dholera-times.webp";
import img14 from "@/assets/gallery/sir/westwyn-estate-dholera-residential-plots.webp";

/* ============================================================
   GALLERY DATA
============================================================ */

const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: "Solar Park Dholera",
    caption: "5000 MW Solar Park – Dholera",
    link: "https://www.youtube.com/shorts/jm3u-IbngnA",
  },
  {
    id: 2,
    src: img2,
    alt: "Ahmedabad-Dholera Expressway",
    caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
    link: "https://www.youtube.com/shorts/zNflaDMDvlw",
  },
  {
    id: 3,
    src: img4,
    alt: "Dholera International Airport",
    caption: "Ahmedabad–Dholera Expressway",
  },
  {
    id: 4,
    src: img7,
    alt: "Dholera ReNew Power Plant",
    caption: "Cargo Terminal – Dholera International Airport",
  },
  {
    id: 5,
    src: img5,
    alt: "Dholera Activation Area Infrastructure",
    caption: "Infrastructure – Dholera Activation Area",
  },
  {
    id: 6,
    src: img6,
    alt: "Tata Semiconductor Plant Dholera",
    caption: "Main Gate – Tata Semiconductor Plant",
  },
  {
    id: 7,
    src: img3,
    alt: "Dholera Expressway",
    caption: "ReNew Solar Cell Manufacturing Plant",
  },
  {
    id: 8,
    src: img8,
    alt: "Dholera Riverfront Development",
    caption: "Riverfront – Dholera Activation Area",
  },
  {
    id: 9,
    src: img9,
    alt: "Dholera International Airport Runway",
    caption: "Runway – Dholera International Airport",
  },
  {
    id: 10,
    src: img10,
    alt: "Dholera Silk Route Park",
    caption: "Silk Route Park – Activation Area",
  },
  {
    id: 11,
    src: img11,
    alt: "Semiconductor Plant in Dholera",
    caption: "Tata Semiconductor Plant – Construction Phase",
  },
  {
    id: 12,
    src: img12,
    alt: "Tata Solar Park Dholera",
    caption: "Tata Solar Park – Dholera",
  },
  {
    id: 13,
    src: img13,
    alt: "Water Treatment Plant Dholera",
    caption: "Water Treatment Plant – Dholera",
  },
  {
    id: 14,
    src: img14,
    alt: "Residential Plots in Dholera",
    caption: "WestWyn Estate – Dholera Residential Plots",
  },
];

/* ============================================================
   MOBILE SETTINGS
============================================================ */

const MOBILE_VISIBLE_CARDS = 6;

/* ============================================================
   FAN POSITIONS
============================================================ */

const mobileFanStack = [
  {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  },
  {
    x: 23,
    y: -15,
    rotate: 16,
    scale: 0.98,
  },
  {
    x: 17,
    y: -23,
    rotate: 11,
    scale: 0.973,
  },
  {
    x: 10,
    y: -28,
    rotate: 6,
    scale: 0.966,
  },
  {
    x: 2,
    y: -30,
    rotate: 1,
    scale: 0.959,
  },
  {
    x: -7,
    y: -28,
    rotate: -5,
    scale: 0.952,
  },
  {
    x: -15,
    y: -23,
    rotate: -11,
    scale: 0.945,
  },
];

/* ============================================================
   HELPERS
============================================================ */

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const mix = (from, to, progress) => {
  return from + (to - from) * progress;
};

const getFanPosition = (index) => {
  if (index < mobileFanStack.length) {
    return mobileFanStack[index];
  }

  return mobileFanStack[mobileFanStack.length - 1];
};

/* ============================================================
   YOUTUBE URL
============================================================ */

const getYouTubeEmbedUrl = (url) => {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {
      videoId = parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
    } else if (parsedUrl.pathname.startsWith("/shorts/")) {
      videoId = parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0] || "";
    } else if (parsedUrl.pathname.startsWith("/embed/")) {
      videoId = parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || "";
    } else {
      videoId = parsedUrl.searchParams.get("v") || "";
    }

    if (!videoId) {
      return "";
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
  } catch {
    return "";
  }
};

/* ============================================================
   CHECK IF YOUTUBE VIDEO IS A SHORT
============================================================ */

const isYouTubeShortUrl = (url) => {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    return parsedUrl.pathname.startsWith("/shorts/");
  } catch {
    return false;
  }
};
/* ============================================================
   MOBILE CARD CONTENT
============================================================ */

function MobileGalleryCard({ image, priority = false }) {
  return (
    <>
      <div
        className="
          relative

          aspect-[4/3]

          w-full
          shrink-0

          overflow-hidden

          bg-black/[0.035]
        "
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="310px"
          draggable={false}
          className="
            pointer-events-none

            select-none

            object-cover
            object-center
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t
            from-black/15
            via-transparent
            to-transparent
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            bottom-3
            right-3

            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-full

            border
            border-white/70

            bg-white/95

            text-[#EC1C40]

            shadow-[0_5px_18px_rgba(0,0,0,0.16)]

            backdrop-blur-md
          "
        >
          <ZoomIn size={17} strokeWidth={2} />
        </div>
      </div>

      <div
        className="
          flex

          h-[52px]
          min-h-[52px]

          items-center

          bg-white

          px-4
        "
      >
        <h2
          className="
            line-clamp-2

            text-[14.5px]
            font-semibold
            leading-[1.28]

            tracking-[-0.012em]

            text-black

            min-[390px]:text-[15px]
          "
        >
          {image.alt}
        </h2>
      </div>
    </>
  );
}

/* ============================================================
   DESKTOP CARD
============================================================ */

function DesktopGalleryCard({ image }) {
  return (
    <>
      <div
        className="
          relative

          aspect-[4/3]

          w-full

          overflow-hidden

          bg-black/[0.035]
        "
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="
            (max-width: 1023px) 50vw,
            33vw
          "
          className="
            object-cover

            transition-transform
            duration-500
            ease-out

            md:group-hover:scale-[1.035]

            motion-reduce:transform-none
            motion-reduce:transition-none
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent

            opacity-70

            transition-opacity
            duration-300

            md:group-hover:opacity-100
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            bottom-3
            right-3

            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-full

            border
            border-white/50

            bg-white/95

            text-[#EC1C40]

            shadow-[0_4px_16px_rgba(0,0,0,0.14)]

            backdrop-blur-sm

            transition-[background-color,color,transform,opacity]
            duration-200

            md:translate-y-1
            md:opacity-0

            md:group-hover:translate-y-0
            md:group-hover:opacity-100

            motion-reduce:transform-none
          "
        >
          <ZoomIn size={19} strokeWidth={1.9} />
        </div>
      </div>

      <div
        className="
          flex

          min-h-[76px]
          w-full

          items-center

          px-4
          py-4

          min-[414px]:px-5

          sm:min-h-[82px]
          sm:py-5
        "
      >
        <h2
          className="
            text-[16px]
            font-semibold
            leading-[24px]

            tracking-[-0.01em]

            text-black

            transition-colors
            duration-200

            md:group-hover:text-[#EC1C40]

            sm:text-[17px]
            sm:leading-[25px]
          "
        >
          {image.alt}
        </h2>
      </div>
    </>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function DholeraProgressPage() {
  /* =========================================================
     POPUP
  ========================================================= */

  const [selectedImage, setSelectedImage] = useState(null);

  /* =========================================================
     MOBILE CURRENT INDEX

     We use ONE index instead of reordering the entire
     gallery array. This makes left/right buttons and
     swipe use exactly the same navigation system.
  ========================================================= */

  const [currentIndex, setCurrentIndex] = useState(0);

  const [dragX, setDragX] = useState(0);

  const [isDragging, setIsDragging] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  /* =========================================================
     REFS
  ========================================================= */

  const mobileCardRef = useRef(null);

  const pointerStartRef = useRef({
    x: 0,
    y: 0,
  });

  const suppressClickRef = useRef(false);

  const animationTimerRef = useRef(null);

  /* =========================================================
     VISIBLE MOBILE CARDS

     Example currentIndex = 13:

     14, 1, 2, 3, 4, 5

     so slider loops continuously.
  ========================================================= */

  const visibleMobileCards = useMemo(() => {
    const visibleCount = Math.min(MOBILE_VISIBLE_CARDS, galleryImages.length);

    return Array.from(
      {
        length: visibleCount,
      },
      (_, position) => {
        const index = (currentIndex + position) % galleryImages.length;

        return galleryImages[index];
      },
    );
  }, [currentIndex]);

  /* =========================================================
     POPUP FUNCTIONS
  ========================================================= */

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  /* =========================================================
     MODAL UX
  ========================================================= */

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  /* =========================================================
     CLEANUP TIMER
  ========================================================= */

  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  /* =========================================================
     CARD WIDTH
  ========================================================= */

  const getCardWidth = () => {
    return mobileCardRef.current?.getBoundingClientRect().width || 290;
  };

  /* =========================================================
     CIRCULAR INDEX HELPER
  ========================================================= */

  const getWrappedIndex = (index) => {
    const length = galleryImages.length;

    return ((index % length) + length) % length;
  };

  /* =========================================================
     CORE MOBILE NAVIGATION

     direction = -1
     current card moves LEFT
     NEXT image becomes active

     direction = 1
     current card moves RIGHT
     PREVIOUS image becomes active

     BOTH arrow buttons and swipe call this same function.
  ========================================================= */

  const navigateMobile = (direction) => {
    if (isAnimating || galleryImages.length <= 1) {
      return;
    }

    const cardWidth = getCardWidth();

    const finalX = direction * Math.max(cardWidth * 1.4, 380);

    setIsAnimating(true);
    setIsDragging(false);

    setDragX(finalX);

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    animationTimerRef.current = setTimeout(() => {
      /*
          LEFT exit = NEXT
          RIGHT exit = PREVIOUS
        */

      setCurrentIndex((previousIndex) => {
        if (direction < 0) {
          return getWrappedIndex(previousIndex + 1);
        }

        return getWrappedIndex(previousIndex - 1);
      });

      /*
          Reset instantly for newly
          selected card.
        */

      setDragX(0);

      setIsAnimating(false);

      suppressClickRef.current = false;
    }, 280);
  };

  /* =========================================================
     BUTTON NAVIGATION
  ========================================================= */

  const handlePrevious = () => {
    /*
      Previous card:
      active card exits RIGHT.
    */

    navigateMobile(1);
  };

  const handleNext = () => {
    /*
      Next card:
      active card exits LEFT.
    */

    navigateMobile(-1);
  };

  /* =========================================================
     POINTER DOWN
  ========================================================= */

  const handlePointerDown = (event, position) => {
    if (position !== 0 || isAnimating) {
      return;
    }

    event.currentTarget.setPointerCapture?.(event.pointerId);

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    suppressClickRef.current = false;

    setIsDragging(true);
  };

  /* =========================================================
     POINTER MOVE
  ========================================================= */

  const handlePointerMove = (event, position) => {
    if (position !== 0 || !isDragging || isAnimating) {
      return;
    }

    const movementX = event.clientX - pointerStartRef.current.x;

    const movementY = event.clientY - pointerStartRef.current.y;

    /*
      Only treat horizontal movement
      as a swipe.
    */

    if (Math.abs(movementX) > Math.abs(movementY)) {
      if (Math.abs(movementX) > 5) {
        suppressClickRef.current = true;
      }

      setDragX(movementX);
    }
  };

  /* =========================================================
     POINTER END
  ========================================================= */

  const handlePointerEnd = (event, position) => {
    if (position !== 0 || !isDragging || isAnimating) {
      return;
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId);

    setIsDragging(false);

    const finalDragX = event.clientX - pointerStartRef.current.x;

    const cardWidth = getCardWidth();

    const threshold = Math.max(60, cardWidth * 0.2);

    /*
      SWIPE LEFT

      Negative X means next card.
    */

    if (finalDragX <= -threshold) {
      navigateMobile(-1);
      return;
    }

    /*
      SWIPE RIGHT

      Positive X means previous card.
    */

    if (finalDragX >= threshold) {
      navigateMobile(1);
      return;
    }

    /*
      Not enough movement:
      return card to center.
    */

    setDragX(0);

    setTimeout(() => {
      suppressClickRef.current = false;
    }, 180);
  };

  /* =========================================================
     POINTER CANCEL
  ========================================================= */

  const handlePointerCancel = () => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);

    setDragX(0);

    suppressClickRef.current = true;

    setTimeout(() => {
      suppressClickRef.current = false;
    }, 180);
  };

  /* =========================================================
     MOBILE CARD CLICK
  ========================================================= */

  const handleMobileCardClick = (event, image, position) => {
    if (position !== 0 || isAnimating) {
      event.preventDefault();
      return;
    }

    if (suppressClickRef.current) {
      event.preventDefault();

      suppressClickRef.current = false;

      return;
    }

    openPopup(image);
  };

  /* =========================================================
     MOBILE CARD STYLE
  ========================================================= */

  const getMobileCardStyle = (position) => {
    const current = getFanPosition(position);

    let x = current.x;
    let y = current.y;

    let rotate = current.rotate;

    let scale = current.scale;

    let opacity = 1;

    let zIndex = 100 - position;

    const cardWidth = getCardWidth();

    const reactionDistance = Math.max(90, cardWidth * 0.3);

    const progress = clamp(Math.abs(dragX) / reactionDistance, 0, 1);

    /* =======================================================
       ACTIVE CARD
    ======================================================= */

    if (position === 0) {
      x = dragX;

      y = Math.min(Math.abs(dragX) * 0.01, 5);

      rotate = clamp((dragX / Math.max(cardWidth, 1)) * 10, -9, 9);

      scale = 1;

      zIndex = 120;
    }

    /* =======================================================
       CARDS UNDER ACTIVE CARD

       As active card moves out,
       the cards behind move toward
       the front slot.
    ======================================================= */

    if (position > 0) {
      const forward = getFanPosition(position - 1);

      x = mix(current.x, forward.x, progress);

      y = mix(current.y, forward.y, progress);

      rotate = mix(current.rotate, forward.rotate, progress);

      scale = mix(current.scale, forward.scale, progress);

      zIndex = 100 - position;
    }

    /* =======================================================
       TRANSITION
    ======================================================= */

    let transition = `
      transform 360ms cubic-bezier(0.22,1,0.36,1),
      opacity 260ms ease
    `;

    if (isDragging) {
      transition = "none";
    }

    if (isAnimating && position === 0) {
      transition = `
        transform 280ms cubic-bezier(0.22,1,0.36,1),
        opacity 220ms ease
      `;
    }

    return {
      transform: `
        translate3d(
          calc(-50% + ${x}px),
          ${y}px,
          0
        )
        rotate(${rotate}deg)
        scale(${scale})
      `,

      transformOrigin: "50% 82%",

      transition,

      opacity,

      zIndex,

      pointerEvents: position === 0 && !isAnimating ? "auto" : "none",

      touchAction: "pan-y",

      userSelect: "none",

      WebkitUserSelect: "none",

      WebkitTouchCallout: "none",

      willChange: position === 0 ? "transform" : "auto",

      backfaceVisibility: "hidden",
    };
  };

  /* =========================================================
     CURRENT IMAGE COUNTER
  ========================================================= */

  const currentNumber = currentIndex + 1;

  /* =========================================================
     SELECTED VIDEO
  ========================================================= */

  /* =========================================================
   SELECTED VIDEO
========================================================= */

  const selectedVideoUrl = selectedImage?.link
    ? getYouTubeEmbedUrl(selectedImage.link)
    : "";

  /* =========================================================
   YOUTUBE SHORT / NORMAL VIDEO
========================================================= */

  const selectedVideoIsShort = selectedImage?.link
    ? isYouTubeShortUrl(selectedImage.link)
    : false;

  /* ============================================================
     JSX
  ============================================================ */

  return (
    <>
      {/* =====================================================
          SEO
      ====================================================== */}

      <title>Dholera Smart City Gallery | Dholera Times</title>

      <meta
        name="description"
        content="Explore the Dholera Smart City gallery by Dholera Times featuring project visuals, site progress, and development updates in Dholera SIR"
      />

      <meta
        name="keywords"
        content="Dholera Smart City, Dholera SIR, Dholera Gujarat, Smart City Dholera, Dholera Project, Dholera Investment"
      />

      <link
        rel="canonical"
        href="https://www.dholeratimes.com/gallery/dholera-sir-progress"
      />

      <meta name="robots" content="index, follow" />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main
        className="
          overflow-x-clip

          bg-white

          text-black

          selection:bg-[#EC1C40]/15
          selection:text-black

          sm:min-h-screen
        "
      >
        {/* ===================================================
            TABLET / DESKTOP HERO
        ==================================================== */}

        <section
          aria-labelledby="desktop-gallery-heading"
          className="
            relative

            hidden

            overflow-hidden

            sm:block
            sm:h-[42vh]
            sm:min-h-[340px]

            md:h-[46vh]
            md:min-h-[380px]

            lg:h-[48vh]
            lg:min-h-[420px]
          "
        >
          <Image
            src={hero}
            alt="Dholera SIR Progress"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-black/55
              via-black/25
              to-[#EC1C40]/10
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              bottom-0

              h-32

              bg-gradient-to-t
              from-black/35
              to-transparent
            "
          />

          <div
            className="
              relative
              z-10

              mx-auto

              flex
              h-full
              w-full
              max-w-7xl

              items-center
              justify-center

              px-6

              md:px-8
            "
          >
            <h1
              id="desktop-gallery-heading"
              className="
                max-w-[800px]

                text-center

                font-semibold
                leading-[1.15]

                tracking-[-0.03em]

                text-white

                drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]

                sm:text-[38px]

                md:text-[44px]

                lg:text-[50px]
              "
            >
              Dholera SIR Progress in Every Frame
            </h1>
          </div>
        </section>

        {/* ===================================================
            MOBILE VIEW
        ==================================================== */}

        <section
          className="
            relative

            overflow-hidden

            bg-gradient-to-b
            from-black
            via-black
            to-[#111111]

            sm:hidden
          "
        >
          {/* =================================================
              MOBILE HERO
          ================================================== */}

          <div
            className="
              relative

              h-[175px]
              w-full

              overflow-hidden

              min-[375px]:h-[188px]

              min-[414px]:h-[200px]
            "
          >
            <Image
              src={hero}
              alt="Dholera SIR development"
              fill
              priority
              sizes="100vw"
              className="
                object-cover
                object-center
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-x-0
                bottom-0

                h-[72px]

                bg-gradient-to-t
                from-black
                via-black/50
                to-transparent
              "
            />
          </div>

          {/* BACKGROUND GLOW */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              left-1/2
              top-[245px]

              h-[300px]
              w-[300px]

              -translate-x-1/2

              rounded-full

              bg-[#EC1C40]/10

              blur-[90px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              -bottom-24
              -right-24

              h-[290px]
              w-[290px]

              rounded-full

              bg-[#EC1C40]/10

              blur-[95px]
            "
          />

          {/* =================================================
              MOBILE TITLE
          ================================================== */}

          <div
            className="
              relative
              z-30

              mx-auto

              w-full
              max-w-[430px]

              px-5
              pb-7
              pt-6

              min-[390px]:px-6
              min-[390px]:pb-8
              min-[390px]:pt-7
            "
          >
            <h1
              className="
                mx-auto

                max-w-[355px]

                text-center

                text-[26px]
                font-semibold
                leading-[1.18]

                tracking-[-0.035em]

                text-white

                drop-shadow-[0_3px_14px_rgba(0,0,0,0.20)]

                min-[375px]:text-[27px]

                min-[390px]:text-[28px]

                min-[414px]:text-[29px]
              "
            >
              Dholera SIR Progress in Every Frame
            </h1>
          </div>

          {/* =================================================
              MOBILE CYCLIC FAN SLIDER
          ================================================== */}

          <div
            className="
              relative
              z-20

              mx-auto

              w-full
              max-w-[460px]

              px-3

              pb-7
            "
          >
            <div
              className="
                relative

                mx-auto

                h-[358px]
                w-full

                min-[375px]:h-[373px]

                min-[414px]:h-[386px]
              "
              aria-label="Swipeable Dholera gallery"
            >
              {visibleMobileCards.map((image, position) => (
                <button
                  key={`${currentIndex}-${image.id}-${position}`}
                  ref={position === 0 ? mobileCardRef : null}
                  type="button"
                  tabIndex={position === 0 ? 0 : -1}
                  aria-hidden={position === 0 ? undefined : true}
                  aria-label={
                    position === 0
                      ? `${image.link ? "Play" : "View"} ${
                          image.alt
                        }. Swipe or use the arrow buttons to navigate.`
                      : undefined
                  }
                  onDragStart={(event) => event.preventDefault()}
                  onPointerDown={(event) => handlePointerDown(event, position)}
                  onPointerMove={(event) => handlePointerMove(event, position)}
                  onPointerUp={(event) => handlePointerEnd(event, position)}
                  onPointerCancel={handlePointerCancel}
                  onClick={(event) =>
                    handleMobileCardClick(event, image, position)
                  }
                  style={getMobileCardStyle(position)}
                  className="
                      absolute

                      left-1/2
                      top-[36px]

                      flex

                      w-[76vw]
                      min-w-[246px]
                      max-w-[306px]

                      flex-col

                      overflow-hidden

                      rounded-[18px]

                      border
                      border-white/10

                      bg-white

                      text-left

                      shadow-[0_18px_48px_rgba(0,0,0,0.40)]

                      outline-none

                      focus-visible:ring-2
                      focus-visible:ring-[#EC1C40]
                      focus-visible:ring-offset-3
                      focus-visible:ring-offset-black
                    "
                >
                  <MobileGalleryCard image={image} priority={position === 0} />
                </button>
              ))}
            </div>

            {/* =================================================
                WORKING SWIPE / ARROW CONTROLS
            ================================================== */}

            <div
              className="
                relative
                z-40

                mt-1

                flex
                items-center
                justify-center

                gap-4

                pb-1
              "
            >
              {/* ===============================================
                  LEFT / PREVIOUS
              ================================================ */}

              <button
                type="button"
                onClick={handlePrevious}
                disabled={isAnimating}
                aria-label="Previous gallery image"
                className="
                  group

                  flex
                  h-8
                  w-8

                  shrink-0

                  touch-manipulation

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-white/10

                  text-white/80

                  shadow-[0_4px_14px_rgba(0,0,0,0.18)]

                  backdrop-blur-sm

                  transition-[background-color,border-color,color,transform,opacity]
                  duration-200

                  active:scale-90

                  hover:border-white/20
                  hover:bg-white/20
                  hover:text-white

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-black

                  disabled:cursor-not-allowed
                  disabled:opacity-35

                  motion-reduce:transform-none
                "
              >
                <ChevronLeft
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-200

                    group-hover:-translate-x-0.5
                  "
                />
              </button>

              {/* ===============================================
                  LABEL
              ================================================ */}

              <div
                className="
                  flex

                  min-w-[72px]

                  flex-col

                  items-center
                  justify-center

                  gap-0.5
                "
              >
                <span
                  className="
                    select-none

                    text-[11px]
                    font-semibold

                    uppercase

                    tracking-[0.22em]

                    text-white/95
                  "
                >
                  Swipe
                </span>

                <span
                  aria-live="polite"
                  className="
                    text-[9px]
                    font-medium

                    tracking-[0.08em]

                    text-white/45
                  "
                >
                  {currentNumber} / {galleryImages.length}
                </span>
              </div>

              {/* ===============================================
                  RIGHT / NEXT
              ================================================ */}

              <button
                type="button"
                onClick={handleNext}
                disabled={isAnimating}
                aria-label="Next gallery image"
                className="
                  group

                  flex
                  h-8
                  w-8

                  shrink-0

                  touch-manipulation

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-white/10

                  text-white/80

                  shadow-[0_4px_14px_rgba(0,0,0,0.18)]

                  backdrop-blur-sm

                  transition-[background-color,border-color,color,transform,opacity]
                  duration-200

                  active:scale-90

                  hover:border-white/20
                  hover:bg-white/20
                  hover:text-white

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-black

                  disabled:cursor-not-allowed
                  disabled:opacity-35

                  motion-reduce:transform-none
                "
              >
                <ChevronRight
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-200

                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            TABLET / DESKTOP GALLERY
        ==================================================== */}

        <section
          className="
            hidden

            bg-white

            px-6
            py-12

            sm:block

            md:px-8
            md:py-14

            lg:py-16
          "
        >
          <div
            className="
              mx-auto

              w-full
              max-w-7xl
            "
          >
            <div
              className="
                grid

                grid-cols-2

                gap-6

                lg:grid-cols-3

                xl:gap-7
              "
            >
              {galleryImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => openPopup(image)}
                  aria-label={
                    image.link ? `Play ${image.alt} video` : `View ${image.alt}`
                  }
                  className="
                      group

                      relative

                      flex
                      min-w-0
                      flex-col

                      overflow-hidden

                      rounded-2xl

                      border
                      border-black/10

                      bg-white

                      text-left

                      shadow-[0_6px_22px_rgba(0,0,0,0.045)]

                      transition-[border-color,box-shadow,transform]
                      duration-300
                      ease-out

                      md:hover:-translate-y-1
                      md:hover:border-[#EC1C40]/40
                      md:hover:shadow-[0_16px_38px_rgba(0,0,0,0.08)]

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#EC1C40]
                      focus-visible:ring-offset-3

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                >
                  <DesktopGalleryCard image={image} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            IMAGE / VIDEO POPUP
        ==================================================== */}

        {selectedImage && (
          <div
            role="presentation"
            className="
      fixed
      inset-0

      z-[1000]

      flex
      items-center
      justify-center

      overflow-y-auto

      bg-black/80

      p-3

      backdrop-blur-[5px]

      sm:p-5

      lg:p-6
    "
            onClick={closePopup}
          >
            {/* =================================================
        YOUTUBE VIDEO
    ================================================== */}

            {selectedVideoUrl ? (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedImage.alt} video`}
                onClick={(event) => event.stopPropagation()}
                style={
                  selectedVideoIsShort
                    ? {
                        width: "min(92vw, calc(88dvh * 9 / 16))",

                        aspectRatio: "9 / 16",
                      }
                    : {
                        width: "min(94vw, 1152px)",

                        aspectRatio: "16 / 9",
                      }
                }
                className="
          relative

          shrink-0

          overflow-hidden

          rounded-[18px]

          bg-black

          shadow-[0_28px_90px_rgba(0,0,0,0.5)]

          min-[414px]:rounded-[20px]

          sm:rounded-[22px]
        "
              >
                {/* ===============================================
            CLOSE
        ================================================ */}

                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close video"
                  className="
            absolute
            right-3
            top-3

            z-50

            flex
            h-10
            w-10

            touch-manipulation

            items-center
            justify-center

            rounded-full

            border
            border-white/20

            bg-white/95

            text-black

            shadow-[0_6px_20px_rgba(0,0,0,0.25)]

            backdrop-blur-md

            transition-[background-color,color,transform]
            duration-200

            hover:bg-[#EC1C40]
            hover:text-white

            active:scale-95

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#EC1C40]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black

            sm:right-4
            sm:top-4

            sm:h-11
            sm:w-11

            motion-reduce:transform-none
          "
                >
                  <X size={21} strokeWidth={2} aria-hidden="true" />
                </button>

                {/* ===============================================
            YOUTUBE PLAYER

            Shorts  -> 9:16
            Normal  -> 16:9

            The iframe now has exactly the same ratio
            as the player container, so there is no
            oversized horizontal modal around a Short.
        ================================================ */}

                <iframe
                  src={selectedVideoUrl}
                  title={`${selectedImage.alt} video`}
                  className="
            absolute
            inset-0

            h-full
            w-full

            border-0

            bg-black
          "
                  allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share
          "
                  allowFullScreen
                />
              </div>
            ) : (
              /* =================================================
         IMAGE POPUP

         Keep image popup wide as before.
      ================================================== */

              <div
                role="dialog"
                aria-modal="true"
                aria-label={selectedImage.alt}
                onClick={(event) => event.stopPropagation()}
                className="
          relative

          flex

          h-[70dvh]
          w-full
          max-w-[94vw]

          flex-col

          overflow-hidden

          rounded-[18px]

          border
          border-black/10

          bg-white

          shadow-[0_28px_80px_rgba(0,0,0,0.36)]

          min-[414px]:rounded-[20px]

          sm:h-[82vh]
          sm:max-w-4xl
          sm:rounded-[24px]

          lg:h-[88vh]
          lg:max-w-6xl
        "
              >
                {/* ===============================================
            IMAGE CLOSE
        ================================================ */}

                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close media preview"
                  className="
            absolute
            right-3
            top-3

            z-40

            flex
            h-11
            w-11

            touch-manipulation

            items-center
            justify-center

            rounded-full

            border
            border-white/35

            bg-black/45

            text-white

            shadow-[0_6px_20px_rgba(0,0,0,0.25)]

            backdrop-blur-md

            transition-[background-color,color,transform]
            duration-200

            active:scale-95

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#EC1C40]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black

            sm:right-4
            sm:top-4

            sm:border-black/10
            sm:bg-white/95
            sm:text-black

            sm:hover:bg-[#EC1C40]/5
            sm:hover:text-[#EC1C40]

            motion-reduce:transform-none
          "
                >
                  <X size={22} strokeWidth={2} aria-hidden="true" />
                </button>

                {/* ===============================================
            IMAGE
        ================================================ */}

                <div
                  className="
            relative

            min-h-0
            w-full
            flex-1

            overflow-hidden

            bg-black
          "
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    priority
                    sizes="
              (max-width: 639px) 94vw,
              (max-width: 1024px) 90vw,
              1152px
            "
                    className="
              h-full
              w-full

              object-cover
              object-center
            "
                  />

                  {/* TOP GRADIENT */}

                  <div
                    aria-hidden="true"
                    className="
              pointer-events-none

              absolute
              inset-x-0
              top-0

              h-24

              bg-gradient-to-b
              from-black/35
              to-transparent
            "
                  />

                  {/* =============================================
              MOBILE IMAGE CAPTION
          ============================================== */}

                  <div
                    className="
              absolute
              inset-x-0
              bottom-0

              z-20

              px-4
              pb-4
              pt-14

              bg-gradient-to-t
              from-black/75
              via-black/30
              to-transparent

              sm:hidden
            "
                  >
                    <div
                      aria-hidden="true"
                      className="
                mb-2.5

                h-1
                w-9

                rounded-full

                bg-[#EC1C40]
              "
                    />

                    <h3
                      className="
                max-w-[90%]

                text-[17px]
                font-semibold
                leading-[1.4]

                tracking-[-0.01em]

                text-white
              "
                    >
                      {selectedImage.alt}
                    </h3>
                  </div>
                </div>

                {/* ===============================================
            DESKTOP IMAGE CAPTION

            Only for image popup.
        ================================================ */}

                <div
                  className="
            hidden

            shrink-0

            border-t
            border-black/10

            bg-white

            px-6
            py-5

            sm:block
          "
                >
                  <div
                    aria-hidden="true"
                    className="
              mb-2.5

              h-1
              w-9

              rounded-full

              bg-[#EC1C40]
            "
                  />

                  <h3
                    className="
              pr-4

              text-[18px]
              font-semibold
              leading-[1.35]

              tracking-[-0.01em]

              text-black

              sm:text-[20px]
            "
                  >
                    {selectedImage.alt}
                  </h3>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
