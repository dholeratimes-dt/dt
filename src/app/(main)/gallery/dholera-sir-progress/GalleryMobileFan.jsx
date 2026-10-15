"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const GalleryModal = dynamic(() => import("./GalleryModal"), { ssr: false });

const MOBILE_VISIBLE_CARDS = 6;
const ANIMATION_MS = 280;
const CARD_TRANSITION = "transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease";
const EXIT_TRANSITION = "transform 280ms cubic-bezier(0.22,1,0.36,1), opacity 220ms ease";

/* FAN POSITIONS*/

const fanPositions = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 23, y: -15, rotate: 16, scale: 0.98 },
  { x: 17, y: -23, rotate: 11, scale: 0.973 },
  { x: 10, y: -28, rotate: 6, scale: 0.966 },
  { x: 2, y: -30, rotate: 1, scale: 0.959 },
  { x: -7, y: -28, rotate: -5, scale: 0.952 },
];

/* TRANSFORM HELPERS*/

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mix(from, to, progress) {
  return from + (to - from) * progress;
}

function wrap(index, length) {
  return ((index % length) + length) % length;
}

function getTransform(position, dragX, width) {
  const current = fanPositions[position];
  const distance = Math.max(90, width * 0.3);
  const progress = clamp(Math.abs(dragX) / distance, 0, 1);
  let { x, y, rotate, scale } = current;

  if (position === 0) {
    x = dragX;
    y = Math.min(Math.abs(dragX) * 0.01, 5);
    rotate = clamp((dragX / Math.max(width, 1)) * 10, -9, 9);
    scale = 1;
  } else {
    const forward = fanPositions[position - 1];
    x = mix(x, forward.x, progress);
    y = mix(y, forward.y, progress);
    rotate = mix(rotate, forward.rotate, progress);
    scale = mix(scale, forward.scale, progress);
  }

  return `translate3d(calc(-50% + ${x}px), ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
}

/* MOBILE CARD*/

function MobileGalleryCard({ image, position }) {
  return (
    <>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-black/[0.035]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading={position === 0 ? "eager" : "lazy"}
          fetchPriority={position === 0 ? "auto" : "low"}
          quality={position <= 1 ? 65 : 50}
          sizes={position <= 1
            ? "(max-width: 323px) 246px, (max-width: 403px) 76vw, 306px"
            : "128px"}
          draggable={false}
          className="pointer-events-none select-none object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#EC1C40] shadow-[0_5px_18px_rgba(0,0,0,0.16)] backdrop-blur-md"
        >
          <svg
            aria-hidden="true"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m10 8 6 4-6 4V8Z" />
          </svg>
        </div>
      </div>
      <div className="flex h-[52px] min-h-[52px] items-center bg-white px-4">
        <h2 className="line-clamp-2 text-[14.5px] font-semibold leading-[1.28] tracking-[-0.012em] text-black min-[390px]:text-[15px]">
          {image.alt}
        </h2>
      </div>
    </>
  );
}

/* ARROW ICON*/

function ArrowIcon({ direction }) {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

/* MOBILE GALLERY*/

export default function GalleryMobileFan({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selected, setSelected] = useState(null);

  const stackRef = useRef(null);
  const activeCardRef = useRef(null);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const pointerActiveRef = useRef(false);
  const animatingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const cardWidthRef = useRef(290);
  const dragRef = useRef(0);
  const frameRef = useRef(null);
  const timerRef = useRef(null);
  const suppressTimerRef = useRef(null);

  const visibleCount = Math.min(MOBILE_VISIBLE_CARDS, items.length);
  const visibleItems = Array.from(
    { length: visibleCount },
    (_, position) => items[(currentIndex + position) % items.length],
  );

  /* CLEAN UP ANIMATION WORK*/

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      if (suppressTimerRef.current !== null) clearTimeout(suppressTimerRef.current);
    };
  }, []);

  /* UPDATE TRANSFORMS WITHOUT REACT RENDERING*/

  function applyTransforms(dragX, mode) {
    const cards = stackRef.current?.children;
    if (!cards) return;

    for (let position = 0; position < cards.length; position += 1) {
      const element = cards[position];
      element.style.transition = mode === "drag"
        ? "none"
        : mode === "exit" && position === 0
          ? EXIT_TRANSITION
          : CARD_TRANSITION;
      element.style.transform = getTransform(
        position,
        dragX,
        cardWidthRef.current,
      );
    }
  }

  function cancelFrame() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }

  function releaseClickSuppression() {
    if (suppressTimerRef.current !== null) clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressClickRef.current = false;
      suppressTimerRef.current = null;
    }, 0);
  }

  /* SWIPE AND ARROW NAVIGATION*/

  function navigate(direction) {
    if (animatingRef.current || items.length <= 1) return;

    cancelFrame();
    pointerActiveRef.current = false;
    animatingRef.current = true;
    suppressClickRef.current = true;
    setIsAnimating(true);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCurrentIndex((index) => wrap(index + (direction < 0 ? 1 : -1), items.length));
      animatingRef.current = false;
      setIsAnimating(false);
      releaseClickSuppression();
      return;
    }

    const distance = direction * Math.max(cardWidthRef.current * 1.4, 380);
    applyTransforms(distance, "exit");
    if (timerRef.current !== null) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setCurrentIndex((index) => wrap(index + (direction < 0 ? 1 : -1), items.length));
      dragRef.current = 0;
      animatingRef.current = false;
      setIsAnimating(false);
      timerRef.current = null;
      releaseClickSuppression();
    }, ANIMATION_MS);
  }

  /* POINTER EVENTS*/

  function handlePointerDown(event) {
    if (animatingRef.current || (event.pointerType === "mouse" && event.button !== 0)) return;

    if (suppressTimerRef.current !== null) {
      clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = null;
    }
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    cardWidthRef.current = activeCardRef.current?.getBoundingClientRect().width || 290;
    dragRef.current = 0;
    suppressClickRef.current = false;
    pointerActiveRef.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!pointerActiveRef.current || animatingRef.current) return;

    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;
    if (Math.abs(dx) <= 5 || Math.abs(dx) <= Math.abs(dy)) return;

    suppressClickRef.current = true;
    dragRef.current = dx;
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      applyTransforms(dragRef.current, "drag");
    });
  }

  function handlePointerEnd(event) {
    if (!pointerActiveRef.current || animatingRef.current) return;

    pointerActiveRef.current = false;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    cancelFrame();
    const dx = event.clientX - pointerStartRef.current.x;
    const threshold = Math.max(60, cardWidthRef.current * 0.2);

    if (dx <= -threshold) {
      navigate(-1);
    } else if (dx >= threshold) {
      navigate(1);
    } else {
      dragRef.current = 0;
      applyTransforms(0, "settle");
      if (suppressClickRef.current) releaseClickSuppression();
    }
  }

  function handlePointerCancel() {
    pointerActiveRef.current = false;
    dragRef.current = 0;
    suppressClickRef.current = true;
    cancelFrame();
    applyTransforms(0, "settle");
    releaseClickSuppression();
  }

  /* ACTIVE CARD CLICK*/

  function handleActiveClick(image) {
    if (animatingRef.current) return;
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setSelected(image);
  }

  if (!items.length) return null;

  return (
    <section
      aria-label="Swipeable Dholera gallery"
      className="relative overflow-hidden bg-gradient-to-b from-black via-black to-[#111111] sm:hidden"
    >
      {/* BACKGROUND GLOW*/}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#EC1C40]/10 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[290px] w-[290px] rounded-full bg-[#EC1C40]/10 blur-[95px]"
      />
      <div className="relative z-20 mx-auto w-full max-w-[460px] px-3 pb-7">
        {/* FAN CARDS*/}
        <div
          ref={stackRef}
          aria-label="Swipeable Dholera gallery"
          className="relative mx-auto h-[358px] w-full min-[375px]:h-[373px] min-[414px]:h-[386px]"
        >
          {visibleItems.map((image, position) => (
            <button
              key={`${currentIndex}-${image.id}-${position}`}
              ref={position === 0 ? activeCardRef : null}
              type="button"
              tabIndex={position === 0 ? 0 : -1}
              aria-hidden={position === 0 ? undefined : true}
              aria-label={position === 0
                ? `${image.link ? "Play" : "View"} ${image.alt}. Swipe or use the arrow buttons to navigate.`
                : undefined}
              onDragStart={(event) => event.preventDefault()}
              onPointerDown={position === 0 ? handlePointerDown : undefined}
              onPointerMove={position === 0 ? handlePointerMove : undefined}
              onPointerUp={position === 0 ? handlePointerEnd : undefined}
              onPointerCancel={position === 0 ? handlePointerCancel : undefined}
              onClick={position === 0 ? () => handleActiveClick(image) : undefined}
              onKeyDown={position === 0 ? (event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  navigate(event.key === "ArrowLeft" ? 1 : -1);
                }
              } : undefined}
              style={{
                transform: getTransform(position, 0, 290),
                transformOrigin: "50% 82%",
                transition: CARD_TRANSITION,
                zIndex: position === 0 ? 120 : 100 - position,
                pointerEvents: position === 0 ? "auto" : "none",
                touchAction: "pan-y",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                willChange: position === 0 ? "transform" : "auto",
                backfaceVisibility: "hidden",
              }}
              className="absolute left-1/2 top-[36px] flex w-[76vw] min-w-[246px] max-w-[306px] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white text-left shadow-[0_18px_48px_rgba(0,0,0,0.40)] outline-none focus-visible:ring-2 focus-visible:ring-[#EC1C40] focus-visible:ring-offset-3 focus-visible:ring-offset-black"
            >
              <MobileGalleryCard image={image} position={position} />
            </button>
          ))}
        </div>
        {/* ARROW CONTROLS*/}
        <div className="relative z-40 mt-1 flex items-center justify-center gap-4 pb-1">
          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={isAnimating}
            aria-label="Previous gallery image"
            className="group flex h-8 w-8 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 shadow-[0_4px_14px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-[background-color,border-color,color,transform,opacity] duration-200 active:scale-90 hover:border-white/20 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1C40] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transform-none"
          >
            <ArrowIcon direction="left" />
          </button>
          <div className="flex min-w-[72px] flex-col items-center justify-center gap-0.5">
            <span className="select-none text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95">
              Swipe
            </span>
            <span
              aria-live="polite"
              className="text-[9px] font-medium tracking-[0.08em] text-white/45"
            >
              {currentIndex + 1} / {items.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isAnimating}
            aria-label="Next gallery image"
            className="group flex h-8 w-8 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 shadow-[0_4px_14px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-[background-color,border-color,color,transform,opacity] duration-200 active:scale-90 hover:border-white/20 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC1C40] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transform-none"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
      {/* ON-DEMAND MODAL*/}
      {selected && (
        <GalleryModal image={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
