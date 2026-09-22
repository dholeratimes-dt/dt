// "use client"
// import { useState } from "react";
// import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

// export default function LeadForm({ title, headline, buttonName, onClose }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [submissionCount, setSubmissionCount] = useState(0);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrorMessage(""); // Clear error on change
//   };

//   const validateForm = () => {
//     if (!formData.fullName || !formData.phone) {
//       setErrorMessage("Please fill in all required fields");
//       return false;
//     }

//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setErrorMessage("Please enter a valid email address");
//       return false;
//     }

//     if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
//       setErrorMessage("Please enter a valid phone number (10-15 digits)");
//       return false;
//     }

//     return true;
//   };

//   const submitLead = async () => {
//     try {
//       // Get submission count and last submission timestamp
//       let submissionCount = localStorage.getItem("formSubmissionCount") || 0;
//       let lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

//       // Check if 24 hours have passed since the last submission
//       if (lastSubmissionTime) {
//         const timeDifference = Date.now() - parseInt(lastSubmissionTime, 10);
//         const hoursPassed = timeDifference / (1000 * 60 * 60);

//         if (hoursPassed >= 24) {
//           // Reset submission count after 24 hours
//           submissionCount = 0;
//           localStorage.setItem("formSubmissionCount", 0);
//           localStorage.setItem("lastSubmissionTime", Date.now().toString());
//         }
//       }

//       // Restrict submission after 3 attempts
//       if (submissionCount >= 3) {
//         setErrorMessage(
//           "You have reached the maximum submission limit. Try again after 24 hours.",
//         );
//         setIsDisabled(true);
//         return;
//       }

//       // API Request — internal route proxies to TeleCRM, keeping the API key server-side
//       const response = await fetch("/api/submit-form", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fields: {
//             name: formData.fullName,
//             phone: formData.phone,
//             email: formData.email,
//             source: "Dholera Times",
//           },
//           source: "Dholera Times Website",
//           tags: ["Dholera Investment", "Website Lead"],
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setFormData({ fullName: "", email: "", phone: "" });
//         setShowPopup(true);

//         // Increment submission count & store time
//         submissionCount++;
//         setSubmissionCount(submissionCount);
//         localStorage.setItem("formSubmissionCount", submissionCount);
//         localStorage.setItem("lastSubmissionTime", Date.now().toString());
//         /* Google Tag */
//         window.dataLayer = window.dataLayer || [];
//         window.dataLayer.push({
//           event: "lead_form",
//         });
//       } else {
//         console.error("Submission failed:", data.error);
//         setErrorMessage(data.error || "Submission failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrorMessage("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }

//     await submitLead();
//   };

//   const handleClose = () => {
//     if (onClose && typeof onClose === "function") {
//       onClose();
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="bg-gradient-to-b from-blue-50 to-white p-8 shadow-2xl w-full mx-auto border border-gray-200 rounded-xl">
//         <button
//           type="button"
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b69b5e] rounded-full p-1 transition-all duration-200 hover:bg-gray-700 z-10"
//           aria-label="Close form"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           {title}
//         </h2>

//         {errorMessage && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {errorMessage}
//           </div>
//         )}

//         {isDisabled ? (
//           <p className="text-center text-red-500 font-semibold">
//             You have reached the maximum submission limit. Try again after 24
//             hours.
//           </p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name Input */}
//             <div className="relative">
//               <FaUser className="absolute left-4 top-4 text-gray-500" />
//               <input
//                 name="fullName"
//                 placeholder="Full Name *"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
//               />
//             </div>

//             {/* Phone Number Input */}
//             <div className="relative">
//               <FaPhoneAlt className="absolute left-4 top-4 text-gray-500" />
//               <input
//                 name="phone"
//                 type="tel"
//                 placeholder="Phone Number *"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading || isDisabled}
//               className={`w-full p-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ${
//                 isLoading || isDisabled
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-[#d7b56d] hover:bg-[#c6a45d] hover:shadow-lg active:scale-95"
//               }`}
//             >
//               {isLoading ? "Submitting..." : buttonName}
//             </button>
//           </form>
//         )}
//       </div>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-lg">
//             <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
//               Thank You!
//             </h3>
//             <p className="text-center text-gray-600 mb-6">
//               Your form has been submitted successfully. We'll get back to you
//               soon.
//             </p>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="w-full bg-[#be9233] hover:bg-[#dbaf51] text-white font-semibold py-3 px-4 rounded-xl transition duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



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
    <div className="relative mt-6 w-full lg:mt-0" >
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
          border-[#EAD9DF]

          bg-white

          px-4
          pb-5
          pt-6

          shadow-[0_18px_55px_rgba(57,37,46,0.12)]

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
            from-[#742039]
            via-[#8F2946]
            to-[#C9738B]
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

              text-[#39252E]

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

                text-[#68565E]

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
              border-[#E5B8C6]

              bg-[#FFF5F7]

              px-4
              py-3

              text-[13px]
              font-medium
              leading-5

              text-[#8F2946]

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
              border-[#E5B8C6]

              bg-[#FFF5F7]

              px-4
              py-4

              text-left

              text-[14px]
              font-semibold
              leading-6

              text-[#8F2946]

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

                  text-[#8F2946]
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
                  border-[#DFC9D1]

                  bg-white

                  py-3
                  pl-11
                  pr-4

                  text-[16px]
                  leading-6

                  text-[#39252E]

                  placeholder:text-[#9A858E]

                  shadow-[0_2px_8px_rgba(57,37,46,0.025)]

                  transition-[border-color,box-shadow,background-color]
                  duration-200

                  hover:border-[#D3A7B6]

                  focus:border-[#8F2946]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#8F2946]/10

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

                  text-[#8F2946]
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
                  border-[#DFC9D1]

                  bg-white

                  py-3
                  pl-11
                  pr-4

                  text-[16px]
                  leading-6

                  text-[#39252E]

                  placeholder:text-[#9A858E]

                  shadow-[0_2px_8px_rgba(57,37,46,0.025)]

                  transition-[border-color,box-shadow,background-color]
                  duration-200

                  hover:border-[#D3A7B6]

                  focus:border-[#8F2946]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#8F2946]/10

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

                bg-[#8F2946]

                px-5
                py-3

                text-[16px]
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

                disabled:cursor-not-allowed
                disabled:bg-[#C8B8BE]
                disabled:shadow-none
                disabled:hover:translate-y-0

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#8F2946]
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

            bg-[#39252E]/65

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
              border-[#EAD9DF]

              bg-white

              p-5

              shadow-[0_28px_80px_rgba(57,37,46,0.30)]

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
                from-[#742039]
                via-[#8F2946]
                to-[#C9738B]
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
                border-[#E0A4B5]/60

                bg-[#F7EBEF]

                text-[20px]
                font-bold

                text-[#8F2946]

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

                text-[#39252E]

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

                text-[#68565E]

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

                bg-[#EAD9DF]

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

                bg-[#8F2946]

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
                focus-visible:ring-[#8F2946]
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