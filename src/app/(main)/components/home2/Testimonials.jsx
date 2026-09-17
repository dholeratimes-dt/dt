// "use client";
// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { AnimatePresence } from "framer-motion";
// import BrochureDownload from "../BrochureDownload";
// import { FaPhone, FaWhatsapp } from "react-icons/fa";
// import Link from "next/link";

// const testimonials = [
//   {
//     quote:
//       "Dholera Times is a helpful platform for staying updated with the latest news and developments in Dholera. The content is simple, clear, and easy to understand.",
//     name: "Amit Khurana",
//     location: "India",
//   },
//   {
//     quote:
//       "The website explains Dholera Smart City, infrastructure updates, airport news, expressway progress, and investment-related topics in a very practical way.",
//     name: "Sandeep Mishra",
//     location: "India",
//   },
//   {
//     quote:
//       "I like how Dholera Times shares updates without making the information confusing. It is useful for anyone who wants to understand Dholera from the basics.",
//     name: "Pulkit Sharma",
//     location: "India",
//   },
//   {
//     quote:
//       "Main Dholera ke latest updates ke liye Dholera Times follow karta hoon. Yahan airport, expressway, industries aur smart city development ki information simple language mein milti hai.",
//     name: "Sumit Kumar",
//     location: "Gujarat",
//   },
//   {
//     quote:
//       "Dholera Times gives clear and regular information about Dholera’s progress. It helps readers understand what is happening on the ground in a trusted way.",
//     name: "Sohail",
//     location: "India",
//   },
//   {
//     quote:
//       "Dholera mein investment explore karne se pehle maine Dholera Times se kaafi updates samjhe. Website par information simple, useful aur easy to read hai.",
//     name: "Nikhil Goel",
//     location: "India",
//   },
// ];

// const TestimonialPagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const testimonialsPerPage = 3;
//   const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

//   const indexOfLastTestimonial = currentPage * testimonialsPerPage;
//   const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
//   const currentTestimonials = testimonials.slice(
//     indexOfFirstTestimonial,
//     indexOfLastTestimonial,
//   );

//   const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

//   const openBrochureForm = () => {
//     setIsBrochureFormOpen(true);
//   };

//   const closeBrochureForm = () => {
//     setIsBrochureFormOpen(false);
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const styles = {
//     background: "bg-white",
//     heading: "text-gray-700",
//     cardBorder: "border-2 border-[#d3b36b]",
//     quote: "text-gray-700",
//     name: "text-black font-semibold",
//     location: "text-[#C69C21]",
//     activeButton: "bg-[#d3b36b] hover:bg-[#d3b36b] text-white",
//     inactiveButton:
//       "border-[#FDB913] bg-[#d3b36b] text-gray-700 hover:bg-[#d3b36b] hover:text-white",
//   };

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-4">
//         <h3 className={`text-center text-[28px] font-semibold mb-10`}>
//           What our customers says
//         </h3>
//         <div
//           key={currentPage}
//           className="grid md:grid-cols-3 gap-8 mb-8"
//         >
//           {currentTestimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className={`bg-white shadow-md rounded-lg p-6 ${styles.cardBorder} hover:shadow-lg transition-shadow duration-300`}

//             >
//               <p className={`italic ${styles.quote} mb-6 text-black h-20`}>
//                 ❝ {testimonial.quote} ❞
//               </p>
//               <div className="flex items-center border-t border-[#b98e31] pt-4">
//                 <div className="w-1 h-12 bg-[#d3b36b] mr-3 rounded-full"></div>
//                 <div>
//                   <h3 className={styles.name}>
//                     {testimonial.name} ⦁ {testimonial.type}
//                   </h3>
//                   <p className={` ${styles.location}`}>
//                     {testimonial.location}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div>
//           <div className="flex justify-center items-center space-x-4">
//             <Button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className={`${
//                 currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//               } ${styles.inactiveButton} rounded-full`}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             {[...Array(totalPages)].map((_, index) => (
//               <Button
//                 key={index}
//                 onClick={() => paginate(index + 1)}
//                 className={`w-10 h-10 rounded-full ${
//                   currentPage === index + 1
//                     ? styles.activeButton
//                     : styles.inactiveButton
//                 }`}
//               >
//                 {index + 1}
//               </Button>
//             ))}

//             <Button
//               onClick={nextPage}
//               disabled={currentPage === totalPages}
//               className={`${
//                 currentPage === totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               } ${styles.inactiveButton} rounded-full`}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//             <div className="text-center lg:text-left">
//               <h2 className="text-2xl font-bold text-[#151f28] mb-3">
//                 🚀 Ready to Invest in Dholera?
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 Get expert guidance and exclusive investment opportunities
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link
//                 href="tel:+919958993549"
//                 className="bg-[#d3b36b] text-white flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//               >
//                <FaPhone className="rotate-90"/> Call Now
//               </Link>
//               <Link
//                 href="https://wa.me/919958993549?text=Hi"
//                 className="border-2 border-[#151f28] text-[#d3b36b] flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-semibold hover:bg-[#caac66] hover:text-white transition-all duration-300"
//               >
//                <FaWhatsapp/> WhatsApp Us
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div>
//         {isBrochureFormOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
//             <BrochureDownload
//               title="Explore Verified Residential Plots in Dholera Under ₹10 lakh"
//               buttonName="Get A Call Back"
//               onClose={() => setIsBrochureFormOpen(false)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestimonialPagination;


"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Dholera Times is a helpful platform for staying updated with the latest news and developments in Dholera. The content is simple, clear, and easy to understand.",
    name: "Amit Khurana",
    location: "India",
  },
  {
    quote:
      "The website explains Dholera Smart City, infrastructure updates, airport news, expressway progress, and investment-related topics in a very practical way.",
    name: "Sandeep Mishra",
    location: "India",
  },
  {
    quote:
      "I like how Dholera Times shares updates without making the information confusing. It is useful for anyone who wants to understand Dholera from the basics.",
    name: "Pulkit Sharma",
    location: "India",
  },
  {
    quote:
      "Main Dholera ke latest updates ke liye Dholera Times follow karta hoon. Yahan airport, expressway, industries aur smart city development ki information simple language mein milti hai.",
    name: "Sumit Kumar",
    location: "Gujarat",
  },
  {
    quote:
      "Dholera Times gives clear and regular information about Dholera’s progress. It helps readers understand what is happening on the ground in a trusted way.",
    name: "Sohail",
    location: "India",
  },
  {
    quote:
      "Dholera mein investment explore karne se pehle maine Dholera Times se kaafi updates samjhe. Website par information simple, useful aur easy to read hai.",
    name: "Nikhil Goel",
    location: "India",
  },
];

const TESTIMONIALS_PER_PAGE = 3;

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    testimonials.length / TESTIMONIALS_PER_PAGE
  );

  const firstIndex = (currentPage - 1) * TESTIMONIALS_PER_PAGE;

  const currentTestimonials = testimonials.slice(
    firstIndex,
    firstIndex + TESTIMONIALS_PER_PAGE
  );

  const paginationButtonClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14381F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F9F4] motion-reduce:transition-none";

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#F7F9F4] px-4 py-12 text-[#14381F] sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-12">
          <h2
            id="testimonials-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
          >
            What our customers say
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#F4D35E]"
          />
        </div>

        <div
          id="testimonial-cards"
          aria-live="polite"
          aria-atomic="true"
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6"
        >
          {currentTestimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="group flex h-full min-w-0 flex-col rounded-2xl border border-[#14381F]/10 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-[#14381F]/25 hover:shadow-md sm:p-7 motion-reduce:transition-none"
            >
              <div
                aria-hidden="true"
                className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4D35E]/25 text-[#14381F] transition-colors duration-200 group-hover:bg-[#F4D35E] motion-reduce:transition-none"
              >
                <Quote className="h-5 w-5" strokeWidth={1.8} />
              </div>

              <blockquote className="flex-1">
                <p className="text-[15px] leading-7 text-[#14381F]/80">
                  {testimonial.quote}
                </p>
              </blockquote>

              <figcaption className="mt-7 border-t border-[#14381F]/10 pt-5">
                <p className="text-base font-semibold tracking-tight text-[#14381F]">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-[#14381F]/70">
                  {testimonial.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <nav
          aria-label="Testimonial pagination"
          className="mt-8 flex items-center justify-center gap-2 sm:mt-10 sm:gap-3"
        >
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            disabled={currentPage === 1}
            aria-label="Previous testimonials"
            aria-controls="testimonial-cards"
            className={`${paginationButtonClass} border-[#14381F]/15 bg-white text-[#14381F] enabled:hover:border-[#14381F] enabled:hover:bg-[#EAF0E8] disabled:cursor-not-allowed disabled:opacity-35`}
          >
            <ChevronLeft
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = currentPage === pageNumber;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Testimonial page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
                aria-controls="testimonial-cards"
                className={`${paginationButtonClass} text-sm font-semibold ${
                  isActive
                    ? "border-[#14381F] bg-[#14381F] text-[#F4D35E] shadow-sm"
                    : "border-[#14381F]/15 bg-white text-[#14381F] hover:border-[#14381F]/30 hover:bg-[#F4D35E]/25"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            aria-label="Next testimonials"
            aria-controls="testimonial-cards"
            className={`${paginationButtonClass} border-[#14381F]/15 bg-white text-[#14381F] enabled:hover:border-[#14381F] enabled:hover:bg-[#EAF0E8] disabled:cursor-not-allowed disabled:opacity-35`}
          >
            <ChevronRight
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>
        </nav>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-[#14381F] p-6 sm:mt-16 sm:rounded-3xl sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#F4D35E]/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center justify-between gap-7 lg:flex-row lg:gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-2xl font-semibold tracking-tight text-[#F8FAF5] sm:text-3xl">
                Ready to Invest in Dholera?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#E4EDDF] sm:text-base sm:leading-7">
                Get expert guidance and exclusive investment opportunities
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
              <a
                href="tel:+919958993549"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-[#F4D35E] bg-[#F4D35E] px-6 py-3.5 text-sm font-semibold text-[#14381F] transition-colors duration-200 hover:border-[#F8E39A] hover:bg-[#F8E39A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#14381F] motion-reduce:transition-none"
              >
                <FaPhone
                  aria-hidden="true"
                  className="h-4 w-4 rotate-90"
                />
                Call Now
              </a>

              <a
                href="https://wa.me/919958993549?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-[#F4D35E]/60 bg-transparent px-6 py-3.5 text-sm font-semibold text-[#F4D35E] transition-colors duration-200 hover:border-[#F4D35E] hover:bg-[#F4D35E]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#14381F] motion-reduce:transition-none"
              >
                <FaWhatsapp aria-hidden="true" className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPagination;