"use client";

import { useEffect, useId, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import logo from "@/assets/DTLOGO.png";
import { trackPageView } from "@/lib/fbpixel";

/* ============================================================
   NAVIGATION DATA
============================================================ */

const MAIN_LINKS = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Dholera SIR",
    path: "/dholera-sir",
  },
  {
    title: "Dholera News",
    path: "/dholera-updates/latest-updates",
  },
  {
    title: "Blogs",
    path: "/dholera-updates/blogs",
  },
  {
    title: "Photo Gallery",
    path: "/gallery/dholera-sir-progress",
  },
];

const MORE = [
  {
    title: "About Us",
    path: "/about",
    description: "Get to know Dholera Times",
  },
  {
    title: "NRI Guide",
    path: "/nri-investment-guide-dholera",
    description: "Information for overseas buyers",
  },
];

const CONTACT = {
  title: "Contact Us",
  path: "/contact/inquiry",
};

const MOBILE_MORE = [
  ...MORE,
  CONTACT,
];

/* ============================================================
   MOBILE ANIMATION
============================================================ */

const MAIN_LINK_DELAYS = [
  "delay-[520ms]",
  "delay-[580ms]",
  "delay-[640ms]",
  "delay-[700ms]",
  "delay-[760ms]",
];

const MORE_LINK_DELAYS = [
  "delay-[820ms]",
  "delay-[880ms]",
  "delay-[940ms]",
];

const MOBILE_MOTION_DURATION = 1000;

/* ============================================================
   COMPONENT
============================================================ */

export default function Navbar({
  whatsappNumber = "",
}) {
  const pathname =
    usePathname() || "/";

  const uid = useId().replace(
    /:/g,
    "",
  );

  const [
    dropdown,
    setDropdown,
  ] = useState(null);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    mobileVisible,
    setMobileVisible,
  ] = useState(false);

  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const closeTimerRef =
    useRef(null);

  const frameRef =
    useRef(null);

  const navRef =
    useRef(null);

  const menuButtonRef =
    useRef(null);

  const lastTrackedPath =
    useRef(null);

  const isHome =
    pathname === "/";

  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

  const active = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return (
      pathname === path ||
      pathname.startsWith(
        `${path}/`,
      )
    );
  };

  const current = (path) =>
    pathname === path
      ? "page"
      : undefined;

  /* ==========================================================
     WHATSAPP
  ========================================================== */

  const number = String(
    whatsappNumber,
  ).replace(/[^0-9]/g, "");

  const hasWhatsApp =
    /^[1-9][0-9]{7,14}$/.test(
      number,
    );

  const whatsappMessage =
    "Hello Dholera Times, I am interested in buying a plot in Dholera. Please share the available projects, pricing, location, and other details.";

  const enquiryHref =
    hasWhatsApp
      ? `https://wa.me/${number}?text=${encodeURIComponent(
          whatsappMessage,
        )}`
      : CONTACT.path;

  /* ==========================================================
     MOBILE MENU
  ========================================================== */

  function openMobile() {
    clearTimeout(
      closeTimerRef.current,
    );

    cancelAnimationFrame(
      frameRef.current,
    );

    setDropdown(null);

    setMobileOpen(true);

    frameRef.current =
      requestAnimationFrame(
        () => {
          frameRef.current =
            requestAnimationFrame(
              () => {
                setMobileVisible(
                  true,
                );
              },
            );
        },
      );
  }

  function closeMobile(
    restoreFocus = true,
  ) {
    clearTimeout(
      closeTimerRef.current,
    );

    cancelAnimationFrame(
      frameRef.current,
    );

    setMobileVisible(false);

    closeTimerRef.current =
      setTimeout(() => {
        setMobileOpen(false);

        if (
          restoreFocus &&
          menuButtonRef.current?.getClientRects()
            .length
        ) {
          menuButtonRef.current.focus();
        }
      }, MOBILE_MOTION_DURATION);
  }

  function toggleMobile() {
    if (mobileVisible) {
      closeMobile();
      return;
    }

    openMobile();
  }

  /* ==========================================================
     SCROLL STATE
  ========================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 24,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /* ==========================================================
     CLEANUP
  ========================================================== */

  useEffect(
    () => () => {
      clearTimeout(
        closeTimerRef.current,
      );

      cancelAnimationFrame(
        frameRef.current,
      );
    },
    [],
  );

  /* ==========================================================
     ROUTE CHANGE
  ========================================================== */

  useEffect(() => {
    clearTimeout(
      closeTimerRef.current,
    );

    cancelAnimationFrame(
      frameRef.current,
    );

    setDropdown(null);
    setMobileVisible(false);
    setMobileOpen(false);

    if (
      lastTrackedPath.current !==
      pathname
    ) {
      lastTrackedPath.current =
        pathname;

      try {
        trackPageView();
      } catch (error) {
        console.warn(
          "Navbar page-view tracking failed",
          error,
        );
      }
    }
  }, [pathname]);

  /* ==========================================================
     BODY SCROLL LOCK
  ========================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const alreadyLocked =
      document.body.classList.contains(
        "overflow-hidden",
      );

    document.body.classList.add(
      "overflow-hidden",
    );

    return () => {
      if (!alreadyLocked) {
        document.body.classList.remove(
          "overflow-hidden",
        );
      }
    };
  }, [mobileOpen]);

  /* ==========================================================
     ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (
      event,
    ) => {
      if (
        event.key === "Escape"
      ) {
        closeMobile();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [mobileOpen]);

  /* ==========================================================
     DESKTOP DROPDOWN DISMISS
  ========================================================== */

  useEffect(() => {
    if (!dropdown) {
      return;
    }

    const dismiss = (
      event,
    ) => {
      if (
        !navRef.current?.contains(
          event.target,
        )
      ) {
        setDropdown(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      dismiss,
    );

    document.addEventListener(
      "focusin",
      dismiss,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        dismiss,
      );

      document.removeEventListener(
        "focusin",
        dismiss,
      );
    };
  }, [dropdown]);

  /* ==========================================================
     DESKTOP BREAKPOINT
  ========================================================== */

  useEffect(() => {
    const desktop =
      window.matchMedia(
        "(min-width: 1280px)",
      );

    const handleChange = () => {
      setDropdown(null);

      if (desktop.matches) {
        clearTimeout(
          closeTimerRef.current,
        );

        cancelAnimationFrame(
          frameRef.current,
        );

        setMobileVisible(false);
        setMobileOpen(false);
      }
    };

    desktop.addEventListener(
      "change",
      handleChange,
    );

    return () => {
      desktop.removeEventListener(
        "change",
        handleChange,
      );
    };
  }, []);

  /* ==========================================================
     MORE DROPDOWN
  ========================================================== */

  const renderMoreDropdown =
    () => {
      const expanded =
        dropdown === "more";

      const containsActive =
        MORE.some((item) =>
          active(item.path),
        );

      return (
        <div
          className="relative"
          onMouseEnter={() =>
            setDropdown("more")
          }
          onMouseLeave={() =>
            setDropdown(null)
          }
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget,
              )
            ) {
              setDropdown(null);
            }
          }}
          onKeyDown={(event) => {
            if (
              event.key ===
                "Escape" &&
              expanded
            ) {
              setDropdown(null);

              event.currentTarget
                .querySelector(
                  "button",
                )
                ?.focus();
            }
          }}
        >
          {/* MORE BUTTON */}

          <button
            type="button"
            aria-expanded={
              expanded
            }
            aria-controls={`${uid}-more`}
            onClick={() =>
              setDropdown(
                expanded
                  ? null
                  : "more",
              )
            }
            className="
              group
              relative

              inline-flex
              min-h-[48px]

              items-center
              justify-center

              gap-1.5

              whitespace-nowrap

              px-3
              py-2.5

              text-[17px]
              font-semibold
              leading-6

              text-black

              transition-colors
              duration-200

              hover:text-[#EC1C40]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white

              min-[1440px]:px-4
            "
          >
            <span>
              More
            </span>

            <ChevronDown
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className={`
                transition-transform
                duration-200

                ${
                  expanded
                    ? "rotate-180"
                    : ""
                }
              `}
            />

            {/* ACTIVE / HOVER LINE */}

            <span
              aria-hidden="true"
              className={`
                absolute

                bottom-[3px]
                left-3
                right-3

                h-[2px]

                origin-center

                rounded-full

                bg-[#EC1C40]

                transition-transform
                duration-200

                ${
                  expanded ||
                  containsActive
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }
              `}
            />
          </button>

          {/* DROPDOWN */}

          <div
            id={`${uid}-more`}
            hidden={!expanded}
            className="
              absolute
              right-0
              top-full
              z-50

              w-[340px]

              pt-3
            "
          >
            <div
              className="
                overflow-hidden

                rounded-2xl

                border
                border-black/10

                bg-white

                p-2.5

                shadow-[0_24px_60px_-24px_rgba(0,0,0,0.24)]
              "
            >
              <p
                className="
                  px-3
                  pb-2
                  pt-2

                  text-[11px]
                  font-semibold
                  uppercase

                  tracking-[0.14em]

                  text-[#EC1C40]
                "
              >
                Dholera Times
              </p>

              <div className="space-y-1">
                {MORE.map(
                  (item) => {
                    const isActive =
                      active(
                        item.path,
                      );

                    return (
                      <Link
                        key={
                          item.path
                        }
                        href={
                          item.path
                        }
                        onClick={() =>
                          setDropdown(
                            null,
                          )
                        }
                        className={`
                          group

                          flex
                          min-h-[68px]

                          items-center
                          justify-between

                          gap-4

                          rounded-xl

                          px-3
                          py-3

                          transition-colors
                          duration-200

                          ${
                            isActive
                              ? "bg-[#EC1C40]/5"
                              : "hover:bg-[#EC1C40]/5"
                          }
                        `}
                      >
                        <span className="min-w-0">
                          <strong
                            className="
                              block

                              text-[17px]
                              font-semibold
                              leading-6

                              text-black
                            "
                          >
                            {
                              item.title
                            }
                          </strong>

                          <small
                            className="
                              mt-0.5

                              block

                              text-[13px]
                              leading-5

                              text-black/60
                            "
                          >
                            {
                              item.description
                            }
                          </small>
                        </span>

                        <ChevronRight
                          size={17}
                          strokeWidth={
                            1.9
                          }
                          aria-hidden="true"
                          className="
                            shrink-0

                            text-[#EC1C40]

                            transition-transform
                            duration-200

                            group-hover:translate-x-0.5
                          "
                        />
                      </Link>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };

  /* ==========================================================
     DESKTOP LINK CLASS
  ========================================================== */

  const desktopLinkClass = `
    group
    relative

    inline-flex
    min-h-[48px]

    items-center
    justify-center

    whitespace-nowrap

    px-3
    py-2.5

    text-[17px]
    font-semibold
    leading-6

    text-black

    transition-colors
    duration-200

    hover:text-[#EC1C40]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#EC1C40]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-white

    min-[1440px]:px-4
  `;

  /* ============================================================
     RETURN
  ============================================================ */

  return (
    <>
      {/* =======================================================
          DESKTOP / MOBILE TOP NAVBAR
      ======================================================== */}

      <header
        className={`
          sticky
          top-0
          z-[80]

          w-full

          bg-transparent

          backdrop-blur-md
          backdrop-saturate-150

          border-b
          border-black/10

          ${
            scrolled
              ? "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.24)]"
              : "shadow-none"
          }

          ${
            isHome
              ? `
                  -mb-[72px]

                  min-[480px]:-mb-[76px]

                  md:mb-0
                `
              : ""
          }

          transition-[box-shadow,border-color]
          duration-300

          motion-reduce:transition-none
        `}
      >
        <div
          className="
            mx-auto

            flex
            min-h-[72px]

            w-full
            max-w-[1536px]

            items-center

            gap-5

            px-4
            py-2

            min-[480px]:min-h-[76px]
            min-[480px]:px-6

            md:px-8

            min-[1280px]:min-h-[80px]

            min-[1440px]:gap-7
          "
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            aria-label="Dholera Times home"
            className="
              inline-flex
              shrink-0

              items-center

              rounded-md

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white
            "
          >
            <Image
              src={logo}
              alt="Dholera Times"
              width={150}
              height={150}
              priority
              className="
                h-[50px]
                w-auto

                object-contain

                drop-shadow-[0_2px_6px_rgba(0,0,0,0.10)]

                min-[480px]:h-[52px]

                min-[1280px]:h-[54px]
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav
            ref={navRef}
            aria-label="Main navigation"
            className="
              ml-auto

              hidden

              items-center

              gap-0.5

              min-[1280px]:flex

              min-[1440px]:gap-1
            "
          >
            {MAIN_LINKS.map(
              (item) => {
                const isActive =
                  active(
                    item.path,
                  );

                return (
                  <Link
                    key={
                      item.path
                    }
                    href={
                      item.path
                    }
                    aria-current={current(
                      item.path,
                    )}
                    onClick={() =>
                      setDropdown(
                        null,
                      )
                    }
                    className={
                      desktopLinkClass
                    }
                  >
                    {
                      item.title
                    }

                    {/* ACTIVE LINE */}

                    <span
                      aria-hidden="true"
                      className={`
                        absolute

                        bottom-[3px]
                        left-3
                        right-3

                        h-[2px]

                        origin-center

                        rounded-full

                        bg-[#EC1C40]

                        transition-transform
                        duration-200

                        ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }
                      `}
                    />
                  </Link>
                );
              },
            )}

            {/* MORE */}

            {renderMoreDropdown()}

            {/* CONTACT */}

            <Link
              href={CONTACT.path}
              aria-current={current(
                CONTACT.path,
              )}
              onClick={() =>
                setDropdown(null)
              }
              className={`
                ml-3

                inline-flex
                min-h-[46px]

                items-center
                justify-center

                whitespace-nowrap

                rounded-full

                border

                px-5
                py-2.5

                text-[16px]
                font-semibold

                transition-[background-color,color,border-color,transform,box-shadow]
                duration-200

                active:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-white

                ${
                  active(
                    CONTACT.path,
                  )
                    ? `
                        border-[#EC1C40]
                        bg-[#EC1C40]
                        text-white
                      `
                    : `
                        border-[#EC1C40]
                        bg-transparent
                        text-[#EC1C40]

                        hover:-translate-y-px
                        hover:bg-[#EC1C40]
                        hover:text-white

                        hover:shadow-[0_8px_22px_-14px_rgba(236,28,64,0.55)]
                      `
                }

                motion-reduce:transform-none
              `}
            >
              Contact us
            </Link>
          </nav>

          {/* MOBILE SPACER */}

          <span
            aria-hidden="true"
            className="
              ml-auto

              h-11
              w-11

              shrink-0

              min-[1280px]:hidden
            "
          />
        </div>
      </header>

      {/* =======================================================
          MOBILE MENU BUTTON
      ======================================================== */}

      <button
        ref={menuButtonRef}
        type="button"
        aria-label={
          mobileVisible
            ? "Close navigation"
            : "Open navigation"
        }
        aria-expanded={
          mobileVisible
        }
        aria-controls={`${uid}-mobile`}
        onClick={toggleMobile}
        className={`
          fixed

          right-4
          top-[14px]

          z-[120]

          flex
          h-11
          w-11

          touch-manipulation

          items-center
          justify-center

          border-0

          bg-transparent

          p-0

          shadow-none

          outline-none

          transition-colors
          duration-200

          min-[480px]:right-6
          min-[480px]:top-[16px]

          min-[1280px]:hidden

          hover:bg-transparent

          active:bg-transparent

          focus:bg-transparent
          focus:outline-none

          focus-visible:bg-transparent
          focus-visible:outline-none

          ${
            mobileVisible
              ? "text-white"
              : "text-black"
          }
        `}
      >
        <span
          aria-hidden="true"
          className="
            relative

            block

            h-[24px]
            w-[28px]

            overflow-visible
          "
        >
          {/* TOP LINE */}

          <span
            className={`
              absolute
              left-0

              h-[2px]
              w-[28px]

              rounded-full

              bg-current

              origin-center

              will-change-transform

              transition-[top,transform]
              duration-[1000ms]
              ease-linear

              ${
                mobileVisible
                  ? "top-[11px] rotate-45"
                  : "top-[4px] rotate-0"
              }
            `}
          />

          {/* MIDDLE LINE */}

          <span
            className={`
              absolute
              left-0
              top-[11px]

              block

              will-change-transform

              transition-transform
              duration-[1000ms]
              ease-linear

              ${
                mobileVisible
                  ? "-translate-x-[calc(35vw-38px)]"
                  : "translate-x-0"
              }
            `}
          >
            <span
              className={`
                block

                h-[2px]
                w-[28px]

                rounded-full

                bg-current

                transition-opacity
                ease-linear

                ${
                  mobileVisible
                    ? `
                        opacity-0
                        duration-[250ms]
                        delay-[700ms]
                      `
                    : `
                        opacity-100
                        duration-[150ms]
                        delay-0
                      `
                }
              `}
            />
          </span>

          {/* BOTTOM LINE */}

          <span
            className={`
              absolute
              left-0

              h-[2px]
              w-[28px]

              rounded-full

              bg-current

              origin-center

              will-change-transform

              transition-[top,transform]
              duration-[1000ms]
              ease-linear

              ${
                mobileVisible
                  ? "top-[11px] -rotate-45"
                  : "top-[18px] rotate-0"
              }
            `}
          />
        </span>
      </button>

      {/* =======================================================
          MOBILE DRAWER
      ======================================================== */}

      {mobileOpen && (
        <div
          id={`${uid}-mobile`}
          className="
            fixed
            inset-0

            z-[100]

            h-[100dvh]
            w-full

            overflow-hidden

            min-[1280px]:hidden
          "
        >
          {/* =================================================
              OVERLAY
          ================================================== */}

          <button
            type="button"
            aria-label="Close navigation"
            onClick={() =>
              closeMobile()
            }
            className={`
              absolute
              inset-0

              h-full
              w-full

              cursor-default

              bg-black/45

              backdrop-blur-[2px]

              transition-opacity
              duration-[1000ms]
              ease-linear

              ${
                mobileVisible
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />

          {/* =================================================
              DRAWER
          ================================================== */}

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={`
              relative
              z-10

              flex

              h-[100dvh]
              w-[65vw]

              flex-col

              overflow-hidden

              border-r
              border-black/10

              bg-white

              text-black

              shadow-[24px_0_70px_-30px_rgba(0,0,0,0.32)]

              will-change-transform
              transform-gpu

              transition-transform
              duration-[1000ms]
              ease-linear

              ${
                mobileVisible
                  ? "translate-x-0"
                  : "-translate-x-full"
              }
            `}
          >
            {/* ===============================================
                MOBILE LINKS
            ================================================ */}

            <nav
              aria-label="Mobile navigation"
              className="
                min-h-0

                flex-1

                overscroll-contain
                overflow-y-auto

                px-3
                pb-4
                pt-4

                min-[414px]:px-4
                min-[414px]:pt-5
              "
            >
              {/* MAIN LINKS */}

              <div className="space-y-1">
                {MAIN_LINKS.map(
                  (
                    item,
                    index,
                  ) => {
                    const isActive =
                      active(
                        item.path,
                      );

                    return (
                      <Link
                        key={
                          item.path
                        }
                        href={
                          item.path
                        }
                        aria-current={current(
                          item.path,
                        )}
                        onClick={() =>
                          closeMobile(
                            false,
                          )
                        }
                        className={`
                          group

                          flex

                          min-h-[48px]

                          items-center
                          justify-between

                          gap-2

                          rounded-xl

                          border

                          px-3
                          py-2.5

                          text-[15px]
                          font-medium
                          leading-6

                          transition-[background-color,border-color,color,transform,opacity]
                          duration-[780ms]

                          ease-[cubic-bezier(0.16,1,0.3,1)]

                          ${
                            MAIN_LINK_DELAYS[
                              index
                            ] || ""
                          }

                          ${
                            mobileVisible
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-4 opacity-0"
                          }

                          ${
                            isActive
                              ? `
                                  border-[#EC1C40]/20
                                  bg-[#EC1C40]/5

                                  font-semibold

                                  text-[#EC1C40]
                                `
                              : `
                                  border-transparent

                                  text-black/75

                                  hover:border-[#EC1C40]/10
                                  hover:bg-[#EC1C40]/5
                                  hover:text-black
                                `
                          }

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#EC1C40]
                          focus-visible:ring-offset-1
                          focus-visible:ring-offset-white

                          motion-reduce:transform-none
                          motion-reduce:transition-none
                        `}
                      >
                        <span className="min-w-0">
                          {
                            item.title
                          }
                        </span>

                        <ChevronRight
                          size={16}
                          strokeWidth={
                            1.9
                          }
                          aria-hidden="true"
                          className={`
                            shrink-0

                            transition-[color,transform]
                            duration-300

                            ${
                              isActive
                                ? "text-[#EC1C40]"
                                : "text-black/40 group-hover:translate-x-0.5 group-hover:text-[#EC1C40]"
                            }

                            motion-reduce:transform-none
                          `}
                        />
                      </Link>
                    );
                  },
                )}
              </div>

              {/* =============================================
                  MORE
              ============================================== */}

              <div
                className="
                  mt-4

                  border-t
                  border-black/10

                  pt-4
                "
              >
                <p
                  className={`
                    mb-1.5

                    px-3

                    text-[10px]
                    font-semibold
                    uppercase
                    leading-5

                    tracking-[0.16em]

                    text-[#EC1C40]

                    transition-[transform,opacity]
                    duration-[780ms]
                    delay-[820ms]

                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    ${
                      mobileVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    }

                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  `}
                >
                  More
                </p>

                <div className="space-y-1">
                  {MOBILE_MORE.map(
                    (
                      item,
                      index,
                    ) => {
                      const isActive =
                        active(
                          item.path,
                        );

                      return (
                        <Link
                          key={
                            item.path
                          }
                          href={
                            item.path
                          }
                          aria-current={current(
                            item.path,
                          )}
                          onClick={() =>
                            closeMobile(
                              false,
                            )
                          }
                          className={`
                            group

                            flex

                            min-h-[48px]

                            items-center
                            justify-between

                            gap-2

                            rounded-xl

                            border

                            px-3
                            py-2.5

                            text-[15px]
                            font-medium
                            leading-6

                            transition-[background-color,border-color,color,transform,opacity]
                            duration-[780ms]

                            ease-[cubic-bezier(0.16,1,0.3,1)]

                            ${
                              MORE_LINK_DELAYS[
                                index
                              ] || ""
                            }

                            ${
                              mobileVisible
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-4 opacity-0"
                            }

                            ${
                              isActive
                                ? `
                                    border-[#EC1C40]/20
                                    bg-[#EC1C40]/5

                                    font-semibold

                                    text-[#EC1C40]
                                  `
                                : `
                                    border-transparent

                                    text-black/75

                                    hover:border-[#EC1C40]/10
                                    hover:bg-[#EC1C40]/5
                                    hover:text-black
                                  `
                            }

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#EC1C40]
                            focus-visible:ring-offset-1
                            focus-visible:ring-offset-white

                            motion-reduce:transform-none
                            motion-reduce:transition-none
                          `}
                        >
                          <span className="min-w-0">
                            {
                              item.title
                            }
                          </span>

                          <ChevronRight
                            size={16}
                            strokeWidth={
                              1.9
                            }
                            aria-hidden="true"
                            className="
                              shrink-0

                              text-black/40

                              transition-[color,transform]
                              duration-300

                              group-hover:translate-x-0.5
                              group-hover:text-[#EC1C40]

                              motion-reduce:transform-none
                            "
                          />
                        </Link>
                      );
                    },
                  )}
                </div>
              </div>
            </nav>

            {/* ===============================================
                MOBILE ENQUIRE CTA
            ================================================ */}

            <div
              className={`
                shrink-0

                border-t
                border-black/10

                bg-white

                px-3

                pb-[max(12px,env(safe-area-inset-bottom))]
                pt-3

                transition-[transform,opacity]
                duration-[780ms]
                delay-[1050ms]

                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  mobileVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }

                motion-reduce:transform-none
                motion-reduce:transition-none
              `}
            >
              <Link
                href={
                  enquiryHref
                }
                target={
                  hasWhatsApp
                    ? "_blank"
                    : undefined
                }
                rel={
                  hasWhatsApp
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={() =>
                  closeMobile(
                    false,
                  )
                }
                className="
                  flex

                  min-h-[48px]

                  w-full

                  touch-manipulation

                  items-center
                  justify-center

                  gap-2

                  rounded-xl

                  border
                  border-[#EC1C40]

                  bg-[#EC1C40]

                  px-3
                  py-3

                  text-[14px]
                  font-semibold
                  leading-6

                  text-white

                  shadow-[0_8px_22px_-14px_rgba(236,28,64,0.60)]

                  transition-[transform,box-shadow]
                  duration-300

                  hover:-translate-y-px

                  hover:shadow-[0_12px_26px_-14px_rgba(236,28,64,0.70)]

                  active:scale-[0.985]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-white

                  motion-reduce:transform-none
                "
              >
                {hasWhatsApp && (
                  <FaWhatsapp
                    size={19}
                    aria-hidden="true"
                  />
                )}

                Enquire now
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}