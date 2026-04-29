"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── image imports ─── */
import hero1 from "@/assets/hero/abcd-building-dholera-homepage.webp";
import hero2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage.webp";
import hero3 from "@/assets/hero/dholera-smart-city-indias-planned-smart-city-homepage.webp";
import heroM1 from "@/assets/hero/abcd-building-dholera-homepage-mobile.webp";
import heroM2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage-mobile.webp";
import heroM3 from "@/assets/hero/dholera-smart-city-mobile-banner-dholera-times.webp";
import HeroForm from "./HeroForm";

const slides = [
  { desktop: hero1, mobile: heroM1, alt: "Dholera Smart City" },
  { desktop: hero2, mobile: heroM2, alt: "Dholera SIR" },
  { desktop: hero3, mobile: heroM3, alt: "Dholera Smart City Project" },
];

export default function HOME2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  /* restore rate-limit state from localStorage */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCount = parseInt(
      localStorage.getItem("heroFormSubmissionCount") || "0",
      10,
    );
    const lastSubmission = parseInt(
      localStorage.getItem("heroFormLastSubmissionTime") || "0",
      10,
    );

    if (lastSubmission) {
      const hoursPassed = (Date.now() - lastSubmission) / (1000 * 60 * 60);
      if (hoursPassed >= 24) {
        localStorage.setItem("heroFormSubmissionCount", "0");
        localStorage.setItem(
          "heroFormLastSubmissionTime",
          Date.now().toString(),
        );
      } else {
        setSubmissionCount(storedCount);
        if (storedCount >= 20) setIsDisabled(true);
      }
    } else {
      setSubmissionCount(storedCount);
    }
  }, []);

  const updateSubmissionCount = useCallback(() => {
    setSubmissionCount((prev) => {
      const next = prev + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("heroFormSubmissionCount", String(next));
        localStorage.setItem("heroFormLastSubmissionTime", String(Date.now()));
      }
      if (next >= 20) setIsDisabled(true);
      return next;
    });
  }, []);

  const handleFormSuccess = useCallback(() => {
    setShowPopup(true);
    updateSubmissionCount();
  }, [updateSubmissionCount]);

  /* wrap in useCallback so the interval effect doesn't re-create on every render */
  const nextSlide = useCallback(
    () => setCurrentSlide((p) => (p + 1) % slides.length),
    [],
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [nextSlide]);

  return (
    <>
      {/* ── Success popup ── */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-black mb-2">Thank You!</h2>
            <p className="text-gray-600 text-sm mb-4">
              Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#deae3c] hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Carousel wrapper ── */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const isFirst = index === 0;

            return (
              <div key={index} className="w-full flex-shrink-0 relative">
                {/* Desktop */}
                <div className="hidden md:block relative w-full h-[80vh]">
                  <Image
                    src={slide.desktop}
                    alt={slide.alt}
                    fill
                    priority={isFirst} // ✅ Next.js 15: handles preload + eager internally
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/60" />
                </div>

                {/* Mobile */}
                <div className="block md:hidden relative w-full">
                  <Image
                    src={slide.mobile}
                    alt={slide.alt}
                    priority={isFirst} // ✅ same
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 -translate-x-1/3 "
          style={{ right: "clamp(4.5rem, calc(3rem + 2.5vw), 7rem)" }}
        >
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        <div className="flex md:hidden absolute bottom-20 left-0 right-0 z-20 px-4 pb-6">
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        {/* ── Nav arrows ── */}
        <button
          onClick={prevSlide}
          className="absolute max-sm:hidden top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-[#151f28]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute max-sm:hidden top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-[#151f28]" />
        </button>
      </div>
    </>
  );
}
