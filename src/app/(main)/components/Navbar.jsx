// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { trackPageView } from "@/lib/fbpixel";
// import logo from "@/assets/dt.webp";
// import logo2 from "@/assets/dtlogobg.png";
// import call from "@/assets/call.svg";

// const DESKTOP_OVERFLOW = [
//   { title: "Gallery", path: "/gallery/dholera-sir-progress" },
//   { title: "About Us", path: "/about" },
//   { title: "NRI Guide", path: "/nri-investment-guide-dholera" },
//   { title: "Channel Partner", path: "/channel-partner" },
// ];

// const MAIN_LINKS = [
//   { title: "Dholera SIR", path: "/dholera-sir" },
//   { title: "Dholera Blogs", path: "/dholera-updates/blogs" },
//   { title: "Dholera News", path: "/dholera-updates/latest-updates" },
//   { title: "Bulk Land", path: "/bulk-land" },
//   { title: "Contact Us", path: "/contact/inquiry" },
// ];

// const MOBILE_LINKS = [
//   { title: "About Dholera SIR", path: "/dholera-sir" },
//   { title: "Dholera Blogs", path: "/dholera-updates/blogs" },
//   { title: "Dholera News", path: "/dholera-updates/latest-updates" },
//   { title: "Bulk Land Deals", path: "/bulk-land" },
//   { title: "Gallery", path: "/gallery/dholera-sir-progress" },
//   { title: "About Us", path: "/about" },
//   { title: "Contact Us", path: "/contact/inquiry" },
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
//   const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

//   const desktopMenuRef = useRef(null);
//   const menuOpenRef = useRef(null);
//   const closeTimerRef = useRef(null);

//   const pathname = usePathname();

//   useEffect(() => {
//     trackPageView();
//   }, [pathname]);

//   const isActivePath = (path) => pathname === path || pathname.startsWith(`${path}/`);

//   const desktopLinkClass = (path) =>
//     `px-4 py-2 rounded-lg transition-all duration-300 ${
//       isActivePath(path)
//         ? "bg-[#debe6b] text-black"
//         : "text-white hover:bg-white/10"
//     }`;

//   const mobileLinkClass = (path) =>
//     `flex items-center text-lg py-4 px-4 rounded-xl transition-all duration-300 ${
//       isActivePath(path)
//         ? "bg-[#debe6b] text-black"
//         : "text-white hover:bg-white/10"
//     }`;

//   const handleCallClick = () => {
//     window.dataLayer = window.dataLayer || [];
//     window.dataLayer.push({
//       event: "call_click_organic",
//       lead_type: "call",
//       device: window.innerWidth <= 768 ? "mobile" : "desktop",
//     });
//     window.location.href = "tel:+919958993549";
//   };

//   const openMenu = () => {
//     if (closeTimerRef.current) {
//       clearTimeout(closeTimerRef.current);
//     }

//     setIsMobileMenuVisible(true);
//     setIsMenuOpen(true);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);

//     if (closeTimerRef.current) {
//       clearTimeout(closeTimerRef.current);
//     }

//     closeTimerRef.current = setTimeout(() => {
//       setIsMobileMenuVisible(false);
//     }, 280);
//   };

//   const toggleMenu = () => {
//     if (isMobileMenuVisible && isMenuOpen) {
//       closeMenu();
//       return;
//     }

//     openMenu();
//   };

//   useEffect(() => {
//     function handler(e) {
//       if (desktopMenuRef.current && !desktopMenuRef.current.contains(e.target)) {
//         setIsDesktopMenuOpen(false);
//       }

//       if (menuOpenRef.current && !menuOpenRef.current.contains(e.target)) {
//         closeMenu();
//       }
//     }

//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (closeTimerRef.current) {
//         clearTimeout(closeTimerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <nav className="fixed z-40 w-full max-sm:pt-2 max-sm:pb-2 pt-4 pb-4 bg-[#151f28] shadow-[0_0.5rem_1.75rem_rgba(0,0,0,0.16)]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-14 max-sm:h-16 items-center">
//           <div className="flex-shrink-0">
//             <Link href="/">
//               <Image
//                 src={logo}
//                 alt="Dholera Times Logo"
//                 width={150}
//                 height={150}
//                 className="h-16 w-auto max-sm:h-16"
//               />
//             </Link>
//           </div>

//           <div className="hidden lg:flex items-center space-x-1">
//             <div className="flex items-baseline space-x-1">

//               {MAIN_LINKS.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   className={desktopLinkClass(item.path)}
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </div>

//             <div className="relative ml-4" ref={desktopMenuRef}>
//               <button
//                 type="button"
//                 aria-label="Open more navigation links"
//                 aria-expanded={isDesktopMenuOpen}
//                 onClick={() => setIsDesktopMenuOpen((p) => !p)}
//                 className={`text-white p-2 rounded-lg transition-all duration-300 ${
//                   isDesktopMenuOpen ? "bg-white/15" : "hover:bg-white/10"
//                 }`}
//               >
//                 <Menu className="h-6 w-6" />
//               </button>

//               {isDesktopMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white shadow-xl rounded-xl z-50 border border-gray-100 overflow-hidden animate-[dropdownIn_180ms_ease-out]">
//                   {DESKTOP_OVERFLOW.map((item) => (
//                     <Link
//                       key={item.path}
//                       href={item.path}
//                       className={`block px-4 py-3 transition-colors duration-150 ${
//                         isActivePath(item.path)
//                           ? "bg-[#deae3c] text-black"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => setIsDesktopMenuOpen(false)}
//                     >
//                       {item.title}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="lg:hidden flex items-center gap-4">
//             <div
//               onClick={handleCallClick}
//               className="relative text-[#d8b66d] mt-3 flex items-center space-x-2 cursor-pointer transition-transform duration-300 hover:scale-[1.04] active:scale-95"
//             >
//               <span className="relative z-10 inline-flex h-[1.875rem] w-[1.875rem] items-center justify-center animate-[callNowFloat_2.5s_ease-in-out_infinite]">
//                 <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8b66d]/70 animate-[callNowPulse_1.9s_ease-out_infinite]" />
//                 <Image
//                   src={call}
//                   alt="call"
//                   height={30}
//                   width={30}
//                   className="animate-image-tint"
//                 />
//               </span>
//               <p className="animate-color-change">Call Now</p>
//             </div>
//             <button
//               type="button"
//               aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
//               aria-expanded={isMenuOpen}
//               onClick={toggleMenu}
//               className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-white" />
//               ) : (
//                 <Menu className="h-6 w-6 text-white" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isMobileMenuVisible && (
//         <div
//           ref={menuOpenRef}
//           className={`lg:hidden bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-md fixed top-0 left-0 w-full h-screen z-50 p-6 overflow-y-auto ${
//             isMenuOpen
//               ? "animate-[mobileMenuIn_360ms_ease-out]"
//               : "animate-[mobileMenuOut_280ms_ease-in_forwards]"
//           }`}
//         >
//           <div className="flex justify-between items-center mb-8">
//             <Link href="/" onClick={closeMenu}>
//               <Image
//                 src={logo2}
//                 alt="Dholera Times Logo"
//                 width={120}
//                 height={120}
//               />
//             </Link>
//             <button
//               type="button"
//               aria-label="Close navigation menu"
//               onClick={closeMenu}
//               className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
//             >
//               <X className="h-8 w-8 text-white" />
//             </button>
//           </div>

//           <div className="space-y-2">
//             {MOBILE_LINKS.map((item, index) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`${mobileLinkClass(item.path)} animate-[mobileMenuItemIn_320ms_ease-out_both]`}
//                 style={{ animationDelay: `${index * 45}ms` }}
//                 onClick={closeMenu}
//               >
//                 <span className="ml-2">{item.title}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes callNowFloat {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-0.25rem);
//           }
//         }

//         @keyframes callNowPulse {
//           0% {
//             opacity: 0.75;
//             transform: translate(-50%, -50%) scale(0.88);
//           }
//           100% {
//             opacity: 0;
//             transform: translate(-50%, -50%) scale(1.5);
//           }
//         }

//         @keyframes dropdownIn {
//           from {
//             opacity: 0;
//             transform: translateY(-0.375rem) scale(0.98);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @keyframes mobileMenuIn {
//           from {
//             opacity: 0;
//             transform: translateY(-0.75rem);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes mobileMenuOut {
//           from {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           to {
//             opacity: 0;
//             transform: translateY(-0.75rem);
//           }
//         }

//         @keyframes mobileMenuItemIn {
//           from {
//             opacity: 0;
//             transform: translateX(-0.5rem);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </nav>
//   );
// }

"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/dt.webp";
import { trackPageView } from "@/lib/fbpixel";

/* =========================================================
   NAVIGATION DATA
========================================================= */

const PRIMARY = [
  {
    title: "Dholera SIR",
    path: "/dholera-sir",
  },
  {
    title: "Residential Projects",
    path: "/dholera-residential-plots",
  },
  {
    title: "Bulk Land",
    path: "/bulk-land",
  },
];

const UPDATES = [
  {
    title: "Dholera News",
    path: "/dholera-updates/latest-updates",
    description: "Infrastructure and development updates",
  },
  {
    title: "Blogs & Insights",
    path: "/dholera-updates/blogs",
    description: "Explore Dholera in more detail",
  },
  {
    title: "Photo Gallery",
    path: "/gallery/dholera-sir-progress",
    description: "See development on the ground",
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
  {
    title: "Channel Partner",
    path: "/channel-partner",
    description: "Explore opportunities to work with us",
  },
];

const CONTACT = {
  title: "Contact Us",
  path: "/contact/inquiry",
};

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const pathname = usePathname() || "/";
  const uid = useId().replace(/:/g, "");

  const [dropdown, setDropdown] = useState(null);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeTimerRef = useRef(null);
  const lastTrackedPath = useRef(null);

  /* =======================================================
     ROUTE HELPERS
  ======================================================= */

  const active = (path) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const current = (path) => (pathname === path ? "page" : undefined);

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const openMobile = () => {
    setDropdown(null);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setMobileMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileOpen(true);
        closeButtonRef.current?.focus();
      });
    });
  };

  const closeMobile = () => {
    setMobileOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setMobileMounted(false);

      if (menuButtonRef.current?.getClientRects().length) {
        menuButtonRef.current.focus();
      }
    }, 320);
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  /* =======================================================
     PAGE TRACKING + ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setDropdown(null);
    setMobileOpen(false);
    setMobileMounted(false);

    if (lastTrackedPath.current !== pathname) {
      lastTrackedPath.current = pathname;

      try {
        trackPageView();
      } catch (error) {
        console.warn("Navbar page-view tracking failed", error);
      }
    }
  }, [pathname]);

  /* =======================================================
     LOCK BODY SCROLL
  ======================================================= */

  useEffect(() => {
    if (!mobileMounted) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [mobileMounted]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    if (!mobileMounted) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMobile();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMounted]);

  /* =======================================================
     DESKTOP OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    if (!dropdown) return;

    const handleOutside = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setDropdown(null);
      }
    };

    document.addEventListener("pointerdown", handleOutside);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [dropdown]);

  /* =======================================================
     DESKTOP BREAKPOINT
  ======================================================= */

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");

    const handleBreakpoint = () => {
      if (desktop.matches) {
        setDropdown(null);
        setMobileOpen(false);
        setMobileMounted(false);
      }
    };

    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, []);

  /* =======================================================
     DESKTOP DROPDOWN
  ======================================================= */

  const renderDropdown = (key, title, items) => {
    const expanded = dropdown === key;
    const dropdownActive = items.some((item) => active(item.path));

    return (
      <div
        className="relative"
        onKeyDown={(event) => {
          if (event.key === "Escape" && expanded) {
            event.preventDefault();
            setDropdown(null);
          }
        }}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${uid}-${key}`}
          onClick={() => setDropdown(expanded ? null : key)}
          className={`
            relative
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            rounded-lg
            px-3
            text-[17px]
            font-medium
            leading-[26px]
            transition-colors
            duration-200
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white
            ${
              dropdownActive
                ? "text-[#D6B873]"
                : "text-[#D1D5DB] hover:bg-white/[0.06] hover:text-white"
            }
          `}
        >
          <span>{title}</span>

          <ChevronDown
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
            className={`
              shrink-0
              transition-transform
              duration-200
              ${expanded ? "rotate-180" : ""}
            `}
          />

          {dropdownActive && (
            <span
              aria-hidden="true"
              className="
                absolute
                bottom-[2px]
                left-3
                right-3
                h-[2px]
                rounded-full
                bg-[#B69B5E]
              "
            />
          )}
        </button>

        {expanded && (
          <div
            id={`${uid}-${key}`}
            className="
              absolute
              right-0
              top-full
              z-[70]
              mt-3
              w-[340px]
              overflow-hidden
              rounded-lg
              border
              border-[#E5E7EB]
              bg-white
              p-3
              text-[#151F28]
              shadow-[0_18px_48px_rgba(21,31,40,0.16)]
            "
          >
            <p
              className="
                px-3
                pb-3
                pt-2
                text-xs
                font-semibold
                uppercase
                leading-[18px]
                tracking-[1px]
                text-[#63717A]
              "
            >
              {key === "updates"
                ? "Explore the latest"
                : "Get to know us"}
            </p>

            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={current(item.path)}
                onClick={() => setDropdown(null)}
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  px-3
                  py-3
                  transition-colors
                  duration-200
                  ${
                    active(item.path)
                      ? "bg-[#B69B5E]/15"
                      : "hover:bg-[#F9FAFB]"
                  }
                `}
              >
                <span className="min-w-0">
                  <strong
                    className="
                      block
                      text-base
                      font-medium
                      leading-6
                      text-[#151F28]
                    "
                  >
                    {item.title}
                  </strong>

                  <small
                    className="
                      mt-1
                      block
                      text-sm
                      font-normal
                      leading-[22px]
                      text-[#63717A]
                    "
                  >
                    {item.description}
                  </small>
                </span>

                <ChevronRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="
                    shrink-0
                    text-[#63717A]
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          m-0
          w-full
          border-b
          border-white/10
          bg-[#15232C]
          p-0
        "
      >
        <div
          className="
            flex
            h-[72px]
            w-full
            items-center
            gap-4
            px-4
            min-[414px]:px-6
            min-[1200px]:h-[76px]
            min-[1200px]:gap-5
            min-[1200px]:px-8
            min-[1440px]:px-10
            min-[1600px]:px-12
          "
        >
          {/* Logo */}

          <Link
            href="/"
            aria-label="Dholera Times home"
            className="
              inline-flex
              shrink-0
              items-center
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-white
            "
          >
            <Image
              src={logo}
              alt="Dholera Times"
              width={150}
              height={150}
              priority
              className="
                block
                h-[52px]
                w-auto
                object-contain
                min-[1200px]:h-[54px]
              "
            />
          </Link>

          {/* Desktop Navigation */}

          <nav
            ref={navRef}
            aria-label="Main navigation"
            className="
              ml-auto
              hidden
              items-center
              justify-end
              gap-1
              min-[1200px]:flex
            "
          >
            {PRIMARY.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={current(item.path)}
                onClick={() => setDropdown(null)}
                className={`
                  relative
                  inline-flex
                  h-11
                  items-center
                  whitespace-nowrap
                  rounded-lg
                  px-3
                  text-[17px]
                  font-medium
                  leading-[26px]
                  transition-colors
                  duration-200
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-white
                  ${
                    active(item.path)
                      ? "text-[#D6B873]"
                      : "text-[#D1D5DB] hover:bg-white/[0.06] hover:text-white"
                  }
                `}
              >
                {item.title}

                {active(item.path) && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-[2px]
                      left-3
                      right-3
                      h-[2px]
                      rounded-full
                      bg-[#B69B5E]
                    "
                  />
                )}
              </Link>
            ))}

            {renderDropdown("updates", "Updates", UPDATES)}
            {renderDropdown("more", "More", MORE)}

            <Link
              href={CONTACT.path}
              aria-current={current(CONTACT.path)}
              onClick={() => setDropdown(null)}
              className={`
                relative
                inline-flex
                h-11
                items-center
                whitespace-nowrap
                rounded-lg
                px-3
                text-[17px]
                font-medium
                leading-[26px]
                transition-colors
                duration-200
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
                ${
                  active(CONTACT.path)
                    ? "text-[#D6B873]"
                    : "text-[#D1D5DB] hover:bg-white/[0.06] hover:text-white"
                }
              `}
            >
              Contact Us

              {active(CONTACT.path) && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-[2px]
                    left-3
                    right-3
                    h-[2px]
                    rounded-full
                    bg-[#B69B5E]
                  "
                />
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}

          <div className="ml-auto flex items-center min-[1200px]:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls={`${uid}-mobile`}
              onClick={openMobile}
              className="
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-lg
                border
                border-white/[0.18]
                bg-transparent
                text-white
                transition
                duration-200
                hover:border-white/30
                hover:bg-white/[0.06]
                active:scale-95
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              <Menu size={26} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {mobileMounted && (
        <div
          id={`${uid}-mobile`}
          className="
            fixed
            inset-0
            z-[100]
            min-[1200px]:hidden
          "
        >
          {/* Backdrop */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobile}
            className={`
              absolute
              inset-0
              h-full
              w-full
              cursor-default
              bg-[#151F28]/60
              backdrop-blur-[2px]
              transition-opacity
              duration-300
              ${mobileOpen ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* Top Sheet */}

          <div
            className={`
              absolute
              inset-x-0
              top-0
              flex
              h-[70vh]
              h-[70dvh]
              flex-col
              overflow-hidden
              rounded-b-xl
              bg-[#15232C]
              text-white
              shadow-[0_20px_60px_rgba(21,31,40,0.28)]
              transition-[transform,opacity]
              duration-[380ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              ${
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0"
              }
            `}
          >
            {/* Mobile Header */}

            <div
              className="
                flex
                h-[72px]
                shrink-0
                items-center
                justify-between
                border-b
                border-white/10
                px-4
                min-[414px]:px-6
              "
            >
              <Link
                href="/"
                onClick={closeMobile}
                aria-label="Dholera Times home"
                className="inline-flex items-center"
              >
                <Image
                  src={logo}
                  alt="Dholera Times"
                  width={150}
                  height={150}
                  className="block h-[52px] w-auto object-contain"
                />
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobile}
                className="
                  grid
                  h-12
                  w-12
                  place-items-center
                  rounded-lg
                  border
                  border-white/[0.16]
                  bg-transparent
                  text-white
                  transition
                  duration-200
                  hover:border-white/30
                  hover:bg-white/[0.06]
                  active:scale-95
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-white
                "
              >
                <X size={26} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Navigation */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overscroll-contain
                px-4
                py-6
                min-[414px]:px-6
              "
            >
              <p
                className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  leading-[18px]
                  tracking-[1px]
                  text-[#D6B873]
                "
              >
                Explore Dholera
              </p>

              <nav aria-label="Mobile navigation">
                {/* Primary */}

                <div>
                  {PRIMARY.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-current={current(item.path)}
                      onClick={closeMobile}
                      className={`
                        group
                        flex
                        min-h-12
                        items-center
                        justify-between
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-base
                        font-medium
                        leading-6
                        transition
                        duration-200
                        ${
                          active(item.path)
                            ? "bg-[#B69B5E]/15 text-[#D6B873]"
                            : "text-white hover:bg-white/[0.06]"
                        }
                      `}
                    >
                      <span>{item.title}</span>

                      <ChevronRight
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="
                          shrink-0
                          text-[#D1D5DB]
                          transition-transform
                          duration-200
                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>
                  ))}
                </div>

                {/* News & Resources */}

                <div
                  className="
                    mt-4
                    border-t
                    border-white/[0.12]
                    pt-4
                  "
                >
                  <p
                    className="
                      mb-2
                      px-3
                      text-xs
                      font-semibold
                      uppercase
                      leading-[18px]
                      tracking-[1px]
                      text-[#D1D5DB]
                    "
                  >
                    News & resources
                  </p>

                  {UPDATES.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-current={current(item.path)}
                      onClick={closeMobile}
                      className={`
                        group
                        flex
                        min-h-12
                        items-center
                        justify-between
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-base
                        font-medium
                        leading-6
                        transition
                        duration-200
                        ${
                          active(item.path)
                            ? "bg-[#B69B5E]/15 text-[#D6B873]"
                            : "text-white hover:bg-white/[0.06]"
                        }
                      `}
                    >
                      <span>{item.title}</span>

                      <ChevronRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="
                          shrink-0
                          text-[#D1D5DB]
                          transition-transform
                          duration-200
                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>
                  ))}
                </div>

                {/* Company */}

                <div
                  className="
                    mt-4
                    border-t
                    border-white/[0.12]
                    pt-4
                  "
                >
                  <p
                    className="
                      mb-2
                      px-3
                      text-xs
                      font-semibold
                      uppercase
                      leading-[18px]
                      tracking-[1px]
                      text-[#D1D5DB]
                    "
                  >
                    Dholera Times
                  </p>

                  {[...MORE, CONTACT].map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-current={current(item.path)}
                      onClick={closeMobile}
                      className={`
                        group
                        flex
                        min-h-12
                        items-center
                        justify-between
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-base
                        font-medium
                        leading-6
                        transition
                        duration-200
                        ${
                          active(item.path)
                            ? "bg-[#B69B5E]/15 text-[#D6B873]"
                            : "text-white hover:bg-white/[0.06]"
                        }
                      `}
                    >
                      <span>{item.title}</span>

                      <ChevronRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="
                          shrink-0
                          text-[#D1D5DB]
                          transition-transform
                          duration-200
                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            {/* Mobile CTA */}

            <div
              className="
                shrink-0
                border-t
                border-white/[0.12]
                bg-[#15232C]
                px-4
                pt-3
                pb-[max(12px,env(safe-area-inset-bottom))]
                min-[414px]:px-6
              "
            >
              <Link
                href={CONTACT.path}
                onClick={closeMobile}
                className="
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  bg-[#B69B5E]
                  px-6
                  py-3
                  text-base
                  font-semibold
                  leading-6
                  text-[#151F28]
                  transition
                  duration-200
                  hover:bg-[#DDBF78]
                  active:scale-[0.99]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-white
                "
              >
                <span>Discuss your requirements</span>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}