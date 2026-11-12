"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { usePathname } from "next/navigation";
import useRecaptcha from "@/hooks/useRecaptcha";
import { AUTO_POPUP_PAGES, AUTO_POPUP_SCROLL_PERCENT } from "./popupTriggers";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Phone,
  UserRound,
  X,
} from "lucide-react";

import { createPortal } from "react-dom";

/* ============================================================
   PAGES WHERE AUTO POPUP SHOULD WORK

   Add/remove your page URLs here.
============================================================ */

/* ============================================================
   POPUP FORM
============================================================ */

export default function PopupForm({ initiallyOpen = false }) {
  const pathname = usePathname() || "/";

  /* ============================================================
     CHECK CURRENT PAGE
  ============================================================ */

  const shouldAutoOpenPopup =
    AUTO_POPUP_PAGES.includes(pathname);

  /* ============================================================
     STATES
  ============================================================ */

  
  const [
    showFormPopup,
    setShowFormPopup,
  ] = useState(initiallyOpen);

  const [
    showThankYou,
    setShowThankYou,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    isMounted,
    setIsMounted,
  ] = useState(false);

  /* ============================================================
     REFS
  ============================================================ */

  const submittingRef = useRef(false);
  const { recaptchaRef, loadRecaptcha, verifyRecaptcha, resetRecaptcha } =
    useRecaptcha(showFormPopup);

  /*
   * This tracks whether the popup has already
   * appeared during the CURRENT page visit.
   *
   * IMPORTANT:
   * We reset this every time pathname changes.
   */

  const popupShownForCurrentVisitRef =
    useRef(false);

  /* ============================================================
     CLIENT MOUNT
  ============================================================ */

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ============================================================
     RESET POPUP WHEN USER CHANGES PAGE

     Example:

     Home
        ↓
     Dholera SIR
        ↓
     Blogs

     Every pathname change starts a NEW popup visit.
  ============================================================ */

  useEffect(() => {
    /*
     * Allow popup again on the new page.
     */

    popupShownForCurrentVisitRef.current =
      initiallyOpen;

    /*
     * Reset popup state.
     */

    setShowFormPopup(initiallyOpen);

    setShowThankYou(false);

    setErrorMessage("");

    setIsLoading(false);
  }, [pathname, initiallyOpen]);

  /* ============================================================
     MANUAL BUTTON TRIGGER

     Any button can still open the popup using:

     data-open-dholera-popup
  ============================================================ */

  useEffect(() => {
    const handleExternalPopupOpen = (
      event,
    ) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trigger = target.closest(
        "[data-open-dholera-popup]",
      );

      if (!trigger) {
        return;
      }

      /*
       * Mark popup as already shown during
       * this page visit.
       *
       * This prevents the 35% scroll popup
       * from appearing again after the user
       * already manually opened it.
       */

      popupShownForCurrentVisitRef.current =
        true;

      setShowThankYou(false);

      setErrorMessage("");

      setIsLoading(false);

      setShowFormPopup(true);
    };

    document.addEventListener(
      "click",
      handleExternalPopupOpen,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleExternalPopupOpen,
      );
    };
  }, []);

  /* ============================================================
     AUTO POPUP

     REQUIREMENT:

     - Only selected URLs
     - Opens at 35% scroll
     - Once during CURRENT page visit
     - Navigate to another page = reset
     - Return to previous page = reset
     - NO sessionStorage
     - NO localStorage
  ============================================================ */

  useEffect(() => {
    /*
     * Don't enable automatic popup
     * for URLs not included above.
     */

    if (!shouldAutoOpenPopup) {
      return;
    }

    /* ==========================================================
       SCROLL HANDLER
    =========================================================== */

    const handleScroll = () => {
      /*
       * Popup already appeared during
       * this page visit.
       */

      if (
        popupShownForCurrentVisitRef.current
      ) {
        return;
      }

      /* ========================================================
         CURRENT SCROLL POSITION
      ======================================================== */

      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;

      /* ========================================================
         TOTAL SCROLLABLE HEIGHT
      ======================================================== */

      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      /* ========================================================
         SCROLL PERCENTAGE
      ======================================================== */

      const scrollPercent =
        documentHeight > 0
          ? (scrollTop / documentHeight) *
            100
          : 0;

      /* ========================================================
         OPEN POPUP AT 35%
      ======================================================== */

      if (scrollPercent >= AUTO_POPUP_SCROLL_PERCENT) {
        /*
         * Mark popup as shown ONLY for
         * this current page visit.
         */

        popupShownForCurrentVisitRef.current =
          true;

        setShowThankYou(false);

        setErrorMessage("");

        setIsLoading(false);

        setShowFormPopup(true);

        /*
         * Popup has appeared.
         * No reason to keep checking
         * scroll on this visit.
         */

        window.removeEventListener(
          "scroll",
          handleScroll,
        );
      }
    };

    /* ==========================================================
       START LISTENING
    =========================================================== */

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    /* ==========================================================
       CLEANUP WHEN PAGE CHANGES
    =========================================================== */

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, [
    pathname,
    shouldAutoOpenPopup,
  ]);

  /* ============================================================
     LOAD RECAPTCHA
  ============================================================ */

  useEffect(() => {
    if (showFormPopup) loadRecaptcha().catch(() => {});
  }, [showFormPopup, loadRecaptcha]);

  /* ============================================================
     CLOSE POPUP
  ============================================================ */

  const handlePopupClose = () => {
    setShowFormPopup(false);

    setShowThankYou(false);

    setErrorMessage("");

    setIsLoading(false);
  };

  /* ============================================================
     ESC KEY CLOSE
  ============================================================ */

  useEffect(() => {
    if (!showFormPopup) {
      return;
    }

    const handleEscapeKey = (
      event,
    ) => {
      if (event.key === "Escape") {
        handlePopupClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscapeKey,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [showFormPopup]);

  /* ============================================================
     BODY SCROLL LOCK
  ============================================================ */

  useEffect(() => {
    if (!showFormPopup) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [showFormPopup]);

  /* ============================================================
     FORM CHANGE
  ============================================================ */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,

        [name]: value,
      }),
    );

    setErrorMessage("");
  };

  /* ============================================================
     VALIDATION
  ============================================================ */

  const validateForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.mobileNumber.trim()
    ) {
      setErrorMessage(
        "Please fill in all required fields",
      );

      return false;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email,
      )
    ) {
      setErrorMessage(
        "Please enter a valid email address",
      );

      return false;
    }

    const normalizedPhone =
      formData.mobileNumber.replace(
        /\D/g,
        "",
      );

    if (
      !/^\d{10,15}$/.test(
        normalizedPhone,
      )
    ) {
      setErrorMessage(
        "Please enter a valid mobile number (10-15 digits)",
      );

      return false;
    }

    return true;
  };

  /* ============================================================
     FORM SUBMIT
  ============================================================ */

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    setErrorMessage("");
    if (!validateForm()) return;

    submittingRef.current = true;
    setIsLoading(true);

    try {
      const token = await verifyRecaptcha();
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            name: formData.fullName.trim(),
            phone: formData.mobileNumber.replace(/\D/g, ""),
            email: formData.email.trim(),
            source: "Dholera Times",
          },
          source: "Dholera Times",
          tags: ["Dholera Investment", "Popup Lead", "Dholera Times"],
          recaptchaToken: token,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error submitting form. Please try again.");
      }

      setFormData({ fullName: "", mobileNumber: "", email: "" });
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setShowFormPopup(false);
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message || "Error submitting form. Please try again.");
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
      resetRecaptcha();
    }
  };

  /* ============================================================
     BACKDROP CLICK
  ============================================================ */

  const handleBackdropClick = (
    event,
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      handlePopupClose();
    }
  };

  /* ============================================================
     WAIT UNTIL CLIENT
  ============================================================ */

  if (!isMounted) {
    return null;
  }

  /* ============================================================
     KEEP YOUR EXISTING createPortal UI FROM HERE

     return createPortal(...)
  ============================================================ */

  return createPortal(
    <AnimatePresence>
      {showFormPopup && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={
            handleBackdropClick
          }
          className="
            fixed
            inset-0

            z-[10000]

            flex

            min-h-[100dvh]
            w-screen

            items-center
            justify-center

            overflow-y-auto

            bg-black/70

            px-4
            py-6

            backdrop-blur-[3px]

            sm:px-6
            sm:py-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 15,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="dholera-popup-heading"
            className="
              relative

              my-auto

              w-full
              max-w-[430px]

              overflow-visible

              rounded-[18px]

              border
              border-black/10

              bg-white

              px-5
              pb-6
              pt-7

              text-left

              shadow-[0_28px_100px_rgba(0,0,0,0.38)]

              min-[400px]:px-6

              sm:max-w-[440px]
              sm:px-6
              sm:pb-7
              sm:pt-8
            "
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={
                handlePopupClose
              }
              aria-label="Close popup"
              className="
                absolute
                right-4
                top-4

                z-20

                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                border
                border-black/10

                bg-black/[0.035]

                text-black/60

                transition-all
                duration-200

                hover:rotate-90
                hover:border-[#EC1C40]/20
                hover:bg-[#EC1C40]/10
                hover:text-[#EC1C40]
              "
            >
              <X
                size={18}
                strokeWidth={2}
              />
            </button>

            {/* THANK YOU */}

            {showThankYou ? (
              <div
                className="
                  flex
                  min-h-[260px]
                  flex-col

                  items-center
                  justify-center

                  px-4

                  text-center
                "
              >
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="
                    mb-5

                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-full

                    bg-[#EC1C40]/10
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="
                      h-7
                      w-7

                      text-[#EC1C40]
                    "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <h3
                  className="
                    text-[24px]
                    font-bold

                    text-black
                  "
                >
                  Thank You!
                </h3>

                <p
                  className="
                    mt-2

                    text-[14px]
                    leading-6

                    text-black/60
                  "
                >
                  We will contact you
                  shortly.
                </p>
              </div>
            ) : (
              <>
                {/* HEADING */}

                <div
                  className="
                    mb-6
                    pr-10
                  "
                >
                  <h2
                    id="dholera-popup-heading"
                    className="
                      max-w-[360px]

                      text-[23px]
                      font-bold
                      leading-[1.25]

                      tracking-[-0.035em]

                      text-black

                      min-[400px]:text-[24px]

                      sm:text-[25px]
                    "
                  >
                    Registry Ready Plots
                    in Dholera Starting
                    from ₹10 Lakh
                  </h2>
                </div>

                {/* FORM */}

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="w-full"
                >
                  {/* ERROR */}

                  {errorMessage && (
                    <div
                      className="
                        mb-4

                        rounded-lg

                        border
                        border-[#EC1C40]/20

                        bg-[#EC1C40]/5

                        px-4
                        py-3

                        text-[13px]
                        font-medium

                        text-[#EC1C40]
                      "
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* NAME */}

                    <div className="relative">
                      <UserRound
                        size={20}
                        strokeWidth={1.7}
                        className="
                          pointer-events-none

                          absolute
                          left-4
                          top-1/2

                          -translate-y-1/2

                          text-black/40
                        "
                      />

                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={
                          formData.fullName
                        }
                        onChange={
                          handleChange
                        }
                        required
                        autoComplete="name"
                        placeholder="Enter your full name"
                        className="
                          h-[54px]
                          w-full

                          rounded-[10px]

                          border
                          border-black/15

                          bg-white

                          py-3
                          pl-12
                          pr-4

                          text-[15px]

                          text-black

                          outline-none

                          placeholder:text-black/40

                          focus:border-[#EC1C40]

                          focus:shadow-[0_0_0_3px_rgba(236,28,64,0.08)]

                          sm:h-[56px]
                          sm:text-[16px]
                        "
                      />
                    </div>

                    {/* PHONE */}

                    <div className="relative">
                      <Phone
                        size={20}
                        strokeWidth={1.7}
                        className="
                          pointer-events-none

                          absolute
                          left-4
                          top-1/2

                          -translate-y-1/2

                          text-black/40
                        "
                      />

                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={
                          formData.mobileNumber
                        }
                        onChange={
                          handleChange
                        }
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Enter your phone number"
                        className="
                          h-[54px]
                          w-full

                          rounded-[10px]

                          border
                          border-black/15

                          bg-white

                          py-3
                          pl-12
                          pr-4

                          text-[15px]

                          text-black

                          outline-none

                          placeholder:text-black/40

                          focus:border-[#EC1C40]

                          focus:shadow-[0_0_0_3px_rgba(236,28,64,0.08)]

                          sm:h-[56px]
                          sm:text-[16px]
                        "
                      />
                    </div>
                  </div>

                  {/* RECAPTCHA */}

                  <div
                    className="
                      mt-3

                      flex

                      max-w-full

                      justify-center

                      overflow-hidden
                    "
                  >
                    <div
                      ref={
                        recaptchaRef
                      }
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    id="common-popup-callback-btn"
                    type="submit"
                    disabled={
                      isLoading
                    }
                    className={`
                      mt-5

                      flex
                      min-h-[54px]
                      w-full

                      items-center
                      justify-center

                      rounded-[9px]

                      px-5
                      py-3

                      text-[15px]
                      font-bold

                      text-white

                      ${
                        isLoading
                          ? `
                              cursor-not-allowed
                              bg-[#EC1C40]/60
                            `
                          : `
                              bg-[#EC1C40]

                              hover:bg-[#d9183a]

                              hover:shadow-[0_10px_28px_rgba(236,28,64,0.22)]
                            `
                      }
                    `}
                  >
                    {isLoading
                      ? "Submitting..."
                      : "Get A Call Back"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,

    document.body,
  );
}
