"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

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

function FAQItem({ faq, index, isOpen, isVisible, onToggle }) {
  return (
    <div
      className={`overflow-hidden border-b border-gray-200 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
      style={{ transitionDelay: isVisible ? `${index * 45}ms` : "0ms" }}
    >
      <button
        className={`w-full py-4 flex justify-between items-center text-left transition-all duration-200 ${
          isOpen ? "bg-[#f8f2e4] px-4" : "hover:bg-gray-50"
        }`}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span
          className={`font-medium pr-4 leading-relaxed transition-colors duration-200 ${
            isOpen ? "text-[#151f28]" : "text-gray-900"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-[#b69b5e] bg-[#b69b5e] text-white"
              : "rotate-0 border-gray-300 text-gray-600"
          }`}
        >
          <Plus className="w-5 h-5" />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 pt-3 text-gray-600 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="bg-white" ref={sectionRef}>
      <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 gap-6 md:gap-12 max-w-7xl mx-auto">
        <div
          className={`w-full md:w-2/5 pl-2 pr-2 transition-all duration-700 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
          }`}
        >
          <h2 className="text-[32px] font-semibold text-[#151f28] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-4">Have more questions?</p>

          <div className="pt-4">
            <a
              className="inline-block bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:-translate-y-0.5 active:translate-y-0"
              href="tel:+919958993549"
            >
              Give us a missed call
            </a>
          </div>
        </div>

        <div className="w-full md:w-3/5 md:pl-24 md:pr-4 md:mt-0">
          <div className="space-y-1">
            {displayedFaqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                isVisible={isVisible}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>

          {faqs.length > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 text-[#b69b5e] hover:text-[#d3b36b] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
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
  );
}
