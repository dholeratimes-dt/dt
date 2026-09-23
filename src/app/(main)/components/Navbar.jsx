"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/DTLOGO.png";
import { trackPageView } from "@/lib/fbpixel";

/* ============================================================
   NAVIGATION
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

/*
 * PHONE ONLY:
 * Contact Us is added to the drawer.
 *
 * Desktop More dropdown continues using MORE only.
 */
const MOBILE_MORE = [
  ...MORE,
  CONTACT,
];

/* ============================================================
   MOBILE LINK ANIMATION DELAYS
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

/* ============================================================
   MOBILE MOTION
============================================================ */

const MOBILE_MOTION_DURATION = 1000;

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar({
  whatsappNumber = "",
}) {
  const pathname =
    usePathname() || "/";

  const uid =
    useId().replace(/:/g, "");

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

  /* ============================================================
     ROUTE HELPERS
  ============================================================ */

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

  /* ============================================================
     WHATSAPP
  ============================================================ */

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

  /* ============================================================
     OPEN MOBILE
  ============================================================ */

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

  /* ============================================================
     CLOSE MOBILE
  ============================================================ */

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
          menuButtonRef.current
            ?.getClientRects()
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

  /* ============================================================
     SCROLL STATE
  ============================================================ */

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

  /* ============================================================
     CLEANUP
  ============================================================ */

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

  /* ============================================================
     ROUTE CHANGE
  ============================================================ */

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

  /* ============================================================
     BODY SCROLL LOCK
  ============================================================ */

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

  /* ============================================================
     ESCAPE KEY
  ============================================================ */

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

  /* ============================================================
     CLOSE DESKTOP DROPDOWN OUTSIDE
  ============================================================ */

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

  /* ============================================================
     DESKTOP CLEANUP
  ============================================================ */

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

  /* ============================================================
     DESKTOP MORE DROPDOWN

     IMPORTANT:
     Uses MORE, not MOBILE_MORE.
     Contact Us therefore stays separate on desktop.
  ============================================================ */

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

              text-white

              transition-colors
              duration-200

              hover:text-[#F7DCE5]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#742039]

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

                bg-[#F4D6DF]

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
                border-[#EAD9DF]

                bg-white

                p-2.5

                shadow-[0_24px_60px_-24px_rgba(57,37,46,0.34)]
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

                  text-[#8F2946]
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

                          ${
                            isActive
                              ? "bg-[#F3E7EC]"
                              : "hover:bg-[#FAF7F8]"
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

                              text-[#39252E]
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

                              text-[#68565E]
                            "
                          >
                            {
                              item.description
                            }
                          </small>
                        </span>

                        <ChevronRight
                          size={17}
                          aria-hidden="true"
                          className="
                            shrink-0
                            text-[#8F2946]
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

  /* ============================================================
     DESKTOP LINK
  ============================================================ */

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

    text-white

    transition-colors
    duration-200

    hover:text-[#F7DCE5]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-white
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#742039]

    min-[1440px]:px-4
  `;

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header
        className={`
          sticky
          top-0
          z-[80]

          w-full

          bg-gradient-to-r
          from-[#39252E]
          via-[#742039]
          to-[#8F2946]

          ${
            scrolled
              ? "shadow-[0_10px_30px_-16px_rgba(57,37,46,0.48)]"
              : "shadow-[0_6px_20px_-16px_rgba(57,37,46,0.34)]"
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

          transition-shadow
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
          {/* LOGO */}

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
              focus-visible:ring-white
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

                drop-shadow-[0_3px_8px_rgba(32,16,22,0.28)]

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

                        bg-[#F4D6DF]

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

            {renderMoreDropdown()}

            {/* CONTACT ON DESKTOP */}

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
                border-white/35

                bg-transparent

                px-5
                py-2.5

                text-[16px]
                font-semibold

                text-white

                transition-[background-color,border-color,transform]
                duration-200

                hover:-translate-y-px
                hover:border-white/60
                hover:bg-white/10

                active:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#742039]

                ${
                  active(
                    CONTACT.path,
                  )
                    ? "border-white/65 bg-white/10"
                    : ""
                }

                motion-reduce:transform-none
              `}
            >
              Contact us
            </Link>
          </nav>

          {/* MOBILE BUTTON PLACEHOLDER */}

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

      {/* =====================================================
          HAMBURGER / X
      ====================================================== */}

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
        className="
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

          text-white

          shadow-none
          outline-none

          min-[480px]:right-6
          min-[480px]:top-[16px]

          min-[1280px]:hidden

          hover:bg-transparent
          hover:text-white

          active:bg-transparent

          focus:bg-transparent
          focus:outline-none

          focus-visible:bg-transparent
          focus-visible:outline-none
        "
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
                  ? `
                      top-[11px]
                      rotate-45
                    `
                  : `
                      top-[4px]
                      rotate-0
                    `
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
                  ? `
                      -translate-x-[calc(35vw-38px)]
                    `
                  : `
                      translate-x-0
                    `
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

                        duration-[800ms]
                        delay-[5200ms]
                      `
                    : `
                        opacity-100

                        duration-[800ms]
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
                  ? `
                      top-[11px]
                      -rotate-45
                    `
                  : `
                      top-[18px]
                      rotate-0
                    `
              }
            `}
          />
        </span>
      </button>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

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
          {/* BACKDROP */}

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

              bg-[#24131A]/55

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
              MOBILE DRAWER
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
              border-white/15

              bg-gradient-to-b
              from-[#39252E]
              via-[#742039]
              to-[#8F2946]

              text-white

              shadow-[24px_0_70px_-28px_rgba(22,7,14,0.75)]

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
            {/* =================================================
                MOBILE NAVIGATION
            ================================================== */}

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
              {/* ===============================================
                  MAIN LINKS
              ================================================ */}

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
                              ? `
                                  translate-x-0
                                  opacity-100
                                `
                              : `
                                  -translate-x-4
                                  opacity-0
                                `
                          }

                          ${
                            isActive
                              ? `
                                  border-white/15

                                  bg-white/[0.12]

                                  font-semibold

                                  text-white

                                  shadow-[0_5px_18px_rgba(26,8,15,0.10)]
                                `
                              : `
                                  border-transparent

                                  text-[#FFF6F8]

                                  hover:border-white/10

                                  hover:bg-white/[0.07]
                                `
                          }

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-white
                          focus-visible:ring-offset-1
                          focus-visible:ring-offset-[#742039]

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
                          strokeWidth={1.9}
                          aria-hidden="true"
                          className={`
                            shrink-0

                            transition-[color,transform]
                            duration-300

                            ${
                              isActive
                                ? "text-white"
                                : "text-[#E9C6D1] group-hover:translate-x-0.5 group-hover:text-white"
                            }

                            motion-reduce:transform-none
                          `}
                        />
                      </Link>
                    );
                  },
                )}
              </div>

              {/* ===============================================
                  MORE

                  PHONE ONLY:
                  Contact Us is included here.
              ================================================ */}

              <div
                className="
                  mt-4

                  border-t
                  border-white/15

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

                    text-[#F1CFDA]

                    transition-[transform,opacity]

                    duration-[780ms]

                    delay-[820ms]

                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    ${
                      mobileVisible
                        ? `
                            translate-x-0
                            opacity-100
                          `
                        : `
                            -translate-x-4
                            opacity-0
                          `
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
                                ? `
                                    translate-x-0
                                    opacity-100
                                  `
                                : `
                                    -translate-x-4
                                    opacity-0
                                  `
                            }

                            ${
                              isActive
                                ? `
                                    border-white/15

                                    bg-white/[0.12]

                                    font-semibold

                                    text-white
                                  `
                                : `
                                    border-transparent

                                    text-[#FFF6F8]

                                    hover:border-white/10

                                    hover:bg-white/[0.07]
                                  `
                            }

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-offset-1
                            focus-visible:ring-offset-[#742039]

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
                            strokeWidth={1.9}
                            aria-hidden="true"
                            className="
                              shrink-0

                              text-[#E9C6D1]

                              transition-transform
                              duration-300

                              group-hover:translate-x-0.5

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

            {/* =================================================
                CTA
            ================================================== */}

            <div
              className={`
                shrink-0

                border-t
                border-white/15

                bg-[#4B1B2A]/35

                px-3

                pb-[max(12px,env(safe-area-inset-bottom))]
                pt-3

                backdrop-blur-sm

                transition-[transform,opacity]

                duration-[780ms]

                delay-[1050ms]

                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  mobileVisible
                    ? `
                        translate-y-0
                        opacity-100
                      `
                    : `
                        translate-y-3
                        opacity-0
                      `
                }

                motion-reduce:transform-none
                motion-reduce:transition-none
              `}
            >
              <Link
                href={enquiryHref}
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
                  border-white/25

                  bg-white/[0.10]

                  px-3
                  py-3

                  text-[14px]
                  font-semibold
                  leading-6

                  text-white

                  shadow-[0_8px_22px_rgba(27,8,15,0.15)]

                  backdrop-blur-sm

                  transition-[background-color,border-color,transform]
                  duration-300

                  hover:border-white/40
                  hover:bg-white/[0.15]

                  active:scale-[0.985]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#742039]

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