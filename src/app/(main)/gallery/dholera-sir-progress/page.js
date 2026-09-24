"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

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
  },
  {
    id: 2,
    src: img2,
    alt: "Ahmedabad-Dholera Expressway",
    caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
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
   MOBILE DIRECTIONAL FAN
   ============================================================

   IMPORTANT FLOW:

   The top/active card can be swiped:
   LEFT or RIGHT.

   But cards BEHIND the active card always move:

   LEFT  →  RIGHT  →  FRONT

   The card that was just swiped is recycled to the
   LEFT-MOST / deepest position.

   Then on later swipes:

   position 9 -> position 8
   position 8 -> position 7
   position 7 -> position 6
   ...
   position 2 -> position 1
   position 1 -> FRONT

   Therefore the background deck has ONE fixed direction.
============================================================ */

const MOBILE_VISIBLE_CARDS = 10;

const mobileFanStack = [
  /* ========================================================
     POSITION 0
     ACTIVE / FRONT
  ======================================================== */

  {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  },

  /* ========================================================
     POSITION 1
     CLOSEST BACK CARD

     This sits on the RIGHT side.

     Eventually this card becomes the active/front card.
  ======================================================== */

  {
    x: 23,
    y: -15,
    rotate: 16,
    scale: 0.98,
  },

  /* POSITION 2 */

  {
    x: 17,
    y: -23,
    rotate: 11,
    scale: 0.973,
  },

  /* POSITION 3 */

  {
    x: 10,
    y: -28,
    rotate: 6,
    scale: 0.966,
  },

  /* POSITION 4 */

  {
    x: 2,
    y: -30,
    rotate: 1,
    scale: 0.959,
  },

  /* POSITION 5 */

  {
    x: -7,
    y: -28,
    rotate: -5,
    scale: 0.952,
  },

  /* POSITION 6 */

  {
    x: -15,
    y: -23,
    rotate: -11,
    scale: 0.945,
  },

  /* POSITION 7 */

  {
    x: -23,
    y: -15,
    rotate: -17,
    scale: 0.938,
  },

  /* POSITION 8 */

  {
    x: -29,
    y: -5,
    rotate: -23,
    scale: 0.93,
  },

  /* ========================================================
     POSITION 9
     DEEPEST / NEWLY RECYCLED CARD

     The outgoing card returns HERE.

     It starts on the LEFT side and over subsequent swipes
     moves progressively toward the RIGHT.
  ======================================================== */

  {
    x: -34,
    y: 9,
    rotate: -29,
    scale: 0.922,
  },
];

/* ============================================================
   HELPERS
============================================================ */

const clamp = (value, min, max) => {
  return Math.min(
    Math.max(value, min),
    max,
  );
};

const mix = (
  from,
  to,
  progress,
) => {
  return (
    from +
    (to - from) * progress
  );
};

const getFanPosition = (
  index,
) => {
  if (
    index <
    mobileFanStack.length
  ) {
    return mobileFanStack[
      index
    ];
  }

  return mobileFanStack[
    mobileFanStack.length - 1
  ];
};

/* ============================================================
   MOBILE CARD
============================================================ */

function MobileGalleryCard({
  image,
}) {
  return (
    <>
      {/* IMAGE */}

      <div
        className="
          relative

          aspect-[4/3]
          w-full
          shrink-0

          overflow-hidden

          bg-[#F3E7EC]
        "
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 639px) 310px"
          draggable={false}
          className="
            pointer-events-none

            select-none

            object-cover
            object-center
          "
        />

        {/* IMAGE DEPTH */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t
            from-[#39252E]/18
            via-transparent
            to-transparent
          "
        />

        {/* ZOOM */}

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

            text-[#8F2946]

            shadow-[0_5px_18px_rgba(57,37,46,0.20)]

            backdrop-blur-md
          "
        >
          <ZoomIn
            size={17}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* COMPACT TITLE */}

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

            text-[#39252E]

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
   DESKTOP / TABLET CARD
============================================================ */

function DesktopGalleryCard({
  image,
}) {
  return (
    <>
      {/* IMAGE */}

      <div
        className="
          relative

          aspect-[4/3]
          w-full

          overflow-hidden

          bg-[#F3E7EC]
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
            from-[#39252E]/28
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
            border-white/35

            bg-white/90

            text-[#8F2946]

            shadow-[0_4px_16px_rgba(57,37,46,0.15)]

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
          <ZoomIn
            size={19}
            strokeWidth={1.9}
          />
        </div>
      </div>

      {/* TITLE */}

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

            text-[#39252E]

            transition-colors
            duration-200

            md:group-hover:text-[#8F2946]

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

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  /* =========================================================
     MOBILE DECK
  ========================================================= */

  const [
    mobileCards,
    setMobileCards,
  ] = useState(
    galleryImages,
  );

  const [
    dragX,
    setDragX,
  ] = useState(0);

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  const [
    isAnimating,
    setIsAnimating,
  ] = useState(false);

  const [
    animationPhase,
    setAnimationPhase,
  ] = useState("idle");

  const [
    outgoingId,
    setOutgoingId,
  ] = useState(null);

  const [
    exitDirection,
    setExitDirection,
  ] = useState(1);

  /* =========================================================
     REFS
  ========================================================= */

  const mobileCardRef =
    useRef(null);

  const pointerStartRef =
    useRef({
      x: 0,
      y: 0,
    });

  const previousMoveRef =
    useRef({
      x: 0,
      time: 0,
    });

  const lastMoveRef =
    useRef({
      x: 0,
      time: 0,
    });

  const suppressClickRef =
    useRef(false);

  const exitTimerRef =
    useRef(null);

  const settleTimerRef =
    useRef(null);

  /* =========================================================
     POPUP
  ========================================================= */

  const openPopup = (
    image,
  ) => {
    setSelectedImage(
      image,
    );
  };

  const closePopup = () => {
    setSelectedImage(
      null,
    );
  };

  /* =========================================================
     MODAL UX
  ========================================================= */

  useEffect(() => {
    if (
      !selectedImage
    ) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        closePopup();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [selectedImage]);

  /* =========================================================
     CLEAR TIMERS
  ========================================================= */

  useEffect(() => {
    return () => {
      if (
        exitTimerRef.current
      ) {
        clearTimeout(
          exitTimerRef.current,
        );
      }

      if (
        settleTimerRef.current
      ) {
        clearTimeout(
          settleTimerRef.current,
        );
      }
    };
  }, []);

  /* =========================================================
     GET CARD WIDTH
  ========================================================= */

  const getCardWidth =
    () => {
      return (
        mobileCardRef.current?.getBoundingClientRect()
          .width || 290
      );
    };

  /* =========================================================
     DRAG PROGRESS
  ========================================================= */

  const getDragProgress =
    () => {
      const cardWidth =
        getCardWidth();

      const reactionDistance =
        Math.max(
          82,
          cardWidth *
            0.31,
        );

      return clamp(
        Math.abs(dragX) /
          reactionDistance,
        0,
        1,
      );
    };

  /* =========================================================
     FAILED SWIPE
  ========================================================= */

  const resetMobileCard =
    () => {
      setIsDragging(
        false,
      );

      setAnimationPhase(
        "idle",
      );

      setDragX(0);
    };

  /* =========================================================
     SUCCESSFUL SWIPE

     Active card:
     can exit LEFT or RIGHT.

     Array always rotates:

     A B C D E F
          ↓
     B C D E F A

     A then enters the deepest LEFT position.

     On following swipes it travels:
     LEFT → RIGHT → FRONT
  ========================================================= */

  const completeMobileSwipe =
    (direction) => {
      if (
        isAnimating ||
        !mobileCards.length
      ) {
        return;
      }

      const cardWidth =
        getCardWidth();

      const outgoingCard =
        mobileCards[0];

      const finalExitX =
        direction *
        Math.max(
          cardWidth *
            1.35,
          360,
        );

      setIsAnimating(
        true,
      );

      setIsDragging(
        false,
      );

      setOutgoingId(
        outgoingCard.id,
      );

      setExitDirection(
        direction,
      );

      setAnimationPhase(
        "exit",
      );

      setDragX(
        finalExitX,
      );

      /* =====================================================
         STAGE 1

         ACTIVE CARD LEAVES LEFT OR RIGHT.
      ====================================================== */

      exitTimerRef.current =
        setTimeout(
          () => {
            /*
              Rotate array.

              A B C D E
              ↓
              B C D E A
            */

            setMobileCards(
              (previous) => {
                if (
                  previous.length <=
                  1
                ) {
                  return previous;
                }

                const [
                  first,
                  ...rest
                ] =
                  previous;

                return [
                  ...rest,
                  first,
                ];
              },
            );

            /* ===============================================
               STAGE 2

               OLD ACTIVE CARD IS NOW LAST.

               It moves behind all cards and settles
               on the LEFT side.
            =============================================== */

            setAnimationPhase(
              "settle",
            );

            setDragX(0);

            settleTimerRef.current =
              setTimeout(
                () => {
                  setAnimationPhase(
                    "idle",
                  );

                  setOutgoingId(
                    null,
                  );

                  setIsAnimating(
                    false,
                  );
                },
                440,
              );
          },
          260,
        );
    };

  /* =========================================================
     POINTER DOWN
  ========================================================= */

  const handlePointerDown = (
    event,
    position,
  ) => {
    if (
      position !== 0 ||
      isAnimating
    ) {
      return;
    }

    event.currentTarget.setPointerCapture?.(
      event.pointerId,
    );

    const now =
      performance.now();

    pointerStartRef.current =
      {
        x: event.clientX,
        y: event.clientY,
      };

    previousMoveRef.current =
      {
        x: event.clientX,
        time: now,
      };

    lastMoveRef.current =
      {
        x: event.clientX,
        time: now,
      };

    suppressClickRef.current =
      false;

    setIsDragging(
      true,
    );
  };

  /* =========================================================
     POINTER MOVE
  ========================================================= */

  const handlePointerMove = (
    event,
    position,
  ) => {
    if (
      position !== 0 ||
      !isDragging ||
      isAnimating
    ) {
      return;
    }

    const movementX =
      event.clientX -
      pointerStartRef
        .current.x;

    if (
      Math.abs(
        movementX,
      ) > 6
    ) {
      suppressClickRef.current =
        true;
    }

    previousMoveRef.current =
      lastMoveRef.current;

    lastMoveRef.current =
      {
        x: event.clientX,
        time: performance.now(),
      };

    setDragX(
      movementX,
    );
  };

  /* =========================================================
     POINTER UP
  ========================================================= */

  const handlePointerEnd = (
    event,
    position,
  ) => {
    if (
      position !== 0 ||
      !isDragging ||
      isAnimating
    ) {
      return;
    }

    event.currentTarget.releasePointerCapture?.(
      event.pointerId,
    );

    const finalDragX =
      event.clientX -
      pointerStartRef
        .current.x;

    const cardWidth =
      getCardWidth();

    const distanceThreshold =
      Math.max(
        66,
        cardWidth *
          0.23,
      );

    const previous =
      previousMoveRef.current;

    const last =
      lastMoveRef.current;

    const deltaTime =
      Math.max(
        1,
        last.time -
          previous.time,
      );

    const velocityX =
      ((last.x -
        previous.x) /
        deltaTime) *
      1000;

    const enoughDistance =
      Math.abs(
        finalDragX,
      ) >=
      distanceThreshold;

    const enoughVelocity =
      Math.abs(
        velocityX,
      ) >= 620 &&
      Math.abs(
        finalDragX,
      ) > 16;

    if (
      enoughDistance ||
      enoughVelocity
    ) {
      const directionSource =
        Math.abs(
          finalDragX,
        ) > 8
          ? finalDragX
          : velocityX;

      const direction =
        directionSource >= 0
          ? 1
          : -1;

      completeMobileSwipe(
        direction,
      );

      return;
    }

    setDragX(
      finalDragX,
    );

    resetMobileCard();
  };

  /* =========================================================
     POINTER CANCEL
  ========================================================= */

  const handlePointerCancel =
    () => {
      if (
        !isDragging ||
        isAnimating
      ) {
        return;
      }

      suppressClickRef.current =
        true;

      resetMobileCard();
    };

  /* =========================================================
     MOBILE CARD CLICK
  ========================================================= */

  const handleMobileCardClick =
    (
      event,
      image,
      position,
    ) => {
      if (
        position !== 0 ||
        isAnimating
      ) {
        event.preventDefault();

        return;
      }

      if (
        suppressClickRef.current
      ) {
        suppressClickRef.current =
          false;

        event.preventDefault();

        return;
      }

      openPopup(
        image,
      );
    };

  /* =========================================================
     MOBILE CARD MOTION

     BACKGROUND DIRECTION:

     LEFT → RIGHT

     Important example:

     position 9:
     x = -34

     becomes position 8:
     x = -29

     becomes position 7:
     x = -23

     becomes position 6:
     x = -15

     becomes position 5:
     x = -7

     becomes position 4:
     x = +2

     becomes position 3:
     x = +10

     becomes position 2:
     x = +17

     becomes position 1:
     x = +23

     So every background promotion moves RIGHT.
  ========================================================= */

  const getMobileCardStyle =
    (
      image,
      position,
    ) => {
      const isOutgoing =
        image.id ===
        outgoingId;

      const cardWidth =
        getCardWidth();

      const stackPosition =
        getFanPosition(
          position,
        );

      const outsideVisibleFan =
        position >=
        MOBILE_VISIBLE_CARDS;

      let x =
        stackPosition.x;

      let y =
        stackPosition.y;

      let rotate =
        stackPosition.rotate;

      let scale =
        stackPosition.scale;

      let opacity =
        outsideVisibleFan
          ? 0
          : 1;

      let zIndex =
        Math.max(
          2,
          80 -
            position,
        );

      /* =====================================================
         ACTIVE CARD

         ONLY the active card responds to the actual
         left/right drag direction.
      ====================================================== */

      if (
        position === 0 &&
        animationPhase !==
          "settle"
      ) {
        x = dragX;

        y = Math.min(
          Math.abs(
            dragX,
          ) * 0.01,
          4,
        );

        rotate =
          clamp(
            (dragX /
              Math.max(
                cardWidth,
                1,
              )) *
              10,
            -9,
            9,
          );

        scale = 1;

        opacity = 1;

        zIndex = 100;
      }

      /* =====================================================
         BACKGROUND CARD MOVEMENT

         THIS IS THE KEY PART.

         Every background card moves from its current slot
         into the slot directly before it.

         Because x values are ordered:

         -34
         -29
         -23
         -15
         -7
         +2
         +10
         +17
         +23

         background movement is LEFT → RIGHT.
      ====================================================== */

      if (
        position > 0 &&
        animationPhase !==
          "settle"
      ) {
        const current =
          getFanPosition(
            position,
          );

        const forwardSlot =
          getFanPosition(
            position - 1,
          );

        const progress =
          animationPhase ===
          "exit"
            ? 1
            : getDragProgress();

        x = mix(
          current.x,
          forwardSlot.x,
          progress,
        );

        y = mix(
          current.y,
          forwardSlot.y,
          progress,
        );

        rotate = mix(
          current.rotate,
          forwardSlot.rotate,
          progress,
        );

        scale = mix(
          current.scale,
          forwardSlot.scale,
          progress,
        );

        /*
          First currently hidden card becomes visible
          as it reaches the far-left/deep position.
        */

        if (
          position ===
          MOBILE_VISIBLE_CARDS
        ) {
          opacity =
            progress;
        } else if (
          position >
          MOBILE_VISIBLE_CARDS
        ) {
          opacity = 0;
        } else {
          opacity = 1;
        }
      }

      /* =====================================================
         ACTIVE CARD EXIT

         Still respects user's left/right swipe.
      ====================================================== */

      if (
        isOutgoing &&
        animationPhase ===
          "exit"
      ) {
        x = dragX;

        y = 5;

        rotate =
          exitDirection *
          11;

        scale = 0.985;

        opacity = 1;

        zIndex = 120;
      }

      /* =====================================================
         RECYCLED CARD

         IMPORTANT:

         Once active card is swiped, it becomes the last
         card and enters the fan from the LEFT side.

         It does NOT return to the right side.
      ====================================================== */

      if (
        isOutgoing &&
        animationPhase ===
          "settle"
      ) {
        const leftRearSlot =
          getFanPosition(
            MOBILE_VISIBLE_CARDS -
              1,
          );

        x =
          leftRearSlot.x;

        y =
          leftRearSlot.y;

        rotate =
          leftRearSlot.rotate;

        scale =
          leftRearSlot.scale;

        opacity = 1;

        /*
          Behind every other card.
        */

        zIndex = 1;
      }

      /* =====================================================
         TRANSITIONS
      ====================================================== */

      let transition =
        `
          transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity 240ms ease
        `;

      /*
        Direct finger movement.
      */

      if (
        isDragging
      ) {
        transition =
          "none";
      }

      /*
        Successful swipe exit.
      */

      if (
        animationPhase ===
        "exit"
      ) {
        transition =
          `
            transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 200ms ease
          `;
      }

      /*
        Swiped card going behind stack.
      */

      if (
        animationPhase ===
        "settle"
      ) {
        transition =
          `
            transform 440ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 280ms ease
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

        /*
          All cards rotate around the same lower pivot,
          creating the reference fan appearance.
        */

        transformOrigin:
          "50% 82%",

        transition,

        opacity,

        zIndex,

        pointerEvents:
          position === 0 &&
          !isAnimating
            ? "auto"
            : "none",

        /*
          Horizontal swipe + vertical page scroll.
        */

        touchAction:
          "pan-y",

        userSelect:
          "none",

        WebkitUserSelect:
          "none",

        WebkitTouchCallout:
          "none",

        willChange:
          "transform, opacity",

        backfaceVisibility:
          "hidden",
      };
    };

  /* ============================================================
     JSX
  ============================================================ */

  return (
    <>
      {/* =====================================================
          SEO
      ====================================================== */}

      <title>
        Dholera Smart City Gallery | Dholera Times
      </title>

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

      <meta
        name="robots"
        content="index, follow"
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main
        className="
          overflow-x-hidden

          bg-[#29161D]

          text-[#39252E]

          selection:bg-[#E0A4B5]
          selection:text-[#39252E]

          sm:min-h-screen
          sm:bg-[#FAF7F8]
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
              from-[#39252E]/55
              via-[#39252E]/25
              to-[#8F2946]/18
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
              from-[#39252E]/35
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

                drop-shadow-[0_2px_10px_rgba(57,37,46,0.28)]

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
            < 640PX
        ==================================================== */}

        <section
          className="
            relative

            overflow-hidden

            bg-gradient-to-b
            from-[#321B24]
            via-[#40232E]
            to-[#29161D]

            sm:hidden
          "
        >
          {/* =================================================
              FULL-WIDTH BANNER
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

            {/* BOTTOM BLEND */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-x-0
                bottom-0

                h-[72px]

                bg-gradient-to-t
                from-[#321B24]
                via-[#321B24]/50
                to-transparent
              "
            />
          </div>

          {/* =================================================
              BACKGROUND DECORATION
          ================================================== */}

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

              bg-[#C77892]/13

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

              bg-[#8F2946]/22

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
              CYCLIC CARD AREA
          ================================================== */}

          <div
            className="
              relative
              z-20

              mx-auto

              w-full
              max-w-[460px]

              px-3

              pb-6
            "
          >
            {/* ===============================================
                FAN STAGE
            ================================================ */}

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
              {mobileCards.map(
                (
                  image,
                  position,
                ) => (
                  <button
                    key={image.id}
                    ref={
                      position === 0
                        ? mobileCardRef
                        : null
                    }
                    type="button"
                    tabIndex={
                      position === 0
                        ? 0
                        : -1
                    }
                    aria-hidden={
                      position === 0
                        ? undefined
                        : true
                    }
                    aria-label={
                      position === 0
                        ? `View ${image.alt}. Swipe left or right for the next image.`
                        : undefined
                    }
                    onPointerDown={(
                      event,
                    ) =>
                      handlePointerDown(
                        event,
                        position,
                      )
                    }
                    onPointerMove={(
                      event,
                    ) =>
                      handlePointerMove(
                        event,
                        position,
                      )
                    }
                    onPointerUp={(
                      event,
                    ) =>
                      handlePointerEnd(
                        event,
                        position,
                      )
                    }
                    onPointerCancel={
                      handlePointerCancel
                    }
                    onClick={(
                      event,
                    ) =>
                      handleMobileCardClick(
                        event,
                        image,
                        position,
                      )
                    }
                    style={getMobileCardStyle(
                      image,
                      position,
                    )}
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

                      bg-white

                      text-left

                      shadow-[0_18px_48px_rgba(7,2,4,0.40)]

                      outline-none

                      focus-visible:ring-2
                      focus-visible:ring-[#E0A4B5]
                      focus-visible:ring-offset-3
                      focus-visible:ring-offset-[#39252E]
                    "
                  >
                    <MobileGalleryCard
                      image={image}
                    />
                  </button>
                ),
              )}
            </div>

            {/* ===============================================
                SWIPE INDICATOR
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                relative
                z-30

                mt-1

                flex
                items-center
                justify-center

                gap-4

                pb-1
              "
            >
              <span
                className="
                  flex

                  h-7
                  w-7

                  items-center
                  justify-center

                  rounded-full

                  bg-white/[0.08]

                  text-[22px]
                  font-light
                  leading-none

                  text-white/80

                  shadow-[0_4px_14px_rgba(0,0,0,0.18)]

                  backdrop-blur-sm
                "
              >
                ‹
              </span>

              <span
                className="
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
                className="
                  flex

                  h-7
                  w-7

                  items-center
                  justify-center

                  rounded-full

                  bg-white/[0.08]

                  text-[22px]
                  font-light
                  leading-none

                  text-white/80

                  shadow-[0_4px_14px_rgba(0,0,0,0.18)]

                  backdrop-blur-sm
                "
              >
                ›
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================
            TABLET / DESKTOP GALLERY
        ==================================================== */}

        <section
          className="
            hidden

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
              {galleryImages.map(
                (image) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() =>
                      openPopup(
                        image,
                      )
                    }
                    aria-label={`View ${image.alt}`}
                    className="
                      group

                      relative

                      flex
                      min-w-0
                      flex-col

                      overflow-hidden

                      rounded-2xl

                      border
                      border-[#E0A4B5]/65

                      bg-white

                      text-left

                      shadow-[0_6px_22px_rgba(57,37,46,0.05)]

                      transition-[border-color,box-shadow,transform]
                      duration-300
                      ease-out

                      md:hover:-translate-y-1

                      md:hover:border-[#8F2946]

                      md:hover:shadow-[0_16px_38px_rgba(116,32,57,0.12)]

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#8F2946]
                      focus-visible:ring-offset-3

                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  >
                    <DesktopGalleryCard
                      image={image}
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            IMAGE POPUP
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

              bg-[#39252E]/80

              p-3

              backdrop-blur-[5px]

              sm:p-5
              lg:p-6
            "
            onClick={
              closePopup
            }
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={
                selectedImage.alt
              }
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
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
                border-[#EAD9DF]

                bg-white

                shadow-[0_28px_80px_rgba(34,17,24,0.36)]

                min-[414px]:rounded-[20px]

                sm:h-[82vh]
                sm:max-w-4xl
                sm:rounded-[24px]

                lg:h-[88vh]
                lg:max-w-6xl
              "
            >
              {/* CLOSE */}

              <button
                type="button"
                onClick={
                  closePopup
                }
                aria-label="Close image preview"
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
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#39252E]

                  sm:right-4
                  sm:top-4

                  sm:border-[#EAD9DF]
                  sm:bg-white/95
                  sm:text-[#39252E]

                  sm:hover:bg-[#F7EBEF]
                  sm:hover:text-[#8F2946]

                  motion-reduce:transform-none
                "
              >
                <X
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>

              {/* IMAGE */}

              <div
                className="
                  relative

                  min-h-0
                  w-full
                  flex-1

                  overflow-hidden

                  bg-[#39252E]
                "
              >
                <Image
                  src={
                    selectedImage.src
                  }
                  alt={
                    selectedImage.alt
                  }
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

                {/* MOBILE CAPTION */}

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

                      bg-[#E0A4B5]
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
                    {
                      selectedImage.alt
                    }
                  </h3>
                </div>
              </div>

              {/* DESKTOP / TABLET CAPTION */}

              <div
                className="
                  hidden

                  shrink-0

                  border-t
                  border-[#EAD9DF]

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

                    bg-[#E0A4B5]
                  "
                />

                <h3
                  className="
                    pr-4

                    text-[18px]
                    font-semibold
                    leading-[1.35]

                    tracking-[-0.01em]

                    text-[#39252E]

                    sm:text-[20px]
                  "
                >
                  {
                    selectedImage.alt
                  }
                </h3>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}