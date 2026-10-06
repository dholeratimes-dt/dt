"use client";

import {
  useId,
  useState,
} from "react";

import {
  Minus,
  Plus,
} from "lucide-react";

export default function CommonFAQ({
  faqItems = [],
}) {
  const faqId = useId();

  const [
    openIndex,
    setOpenIndex,
  ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) =>
      current === index
        ? null
        : index,
    );
  };

  if (!faqItems.length) {
    return null;
  }

  return (
    <section
      aria-labelledby={`${faqId}-heading`}
      className="
        w-full

        bg-white

        px-4
        py-8

        text-black

        selection:bg-[#EC1C40]
        selection:text-white

        min-[414px]:px-5

        sm:px-6
        sm:py-10

        md:px-8
        md:py-10

        lg:px-10
        lg:py-10
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
            md:self-start
          "
        >
          <h2
            id={`${faqId}-heading`}
            className="
              whitespace-nowrap

              text-[28px]
              font-bold
              leading-[1.12]

              tracking-[-0.03em]

              text-black

              sm:text-[30px]

              md:text-[32px]

              lg:text-[38px]
              lg:leading-[1.15]

              xl:text-[40px]
            "
          >
            FAQ
            <span className="text-[#EC1C40]">
              s
            </span>
          </h2>
        </div>

        

        {/* ===================================================
            FAQ ACCORDION
        ==================================================== */}

        <div className="min-w-0">
          <div
            className="
              overflow-hidden

              rounded-2xl

              border
              border-black/10

              bg-white

              shadow-[0_12px_30px_rgba(0,0,0,0.045)]
            "
          >
            {faqItems.map(
              (
                {
                  question,
                  answer,
                },
                index,
              ) => {
                const isOpen =
                  openIndex === index;

                const questionId =
                  `${faqId}-question-${index}`;

                const answerId =
                  `${faqId}-answer-${index}`;

                return (
                  <article
                    key={`${question}-${index}`}
                    className={`
                      relative

                      border-b
                      border-black/10

                      last:border-b-0

                      transition-colors
                      duration-200

                      ${
                        isOpen
                          ? "bg-[#EC1C40]/[0.018]"
                          : "bg-white hover:bg-black/[0.018]"
                      }

                      motion-reduce:transition-none
                    `}
                  >
                    {/* =====================================
                        ACTIVE LEFT LINE
                    ====================================== */}

                    <span
                      aria-hidden="true"
                      className={`
                        absolute

                        bottom-0
                        left-0
                        top-0

                        w-[3px]

                        bg-[#EC1C40]

                        transition-transform
                        duration-300
                        ease-out

                        ${
                          isOpen
                            ? "scale-y-100"
                            : "scale-y-0"
                        }

                        motion-reduce:transition-none
                      `}
                    />

                    {/* =====================================
                        QUESTION
                    ====================================== */}

                    <h3>
                      <button
                        id={questionId}
                        type="button"
                        aria-expanded={
                          isOpen
                        }
                        aria-controls={
                          answerId
                        }
                        onClick={() =>
                          toggleFAQ(
                            index,
                          )
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
                          focus-visible:ring-[#EC1C40]

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
                                ? "text-black"
                                : "text-black/75 group-hover:text-black"
                            }
                          `}
                        >
                          {question}
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
                                    border-[#EC1C40]

                                    bg-[#EC1C40]

                                    text-white
                                  `
                                : `
                                    border-[#EC1C40]/20

                                    bg-[#EC1C40]/5

                                    text-[#EC1C40]

                                    group-hover:border-[#EC1C40]/40
                                    group-hover:bg-[#EC1C40]/10
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

                    {/* =====================================
                        ANSWER
                    ====================================== */}

                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={
                        questionId
                      }
                      className={`
                        grid

                        transition-[grid-template-rows,opacity]
                        duration-300
                        ease-out

                        ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }

                        motion-reduce:transition-none
                      `}
                    >
                      <div className="overflow-hidden">
                        <div
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
                              border-black/10

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

                                text-black/65

                                sm:text-[16px]
                                sm:leading-7
                              "
                            >
                              {answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}