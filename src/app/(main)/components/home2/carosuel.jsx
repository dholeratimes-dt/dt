"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* image import */
import hero1 from "@/assets/hero/abcd-building-dholera-homepage.webp";
import hero2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage.webp";
import hero3 from "@/assets/hero/dholera-smart-city-indias-planned-smart-city-homepage.webp";
import heroM1 from "@/assets/hero/abcd-building-dholera-homepage-mobile.webp";
import heroM2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage-mobile.webp";
import heroM3 from "@/assets/hero/dholera-smart-city-mobile-banner-dholera-times.webp";
import HeroForm from "./HeroForm";

export default function HOME2() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("heroFormSubmissionCount") || "0",
        10,
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("heroFormLastSubmissionTime") || "0",
        10,
      );

      if (lastSubmissionTime) {
        const hoursPassed =
          (Date.now() - lastSubmissionTime) / (1000 * 60 * 60);
        if (hoursPassed >= 24) {
          setSubmissionCount(0);
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
    }
  }, []);

  const updateSubmissionCount = () => {
    const newCount = submissionCount + 1;
    setSubmissionCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("heroFormSubmissionCount", newCount.toString());
      localStorage.setItem("heroFormLastSubmissionTime", Date.now().toString());
    }
    if (newCount >= 20) setIsDisabled(true);
  };

  const handleFormSuccess = () => {
    setShowPopup(true);
    updateSubmissionCount();
  };

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [brochureFormData] = useState({
    title: "",
    subTitle: "",
    buttonText: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const slides = [
    {
      desktop: hero1,
      mobile: heroM1,
      alt: "Dholera Smart City",
    },
    {
      desktop: hero2,
      mobile: heroM2,
      alt: "Dholera SIR",
    },
    {
      desktop: hero3,
      mobile: heroM3,
      alt: "Dholera Smart City Project",
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Success Popup */}
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

      {/* ── Carousel wrapper — all form overlays live here ── */}
      <div className="relative w-full overflow-hidden">

        {/* ── Desktop slides (lg+) ── */}
        <div
          className="hidden lg:flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={`desktop-${index}`}
              className="w-full flex-shrink-0 relative"
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : undefined}
                  className="object-cover"
                />
                {/* Gradient — mirrors Hero.jsx */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/60" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Tablet slides (md → lg) ── */}
        <div
          className="hidden md:flex lg:hidden w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={`tablet-${index}`}
              className="w-full flex-shrink-0 relative"
            >
              <div className="relative w-full h-screen">
                <Image
                  src={slide.desktop}
                  alt={`hero slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile slides (< md) ── */}
        <div
          className="flex md:hidden w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={`mobile-${index}`}
              className="w-full flex-shrink-0 relative"
            >
              <div className="relative w-full h-auto">
                <Image
                  src={slide.mobile}
                  alt={`hero slide ${index + 1}`}
                  priority={index === 0}
                  fetchPriority="high"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop form overlay — right side, vertically centred ── */}
        <div
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20"
          style={{ right: "clamp(4.5rem, calc(3rem + 2.5vw), 7rem)" }}
        >
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        {/* ── Tablet form overlay — centred, vertically centred ── */}
        <div className="hidden md:flex lg:hidden absolute inset-0 z-20 items-center justify-end pr-8">
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        {/* ── Mobile form overlay — bottom of the slide ── */}
        <div className="flex md:hidden absolute bottom-20 left-0 right-0 z-20 px-4 pb-6">
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        {/* Nav arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-[#151f28]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-[#151f28]" />
        </button>
      </div>

    </>
  );
}