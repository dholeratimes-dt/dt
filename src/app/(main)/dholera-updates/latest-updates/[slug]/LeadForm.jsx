"use client";

import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function LeadFormSlug({
  title,
  headline,
  buttonName,
  onClose,
}) {
  const [isLoading, setIsLoading] =
    useState(false);

  const [
    submissionCount,
    setSubmissionCount,
  ] = useState(0);

  const [
    isDisabled,
    setIsDisabled,
  ] = useState(false);

  const [
    showPopup,
    setShowPopup,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    formData,
    setFormData,
  ] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

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

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.phone
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
        formData.phone.replace(
          /\D/g,
          "",
        ),
      )
    ) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits)",
      );

      return false;
    }

    return true;
  };

  const submitLead = async () => {
    try {
      let submissionCount =
        localStorage.getItem(
          "formSubmissionCount",
        ) || 0;

      let lastSubmissionTime =
        localStorage.getItem(
          "lastSubmissionTime",
        );

      if (lastSubmissionTime) {
        const timeDifference =
          Date.now() -
          parseInt(
            lastSubmissionTime,
            10,
          );

        const hoursPassed =
          timeDifference /
          (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          submissionCount = 0;

          localStorage.setItem(
            "formSubmissionCount",
            0,
          );

          localStorage.setItem(
            "lastSubmissionTime",
            Date.now().toString(),
          );
        }
      }

      if (submissionCount >= 3) {
        setErrorMessage(
          "You have reached the maximum submission limit. Try again after 24 hours.",
        );

        setIsDisabled(true);

        return;
      }

      const response = await fetch(
        "/api/submit-form",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            fields: {
              name:
                formData.fullName,

              phone:
                formData.phone,

              email:
                formData.email,

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

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
        });

        setShowPopup(true);

        submissionCount++;

        setSubmissionCount(
          submissionCount,
        );

        localStorage.setItem(
          "formSubmissionCount",
          submissionCount,
        );

        localStorage.setItem(
          "lastSubmissionTime",
          Date.now().toString(),
        );
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

  const handleSubmit = async (
    e,
  ) => {
    e.preventDefault();

    setIsLoading(true);

    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);

      return;
    }

    await submitLead();
  };

  const handleClose = () => {
    if (
      onClose &&
      typeof onClose === "function"
    ) {
      onClose();
    }
  };

  return (
    <div className="relative">
      <div
        className="
          mx-auto
          w-full

          rounded-xl

          border
          border-black/10

          px-6
          py-6

          shadow-[0_22px_60px_-30px_rgba(0,0,0,0.28)]
        "
      >
        <h2
          className="
            mb-6

            text-left

            text-2xl
            font-semibold

            text-black
          "
        >
          {title}
        </h2>

        {errorMessage && (
          <div
            className="
              mb-4

              rounded-lg

              border
              border-[#EC1C40]/25

              bg-[#EC1C40]/[0.06]

              p-3

              text-[14px]
              font-medium

              text-[#EC1C40]
            "
          >
            {errorMessage}
          </div>
        )}

        {isDisabled ? (
          <p
            className="
              text-center
              font-semibold

              text-[#EC1C40]
            "
          >
            You have reached the
            maximum submission limit.
            Try again after 24 hours.
          </p>
        ) : (
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            <div
              className="
                relative

                flex
                items-center
              "
            >
              <FaUser
                className="
                  absolute
                  left-4

                  text-black/40
                "
              />

              <input
                name="fullName"
                placeholder="Full Name *"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  rounded-xl

                  border
                  border-black/15

                  bg-white

                  p-4
                  pl-12

                  text-black

                  shadow-sm

                  outline-none

                  transition

                  placeholder:text-black/40

                  focus:border-[#EC1C40]

                  focus:ring-2
                  focus:ring-[#EC1C40]/15
                "
              />
            </div>

            <div
              className="
                relative

                flex
                items-center
              "
            >
              <FaPhoneAlt
                className="
                  absolute
                  left-4

                  text-black/40
                "
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number *"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                required
                className="
                  w-full

                  rounded-xl

                  border
                  border-black/15

                  bg-white

                  p-4
                  pl-12

                  text-black

                  shadow-sm

                  outline-none

                  transition

                  placeholder:text-black/40

                  focus:border-[#EC1C40]

                  focus:ring-2
                  focus:ring-[#EC1C40]/15
                "
              />
            </div>

            <button
              type="submit"
              disabled={
                isLoading ||
                isDisabled
              }
              className={`
                w-full

                rounded-xl

                p-4

                text-lg
                font-semibold

                text-white

                shadow-md

                transition-all
                duration-300

                ${
                  isLoading ||
                  isDisabled
                    ? `
                        cursor-not-allowed

                        bg-[#EC1C40]/50
                      `
                    : `
                        bg-[#d9183a]

                        hover:bg-[#d9183a]

                        hover:shadow-[0_12px_30px_-14px_rgba(236,28,64,0.55)]

                        active:scale-[0.98]
                      `
                }
              `}
            >
              {isLoading
                ? "Submitting..."
                : "Get A Call back"}
            </button>
          </form>
        )}
      </div>

      {showPopup && (
        <div
          className="
            fixed
            inset-0

            z-50

            flex
            items-center
            justify-center

            bg-black/60

            p-4

            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full
              max-w-md

              rounded-2xl

              border
              border-black/10

              bg-white

              p-8

              shadow-[0_28px_80px_-24px_rgba(0,0,0,0.38)]
            "
          >
            <div
              className="
                mx-auto
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
                aria-hidden="true"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3
              className="
                mb-3

                text-center

                text-2xl
                font-bold

                text-black
              "
            >
              Thank You!
            </h3>

            <p
              className="
                mb-6

                text-center

                text-[15px]
                leading-6

                text-black/60
              "
            >
              Your form has been
              submitted successfully.
              We&apos;ll get back to you
              soon.
            </p>

            <button
              onClick={() =>
                setShowPopup(false)
              }
              className="
                w-full

                rounded-xl

                bg-[#EC1C40]

                px-4
                py-3

                font-semibold

                text-white

                transition-all
                duration-300

                hover:bg-[#d9183a]

                hover:shadow-[0_10px_26px_-14px_rgba(236,28,64,0.60)]

                active:scale-[0.98]
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
