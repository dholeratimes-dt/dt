"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getImageProps } from "next/image";
import { CheckCircle2, Phone, UserRound, X } from "lucide-react";
import desktopArtwork from "@/assets/ad-page/event/Dholera-Investor-Event-desktop.png";
import mobileArtwork from "@/assets/ad-page/event/Dholera-Investor-Event-phone.png";
import styles from "./BlogEventPopup.module.css";

const { props: desktopImageProps } = getImageProps({
  src: desktopArtwork,
  alt: "",
  sizes: "(min-width: 900px) min(820px, 126dvh, calc(100vw - 64px)), 100vw",
  quality: 85,
});

const { props: mobileImageProps } = getImageProps({
  src: mobileArtwork,
  alt: "",
  sizes: "(min-width: 392px) min(360px, max(240px, 40dvh)), calc(100vw - 32px)",
  quality: 85,
});

function EventDialog({ pathname }) {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef(null);
  const submittingRef = useRef(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || isSubmitted) return;

    const name = formData.name.trim();
    const phone = formData.phone.replace(/\D/g, "");
    if (!name || !/^[6-9]\d{9}$/.test(phone)) {
      setErrorMessage("Please enter your name and a valid 10-digit Indian mobile number.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
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
            phone: `91${phone}`,
            source: "Dholera Times",
            notes: [
              "Dholera Investor Event, Gurgaon, 21-22 November 2026",
              `Blog event popup: ${pathname}`,
              ...attribution,
            ].join("\n").slice(0, 1000),
          },
          source: "Dholera Times",
          tags: ["Website Lead", "Blog Event Popup", "Gurgaon Investor Event Nov 2026"],
        }),
        signal: AbortSignal.timeout(20000),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true) throw new Error("Submission failed");

      setIsSubmitted(true);
      setFormData({ name: "", phone: "" });
    } catch {
      setErrorMessage("We couldn't submit your details. Please try again.");
      return;
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }

    // Analytics must never turn a successfully saved lead into a form error.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_form_submitted",
        form_name: "blog_event_popup",
      });
    } catch {
      // The reservation is already saved even if tracking is unavailable.
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="blog-event-title"
      aria-describedby="blog-event-details"
      onCancel={() => setIsOpen(false)}
      onClose={(event) => {
        // Effect cleanup can queue a close event before the dialog reopens.
        if (!event.currentTarget.open) setIsOpen(false);
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom) {
          setIsOpen(false);
        }
      }}
    >
      <div className={styles.artwork}>
        <h2 id="blog-event-title" className="sr-only">
          Join the Dholera Investor Event in Gurgaon
        </h2>
        <p id="blog-event-details" className="sr-only">
          21-22 November 2026, 9 AM-8 PM IST. 6th Floor, JMD MEGAPOLIS,
          Unit 620, Badshahpur Sohna Road, Sector 48, Gurugram, Haryana 122018.
          Enter your name and mobile number to reserve your free seat.
        </p>
        <picture className={styles.picture}>
          <source media="(min-width: 900px), (min-width: 600px) and (orientation: landscape)" srcSet={desktopImageProps.srcSet} sizes={desktopImageProps.sizes} />
          <img {...mobileImageProps} alt="" className={styles.image} loading="eager" decoding="async" />
        </picture>

        <button type="button" className={styles.close} aria-label="Close event popup" onClick={() => setIsOpen(false)}>
          <X size={20} aria-hidden="true" />
        </button>
        {errorMessage && <p id="blog-event-error" role="alert" className={styles.error}>{errorMessage}</p>}

        <div className={styles.formArea}>
          {isSubmitted ? (
            <div role="status" className={styles.success}>
              <CheckCircle2 size={30} aria-hidden="true" />
              <p>Thank you for registering!</p>
              <span>Our team will contact you with your event details.</span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} aria-label="Reserve your free event seat" aria-busy={isSubmitting} aria-describedby={errorMessage ? "blog-event-error" : undefined}>
              <div>
                <div className={styles.field}>
                  <UserRound size={19} aria-hidden="true" />
                  <input
                    id="blog-event-name" name="name" type="text" autoComplete="name" aria-label="Full name"
                    placeholder="Your full name" required maxLength={100} pattern=".*\S.*"
                    title="Please enter your full name" disabled={isSubmitting} value={formData.name}
                    onChange={(event) => {
                      setFormData((previous) => ({ ...previous, name: event.target.value }));
                      setErrorMessage("");
                    }}
                  />
                </div>
              </div>

              <div>
                <div className={styles.field}>
                  <Phone size={18} aria-hidden="true" />
                  <span className={styles.prefix} aria-hidden="true">+91</span>
                  <input
                    id="blog-event-phone" name="phone" type="tel" inputMode="numeric"
                    autoComplete="tel-national" aria-label="Mobile number, country code +91"
                    placeholder="Mobile number" required maxLength={10} pattern="[6-9][0-9]{9}"
                    title="Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9"
                    disabled={isSubmitting} value={formData.phone}
                    onChange={(event) => {
                      setFormData((previous) => ({ ...previous, phone: event.target.value.replace(/\D/g, "").slice(0, 10) }));
                      setErrorMessage("");
                    }}
                  />
                </div>
              </div> 

              <button type="submit" className={styles.submit} disabled={isSubmitting}>
                {isSubmitting ? "Reserving your seat..." : "Book Your Consultation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default function BlogEventPopup() {
  const pathname = usePathname();
  // A new blog page visit gets a fresh popup; closing it lasts for that visit.
  return <EventDialog key={pathname} pathname={pathname} />;
}
