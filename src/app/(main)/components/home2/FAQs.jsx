"use client";
import { useState } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How far is Dholera SIR from Ahmedabad?",
    answer:
      "Dholera SIR is approximately 109 km from Ahmedabad. Once the Ahmedabad–Dholera Expressway is fully operational, travel time will reduce significantly, improving connectivity and boosting real estate potential.",
  },
  {
    question: "Is Dholera SIR suitable for NRIs to invest?",
    answer:
      "Yes. Dholera SIR is a government-backed smart city with transparent planning, structured TP zones, and high long-term appreciation potential. With clear documentation and regulated development, it is considered a safe and attractive option for NRI investors.",
  },
  {
    question: "Is my land investment secure in Dholera SIR?",
    answer:
      "Your investment is secure when you purchase NA (Non-Agricultural) / NOC-approved plots with clear title verification and proper documentation. Buying within approved TP zones through verified developers ensures legal safety and transparency.",
  },
  {
    question: "When will Dholera SIR be fully developed?",
    answer:
      "Dholera SIR is being developed in phases. The Activation Area infrastructure is already operational, and major projects like the International Airport and Expressway are progressing rapidly. Growth is ongoing and structured as per the master development plan.",
  },
  {
    question: "What makes Dholera SIR different from other cities?",
    answer:
      "Dholera SIR is not an extension of an existing city. It is a fully planned Greenfield Smart City built from scratch with organized zoning, underground utilities, smart infrastructure, wide roads, and global-standard connectivity.",
  },
  {
    question: "Is Dholera SIR a government project?",
    answer:
      "Yes. Dholera SIR is a government-planned and government-backed project under the Delhi-Mumbai Industrial Corridor (DMIC), making it one of India's most structured and transparent urban development initiatives.",
  },
  {
    question: "Is Dholera SIR good for long-term investment?",
    answer:
      "Yes. Dholera SIR is considered a long-term growth destination due to massive infrastructure spending, industrial investments, and smart city planning. It is not positioned as a short-term speculative market, but rather a strategic future-focused investment opportunity.",
  },
  {
    question: "What are the major projects driving growth in Dholera?",
    answer: [
      "Dholera International Airport",
      "Ahmedabad–Dholera Expressway",
      "Semiconductor fabrication plant (₹91,000 Cr investment)",
      "5,000 MW Solar Park",
      "Industrial and logistics zones under DMIC",
    ],
  },
];

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  const renderAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return (
        <ul className="list-disc list-inside space-y-2">
          {answer.map((item, idx) => (
            <li key={idx} className="text-gray-600 text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>;
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-[#151f28] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-4">Have more questions?</p>

            <div className="pt-4">
              <a
                className="inline-block bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
                href="tel:+919958993549"
              >
                Give us a missed call
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4 md:mt-0">
            <div className="space-y-1">
              {displayedFaqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-gray-900 font-medium pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 transition-transform duration-200">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-4 px-0">{renderAnswer(faq.answer)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {faqs.length > 5 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 text-[#b69b5e] hover:text-[#d3b36b] font-semibold transition-colors duration-200"
                >
                  {showAll ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>Show More FAQs ({faqs.length - 5} more)</span>
                      <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}