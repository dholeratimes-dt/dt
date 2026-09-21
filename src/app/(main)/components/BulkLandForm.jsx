// "use client";
// import { useState } from "react";
// import React from "react";
// import { motion } from "framer-motion";
// import "./about.css";

// export default function BulkLand({ title, buttonName, pageName }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//   });
//   const [showPopup, setShowPopup] = useState(false);
//   const [submissionCount, setSubmissionCount] = useState(0);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     setErrorMessage(""); // Clear error messages on input change
//   };

//   const getLeadSource = () => {
//     if (typeof window === "undefined") return "Dholera Times";
//     const params = new URLSearchParams(window.location.search);
//     if (params.has("twclid")) return "Dholera Times Twitter Ads";
//     if (params.has("dholera-sir-blogs")) return "Dholera Times Blogs";
//     if (params.has("dholera-sir-updates")) return "Dholera Times Updates";
//     if (params.has("about-dholera-sir")) return "Dholera Times Dholera SIR";
//     if (params.has("gad_source")) return "Dholera Times Google Ads";
//     return "Dholera Times";
//   };

//   const validateForm = () => {
//     if (!formData.fullName.trim() || !formData.phone.trim()) {
//       setErrorMessage("Please fill in all required fields");
//       return false;
//     }

//     // Email validation (optional field)
//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setErrorMessage("Please enter a valid email address");
//       return false;
//     }

//     // Phone validation - accept various formats (10-15 digits)
//     if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
//       setErrorMessage("Please enter a valid phone number (10-15 digits)");
//       return false;
//     }

//     // Check submission limits
//     if (submissionCount >= 20) {
//       setErrorMessage(
//         "You have reached the maximum submission limit. Try again after 24 hours.",
//       );
//       setIsDisabled(true);
//       return false;
//     }

//     return true;
//   };

//   const submitLead = async () => {
//     try {
//       const response = await fetch(
//         "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
//           },
//           body: JSON.stringify({
//             fields: {
//               name: formData.fullName,
//               phone: formData.phone,
//               email: formData.email,
//               source: getLeadSource(),
//             },
//             source: "Dholera Times Website",
//             tags: ["Dholera Investment", "Website Lead", "Bulk Land"],
//           }),
//         },
//       );

//       const responseText = await response.text();
//       console.log("TeleCRM Response:", responseText);

//       if (response.ok) {
//         if (
//           responseText === "OK" ||
//           responseText.toLowerCase().includes("success")
//         ) {
//           setFormData({ fullName: "", email: "", phone: "" });
//           setShowPopup(true);

//           const newCount = submissionCount + 1;
//           setSubmissionCount(newCount);
//           if (typeof window !== "undefined") {
//             localStorage.setItem("formSubmissionCount", newCount.toString());
//             localStorage.setItem("lastSubmissionTime", Date.now().toString());
//           }
//           /* Google Tag */
//           window.dataLayer = window.dataLayer || [];
//           window.dataLayer.push({
//             event: "lead_form",
//             page_name: pageName,
//           });
//         } else {
//           console.log("Response Text:", responseText);
//           setErrorMessage("Submission received but with unexpected response");
//         }
//       } else {
//         console.error("Server Error:", responseText);
//         throw new Error(responseText || "Submission failed");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrorMessage(`Error submitting form: ${error.message}`);
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

//   return (
//     <div>
//       <section className="py-8 bg-gradient-to-b from-blue-50 to-white">
//         <div className="container mx-auto px-6 sm:px-12">
//           <div className="max-w-5xl mx-auto">
//             <h2 className="text-[#151f28] text-xl md:text-3xl font-bold text-center">
//               {title}
//             </h2>
//             {showPopup ? (
//               <div className="text-center py-8">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="mb-4 inline-block"
//                 >
//                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-10 w-10 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                 </motion.div>
//                 <h3 className="text-2xl font-bold text-white mb-2">
//                   Thank You!
//                 </h3>
//                 <p className="text-gray-300">
//                   Your request has been submitted successfully. We'll contact
//                   you shortly.
//                 </p>
//               </div>
//             ) : isDisabled ? (
//               <div className="text-center py-8">
//                 <p className="text-center text-red-400 font-semibold">
//                   You have reached the maximum submission limit. Try again after
//                   24 hours.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="mt-12 space-y-6">
//                 {errorMessage && (
//                   <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
//                     {errorMessage}
//                   </div>
//                 )}
//                 <div className="max-sm:space-y-4 md:flex justify-center items-center gap-6">
//                   <div className="w-full">
//                     <label
//                       htmlFor="fullName"
//                       className="block text-[#151f28] text-sm font-medium mb-2"
//                     >
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-lg border border-gray-700 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-[#b69b5e]"
//                       placeholder="Enter your name"
//                     />
//                   </div>

//                   <div className="w-full">
//                     <label
//                       htmlFor="phone"
//                       className="block text-[#151f28] text-sm font-medium mb-2"
//                     >
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-lg  border border-gray-700 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-[#b69b5e]"
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={isLoading || isDisabled}
//                     className={`w-full font-bold text-white py-3 px-6 rounded-lg transition duration-300 ${
//                       isLoading || isDisabled
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-[#b69b5e] hover:bg-[#d3b36b] hover:shadow-lg active:scale-95"
//                     }`}
//                   >
//                     {isLoading
//                       ? "Submitting..."
//                       : buttonName || "Get A Call Back"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function BulkLand({ title, buttonName, pageName }) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /* Restore submission limit */
  useEffect(() => {
    const storedCount = Number(
      localStorage.getItem("formSubmissionCount") || 0,
    );

    const lastSubmissionTime = Number(
      localStorage.getItem("lastSubmissionTime") || 0,
    );

    const twentyFourHours = 24 * 60 * 60 * 1000;

    const isWithinLimitPeriod =
      Date.now() - lastSubmissionTime < twentyFourHours;

    if (isWithinLimitPeriod) {
      setSubmissionCount(storedCount);
      setIsDisabled(storedCount >= 20);
      return;
    }

    localStorage.removeItem("formSubmissionCount");
    localStorage.removeItem("lastSubmissionTime");

    setSubmissionCount(0);
    setIsDisabled(false);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const getLeadSource = () => {
    if (typeof window === "undefined") {
      return "Dholera Times";
    }

    const params = new URLSearchParams(window.location.search);

    if (params.has("twclid")) {
      return "Dholera Times Twitter Ads";
    }

    if (params.has("dholera-sir-blogs")) {
      return "Dholera Times Blogs";
    }

    if (params.has("dholera-sir-updates")) {
      return "Dholera Times Updates";
    }

    if (params.has("about-dholera-sir")) {
      return "Dholera Times Dholera SIR";
    }

    if (params.has("gad_source")) {
      return "Dholera Times Google Ads";
    }

    return "Dholera Times";
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    const normalizedPhone = formData.phone.replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(normalizedPhone)) {
      setErrorMessage(
        "Please enter a valid phone number between 10 and 15 digits.",
      );

      return false;
    }

    if (submissionCount >= 20) {
      setErrorMessage(
        "You have reached the maximum submission limit. Please try again after 24 hours.",
      );

      setIsDisabled(true);

      return false;
    }

    return true;
  };

  const submitLead = async () => {
    try {
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },

          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              source: getLeadSource(),
            },

            source: "Dholera Times Website",

            tags: [
              "Dholera Investment",
              "Website Lead",
              "Bulk Land",
            ],
          }),
        },
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          responseText || "Submission failed. Please try again.",
        );
      }

      const success =
        responseText === "OK" ||
        responseText.toLowerCase().includes("success");

      if (!success) {
        setErrorMessage(
          "Your submission was received with an unexpected response.",
        );

        return;
      }

      setFormData({
        fullName: "",
        email: "",
        phone: "",
      });

      setShowPopup(true);

      const newCount = submissionCount + 1;

      setSubmissionCount(newCount);

      localStorage.setItem(
        "formSubmissionCount",
        newCount.toString(),
      );

      localStorage.setItem(
        "lastSubmissionTime",
        Date.now().toString(),
      );

      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "lead_form",
        page_name: pageName,
      });

      if (newCount >= 20) {
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      setErrorMessage(
        error?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading || isDisabled) return;

    setErrorMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    await submitLead();
  };

  /*
   * Light premium input styling using
   * the burgundy and dusty-blush palette.
   */
  const inputClass = `
    h-12 w-full min-w-0 appearance-none
    rounded-lg
    border border-[#EAD9DF]
    bg-[#F7EBEF]
    px-4
    text-[16px] font-normal leading-6 text-[#39252E]
    placeholder:text-[#8A737D]
    caret-[#8F2946]
    accent-[#8F2946]
    outline-none ring-0
    transition-colors duration-200

    hover:border-[#E0A4B5]
    hover:bg-[#F5E8ED]

    focus:border-[#8F2946]
    focus:bg-white
    focus:outline-none
    focus:ring-2
    focus:ring-[#8F2946]/15
    focus:ring-offset-0

    focus-visible:border-[#8F2946]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#8F2946]/15

    disabled:cursor-not-allowed
    disabled:opacity-60

    motion-reduce:transition-none
  `;

  const labelClass = `
    mb-2 block
    text-[14px] font-semibold
    leading-5 text-[#39252E]
  `;

  return (
    <section
      aria-labelledby="bulk-land-form-heading"
      className="
        bg-[#FAF7F8]
        px-4 py-8 pb-10
        min-[414px]:px-6
        md:px-8 md:py-12
        lg:py-14
        selection:bg-[#E0A4B5]
        selection:text-[#39252E]
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="
            grid grid-cols-1 gap-8
            lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
            lg:items-center lg:gap-14
          "
        >
          {/* Left content */}
          <div className="max-w-[520px]">
            <h2
              id="bulk-land-form-heading"
              className="
                text-[28px] font-bold leading-[36px]
                tracking-tight text-[#39252E]
                md:text-[36px] md:leading-[44px]
                lg:text-[40px] lg:leading-[48px]
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-4 max-w-[470px]
                text-[16px] font-normal leading-[26px]
                text-[#68565E]
                md:text-[17px] md:leading-[28px]
              "
            >
              Share your details and our team will connect with you to
              understand your requirements and provide the relevant
              information.
            </p>

            <div
              className="
                mt-6 grid grid-cols-1 gap-3
                sm:grid-cols-2 lg:grid-cols-1
              "
            >
              <div className="flex items-center gap-3 text-[14px] font-medium leading-5 text-[#51414A]">
                <span
                  aria-hidden="true"
                  className="
                    flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full
                    bg-[#F7EBEF]
                    text-[12px] font-bold text-[#8F2946]
                  "
                >
                  ✓
                </span>

                Quick response from our team
              </div>

              <div className="flex items-center gap-3 text-[14px] font-medium leading-5 text-[#51414A]">
                <span
                  aria-hidden="true"
                  className="
                    flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full
                    bg-[#F7EBEF]
                    text-[12px] font-bold text-[#8F2946]
                  "
                >
                  ✓
                </span>

                No obligation enquiry
              </div>
            </div>
          </div>

          {/* Right form area */}
          <div
            className="
              min-w-0
              rounded-2xl
              border border-[#E0A4B5]/60
              bg-white
              p-5
              shadow-[0_16px_44px_-24px_rgba(116,32,57,0.18)]
              min-[414px]:p-6
              md:p-8
            "
          >
            {showPopup ? (
              <div
                className="
                  flex min-h-[280px] flex-col
                  items-center justify-center
                  text-center
                "
                role="status"
                aria-live="polite"
              >
                <div
                  className="
                    mb-5
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    border border-[#E0A4B5]/50
                    bg-[#F7EBEF]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-8 w-8 text-[#8F2946]"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-[24px] font-bold leading-8 text-[#39252E]">
                  Thank You!
                </h3>

                <p
                  className="
                    mt-2 max-w-[460px]
                    text-[15px] leading-6
                    text-[#68565E]
                  "
                >
                  Your request has been submitted successfully. Our team
                  will contact you shortly.
                </p>
              </div>
            ) : isDisabled ? (
              <div className="flex min-h-[250px] items-center justify-center text-center">
                <div
                  className="
                    max-w-[470px]
                    rounded-lg
                    border border-[#E0A4B5]/60
                    bg-[#F7EBEF]
                    px-5 py-4
                  "
                >
                  <p
                    className="
                      text-[15px] font-medium leading-6
                      text-[#51414A]
                    "
                  >
                    You have reached the maximum submission limit.
                    Please try again after 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-busy={isLoading}
                noValidate
              >
                <div className="mb-6">
                  <h3
                    className="
                      text-[20px] font-semibold leading-7
                      text-[#39252E]
                      md:text-[22px] md:leading-[30px]
                    "
                  >
                    Tell us your requirements
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[14px] leading-[22px]
                      text-[#68565E]
                    "
                  >
                    Fields marked with{" "}
                    <span className="text-[#8F2946]">*</span>{" "}
                    are required.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="
                      mb-5
                      rounded-lg
                      border border-[#E0A4B5]/60
                      bg-[#F7EBEF]
                      px-4 py-3
                      text-[14px] font-medium leading-[22px]
                      text-[#742039]
                    "
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                  <div className="min-w-0">
                    <label
                      htmlFor="fullName"
                      className={labelClass}
                    >
                      Full Name{" "}
                      <span
                        className="text-[#8F2946]"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      disabled={isLoading}
                      placeholder="Enter your name"
                      className={inputClass}
                    />
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="phone"
                      className={labelClass}
                    >
                      Phone Number{" "}
                      <span
                        className="text-[#8F2946]"
                        aria-hidden="true"
                      >
                        *
                      </span>
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      disabled={isLoading}
                      placeholder="Enter your phone number"
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isDisabled}
                  className="
                    mt-6
                    inline-flex min-h-12 w-full
                    touch-manipulation
                    items-center justify-center gap-2
                    rounded-lg
                    bg-[#8F2946]
                    px-6 py-3
                    text-[17px] font-semibold leading-6
                    text-white
                    transition-colors duration-200

                    enabled:hover:bg-[#742039]
                    enabled:active:bg-[#642033]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#8F2946]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-white

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    motion-reduce:transition-none
                  "
                >
                  {isLoading ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="
                          h-4 w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-white/30
                          border-t-white
                          motion-reduce:animate-none
                        "
                      />

                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>
                        {buttonName || "Get A Call Back"}
                      </span>

                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}