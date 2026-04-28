"use client";
import { useState } from "react";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { useRateLimit }  from "../../hooks/useRateLimit";
import { submitLead }    from "../../lib/submitLead";

const inputClass =
  "w-full h-10 md:h-[clamp(2.25rem,3.45vw,2.85rem)] " +
  "bg-white/5 border border-yellow-600/25 focus:border-yellow-500 " +
  "rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] " +
  "text-black placeholder:text-black " +
  "text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] " +
  "outline-none transition-colors";

const EMPTY = { fullName: "", phone: "", email: "", city: "", budget: "" };

export default function HeroForm({ onSuccess }) {
  const [formData, setFormData]     = useState(EMPTY);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState("");

  // ── shared hooks ──────────────────────────────────────────────
  const { load, getToken }  = useRecaptcha();                   // lazy script
  const { isDisabled, increment } = useRateLimit("heroForm", 20); // rate limit

  // ── handlers ──────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.budget) {
      setError("Please fill in all required fields"); return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address"); return false;
    }
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid phone number (10–15 digits)"); return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isDisabled) return;
    setIsLoading(true);
    setError("");

    try {
      // getToken() waits for the script to be ready automatically
      const token = await getToken("hero_form_submit");

      const notes = [
        formData.city   && `City: ${formData.city}`,
        formData.budget && `Budget: ${formData.budget}`,
      ].filter(Boolean).join(" | ");

      await submitLead({
        name:  formData.fullName,
        phone: formData.phone,
        email: formData.email,
        notes,
        tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
        recaptchaToken: token,
      });

      // success
      increment();
      setFormData(EMPTY);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submitted" });
      onSuccess?.();

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // load() fires on first focus — injects reCAPTCHA script lazily, once per page
    <div
      onFocus={load}
      className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] bg-[#fafafa] border border-yellow-600/20 rounded-xl backdrop-blur-md p-4 md:p-[clamp(1.25rem,2.5vw,2rem)] w-full md:w-[clamp(340px,22vw,440px)]"
    >
      <h3 className="text-black font-semibold text-center text-lg md:text-[clamp(1.1rem,1.6vw,1.5rem)] leading-tight">
        Registry Ready Plots in Dholera Starting from ₹8 Lakh
      </h3>

      {isDisabled && (
        <p className="text-center text-red-600 text-sm font-medium">
          Maximum submissions reached. Try again after 24 hours.
        </p>
      )}

      {error && (
        <div className="p-2 bg-red-500/20 border border-red-400 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <input name="fullName" placeholder="Full Name*"    className={inputClass} value={formData.fullName} onChange={handleChange} required />
      <input name="phone"    placeholder="Phone Number*" className={inputClass} value={formData.phone}    onChange={handleChange} type="tel" required />
      <input name="email"    placeholder="Email (Optional)" className={inputClass} value={formData.email} onChange={handleChange} type="email" />
      <input name="city"     placeholder="City*"         className={inputClass} value={formData.city}     onChange={handleChange} required />

      <select
        name="budget"
        className={`${inputClass} cursor-pointer ${!formData.budget ? "text-gray-500" : "text-black"}`}
        value={formData.budget}
        onChange={handleChange}
        required
      >
        <option value="" disabled className="text-gray-500">Budget*</option>
        <option value="5-15"  className="text-black">₹5 Lakh – ₹15 Lakh</option>
        <option value="15-25" className="text-black">₹15 Lakh – ₹25 Lakh</option>
        <option value="25+"   className="text-black">₹25 Lakh +</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={isLoading || isDisabled}
        className={`w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] font-bold px-6 rounded-lg transition-all duration-300 text-xs md:text-[clamp(0.7rem,0.9vw,0.82rem)] uppercase tracking-widest ${
          isLoading || isDisabled
            ? "bg-gray-400 cursor-not-allowed text-gray-200"
            : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting…
          </span>
        ) : "Get Price"}
      </button>
    </div>
  );
}