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




// "use client";

// import {
//   useEffect,
//   useId,
//   useRef,
//   useState,
// } from "react";

// import {
//   ChevronDown,
//   ChevronRight,
//   Menu,
//   X,
// } from "lucide-react";

// import { FaWhatsapp } from "react-icons/fa";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import logo from "@/assets/dt.webp";
// import { trackPageView } from "@/lib/fbpixel";

// /* ============================================================
//    NAVIGATION DATA
// ============================================================ */

// const PRIMARY = [
//   {
//     title: "Dholera SIR",
//     path: "/dholera-sir",
//   },
//   {
//     title: "Residential Projects",
//     path: "/dholera-residential-plots",
//   },
//   {
//     title: "Bulk Land",
//     path: "/bulk-land",
//   },
// ];

// const UPDATES = [
//   {
//     title: "Dholera News",
//     path: "/dholera-updates/latest-updates",
//     description: "Infrastructure and development updates",
//   },
//   {
//     title: "Blogs & Insights",
//     path: "/dholera-updates/blogs",
//     description: "Explore Dholera in more detail",
//   },
//   {
//     title: "Photo Gallery",
//     path: "/gallery/dholera-sir-progress",
//     description: "See development on the ground",
//   },
// ];

// const MORE = [
//   {
//     title: "About Us",
//     path: "/about",
//     description: "Get to know Dholera Times",
//   },
//   {
//     title: "NRI Guide",
//     path: "/nri-investment-guide-dholera",
//     description: "Information for overseas buyers",
//   },
//   {
//     title: "Channel Partner",
//     path: "/channel-partner",
//     description: "Explore opportunities to work with us",
//   },
// ];

// const CONTACT = {
//   title: "Contact Us",
//   path: "/contact/inquiry",
// };

// /* ============================================================
//    COMPONENT
// ============================================================ */

// export default function Navbar({
//   whatsappNumber = "",
// }) {
//   const pathname = usePathname() || "/";
//   const uid = useId().replace(/:/g, "");

//   const [dropdown, setDropdown] =
//     useState(null);

//   const [mobileOpen, setMobileOpen] =
//     useState(false);

//   const [
//     mobileVisible,
//     setMobileVisible,
//   ] = useState(false);

//   const [scrolled, setScrolled] =
//     useState(false);

//   const closeTimerRef = useRef(null);
//   const frameRef = useRef(null);
//   const navRef = useRef(null);
//   const dialogRef = useRef(null);
//   const menuButtonRef = useRef(null);
//   const lastTrackedPath =
//     useRef(null);

//   const isHome = pathname === "/";

//   /* ============================================================
//      ROUTE HELPERS
//   ============================================================ */

//   const active = (path) =>
//     pathname === path ||
//     pathname.startsWith(
//       `${path}/`,
//     );

//   const current = (path) =>
//     pathname === path
//       ? "page"
//       : undefined;

//   /* ============================================================
//      WHATSAPP
//   ============================================================ */

//   const number = String(
//     whatsappNumber,
//   ).replace(/[^0-9]/g, "");

//   const hasWhatsApp =
//     /^[1-9][0-9]{7,14}$/.test(
//       number,
//     );

//   const enquiryHref = hasWhatsApp
//     ? `https://wa.me/${number}?text=${encodeURIComponent(
//         "Hello Dholera Times, I would like to explore properties in Dholera.",
//       )}`
//     : CONTACT.path;

//   /* ============================================================
//      MOBILE MENU
//   ============================================================ */

//   function closeMobile(
//     restoreFocus = true,
//   ) {
//     cancelAnimationFrame(
//       frameRef.current,
//     );

//     clearTimeout(
//       closeTimerRef.current,
//     );

//     setMobileVisible(false);

//     const reduceMotion =
//       window.matchMedia(
//         "(prefers-reduced-motion: reduce)",
//       ).matches;

//     const delay =
//       reduceMotion ? 0 : 250;

//     closeTimerRef.current =
//       setTimeout(() => {
//         dialogRef.current?.close();

//         setMobileOpen(false);

//         if (
//           restoreFocus &&
//           menuButtonRef.current
//             ?.getClientRects()
//             .length
//         ) {
//           menuButtonRef.current.focus();
//         }
//       }, delay);
//   }

//   function openMobile() {
//     clearTimeout(
//       closeTimerRef.current,
//     );

//     cancelAnimationFrame(
//       frameRef.current,
//     );

//     setDropdown(null);

//     setMobileVisible(false);

//     if (
//       !dialogRef.current?.open
//     ) {
//       dialogRef.current?.showModal();
//     }

//     setMobileOpen(true);

//     frameRef.current =
//       requestAnimationFrame(() => {
//         frameRef.current =
//           requestAnimationFrame(() => {
//             setMobileVisible(true);
//           });
//       });
//   }

//   /* ============================================================
//      SCROLL STATE
//   ============================================================ */

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(
//         window.scrollY > 20,
//       );
//     };

//     handleScroll();

//     window.addEventListener(
//       "scroll",
//       handleScroll,
//       {
//         passive: true,
//       },
//     );

//     return () => {
//       window.removeEventListener(
//         "scroll",
//         handleScroll,
//       );
//     };
//   }, []);

//   /* ============================================================
//      CLEANUP
//   ============================================================ */

//   useEffect(
//     () => () => {
//       clearTimeout(
//         closeTimerRef.current,
//       );

//       cancelAnimationFrame(
//         frameRef.current,
//       );
//     },
//     [],
//   );

//   /* ============================================================
//      ROUTE CHANGE
//   ============================================================ */

//   useEffect(() => {
//     clearTimeout(
//       closeTimerRef.current,
//     );

//     cancelAnimationFrame(
//       frameRef.current,
//     );

//     setMobileVisible(false);

//     setDropdown(null);

//     dialogRef.current?.close();

//     setMobileOpen(false);

//     if (
//       lastTrackedPath.current !==
//       pathname
//     ) {
//       lastTrackedPath.current =
//         pathname;

//       try {
//         trackPageView();
//       } catch (error) {
//         console.warn(
//           "Navbar page-view tracking failed",
//           error,
//         );
//       }
//     }
//   }, [pathname]);

//   /* ============================================================
//      BODY SCROLL LOCK
//   ============================================================ */

//   useEffect(() => {
//     if (!mobileOpen) return;

//     const alreadyLocked =
//       document.body.classList.contains(
//         "overflow-hidden",
//       );

//     document.body.classList.add(
//       "overflow-hidden",
//     );

//     return () => {
//       if (!alreadyLocked) {
//         document.body.classList.remove(
//           "overflow-hidden",
//         );
//       }
//     };
//   }, [mobileOpen]);

//   /* ============================================================
//      DROPDOWN OUTSIDE CLICK
//   ============================================================ */

//   useEffect(() => {
//     if (!dropdown) return;

//     const dismiss = (event) => {
//       if (
//         !navRef.current?.contains(
//           event.target,
//         )
//       ) {
//         setDropdown(null);
//       }
//     };

//     document.addEventListener(
//       "pointerdown",
//       dismiss,
//     );

//     document.addEventListener(
//       "focusin",
//       dismiss,
//     );

//     return () => {
//       document.removeEventListener(
//         "pointerdown",
//         dismiss,
//       );

//       document.removeEventListener(
//         "focusin",
//         dismiss,
//       );
//     };
//   }, [dropdown]);

//   /* ============================================================
//      RESPONSIVE CLEANUP
//   ============================================================ */

//   useEffect(() => {
//     const desktop =
//       window.matchMedia(
//         "(min-width: 1280px)",
//       );

//     const handleChange = () => {
//       setDropdown(null);

//       if (desktop.matches) {
//         clearTimeout(
//           closeTimerRef.current,
//         );

//         cancelAnimationFrame(
//           frameRef.current,
//         );

//         setMobileVisible(false);

//         const hadFocus =
//           dialogRef.current?.contains(
//             document.activeElement,
//           );

//         dialogRef.current?.close();

//         setMobileOpen(false);

//         if (hadFocus) {
//           navRef.current
//             ?.querySelector("a")
//             ?.focus();
//         }
//       }
//     };

//     desktop.addEventListener(
//       "change",
//       handleChange,
//     );

//     return () =>
//       desktop.removeEventListener(
//         "change",
//         handleChange,
//       );
//   }, []);

//   /* ============================================================
//      ENQUIRY CTA
//   ============================================================ */

//   function enquiry(
//     className,
//     onClick,
//   ) {
//     return (
//       <Link
//         href={enquiryHref}
//         className={className}
//         onClick={onClick}
//         target={
//           hasWhatsApp
//             ? "_blank"
//             : undefined
//         }
//         rel={
//           hasWhatsApp
//             ? "noopener noreferrer"
//             : undefined
//         }
//         aria-label={
//           hasWhatsApp
//             ? "Enquire on WhatsApp (opens in a new tab)"
//             : undefined
//         }
//       >
//         <FaWhatsapp
//           size={22}
//           aria-hidden="true"
//           className="
//             shrink-0
//             text-[#25D366]
//           "
//         />

//         <span className="whitespace-nowrap">
//           Enquire now
//         </span>
//       </Link>
//     );
//   }

//   /* ============================================================
//      DESKTOP DROPDOWN
//   ============================================================ */

//   function renderDropdown(
//     key,
//     title,
//     items,
//   ) {
//     const expanded =
//       dropdown === key;

//     const containsActive =
//       items.some((item) =>
//         active(item.path),
//       );

//     return (
//       <div
//         className="relative"
//         onMouseEnter={() =>
//           setDropdown(key)
//         }
//         onMouseLeave={() =>
//           setDropdown(null)
//         }
//         onBlur={(event) => {
//           if (
//             !event.currentTarget.contains(
//               event.relatedTarget,
//             )
//           ) {
//             setDropdown(null);
//           }
//         }}
//         onKeyDown={(event) => {
//           if (
//             event.key ===
//               "Escape" &&
//             expanded
//           ) {
//             event.preventDefault();

//             setDropdown(null);

//             event.currentTarget
//               .querySelector("button")
//               ?.focus();
//           }
//         }}
//       >
//         <button
//           type="button"
//           aria-expanded={expanded}
//           aria-controls={`${uid}-${key}`}
//           onClick={() =>
//             setDropdown(
//               expanded
//                 ? null
//                 : key,
//             )
//           }
//           className="
//             group
//             relative

//             inline-flex
//             min-h-[48px]

//             items-center
//             justify-center

//             gap-1.5

//             whitespace-nowrap

//             px-3
//             py-2.5

//             text-[17px]
//             font-semibold
//             leading-6

//             text-white

//             transition-colors
//             duration-200

//             hover:text-[#F7DCE5]

//             focus-visible:outline-none
//             focus-visible:ring-2
//             focus-visible:ring-white
//             focus-visible:ring-offset-2
//             focus-visible:ring-offset-transparent

//             min-[1440px]:px-4

//             motion-reduce:transition-none
//           "
//         >
//           <span>
//             {title}
//           </span>

//           <ChevronDown
//             size={16}
//             strokeWidth={2}
//             aria-hidden="true"
//             className={`
//               shrink-0

//               transition-transform
//               duration-200

//               ${
//                 expanded
//                   ? "rotate-180"
//                   : ""
//               }

//               motion-reduce:transition-none
//             `}
//           />

//           <span
//             aria-hidden="true"
//             className={`
//               absolute

//               bottom-[3px]
//               left-3
//               right-3

//               h-[2px]

//               origin-center

//               rounded-full

//               bg-[#F1C8D4]

//               transition-transform
//               duration-200

//               ${
//                 containsActive ||
//                 expanded
//                   ? "scale-x-100"
//                   : "scale-x-0 group-hover:scale-x-100"
//               }

//               motion-reduce:transition-none
//             `}
//           />
//         </button>

//         {/* Dropdown panel */}
//         <div
//           id={`${uid}-${key}`}
//           hidden={!expanded}
//           className="
//             absolute

//             right-0
//             top-full

//             z-50

//             w-[350px]

//             pt-3
//           "
//         >
//           <div
//             className="
//               overflow-hidden

//               rounded-2xl

//               border
//               border-[#EAD9DF]

//               bg-[#FFFDFE]

//               p-2.5

//               text-[#39252E]

//               shadow-[0_24px_60px_-24px_rgba(57,37,46,0.34)]
//             "
//           >
//             <p
//               className="
//                 px-3
//                 pb-2
//                 pt-2

//                 text-[11px]
//                 font-semibold
//                 uppercase
//                 leading-5

//                 tracking-[0.14em]

//                 text-[#8F2946]
//               "
//             >
//               {key === "updates"
//                 ? "News & perspectives"
//                 : "Dholera Times"}
//             </p>

//             <div className="space-y-1">
//               {items.map(
//                 (item) => {
//                   const isActive =
//                     active(
//                       item.path,
//                     );

//                   return (
//                     <Link
//                       key={item.path}
//                       href={item.path}
//                       aria-current={current(
//                         item.path,
//                       )}
//                       onClick={() =>
//                         setDropdown(
//                           null,
//                         )
//                       }
//                       className={`
//                         group

//                         flex
//                         min-h-[68px]

//                         items-center
//                         justify-between

//                         gap-4

//                         rounded-xl

//                         px-3
//                         py-3

//                         transition-colors
//                         duration-200

//                         ${
//                           isActive
//                             ? "bg-[#F3E7EC]"
//                             : "hover:bg-[#FAF7F8]"
//                         }

//                         focus-visible:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-[#8F2946]
//                         focus-visible:ring-inset

//                         motion-reduce:transition-none
//                       `}
//                     >
//                       <span className="min-w-0">
//                         <strong
//                           className="
//                             block

//                             text-[17px]
//                             font-semibold
//                             leading-6

//                             tracking-[-0.01em]

//                             text-[#39252E]
//                           "
//                         >
//                           {item.title}
//                         </strong>

//                         <small
//                           className="
//                             mt-0.5
//                             block

//                             text-[13px]
//                             font-normal
//                             leading-5

//                             text-[#68565E]
//                           "
//                         >
//                           {item.description}
//                         </small>
//                       </span>

//                       <ChevronRight
//                         size={17}
//                         strokeWidth={1.8}
//                         aria-hidden="true"
//                         className="
//                           shrink-0

//                           text-[#8F2946]

//                           transition-transform
//                           duration-200

//                           group-hover:translate-x-0.5

//                           motion-reduce:transform-none
//                           motion-reduce:transition-none
//                         "
//                       />
//                     </Link>
//                   );
//                 },
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ============================================================
//      DESKTOP LINK STYLE
//   ============================================================ */

//   const desktopLinkClass = `
//     group
//     relative

//     inline-flex
//     min-h-[48px]

//     items-center
//     justify-center

//     whitespace-nowrap

//     px-3
//     py-2.5

//     text-[17px]
//     font-semibold
//     leading-6

//     text-white

//     transition-colors
//     duration-200

//     hover:text-[#F7DCE5]

//     focus-visible:outline-none
//     focus-visible:ring-2
//     focus-visible:ring-white
//     focus-visible:ring-offset-2
//     focus-visible:ring-offset-transparent

//     min-[1440px]:px-4

//     motion-reduce:transition-none
//   `;

//   return (
//     <>
//       {/* ======================================================
//           BURGUNDY GRADIENT NAVBAR
//       ====================================================== */}

//       <header
//         className={`
//           sticky
//           top-0

//           z-50

//           w-full

//           bg-gradient-to-r
//           from-[#742039]
//           via-[#8F2946]
//           to-[#A13A57]

//           ${
//             scrolled
//               ? `
//                 shadow-[0_10px_30px_-22px_rgba(57,37,46,0.65)]
//               `
//               : `
//                 shadow-[0_6px_20px_-20px_rgba(57,37,46,0.45)]
//               `
//           }

//           ${
//             isHome
//               ? `
//                 -mb-[72px]

//                 min-[480px]:-mb-[76px]

//                 min-[1280px]:-mb-[80px]
//               `
//               : ""
//           }

//           transition-shadow
//           duration-300
//           ease-out

//           motion-reduce:transition-none
//         `}
//       >
//         <div
//           className="
//             mx-auto

//             flex

//             min-h-[72px]
//             w-full
//             max-w-[1536px]

//             items-center

//             gap-5

//             px-4
//             py-2.5

//             min-[480px]:min-h-[76px]
//             min-[480px]:px-6

//             md:px-8

//             min-[1280px]:min-h-[80px]

//             min-[1440px]:gap-7
//           "
//         >
//           {/* =================================================
//               LOGO
//           ================================================== */}

//           <Link
//             href="/"
//             aria-label="Dholera Times home"
//             className="
//               inline-flex
//               shrink-0
//               items-center

//               rounded-lg

//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-white
//               focus-visible:ring-offset-2
//               focus-visible:ring-offset-[#8F2946]
//             "
//           >
//             <Image
//               src={logo}
//               alt="Dholera Times"
//               width={150}
//               height={150}
//               priority
//               className="
//                 h-[50px]
//                 w-auto

//                 object-contain

//                 drop-shadow-[0_2px_7px_rgba(57,37,46,0.30)]

//                 min-[480px]:h-[52px]

//                 min-[1280px]:h-[54px]
//               "
//             />
//           </Link>

//           {/* =================================================
//               DESKTOP NAVIGATION
//           ================================================== */}

//           <nav
//             ref={navRef}
//             aria-label="Main navigation"
//             className="
//               ml-auto

//               hidden

//               items-center

//               gap-0.5

//               min-[1280px]:flex

//               min-[1440px]:gap-1
//             "
//           >
//             {PRIMARY.map(
//               (item) => {
//                 const isActive =
//                   active(
//                     item.path,
//                   );

//                 return (
//                   <Link
//                     key={item.path}
//                     href={item.path}
//                     aria-current={current(
//                       item.path,
//                     )}
//                     onClick={() =>
//                       setDropdown(
//                         null,
//                       )
//                     }
//                     className={
//                       desktopLinkClass
//                     }
//                   >
//                     {item.title}

//                     <span
//                       aria-hidden="true"
//                       className={`
//                         absolute

//                         bottom-[3px]
//                         left-3
//                         right-3

//                         h-[2px]

//                         origin-center

//                         rounded-full

//                         bg-[#F1C8D4]

//                         transition-transform
//                         duration-200

//                         ${
//                           isActive
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover:scale-x-100"
//                         }

//                         motion-reduce:transition-none
//                       `}
//                     />
//                   </Link>
//                 );
//               },
//             )}

//             {renderDropdown(
//               "updates",
//               "Updates",
//               UPDATES,
//             )}

//             {renderDropdown(
//               "more",
//               "More",
//               MORE,
//             )}

//             {/* =================================================
//                 CONTACT
//             ================================================== */}

//             <Link
//               href={CONTACT.path}
//               aria-current={current(
//                 CONTACT.path,
//               )}
//               onClick={() =>
//                 setDropdown(null)
//               }
//               className={`
//                 ml-2

//                 inline-flex
//                 min-h-[48px]

//                 items-center
//                 justify-center

//                 whitespace-nowrap

//                 rounded-full

//                 border
//                 border-white/30

//                 bg-white/10

//                 px-5
//                 py-2.5

//                 text-[16px]
//                 font-semibold
//                 leading-6

//                 text-white

//                 transition-[background-color,border-color,transform]
//                 duration-200

//                 hover:-translate-y-px

//                 hover:border-white/50
//                 hover:bg-white/16

//                 active:translate-y-0

//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-white
//                 focus-visible:ring-offset-2
//                 focus-visible:ring-offset-[#8F2946]

//                 ${
//                   active(
//                     CONTACT.path,
//                   )
//                     ? "border-white/55 bg-white/16"
//                     : ""
//                 }

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               `}
//             >
//               Contact us
//             </Link>
//           </nav>

//           {/* =================================================
//               MOBILE MENU BUTTON
//           ================================================== */}

//           <button
//             ref={menuButtonRef}
//             type="button"
//             aria-label="Open navigation"
//             aria-expanded={
//               mobileOpen
//             }
//             aria-controls={`${uid}-mobile`}
//             aria-haspopup="dialog"
//             onClick={openMobile}
//             className="
//               ml-auto

//               grid
//               h-11
//               w-11
//               shrink-0

//               place-items-center

//               rounded-full

//               bg-white/12

//               text-white

//               transition-[background-color,transform]
//               duration-200

//               hover:bg-white/20

//               active:scale-95

//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-white
//               focus-visible:ring-offset-2
//               focus-visible:ring-offset-[#8F2946]

//               min-[480px]:h-12
//               min-[480px]:w-12

//               min-[1280px]:hidden

//               motion-reduce:transform-none
//               motion-reduce:transition-none
//             "
//           >
//             <Menu
//               size={24}
//               strokeWidth={2}
//               aria-hidden="true"
//             />
//           </button>
//         </div>
//       </header>

//       {/* ======================================================
//           MOBILE NAVIGATION
//       ====================================================== */}

//       <dialog
//         ref={dialogRef}
//         id={`${uid}-mobile`}
//         aria-labelledby={`${uid}-title`}
//         onCancel={(event) => {
//           event.preventDefault();

//           closeMobile();
//         }}
//         onClose={() => {
//           setMobileOpen(false);

//           setMobileVisible(false);
//         }}
//         onClick={(event) => {
//           if (
//             event.target ===
//             event.currentTarget
//           ) {
//             closeMobile();
//           }
//         }}
//         className={`
//           fixed
//           inset-0

//           m-0

//           h-[100dvh]
//           max-h-[100dvh]

//           w-full
//           max-w-none

//           overflow-hidden

//           border-0

//           bg-[#FAF7F8]

//           p-0

//           text-[#39252E]

//           shadow-[0_28px_70px_-24px_rgba(57,37,46,0.45)]

//           backdrop:bg-[#39252E]/45
//           backdrop:backdrop-blur-[2px]

//           transition-[transform,opacity]
//           duration-[250ms]
//           ease-out

//           ${
//             mobileVisible
//               ? "translate-y-0 opacity-100"
//               : "-translate-y-full opacity-0"
//           }

//           motion-reduce:transition-none
//         `}
//       >
//         <div
//           className="
//             flex
//             h-full
//             flex-col
//           "
//         >
//           {/* =================================================
//               MOBILE HEADER
//           ================================================== */}

//           <div
//             className="
//               flex
//               min-h-[72px]
//               shrink-0

//               items-center
//               justify-between

//               gap-4

//               bg-gradient-to-r
//               from-[#742039]
//               via-[#8F2946]
//               to-[#A13A57]

//               px-4

//               pb-2
//               pt-[max(10px,env(safe-area-inset-top))]

//               min-[480px]:px-6
//             "
//           >
//             <h2
//               id={`${uid}-title`}
//               className="sr-only"
//             >
//               Dholera Times navigation
//             </h2>

//             <Link
//               href="/"
//               onClick={() =>
//                 closeMobile()
//               }
//               aria-label="Dholera Times home"
//               className="
//                 inline-flex
//                 min-h-12
//                 shrink-0
//                 items-center

//                 rounded-lg

//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-white
//               "
//             >
//               <Image
//                 src={logo}
//                 alt="Dholera Times"
//                 width={150}
//                 height={150}
//                 className="
//                   block
//                   h-11
//                   w-auto
//                   object-contain
//                 "
//               />
//             </Link>

//             <button
//               type="button"
//               aria-label="Close navigation"
//               autoFocus
//               onClick={() =>
//                 closeMobile()
//               }
//               className="
//                 grid
//                 h-11
//                 w-11
//                 shrink-0

//                 place-items-center

//                 rounded-full

//                 bg-white/12

//                 text-white

//                 transition-[background-color,transform]
//                 duration-200

//                 hover:bg-white/20

//                 active:scale-95

//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-white

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               "
//             >
//               <X
//                 size={23}
//                 strokeWidth={2}
//                 aria-hidden="true"
//               />
//             </button>
//           </div>

//           {/* =================================================
//               MOBILE LINKS
//           ================================================== */}

//           <nav
//             aria-label="Mobile navigation"
//             className="
//               min-h-0
//               flex-1

//               overflow-y-auto
//               overscroll-contain

//               px-4
//               pb-5
//               pt-5

//               min-[480px]:px-6

//               [scrollbar-width:thin]
//               [scrollbar-color:#E0A4B5_transparent]

//               [&::-webkit-scrollbar]:w-1

//               [&::-webkit-scrollbar-thumb]:rounded-full
//               [&::-webkit-scrollbar-thumb]:bg-[#E0A4B5]
//             "
//           >
//             {[
//               {
//                 title:
//                   "Properties & location",
//                 items: PRIMARY,
//               },
//               {
//                 title:
//                   "News & resources",
//                 items: UPDATES,
//               },
//               {
//                 title:
//                   "Company & support",
//                 items: [
//                   ...MORE,
//                   CONTACT,
//                 ],
//               },
//             ].map(
//               (
//                 group,
//                 groupIndex,
//               ) => (
//                 <section
//                   key={group.title}
//                   className={`
//                     ${
//                       groupIndex === 0
//                         ? ""
//                         : `
//                           mt-5
//                           border-t
//                           border-[#EAD9DF]
//                           pt-5
//                         `
//                     }
//                   `}
//                 >
//                   <h3
//                     className="
//                       mb-2

//                       px-2

//                       text-[12px]
//                       font-semibold
//                       uppercase
//                       leading-5

//                       tracking-[0.14em]

//                       text-[#8F2946]
//                     "
//                   >
//                     {group.title}
//                   </h3>

//                   <div className="space-y-1">
//                     {group.items.map(
//                       (item) => {
//                         const isActive =
//                           active(
//                             item.path,
//                           );

//                         return (
//                           <Link
//                             key={item.path}
//                             href={item.path}
//                             aria-current={current(
//                               item.path,
//                             )}
//                             onClick={() =>
//                               closeMobile()
//                             }
//                             className={`
//                               group

//                               flex
//                               min-h-[54px]

//                               touch-manipulation

//                               items-center
//                               justify-between

//                               gap-4

//                               rounded-xl

//                               px-3
//                               py-3

//                               text-[17px]
//                               leading-6

//                               transition-colors
//                               duration-150

//                               ${
//                                 isActive
//                                   ? `
//                                     bg-[#F3E7EC]

//                                     font-semibold

//                                     text-[#8F2946]
//                                   `
//                                   : `
//                                     font-medium

//                                     text-[#39252E]

//                                     hover:bg-[#F7EEF1]

//                                     active:bg-[#F3E7EC]
//                                   `
//                               }

//                               focus-visible:outline-none
//                               focus-visible:ring-2
//                               focus-visible:ring-[#8F2946]
//                               focus-visible:ring-inset

//                               motion-reduce:transition-none
//                             `}
//                           >
//                             <span className="min-w-0">
//                               {item.title}
//                             </span>

//                             <ChevronRight
//                               size={18}
//                               strokeWidth={1.9}
//                               aria-hidden="true"
//                               className={`
//                                 shrink-0

//                                 ${
//                                   isActive
//                                     ? "text-[#8F2946]"
//                                     : "text-[#7C6870]"
//                                 }

//                                 transition-transform
//                                 duration-200

//                                 group-hover:translate-x-0.5

//                                 motion-reduce:transform-none
//                               `}
//                             />
//                           </Link>
//                         );
//                       },
//                     )}
//                   </div>
//                 </section>
//               ),
//             )}
//           </nav>

//           {/* =================================================
//               MOBILE ENQUIRY
//           ================================================== */}

//           <div
//             className="
//               shrink-0

//               border-t
//               border-[#EAD9DF]

//               bg-white

//               px-4

//               pb-[max(14px,env(safe-area-inset-bottom))]
//               pt-3

//               min-[480px]:px-6
//             "
//           >
//             <p
//               className="
//                 mb-2

//                 text-[14px]
//                 font-normal
//                 leading-5

//                 text-[#68565E]
//               "
//             >
//               Let’s find a property that fits your plans.
//             </p>

//             {enquiry(
//               `
//                 flex
//                 min-h-[50px]
//                 w-full

//                 items-center
//                 justify-center

//                 gap-2.5

//                 rounded-xl

//                 bg-[#8F2946]

//                 px-5
//                 py-3

//                 text-[17px]
//                 font-semibold
//                 leading-6

//                 text-white

//                 transition-[background-color,transform]
//                 duration-200

//                 hover:bg-[#742039]

//                 active:scale-[0.99]

//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-[#8F2946]
//                 focus-visible:ring-offset-2

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               `,
//               () =>
//                 closeMobile(),
//             )}
//           </div>
//         </div>
//       </dialog>
//     </>
//   );
// }


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
  Menu,
  X,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/DTLOGO.png";
import { trackPageView } from "@/lib/fbpixel";

/* ============================================================
   NAVIGATION DATA
============================================================ */

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

/* ============================================================
   COMPONENT
============================================================ */

export default function Navbar({
  whatsappNumber = "",
}) {
  const pathname = usePathname() || "";
  const uid = useId().replace(/:/g, "");

  const [dropdown, setDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeTimerRef = useRef(null);
  const frameRef = useRef(null);
  const navRef = useRef(null);
  const dialogRef = useRef(null);
  const menuButtonRef = useRef(null);
  const lastTrackedPath = useRef(null);

  const isHome = pathname === "/";

  /* ============================================================
     ROUTE HELPERS
  ============================================================ */

  const active = (path) =>
    pathname === path ||
    pathname.startsWith(`${path}/`);

  const current = (path) =>
    pathname === path ? "page" : undefined;

  /* ============================================================
     WHATSAPP
  ============================================================ */

  const number = String(
    whatsappNumber,
  ).replace(/[^0-9]/g, "");

  const hasWhatsApp =
    /^[1-9][0-9]{7,14}$/.test(number);

  const enquiryHref = hasWhatsApp
    ? `https://wa.me/${number}?text=${encodeURIComponent(
        "Hello Dholera Times, I would like to explore properties in Dholera.",
      )}`
    : CONTACT.path;

  /* ============================================================
     MOBILE MENU
  ============================================================ */

  function closeMobile(restoreFocus = true) {
    cancelAnimationFrame(frameRef.current);
    clearTimeout(closeTimerRef.current);

    setMobileVisible(false);

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const delay = reduceMotion ? 0 : 250;

    closeTimerRef.current = setTimeout(() => {
      dialogRef.current?.close();

      setMobileOpen(false);

      if (
        restoreFocus &&
        menuButtonRef.current?.getClientRects().length
      ) {
        menuButtonRef.current.focus();
      }
    }, delay);
  }

  function openMobile() {
    clearTimeout(closeTimerRef.current);
    cancelAnimationFrame(frameRef.current);

    setDropdown(null);
    setMobileVisible(false);

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    setMobileOpen(true);

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => {
        setMobileVisible(true);
      });
    });
  }

  /* ============================================================
     SCROLL STATE
  ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

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
      clearTimeout(closeTimerRef.current);
      cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  /* ============================================================
     ROUTE CHANGE
  ============================================================ */

  useEffect(() => {
    clearTimeout(closeTimerRef.current);
    cancelAnimationFrame(frameRef.current);

    setMobileVisible(false);
    setDropdown(null);

    dialogRef.current?.close();
    setMobileOpen(false);

    if (lastTrackedPath.current !== pathname) {
      lastTrackedPath.current = pathname;

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
    if (!mobileOpen) return;

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
     OUTSIDE DROPDOWN CLICK
  ============================================================ */

  useEffect(() => {
    if (!dropdown) return;

    const dismiss = (event) => {
      if (
        !navRef.current?.contains(event.target)
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
     RESPONSIVE CLEANUP
  ============================================================ */

  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 1280px)",
    );

    const handleChange = () => {
      setDropdown(null);

      if (desktop.matches) {
        clearTimeout(closeTimerRef.current);
        cancelAnimationFrame(frameRef.current);

        setMobileVisible(false);

        const hadFocus =
          dialogRef.current?.contains(
            document.activeElement,
          );

        dialogRef.current?.close();
        setMobileOpen(false);

        if (hadFocus) {
          navRef.current
            ?.querySelector("a")
            ?.focus();
        }
      }
    };

    desktop.addEventListener(
      "change",
      handleChange,
    );

    return () =>
      desktop.removeEventListener(
        "change",
        handleChange,
      );
  }, []);

  /* ============================================================
     ENQUIRY CTA
  ============================================================ */

  function enquiry(className, onClick) {
    return (
      <Link
        href={enquiryHref}
        className={className}
        onClick={onClick}
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
        aria-label={
          hasWhatsApp
            ? "Enquire on WhatsApp (opens in a new tab)"
            : undefined
        }
      >
        <FaWhatsapp
          size={22}
          aria-hidden="true"
          className="
            shrink-0
            text-[#25D366]
          "
        />

        <span className="whitespace-nowrap">
          Enquire now
        </span>
      </Link>
    );
  }

  /* ============================================================
     DESKTOP DROPDOWN
  ============================================================ */

  function renderDropdown(
    key,
    title,
    items,
  ) {
    const expanded = dropdown === key;

    const containsActive =
      items.some((item) =>
        active(item.path),
      );

    return (
      <div
        className="relative"
        onMouseEnter={() =>
          setDropdown(key)
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
            event.key === "Escape" &&
            expanded
          ) {
            event.preventDefault();

            setDropdown(null);

            event.currentTarget
              .querySelector("button")
              ?.focus();
          }
        }}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${uid}-${key}`}
          onClick={() =>
            setDropdown(
              expanded ? null : key,
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
            focus-visible:ring-offset-transparent

            min-[1440px]:px-4

            motion-reduce:transition-none
          "
        >
          <span>{title}</span>

          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className={`
              shrink-0

              transition-transform
              duration-200

              ${
                expanded
                  ? "rotate-180"
                  : ""
              }

              motion-reduce:transition-none
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
                containsActive || expanded
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }

              motion-reduce:transition-none
            `}
          />
        </button>

        {/* Dropdown hover bridge */}
        <div
          id={`${uid}-${key}`}
          hidden={!expanded}
          className="
            absolute

            right-0
            top-full

            z-50

            w-[350px]

            pt-3
          "
        >
          {/* Dropdown card */}
          <div
            className="
              overflow-hidden

              rounded-2xl

              border
              border-[#EAD9DF]

              bg-[#FFFDFE]/95

              p-2.5

              text-[#39252E]

              shadow-[0_24px_60px_-24px_rgba(57,37,46,0.34)]

              backdrop-blur-xl
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
                leading-5

                tracking-[0.14em]

                text-[#8F2946]
              "
            >
              {key === "updates"
                ? "News & perspectives"
                : "Dholera Times"}
            </p>

            <div className="space-y-1">
              {items.map((item) => {
                const isActive =
                  active(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    aria-current={current(
                      item.path,
                    )}
                    onClick={() =>
                      setDropdown(null)
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
                          ? "bg-[#F3E7EC]"
                          : "hover:bg-[#FAF7F8]"
                      }

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#8F2946]
                      focus-visible:ring-inset

                      motion-reduce:transition-none
                    `}
                  >
                    <span className="min-w-0">
                      <strong
                        className="
                          block

                          text-[17px]
                          font-semibold
                          leading-6

                          tracking-[-0.01em]

                          text-[#39252E]
                        "
                      >
                        {item.title}
                      </strong>

                      <small
                        className="
                          mt-0.5
                          block

                          text-[13px]
                          font-normal
                          leading-5

                          text-[#68565E]
                        "
                      >
                        {item.description}
                      </small>
                    </span>

                    <ChevronRight
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="
                        shrink-0

                        text-[#8F2946]

                        transition-transform
                        duration-200

                        group-hover:translate-x-0.5

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     DESKTOP LINK CLASS
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
    focus-visible:ring-offset-transparent

    min-[1440px]:px-4

    motion-reduce:transition-none
  `;

  return (
    <>
      {/* ======================================================
          #8F2946 TRANSPARENT GLASS NAVBAR
      ====================================================== */}

      <header
className={`
  sticky
  top-0

  z-50

  w-full

  bg-gradient-to-r

  ${
    scrolled
      ? `
        from-[#8F2946]/[0.76]
        via-[#8F2946]/[0.70]
        to-[#8F2946]/[0.76]

        backdrop-blur-xl

        shadow-[0_8px_26px_-24px_rgba(57,37,46,0.32)]
      `
      : `
        from-[#8F2946]/[0.68]
        via-[#8F2946]/[0.60]
        to-[#8F2946]/[0.68]

        backdrop-blur-lg

        shadow-[0_6px_20px_-22px_rgba(57,37,46,0.22)]
      `
  }

  ${
    isHome
      ? `
        -mb-[72px]

        min-[480px]:-mb-[76px]

        min-[1280px]:-mb-[80px]
      `
      : ""
  }

  transition-[background-color,backdrop-filter,box-shadow]
  duration-300
  ease-out

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
            py-2.5

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

              rounded-lg

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#8F2946]
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

                drop-shadow-[0_2px_7px_rgba(57,37,46,0.28)]

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
            {PRIMARY.map((item) => {
              const isActive =
                active(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={current(
                    item.path,
                  )}
                  onClick={() =>
                    setDropdown(null)
                  }
                  className={
                    desktopLinkClass
                  }
                >
                  {item.title}

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

                      motion-reduce:transition-none
                    `}
                  />
                </Link>
              );
            })}

            {renderDropdown(
              "updates",
              "Updates",
              UPDATES,
            )}

            {renderDropdown(
              "more",
              "More",
              MORE,
            )}

            {/* =================================================
                CONTACT
            ================================================== */}

            <Link
              href={CONTACT.path}
              aria-current={current(
                CONTACT.path,
              )}
              onClick={() =>
                setDropdown(null)
              }
              className={`
                ml-2

                inline-flex
                min-h-[48px]

                items-center
                justify-center

                whitespace-nowrap

                rounded-full

                border
                border-white/35

                bg-white/[0.10]

                px-5
                py-2.5

                text-[16px]
                font-semibold
                leading-6

                text-white

                backdrop-blur-sm

                transition-[background-color,border-color,transform]
                duration-200

                hover:-translate-y-px

                hover:border-white/55
                hover:bg-white/[0.18]

                active:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#8F2946]

                ${
                  active(CONTACT.path)
                    ? `
                      border-white/60
                      bg-white/[0.18]
                    `
                    : ""
                }

                motion-reduce:transform-none
                motion-reduce:transition-none
              `}
            >
              Contact us
            </Link>
          </nav>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open navigation"
            aria-expanded={
              mobileOpen
            }
            aria-controls={`${uid}-mobile`}
            aria-haspopup="dialog"
            onClick={openMobile}
            className="
              ml-auto

              grid
              h-11
              w-11
              shrink-0

              place-items-center

              rounded-full

              border
              border-white/20

              bg-white/[0.10]

              text-white

              backdrop-blur-sm

              transition-[background-color,border-color,transform]
              duration-200

              hover:border-white/35
              hover:bg-white/[0.18]

              active:scale-95

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#8F2946]

              min-[480px]:h-12
              min-[480px]:w-12

              min-[1280px]:hidden

              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <Menu
              size={24}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* ======================================================
          MOBILE NAVIGATION
      ====================================================== */}

      <dialog
        ref={dialogRef}
        id={`${uid}-mobile`}
        aria-labelledby={`${uid}-title`}
        onCancel={(event) => {
          event.preventDefault();

          closeMobile();
        }}
        onClose={() => {
          setMobileOpen(false);

          setMobileVisible(false);
        }}
        onClick={(event) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            closeMobile();
          }
        }}
        className={`
          fixed
          inset-0

          m-0

          h-[100dvh]
          max-h-[100dvh]

          w-full
          max-w-none

          overflow-hidden

          border-0

          bg-[#FAF7F8]

          p-0

          text-[#39252E]

          shadow-[0_28px_70px_-24px_rgba(57,37,46,0.45)]

          backdrop:bg-[#39252E]/45
          backdrop:backdrop-blur-[2px]

          transition-[transform,opacity]
          duration-[250ms]
          ease-out

          ${
            mobileVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }

          motion-reduce:transition-none
        `}
      >
        <div
          className="
            flex
            h-full
            flex-col
          "
        >
          {/* =================================================
              MOBILE HEADER
          ================================================== */}

          <div
            className="
              flex
              min-h-[72px]
              shrink-0

              items-center
              justify-between

              gap-4

              bg-gradient-to-r
              from-[#8F2946]/[0.96]
              via-[#8F2946]/[0.88]
              to-[#8F2946]/[0.96]

              px-4

              pb-2
              pt-[max(10px,env(safe-area-inset-top))]

              backdrop-blur-xl

              min-[480px]:px-6
            "
          >
            <h2
              id={`${uid}-title`}
              className="sr-only"
            >
              Dholera Times navigation
            </h2>

            <Link
              href="/"
              onClick={() =>
                closeMobile()
              }
              aria-label="Dholera Times home"
              className="
                inline-flex
                min-h-12
                shrink-0
                items-center

                rounded-lg

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
                className="
                  block
                  h-11
                  w-auto
                  object-contain
                "
              />
            </Link>

            <button
              type="button"
              aria-label="Close navigation"
              autoFocus
              onClick={() =>
                closeMobile()
              }
              className="
                grid
                h-11
                w-11
                shrink-0

                place-items-center

                rounded-full

                border
                border-white/20

                bg-white/[0.10]

                text-white

                transition-[background-color,border-color,transform]
                duration-200

                hover:border-white/35
                hover:bg-white/[0.18]

                active:scale-95

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <X
                size={23}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* =================================================
              MOBILE LINKS
          ================================================== */}

          <nav
            aria-label="Mobile navigation"
            className="
              min-h-0
              flex-1

              overflow-y-auto
              overscroll-contain

              px-4
              pb-5
              pt-5

              min-[480px]:px-6

              [scrollbar-width:thin]
              [scrollbar-color:#E0A4B5_transparent]

              [&::-webkit-scrollbar]:w-1

              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-[#E0A4B5]
            "
          >
            {[
              {
                title:
                  "Properties & location",
                items: PRIMARY,
              },
              {
                title:
                  "News & resources",
                items: UPDATES,
              },
              {
                title:
                  "Company & support",
                items: [
                  ...MORE,
                  CONTACT,
                ],
              },
            ].map(
              (
                group,
                groupIndex,
              ) => (
                <section
                  key={group.title}
                  className={`
                    ${
                      groupIndex === 0
                        ? ""
                        : `
                          mt-5
                          border-t
                          border-[#EAD9DF]
                          pt-5
                        `
                    }
                  `}
                >
                  <h3
                    className="
                      mb-2

                      px-2

                      text-[12px]
                      font-semibold
                      uppercase
                      leading-5

                      tracking-[0.14em]

                      text-[#8F2946]
                    "
                  >
                    {group.title}
                  </h3>

                  <div className="space-y-1">
                    {group.items.map(
                      (item) => {
                        const isActive =
                          active(
                            item.path,
                          );

                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            aria-current={current(
                              item.path,
                            )}
                            onClick={() =>
                              closeMobile()
                            }
                            className={`
                              group

                              flex
                              min-h-[54px]

                              touch-manipulation

                              items-center
                              justify-between

                              gap-4

                              rounded-xl

                              px-3
                              py-3

                              text-[17px]
                              leading-6

                              transition-colors
                              duration-150

                              ${
                                isActive
                                  ? `
                                    bg-[#F3E7EC]

                                    font-semibold

                                    text-[#8F2946]
                                  `
                                  : `
                                    font-medium

                                    text-[#39252E]

                                    hover:bg-[#F7EEF1]

                                    active:bg-[#F3E7EC]
                                  `
                              }

                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-[#8F2946]
                              focus-visible:ring-inset

                              motion-reduce:transition-none
                            `}
                          >
                            <span className="min-w-0">
                              {item.title}
                            </span>

                            <ChevronRight
                              size={18}
                              strokeWidth={1.9}
                              aria-hidden="true"
                              className={`
                                shrink-0

                                ${
                                  isActive
                                    ? "text-[#8F2946]"
                                    : "text-[#7C6870]"
                                }

                                transition-transform
                                duration-200

                                group-hover:translate-x-0.5

                                motion-reduce:transform-none
                              `}
                            />
                          </Link>
                        );
                      },
                    )}
                  </div>
                </section>
              ),
            )}
          </nav>

          {/* =================================================
              MOBILE ENQUIRY
          ================================================== */}

          <div
            className="
              shrink-0

              border-t
              border-[#EAD9DF]

              bg-white

              px-4

              pb-[max(14px,env(safe-area-inset-bottom))]
              pt-3

              min-[480px]:px-6
            "
          >
            <p
              className="
                mb-2

                text-[14px]
                font-normal
                leading-5

                text-[#68565E]
              "
            >
              Let’s find a property that fits your plans.
            </p>

            {enquiry(
              `
                flex
                min-h-[50px]
                w-full

                items-center
                justify-center

                gap-2.5

                rounded-xl

                bg-[#8F2946]

                px-5
                py-3

                text-[17px]
                font-semibold
                leading-6

                text-white

                transition-[background-color,transform]
                duration-200

                hover:bg-[#742039]

                active:scale-[0.99]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
                motion-reduce:transition-none
              `,
              () =>
                closeMobile(),
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}