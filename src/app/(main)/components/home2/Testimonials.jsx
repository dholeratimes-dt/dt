"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "../BrochureDownload";

const testimonials = [
  {
    quote:
      "I had an amazing experience with Harjas ji at Dholeratimes.com. He took the time to explain every detail of the Dholera Smart City project, organized my site visit, and ensured all the legal paperwork was handled smoothly. His support was invaluable, and I highly recommend his services to anyone looking to invest in Dholera!",
    name: "Vijay Pratap",
    type: "Investor",
    location: "Delhi NCR",
  },
  {
    quote:
      "A big thanks to Rohit Pathak ji for his exceptional support throughout my property investment journey in Dholera. He organized a detailed site visit, explained the project's potential, and assisted with all the legal and documentation processes. I couldn’t have done it without him. Highly recommend him for anyone considering Dholera Smart City!",
    name: "Neeraj Yadav",
    type: "Real Estate Investor",
    location: "Haryana",
  },
  {
    quote:
      "I had a great experience with Simar ji at Dholeratimes.com. He went above and beyond, explaining the project in detail, taking me on a site visit, and ensuring all the legal processes and documentation were smooth. I’m very satisfied with my investment and highly recommend his assistance to anyone interested in Dholera.",
    name: "Amit Sharma",
    type: "Investor",
    location: "Uttar Pradesh",
  },
  {
    quote:
      "I highly recommend Anshkirat ji for his excellent service. He arranged a site visit, explained all the features of Dholera Smart City, and helped with every step of the legal paperwork. His effort made everything easy and transparent. If you’re thinking about investing in Dholera, Anshkirat is the person to contact!",
    name: "Rajeev Gupta",
    type: "Investor",
    location: "Delhi NCR",
  },
  {
    quote:
      "I was thoroughly impressed with the assistance provided by Divyansh ji. He coordinated my site visit, provided a thorough project explanation, and handled all the legal documentation. His effort made the entire investment process smooth, and I highly recommend him to anyone looking to invest in Dholera Smart City.",
    name: "Vikas Agarwal",
    type: "Real Estate Investor",
    location: "Chandigarh",
  },
  {
    quote:
      "A special thanks to Harjas ji for his outstanding support throughout the entire process. From arranging my site visit to explaining the project’s growth potential and helping with the legal documentation, he made everything seamless. I would definitely recommend him to anyone interested in the Dholera Smart City project!",
    name: "Manpreet Kaur",
    type: "Investor",
    location: "Chandigarh",
  },
  {
    quote:
      "I’m so grateful for the support from Rohit Pathak ji. He was with me every step of the way, from coordinating the site visit to explaining all the details of Dholera Smart City and assisting with the legal and documentation process. His professionalism and attention to detail were outstanding. Highly recommend him for a hassle-free experience!",
    name: "Harpreet Singh",
    type: "Real Estate Investor",
    location: "Haryana",
  },
  {
    quote:
      "Thanks to Simar ji, my experience investing in Dholera was hassle-free. He took the time to explain the project, arranged a site visit, and handled all the legal processes and paperwork efficiently. I highly recommend his services to anyone looking to invest in this promising project!",
    name: "Gurpreet Singh",
    type: "Investor",
    location: "Uttar Pradesh",
  },
];

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial,
  );

  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const styles = {
    background: "bg-white",
    heading: "text-gray-700",
    cardBorder: "border-2 border-[#d3b36b]",
    quote: "text-gray-700",
    name: "text-black font-semibold",
    location: "text-[#C69C21]",
    activeButton: "bg-[#d3b36b] hover:bg-[#d3b36b] text-white",
    inactiveButton:
      "border-[#FDB913] bg-[#d3b36b] text-gray-700 hover:bg-[#d3b36b] hover:text-white",
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <h3 className={`text-center text-[28px] font-semibold mb-10`}>
          What our customers says
        </h3>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`bg-white shadow-md rounded-lg p-6 ${styles.cardBorder} hover:shadow-lg transition-shadow duration-300`}
              whileHover={{ scale: 1.03 }}
            >
              <p className={`italic ${styles.quote} mb-6 text-black min-h-48`}>
                ❝ {testimonial.quote} ❞
              </p>
              <div className="flex items-center border-t border-[#b98e31] pt-4">
                <div className="w-1 h-12 bg-[#d3b36b] mr-3 rounded-full"></div>
                <div>
                  <h3 className={styles.name}>
                    {testimonial.name} ⦁ {testimonial.type}
                  </h3>
                  <p className={` ${styles.location}`}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div transition={{ duration: 0.5 }}>
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              } ${styles.inactiveButton} rounded-full`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === index + 1
                    ? styles.activeButton
                    : styles.inactiveButton
                }`}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } ${styles.inactiveButton} rounded-full`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-[#151f28] mb-3">
                🚀 Ready to Invest in Dholera SIR?
              </h2>
              <p className="text-gray-600 text-lg">
                Get expert guidance and exclusive investment opportunities
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919958993549"
                className="bg-[#d3b36b] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Free Consultation
              </a>
              <button
                onClick={openBrochureForm}
                className="border-2 border-[#151f28] text-[#d3b36b] px-8 py-3 rounded-xl font-semibold hover:bg-[#caac66] hover:text-white transition-all duration-300"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Explore Verified Residential Plots in Dholera Under ₹10 lakh"
              buttonName="Get A Call Back"
              onClose={() => setIsBrochureFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialPagination;
