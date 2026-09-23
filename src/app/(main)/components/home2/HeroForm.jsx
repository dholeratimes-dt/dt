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
      className="mx-auto w-full mb-8 lg:mt-8 min-w-0 max-w-[420px] overflow-hidden rounded-2xl border border-[#E0A4B5]/60 bg-white text-[#39252E] shadow-[0_16px_48px_rgba(116,32,57,0.10)] selection:bg-[#E0A4B5] selection:text-[#39252E]"
    >
      <div className="p-5 pb-6 sm:p-6 lg:pb-8">
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
