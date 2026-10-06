"use client";

import { useEffect, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";

export default function LeadForm({
  title,
  headline,
  buttonName,
  onClose,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [submissionCount, setSubmissionCount] = useState(0);

  const [isDisabled, setIsDisabled] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  /* ============================================================
     CHECK SUBMISSION LIMIT
  ============================================================ */

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedCount = Number.parseInt(
      localStorage.getItem("formSubmissionCount") || "0",
      10,
    );

    const storedTime = Number.parseInt(
      localStorage.getItem("lastSubmissionTime") || "0",
      10,
    );

    if (!storedTime) {
      setSubmissionCount(storedCount);
      setIsDisabled(storedCount >= 3);
      return;
    }

    const hoursPassed =
      (Date.now() - storedTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.removeItem("lastSubmissionTime");

      setSubmissionCount(0);
      setIsDisabled(false);

      return;
    }

    setSubmissionCount(storedCount);
    setIsDisabled(storedCount >= 3);
  }, []);

  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
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

    const normalizedPhone = formData.phone.replace(
      /\D/g,
      "",
    );

    if (!/^\d{10,15}$/.test(normalizedPhone)) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits)",
      );

      return false;
    }

    return true;
  };

  /* ============================================================
     SUBMIT LEAD
  ============================================================ */

  const submitLead = async () => {
    try {
      let storedSubmissionCount = Number.parseInt(
        localStorage.getItem("formSubmissionCount") || "0",
        10,
      );

      const lastSubmissionTime = Number.parseInt(
        localStorage.getItem("lastSubmissionTime") || "0",
        10,
      );

      /* Reset submission count after 24 hours */

      if (lastSubmissionTime) {
        const hoursPassed =
          (Date.now() - lastSubmissionTime) /
          (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          storedSubmissionCount = 0;

          localStorage.setItem(
            "formSubmissionCount",
            "0",
          );

          localStorage.removeItem(
            "lastSubmissionTime",
          );

          setSubmissionCount(0);
          setIsDisabled(false);
        }
      }

      /* Maximum 3 submissions */

      if (storedSubmissionCount >= 3) {
        setErrorMessage(
          "You have reached the maximum submission limit. Try again after 24 hours.",
        );

        setIsDisabled(true);
        return;
      }

      /* API request */

      const response = await fetch(
        "/api/submit-form",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fields: {
              name: formData.fullName.trim(),

              phone: formData.phone.replace(
                /\D/g,
                "",
              ),

              email: formData.email.trim(),

              source: "Dholera Times",
            },

            source: "Dholera Times Website",

            tags: [
              "Dholera Investment",
              "Website Lead",
            ],
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
        });

        setShowPopup(true);

        const nextCount =
          storedSubmissionCount + 1;

        setSubmissionCount(nextCount);

        localStorage.setItem(
          "formSubmissionCount",
          nextCount.toString(),
        );

        localStorage.setItem(
          "lastSubmissionTime",
          Date.now().toString(),
        );

        if (nextCount >= 3) {
          setIsDisabled(true);
        }

        /* Google Tag */

        window.dataLayer =
          window.dataLayer || [];

        window.dataLayer.push({
          event: "lead_form",
        });
      } else {
        console.error(
          "Submission failed:",
          data.error,
        );

        setErrorMessage(
          data.error ||
            "Submission failed. Please try again.",
        );
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error,
      );

      setErrorMessage(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ============================================================
     FORM SUBMIT
  ============================================================ */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    await submitLead();
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="relative mt-6 w-full lg:mt-0">
      {/* =====================================================
          FORM CARD
      ====================================================== */}

      <div
        className="
          relative
          w-full
          overflow-hidden

          rounded-[20px]

          border
          border-black/10

          bg-white

          px-4
          pb-5
          pt-6

          shadow-[0_18px_55px_rgba(0,0,0,0.10)]

          min-[414px]:px-5
          min-[414px]:pb-6

          sm:rounded-[24px]
          sm:px-7
          sm:pb-7
          sm:pt-8

          md:px-8
        "
      >
        {/* Top Accent */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0

            h-[4px]

            bg-gradient-to-r
            from-[#EC1C40]
            via-[#EC1C40]
            to-[#EC1C40]
          "
        />

        {/* ===================================================
            TITLE
        ==================================================== */}

        <div
          className="
            w-full
            max-w-[420px]

            text-left
          "
        >
          <h2
            className="
              text-left

              text-[22px]
              font-semibold
              leading-[1.25]

              tracking-[-0.025em]

              text-black

              min-[414px]:text-[24px]

              sm:text-[26px]
            "
          >
            {title}
          </h2>

          {headline && (
            <p
              className="
                mt-3

                max-w-[410px]

                text-left

                text-[14px]
                font-normal
                leading-6

                text-black/60

                sm:text-[15px]
              "
            >
              {headline}
            </p>
          )}
        </div>

        {/* ===================================================
            ERROR MESSAGE
        ==================================================== */}

        {errorMessage && (
          <div
            role="alert"
            className="
              mt-5

              rounded-xl

              border
              border-[#EC1C40]/20

              bg-[#EC1C40]/5

              px-4
              py-3

              text-[13px]
              font-medium
              leading-5

              text-[#EC1C40]

              sm:text-[14px]
            "
          >
            {errorMessage}
          </div>
        )}

        {/* ===================================================
            SUBMISSION LIMIT
        ==================================================== */}

        {isDisabled ? (
          <div
            className="
              mt-6

              rounded-xl

              border
              border-[#EC1C40]/20

              bg-[#EC1C40]/5

              px-4
              py-4

              text-left

              text-[14px]
              font-semibold
              leading-6

              text-[#EC1C40]

              sm:text-[15px]
            "
          >
            You have reached the maximum submission limit.
            Try again after 24 hours.
          </div>
        ) : (
          /* =================================================
             FORM
          ================================================== */

          <form
            onSubmit={handleSubmit}
            className="
              mt-6
              space-y-4

              sm:mt-7
              sm:space-y-5
            "
          >
            {/* ===============================================
                FULL NAME
            ================================================ */}

            <div className="relative">
              <FaUser
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-[15px]
                  text-black/45

                  "
              />

              <input
                name="fullName"
                type="text"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
                className="
                  min-h-[52px]
                  w-full

                  rounded-xl

                  border
                  border-black/10

                  bg-white

                  py-3
                  pl-11
                  pr-4

                  text-[16px]
                  leading-6

                  text-black

                  placeholder:text-black/45

                  shadow-[0_2px_8px_rgba(0,0,0,0.025)]

                  transition-[border-color,box-shadow,background-color]
                  duration-200

                  hover:border-[#EC1C40]/35

                  focus:border-[#EC1C40]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#EC1C40]/10

                  sm:min-h-[54px]
                  sm:pl-12
                "
              />
            </div>

            {/* ===============================================
                PHONE
            ================================================ */}

            <div className="relative">
              <FaPhoneAlt
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-[15px]
                  text-black/45

                "
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="tel"
                required
                className="
                  min-h-[52px]
                  w-full

                  rounded-xl

                  border
                  border-black/10

                  bg-white

                  py-3
                  pl-11
                  pr-4

                  text-[16px]
                  leading-6

                  text-black

                  placeholder:text-black/45

                  shadow-[0_2px_8px_rgba(0,0,0,0.025)]

                  transition-[border-color,box-shadow,background-color]
                  duration-200

                  hover:border-[#EC1C40]/35

                  focus:border-[#EC1C40]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#EC1C40]/10

                  sm:min-h-[54px]
                  sm:pl-12
                "
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
                inline-flex
                min-h-[52px]
                w-full

                touch-manipulation

                items-center
                justify-center

                rounded-xl

                bg-[#EC1C40]

                px-5
                py-3

                text-[16px]
                font-semibold
                leading-6

                text-white

                shadow-[0_8px_22px_rgba(236,28,64,0.20)]

                transition-[background-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#d81839]
                hover:shadow-[0_12px_28px_rgba(236,28,64,0.25)]

                active:translate-y-0

                disabled:cursor-not-allowed
                disabled:bg-black/30
                disabled:shadow-none
                disabled:hover:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#EC1C40]
                focus-visible:ring-offset-2

                sm:min-h-[54px]

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              {isLoading
                ? "Submitting..."
                : buttonName}
            </button>
          </form>
        )}
      </div>

      {/* =====================================================
          SUCCESS POPUP
      ====================================================== */}

      {showPopup && (
        <div
          role="presentation"
          className="
            fixed
            inset-0
            z-[1100]

            flex
            items-center
            justify-center

            overflow-y-auto

            bg-black/65

            p-3

            backdrop-blur-[4px]

            min-[414px]:p-4

            sm:p-6
          "
          onClick={() =>
            setShowPopup(false)
          }
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-success-title"
            aria-describedby="lead-success-description"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              my-auto

              w-full
              max-w-[420px]

              overflow-hidden

              rounded-[20px]

              border
              border-black/10

              bg-white

              p-5

              shadow-[0_28px_80px_rgba(0,0,0,0.30)]

              min-[414px]:rounded-[22px]
              min-[414px]:p-6

              sm:rounded-[26px]
              sm:p-8
            "
          >
            {/* Top Accent */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                h-[4px]

                bg-gradient-to-r
                from-[#EC1C40]
                via-[#EC1C40]
                to-[#EC1C40]
              "
            />

            {/* Success Icon */}

            <div
              aria-hidden="true"
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                border
                border-[#EC1C40]/20

                bg-[#EC1C40]/10

                text-[20px]
                font-bold

                text-[#EC1C40]

                sm:h-12
                sm:w-12
                sm:text-[22px]
              "
            >
              ✓
            </div>

            {/* Success Title */}

            <h3
              id="lead-success-title"
              className="
                mt-4

                text-left

                text-[22px]
                font-semibold
                leading-[1.25]

                tracking-[-0.025em]

                text-black

                min-[414px]:text-[24px]

                sm:mt-5
                sm:text-[26px]
              "
            >
              Thank You!
            </h3>

            {/* Success Text */}

            <p
              id="lead-success-description"
              className="
                mt-3

                text-left

                text-[14px]
                leading-6

                text-black/60

                sm:text-[15px]
                sm:leading-7
              "
            >
              Your form has been submitted successfully.
              We&apos;ll get back to you soon.
            </p>

            <div
              aria-hidden="true"
              className="
                my-5

                h-px
                w-full

                bg-black/10

                sm:my-6
              "
            />

            {/* Close success popup only */}

            <button
              type="button"
              onClick={() =>
                setShowPopup(false)
              }
              className="
                inline-flex
                min-h-[50px]
                w-full

                touch-manipulation

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

                shadow-[0_8px_22px_rgba(236,28,64,0.20)]

                transition-[background-color,transform,box-shadow]
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#d81839]
                hover:shadow-[0_12px_28px_rgba(236,28,64,0.25)]

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
          </div>
        </div>
      )}
    </div>
  );
}