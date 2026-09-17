// "use client";
// import { useState } from "react";
// import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";

// const faqs = [
//   {
//     question: "What kind of residential plots does Dholera Times offer in Dholera?",
//     answer:
//       "Dholera Times helps buyers explore residential plot options in prime locations in Dholera, including projects with registry-ready documentation and buyer support.",
//   },
//   {
//     question: "Are the plots registry-ready?",
//     answer:
//       "Yes, Dholera Times highlights projects with registry-ready documentation so buyers can move forward with more clarity and confidence.",
//   },
//   {
//     question: "Can I get immediate possession of the plot?",
//     answer:
//       "Some projects offer immediate possession, depending on the location and project type. Our team can help you check the current availability and possession details.",
//   },
//   {
//     question: "How can Dholera Times help me choose the right plot?",
//     answer:
//       "Dholera Times helps buyers compare plot options based on budget, location, project type, and buying goals, with support from enquiry to booking.",
//   },
//   {
//     question: "Do you provide site visit support?",
//     answer:
//       "Yes, our team can assist you with site visit planning so you can better understand the project location, surroundings, and plot options.",
//   },
//   {
//     question: "Is Dholera a good place to buy a residential plot?",
//     answer:
//       "Dholera is gaining attention because of its planned development, infrastructure growth, and future connectivity. Many buyers explore it for long-term residential and investment potential.",
//   },
//   {
//     question: "What documents should I check before booking a plot?",
//     answer:
//       "Buyers should check registry status, title clarity, project details, and other important documents before booking. Dholera Times helps guide buyers through this process.",
//   },
//   {
//     question: "Can I talk to your team before making a decision?",
//     answer:
//       "Yes, you can connect with the Dholera Times team for project details, pricing, location guidance, and support before booking.",
//   },
// ];

// export default function FAQS() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

//   const renderAnswer = (answer) => {
//     if (Array.isArray(answer)) {
//       return (
//         <ul className="list-disc list-inside space-y-2">
//           {answer.map((item, idx) => (
//             <li key={idx} className="text-gray-600 text-sm leading-relaxed">
//               {item}
//             </li>
//           ))}
//         </ul>
//       );
//     }
//     return <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>;
//   };

//   return (
//     <>
//       <div className="bg-white">
//         <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 gap-6 md:gap-12 max-w-7xl mx-auto">
//           {/* Left Section (40%) */}
//           <div className="w-full md:w-2/5 pl-2 pr-2">
//             <h2 className="text-[32px] font-semibold text-[#151f28] mb-4">
//               FAQs
//             </h2>
//             <p className="text-gray-600 mb-4">Have more questions?</p>

//             <div className="pt-4">
//               <a
//                 className="inline-block bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
//                 href="tel:+919958993549"
//               >
//                 Give us a missed call
//               </a>
//             </div>
//           </div>

//           {/* Right Section (60%) */}
//           <div className="w-full md:w-3/5 md:pl-24 md:pr-4 md:mt-0">
//             <div className="space-y-1">
//               {displayedFaqs.map((faq, index) => (
//                 <div key={index} className="border-b border-gray-200">
//                   <button
//                     className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
//                     onClick={() => toggleFAQ(index)}
//                   >
//                     <span className="text-gray-900 font-medium pr-4 leading-relaxed">
//                       {faq.question}
//                     </span>
//                     <span className="flex-shrink-0 transition-transform duration-200">
//                       {openIndex === index ? (
//                         <Minus className="w-5 h-5 text-gray-600" />
//                       ) : (
//                         <Plus className="w-5 h-5 text-gray-600" />
//                       )}
//                     </span>
//                   </button>

//                   <div
//                     className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                       openIndex === index
//                         ? "max-h-96 opacity-100"
//                         : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     <div className="pb-4 px-0">{renderAnswer(faq.answer)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Show More / Show Less Button */}
//             {faqs.length > 5 && (
//               <div className="mt-6 text-center">
//                 <button
//                   onClick={() => setShowAll(!showAll)}
//                   className="inline-flex items-center gap-2 text-[#b69b5e] hover:text-[#d3b36b] font-semibold transition-colors duration-200"
//                 >
//                   {showAll ? (
//                     <>
//                       <span>Show Less</span>
//                       <ChevronUp className="w-5 h-5" />
//                     </>
//                   ) : (
//                     <>
//                       <span>Show More FAQs ({faqs.length - 5} more)</span>
//                       <ChevronDown className="w-5 h-5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useId, useState } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What kind of residential plots does Dholera Times offer in Dholera?",
    answer:
      "Dholera Times helps buyers explore residential plot options in prime locations in Dholera, including projects with registry-ready documentation and buyer support.",
  },
  {
    question: "Are the plots registry-ready?",
    answer:
      "Yes, Dholera Times highlights projects with registry-ready documentation so buyers can move forward with more clarity and confidence.",
  },
  {
    question: "Can I get immediate possession of the plot?",
    answer:
      "Some projects offer immediate possession, depending on the location and project type. Our team can help you check the current availability and possession details.",
  },
  {
    question: "How can Dholera Times help me choose the right plot?",
    answer:
      "Dholera Times helps buyers compare plot options based on budget, location, project type, and buying goals, with support from enquiry to booking.",
  },
  {
    question: "Do you provide site visit support?",
    answer:
      "Yes, our team can assist you with site visit planning so you can better understand the project location, surroundings, and plot options.",
  },
  {
    question: "Is Dholera a good place to buy a residential plot?",
    answer:
      "Dholera is gaining attention because of its planned development, infrastructure growth, and future connectivity. Many buyers explore it for long-term residential and investment potential.",
  },
  {
    question: "What documents should I check before booking a plot?",
    answer:
      "Buyers should check registry status, title clarity, project details, and other important documents before booking. Dholera Times helps guide buyers through this process.",
  },
  {
    question: "Can I talk to your team before making a decision?",
    answer:
      "Yes, you can connect with the Dholera Times team for project details, pricing, location guidance, and support before booking.",
  },
];

export default function FAQS() {
  const faqId = useId();
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const toggleShowAll = () => {
    if (showAll && openIndex !== null && openIndex >= 5) {
      setOpenIndex(null);
    }

    setShowAll((current) => !current);
  };

  const renderAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return (
        <ul
          className="
            list-disc space-y-2 pl-5
            text-[15px] font-normal leading-[26px] text-[#14381F]/80
            marker:text-[#14381F]
            md:text-[16px] md:leading-7
          "
        >
          {answer.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <p
        className="
          text-[15px] font-normal leading-[26px] text-[#14381F]/80
          md:text-[16px] md:leading-7
        "
      >
        {answer}
      </p>
    );
  };

  return (
    <section
      aria-labelledby={`${faqId}-heading`}
      className="
        bg-[#FAFAF6] px-4 py-10
        min-[414px]:px-6
        md:px-8 md:py-14
        lg:py-16
        selection:bg-[#F4D35E] selection:text-[#14381F]
      "
    >
      <div
        className="
          mx-auto grid w-full max-w-7xl grid-cols-1 gap-8
          md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]
          md:items-start md:gap-8
          lg:gap-14
        "
      >
        {/* Intro */}
        <div className="min-w-0">
          <h2
            id={`${faqId}-heading`}
            className="
              text-[30px] font-bold leading-[38px]
              tracking-tight text-[#14381F]
              md:text-[36px] md:leading-[44px]
              lg:text-[40px] lg:leading-[48px]
            "
          >
            FAQs
          </h2>

          <p className="mt-3 text-[16px] leading-[26px] text-[#14381F]/75">
            Have more questions?
          </p>

          <div className="mt-6">
            <a
              href="tel:+919958993549"
              className="
                inline-flex min-h-12 w-full items-center justify-center
                rounded-xl bg-[#14381F] px-6 py-3
                text-[16px] font-semibold leading-6 text-white
                shadow-[0_6px_18px_-10px_rgba(20,56,31,0.35)]
                transition-colors duration-200
                hover:bg-[#20472C]
                active:bg-[#0D2918]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-[#14381F]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#FAFAF6]
                sm:w-auto
                motion-reduce:transition-none
              "
            >
              Give us a missed call
            </a>
          </div>
        </div>

        {/* FAQ list */}
        <div className="min-w-0">
          <div id={`${faqId}-list`} className="space-y-3">
            {displayedFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const questionId = `${faqId}-question-${index}`;
              const answerId = `${faqId}-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`
                    rounded-2xl border
                    transition-colors duration-200
                    motion-reduce:transition-none
                    ${
                      isOpen
                        ? "border-[#14381F]/30 bg-[#FFFBEF]"
                        : "border-[#14381F]/15 bg-white hover:border-[#14381F]/35"
                    }
                  `}
                >
                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleFAQ(index)}
                      className="
                        flex min-h-16 w-full items-center justify-between
                        gap-4 rounded-2xl px-4 py-4 text-left
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-[#14381F]
                        focus-visible:ring-inset
                        sm:px-5
                      "
                    >
                      <span
                        className="
                          min-w-0 text-[16px] font-semibold
                          leading-[25px] text-[#14381F]
                          md:text-[17px] md:leading-[26px]
                        "
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`
                          flex h-8 w-8 shrink-0 items-center justify-center
                          rounded-full text-[#14381F]
                          transition-colors duration-200
                          motion-reduce:transition-none
                          ${isOpen ? "bg-[#F4D35E]" : "bg-[#14381F]/5"}
                        `}
                      >
                        {isOpen ? (
                          <Minus
                            className="h-4 w-4"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <Plus
                            className="h-4 w-4"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                    className="px-4 pb-5 sm:px-5"
                  >
                    <div className="border-t border-[#14381F]/10 pt-4">
                      {renderAnswer(faq.answer)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show more / less */}
          {faqs.length > 5 && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={toggleShowAll}
                aria-expanded={showAll}
                aria-controls={`${faqId}-list`}
                className="
                  inline-flex min-h-11 items-center justify-center gap-2
                  rounded-lg px-4 py-2.5
                  text-[15px] font-semibold leading-6 text-[#14381F]
                  transition-colors duration-200
                  hover:bg-[#F4D35E]/25
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#14381F]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#FAFAF6]
                  motion-reduce:transition-none
                "
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>Show More FAQs ({faqs.length - 5} more)</span>
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
