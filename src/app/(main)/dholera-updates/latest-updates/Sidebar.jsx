// "use client";
// import { AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import LeadForm from "../../dholera-sir/LeadForm";

// const formatDate = (dateString) => {
//   if (!dateString) return "";

//   const date = new Date(dateString);
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   };

//   return date.toLocaleDateString("en-US", options);
// };

// // Create a separate client component for the sidebar with form
// export default function SidebarWithForm({ popularArticles }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({ fullName: "", phone: "" });
//   const [showPopup, setShowPopup] = useState(false);
//   const [submissionCount, setSubmissionCount] = useState(0);
//   const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
//   const recaptchaRef = useRef(null);
//   const recaptchaWidgetId = useRef(null);
//   const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
//   const [isContactFormOpen, setIsContactFormOpen] = useState(false);

//   const [formTitle, setFormTitle] = useState("");
//   const [formHeadline, setFormHeadline] = useState("");
//   const [buttonName, setButtonName] = useState("");
//   const [formType, setFormType] = useState("");

//   const openContactForm = (title, headline, btnName, type) => {
//     setFormTitle(title);
//     setFormHeadline(headline);
//     setButtonName(btnName);
//     setFormType(type);
//     setIsContactFormOpen(true);
//   };

//   const closeContactForm = () => {
//     setIsContactFormOpen(false);
//   };

//   useEffect(() => {
//     const loadRecaptcha = () => {
//       if (typeof window !== "undefined" && !window.grecaptcha) {
//         try {
//           const script = document.createElement("script");
//           script.src = "https://www.google.com/recaptcha/api.js";
//           script.async = true;
//           script.defer = true;
//           script.onload = () => setRecaptchaLoaded(true);
//           script.onerror = () => {
//             console.error("Failed to load reCAPTCHA script");
//             setRecaptchaLoaded(true);
//           };
//           document.head.appendChild(script);
//         } catch (err) {
//           console.error("reCAPTCHA script loading error:", err);
//           setRecaptchaLoaded(true);
//         }
//       } else if (window.grecaptcha) {
//         setRecaptchaLoaded(true);
//       }
//     };

//     loadRecaptcha();

//     // Get submission count from localStorage
//     if (typeof window !== "undefined") {
//       setSubmissionCount(
//         parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
//       );
//       setLastSubmissionTime(
//         parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
//       );
//     }

//     // Prevent modal close when clicking inside
//     const handleClickInside = (e) => {
//       e.stopPropagation();
//     };

//     const formElement = document.getElementById("contact-form-container");
//     if (formElement) {
//       formElement.addEventListener("click", handleClickInside);
//     }

//     return () => {
//       if (formElement) {
//         formElement.removeEventListener("click", handleClickInside);
//       }
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     setErrorMessage(""); // Clear error messages on input change
//   };

//   const validateForm = () => {
//     if (!formData.fullName || !formData.phone) {
//       setErrorMessage("Please fill in all fields");
//       return false;
//     }

//     // Simple phone validation
//     if (!/^\d{10,15}$/.test(formData.phone)) {
//       setErrorMessage("Please enter a valid phone number (10-15 digits)");
//       return false;
//     }

//     // Check submission limits
//     const now = Date.now();
//     const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

//     if (hoursPassed >= 24) {
//       // Reset counter if 24 hours have passed
//       setSubmissionCount(0);
//       if (typeof window !== "undefined") {
//         localStorage.setItem("formSubmissionCount", "0");
//         localStorage.setItem("lastSubmissionTime", now.toString());
//       }
//     } else if (submissionCount >= 3) {
//       setErrorMessage(
//         "You have reached the maximum submission limit. Try again after 24 hours."
//       );
//       return false;
//     }
//     return true;
//   };

//   const onRecaptchaSuccess = async (token) => {
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
//               source: "Dholera Times",
//             },
//             source: "Dholera Times Website",
//             tags: ["Dholera Investment", "Website Lead"],
//           }),
//         }
//       );

//       const responseText = await response.text();

//       if (response.ok) {
//         // Success handling
//         setFormData({ fullName: "", phone: "" });
//         setShowPopup(true);
//         setSubmissionCount((prev) => {
//           const newCount = prev + 1;
//           if (typeof window !== "undefined") {
//             localStorage.setItem("formSubmissionCount", newCount.toString());
//             localStorage.setItem("lastSubmissionTime", Date.now().toString());
//           }
//           return newCount;
//         });
//       } else {
//         // Parse response as JSON if possible, otherwise use text
//         let errorData;
//         try {
//           errorData = JSON.parse(responseText);
//         } catch {
//           errorData = { message: responseText };
//         }
//         throw new Error(errorData.message || "Error submitting form");
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setErrorMessage(
//         error.message || "Error submitting form. Please try again."
//       );
//     } finally {
//       setIsLoading(false);

//       // Reset reCAPTCHA
//       if (window.grecaptcha && recaptchaWidgetId.current !== null) {
//         try {
//           window.grecaptcha.reset(recaptchaWidgetId.current);
//         } catch (err) {
//           console.error("Error resetting reCAPTCHA:", err);
//         }
//       }
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

//     // If reCAPTCHA is loaded, render it in the ref
//     if (window.grecaptcha && recaptchaLoaded && siteKey) {
//       try {
//         // Check if reCAPTCHA widget is already rendered
//         if (recaptchaWidgetId.current === null && recaptchaRef.current) {
//           recaptchaWidgetId.current = window.grecaptcha.render(
//             recaptchaRef.current,
//             {
//               sitekey: siteKey,
//               callback: onRecaptchaSuccess,
//               theme: "dark",
//             }
//           );
//         } else if (recaptchaWidgetId.current !== null) {
//           // Reset and execute existing widget
//           window.grecaptcha.reset(recaptchaWidgetId.current);
//           window.grecaptcha.execute(recaptchaWidgetId.current);
//         }
//       } catch (error) {
//         console.error("Error rendering reCAPTCHA:", error);
//         setErrorMessage("Error with verification. Please try again.");
//         setIsLoading(false);
//       }
//     } else {
//       setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <aside className="lg:sticky lg:top-24 space-y-6">
//       {/* Get Our Free Guide Widget */}
//       <div className="bg-[#f9f9f9] rounded-xl shadow-sm p-6 border border-gray-200">
//         <h3 className="text-lg font-bold text-gray-900 mb-4">
//           Get Verified Dholera Plot Details and Plan Layout 
//         </h3>
//         <p className="text-gray-600 text-sm mb-6">
//           Download our comprehensive guide covering investment opportunities,
//           infrastructure development, and future prospects in Dholera SIR.
//         </p>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Enter your full name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:border-[#deae3c]"
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:border-[#deae3c]"
//             required
//           />
//           {errorMessage && (
//             <p className="text-red-500 text-sm">{errorMessage}</p>
//           )}
//           <div ref={recaptchaRef}></div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full text-gray-900 py-3 rounded-lg font-bold bg-[#b69b5e] hover:bg-[#d3b66b] transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? "Processing..." : "Download Free Guide"}
//           </button>
//         </form>
//       </div>

//       {/* Popular Articles Widget */}
//       <div className="bg-[#f9f9f9] rounded-xl shadow-sm p-6 border border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900 mb-6">
//           Popular Articles
//         </h3>
//         <div className="space-y-4">
//           {popularArticles.map((article, index) => (
//             <article
//               key={index}
//               className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
//             >
//               <Link
//                 href={`/dholera-updates/latest-updates/${article.slug.current}`}
//                 className="block group"
//               >
//                 <h4 className="text-base font-semibold text-[#151f28] mb-1 group-hover:text-[#d3b36b] transition-colors">
//                   {article.title || `Dholera Update ${index + 1}`}
//                 </h4>
//                 <p className="text-sm text-gray-500">
//                   {formatDate(article.publishedAt || article._createdAt)}
//                 </p>
//               </Link>
//             </article>
//           ))}
//         </div>
//       </div>

//       {/* Schedule a Consultation */}
//       <div className="bg-[#f9f9f9] rounded-xl shadow-sm p-6 border border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900 mb-4">
//           Schedule Investment Consultation
//         </h3>
//         <p className="text-gray-600 text-sm mb-6">
//           Ready to invest in Dholera SIR? Get personalized guidance from our
//           investment experts.
//         </p>
//         <button
//           onClick={() =>
//             openContactForm(
//               "Get Free Advice from Dholera Investment Adviser",
//               "Please fill out the form to get exclusive details of WestWyn County. Fields marked with * are mandatory.",
//               "Enquire Now",
//               ""
//             )
//           }
//           className="w-full bg-[#b69b5e] hover:bg-[#d3b66b] text-gray-900 py-3 rounded-lg font-bold transition-all duration-300 shadow-sm hover:shadow-md"
//         >
//           Book Free Consultation
//         </button>
//       </div>

//       {/* Newsletter Signup */}
//       {/* <div className="bg-gradient-to-br from-[#deae3c]/10 to-gray-100 rounded-xl p-6 border border-gray-200">
//         <h3 className="text-xl font-bold text-gray-900 mb-4">
//           Stay Updated
//         </h3>
//         <p className="text-gray-600 text-sm mb-6">
//           Get weekly updates about Dholera SIR developments directly in your inbox.
//         </p>
//         <form className="space-y-3">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:border-[#deae3c]"
//             required
//           />
//           <button 
//             type="submit"
//             className="w-full bg-[#deae3c] text-gray-900 py-3 rounded-lg font-bold hover:bg-[#d0a235] transition-colors shadow-sm hover:shadow-md"
//           >
//             Subscribe Now
//           </button>
//         </form>
//       </div> */}

//       {/* Form Popup */}
//       <AnimatePresence>
//         {isContactFormOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
//             <div className="w-full max-w-md">
//               <LeadForm
//                 onClose={closeContactForm}
//                 title={formTitle}
//                 headline={formHeadline}
//                 buttonName={buttonName}
//                 /*  onAfterSubmit={handleAfterSubmit} */
//               />
//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             id="contact-form-container"
//             className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
//           >
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Thank You!</h3>
//             <p className="text-gray-600 mb-4">
//               Your information has been submitted successfully. Our investment
//               expert will contact you shortly.
//             </p>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="w-full bg-[#deae3c] text-gray-900 py-2 rounded-lg font-bold hover:bg-[#d0a235]"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// }



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

              bg-[#8F2946]
            "
          />

          <div
            aria-hidden="true"
            className="
              mb-4
              h-1
              w-10

              rounded-full

              bg-[#E0A4B5]
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
            Get Verified Dholera Plot Details and Plan Layout
          </h3>

          <p
            className="
              mt-3

              text-[14px]
              leading-6

              text-[#68565E]
            "
          >
            Download our comprehensive guide covering investment
            opportunities, infrastructure development, and future
            prospects in Dholera SIR.
          </p>

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

                focus:border-[#8F2946]
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-[#8F2946]/10
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

                focus:border-[#8F2946]
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-[#8F2946]/10
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

                  text-[#8F2946]
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

                bg-[#8F2946]

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
                focus-visible:ring-[#8F2946]
                focus-visible:ring-offset-2

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              {isLoading
                ? "Processing..."
                : "Download Free Guide"}
            </button>
          </form>
        </section>

        {/* ===================================================
            POPULAR ARTICLES
        ==================================================== */}

        <section
          className="
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
              mb-4
              h-1
              w-10

              rounded-full

              bg-[#E0A4B5]
            "
          />

          <h3
            className="
              text-[20px]
              font-semibold
              leading-[1.3]

              tracking-[-0.02em]

              text-[#39252E]
            "
          >
            Popular Articles
          </h3>

          <div
            className="
              mt-5

              divide-y
              divide-[#EAD9DF]
            "
          >
            {popularArticles.map(
              (
                article,
                index,
              ) => {
                const slug =
                  article.slug
                    ?.current;

                const href =
                  slug &&
                  slug !== "#"
                    ? `/dholera-updates/latest-updates/${slug}`
                    : "/dholera-updates/latest-updates";

                return (
                  <article
                    key={
                      article._id ||
                      slug ||
                      index
                    }
                    className="
                      py-4

                      first:pt-0
                      last:pb-0
                    "
                  >
                    <Link
                      href={href}
                      className="
                        group
                        block

                        rounded-lg

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#8F2946]
                        focus-visible:ring-offset-4
                      "
                    >
                      <h4
                        className="
                          line-clamp-3

                          text-[15px]
                          font-semibold
                          leading-[23px]

                          tracking-[-0.01em]

                          text-[#39252E]

                          transition-colors
                          duration-200

                          group-hover:text-[#8F2946]

                          sm:text-[16px]
                          sm:leading-6
                        "
                      >
                        {article.title ||
                          `Dholera Update ${
                            index +
                            1
                          }`}
                      </h4>

                      <p
                        className="
                          mt-2

                          text-[13px]
                          leading-5

                          text-[#78666E]
                        "
                      >
                        {formatDate(
                          article.publishedAt ||
                            article._createdAt,
                        )}
                      </p>
                    </Link>
                  </article>
                );
              },
            )}
          </div>
        </section>
      </div>

      {/* =====================================================
          STICKY CONSULTATION CARD
      ====================================================== */}

      <div
        className="
          mt-6

          lg:sticky
          lg:top-[104px]
          lg:z-20
        "
      >
        <section
          className="
            relative
            overflow-hidden

            rounded-2xl

            border
            border-[#8F2946]/35

            bg-white
            via-[#FFFDFE]
            to-[#F7EBEF]

            p-5

            shadow-[0_10px_30px_rgba(116,32,57,0.08)]

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

              bg-[#8F2946]
            "
          />

          <div
            aria-hidden="true"
            className="
              mb-4
              h-1
              w-10

              rounded-full

              bg-[#8F2946]
            "
          />

          <h3
            className="
              text-[21px]
              font-semibold
              leading-[1.28]

              tracking-[-0.02em]

              text-[#39252E]

              sm:text-[22px]
            "
          >
            Schedule Investment Consultation
          </h3>

          <p
            className="
              mt-4

              text-[14px]
              leading-6

              text-[#68565E]

              sm:text-[15px]
            "
          >
            Ready to invest in Dholera SIR? Get personalized
            guidance from our investment experts.
          </p>

          <button
            type="button"
            onClick={() =>
              openContactForm(
                "Get Free Advice from Dholera Investment Adviser",
                "Please fill out the form to get exclusive details of WestWyn County. Fields marked with * are mandatory.",
                "Enquire Now",
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

              bg-[#8F2946]

              px-5
              py-3

              text-[15px]
              font-semibold
              leading-6

              text-white

              shadow-[0_7px_18px_rgba(143,41,70,0.17)]

              transition-[background-color,transform,box-shadow]
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#742039]

              hover:shadow-[0_10px_24px_rgba(116,32,57,0.23)]

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#8F2946]
              focus-visible:ring-offset-2

              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            Book Free Consultation
          </button>
        </section>
      </div>

      {/* =====================================================
          CONSULTATION FORM POPUP
      ====================================================== */}

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

                [&_svg]:!text-[#8F2946]

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

                [&_input:focus]:!border-[#8F2946]
                [&_input:focus]:!outline-none
                [&_input:focus]:!ring-4
                [&_input:focus]:!ring-[#8F2946]/10

                [&_textarea]:!rounded-xl

                [&_textarea]:!border
                [&_textarea]:!border-[#DFC9D1]

                [&_textarea]:!bg-white

                [&_textarea]:!text-[#39252E]

                [&_textarea]:placeholder:!text-[#9A858E]

                [&_textarea:focus]:!border-[#8F2946]
                [&_textarea:focus]:!outline-none
                [&_textarea:focus]:!ring-4
                [&_textarea:focus]:!ring-[#8F2946]/10

                [&_form_button]:!min-h-[52px]

                [&_form_button]:!rounded-xl

                [&_form_button]:!border-0

                [&_form_button]:!bg-[#8F2946]

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
                [&_form_button:focus-visible]:!ring-[#8F2946]
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
                  !via-[#8F2946]
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

      {/* =====================================================
          SUCCESS POPUP
      ====================================================== */}

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
                  via-[#8F2946]
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

                  text-[#8F2946]

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}