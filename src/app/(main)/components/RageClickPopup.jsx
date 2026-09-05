"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "dt:rage-click-popup-shown";
const CLICK_COUNT = 4;
const CLICK_WINDOW_MS = 1000;
const CLICK_RADIUS_PX = 40;

// If persistence is blocked, skip the popup rather than repeatedly interrupting.
function hasShownPopup() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return true;
  }
}

export default function RageClickPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef(null);
  const hasShownRef = useRef(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    setIsOpen(false);
    if (
      !pathname ||
      /^\/(studio|thankyou)(\/|$)/.test(pathname) ||
      hasShownRef.current ||
      hasShownPopup()
    ) return;

    let clicks = [];
    const resetClicks = () => { clicks = []; };

    const handleClick = (event) => {
      if (hasShownRef.current || hasShownPopup()) return;

      // Ignore keyboard/programmatic clicks and visitors filling another form.
      if (
        !event.isTrusted || event.button !== 0 || event.detail === 0 ||
        !(event.target instanceof Element) ||
        event.target.closest('form, input, textarea, select, label, [contenteditable]:not([contenteditable="false"]), dialog, [role="dialog"], [aria-modal="true"]') ||
        document.querySelector('dialog[open], [aria-modal="true"]')
      ) {
        resetClicks();
        return;
      }

      const now = performance.now();
      clicks = clicks.filter((click) =>
        now - click.time <= CLICK_WINDOW_MS &&
        Math.hypot(event.clientX - click.x, event.clientY - click.y) <= CLICK_RADIUS_PX
      );
      clicks.push({ time: now, x: event.clientX, y: event.clientY });
      if (clicks.length < CLICK_COUNT) return;

      // Record on first display, even if the visitor closes without submitting.
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        resetClicks();
        return;
      }
      hasShownRef.current = true;
      setIsOpen(true);
      document.removeEventListener("click", handleClick, true);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("scroll", resetClicks, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("scroll", resetClicks, true);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || isSubmitted) return;

    const name = formData.name.trim();
    const phone = formData.phone.replace(/\D/g, "");
    if (!name || !/^[+\d\s().-]+$/.test(formData.phone) || !/^\d{10,15}$/.test(phone)) {
      setErrorMessage("Please enter your name and a valid phone number (10–15 digits).");
      return;
    }

    submittingRef.current = true;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .filter((key) => params.has(key))
        .map((key) => `${key}: ${params.get(key).slice(0, 100)}`);
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            name,
            phone,
            source: "Dholera Times",
            notes: [`Rage click popup on ${pathname}`, ...attribution].join("\n").slice(0, 1000),
          },
          source: "Dholera Times",
          tags: ["Dholera Investment", "Website Lead", "Rage Click Popup"],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
      setFormData({ name: "", phone: "" });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submitted", form_name: "rage_click_popup" });
    } catch {
      setErrorMessage("We could not submit your request. Please check your connection and try again.");
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="rage-popup-title"
      aria-describedby="rage-popup-description"
      onCancel={() => setIsOpen(false)}
      onClose={() => setIsOpen(false)}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
          setIsOpen(false);
        }
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-[#be9233]/30 bg-white p-6 text-[#151f28] shadow-xl backdrop:bg-black/60 sm:p-8"
    >
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close enquiry form"
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#be9233]"
      >
        <span aria-hidden="true">×</span>
      </button>

      <h2 id="rage-popup-title" className="pr-8 text-2xl font-semibold leading-tight">
        {isSubmitted ? "Thank you!" : "Need help with Dholera plots?"}
      </h2>
      <p id="rage-popup-description" className="mb-6 mt-3 text-base leading-relaxed text-gray-600" role={isSubmitted ? "status" : undefined}>
        {isSubmitted ? "Your request has been received. Our team will call you back." : "Leave your details and our team will help with your questions."}
      </p>

      {isSubmitted ? (
        <button type="button" onClick={() => setIsOpen(false)} className="min-h-12 w-full rounded-lg bg-[#be9233] px-4 py-3 font-semibold text-[#151f28] hover:bg-[#dbaf51]">
          Continue browsing
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isLoading}>
          <div>
            <label htmlFor="rage-popup-name" className="mb-2 block text-sm font-medium">Name *</label>
            <input id="rage-popup-name" name="name" type="text" autoComplete="name" required maxLength={100} value={formData.name} onChange={handleChange} disabled={isLoading} placeholder="Your full name" className="min-h-12 w-full rounded-lg border border-gray-300 px-3 py-3 text-base focus:border-[#be9233] focus:outline-none focus:ring-2 focus:ring-[#be9233]/30" />
          </div>
          <div>
            <label htmlFor="rage-popup-phone" className="mb-2 block text-sm font-medium">Phone number *</label>
            <input id="rage-popup-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={25} value={formData.phone} onChange={handleChange} disabled={isLoading} placeholder="Your phone number" aria-describedby={errorMessage ? "rage-popup-error" : undefined} className="min-h-12 w-full rounded-lg border border-gray-300 px-3 py-3 text-base focus:border-[#be9233] focus:outline-none focus:ring-2 focus:ring-[#be9233]/30" />
          </div>
          {errorMessage && <p id="rage-popup-error" role="alert" className="text-sm leading-relaxed text-red-700">{errorMessage}</p>}
          <button type="submit" disabled={isLoading} className="min-h-12 w-full rounded-lg bg-[#be9233] px-4 py-3 text-base font-semibold text-[#151f28] hover:bg-[#dbaf51] disabled:cursor-wait disabled:opacity-60">
            {isLoading ? "Submitting..." : "Get a call back"}
          </button>
          <p className="text-center text-sm leading-relaxed text-gray-500">
            By submitting, you agree to be contacted about your enquiry. <a href="/policies/privacy" className="underline underline-offset-2">Privacy policy</a>
          </p>
        </form>
      )}
    </dialog>
  );
}
