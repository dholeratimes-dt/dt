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
import {
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";

const faqs = [
  {
    question:
      "What kind of residential plots does Dholera Times offer in Dholera?",
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
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  const toggleShowAll = () => {
    if (
      showAll &&
      openIndex !== null &&
      openIndex >= 5
    ) {
      setOpenIndex(null);
    }

    setShowAll((current) => !current);
  };

  const renderAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return (
        <ul
          className="
            list-disc
            space-y-2.5
            pl-5

            text-[15px]
            font-normal
            leading-[26px]
            text-[#68565E]

            marker:text-[#8F2946]

            sm:text-[16px]
            sm:leading-7
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
          max-w-[720px]

          text-[15px]
          font-normal
          leading-[26px]

          text-[#68565E]

          sm:text-[16px]
          sm:leading-7
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
        relative
        isolate
        overflow-hidden

        border-y
        border-[#EAD9DF]

        bg-[#F3E7EC]

        px-4
        py-12

        selection:bg-[#E0A4B5]
        selection:text-[#39252E]

        min-[414px]:px-5

        sm:px-6
        sm:py-14

        md:px-8
        md:py-20

        lg:py-[88px]
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
        "
      >
        <div
          className="
            absolute
            -left-40
            -top-48

            h-[420px]
            w-[420px]

            rounded-full

            bg-[#8F2946]/[0.035]

            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-56
            right-[-180px]

            h-[460px]
            w-[460px]

            rounded-full

            bg-white/40

            blur-3xl
          "
        />
      </div>

      <div
        className="
          mx-auto

          grid
          w-full
          max-w-7xl

          grid-cols-1

          gap-10

          md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.55fr)]
          md:items-start
          md:gap-12

          lg:gap-16

          xl:gap-[72px]
        "
      >
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <div
          className="
            relative
            min-w-0

            md:sticky
            md:top-28
          "
        >
          {/* Eyebrow
              Mobile: normal flow
              Desktop: moved above heading so heading aligns
              with FAQ card
          */}
          <div
            className="
              mb-4
              flex
              items-center
              gap-3

              md:absolute
              md:-top-9
              md:left-0
              md:mb-0
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                shrink-0

                bg-[#8F2946]
              "
            />

            <p
              className="
                text-xs
                font-semibold
                uppercase
                leading-5

                tracking-[0.16em]

                text-[#8F2946]
              "
            >
              Need clarity?
            </p>
          </div>

          {/* Heading */}
          <h2
            id={`${faqId}-heading`}
            className="
              max-w-[400px]

              text-[30px]
              font-semibold
              leading-[1.18]

              tracking-[-0.025em]

              text-[#39252E]

              min-[414px]:text-[32px]

              sm:text-[34px]

              md:text-[38px]
              md:leading-[1.16]

              lg:text-[42px]
            "
          >
            Frequently Asked{" "}
            <span className="text-[#8F2946]">
              Questions
            </span>
          </h2>

          {/* Supporting text */}
          <p
            className="
              mt-5
              max-w-[380px]

              text-[15px]
              leading-[26px]

              text-[#68565E]

              sm:text-[16px]
              sm:leading-7

              md:mt-6
            "
          >
            Have more questions? Speak directly with
            our team for project, pricing, location,
            and booking guidance.
          </p>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="
              my-6
              h-px
              max-w-[380px]

              bg-[#E0A4B5]/60

              sm:my-7

              md:my-8
            "
          />

          {/* CTA */}
          <a
            href="tel:+919958993549"
            className="
              group

              inline-flex
              min-h-[52px]

              w-full

              items-center
              justify-center
              gap-3

              rounded-lg

              bg-[#8F2946]

              px-6
              py-3

              text-[15px]
              font-semibold
              leading-6

              text-white

              shadow-[0_8px_22px_-14px_rgba(116,32,57,0.65)]

              transition-[background-color,transform,box-shadow]
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#742039]
              hover:shadow-[0_12px_26px_-14px_rgba(116,32,57,0.75)]

              active:translate-y-0

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#8F2946]

              sm:w-auto

              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <Phone
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              className="shrink-0"
            />

            <span>Give us a missed call</span>
          </a>

          {/* Trust line */}
          <div
            className="
              mt-4

              flex
              items-center
              gap-2

              text-[12px]
              font-medium
              leading-5

              text-[#68565E]

              sm:mt-5
            "
          >
            <span
              aria-hidden="true"
              className="
                h-1.5
                w-1.5
                shrink-0

                rounded-full

                bg-[#8F2946]
              "
            />

            <span>
              Direct assistance from our team
            </span>
          </div>
        </div>

        {/* =====================================================
            RIGHT FAQ AREA
        ====================================================== */}

        <div className="min-w-0">
          <div
            id={`${faqId}-list`}
            className="
              overflow-hidden

              rounded-xl

              border
              border-[#E0A4B5]/60

              bg-white

              shadow-[0_18px_50px_-35px_rgba(116,32,57,0.28)]

              sm:rounded-2xl
            "
          >
            {displayedFaqs.map((faq, index) => {
              const isOpen =
                openIndex === index;

              const questionId = `${faqId}-question-${index}`;

              const answerId = `${faqId}-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`
                    relative

                    border-b
                    border-[#EAD9DF]

                    last:border-b-0

                    transition-colors
                    duration-200

                    motion-reduce:transition-none

                    ${
                      isOpen
                        ? "bg-[#F7EBEF]"
                        : "bg-white hover:bg-[#FBF7F8]"
                    }
                  `}
                >
                  {/* Active accent */}
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-0
                        top-0

                        w-[3px]

                        bg-[#8F2946]
                      "
                    />
                  )}

                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() =>
                        toggleFAQ(index)
                      }
                      className="
                        group

                        flex
                        min-h-[76px]
                        w-full

                        items-center
                        justify-between

                        gap-4

                        px-4
                        py-[18px]

                        text-left

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#8F2946]
                        focus-visible:ring-inset

                        min-[414px]:px-5

                        sm:min-h-[80px]
                        sm:gap-5
                        sm:px-6
                        sm:py-5

                        md:min-h-[84px]
                        md:px-7

                        lg:min-h-[85px]
                        lg:px-8
                        lg:py-[22px]
                      "
                    >
                      <span
                        className={`
                          min-w-0
                          pr-2

                          text-[16px]
                          font-semibold
                          leading-[24px]

                          transition-colors
                          duration-200

                          sm:leading-[25px]

                          md:text-[17px]
                          md:leading-[27px]

                          ${
                            isOpen
                              ? "text-[#39252E]"
                              : "text-[#51414A] group-hover:text-[#39252E]"
                          }
                        `}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border

                          transition-[background-color,border-color,color]
                          duration-200

                          sm:h-10
                          sm:w-10

                          motion-reduce:transition-none

                          ${
                            isOpen
                              ? "border-[#8F2946] bg-[#8F2946] text-white"
                              : "border-[#E0A4B5]/60 bg-[#F7EBEF] text-[#8F2946] group-hover:border-[#8F2946]/50 group-hover:bg-[#F3E7EC]"
                          }
                        `}
                      >
                        {isOpen ? (
                          <Minus
                            className="
                              h-4
                              w-4

                              sm:h-[18px]
                              sm:w-[18px]
                            "
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <Plus
                            className="
                              h-4
                              w-4

                              sm:h-[18px]
                              sm:w-[18px]
                            "
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  {/* Answer */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                    className="
                      px-4
                      pb-5

                      min-[414px]:px-5

                      sm:px-6
                      sm:pb-6

                      md:px-7
                      md:pb-7

                      lg:px-8
                      lg:pb-8
                    "
                  >
                    <div
                      className="
                        border-t
                        border-[#E0A4B5]/50

                        pt-4

                        sm:pt-5
                      "
                    >
                      {renderAnswer(faq.answer)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =====================================================
              SHOW MORE / LESS
          ====================================================== */}

          {faqs.length > 5 && (
            <div
              className="
                mt-5

                flex
                justify-center

                sm:mt-6

                md:mt-7
              "
            >
              <button
                type="button"
                onClick={toggleShowAll}
                aria-expanded={showAll}
                aria-controls={`${faqId}-list`}
                className="
                  group

                  inline-flex
                  min-h-[46px]

                  w-full

                  items-center
                  justify-center
                  gap-2

                  rounded-lg

                  border
                  border-[#E0A4B5]/70

                  bg-white

                  px-5
                  py-2.5

                  text-[14px]
                  font-semibold
                  leading-6

                  text-[#8F2946]

                  transition-[background-color,border-color,color]
                  duration-200

                  hover:border-[#8F2946]/50
                  hover:bg-[#F7EBEF]
                  hover:text-[#742039]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8F2946]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#F3E7EC]

                  sm:w-auto
                  sm:px-6

                  motion-reduce:transition-none
                "
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>

                    <ChevronUp
                      className="
                        h-5
                        w-5
                        shrink-0

                        transition-transform
                        duration-200

                        group-hover:-translate-y-0.5

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    <span>
                      Show More FAQs (
                      {faqs.length - 5} more)
                    </span>

                    <ChevronDown
                      className="
                        h-5
                        w-5
                        shrink-0

                        transition-transform
                        duration-200

                        group-hover:translate-y-0.5

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                      aria-hidden="true"
                    />
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