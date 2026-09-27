"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CheckCircle2,
  Mail,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";

/* ============================================================
   COMMON CONTACT FORM
============================================================ */

export default function ContactForm({
  title = "Get in Touch",
  headline = "",
  buttonName = "Submit",
  onClose,
  maxWidth = "580px",
  minHeight = "auto",
  className = "",
}) {
  /* ============================================================
     STATE
  ============================================================ */

  const [isLoading, setIsLoading] =
    useState(false);

  const [
    submissionCount,
    setSubmissionCount,
  ] = useState(0);

  const [isDisabled, setIsDisabled] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    recaptchaLoaded,
    setRecaptchaLoaded,
  ] = useState(false);

  const recaptchaRef =
    useRef(null);

  const siteKey =
    process.env
      .NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
    });

  /* ============================================================
     SUBMISSION LIMIT
  ============================================================ */

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    const storedCount =
      Number.parseInt(
        localStorage.getItem(
          "formSubmissionCount",
        ) || "0",
        10,
      );

    const storedTime =
      Number.parseInt(
        localStorage.getItem(
          "lastSubmissionTime",
        ) || "0",
        10,
      );

    if (!storedTime) {
      setSubmissionCount(
        storedCount,
      );

      setIsDisabled(
        storedCount >= 3,
      );

      return;
    }

    const hoursPassed =
      (Date.now() - storedTime) /
      (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      localStorage.setItem(
        "formSubmissionCount",
        "0",
      );

      localStorage.removeItem(
        "lastSubmissionTime",
      );

      setSubmissionCount(0);
      setIsDisabled(false);

      return;
    }

    setSubmissionCount(
      storedCount,
    );

    setIsDisabled(
      storedCount >= 3,
    );
  }, []);

  /* ============================================================
     RECAPTCHA
  ============================================================ */

  const loadRecaptcha =
    useCallback(() => {
      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }

      if (
        window.grecaptcha
      ) {
        setRecaptchaLoaded(
          true,
        );

        return;
      }

      if (recaptchaLoaded) {
        return;
      }

      const existingScript =
        document.querySelector(
          'script[src*="google.com/recaptcha/api.js"]',
        );

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          () => {
            setRecaptchaLoaded(
              true,
            );
          },
          {
            once: true,
          },
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
        setRecaptchaLoaded(
          true,
        );
      };

      document.head.appendChild(
        script,
      );
    }, [recaptchaLoaded]);

  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (
    event,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      }),
    );

    setErrorMessage("");
  };

  /* ============================================================
     LEAD SOURCE
  ============================================================ */

  const getLeadSource = () => {
    if (
      typeof window ===
      "undefined"
    ) {
      return "Dholera Times";
    }

    const params =
      new URLSearchParams(
        window.location.search,
      );

    if (
      params.has("twclid")
    ) {
      return "Dholera Times Twitter Ads";
    }

    if (
      params.has(
        "dholera-sir-blogs",
      )
    ) {
      return "Dholera Times Blogs";
    }

    if (
      params.has(
        "dholera-sir-updates",
      )
    ) {
      return "Dholera Times Updates";
    }

    if (
      params.has(
        "about-dholera-sir",
      )
    ) {
      return "Dholera Times Dholera SIR";
    }

    if (
      params.has("gad_source")
    ) {
      return "Dholera Times Google Ads";
    }

    return "Dholera Times";
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
        "Please fill in all required fields",
      );

      return false;
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim(),
      )
    ) {
      setErrorMessage(
        "Please enter a valid email address",
      );

      return false;
    }

    const phone =
      formData.phone.replace(
        /\D/g,
        "",
      );

    if (
      !/^\d{10,15}$/.test(phone)
    ) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits)",
      );

      return false;
    }

    return true;
  };

  /* ============================================================
     RECAPTCHA SUCCESS / LEAD SUBMISSION
  ============================================================ */

  const onRecaptchaSuccess =
    async (token) => {
      try {
        let storedCount =
          Number.parseInt(
            localStorage.getItem(
              "formSubmissionCount",
            ) || "0",
            10,
          );

        const lastSubmissionTime =
          Number.parseInt(
            localStorage.getItem(
              "lastSubmissionTime",
            ) || "0",
            10,
          );

        /* ================================================
           RESET LIMIT AFTER 24 HOURS
        ================================================= */

        if (
          lastSubmissionTime
        ) {
          const hoursPassed =
            (Date.now() -
              lastSubmissionTime) /
            (1000 * 60 * 60);

          if (
            hoursPassed >= 24
          ) {
            storedCount = 0;

            localStorage.setItem(
              "formSubmissionCount",
              "0",
            );

            localStorage.setItem(
              "lastSubmissionTime",
              Date.now().toString(),
            );

            setSubmissionCount(
              0,
            );

            setIsDisabled(
              false,
            );
          }
        }

        /* ================================================
           LIMIT
        ================================================= */

        if (
          storedCount >= 3
        ) {
          setErrorMessage(
            "You have reached the maximum submission limit. Try again after 24 hours.",
          );

          setIsDisabled(
            true,
          );

          return;
        }

        /* ================================================
           API REQUEST
        ================================================= */

        const response =
          await fetch(
            "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
              },

              body:
                JSON.stringify({
                  fields: {
                    name:
                      formData.fullName.trim(),

                    phone:
                      formData.phone.replace(
                        /\D/g,
                        "",
                      ),

                    email:
                      formData.email.trim(),

                    source:
                      getLeadSource(),
                  },

                  source:
                    "Dholera Times Website",

                  tags: [
                    "Dholera Investment",
                    "Website Lead",
                  ],

                  recaptchaToken:
                    token,
                }),
            },
          );

        const responseText =
          await response.text();

        /* ================================================
           SUCCESS
        ================================================= */

        if (response.ok) {
          if (
            responseText ===
              "OK" ||
            responseText
              .toLowerCase()
              .includes(
                "success",
              )
          ) {
            setFormData({
              fullName: "",
              email: "",
              phone: "",
            });

            setShowPopup(
              true,
            );

            const nextCount =
              storedCount + 1;

            setSubmissionCount(
              nextCount,
            );

            localStorage.setItem(
              "formSubmissionCount",
              nextCount.toString(),
            );

            localStorage.setItem(
              "lastSubmissionTime",
              Date.now().toString(),
            );

            if (
              nextCount >= 3
            ) {
              setIsDisabled(
                true,
              );
            }

            /* GOOGLE TAG */

            window.dataLayer =
              window.dataLayer ||
              [];

            window.dataLayer.push({
              event:
                "lead_form",
            });
          } else {
            console.log(
              "Response Text:",
              responseText,
            );

            setErrorMessage(
              "Submission received but with unexpected response",
            );
          }
        } else {
          console.error(
            "Server Error:",
            responseText,
          );

          throw new Error(
            responseText ||
              "Submission failed",
          );
        }
      } catch (error) {
        console.error(
          "Error submitting form:",
          error,
        );

        setErrorMessage(
          `Error submitting form: ${error.message}`,
        );
      } finally {
        setIsLoading(
          false,
        );

        if (
          typeof window !==
            "undefined" &&
          window.grecaptcha
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
     SUBMIT
  ============================================================ */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setIsLoading(true);

      setErrorMessage("");

      if (!validateForm()) {
        setIsLoading(
          false,
        );

        return;
      }

      if (
        !recaptchaLoaded ||
        !window.grecaptcha
      ) {
        loadRecaptcha();

        setErrorMessage(
          "Security verification is loading. Please try again in a moment.",
        );

        setIsLoading(
          false,
        );

        return;
      }

      if (!siteKey) {
        setErrorMessage(
          "Security verification is unavailable. Please try again later.",
        );

        setIsLoading(
          false,
        );

        return;
      }

      /* ================================================
         RENDER RECAPTCHA
      ================================================= */

      if (
        recaptchaRef.current &&
        !recaptchaRef.current
          .innerHTML
      ) {
        try {
          window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey:
                siteKey,

              callback:
                onRecaptchaSuccess,

              theme:
                "light",
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

          setIsLoading(
            false,
          );
        }
      } else {
        try {
          window.grecaptcha.execute();
        } catch (error) {
          console.error(
            "Error executing reCAPTCHA:",
            error,
          );

          setErrorMessage(
            "Error with verification. Please try again.",
          );

          setIsLoading(
            false,
          );
        }
      }
    };

  /* ============================================================
     CLOSE
  ============================================================ */

  const handleClose = () => {
    if (
      onClose &&
      typeof onClose ===
        "function"
    ) {
      onClose();
    }
  };

  /* ============================================================
     INPUT CLASS
  ============================================================ */

  const inputClass = `
    h-[56px]
    w-full

    rounded-[14px]

    border
    border-black/10

    bg-white

    py-3

    text-[15px]
    font-medium
    leading-6

    text-black

    outline-none

    placeholder:font-normal
    placeholder:text-black/40

    transition-[border-color,box-shadow,background-color]
    duration-200

    hover:border-black/20

    focus:border-[#EC1C40]
    focus:bg-white
    focus:ring-4
    focus:ring-[#EC1C40]/10

    disabled:cursor-not-allowed
    disabled:bg-black/[0.025]

    sm:h-[58px]
    sm:text-[16px]
  `;

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div
      className={`
        relative

        mx-auto

        w-full

        ${className}
      `}
      style={{
        maxWidth,
      }}
    >
      {/* =====================================================
          FORM CARD
      ====================================================== */}

      <div
        className="
          relative

          flex
          w-full
          flex-col

          overflow-hidden

          rounded-[24px]

          border
          border-black/10

          bg-white

          p-5

          shadow-[0_24px_65px_-38px_rgba(0,0,0,0.38)]

          min-[414px]:p-6

          sm:rounded-[28px]
          sm:p-7

          md:p-8
        "
        style={{
          minHeight,
        }}
      >
        {/* ===================================================
            TOP ACCENT
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0

            h-[3px]

            bg-[#EC1C40]
          "
        />

        {/* ===================================================
            CLOSE BUTTON
        ==================================================== */}

        {onClose && (
          <button
            type="button"
            onClick={
              handleClose
            }
            aria-label="Close form"
            className="
              absolute
              right-3
              top-3

              z-20

              inline-flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              border
              border-black/10

              bg-white

              text-black/55

              shadow-sm

              transition-[background-color,color,border-color,transform]
              duration-200

              hover:border-[#EC1C40]/20
              hover:bg-[#EC1C40]/5
              hover:text-[#EC1C40]

              active:scale-95

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#EC1C40]
              focus-visible:ring-offset-2

              sm:right-4
              sm:top-4

              motion-reduce:transform-none
            "
          >
            <X
              size={19}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        )}

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className={
            onClose
              ? "pr-10"
              : ""
          }
        >
          <h2
            className="
              text-[24px]
              font-bold
              leading-[1.18]

              tracking-[-0.03em]

              text-black

              min-[414px]:text-[26px]

              sm:text-[28px]
            "
          >
            {title}
          </h2>

          {headline && (
            <p
              className="
                mt-2.5

                max-w-xl

                text-[14px]
                font-normal
                leading-6

                text-black/55

                sm:text-[15px]
                sm:leading-6
              "
            >
              {headline}
            </p>
          )}
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            my-6

            h-px
            w-full

            bg-black/10
          "
        />

        {/* ===================================================
            ERROR
        ==================================================== */}

        {errorMessage && (
          <div
            role="alert"
            className="
              mb-5

              rounded-xl

              border
              border-[#EC1C40]/20

              bg-[#EC1C40]/5

              px-4
              py-3

              text-[13px]
              font-medium
              leading-5

              text-[#B81431]

              sm:text-[14px]
            "
          >
            {errorMessage}
          </div>
        )}

        {/* ===================================================
            DISABLED
        ==================================================== */}

        {isDisabled ? (
          <div
            className="
              flex
              flex-1

              items-center
              justify-center
            "
          >
            <div
              className="
                w-full

                rounded-2xl

                border
                border-[#EC1C40]/20

                bg-[#EC1C40]/5

                px-5
                py-6

                text-center
              "
            >
              <p
                className="
                  text-[14px]
                  font-semibold
                  leading-6

                  text-[#B81431]

                  sm:text-[15px]
                "
              >
                You have reached
                the maximum
                submission limit.
                Try again after
                24 hours.
              </p>
            </div>
          </div>
        ) : (
          /* =================================================
             FORM
          ================================================== */

          <form
            onSubmit={
              handleSubmit
            }
            onFocus={
              loadRecaptcha
            }
            onPointerEnter={
              loadRecaptcha
            }
            onTouchStart={
              loadRecaptcha
            }
            className="
              flex
              flex-1
              flex-col

              justify-between
            "
          >
            <div
              className="
                grid
                grid-cols-1

                gap-4

                sm:grid-cols-2
              "
            >
              {/* =============================================
                  FULL NAME
              ============================================== */}

              <div
                className="
                  relative
                "
              >
                <User
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2
                    z-10

                    -translate-y-1/2

                    text-black/35
                  "
                />

                <input
                  id="common-contact-full-name"
                  name="fullName"
                  type="text"
                  placeholder="Full Name *"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="name"
                  required
                  className={`
                    ${inputClass}

                    pl-11
                    pr-4
                  `}
                />
              </div>

              {/* =============================================
                  PHONE
              ============================================== */}

              <div
                className="
                  relative
                "
              >
                <Phone
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2
                    z-10

                    -translate-y-1/2

                    text-black/35
                  "
                />

                <input
                  id="common-contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number *"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  className={`
                    ${inputClass}

                    pl-11
                    pr-4
                  `}
                />
              </div>

              {/* =============================================
                  EMAIL
              ============================================== */}

              <div
                className="
                  relative

                  sm:col-span-2
                "
              >
                <Mail
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2
                    z-10

                    -translate-y-1/2

                    text-black/35
                  "
                />

                <input
                  id="common-contact-email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="email"
                  className={`
                    ${inputClass}

                    pl-11
                    pr-4
                  `}
                />
              </div>
            </div>

            {/* ===============================================
                RECAPTCHA
            ================================================ */}

            <div
              className="
                mt-5

                flex
                w-full

                justify-center

                overflow-x-auto
              "
            >
              <div
                ref={
                  recaptchaRef
                }
              />
            </div>

            {/* ===============================================
                SUBMIT
            ================================================ */}

            <button
              type="submit"
              disabled={
                isLoading ||
                isDisabled
              }
              className="
                group

                mt-5

                inline-flex
                min-h-[54px]
                w-full

                touch-manipulation

                items-center
                justify-center

                gap-2.5

                rounded-[14px]

                bg-[#EC1C40]

                px-5
                py-3

                text-[15px]
                font-semibold
                leading-6

                text-white

                shadow-[0_12px_30px_-16px_rgba(236,28,64,0.75)]

                transition-[background-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#D81839]
                hover:shadow-[0_16px_35px_-17px_rgba(236,28,64,0.9)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:bg-black/25
                disabled:shadow-none
                disabled:hover:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                sm:min-h-[56px]
                sm:text-[16px]

                motion-reduce:transform-none
              "
            >
              {isLoading
                ? "Submitting..."
                : buttonName}

              {!isLoading && (
                <Send
                  size={17}
                  strokeWidth={1.9}
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-200

                    group-hover:translate-x-0.5

                    motion-reduce:transform-none
                  "
                />
              )}
            </button>
          </form>
        )}
      </div>

      {/* =====================================================
          SUCCESS POPUP
      ====================================================== */}

      {showPopup && (
        <div
          className="
            fixed
            inset-0
            z-[1200]

            flex
            items-center
            justify-center

            bg-black/65

            p-4

            backdrop-blur-[4px]
          "
          onClick={() =>
            setShowPopup(false)
          }
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-description"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-[420px]

              overflow-hidden

              rounded-[24px]

              border
              border-black/10

              bg-white

              p-6

              text-center

              shadow-[0_30px_90px_-30px_rgba(0,0,0,0.7)]

              sm:p-8
            "
          >
            {/* TOP ACCENT */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                h-[3px]

                bg-[#EC1C40]
              "
            />

            <span
              className="
                mx-auto

                flex
                h-14
                w-14

                items-center
                justify-center

                rounded-full

                bg-[#EC1C40]/10

                text-[#EC1C40]
              "
            >
              <CheckCircle2
                size={28}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>

            <h3
              id="contact-success-title"
              className="
                mt-5

                text-[25px]
                font-bold

                tracking-[-0.025em]

                text-black
              "
            >
              Thank You!
            </h3>

            <p
              id="contact-success-description"
              className="
                mt-3

                text-[14px]
                leading-6

                text-black/60

                sm:text-[15px]
              "
            >
              Your form has been
              submitted
              successfully.
              We&apos;ll get
              back to you soon.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowPopup(
                  false,
                )
              }
              className="
                mt-6

                inline-flex
                min-h-[50px]
                w-full

                items-center
                justify-center

                rounded-xl

                bg-black

                px-5
                py-3

                text-[14px]
                font-semibold

                text-white

                transition-colors
                duration-200

                hover:bg-[#EC1C40]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}