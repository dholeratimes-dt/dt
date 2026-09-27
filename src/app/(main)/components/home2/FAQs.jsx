"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

/* ============================================================
   FAQ DATA
============================================================ */

const faqs = [
  {
    question: "What is Dholera Smart City?",
    answer:
      "Dholera Smart City also refers to Dholera Special Investment Region (Dholera SIR), a planned industrial city in Gujarat being developed as part of the Delhi-Mumbai Industrial Corridor.",
  },
  {
    question: "What are the latest developments in Dholera?",
    answer:
      "Major developments include infrastructure, transportation, industrial projects, semiconductor manufacturing and expansion of the Dholera SIR ecosystem. Dholera Times tracks these developments individually as their status changes.",
  },
  {
    question: "Where can I find the latest Dholera news?",
    answer:
      "You can follow the Dholera Times Latest Updates section for recent infrastructure, industry, government and investment developments.",
  },
  {
    question: "Is Dholera good for investment?",
    answer:
      "Dholera has significant infrastructure and industrial development activity, but individual investment decisions depend on location, price, legal status, development stage, investment horizon and risk tolerance.",
  },
];

/* ============================================================
   FAQ COMPONENT
============================================================ */

export default function FAQS() {
  const faqId = useId();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index,
    );
  };

  return (
    <section
      aria-labelledby={`${faqId}-heading`}
      className="
        w-full

        bg-[#FAF7F8]

        px-4
        py-8

        text-[#39252E]

        selection:bg-[#E0A4B5]
        selection:text-[#39252E]

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-10

        lg:px-10
        lg:py-12
      "
    >
      <div
        className="
          mx-auto

          grid
          w-full
          max-w-7xl

          grid-cols-1

          gap-6

          md:grid-cols-[minmax(220px,0.6fr)_minmax(0,1.4fr)]
          md:items-start
          md:gap-8

          lg:grid-cols-[minmax(280px,0.62fr)_minmax(0,1.38fr)]
          lg:gap-12

          xl:grid-cols-[minmax(310px,0.65fr)_minmax(0,1.35fr)]
          xl:gap-16
        "
      >
        {/* ===================================================
            LEFT SIDE
        ==================================================== */}

        <div
          className="
            min-w-0

            md:sticky
            md:top-24
          "
        >
          <h2
            id={`${faqId}-heading`}
            className="
              max-w-[390px]

              text-[28px]
              font-bold
              leading-[1.12]

              tracking-[-0.03em]

              text-[#39252E]

              sm:text-[30px]

              md:text-[32px]

              lg:text-[38px]
              lg:leading-[1.15]

              xl:text-[40px]
            "
          >
            Frequently Asked{" "}
            <span
              className="
                block

                text-[#8F2946]

                sm:inline
                md:block
              "
            >
              Questions
            </span>
          </h2>
        </div>

        {/* ===================================================
            RIGHT SIDE — FAQ ACCORDION
        ==================================================== */}

        <div className="min-w-0">
          <div
            className="
              overflow-hidden

              rounded-2xl

              border
              border-[#E0C7D0]

              bg-white

              shadow-[0_12px_30px_rgba(57,37,46,0.045)]
            "
          >
            {faqs.map((faq, index) => {
              const isOpen =
                openIndex === index;

              const questionId =
                `${faqId}-question-${index}`;

              const answerId =
                `${faqId}-answer-${index}`;

              return (
                <article
                  key={faq.question}
                  className={`
                    relative

                    border-b
                    border-[#EAD9DF]

                    last:border-b-0

                    transition-colors
                    duration-200

                    ${
                      isOpen
                        ? "bg-[#FFFDFE]"
                        : "bg-white hover:bg-[#FCF9FA]"
                    }

                    motion-reduce:transition-none
                  `}
                >
                  {/* =========================================
                      ACTIVE LEFT LINE
                  ========================================== */}

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

                  {/* =========================================
                      QUESTION
                  ========================================== */}

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
                        w-full

                        items-center
                        justify-between

                        gap-4

                        px-4
                        py-5

                        text-left

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-[#8F2946]

                        min-[414px]:px-5

                        sm:min-h-[78px]
                        sm:px-6
                        sm:py-5

                        md:min-h-[82px]
                        md:px-7

                        lg:min-h-[84px]
                        lg:px-8
                        lg:py-[22px]
                      "
                    >
                      {/* QUESTION TEXT */}

                      <span
                        className={`
                          min-w-0
                          pr-2

                          text-[15.5px]
                          font-semibold
                          leading-[24px]

                          tracking-[-0.01em]

                          transition-colors
                          duration-200

                          sm:text-[16px]
                          sm:leading-[25px]

                          md:text-[16.5px]

                          lg:text-[17px]
                          lg:leading-[27px]

                          ${
                            isOpen
                              ? "text-[#39252E]"
                              : "text-[#51414A] group-hover:text-[#39252E]"
                          }
                        `}
                      >
                        {faq.question}
                      </span>

                      {/* PLUS / MINUS */}

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

                          transition-[background-color,border-color,color,transform]
                          duration-200

                          sm:h-10
                          sm:w-10

                          ${
                            isOpen
                              ? `
                                  border-[#8F2946]
                                  bg-[#8F2946]
                                  text-white
                                `
                              : `
                                  border-[#E0A4B5]/60
                                  bg-[#F7EBEF]
                                  text-[#8F2946]

                                  group-hover:border-[#8F2946]/60
                                  group-hover:bg-[#F3E7EC]
                                `
                          }

                          motion-reduce:transition-none
                        `}
                      >
                        {isOpen ? (
                          <Minus
                            size={18}
                            strokeWidth={1.9}
                            aria-hidden="true"
                          />
                        ) : (
                          <Plus
                            size={18}
                            strokeWidth={1.9}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  {/* =========================================
                      ANSWER
                  ========================================== */}

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

                      lg:px-8
                      lg:pb-7
                    "
                  >
                    <div
                      className="
                        border-t
                        border-[#EAD9DF]

                        pt-4

                        sm:pt-5
                      "
                    >
                      <p
                        className="
                          max-w-[850px]

                          text-[15px]
                          font-normal
                          leading-[26px]

                          text-[#68565E]

                          sm:text-[16px]
                          sm:leading-7
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}