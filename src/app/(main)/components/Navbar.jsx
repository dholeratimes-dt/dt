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
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/fbpixel";
import logo from "@/assets/dt.webp";

// Replace your existing Navbar component with this file. No extra stylesheet
// or package is needed. The fixed header preserves the old component's layout
// contract: retain your page's existing top offset (88px desktop / 80px mobile).
// This component owns the existing page-view hook. Do not also fire that event
// from another component or GTM unless your analytics setup deduplicates it.
const PRIMARY = [
  { title: "Dholera SIR", path: "/dholera-sir" },
  { title: "Residential Projects", path: "/dholera-residential-plots" },
  { title: "Bulk Land", path: "/bulk-land" },
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
const CONTACT = { title: "Contact Us", path: "/contact/inquiry" };

export default function Navbar() {
  const pathname = usePathname() || "/";
  const uid = useId().replace(/:/g, "");
  const [dropdown, setDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const dialogRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastTrackedPath = useRef(null);

  const active = (path) => pathname === path || pathname.startsWith(`${path}/`);
  const current = (path) => (pathname === path ? "page" : undefined);

  const closeMobile = () => {
    dialogRef.current?.close();
    setMobileOpen(false);
  };
  const openMobile = () => {
    setDropdown(null);
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setMobileOpen(true);
    closeButtonRef.current?.focus();
  };

  useEffect(() => {
    setDropdown(null);
    dialogRef.current?.close();
    setMobileOpen(false);
    if (lastTrackedPath.current !== pathname) {
      lastTrackedPath.current = pathname;
      try {
        trackPageView();
      } catch (error) {
        console.warn("Navbar page-view tracking failed", error);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!dropdown) return;
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setDropdown(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [dropdown]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const onResize = () => {
      setDropdown(null);
      if (desktop.matches) {
        dialogRef.current?.close();
        setMobileOpen(false);
      }
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const saved = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      Object.assign(body.style, saved);
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [mobileOpen]);

  const trackCall = () => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "call_click_organic",
        lead_type: "call",
        device: window.innerWidth <= 768 ? "mobile" : "desktop",
      });
    } catch (error) {
      console.warn("Call tracking failed", error);
    }
  };

  const renderDropdown = (key, title, items) => {
    const expanded = dropdown === key;
    return (
      <div
        className="dt-nav-disclosure"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setDropdown((open) => (open === key ? null : open));
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && expanded) {
            event.preventDefault();
            setDropdown(null);
            event.currentTarget.querySelector("button")?.focus();
          }
        }}
      >
        <button
          type="button"
          className={`dt-nav-link ${items.some((item) => active(item.path)) ? "is-active" : ""}`}
          aria-expanded={expanded}
          aria-controls={`${uid}-${key}`}
          onClick={() => setDropdown(expanded ? null : key)}
        >
          {title}
          <ChevronDown
            size={15}
            aria-hidden="true"
            className={expanded ? "dt-nav-rotated" : ""}
          />
        </button>
        <div className="dt-nav-popover" id={`${uid}-${key}`} hidden={!expanded}>
          <p className="dt-nav-eyebrow">
            {key === "updates" ? "Explore the latest" : "Get to know us"}
          </p>
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={current(item.path)}
              className={`dt-nav-popover-link ${active(item.path) ? "is-active" : ""}`}
              onClick={() => setDropdown(null)}
            >
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="dt-navbar">
        <div className="dt-nav-shell">
          <Link
            href="/"
            className="dt-nav-brand"
            aria-label="Dholera Times home"
          >
            <Image
              src={logo}
              alt="Dholera Times"
              width={150}
              height={150}
              priority
              className="dt-nav-logo"
            />
          </Link>
          <nav
            className="dt-nav-desktop"
            aria-label="Main navigation"
            ref={navRef}
          >
            {PRIMARY.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={current(item.path)}
                onClick={() => setDropdown(null)}
                className={`dt-nav-link ${active(item.path) ? "is-active" : ""}`}
              >
                {item.title}
              </Link>
            ))}
            {renderDropdown("updates", "Updates", UPDATES)}
            {renderDropdown("more", "More", MORE)}
            <Link
              href={CONTACT.path}
              className={`dt-nav-link ${active(CONTACT.path) ? "is-active" : ""}`}
              aria-current={current(CONTACT.path)}
              onClick={() => setDropdown(null)}
            >
              Contact Us
            </Link>
          </nav>
          <a
            href="tel:+919958993549"
            onClick={trackCall}
            className="dt-nav-call dt-nav-desktop-call"
          >
            <Phone size={17} aria-hidden="true" />
            <span>Speak to an expert</span>
          </a>
          <div className="dt-nav-mobile-actions">
            <a
              href="tel:+919958993549"
              onClick={trackCall}
              className="dt-nav-mobile-call"
              aria-label="Call Dholera Times"
            >
              <Phone size={18} aria-hidden="true" />
              <span>Call us</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="dt-nav-menu-button"
              onClick={openMobile}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls={`${uid}-mobile`}
            >
              <Menu size={22} aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id={`${uid}-mobile`}
        className="dt-nav-dialog"
        aria-labelledby={`${uid}-title`}
        onCancel={() => setMobileOpen(false)}
        onClose={() => {
          setMobileOpen(false);
          if (menuButtonRef.current?.getClientRects().length)
            menuButtonRef.current.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMobile();
        }}
      >
        <div className="dt-nav-drawer">
          <div className="dt-nav-drawer-header">
            <Link
              href="/"
              onClick={closeMobile}
              aria-label="Dholera Times home"
              className="dt-nav-brand"
            >
              <Image
                src={logo}
                alt="Dholera Times"
                width={150}
                height={150}
                className="dt-nav-logo"
              />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMobile}
              className="dt-nav-close"
              aria-label="Close navigation menu"
            >
              <X size={23} aria-hidden="true" />
            </button>
          </div>
          <div className="dt-nav-drawer-scroll">
            <p className="dt-nav-eyebrow" id={`${uid}-title`}>
              Explore Dholera
            </p>
            <nav aria-label="Mobile navigation">
              {PRIMARY.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMobile}
                  aria-current={current(item.path)}
                  className={`dt-nav-mobile-primary ${active(item.path) ? "is-active" : ""}`}
                >
                  {item.title}
                  <ChevronRight size={18} aria-hidden="true" />
                </Link>
              ))}
              <div className="dt-nav-mobile-group">
                <p className="dt-nav-eyebrow">News & resources</p>
                {UPDATES.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMobile}
                    aria-current={current(item.path)}
                    className={`dt-nav-mobile-secondary ${active(item.path) ? "is-active" : ""}`}
                  >
                    {item.title}
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <div className="dt-nav-mobile-group">
                <p className="dt-nav-eyebrow">Dholera Times</p>
                {[...MORE, CONTACT].map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMobile}
                    aria-current={current(item.path)}
                    className={`dt-nav-mobile-secondary ${active(item.path) ? "is-active" : ""}`}
                  >
                    {item.title}
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="dt-nav-drawer-footer">
            <Link
              href={CONTACT.path}
              onClick={closeMobile}
              className="dt-nav-enquire"
            >
              Discuss your requirements
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <a
              href="tel:+919958993549"
              onClick={trackCall}
              className="dt-nav-footer-call"
            >
              <Phone size={16} aria-hidden="true" />
              +91 99589 93549
            </a>
          </div>
        </div>
      </dialog>

      <style jsx global>{`
        .dt-navbar,
        .dt-nav-dialog {
          --dt-ink: #15232c;
          --dt-gold: #ddbf78;
          --dt-line: #e4e8e9;
          font-family: inherit;
        }
        .dt-navbar *,
        .dt-nav-dialog * {
          box-sizing: border-box;
        }
        .dt-navbar a,
        .dt-nav-dialog a {
          text-decoration: none;
        }
        .dt-navbar button,
        .dt-nav-dialog button {
          font: inherit;
          cursor: pointer;
        }
        .dt-navbar a:focus-visible,
        .dt-navbar button:focus-visible,
        .dt-nav-dialog a:focus-visible,
        .dt-nav-dialog button:focus-visible {
          outline: 3px solid #aa7d2c;
          outline-offset: 4px;
        }
        .dt-navbar {
          position: fixed;
          inset: 0 0 auto;
          z-index: 40;
          background: #15232c;
          color: #fff;
          border-bottom: 1px solid #ffffff14;
          box-shadow: 0 5px 24px #101d2512;
        }
        .dt-nav-shell {
          max-width: 1440px;
          margin: 0 auto;
          height: 88px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .dt-nav-brand {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          border-radius: 6px;
        }
        .dt-nav-logo {
          display: block;
          width: auto;
          height: 62px;
          object-fit: contain;
        }
        .dt-nav-desktop {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-left: auto;
        }
        .dt-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 44px;
          padding: 10px 12px;
          border: 0;
          border-radius: 7px;
          color: #e7edef;
          background: transparent;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 500;
          transition:
            background 150ms,
            color 150ms;
        }
        .dt-nav-link:hover,
        .dt-nav-link[aria-expanded="true"] {
          color: #fff;
          background: #ffffff0d;
        }
        .dt-nav-link.is-active {
          color: var(--dt-gold);
        }
        .dt-nav-link.is-active::after {
          content: "";
          position: absolute;
          bottom: 3px;
          left: 12px;
          right: 12px;
          height: 2px;
          border-radius: 2px;
          background: var(--dt-gold);
        }
        .dt-nav-link svg {
          transition: transform 160ms;
        }
        .dt-nav-rotated {
          transform: rotate(180deg);
        }
        .dt-nav-call {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 44px;
          padding: 12px 17px;
          border: 1px solid var(--dt-gold);
          border-radius: 7px;
          color: #15232c;
          background: var(--dt-gold);
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }
        .dt-nav-call:hover,
        .dt-nav-enquire:hover {
          background: #ebd49f;
        }
        .dt-nav-disclosure {
          position: relative;
        }
        .dt-nav-popover {
          position: absolute;
          right: 0;
          top: calc(100% + 15px);
          width: 330px;
          padding: 12px;
          border: 1px solid var(--dt-line);
          border-radius: 12px;
          background: #fff;
          color: var(--dt-ink);
          box-shadow: 0 18px 50px #0b18252b;
          animation: dt-nav-drop 150ms ease-out;
        }
        .dt-nav-popover[hidden] {
          display: none;
        }
        .dt-nav-eyebrow {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #697780;
        }
        .dt-nav-popover > .dt-nav-eyebrow {
          padding: 8px 12px 10px;
        }
        .dt-nav-popover-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 13px 12px;
          border-radius: 8px;
          color: var(--dt-ink);
        }
        .dt-nav-popover-link:hover {
          background: #f3f5f5;
        }
        .dt-nav-popover-link.is-active {
          background: #f8f1df;
        }
        .dt-nav-popover-link strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
        }
        .dt-nav-popover-link small {
          display: block;
          margin-top: 4px;
          font-size: 12px;
          line-height: 1.5;
          color: #63717a;
        }
        .dt-nav-mobile-actions {
          display: none;
        }
        .dt-nav-dialog {
          position: fixed;
          inset: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: none;
          height: 100%;
          height: 100dvh;
          max-height: none;
          border: 0;
          background: transparent;
          color: var(--dt-ink);
          overflow: hidden;
        }
        .dt-nav-dialog::backdrop {
          background: #0c192b80;
          backdrop-filter: blur(3px);
        }
        .dt-nav-drawer {
          width: min(440px, 100%);
          height: 100%;
          margin-left: auto;
          background: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: -12px 0 50px #0c192b20;
          animation: dt-nav-slide 200ms ease-out;
        }
        .dt-nav-drawer-header {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 88px;
          padding: max(12px, env(safe-area-inset-top)) 24px 12px;
          background: #15232c;
        }
        .dt-nav-close {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          color: #fff;
          background: #ffffff0d;
          border: 1px solid #ffffff24;
          border-radius: 8px;
        }
        .dt-nav-close:hover {
          background: #ffffff20;
        }
        .dt-nav-drawer-scroll {
          min-height: 0;
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 24px;
        }
        .dt-nav-drawer-scroll > .dt-nav-eyebrow {
          margin: 0 10px 12px;
        }
        .dt-nav-mobile-primary,
        .dt-nav-mobile-secondary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: var(--dt-ink);
          padding: 12px 10px;
          border-radius: 7px;
          line-height: 1.4;
        }
        .dt-nav-mobile-primary {
          font-size: 17px;
          font-weight: 600;
          min-height: 52px;
        }
        .dt-nav-mobile-secondary {
          font-size: 15px;
          min-height: 46px;
        }
        .dt-nav-mobile-primary svg,
        .dt-nav-mobile-secondary svg {
          flex-shrink: 0;
          color: #7d8990;
        }
        .dt-nav-mobile-primary:hover,
        .dt-nav-mobile-secondary:hover {
          background: #f3f5f5;
        }
        .dt-nav-mobile-primary.is-active,
        .dt-nav-mobile-secondary.is-active {
          background: #f8f1df;
          color: #6c501c;
        }
        .dt-nav-mobile-group {
          margin-top: 16px;
          padding-top: 18px;
          border-top: 1px solid var(--dt-line);
        }
        .dt-nav-mobile-group > .dt-nav-eyebrow {
          margin: 0 10px 8px;
        }
        .dt-nav-drawer-footer {
          flex-shrink: 0;
          padding: 16px 24px max(16px, env(safe-area-inset-bottom));
          border-top: 1px solid var(--dt-line);
          background: #f8faf9;
        }
        .dt-nav-enquire {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          min-height: 48px;
          padding: 13px 16px;
          border-radius: 7px;
          background: var(--dt-gold);
          color: #15232c;
          font-size: 14px;
          font-weight: 700;
        }
        .dt-nav-footer-call {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          margin-top: 5px;
          font-size: 14px;
          color: #42545e;
        }
        @keyframes dt-nav-drop {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dt-nav-slide {
          from {
            transform: translateX(35px);
            opacity: 0.7;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media (max-width: 1199px) {
          .dt-nav-shell {
            height: 80px;
            padding: 0 24px;
            gap: 16px;
          }
          .dt-nav-logo {
            height: 56px;
          }
          .dt-nav-desktop,
          .dt-nav-desktop-call {
            display: none;
          }
          .dt-nav-mobile-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-left: auto;
          }
          .dt-nav-mobile-call {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            min-height: 44px;
            padding: 8px;
            color: var(--dt-gold);
            font-size: 14px;
            font-weight: 600;
            border-radius: 7px;
          }
          .dt-nav-menu-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 44px;
            padding: 9px 12px;
            border: 1px solid #ffffff30;
            border-radius: 7px;
            background: transparent;
            color: #fff;
            font-size: 13px;
          }
          .dt-nav-menu-button:hover {
            background: #ffffff0d;
          }
        }
        @media (max-width: 380px) {
          .dt-nav-shell {
            padding: 0 16px;
          }
          .dt-nav-mobile-actions {
            gap: 6px;
          }
          .dt-nav-mobile-call span {
            display: none;
          }
          .dt-nav-mobile-call {
            width: 44px;
            justify-content: center;
          }
          .dt-nav-drawer-scroll,
          .dt-nav-drawer-footer {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
        @media (max-height: 480px) {
          .dt-nav-drawer-header {
            min-height: 64px;
          }
          .dt-nav-drawer-header .dt-nav-logo {
            height: 40px;
          }
          .dt-nav-drawer-footer {
            padding-top: 8px;
            padding-bottom: 8px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dt-navbar *,
          .dt-nav-dialog * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
