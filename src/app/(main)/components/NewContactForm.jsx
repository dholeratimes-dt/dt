"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import useRecaptcha from "@/hooks/useRecaptcha";

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

  const submittingRef = useRef(false);
  const { recaptchaRef, loadRecaptcha, verifyRecaptcha, resetRecaptcha } =
    useRecaptcha();

  const preloadRecaptcha = () => loadRecaptcha().catch(() => {});

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
     SUBMIT
  ============================================================ */

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || isDisabled) return;
    setErrorMessage("");
    if (!validateForm()) return;

    submittingRef.current = true;
    setIsLoading(true);

    try {
      let storedCount = Number.parseInt(
        localStorage.getItem("formSubmissionCount") || "0", 10,
      );
      const lastTime = Number.parseInt(
        localStorage.getItem("lastSubmissionTime") || "0", 10,
      );
      if (lastTime && Date.now() - lastTime >= 24 * 60 * 60 * 1000) {
        storedCount = 0;
      }
      if (storedCount >= 3) {
        setIsDisabled(true);
        throw new Error("You have reached the maximum submission limit. Try again after 24 hours.");
      }

      const token = await verifyRecaptcha();
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            name: formData.fullName.trim(),
            phone: formData.phone.replace(/\D/g, ""),
            email: formData.email.trim(),
            source: getLeadSource(),
          },
          source: "Dholera Times Website",
          tags: ["Dholera Investment", "Website Lead"],
          recaptchaToken: token,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error submitting form. Please try again.");
      }

      setFormData({ fullName: "", email: "", phone: "" });
      setShowPopup(true);
      const nextCount = storedCount + 1;
      setSubmissionCount(nextCount);
      setIsDisabled(nextCount >= 3);
      localStorage.setItem("formSubmissionCount", nextCount.toString());
      localStorage.setItem("lastSubmissionTime", Date.now().toString());

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form" });
    } catch (error) {
      setErrorMessage(error.message || "Error submitting form. Please try again.");
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
      resetRecaptcha();
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
              preloadRecaptcha
            }
            onPointerEnter={
              preloadRecaptcha
            }
            onTouchStart={
              preloadRecaptcha
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
              id="contact-us-send-enquiry"
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