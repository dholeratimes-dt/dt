"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import LeadForm from "../../dholera-sir/LeadForm";

/* ============================================================
   DATE
============================================================ */

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/* ============================================================
   COMPONENT
============================================================ */

export default function SidebarWithForm({
  popularArticles = [],
  className = "",
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const [submissionCount, setSubmissionCount] =
    useState(0);

  const [
    lastSubmissionTime,
    setLastSubmissionTime,
  ] = useState(0);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    recaptchaLoaded,
    setRecaptchaLoaded,
  ] = useState(false);

  const [
    isContactFormOpen,
    setIsContactFormOpen,
  ] = useState(false);

  const [formTitle, setFormTitle] =
    useState("");

  const [formHeadline, setFormHeadline] =
    useState("");

  const [buttonName, setButtonName] =
    useState("");

  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  /* ============================================================
     CONTACT POPUP
  ============================================================ */

  const openContactForm = (
    title,
    headline,
    btnName,
  ) => {
    setFormTitle(title);
    setFormHeadline(headline);
    setButtonName(btnName);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  /* ============================================================
     LOCK PAGE SCROLL WHEN ANY POPUP IS OPEN
  ============================================================ */

  useEffect(() => {
    if (
      typeof document === "undefined" ||
      (!isContactFormOpen && !showPopup)
    ) {
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
  }, [
    isContactFormOpen,
    showPopup,
  ]);

  /* ============================================================
     ESCAPE CLOSE
  ============================================================ */

  useEffect(() => {
    if (
      !isContactFormOpen &&
      !showPopup
    ) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (isContactFormOpen) {
        setIsContactFormOpen(false);
      }

      if (showPopup) {
        setShowPopup(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [
    isContactFormOpen,
    showPopup,
  ]);

  /* ============================================================
     RECAPTCHA
  ============================================================ */

  useEffect(() => {
    const loadRecaptcha = () => {
      if (
        typeof window === "undefined"
      ) {
        return;
      }

      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
        return;
      }

      try {
        const existingScript =
          document.querySelector(
            'script[src="https://www.google.com/recaptcha/api.js"]',
          );

        if (existingScript) {
          const handleLoad = () => {
            setRecaptchaLoaded(true);
          };

          existingScript.addEventListener(
            "load",
            handleLoad,
          );

          return;
        }

        const script =
          document.createElement(
            "script",
          );

        script.src =
          "https://www.google.com/recaptcha/api.js";

        script.async = true;
        script.defer = true;

        script.onload = () => {
          setRecaptchaLoaded(true);
        };

        script.onerror = () => {
          console.error(
            "Failed to load reCAPTCHA script",
          );
        };

        document.head.appendChild(
          script,
        );
      } catch (error) {
        console.error(
          "reCAPTCHA script loading error:",
          error,
        );
      }
    };

    loadRecaptcha();

    if (
      typeof window !== "undefined"
    ) {
      setSubmissionCount(
        parseInt(
          localStorage.getItem(
            "formSubmissionCount",
          ) || "0",
          10,
        ),
      );

      setLastSubmissionTime(
        parseInt(
          localStorage.getItem(
            "lastSubmissionTime",
          ) || "0",
          10,
        ),
      );
    }
  }, []);

  /* ============================================================
     INPUT
  ============================================================ */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
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
      !formData.phone.trim()
    ) {
      setErrorMessage(
        "Please fill in all fields",
      );

      return false;
    }

    const normalizedPhone =
      formData.phone.replace(
        /\D/g,
        "",
      );

    if (
      !/^\d{10,15}$/.test(
        normalizedPhone,
      )
    ) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits)",
      );

      return false;
    }

    const now = Date.now();

    const hoursPassed =
      (now - lastSubmissionTime) /
      (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);

      if (
        typeof window !==
        "undefined"
      ) {
        localStorage.setItem(
          "formSubmissionCount",
          "0",
        );

        localStorage.setItem(
          "lastSubmissionTime",
          now.toString(),
        );
      }
    } else if (
      submissionCount >= 3
    ) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );

      return false;
    }

    return true;
  };

  /* ============================================================
     SEND LEAD
  ============================================================ */

  const onRecaptchaSuccess =
    async () => {
      try {
        const response =
          await fetch(
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
                  name:
                    formData.fullName,

                  phone:
                    formData.phone.replace(
                      /\D/g,
                      "",
                    ),

                  source:
                    "Dholera Times",
                },

                source:
                  "Dholera Times Website",

                tags: [
                  "Dholera Investment",
                  "Website Lead",
                ],
              }),
            },
          );

        const responseText =
          await response.text();

        if (!response.ok) {
          let errorData;

          try {
            errorData =
              JSON.parse(
                responseText,
              );
          } catch {
            errorData = {
              message:
                responseText,
            };
          }

          throw new Error(
            errorData.message ||
              "Error submitting form",
          );
        }

        setFormData({
          fullName: "",
          phone: "",
        });

        setShowPopup(true);

        setSubmissionCount(
          (previous) => {
            const newCount =
              previous + 1;

            if (
              typeof window !==
              "undefined"
            ) {
              localStorage.setItem(
                "formSubmissionCount",
                newCount.toString(),
              );

              localStorage.setItem(
                "lastSubmissionTime",
                Date.now().toString(),
              );
            }

            return newCount;
          },
        );
      } catch (error) {
        console.error(
          "Form submission error:",
          error,
        );

        setErrorMessage(
          error.message ||
            "Error submitting form. Please try again.",
        );
      } finally {
        setIsLoading(false);

        if (
          typeof window !==
            "undefined" &&
          window.grecaptcha &&
          recaptchaWidgetId.current !==
            null
        ) {
          try {
            window.grecaptcha.reset(
              recaptchaWidgetId.current,
            );
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

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (
      typeof window !==
        "undefined" &&
      window.grecaptcha &&
      recaptchaLoaded &&
      siteKey
    ) {
      try {
        if (
          recaptchaWidgetId.current ===
            null &&
          recaptchaRef.current
        ) {
          recaptchaWidgetId.current =
            window.grecaptcha.render(
              recaptchaRef.current,
              {
                sitekey: siteKey,

                callback:
                  onRecaptchaSuccess,

                theme: "light",
              },
            );
        } else if (
          recaptchaWidgetId.current !==
          null
        ) {
          window.grecaptcha.reset(
            recaptchaWidgetId.current,
          );

          window.grecaptcha.execute(
            recaptchaWidgetId.current,
          );
        }
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
      setErrorMessage(
        "reCAPTCHA not loaded. Please refresh and try again.",
      );

      setIsLoading(false);
    }
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div
      className={`
        relative
        h-full
        w-full
        min-w-0

        ${className}
      `}
    >
      {/* =====================================================
          NORMAL SCROLLING SIDEBAR
      ====================================================== */}

      <div className="space-y-6">
        {/* ===================================================
            GUIDE
        ==================================================== */}

        <section
          className="
            relative
            overflow-hidden

            rounded-2xl

            border
            border-[#EAD9DF]

            bg-white

            p-5

            shadow-[0_8px_26px_rgba(57,37,46,0.05)]

            sm:p-6
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              left-0

              w-[3px]

              bg-[#EC1C40]
            "
          />

          <h3
            className="
              text-[19px]
              font-semibold
              leading-[1.35]

              tracking-[-0.02em]

              text-[#39252E]

              sm:text-[20px]
            "
          >
            Get Expert Guidance on Dholera
          </h3>

          <form
            onSubmit={handleSubmit}
            className="
              mt-5
              space-y-3.5
            "
          >
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={
                formData.fullName
              }
              onChange={
                handleChange
              }
              autoComplete="name"
              required
              className="
                min-h-[50px]
                w-full

                rounded-xl

                border
                border-[#DFC9D1]

                bg-[#FAF7F8]

                px-4
                py-3

                text-[15px]
                leading-6

                text-[#39252E]

                placeholder:text-[#917B84]

                transition-[background-color,border-color,box-shadow]
                duration-200

                hover:border-[#D3A7B6]

                focus:border-[#EC1C40]
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-[#EC1C40]/10
              "
            />

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              autoComplete="tel"
              inputMode="tel"
              required
              className="
                min-h-[50px]
                w-full

                rounded-xl

                border
                border-[#DFC9D1]

                bg-[#FAF7F8]

                px-4
                py-3

                text-[15px]
                leading-6

                text-[#39252E]

                placeholder:text-[#917B84]

                transition-[background-color,border-color,box-shadow]
                duration-200

                hover:border-[#D3A7B6]

                focus:border-[#EC1C40]
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-[#EC1C40]/10
              "
            />

            {errorMessage && (
              <p
                role="alert"
                className="
                  rounded-lg

                  border
                  border-[#E6B9C7]

                  bg-[#FFF5F7]

                  px-3
                  py-2.5

                  text-[13px]
                  font-medium
                  leading-5

                  text-[#EC1C40]
                "
              >
                {errorMessage}
              </p>
            )}

            <div
              ref={recaptchaRef}
              className="
                max-w-full
                overflow-hidden
              "
            />

            <button
              type="submit"
              disabled={
                isLoading
              }
              className="
                inline-flex
                min-h-[50px]
                w-full

                items-center
                justify-center

                rounded-xl

                bg-[#EC1C40]

                px-5
                py-3

                text-[15px]
                font-semibold
                leading-6

                text-white

                shadow-[0_7px_18px_rgba(143,41,70,0.16)]

                transition-[background-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#742039]

                hover:shadow-[0_10px_22px_rgba(116,32,57,0.22)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:opacity-60

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              {isLoading
                ? "Processing..."
                : "Talk to an Advisor"}
            </button>
          </form>
        </section>
      </div>


      {/*  STICKY CONSULTATION CARD */}
      <div
        className="
          mt-6

          w-full

          lg:sticky
          lg:top-[104px]
          lg:z-20
        "
      >
        {/* ============================================================
            HOW DHOLERA TIMES TRACKS UPDATES
        ============================================================ */}

        <section
          className="
            mt-5

            w-full

            overflow-hidden

            rounded-2xl

            border
            border-black/10

            bg-white

            p-5

            shadow-[0_12px_35px_-30px_rgba(0,0,0,0.28)]

            sm:p-6
          "
        >
          {/* ========================================================
              SECTION HEADING
          ========================================================= */}

          <div
            className="
              border-b
              border-black/10

              pb-5
            "
          >
            <h3
              className="
                text-[20px]
                font-bold
                leading-[1.3]

                tracking-[-0.025em]

                text-black

                sm:text-[21px]
              "
            >
              How Dholera Times Tracks Updates
            </h3>
          </div>

          {/* ========================================================
              ITEM 1
          ========================================================= */}

          <div
            className="
              border-b
              border-black/10

              py-5
            "
          >
            <div
              className="
                border-l-[3px]
                border-[#EC1C40]

                pl-4
              "
            >
              <h4
                className="
                  text-[15px]
                  font-bold
                  leading-6

                  text-black

                  sm:text-[16px]
                "
              >
                Official Sources
              </h4>

              <p
                className="
                  mt-1.5

                  text-[14px]
                  leading-6

                  text-black/60
                "
              >
                We prioritize government releases, authorities and
                company announcements.
              </p>
            </div>
          </div>

          {/* ========================================================
              ITEM 2
          ========================================================= */}

          <div
            className="
              border-b
              border-black/10

              py-5
            "
          >
            <div
              className="
                border-l-[3px]
                border-[#EC1C40]

                pl-4
              "
            >
              <h4
                className="
                  text-[15px]
                  font-bold
                  leading-6

                  text-black

                  sm:text-[16px]
                "
              >
                On Ground Coverage
              </h4>

              <p
                className="
                  mt-1.5

                  text-[14px]
                  leading-6

                  text-black/60
                "
              >
                Our team follows important development activity across
                the Dholera region.
              </p>
            </div>
          </div>

          {/* ========================================================
              ITEM 3
          ========================================================= */}

          <div
            className="
              border-b
              border-black/10

              py-5
            "
          >
            <div
              className="
                border-l-[3px]
                border-[#EC1C40]

                pl-4
              "
            >
              <h4
                className="
                  text-[15px]
                  font-bold
                  leading-6

                  text-black

                  sm:text-[16px]
                "
              >
                Clear Project Status
              </h4>

              <p
                className="
                  mt-1.5

                  text-[14px]
                  leading-6

                  text-black/60
                "
              >
                We distinguish between approved, announced,
                under-construction and operational projects.
              </p>
            </div>
          </div>

          {/* ========================================================
              ITEM 4
          ========================================================= */}

          <div
            className="
              pt-5
            "
          >
            <div
              className="
                border-l-[3px]
                border-[#EC1C40]

                pl-4
              "
            >
              <h4
                className="
                  text-[15px]
                  font-bold
                  leading-6

                  text-black

                  sm:text-[16px]
                "
              >
                Updates &amp; Corrections
              </h4>

              <p
                className="
                  mt-1.5

                  text-[14px]
                  leading-6

                  text-black/60
                "
              >
                Reports are updated when reliable new information
                becomes available.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* CONSULTATION FORM POPUP */}

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            role="presentation"
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
            className="
              fixed
              inset-0
              z-[1000]

              flex
              items-center
              justify-center

              overflow-y-auto

              bg-[#39252E]/60

              px-4
              py-6

              backdrop-blur-[4px]

              sm:px-6
              sm:py-8
            "
            onMouseDown={
              closeContactForm
            }
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={
                formTitle ||
                "Investment consultation form"
              }
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
              }}
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              className="
                relative

                my-auto

                w-full
                max-w-[470px]

                overflow-hidden

                rounded-[22px]

                border
                border-[#EAD9DF]

                bg-white

                shadow-[0_28px_80px_rgba(57,37,46,0.30)]

                sm:rounded-[26px]

                [&>div]:!bg-white

                [&_form]:!bg-white

                [&_h1]:!text-[#39252E]
                [&_h2]:!text-[#39252E]
                [&_h3]:!text-[#39252E]

                [&_h1]:!tracking-[-0.025em]
                [&_h2]:!tracking-[-0.025em]
                [&_h3]:!tracking-[-0.025em]

                [&_p]:!text-[#68565E]

                [&_label]:!text-[#51414A]

                [&_svg]:!text-[#EC1C40]

                [&_input]:!min-h-[54px]

                [&_input]:!rounded-xl

                [&_input]:!border
                [&_input]:!border-[#DFC9D1]

                [&_input]:!bg-white

                [&_input]:!text-[15px]
                [&_input]:!text-[#39252E]

                [&_input]:!shadow-none

                [&_input]:placeholder:!text-[#9A858E]

                [&_input:hover]:!border-[#D7ABB9]

                [&_input:focus]:!border-[#EC1C40]
                [&_input:focus]:!outline-none
                [&_input:focus]:!ring-4
                [&_input:focus]:!ring-[#EC1C40]/10

                [&_textarea]:!rounded-xl

                [&_textarea]:!border
                [&_textarea]:!border-[#DFC9D1]

                [&_textarea]:!bg-white

                [&_textarea]:!text-[#39252E]

                [&_textarea]:placeholder:!text-[#9A858E]

                [&_textarea:focus]:!border-[#EC1C40]
                [&_textarea:focus]:!outline-none
                [&_textarea:focus]:!ring-4
                [&_textarea:focus]:!ring-[#EC1C40]/10

                [&_form_button]:!min-h-[52px]

                [&_form_button]:!rounded-xl

                [&_form_button]:!border-0

                [&_form_button]:!bg-[#EC1C40]

                [&_form_button]:!px-5
                [&_form_button]:!py-3

                [&_form_button]:!text-[16px]
                [&_form_button]:!font-semibold

                [&_form_button]:!text-white

                [&_form_button]:!shadow-[0_8px_22px_rgba(143,41,70,0.20)]

                [&_form_button]:!transition-[background-color,transform,box-shadow]
                [&_form_button]:!duration-200

                [&_form_button:hover]:!-translate-y-0.5
                [&_form_button:hover]:!bg-[#742039]

                [&_form_button:hover]:!shadow-[0_12px_28px_rgba(116,32,57,0.25)]

                [&_form_button:active]:!translate-y-0

                [&_form_button:focus-visible]:!outline-none
                [&_form_button:focus-visible]:!ring-2
                [&_form_button:focus-visible]:!ring-[#EC1C40]
                [&_form_button:focus-visible]:!ring-offset-2
              "
            >
              {/* top burgundy accent */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0
                  z-30

                  h-[4px]

                  !bg-gradient-to-r
                  !from-[#742039]
                  !via-[#EC1C40]
                  !to-[#C9738B]
                "
              />

              <LeadForm
                onClose={
                  closeContactForm
                }
                title={
                  formTitle
                }
                headline={
                  formHeadline
                }
                buttonName={
                  buttonName
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS POPUP */}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            role="presentation"
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
            className="
              fixed
              inset-0
              z-[1000]

              flex
              items-center
              justify-center

              overflow-y-auto

              bg-[#39252E]/60

              px-4
              py-6

              backdrop-blur-[4px]

              sm:px-6
              sm:py-8
            "
            onMouseDown={() =>
              setShowPopup(false)
            }
          >
            <motion.div
              id="contact-form-container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-popup-title"
              aria-describedby="success-popup-description"
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
              }}
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              className="
                relative

                w-full
                max-w-[430px]

                overflow-hidden

                rounded-[22px]

                border
                border-[#EAD9DF]

                bg-white

                p-5

                shadow-[0_28px_80px_rgba(57,37,46,0.30)]

                min-[400px]:p-6

                sm:rounded-[26px]
                sm:p-8
              "
            >
              {/* Top accent */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0

                  h-[4px]

                  bg-gradient-to-r
                  from-[#742039]
                  via-[#EC1C40]
                  to-[#C9738B]
                "
              />

              {/* visual status */}
              <div
                aria-hidden="true"
                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#E0A4B5]/60

                  bg-[#F7EBEF]

                  text-[22px]
                  font-semibold

                  text-[#EC1C40]

                  shadow-[0_5px_16px_rgba(143,41,70,0.08)]
                "
              >
                ✓
              </div>

              <h3
                id="success-popup-title"
                className="
                  mt-5

                  text-[24px]
                  font-semibold
                  leading-[1.25]

                  tracking-[-0.025em]

                  text-[#39252E]

                  sm:text-[26px]
                "
              >
                Thank You!
              </h3>

              <p
                id="success-popup-description"
                className="
                  mt-3

                  text-[15px]
                  leading-7

                  text-[#68565E]
                "
              >
                Your information has been submitted successfully.
                Our investment expert will contact you shortly.
              </p>

              <div
                aria-hidden="true"
                className="
                  my-6
                  h-px
                  w-full

                  bg-[#EAD9DF]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPopup(false)
                }
                className="
                  inline-flex
                  min-h-[50px]
                  w-full

                  items-center
                  justify-center

                  rounded-xl

                  bg-[#EC1C40]

                  px-5
                  py-3

                  text-[15px]
                  font-semibold
                  leading-6

                  text-white

                  shadow-[0_8px_22px_rgba(143,41,70,0.20)]

                  transition-[background-color,transform,box-shadow]
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-[#742039]

                  hover:shadow-[0_12px_28px_rgba(116,32,57,0.25)]

                  active:translate-y-0

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#EC1C40]
                  focus-visible:ring-offset-2

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}