"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import dynamic from "next/dynamic";

/* ============================================================
   LAZY LOAD FORM

   HeroForm does not need to compete with the hero image during
   the initial mobile page load.
============================================================ */

const HeroForm = dynamic(
  () => import("./HeroForm"),
  {
    ssr: false,
    loading: () => null,
  },
);

/* ============================================================
   COMPONENT
============================================================ */

export default function HeroDesktopFormLayer() {
  const [isDesktop, setIsDesktop] = useState(false);

  const [formReady, setFormReady] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [submissionCount, setSubmissionCount] =
    useState(0);

  const [isDisabled, setIsDisabled] =
    useState(false);

  /* ============================================================
     DETECT DESKTOP

     This prevents HeroForm from being mounted/downloaded
     unnecessarily on mobile.
  ============================================================ */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px)",
    );

    const updateDevice = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener(
      "change",
      updateDevice,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDevice,
      );
    };
  }, []);

  /* ============================================================
     RESTORE SUBMISSION COUNT

     Run this only on desktop because the form itself is
     desktop-only.
  ============================================================ */

  useEffect(() => {
    if (!isDesktop) {
      setFormReady(false);
      return;
    }

    const storedCount = Number.parseInt(
      localStorage.getItem(
        "heroFormSubmissionCount",
      ) || "0",
      10,
    );

    const lastSubmission = Number.parseInt(
      localStorage.getItem(
        "heroFormLastSubmissionTime",
      ) || "0",
      10,
    );

    if (lastSubmission) {
      const hoursPassed =
        (Date.now() - lastSubmission) /
        (1000 * 60 * 60);

      if (hoursPassed >= 24) {
        localStorage.setItem(
          "heroFormSubmissionCount",
          "0",
        );

        localStorage.setItem(
          "heroFormLastSubmissionTime",
          Date.now().toString(),
        );

        setSubmissionCount(0);
        setIsDisabled(false);
      } else {
        setSubmissionCount(storedCount);
        setIsDisabled(storedCount >= 20);
      }
    } else {
      setSubmissionCount(storedCount);
      setIsDisabled(storedCount >= 20);
    }

    setFormReady(true);
  }, [isDesktop]);

  /* ============================================================
     UPDATE SUBMISSION COUNT
  ============================================================ */

  const updateSubmissionCount =
    useCallback(() => {
      setSubmissionCount(
        (previousCount) => {
          const next =
            previousCount + 1;

          localStorage.setItem(
            "heroFormSubmissionCount",
            String(next),
          );

          localStorage.setItem(
            "heroFormLastSubmissionTime",
            String(Date.now()),
          );

          if (next >= 20) {
            setIsDisabled(true);
          }

          return next;
        },
      );
    }, []);

  /* ============================================================
     FORM SUCCESS
  ============================================================ */

  const handleFormSuccess =
    useCallback(() => {
      setShowPopup(true);
      updateSubmissionCount();
    }, [updateSubmissionCount]);

  return (
    <>
      {/* =====================================================
          SUCCESS POPUP
      ====================================================== */}

      {showPopup && (
        <div
          className="
            fixed
            inset-0
            z-[100]

            flex
            items-center
            justify-center

            bg-[#39252E]/65

            px-4
            py-6

            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full
              max-w-sm

              rounded-2xl

              border
              border-[#EAD9DF]

              bg-white

              p-6

              text-center

              shadow-[0_24px_70px_-24px_rgba(57,37,46,0.45)]

              sm:p-8
            "
          >
            <h2
              className="
                text-[22px]
                font-semibold
                leading-7
                tracking-[-0.02em]
                text-[#39252E]
              "
            >
              Thank You!
            </h2>

            <p
              className="
                mt-2

                text-[15px]
                leading-6
                text-[#68565E]
              "
            >
              Our team will get back to you shortly.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowPopup(false)
              }
              className="
                mt-5

                inline-flex
                min-h-[48px]

                items-center
                justify-center

                rounded-lg

                bg-[#8F2946]

                px-6
                py-3

                text-[15px]
                font-semibold
                text-white

                transition-colors
                duration-200

                hover:bg-[#742039]
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          DESKTOP FORM
      ====================================================== */}

      {isDesktop && formReady && (
        <div
          className="
            absolute

            right-[clamp(1.5rem,4.5vw,5rem)]
            top-1/2
            z-20

            hidden
            -translate-y-1/2

            md:block
            md:w-[330px]

            lg:w-[380px]

            xl:w-[420px]
          "
        >
          <HeroForm
            isDisabled={isDisabled}
            onSuccess={
              handleFormSuccess
            }
          />
        </div>
      )}
    </>
  );
}