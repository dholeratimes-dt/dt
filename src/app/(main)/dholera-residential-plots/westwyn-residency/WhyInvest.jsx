"use client";
import { useState, useEffect } from "react";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PopupForm from "../../components/PopupForm";
import safe from "@/assets/residential/safe-investment.webp"
import lifestyle from "@/assets/residential/lifestyle-and-trust.webp"
import support from "@/assets/residential/government-support-dholera.webp"
import growth from "@/assets/residential/exceptional-growth.webp"
import connectivity from "@/assets/residential/dholera-strong-connectivity.webp"
import location from "@/assets/residential/strategic-location-dholera.webp"
import Image from "next/image";



export default function InvestmentBenefits() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    } else if (isRightSwipe) {
      setHoveredBenefit((prev) => (prev - 1 + benefits.length) % benefits.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const updateHoveredBenefit = (index) => {
    setHoveredBenefit(index);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openModal = (benefit, index) => {
    setSelectedBenefit({ ...benefit, index });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBenefit(null);
  };

  const benefits = [
    {
      title: "Ideal for long-term Dholera plot investment",
      icon: "📈",
      image: growth,
    },
    {
      title: "Government approved plots with clear documentation",
      icon: "✅",
      image: safe,
    },
    {
      title: "Immediate registry and possession",
      icon: "📋",
      image: support,
    },
    {
      title: "Strategic location near Dholera SIR",
      icon: "📍",
      image: location,
    },
    {
      title: "Strong connectivity to major infrastructure",
      icon: "🔗",
      image: connectivity,
    },
    {
      title: "World Class Amenities",
      icon: "🌏",
      image: connectivity,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(222, 190, 107, 0.2), 0 8px 10px -6px rgba(222, 190, 107, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <div className="bg-[#151f28] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why Invest in <span className="text-[#d3b36b]">WestWyn Residency</span>?
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Discover the unique advantages that make WestWyn Estates the premier
            investment opportunity in Dholera SIR.
          </p>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Image/Visual Section */}
          <div className="lg:w-1/2">
            {!isMobile ? (
              <>
                <motion.div
                  className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
                  key={hoveredBenefit}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Image
                    src={benefits[hoveredBenefit].image}
                    alt={benefits[hoveredBenefit].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151f28]/80 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">
                          {benefits[hoveredBenefit].icon}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold">
                          {benefits[hoveredBenefit].title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Section */}
              
              </>
            ) : (
              <div
                className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredBenefit}
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={benefits[hoveredBenefit].image}
                      alt={benefits[hoveredBenefit].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151f28]/80 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">
                            {benefits[hoveredBenefit].icon}
                          </span>
                          <h3 className="text-xl font-bold">
                            {benefits[hoveredBenefit].title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {benefits.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        hoveredBenefit === index
                          ? "bg-[#d3b36b] scale-125"
                          : "bg-white/50"
                      }`}
                      onClick={() => updateHoveredBenefit(index)}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#151f28]/70 hover:bg-[#151f28] text-[#d3b36b] p-2 rounded-full transition-all duration-300"
                  onClick={() =>
                    updateHoveredBenefit(
                      hoveredBenefit > 0 ? hoveredBenefit - 1 : benefits.length - 1
                    )
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#151f28]/70 hover:bg-[#151f28] text-[#d3b36b] p-2 rounded-full transition-all duration-300"
                  onClick={() =>
                    updateHoveredBenefit(
                      hoveredBenefit < benefits.length - 1 ? hoveredBenefit + 1 : 0
                    )
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Benefits Cards Section */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((benefit, index) => {
                const isHighlighted = hoveredBenefit === index;

                return (
                  <motion.div
                    key={benefit.title}
                    className={`group border rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-300 
                      ${
                        isHighlighted
                          ? "border-[#d3b36b] bg-[#d3b36b]/10 transform scale-[1.02]"
                          : "border-gray-700 hover:border-[#d3b36b]/50"
                      }`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={() => openModal(benefit, index)}
                    onMouseEnter={() => !isMobile && setHoveredBenefit(index)}
                  >
                    <div className="flex items-start mb-3">
                      <motion.div
                        className="text-2xl md:text-3xl mr-3"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <h3 className="text-lg text-[#d3b36b]">
                        {benefit.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section for Mobile */}
            {isMobile && (
              <motion.div
                className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#d3b36b]/10 to-[#d3b36b]/5 border border-[#d3b36b]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-2">
                  Ready to Invest in Dholera's Future?
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  Join the early investors securing premium plots in WestWyn Estate.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <motion.a
                    href="tel:+919958993549"
                    className="bg-[#d3b36b] hover:bg-[#d4b15f] text-[#151f28] text-sm text-center font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Site Visit
                  </motion.a>
                  <motion.button
                    onClick={openContactForm}
                    className="border border-[#d3b36b] text-[#d3b36b] hover:bg-[#d3b36b]/10 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Now
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
          <motion.div
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#d3b36b]/10 to-[#d3b36b]/5 border border-[#d3b36b]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-lg text-center font-bold mb-2">
                    Ready to Invest in Dholera's Future?
                  </h3>
                  <p className="text-sm text-center text-gray-300 mb-3">
                    Get complete details, pricing, and availability for WestWyn Residency.
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <motion.a
                      href="tel:+919958993549"
                      className="bg-[#d3b36b] hover:bg-[#d4b15f] text-[#151f28] text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Site Visit
                    </motion.a>
                    <motion.button
                      onClick={openContactForm}
                      className="border border-[#d3b36b] text-[#d3b36b] hover:bg-[#d3b36b]/10 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Now
                    </motion.button>
                  </div>
                </motion.div>
      </div>

      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <PopupForm
              title="Get Details of WestWyn Residency"
              buttonName="Get A Call Back"
              onClose={() => closeContactForm()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}