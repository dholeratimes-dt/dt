"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

/* ============================================================
   ROUTES
============================================================ */

const SANITY_CONTENT_ROUTES = [
  "/dholera-sir",
  "/dholera-updates/blogs",
  "/dholera-updates/latest-updates",
];

/* ============================================================
   FOOTER
============================================================ */

export default function Footer() {
  const pathname = usePathname();

  const showProjectLinks =
    SANITY_CONTENT_ROUTES.some(
      (route) =>
        pathname === route ||
        pathname?.startsWith(
          `${route}/`,
        ),
    );

  /* ==========================================================
     SHARED STYLES
  ========================================================== */

  const headingWrapperClass = `
    w-full

    border-b
    border-white/15

    pb-3
  `;

  const headingClass = `
    text-[17px]
    font-semibold
    leading-6

    tracking-[-0.015em]

    text-white

    sm:text-[18px]
  `;

  const linkClass = `
    group

    inline-flex
    min-h-[40px]

    items-center

    text-[14px]
    font-normal
    leading-6

    text-[#F6E9ED]

    transition-[color,transform]
    duration-200

    hover:translate-x-0.5
    hover:text-white

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#F0CED8]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#8F2946]

    sm:text-[15px]

    motion-reduce:transform-none
    motion-reduce:transition-none
  `;

  const contactLinkClass = `
    group

    flex
    min-h-[44px]
    w-full

    items-center

    gap-3

    text-[14px]
    font-medium
    leading-6

    text-[#FFF8FA]

    transition-colors
    duration-200

    hover:text-white

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#F0CED8]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#8F2946]

    sm:text-[15px]

    motion-reduce:transition-none
  `;

  const socialClass = `
    inline-flex

    h-11
    w-11
    shrink-0

    items-center
    justify-center

    rounded-full

    border
    border-white/15

    bg-white/[0.08]

    text-white

    shadow-[0_4px_14px_rgba(57,37,46,0.10)]

    transition-[background-color,border-color,color,transform,box-shadow]
    duration-200

    hover:-translate-y-0.5
    hover:border-white
    hover:bg-white
    hover:text-[#8F2946]

    hover:shadow-[0_8px_20px_rgba(57,37,46,0.16)]

    active:translate-y-0

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-white
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#8F2946]

    motion-reduce:transform-none
    motion-reduce:transition-none
  `;

  /* ==========================================================
     SOCIAL LINKS
  ========================================================== */

  const SocialLinks = () => (
    <div
      className="
        flex
        flex-wrap

        items-center

        gap-3
      "
    >
      {/* FACEBOOK */}

      <a
        href="https://www.facebook.com/share/19FvyusnzA/"
        aria-label="Facebook"
        target="_blank"
        rel="noopener noreferrer"
        className={socialClass}
      >
        <svg
          className="h-[17px] w-[17px]"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      {/* INSTAGRAM */}

      <a
        href="https://www.instagram.com/dholeratimesofficial/"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
        className={socialClass}
      >
        <svg
          className="h-[17px] w-[17px]"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      {/* X / TWITTER */}

      <a
        href="https://x.com/dholeratimes"
        aria-label="X"
        target="_blank"
        rel="noopener noreferrer"
        className={socialClass}
      >
        <svg
          className="h-[16px] w-[16px]"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      </a>

      {/* LINKEDIN */}

      <a
        href="https://www.linkedin.com/company/dholera-times"
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        className={socialClass}
      >
        <svg
          className="h-[17px] w-[17px]"
          fill="currentColor"
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56c3.97,0,7.19,2.73,7.19,8.26V39z" />
        </svg>
      </a>
    </div>
  );

  /* ==========================================================
     FOOTER UI
  ========================================================== */

  return (
    <footer
      className="
        relative
        overflow-hidden

        bg-gradient-to-br
        from-[#612033]
        via-[#8F2946]
        to-[#A83657]

        text-[#F7E9ED]

        selection:bg-white
        selection:text-[#8F2946]
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND DEPTH
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-gradient-to-b
          from-white/[0.025]
          via-transparent
          to-[#4B1828]/20
        "
      />

      {/* =====================================================
          MAIN FOOTER CONTENT
      ====================================================== */}

      <div
        className="
          relative

          mx-auto
          w-full
          max-w-7xl

          px-4
          py-9

          min-[414px]:px-5
          min-[414px]:py-10

          sm:px-6
          sm:py-11

          md:px-8

          lg:py-14
        "
      >
        <div
          className="
            grid
            grid-cols-1

            gap-y-9

            sm:grid-cols-2
            sm:gap-x-10
            sm:gap-y-11

            lg:grid-cols-[1.55fr_0.8fr_0.9fr_1fr]
            lg:items-start
            lg:gap-x-12
            lg:gap-y-0

            xl:grid-cols-[1.6fr_0.8fr_0.9fr_1.05fr]
            xl:gap-x-16
          "
        >
          {/* =================================================
              FOLLOW US
              PHONE -> FIRST
              TABLET / DESKTOP -> FOURTH
          ================================================== */}

          <section
            className="
              order-1
              min-w-0

              sm:order-4

              lg:pl-2
            "
          >
            <div className={headingWrapperClass}>
              <h2 className={headingClass}>
                Follow Us
              </h2>
            </div>

            <div className="mt-4">
              <SocialLinks />
            </div>

            {showProjectLinks && (
              <div className="mt-8">
                <h3
                  className="
                    text-[16px]
                    font-semibold
                    leading-6

                    text-white

                    sm:text-[17px]
                  "
                >
                  Projects
                </h3>

                <ul className="mt-3 space-y-0.5">
                  <li>
                    <Link
                      href="/dholera-residential-plots/westwyn-residency"
                      className={linkClass}
                    >
                      WestWyn Residency
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/dholera-residential-plots/westwyn-estate"
                      className={linkClass}
                    >
                      WestWyn Estates
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/dholera-residential-plots/westwyn-county"
                      className={linkClass}
                    >
                      WestWyn County
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </section>

          {/* =================================================
              CONTACT US
              PHONE -> SECOND
              TABLET / DESKTOP -> FIRST
          ================================================== */}

          <section
            className="
              order-2
              min-w-0

              sm:order-1
            "
          >
            <div className={headingWrapperClass}>
              <h2 className={headingClass}>
                Contact Us
              </h2>
            </div>

            <div className="mt-4">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  leading-5

                  tracking-[0.14em]

                  text-[#F0CED8]

                  sm:text-[12px]
                "
              >
                Head Office
              </p>

              <address
                className="
                  mt-2
                  max-w-[410px]

                  not-italic

                  text-[14px]
                  leading-[1.7]

                  text-[#FFF8FA]

                  sm:text-[15px]
                "
              >
                CGJ - 194, Dlf Capital Greens,
                Shivaji Marg, Karampura Industrial
                Area, Karam Pura, Delhi - 110015,
                India
              </address>
            </div>

            <div className="mt-5 space-y-2 sm:mt-6">
              <a
                href="tel:+919958993549"
                className={contactLinkClass}
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-white/[0.08]

                    text-[#F4CFDA]
                  "
                >
                  <FaPhoneAlt
                    aria-hidden="true"
                    className="h-[13px] w-[13px]"
                  />
                </span>

                <span className="leading-none">
                  +91 99589 93549
                </span>
              </a>

              <a
                href="mailto:info@dholeratimes.com"
                className={contactLinkClass}
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-white/[0.08]

                    text-[#F4CFDA]
                  "
                >
                  <FaEnvelope
                    aria-hidden="true"
                    className="h-[13px] w-[13px]"
                  />
                </span>

                <span className="min-w-0 break-words leading-none">
                  info@dholeratimes.com
                </span>
              </a>
            </div>
          </section>

          {/* =================================================
              USEFUL LINKS
              PHONE -> THIRD
              DESKTOP -> SECOND
          ================================================== */}

          <section
            className="
              order-3
              min-w-0

              sm:order-2
            "
          >
            <div className={headingWrapperClass}>
              <h2 className={headingClass}>
                Quick Links
              </h2>
            </div>

            <ul className="mt-4 space-y-0.5">
              <li>
                <Link
                  href="/dholera-sir"
                  className={linkClass}
                >
                  Dholera SIR
                </Link>
              </li>

              <li>
                <Link
                  href="/dholera-updates/latest-updates"
                  className={linkClass}
                >
                  Latest News
                </Link>
              </li>

              <li>
                <Link
                  href="/dholera-updates/blogs"
                  className={linkClass}
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={linkClass}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact/inquiry"
                  className={linkClass}
                >
                  Contact Us
                </Link>
              </li>

             
            </ul>
          </section>

          {/* =================================================
              SUPPORT
              PHONE -> FOURTH
              DESKTOP -> THIRD
          ================================================== */}

          <section
            className="
              order-4
              min-w-0

              sm:order-3
            "
          >
            <div className={headingWrapperClass}>
              <h2 className={headingClass}>
                Polices
              </h2>
            </div>

            <ul className="mt-4 space-y-0.5">
             

              <li>
                <Link
                  href="/policies/privacy"
                  className={linkClass}
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policies/termsandconditions"
                  className={linkClass}
                >
                  Terms &amp; Conditions
                </Link>
              </li>

              
            </ul>
          </section>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}

      <div
        className="
          relative

          bg-[#5F1B31]/55

          backdrop-blur-sm
        "
      >
        <div
          className="
            mx-auto

            flex
            min-h-[54px]
            w-full
            max-w-7xl

            items-center
            justify-center

            px-4
            py-3

            min-[414px]:px-5

            sm:px-6

            md:px-8
          "
        >
          <p
            className="
              text-center

              text-[12px]
              font-normal
              leading-5

              text-[#F3DFE5]

              sm:text-[13px]
            "
          >
            &copy;{" "}
            {new Date().getFullYear()}{" "}
            Dholera Times. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}