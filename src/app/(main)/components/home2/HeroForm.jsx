// // HeroForm.jsx (carousel version — matches Hero.jsx style)
// "use client";
// import React, { useState } from "react";

// const HeroForm = ({ isDisabled: parentIsDisabled, onSuccess }) => {
//   const [formData, setFormData] = useState({ fullName: "", phone: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrorMessage("");
//   };

//   const validateForm = () => {
//     if (!formData.fullName.trim() || !formData.phone.trim()) {
//       setErrorMessage("Please fill in all required fields");
//       return false;
//     }
//     if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
//       setErrorMessage("Please enter a valid phone number (10-15 digits)");
//       return false;
//     }
//     if (parentIsDisabled) {
//       setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const cleanedPhone = formData.phone.replace(/\D/g, "");

//       const response = await fetch("/api/submit-form", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fields: {
//             name: formData.fullName,
//             phone: cleanedPhone,
//             source: "Dholera Times",
//           },
//           source: "Dholera Times",
//           tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
//         }),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         throw new Error(data.error || `Submission failed (${response.status}). Please try again.`);
//       }

//       setFormData({ fullName: "", phone: "" });
//       if (onSuccess) onSuccess();
//       window.dataLayer = window.dataLayer || [];
//       window.dataLayer.push({ event: "lead_form_submitted" });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrorMessage(error.message || "Network error. Please check your connection and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full h-10 md:h-[clamp(2.25rem,3.45vw,2.85rem)] " +
//     "bg-white/5 border border-yellow-600/25 focus:border-yellow-500 " +
//     "rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] " +
//     "text-black placeholder:text-black " +
//     "text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] " +
//     "outline-none transition-colors";

//   return (
//     <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] bg-[#183D43] border border-yellow-[#B7D9DF] rounded-xl backdrop-blur-md p-4 md:p-[clamp(1.25rem,2.5vw,2rem)] w-full md:w-[clamp(340px,22vw,440px)]">
//       <h3 className="text-white font-semibold text-center text-lg md:text-[clamp(1.1rem,1.6vw,1.5rem)] leading-tight">
//         Registry Ready Plots in Dholera Starting from ₹10 Lakh
//       </h3>

//       {errorMessage && (
//         <div className="p-2 bg-red-500/20 border border-red-400 text-red-700 rounded-lg text-sm text-center">
//           {errorMessage}
//         </div>
//       )}

//       <input
//         name="fullName"
//         placeholder="Full Name*"
//         className={inputClass}
//         bg-white
//         value={formData.fullName}
//         onChange={handleChange}
//         required
//       />

//       <input
//         name="phone"
//         placeholder="Phone Number*"
//         type="tel"
//         className={inputClass}
//         value={formData.phone}
//         onChange={handleChange}
//         required
//       />

//       <button
//         type="button"
//         onClick={handleSubmit}
//         disabled={isLoading || parentIsDisabled}
//         className={`w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] font-bold px-6 rounded-lg transition-all duration-300 text-xs md:text-[clamp(0.7rem,0.9vw,0.82rem)] uppercase tracking-widest ${
//           isLoading || parentIsDisabled
//             ? "bg-gray-400 cursor-not-allowed text-gray-200"
//             : "bg-[#b69b5e] hover:bg-[#d3b36b] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//         }`}
//       >
//         {isLoading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             Submitting…
//           </span>
//         ) : (
//           "Get A Call Back"
//         )}
//       </button>
//     </div>
//   );
// };

// export default HeroForm;

// more dark color ------------------------------------------------------------------------

// "use client";

// import React, { useId, useState } from "react";

// const HeroForm = ({ isDisabled: parentIsDisabled = false, onSuccess }) => {
//   const formId = useId();
//   const [formData, setFormData] = useState({ fullName: "", phone: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const isDisabled = isLoading || parentIsDisabled;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLoading) return;

//     if (parentIsDisabled) {
//       setErrorMessage(
//         "You have reached the maximum submission limit. Try again after 24 hours."
//       );
//       return;
//     }

//     const fullName = formData.fullName.trim();
//     const cleanedPhone = formData.phone.replace(/\D/g, "");

//     if (!fullName || !formData.phone.trim()) {
//       setErrorMessage("Please fill in all required fields");
//       return;
//     }

//     if (!/^\d{10,15}$/.test(cleanedPhone)) {
//       setErrorMessage("Please enter a valid phone number (10-15 digits)");
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await fetch("/api/submit-form", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fields: {
//             name: fullName,
//             phone: cleanedPhone,
//             source: "Dholera Times",
//           },
//           source: "Dholera Times",
//           tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
//         }),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         throw new Error(
//           data.error ||
//             `Submission failed (${response.status}). Please try again.`
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrorMessage(
//         error.message ||
//           "Network error. Please check your connection and try again."
//       );
//       return;
//     } finally {
//       setIsLoading(false);
//     }

//     setFormData({ fullName: "", phone: "" });

//     window.dataLayer = window.dataLayer || [];
//     window.dataLayer.push({ event: "lead_form_submitted" });

//     onSuccess?.();
//   };

//   const inputClass = `
//     block h-[50px] w-full min-w-0
//     rounded-md border border-[#426A77]
//     bg-[#183D43] py-3 pl-12 pr-4
//     text-[16px] leading-6 text-[#F3F6F5]
//     placeholder:text-[#CBD8DA]
//     outline-none transition-colors
//     focus-visible:border-[#B7D9DF]
//     focus-visible:ring-2 focus-visible:ring-[#B7D9DF]/30
//     disabled:cursor-not-allowed disabled:opacity-60
//   `;

//   const iconClass =
//     "pointer-events-none absolute left-4 top-1/2 h-5 w-5 " +
//     "-translate-y-1/2 text-[#B7D9DF]";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       aria-labelledby={`${formId}-heading`}
//       aria-describedby={errorMessage ? `${formId}-error` : undefined}
//       aria-busy={isLoading}
//       className="
//         mx-auto box-border w-full min-w-0 max-w-[420px]
//         rounded-2xl border border-[#426A77]
//         bg-[#14191A] p-5 text-[#CBD8DA]
//         shadow-xl sm:p-6
//       "
//     >
//       <h3
//         id={`${formId}-heading`}
//         className="
//           m-0 text-center text-[22px] font-semibold
//           leading-[30px] tracking-tight text-[#F3F6F5]
//           sm:text-[24px] sm:leading-[32px]
//         "
//       >
//         Registry Ready Plots in Dholera Starting from ₹10 Lakh
//       </h3>

//       <div className="mt-6 flex flex-col gap-4">
//         <div className="relative">
//           <label htmlFor={`${formId}-name`} className="sr-only">
//             Full name (required)
//           </label>

//           <svg
//             className={iconClass}
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             aria-hidden="true"
//           >
//             <circle cx="12" cy="8" r="4" />
//             <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
//           </svg>

//           <input
//             id={`${formId}-name`}
//             name="fullName"
//             type="text"
//             autoComplete="name"
//             placeholder="Enter your full name"
//             className={inputClass}
//             value={formData.fullName}
//             onChange={handleChange}
//             disabled={isDisabled}
//             required
//           />
//         </div>

//         <div className="relative">
//           <label htmlFor={`${formId}-phone`} className="sr-only">
//             Phone number (required)
//           </label>

//           <svg
//             className={iconClass}
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             aria-hidden="true"
//           >
//             <rect x="6" y="2" width="12" height="20" rx="2" />
//             <path d="M10 18h4" />
//           </svg>

//           <input
//             id={`${formId}-phone`}
//             name="phone"
//             type="tel"
//             inputMode="tel"
//             autoComplete="tel"
//             placeholder="Enter your phone number"
//             className={inputClass}
//             value={formData.phone}
//             onChange={handleChange}
//             disabled={isDisabled}
//             required
//           />
//         </div>
//       </div>

//       {errorMessage && (
//         <p
//           id={`${formId}-error`}
//           role="alert"
//           className="
//             mt-4 rounded-md border border-red-300/40
//             bg-red-950/40 px-3 py-2
//             text-center text-sm leading-5 text-red-200
//           "
//         >
//           {errorMessage}
//         </p>
//       )}

//       <button
//         type="submit"
//         disabled={isDisabled}
//         className="
//           mt-8 inline-flex min-h-14 w-full
//           items-center justify-center gap-2
//           rounded-md bg-[#426A77] px-5 py-4
//           text-[16px] font-semibold leading-6 text-[#F3F6F5]
//           transition-colors hover:bg-[#365966]
//           focus-visible:outline-none
//           focus-visible:ring-2 focus-visible:ring-[#B7D9DF]
//           focus-visible:ring-offset-2
//           focus-visible:ring-offset-[#14191A]
//           disabled:cursor-not-allowed disabled:opacity-50
//           motion-reduce:transition-none
//         "
//       >
//         {isLoading && (
//           <span
//             aria-hidden="true"
//             className="
//               h-4 w-4 animate-spin rounded-full
//               border-2 border-white/30 border-t-white
//               motion-reduce:animate-none
//             "
//           />
//         )}

//         {isLoading ? "Submitting…" : "Get A Call Back"}
//       </button>
//     </form>
//   );
// };

// export default HeroForm;

"use client";

import { useId, useRef, useState } from "react";
import {
  LoaderCircle,
  Phone,
  UserRound,
} from "lucide-react";

const LIMIT_MESSAGE =
  "You have reached the maximum submission limit. Try again after 24 hours.";

export default function HeroForm({
  isDisabled: parentIsDisabled = false,
  onSuccess,
}) {
  const formId = useId();
  const submittingRef = useRef(false);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const isDisabled = isLoading || parentIsDisabled;
  const visibleError = errorMessage || (parentIsDisabled ? LIMIT_MESSAGE : "");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setFieldErrors((previous) => ({ ...previous, [name]: "" }));
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;
    setErrorMessage("");
    setSuccessMessage("");

    if (parentIsDisabled) {
      setErrorMessage(LIMIT_MESSAGE);
      return;
    }

    const fullName = formData.fullName.trim();
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    const errors = {};
    if (!fullName) errors.fullName = "Please fill in all required fields.";
    if (!/^\d{10,15}$/.test(cleanedPhone)) {
      errors.phone = "Please enter a valid phone number (10–15 digits).";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      (errors.fullName ? nameRef : phoneRef).current?.focus();
      return;
    }

    submittingRef.current = true;
    setIsLoading(true);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: { name: fullName, phone: cleanedPhone, source: "Dholera Times" },
          source: "Dholera Times",
          tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          data?.error || `Submission failed (${response.status}). Please try again.`,
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Please check your connection and try again.",
      );
      return;
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }

    setFormData({ fullName: "", phone: "" });
    setFieldErrors({});
    setSuccessMessage("Thank you! Your callback request has been received.");

    // Tracking or callback errors must not turn a saved lead into a form error.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submitted" });
    } catch (error) {
      console.error("Unable to track form submission:", error);
    }
    try {
      await onSuccess?.();
    } catch (error) {
      console.error("Post-submission callback failed:", error);
    }
  }

  function inputClass(hasError) {
    return `block min-h-[52px] w-full min-w-0 appearance-none rounded-lg border bg-white py-3 pl-11 pr-4 text-base font-normal leading-6 text-[#39252E] caret-[#8F2946] placeholder:text-[#78656D] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-[#FAF7F8] disabled:text-[#78656D] motion-reduce:transition-none ${
      hasError
        ? "border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]"
        : "border-[#9C838C] enabled:hover:border-[#8F2946] focus:border-[#8F2946] focus:ring-[#8F2946]"
    }`;
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-heading`}
      aria-describedby={visibleError ? `${formId}-error` : undefined}
      aria-busy={isLoading}
      className="mx-auto w-full min-w-0 max-w-[420px] overflow-hidden rounded-2xl border border-[#E0A4B5]/60 bg-white text-[#39252E] shadow-[0_16px_48px_rgba(116,32,57,0.10)] selection:bg-[#E0A4B5] selection:text-[#39252E]"
    >
      <div className="p-5 sm:p-6">
        <h3
          id={`${formId}-heading`}
          className="text-[20px] font-semibold leading-7 tracking-tight text-[#8F2946] sm:text-[22px] sm:leading-[30px] lg:text-[24px] lg:leading-8"
        >
          Registry Ready Plots in Dholera Starting from ₹10 Lakh
        </h3>

        <div className="mt-5 space-y-4">
          <div>
            <div className="relative">
              <UserRound size={19} strokeWidth={1.7} aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#68565E]" />
              <input
                ref={nameRef}
                id={`${formId}-name`}
                name="fullName"
                aria-label="Full name"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                placeholder="Enter your full name"
                className={inputClass(Boolean(fieldErrors.fullName))}
                value={formData.fullName}
                onChange={handleChange}
                disabled={isDisabled}
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={fieldErrors.fullName ? `${formId}-name-error` : undefined}
                required
              />
            </div>
            {fieldErrors.fullName && (
              <p id={`${formId}-name-error`} role="alert" className="mt-2 text-sm leading-5 text-[#B91C1C]">
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <Phone size={18} strokeWidth={1.7} aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#68565E]" />
              <input
                ref={phoneRef}
                id={`${formId}-phone`}
                name="phone"
                aria-label="Phone number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="send"
                placeholder="Enter your phone number"
                className={inputClass(Boolean(fieldErrors.phone))}
                value={formData.phone}
                onChange={handleChange}
                disabled={isDisabled}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? `${formId}-phone-error` : undefined}
                required
              />
            </div>
            {fieldErrors.phone && (
              <p id={`${formId}-phone-error`} role="alert" className="mt-2 text-sm leading-5 text-[#B91C1C]">
                {fieldErrors.phone}
              </p>
            )}
          </div>
        </div>

        {visibleError && (
          <p id={`${formId}-error`} role="alert"
            className="mt-4 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-3 text-sm leading-6 text-[#991B1B]">
            {visibleError}
          </p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="mt-5 inline-flex min-h-[52px] w-full touch-manipulation items-center justify-center gap-2.5 rounded-lg border border-transparent bg-[#8F2946] px-5 py-3 text-base font-semibold leading-6 text-white transition-colors duration-200 enabled:cursor-pointer enabled:hover:bg-[#742039] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8F2946] disabled:cursor-not-allowed disabled:bg-[#EAD9DF] disabled:text-[#68565E] motion-reduce:transition-none"
        >
          {isLoading && <LoaderCircle size={18} className="shrink-0 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
          {isLoading ? "Submitting…" : "Get A Call Back"}
        </button>

        <div role="status" aria-live="polite" aria-atomic="true">
          {successMessage && (
            <p className="mt-4 flex items-start gap-2 rounded-lg border border-[#EAD9DF] bg-[#FAF7F8] p-3 text-sm leading-6 text-[#39252E]">
              <span>{successMessage}</span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
