"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

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

export default function PopupForm() {
  /* ============================================================
     STATES
  ============================================================ */

  const [
    showFormPopup,
    setShowFormPopup,
  ] = useState(false);

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
    recaptchaLoaded,
    setRecaptchaLoaded,
  ] = useState(false);

  const [
    isMounted,
    setIsMounted,
  ] = useState(false);

  const recaptchaRef = useRef(null);

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  /* ============================================================
     CLIENT MOUNT
  ============================================================ */

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ============================================================
     GET IN TOUCH BUTTON TRIGGER
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

      if (trigger) {
        setShowThankYou(false);
        setErrorMessage("");
        setShowFormPopup(true);
      }
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
  ============================================================ */

  useEffect(() => {
    const sessionPopupShown =
      sessionStorage.getItem(
        "popupShownThisSession",
      );

    if (!sessionPopupShown) {
      const handleScroll = () => {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop;

        const documentHeight =
          document.documentElement
            .scrollHeight -
          document.documentElement
            .clientHeight;

        const scrollPercent =
          documentHeight > 0
            ? (scrollTop /
                documentHeight) *
              100
            : 0;

        if (scrollPercent >= 35) {
          setShowThankYou(false);

          setErrorMessage("");

          setShowFormPopup(true);

          sessionStorage.setItem(
            "popupShownThisSession",
            "true",
          );

          window.removeEventListener(
            "scroll",
            handleScroll,
          );
        }
      };

      window.addEventListener(
        "scroll",
        handleScroll,
      );

      return () => {
        window.removeEventListener(
          "scroll",
          handleScroll,
        );
      };
    }
  }, []);

  /* ============================================================
     LOAD RECAPTCHA
  ============================================================ */

  useEffect(() => {
    const loadRecaptcha = () => {
      if (
        typeof window !== "undefined" &&
        !window.grecaptcha &&
        siteKey
      ) {
        const existingScript =
          document.querySelector(
            'script[src="https://www.google.com/recaptcha/api.js"]',
          );

        if (existingScript) {
          if (window.grecaptcha) {
            setRecaptchaLoaded(true);

            return;
          }

          existingScript.addEventListener(
            "load",
            () =>
              setRecaptchaLoaded(true),
            {
              once: true,
            },
          );

          return;
        }

        const script =
          document.createElement("script");

        script.src =
          "https://www.google.com/recaptcha/api.js";

        script.async = true;
        script.defer = true;

        script.onload = () =>
          setRecaptchaLoaded(true);

        script.onerror = () =>
          setRecaptchaLoaded(true);

        document.head.appendChild(script);
      } else if (
        window.grecaptcha ||
        !siteKey
      ) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();
  }, [siteKey]);

  /* ============================================================
     ESC KEY CLOSE
  ============================================================ */

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (
        event.key === "Escape" &&
        showFormPopup
      ) {
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

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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

    if (
      !/^\d{10,15}$/.test(
        formData.mobileNumber.replace(
          /\D/g,
          "",
        ),
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
     RECAPTCHA SUCCESS / TELECRM SUBMIT
  ============================================================ */

  const onRecaptchaSuccess = async (
    token,
  ) => {
    try {
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },

          body: JSON.stringify({
            fields: {
              name: formData.fullName,

              phone:
                formData.mobileNumber,

              email:
                formData.email,

              source:
                "Dholera Times",
            },

            source:
              "Dholera Times",

            tags: [
              "Dholera Investment",
              "Popup Lead",
              "Dholera Times",
            ],

            recaptchaToken:
              token,
          }),
        },
      );

      if (response.ok) {
        setFormData({
          fullName: "",
          mobileNumber: "",
          email: "",
        });

        setShowThankYou(true);

        setTimeout(() => {
          setShowThankYou(false);

          setShowFormPopup(false);
        }, 3000);
      } else {
        throw new Error(
          "Error submitting form",
        );
      }
    } catch (error) {
      console.error(
        "Form submission error:",
        error,
      );

      setErrorMessage(
        "Error submitting form. Please try again.",
      );
    } finally {
      setIsLoading(false);

      if (
        window.grecaptcha &&
        recaptchaRef.current
      ) {
        try {
          window.grecaptcha.reset();
        } catch (error) {
          console.error(
            "Error resetting reCAPTCHA:",
            error,
          );
        }
      }
    }
  };

  /* ============================================================
     FORM SUBMIT
  ============================================================ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);

      return;
    }

    if (
      !recaptchaLoaded ||
      !window.grecaptcha
    ) {
      setErrorMessage(
        "Security verification not loaded. Please refresh the page.",
      );

      setIsLoading(false);

      return;
    }

    if (
      recaptchaRef.current &&
      !recaptchaRef.current.innerHTML
    ) {
      try {
        window.grecaptcha.render(
          recaptchaRef.current,
          {
            sitekey: siteKey,

            callback:
              onRecaptchaSuccess,

            theme: "light",
          },
        );
      } catch (error) {
        console.error(
          "Error rendering reCAPTCHA:",
          error,
        );

        setErrorMessage(
          "Error with verification. Please try again.",
        );

        setIsLoading(false);
      }
    } else {
      window.grecaptcha.execute();
    }
  };

  /* ============================================================
     CLOSE POPUP
  ============================================================ */

  const handlePopupClose = () => {
    setShowFormPopup(false);

    setShowThankYou(false);

    setErrorMessage("");
  };

  const handleBackdropClick = (e) => {
    if (
      e.target === e.currentTarget
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
     PORTAL
     IMPORTANT:
     Popup is rendered directly inside document.body.
     Therefore parent overflow-hidden / z-index cannot clip it.
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

            z-[2147483647]

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
          {/* =================================================
              MODAL
          ================================================= */}

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
            onClick={(e) =>
              e.stopPropagation()
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
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

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

                transition-[background-color,color,border-color,transform]
                duration-200

                hover:rotate-90
                hover:border-[#EC1C40]/20
                hover:bg-[#EC1C40]/10
                hover:text-[#EC1C40]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2
              "
            >
              <X
                size={18}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>

            {/* =================================================
                THANK YOU
            ================================================= */}

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
                    xmlns="http://www.w3.org/2000/svg"
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
                    leading-tight

                    tracking-[-0.03em]

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
                {/* =================================================
                    HEADING
                ================================================= */}

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
                    in Dholera
                    Starting from ₹10
                    Lakh
                  </h2>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}

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
                        leading-5

                        text-[#EC1C40]
                      "
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* =================================================
                      INPUTS
                  ================================================= */}

                  <div className="space-y-4">
                    {/* FULL NAME */}

                    <div className="relative">
                      <UserRound
                        size={20}
                        strokeWidth={1.7}
                        aria-hidden="true"
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
                        aria-label="Full Name"
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
                          font-normal

                          text-black

                          outline-none

                          transition-[border-color,box-shadow]
                          duration-200

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
                        aria-hidden="true"
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
                        aria-label="Phone Number"
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
                          font-normal

                          text-black

                          outline-none

                          transition-[border-color,box-shadow]
                          duration-200

                          placeholder:text-black/40

                          focus:border-[#EC1C40]

                          focus:shadow-[0_0_0_3px_rgba(236,28,64,0.08)]

                          sm:h-[56px]
                          sm:text-[16px]
                        "
                      />
                    </div>
                  </div>

                  {/* =================================================
                      RECAPTCHA
                  ================================================= */}

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

                  {/* =================================================
                      SUBMIT
                  ================================================= */}

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !recaptchaLoaded
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
                      leading-6

                      text-white

                      transition-[background-color,transform,box-shadow,opacity]
                      duration-200

                      sm:min-h-[56px]
                      sm:text-[16px]

                      ${
                        isLoading ||
                        !recaptchaLoaded
                          ? `
                            cursor-not-allowed
                            bg-[#EC1C40]/60
                          `
                          : `
                            bg-[#EC1C40]

                            hover:bg-[#d9183a]

                            hover:shadow-[0_10px_28px_rgba(236,28,64,0.22)]

                            active:scale-[0.99]
                          `
                      }
                    `}
                  >
                    {isLoading ? (
                      <span
                        className="
                          flex
                          items-center
                          justify-center

                          gap-2.5
                        "
                      >
                        <svg
                          className="
                            h-5
                            w-5

                            animate-spin
                          "
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>

                        Submitting...
                      </span>
                    ) : (
                      "Get A Call Back"
                    )}
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