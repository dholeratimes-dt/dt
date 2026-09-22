

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

// import logo from "@/assets/DTLOGO.png";
// import { trackPageView } from "@/lib/fbpixel";

// /* ============================================================
//    MAIN NAVIGATION

//    Residential Projects removed for now
//    Bulk Land removed for now
//    Updates dropdown removed

//    Added directly:
//    - Dholera News
//    - Blogs & Insights
//    - Photo Gallery
// ============================================================ */

// const PRIMARY = [
//   {
//     title: "Home",
//     path: "/",
//   },
//   {
//     title: "Dholera SIR",
//     path: "/dholera-sir",
//   },
//   {
//     title: "Dholera News",
//     path: "/dholera-updates/latest-updates",
//   },
//   {
//     title: "Blogs & Insights",
//     path: "/dholera-updates/blogs",
//   },
//   {
//     title: "Photo Gallery",
//     path: "/gallery/dholera-sir-progress",
//   },
// ];

// /* ============================================================
//    MORE DROPDOWN
// ============================================================ */

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
//    NAVBAR
// ============================================================ */

// export default function Navbar({
//   whatsappNumber = "",
// }) {
//   const pathname = usePathname() || "/";
//   const uid = useId().replace(/:/g, "");

//   const [dropdown, setDropdown] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileVisible, setMobileVisible] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const closeTimerRef = useRef(null);
//   const frameRef = useRef(null);
//   const navRef = useRef(null);
//   const dialogRef = useRef(null);
//   const menuButtonRef = useRef(null);
//   const lastTrackedPath = useRef(null);

//   const isHome = pathname === "/";

//   /* ============================================================
//      ROUTE HELPERS
//   ============================================================ */

//   const active = (path) =>
//     pathname === path ||
//     pathname.startsWith(`${path}/`);

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
//     /^[1-9][0-9]{7,14}$/.test(number);

//   const whatsappMessage =
//     "Hello Dholera Times, I am interested in buying a plot in Dholera. Please share the available projects, pricing, location, and other details.";

//   const enquiryHref =
//     hasWhatsApp
//       ? `https://wa.me/${number}?text=${encodeURIComponent(
//           whatsappMessage,
//         )}`
//       : CONTACT.path;

//   /* ============================================================
//      CLOSE MOBILE MENU
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

//   /* ============================================================
//      OPEN MOBILE MENU
//   ============================================================ */

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
//      SCROLL
//   ============================================================ */

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(
//         window.scrollY > 24,
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
//      CLOSE DROPDOWN ON OUTSIDE CLICK
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
//      DESKTOP / MOBILE BREAKPOINT CLEANUP
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
//      WHATSAPP ENQUIRY
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
//      MORE DROPDOWN
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
//             event.key === "Escape" &&
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

//             tracking-[-0.01em]

//             text-white

//             transition-colors
//             duration-200

//             hover:text-[#F7DCE5]

//             focus-visible:outline-none
//             focus-visible:ring-2
//             focus-visible:ring-white
//             focus-visible:ring-offset-2
//             focus-visible:ring-offset-[#742039]

//             min-[1440px]:px-4

//             motion-reduce:transition-none
//           "
//         >
//           <span>{title}</span>

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

//               bg-[#F4D6DF]

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

//         {/* Dropdown */}
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

//               bg-white

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
//               Dholera Times
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
//                         setDropdown(null)
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

//                         transition-[background-color,transform]
//                         duration-200

//                         ${
//                           isActive
//                             ? "bg-[#F3E7EC]"
//                             : "hover:bg-[#FAF7F8]"
//                         }

//                         hover:translate-x-0.5

//                         focus-visible:outline-none
//                         focus-visible:ring-2
//                         focus-visible:ring-[#8F2946]
//                         focus-visible:ring-inset

//                         motion-reduce:transform-none
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

//     tracking-[-0.01em]

//     text-white

//     transition-colors
//     duration-200

//     hover:text-[#F7DCE5]

//     focus-visible:outline-none
//     focus-visible:ring-2
//     focus-visible:ring-white
//     focus-visible:ring-offset-2
//     focus-visible:ring-offset-[#742039]

//     min-[1440px]:px-4

//     motion-reduce:transition-none
//   `;

//   return (
//     <>
//       {/* ======================================================
//           NAVBAR
//       ====================================================== */}

//       <header
//         className={`
//           sticky
//           top-0
//           z-50

//           w-full

//           bg-gradient-to-r
//           from-[#39252E]
//           via-[#742039]
//           to-[#8F2946]

//           ${
//             scrolled
//               ? "shadow-[0_10px_30px_-16px_rgba(57,37,46,0.48)]"
//               : "shadow-[0_6px_20px_-16px_rgba(57,37,46,0.34)]"
//           }

//           ${
//             isHome
//               ? `
//                   -mb-[72px]
//                   min-[480px]:-mb-[76px]
//                   min-[1280px]:-mb-[80px]
//                 `
//               : ""
//           }

//           transition-shadow
//           duration-300

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
//             py-2

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

//               rounded-md

//               transition-transform
//               duration-200

//               hover:scale-[1.015]

//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-white
//               focus-visible:ring-offset-2
//               focus-visible:ring-offset-[#742039]

//               motion-reduce:transform-none
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

//                 drop-shadow-[0_3px_8px_rgba(32,16,22,0.28)]

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
//             {/* ===============================================
//                 DIRECT NAV LINKS

//                 Dholera SIR
//                 Dholera News
//                 Blogs & Insights
//                 Photo Gallery
//             ================================================ */}

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
//                       setDropdown(null)
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

//                         bg-[#F4D6DF]

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

//             {/* ===============================================
//                 ONLY MORE REMAINS AS DROPDOWN
//             ================================================ */}

//             {renderDropdown(
//               "more",
//               "More",
//               MORE,
//             )}

//             {/* =================================================
//                 CONTACT
//             ================================================== */}

//             {/* <Link
//               href={CONTACT.path}
//               aria-current={current(
//                 CONTACT.path,
//               )}
//               onClick={() =>
//                 setDropdown(null)
//               }
//               className={`
//                 ml-3

//                 inline-flex
//                 min-h-[46px]

//                 items-center
//                 justify-center

//                 whitespace-nowrap

//                 rounded-full

//                 border
//                 border-white/35

//                 bg-transparent

//                 px-5
//                 py-2.5

//                 text-[16px]
//                 font-semibold
//                 leading-6

//                 text-white

//                 transition-[background-color,border-color,color,transform,box-shadow]
//                 duration-200
//                 ease-out

//                 hover:-translate-y-px

//                 hover:border-white/60
//                 hover:bg-white/[0.10]
//                 hover:text-white

//                 hover:shadow-[0_6px_18px_rgba(35,14,22,0.14)]

//                 active:translate-y-0
//                 active:bg-white/[0.14]

//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-white
//                 focus-visible:ring-offset-2
//                 focus-visible:ring-offset-[#742039]

//                 ${
//                   active(
//                     CONTACT.path,
//                   )
//                     ? `
//                         border-white/65
//                         bg-white/[0.12]
//                         text-white
//                       `
//                     : ""
//                 }

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               `}
//             >
//               Contact us
//             </Link> */}
//           </nav>

//           {/* =================================================
//               MOBILE MENU ICON
//           ================================================== */}

//           <button
//             ref={menuButtonRef}
//             type="button"
//             aria-label="Open navigation"
//             aria-expanded={mobileOpen}
//             aria-controls={`${uid}-mobile`}
//             aria-haspopup="dialog"
//             onClick={openMobile}
//             className="
//               ml-auto

//               grid
//               h-11
//               w-11
//               shrink-0

//               touch-manipulation

//               place-items-center

//               text-white

//               transition-[color,transform]
//               duration-200

//               hover:text-[#F7DCE5]

//               active:scale-95

//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-white
//               focus-visible:ring-offset-2
//               focus-visible:ring-offset-[#742039]

//               min-[1280px]:hidden

//               motion-reduce:transform-none
//               motion-reduce:transition-none
//             "
//           >
//             <Menu
//               size={30}
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

//           backdrop:bg-[#39252E]/50

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
//               from-[#39252E]
//               via-[#742039]
//               to-[#8F2946]

//               px-4

//               pb-2
//               pt-[max(10px,env(safe-area-inset-top))]

//               shadow-[0_8px_24px_-18px_rgba(57,37,46,0.55)]

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

//                 rounded-md

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

//                   drop-shadow-[0_3px_8px_rgba(32,16,22,0.26)]
//                 "
//               />
//             </Link>

//             {/* =================================================
//                 CLOSE ICON
//             ================================================== */}

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

//                 touch-manipulation

//                 place-items-center

//                 text-white

//                 transition-[color,transform]
//                 duration-200

//                 hover:text-[#F7DCE5]

//                 active:scale-95

//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-white

//                 motion-reduce:transform-none
//                 motion-reduce:transition-none
//               "
//             >
//               <X
//                 size={29}
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
//                 title: "Dholera",
//                 items: PRIMARY,
//               },
//               {
//                 title: "Company & support",
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
//                             mt-5

//                             border-t
//                             border-[#EAD9DF]

//                             pt-5
//                           `
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
//                                       bg-[#F3E7EC]

//                                       font-semibold

//                                       text-[#8F2946]
//                                     `
//                                   : `
//                                       font-medium

//                                       text-[#39252E]

//                                       hover:bg-[#F7EEF1]

//                                       active:bg-[#F3E7EC]
//                                     `
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

//                 rounded-lg

//                 bg-gradient-to-r
//                 from-[#742039]
//                 to-[#8F2946]

//                 px-5
//                 py-3

//                 text-[17px]
//                 font-semibold
//                 leading-6

//                 text-white

//                 shadow-[0_7px_18px_rgba(116,32,57,0.18)]

//                 transition-[transform,box-shadow,filter]
//                 duration-200

//                 hover:-translate-y-0.5
//                 hover:brightness-105

//                 active:translate-y-0

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
   NAVIGATION
============================================================ */

const MAIN_LINKS = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dholera SIR",
    path: "/dholera-sir",
  },
  {
    title: "Dholera News",
    path: "/dholera-updates/latest-updates",
  },
  {
    title: "Blogs & Insights",
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
   NAVBAR
============================================================ */

export default function Navbar({
  whatsappNumber = "",
}) {
  const pathname = usePathname() || "/";
  const uid = useId().replace(/:/g, "");

  const [dropdown, setDropdown] =
    useState(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [
    mobileVisible,
    setMobileVisible,
  ] = useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const closeTimerRef =
    useRef(null);

  const frameRef = useRef(null);

  const navRef = useRef(null);

  const dialogRef = useRef(null);

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
     MOBILE OPEN / CLOSE
  ============================================================ */

  function closeMobile(
    restoreFocus = true,
  ) {
    cancelAnimationFrame(
      frameRef.current,
    );

    clearTimeout(
      closeTimerRef.current,
    );

    setMobileVisible(false);

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const delay =
      reduceMotion ? 0 : 250;

    closeTimerRef.current =
      setTimeout(() => {
        dialogRef.current?.close();

        setMobileOpen(false);

        if (
          restoreFocus &&
          menuButtonRef.current
            ?.getClientRects()
            .length
        ) {
          menuButtonRef.current.focus();
        }
      }, delay);
  }

  function openMobile() {
    clearTimeout(
      closeTimerRef.current,
    );

    cancelAnimationFrame(
      frameRef.current,
    );

    setDropdown(null);
    setMobileVisible(false);

    if (
      !dialogRef.current?.open
    ) {
      dialogRef.current?.showModal();
    }

    setMobileOpen(true);

    frameRef.current =
      requestAnimationFrame(() => {
        frameRef.current =
          requestAnimationFrame(
            () => {
              setMobileVisible(
                true,
              );
            },
          );
      });
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

    dialogRef.current?.close();

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
     BODY LOCK
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
     CLOSE DROPDOWN OUTSIDE
  ============================================================ */

  useEffect(() => {
    if (!dropdown) return;

    const dismiss = (event) => {
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

        dialogRef.current?.close();

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
     MORE DROPDOWN
  ============================================================ */

  const renderMoreDropdown = () => {
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
          <span>More</span>

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
    focus-visible:ring-offset-[#742039]

    min-[1440px]:px-4
  `;

  return (
    <>
      {/* =====================================================
          HEADER

          PHONE:
          Navbar overlaps hero exactly as before.

          >= MD:
          Normal document flow.
          No overlap and no blank compensation area.
      ====================================================== */}

      <header
        className={`
          sticky
          top-0
          z-50

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

          {/* DESKTOP */}

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

                ${
                  active(
                    CONTACT.path,
                  )
                    ? "border-white/65 bg-white/10"
                    : ""
                }
              `}
            >
              Contact us
            </Link>
          </nav>

          {/* MOBILE MENU */}

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open navigation"
            aria-expanded={
              mobileOpen
            }
            aria-controls={`${uid}-mobile`}
            onClick={openMobile}
            className="
              ml-auto

              grid
              h-11
              w-11

              place-items-center

              text-white

              min-[1280px]:hidden

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
            "
          >
            <Menu
              size={30}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAV
      ====================================================== */}

      <dialog
        ref={dialogRef}
        id={`${uid}-mobile`}
        onCancel={(event) => {
          event.preventDefault();

          closeMobile();
        }}
        onClose={() => {
          setMobileOpen(false);
          setMobileVisible(false);
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

          backdrop:bg-[#39252E]/50

          transition-[transform,opacity]
          duration-[250ms]

          ${
            mobileVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }
        `}
      >
        <div className="flex h-full flex-col">
          {/* MOBILE HEADER */}

          <div
            className="
              flex
              min-h-[72px]
              shrink-0

              items-center
              justify-between

              bg-gradient-to-r
              from-[#39252E]
              via-[#742039]
              to-[#8F2946]

              px-4

              min-[480px]:px-6
            "
          >
            <Link
              href="/"
              onClick={() =>
                closeMobile()
              }
              aria-label="Dholera Times home"
            >
              <Image
                src={logo}
                alt="Dholera Times"
                width={150}
                height={150}
                className="
                  h-11
                  w-auto

                  object-contain
                "
              />
            </Link>

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() =>
                closeMobile()
              }
              className="
                grid
                h-11
                w-11

                place-items-center

                text-white

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              "
            >
              <X
                size={29}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* LINKS */}

          <nav
            className="
              min-h-0
              flex-1

              overflow-y-auto

              px-4
              py-5

              min-[480px]:px-6
            "
          >
            <div className="space-y-1">
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
                      onClick={() =>
                        closeMobile()
                      }
                      className={`
                        flex
                        min-h-[54px]

                        items-center
                        justify-between

                        rounded-xl

                        px-3
                        py-3

                        text-[17px]

                        ${
                          isActive
                            ? "bg-[#F3E7EC] font-semibold text-[#8F2946]"
                            : "font-medium text-[#39252E] hover:bg-[#F7EEF1]"
                        }
                      `}
                    >
                      {
                        item.title
                      }

                      <ChevronRight
                        size={18}
                        aria-hidden="true"
                      />
                    </Link>
                  );
                },
              )}
            </div>

            <div
              className="
                mt-5

                border-t
                border-[#EAD9DF]

                pt-5
              "
            >
              <p
                className="
                  mb-2

                  px-2

                  text-[12px]
                  font-semibold
                  uppercase

                  tracking-[0.14em]

                  text-[#8F2946]
                "
              >
                More
              </p>

              <div className="space-y-1">
                {MORE.map(
                  (item) => (
                    <Link
                      key={
                        item.path
                      }
                      href={
                        item.path
                      }
                      onClick={() =>
                        closeMobile()
                      }
                      className="
                        flex
                        min-h-[54px]

                        items-center
                        justify-between

                        rounded-xl

                        px-3
                        py-3

                        text-[17px]
                        font-medium

                        text-[#39252E]

                        hover:bg-[#F7EEF1]
                      "
                    >
                      {
                        item.title
                      }

                      <ChevronRight
                        size={18}
                        aria-hidden="true"
                      />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </nav>

          {/* MOBILE CTA */}

          <div
            className="
              shrink-0

              border-t
              border-[#EAD9DF]

              bg-white

              p-4

              min-[480px]:px-6
            "
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
                closeMobile()
              }
              className="
                flex
                min-h-[50px]
                w-full

                items-center
                justify-center

                gap-2.5

                rounded-lg

                bg-gradient-to-r
                from-[#742039]
                to-[#8F2946]

                px-5
                py-3

                text-[16px]
                font-semibold

                text-white
              "
            >
              {hasWhatsApp && (
                <FaWhatsapp
                  size={21}
                  aria-hidden="true"
                />
              )}

              Enquire now
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}