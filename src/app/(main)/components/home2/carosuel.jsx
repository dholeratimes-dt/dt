"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* image import */
import hero1 from "@/assets/hero/dholera-sir-greenfield-smart-city-banner-dholera-times.webp";
import hero2 from "@/assets/hero/dholera-sir-semiconductor-city-banner-dholera-times.webp";
import hero3 from "@/assets/hero/dholera-desktop-banner-dholera-times.webp";
import heroM1 from "@/assets/hero/dholera-smart-city-mobile-banner-dholera-times.webp";
import heroM2 from "@/assets/hero/dholera-sir-semiconductor-city-mobile-banner-dholera-times.webp";
import heroM3 from "@/assets/hero/westwyn-estate-mobile-banner-dholera-times.webp";
import BrochureForm from "../BrochureForm";

export default function HOME2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    buttonText: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

 

  // Array of slides with both images and text
  const slides = [
    {
      desktop: hero1,
      tablet: hero1,
      mobile: heroM1,
      alt:"Dholera Smart City",
      desktopClickArea: { left: 159, top: 527, right: 367, bottom: 565 },
      mobileClickArea: { left: 191, top: 865, right: 400, bottom: 906 },
    },
    {
      desktop: hero2,
      tablet: hero2,
      mobile: heroM2,
      alt:"Dholera SIR",
      desktopClickArea: { left: 160, top: 524, right: 406, bottom: 570 },
      mobileClickArea: { left: 181, top: 856, right: 412, bottom: 898 },
    },
    /* {
      desktop: hero3,
      tablet: hero3,
      mobile: heroM3,
      alt:"Dholera Smart City Project",
      desktopClickArea: { left: 159, top: 518, right: 401, bottom: 562 },
      mobileClickArea: { left: 174, top: 861, right: 417, bottom: 902 },
    }, */
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance the slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to handle phone call
  const handlePhoneCall = () => {
    window.location.href = "tel:+919958993549";
  };

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Desktop Slides container - visible only on large screens */}
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
                  priority={index === 0}
                  fetchPriority="high"
                  className=" w-[100vw] h-[80vh]"
                />

                {/* Clickable area for phone number - Desktop */}
                <button
                  onClick={handlePhoneCall}
                  className="absolute z-20 bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300"
                  style={{
                    left: `${(slide.desktopClickArea.left / 1920) * 100}%`,
                    top: `${(slide.desktopClickArea.top / 1080) * 175}%`,
                    width: `${((slide.desktopClickArea.right - slide.desktopClickArea.left) / 1920) * 100}%`,
                    height: `${((slide.desktopClickArea.bottom - slide.desktopClickArea.top) / 1080) * 100}%`,
                  }}
                  aria-label="Call +91 9958993549"
                  title="Call +91 9958993549"
                />

                {/* Text overlay with animation - only visible for the current slide */}
                
              </div>
            </div>
          ))}
        </div>

        {/* Tablet Slides container */}
        <div
          className="hidden md:flex lg:hidden w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={`tablet-${index}`}
              className="w-full flex-shrink-0 relative"
            >
              <div className="relative w-full ">
                <Image
                  src={slide.desktop} 
                  alt={`hero slide ${index + 1}`}
                  priority={index === 0}
                  className="object-cover w-[100vw] "
                />

                {/* Clickable area for phone number - Tablet (using desktop coordinates but scaled) */}
                <button
                  onClick={handlePhoneCall}
                  className="absolute z-20 bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300"
                  style={{
                    left: `${(slide.desktopClickArea.left / 1920) * 100}%`,
                    top: `${(slide.desktopClickArea.top / 1080) * 100}%`,
                    width: `${((slide.desktopClickArea.right - slide.desktopClickArea.left) / 1920) * 100}%`,
                    height: `${((slide.desktopClickArea.bottom - slide.desktopClickArea.top) / 1080) * 100}%`,
                  }}
                  aria-label="Call +91 9958993549"
                  title="Call +91 9958993549"
                />

              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slides container */}
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

                {/* Clickable area for phone number - Mobile */}
                <button
                  onClick={handlePhoneCall}
                  className="absolute z-20 bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300"
                  style={{
                    left: `${(slide.mobileClickArea.left / 430) * 62}%`,
                    top: `${(slide.mobileClickArea.top / 932) * 97}%`,
                    width: `${((slide.mobileClickArea.right - slide.mobileClickArea.left) / 430) * 100}%`,
                    height: `${((slide.mobileClickArea.bottom - slide.mobileClickArea.top) / 932) * 100}%`,
                  }}
                  aria-label="Call +91 9958993549"
                  title="Call +91 9958993549"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-[#151f28]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-[#151f28]" />
        </button>
      </div>

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <BrochureForm
                title={formData.title}
                subTitle={formData.subTitle}
                buttonName={formData.buttonText}
                onClose={closeContactForm}
                onSuccess={() => setIsFormSubmitted(true)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}