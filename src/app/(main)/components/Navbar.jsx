"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

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
    description:
      "Get to know Dholera Times",
  },
  {
    title: "NRI Guide",
    path: "/nri-investment-guide-dholera",
    description:
      "Information for overseas buyers",
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

const MOBILE_MOTION_DURATION =
  1000;

/* ============================================================
   COLOR HELPERS
============================================================ */

function parseCssColor(
  color,
) {
  if (
    !color ||
    color === "transparent"
  ) {
    return null;
  }

  const match =
    color.match(
      /rgba?\(([^)]+)\)/i,
    );

  if (!match) {
    return null;
  }

  const values =
    match[1]
      .replace(/\//g, " ")
      .replace(/,/g, " ")
      .trim()
      .split(/\s+/)
      .map(Number);

  if (
    values.length < 3 ||
    values
      .slice(0, 3)
      .some((value) =>
        Number.isNaN(value),
      )
  ) {
    return null;
  }

  return {
    r: values[0],
    g: values[1],
    b: values[2],

    a:
      Number.isFinite(
        values[3],
      )
        ? values[3]
        : 1,
  };
}

function getLuminance({
  r,
  g,
  b,
}) {
  return (
    r * 0.299 +
    g * 0.587 +
    b * 0.114
  );
}

/* ============================================================
   RESOLVE PAGE BACKGROUND THEME

   Optional manual override:

   data-navbar-theme="dark"
   data-navbar-theme="light"
============================================================ */

function resolveElementTheme(
  element,
) {
  if (
    !element ||
    typeof window ===
      "undefined"
  ) {
    return null;
  }

  let current =
    element;

  while (
    current &&
    current !==
      document.documentElement
  ) {
    /* ======================================================
       MANUAL OVERRIDE
    ======================================================= */

    const manualTheme =
      current.getAttribute?.(
        "data-navbar-theme",
      );

    if (
      manualTheme ===
        "dark" ||
      manualTheme ===
        "light"
    ) {
      return manualTheme;
    }

    const style =
      window.getComputedStyle(
        current,
      );

    /* ======================================================
       SOLID / TRANSPARENT BACKGROUND
    ======================================================= */

    const backgroundColor =
      parseCssColor(
        style.backgroundColor,
      );

    if (
      backgroundColor &&
      backgroundColor.a >=
        0.18
    ) {
      const luminance =
        getLuminance(
          backgroundColor,
        );

      /*
       * Black / dark backgrounds
       * and dark overlays.
       */

      if (
        luminance <= 145
      ) {
        return "dark";
      }

      /*
       * White / light backgrounds.
       */

      if (
        backgroundColor.a >=
          0.7 &&
        luminance >= 180
      ) {
        return "light";
      }
    }

    /* ======================================================
       GRADIENT BACKGROUND
    ======================================================= */

    const backgroundImage =
      style.backgroundImage;

    if (
      backgroundImage &&
      backgroundImage !==
        "none"
    ) {
      const colors =
        backgroundImage.match(
          /rgba?\([^)]+\)/gi,
        );

      if (
        colors &&
        colors.length
      ) {
        const parsedColors =
          colors
            .map(
              parseCssColor,
            )
            .filter(
              (color) =>
                color &&
                color.a >=
                  0.15,
            );

        if (
          parsedColors.length
        ) {
          const averageLuminance =
            parsedColors.reduce(
              (
                total,
                item,
              ) =>
                total +
                getLuminance(
                  item,
                ),
              0,
            ) /
            parsedColors.length;

          if (
            averageLuminance <=
            145
          ) {
            return "dark";
          }

          if (
            averageLuminance >=
            185
          ) {
            return "light";
          }
        }
      }
    }

    current =
      current.parentElement;
  }

  return null;
}

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar({
  whatsappNumber = "",
}) {
  const pathname =
    usePathname() || "/";

  const uid =
    useId().replace(
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

  /* ==========================================================
     NAVBAR COLOR

     IMPORTANT:
     Initial value is LIGHT.
     This means black navigation text.
  ========================================================== */

  const [
    navbarTheme,
    setNavbarTheme,
  ] = useState("light");

  const closeTimerRef =
    useRef(null);

  const frameRef =
    useRef(null);

  const themeFrameRef =
    useRef(null);

  const navbarThemeRef =
    useRef("light");

  const headerRef =
    useRef(null);

  const navRef =
    useRef(null);

  const menuButtonRef =
    useRef(null);

  const lastTrackedPath =
    useRef(null);

  const isHome =
    pathname === "/";

  const isDarkNavbar =
    navbarTheme ===
    "dark";

  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

  const active = (
    path,
  ) => {
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

  const current = (
    path,
  ) =>
    pathname === path
      ? "page"
      : undefined;

  /* ==========================================================
     WHATSAPP
  ========================================================== */

  const number =
    String(
      whatsappNumber,
    ).replace(
      /[^0-9]/g,
      "",
    );

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

  /* ==========================================================
     RESET NAVBAR COLOR ON EVERY PAGE CHANGE

     This is the important part.

     Whenever the user navigates to another page:
     - navbar becomes LIGHT theme
     - text becomes BLACK
     - background detection does NOT happen automatically
     - detection starts only after scrolling
  ========================================================== */

  useEffect(() => {
    navbarThemeRef.current =
      "light";

    setNavbarTheme(
      "light",
    );

    setScrolled(false);
  }, [pathname]);

  /* ==========================================================
     SCROLL + BACKGROUND DETECTION
  ========================================================== */

  useEffect(() => {
    let mounted = true;

    /* ======================================================
       DETECT CURRENT SECTION UNDER NAVBAR
    ======================================================= */

    const detectNavbarTheme =
      () => {
        themeFrameRef.current =
          null;

        if (
          !mounted ||
          !headerRef.current
        ) {
          return;
        }

        /*
         * IMPORTANT:
         *
         * Detection must NEVER run
         * while the page is still at
         * the initial top position.
         */

        if (
          window.scrollY <= 8
        ) {
          navbarThemeRef.current =
            "light";

          setNavbarTheme(
            "light",
          );

          return;
        }

        const headerRect =
          headerRef.current.getBoundingClientRect();

        if (
          headerRect.height <= 0
        ) {
          return;
        }

        /*
         * Sample:
         * 1. Behind middle of navbar.
         * 2. Just underneath navbar.
         */

        const sampleYs = [
          Math.max(
            1,
            Math.min(
              window.innerHeight -
                1,
              headerRect.top +
                headerRect.height *
                  0.55,
            ),
          ),

          Math.max(
            1,
            Math.min(
              window.innerHeight -
                1,
              headerRect.bottom +
                2,
            ),
          ),
        ];

        /*
         * Multiple horizontal points improve
         * detection over image banners.
         */

        const sampleXs = [
          0.18,
          0.38,
          0.62,
          0.82,
        ];

        let darkVotes = 0;
        let lightVotes = 0;

        sampleYs.forEach(
          (sampleY) => {
            sampleXs.forEach(
              (position) => {
                const sampleX =
                  Math.max(
                    1,
                    Math.min(
                      window.innerWidth -
                        1,

                      window.innerWidth *
                        position,
                    ),
                  );

                const elements =
                  document.elementsFromPoint(
                    sampleX,
                    sampleY,
                  );

                for (
                  const element of
                  elements
                ) {
                  /*
                   * Ignore navbar itself.
                   */

                  if (
                    headerRef.current?.contains(
                      element,
                    )
                  ) {
                    continue;
                  }

                  /*
                   * Ignore mobile menu UI.
                   */

                  if (
                    element.closest?.(
                      "[data-navbar-ui='true']",
                    )
                  ) {
                    continue;
                  }

                  const theme =
                    resolveElementTheme(
                      element,
                    );

                  if (
                    theme ===
                    "dark"
                  ) {
                    darkVotes +=
                      1;

                    break;
                  }

                  if (
                    theme ===
                    "light"
                  ) {
                    lightVotes +=
                      1;

                    break;
                  }
                }
              },
            );
          },
        );

        /*
         * Nothing useful found.
         * Keep current theme.
         */

        if (
          darkVotes === 0 &&
          lightVotes === 0
        ) {
          return;
        }

        const nextTheme =
          darkVotes >
          lightVotes
            ? "dark"
            : "light";

        if (
          navbarThemeRef.current !==
          nextTheme
        ) {
          navbarThemeRef.current =
            nextTheme;

          setNavbarTheme(
            nextTheme,
          );
        }
      };

    /* ======================================================
       RAF THROTTLE
    ======================================================= */

    const scheduleThemeDetection =
      () => {
        if (
          themeFrameRef.current
        ) {
          return;
        }

        themeFrameRef.current =
          requestAnimationFrame(
            detectNavbarTheme,
          );
      };

    /* ======================================================
       SCROLL HANDLER
    ======================================================= */

    const handleScroll = () => {
      const scrollY =
        window.scrollY;

      setScrolled(
        scrollY > 24,
      );

      /* ==================================================
         USER IS AT TOP

         ALWAYS BLACK TEXT.
      =================================================== */

      if (
        scrollY <= 8
      ) {
        if (
          navbarThemeRef.current !==
          "light"
        ) {
          navbarThemeRef.current =
            "light";

          setNavbarTheme(
            "light",
          );
        }

        return;
      }

      /* ==================================================
         USER HAS SCROLLED

         NOW dark/light detection is allowed.
      =================================================== */

      scheduleThemeDetection();
    };

    const handleResize = () => {
      /*
       * Resize should only detect background
       * when user is already scrolled.
       */

      if (
        window.scrollY > 8
      ) {
        scheduleThemeDetection();
      }
    };

    /*
     * IMPORTANT:
     *
     * No initial detectNavbarTheme().
     * No initial timeout.
     * No automatic detection on page load.
     *
     * Navbar therefore remains black when stable.
     */

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      },
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      if (
        themeFrameRef.current
      ) {
        cancelAnimationFrame(
          themeFrameRef.current,
        );
      }
    };
  }, [pathname]);

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

      if (
        themeFrameRef.current
      ) {
        cancelAnimationFrame(
          themeFrameRef.current,
        );
      }
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

    /*
     * IMPORTANT:
     * Reset navbar to black on page navigation.
     */

    navbarThemeRef.current =
      "light";

    setNavbarTheme(
      "light",
    );

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
      if (
        !alreadyLocked
      ) {
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
        event.key ===
        "Escape"
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
        setDropdown(
          null,
        );
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

    const handleChange =
      () => {
        setDropdown(null);

        if (
          desktop.matches
        ) {
          clearTimeout(
            closeTimerRef.current,
          );

          cancelAnimationFrame(
            frameRef.current,
          );

          setMobileVisible(
            false,
          );

          setMobileOpen(
            false,
          );
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
     DESKTOP LINK STYLE
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

    transition-colors
    duration-300

    hover:text-[#EC1C40]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#EC1C40]
    focus-visible:ring-offset-2

    min-[1440px]:px-4

    ${
      isDarkNavbar
        ? `
            text-white
            focus-visible:ring-offset-black
          `
        : `
            text-black
            focus-visible:ring-offset-white
          `
    }
  `;

  /* ==========================================================
     MORE DROPDOWN
  ========================================================== */

  const renderMoreDropdown =
    () => {
      const expanded =
        dropdown ===
        "more";

      const containsActive =
        MORE.some(
          (item) =>
            active(
              item.path,
            ),
        );

      return (
        <div
          className="relative"
          onMouseEnter={() =>
            setDropdown(
              "more",
            )
          }
          onMouseLeave={() =>
            setDropdown(
              null,
            )
          }
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget,
              )
            ) {
              setDropdown(
                null,
              );
            }
          }}
          onKeyDown={(event) => {
            if (
              event.key ===
                "Escape" &&
              expanded
            ) {
              setDropdown(
                null,
              );

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
            className={`
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

              transition-colors
              duration-300

              hover:text-[#EC1C40]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]
              focus-visible:ring-offset-2

              min-[1440px]:px-4

              ${
                isDarkNavbar
                  ? `
                      text-white
                      focus-visible:ring-offset-black
                    `
                  : `
                      text-black
                      focus-visible:ring-offset-white
                    `
              }
            `}
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
            hidden={
              !expanded
            }
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

              <div
                className="
                  space-y-1
                "
              >
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
                        <span
                          className="
                            min-w-0
                          "
                        >
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

  /* ============================================================
     RETURN
  ============================================================ */

  return (
    <>
      {/* =======================================================
          TOP NAVBAR
      ======================================================== */}

      <header
        ref={headerRef}
        data-navbar-ui="true"
        className={`
          sticky
          top-0
          z-[80]

          w-full

          bg-transparent

          backdrop-blur-md
          backdrop-saturate-150

          border-b

          ${
            isDarkNavbar
              ? "border-white/10"
              : "border-black/10"
          }

          ${
            scrolled
              ? isDarkNavbar
                ? "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.65)]"
                : "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.24)]"
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
          {/* LOGO */}

          <Link
            href="/"
            aria-label="Dholera Times home"
            className={`
              inline-flex
              shrink-0

              items-center

              rounded-md

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]
              focus-visible:ring-offset-2

              ${
                isDarkNavbar
                  ? "focus-visible:ring-offset-black"
                  : "focus-visible:ring-offset-white"
              }
            `}
          >
            <Image
              src={logo}
              alt="Dholera Times"
              width={150}
              height={150}
              priority
              className={`
                h-[50px]
                w-auto

                object-contain

                min-[480px]:h-[52px]

                min-[1280px]:h-[54px]

                ${
                  isDarkNavbar
                    ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                    : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.10)]"
                }
              `}
            />
          </Link>

          {/* DESKTOP NAVIGATION */}

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

            {renderMoreDropdown()}

            {/* CONTACT */}

            <Link
              href={
                CONTACT.path
              }
              aria-current={current(
                CONTACT.path,
              )}
              onClick={() =>
                setDropdown(
                  null,
                )
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
                duration-300

                active:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                ${
                  active(
                    CONTACT.path,
                  )
                    ? `
                        border-[#EC1C40]
                        bg-[#EC1C40]
                        text-white
                      `
                    : isDarkNavbar
                      ? `
                          border-white/70

                          bg-transparent

                          text-white

                          hover:-translate-y-px

                          hover:border-[#EC1C40]
                          hover:bg-[#EC1C40]
                          hover:text-white

                          hover:shadow-[0_8px_22px_-14px_rgba(236,28,64,0.60)]
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

                ${
                  isDarkNavbar
                    ? "focus-visible:ring-offset-black"
                    : "focus-visible:ring-offset-white"
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
        ref={
          menuButtonRef
        }
        data-navbar-ui="true"
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
        onClick={
          toggleMobile
        }
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
          duration-300

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
              : isDarkNavbar
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
          {/* TOP */}

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

          {/* MIDDLE */}

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

          {/* BOTTOM */}

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
          data-navbar-ui="true"
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
          {/* OVERLAY */}

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

          {/* DRAWER */}

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
            {/* MOBILE LINKS */}

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
              {/* MAIN */}

              <div
                className="
                  space-y-1
                "
              >
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
                        <span
                          className="
                            min-w-0
                          "
                        >
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

              {/* MORE */}

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

                <div
                  className="
                    space-y-1
                  "
                >
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
                          <span
                            className="
                              min-w-0
                            "
                          >
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
              </div>
            </nav>

            {/* MOBILE CTA */}

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