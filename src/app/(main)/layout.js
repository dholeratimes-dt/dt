"use client";
import { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import "./globals.css";
import logo from "@/assets/dt.webp";
import logo2 from "@/assets/dtlogobg.png";
import Image from "next/image";
import Footer from "./components/Footer";
import FloatingIcons from "./components/Floating";
import { usePathname } from "next/navigation";
import { initFacebookPixel, trackPageView } from "@/lib/fbpixel";
import call from "@/assets/call.svg";
import Script from "next/script";
import ScrollToTop from "./components/ScrollToTop";

const FACEBOOK_PIXEL_ID = "672210205737825"; // Replace with your actual Pixel ID

import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isMobileBlogsOpen, setIsMobileBlogsOpen] = useState(false);
  const [isDholeraDropdownOpen, setIsDholeraDropdownOpen] = useState(false);
  const [isMobileDholeraOpen, setIsMobileDholeraOpen] = useState(false);

  //PIXEL
  const pathname = usePathname();

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  const handleCallClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "call_click_organic",
        lead_type: "call",
        device: window.innerWidth <= 768 ? "mobile" : "desktop",
      });

      window.location.href = "tel:+919958993549";
    }
  };

  // Refs for dropdown elements
  const blogsDropdownRef = useRef(null);
  const projectsDropdownRef = useRef(null);
  const menuOpenRef = useRef(null);
  const desktopMenuRef = useRef(null);
  const dholeraDropdownRef = useRef(null);

  const toggleBlogsDropdown = () => {
    setIsBlogsDropdownOpen(!isBlogsDropdownOpen);
    setIsProjectsDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setIsProjectsDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    closeAllDropdowns();
  };

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  const toggleMobileBlogsDropdown = () => {
    setIsMobileBlogsOpen(!isMobileBlogsOpen);
    // Close other mobile dropdowns
    setIsMobileDholeraOpen(false);
  };

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    function handleClickOutside(event) {
      // Close blogs dropdown if click is outside
      if (
        blogsDropdownRef.current &&
        !blogsDropdownRef.current.contains(event.target)
      ) {
        setIsBlogsDropdownOpen(false);
      }

      // Close projects dropdown if click is outside
      if (
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target)
      ) {
        setIsProjectsDropdownOpen(false);
      }
      if (menuOpenRef.current && !menuOpenRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target)
      ) {
        setIsDesktopMenuOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dholeraDropdownRef.current &&
        !dholeraDropdownRef.current.contains(event.target)
      ) {
        setIsDholeraDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* script tags */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-NLL6M3PL"
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7TB2TDXYX0"
        ></Script>

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || []; 
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-7TB2TDXYX0'); 
            `,
          }}
        />

        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NLL6M3PL');
            `,
          }}
        />

        <Script type="text/javascript" strategy="afterInteractive">
          {`
              (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qvr31wn09g");
        `}
        </Script>

        <meta
          name="google-site-verification"
          content="w4B8pqZZDySMLUmxZYsGxeKSCsTI_aHk-myN3iKS3CU"
        />
      </head>

      <body className={inter.className}>
        <ScrollToTop />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLL6M3PL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <nav className="fixed z-40 w-full max-sm:pt-2 max-sm:pb-2 pt-4 pb-4 bg-[#151f28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 max-sm:h-16 items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Dholera Times Logo"
                    width={150}
                    height={150}
                    className="h-16 w-auto max-sm:h-16"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {/* Main 5 navigation items */}
                <div className="flex items-baseline space-x-1">
                  {/* Home with hover card */}

                  <div className="relative group" ref={projectsDropdownRef}>
                    <button className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1">
                      <Link href="/dholera-residential-plots">Residential</Link>
                    </button>
                  </div>

                  <div className="relative group">
                    <Link
                      href="/bulk-land"
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 block"
                    >
                      Bulk Land
                    </Link>
                  </div>

                  {/* Dholera SIR with hover card and dropdown */}
                  <div className="relative group" ref={dholeraDropdownRef}>
                    <button className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1">
                      <Link href="/dholera-sir">Dholera SIR</Link>
                    </button>
                  </div>

                  {/* Dholera Updates with hover card and dropdown */}
                  <div className="relative group" ref={blogsDropdownRef}>
                    <button
                      onClick={toggleBlogsDropdown}
                      className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1"
                    >
                      <p>Dholera Updates</p>
                      <ChevronDown
                        className={`h-4 w-4 text-white transition-transform duration-300 ${
                          isBlogsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Hover card */}

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {isBlogsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl z-50 border border-gray-100 overflow-hidden"
                        >
                          {[
                            {
                              title: "Latest News",
                              path: "/dholera-updates/latest-updates",
                            },
                            { title: "Blogs", path: "/dholera-updates/blogs" },
                          ].map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                              onClick={() => setIsBlogsDropdownOpen(false)}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bulk Land with hover card */}

                  <div className="relative group">
                    <div>
                      <Link
                        className="text-white flex justify-center items-center hover:bg-white/10 px-4 py-2 rounded-lg"
                        href="/contact/inquiry"
                      >
                        <span>Contact Us</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop hamburger menu for other items */}
                <div className="relative ml-4" ref={desktopMenuRef}>
                  <button
                    onClick={toggleDesktopMenu}
                    className="text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <AnimatePresence>
                    {isDesktopMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl z-50 border border-gray-100 overflow-hidden"
                      >
                        <Link
                          href="/gallery/dholera-sir-progress"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Gallery
                        </Link>
                        <Link
                          href="/about"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          About Us
                        </Link>

                        <Link
                          href="/nri-investment-guide-dholera"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          NRI Guide
                        </Link>
                        <Link
                          href="/channel-partner"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          Channel Partner
                        </Link>

                        {/* Contact Dropdown in Desktop Menu */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center gap-4">
                <div
                  onClick={handleCallClick}
                  className="text-[#d8b66d] mt-3 animate-bounce duration-2000 flex items-center space-x-2 cursor-pointer"
                >
                  <Image
                    src={call}
                    alt="call"
                    height={30}
                    width={30}
                    className="animate-image-tint"
                  />
                  <p className="animate-color-change">Call Now</p>
                </div>

                <button onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-white" />
                  ) : (
                    <Menu className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                ref={menuOpenRef}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-md fixed top-0 left-0 w-full h-screen z-50 p-6 overflow-y-auto"
              >
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Image
                      src={logo2}
                      alt="Dholera Times Logo"
                      width={120}
                      height={120}
                    />
                  </Link>
                  <button onClick={toggleMenu}>
                    <X className="h-8 w-8 text-white" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {/* Dholera SIR Dropdown */}
                  <div className="rounded-xl overflow-hidden">
                    <Link
                      href="/dholera-sir"
                      className="flex items-center justify-between text-white text-lg py-4 px-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="ml-2">Dholera SIR</span>
                    </Link>
                  </div>

                  {/* Projects Dropdown */}
                  <div className="rounded-xl overflow-hidden">
                    <Link
                      href="/dholera-residential-plots"
                      className="flex items-center justify-between text-white text-lg py-4 px-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="ml-2">Projects</span>
                    </Link>
                  </div>

                  {/* Dholera Updates Dropdown */}
                  <div className="rounded-xl overflow-hidden">
                    <div
                      className="flex items-center justify-between text-white text-lg py-4 px-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
                      onClick={toggleMobileBlogsDropdown}
                    >
                      <span className="ml-2">Dholera Updates</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isMobileBlogsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {isMobileBlogsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="bg-white/5 overflow-hidden"
                        >
                          {[
                            {
                              title: "Latest News",
                              path: "/dholera-updates/latest-updates",
                            },
                            { title: "Blogs", path: "/dholera-updates/blogs" },
                          ].map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              className="block text-white/80 py-3 px-8 hover:bg-white/10 hover:text-white transition-all duration-200"
                              onClick={() => {
                                setIsMobileBlogsOpen(false);
                                setIsMenuOpen(false); // Added this line
                              }}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/bulk-land"
                    className="flex items-center text-white text-lg py-4 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-2">Bulk Land</span>
                  </Link>

                  <Link
                    href="/gallery/dholera-sir-progress"
                    className="flex items-center text-white text-lg py-4 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-2">Gallery</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center text-white text-lg py-4 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-2">About Us</span>
                  </Link>

                  <Link
                    href="/nri-investment-guide-dholera"
                    className="flex items-center text-white text-lg py-4 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="ml-2">NRI Guide</span>
                  </Link>

                  {/* Contact Dropdown */}
                  <div className="rounded-xl overflow-hidden">
                    <Link
                      href="/contact/inquiry"
                      className="flex items-center justify-between text-white text-lg py-4 px-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="ml-2">Contact Us</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Link href="/sitemap.xml" className="hidden">
            sitemap
          </Link>
        </nav>

        <div className="pt-20">{children}</div>
        <FloatingIcons />
        <Footer />

        {/* <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6979ed82b886b819814ace2e/1jg24fhng';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        /> */}
      </body>
    </html>
  );
}
