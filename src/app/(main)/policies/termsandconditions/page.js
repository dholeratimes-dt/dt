import {
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

/* ============================================================
   SEO METADATA
============================================================ */

export const metadata = {
  title: "Terms & Conditions | Dholera Times",

  description:
    "Read the Terms & Conditions governing the use of Dholera Times, including news content, investment insights, property information, advisory services and website enquiries.",

  alternates: {
    canonical:
      "https://www.dholeratimes.com/policies/termsandconditions",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* ============================================================
   TABLE OF CONTENTS
============================================================ */

const tableOfContents = [
  {
    id: "about-dholera-times",
    label: "About Dholera Times",
  },
  {
    id: "website-information",
    label: "Information on This Website",
  },
  {
    id: "news-editorial",
    label: "News & Editorial Content",
  },
  {
    id: "investment-consultation",
    label: "Investment Insights & Consultation",
  },
  {
    id: "property-information",
    label: "Property Information",
  },
  {
    id: "inside-near-sir",
    label: "Inside Dholera SIR vs Near Dholera SIR",
  },
  {
    id: "property-due-diligence",
    label: "Property Due Diligence",
  },
  {
    id: "property-prices",
    label: "Property Prices & Availability",
  },
  {
    id: "booking-payments",
    label: "Booking, Payments & Cancellation",
  },
  {
    id: "site-visits",
    label: "Site Visits",
  },
  {
    id: "nri-buyers",
    label: "NRI & Overseas Buyers",
  },
  {
    id: "enquiries-communication",
    label: "Enquiries & Communication",
  },
  {
    id: "news-tips",
    label: "News Tips, Corrections & User Submissions",
  },
  {
    id: "visual-material",
    label: "Images, Maps & Visual Material",
  },
  {
    id: "third-party",
    label: "Third-Party Websites & Information",
  },
  {
    id: "intellectual-property",
    label: "Intellectual Property",
  },
  {
    id: "acceptable-use",
    label: "Acceptable Use",
  },
  {
    id: "website-availability",
    label: "Website Availability",
  },
  {
    id: "no-guarantee",
    label: "No Guarantee of Outcomes",
  },
  {
    id: "limitation-liability",
    label: "Limitation of Liability",
  },
  {
    id: "privacy",
    label: "Privacy",
  },
  {
    id: "changes",
    label: "Changes to These Terms",
  },
  {
    id: "governing-law",
    label: "Governing Law & Jurisdiction",
  },
  {
    id: "contact",
    label: "Contact Dholera Times",
  },
];

/* ============================================================
   TERMS SECTION

   PHONE:
   - No section number.
   - Plain text layout.

   TABLET / DESKTOP:
   - Number visible.
============================================================ */

function TermsSection({
  number,
  id,
  title,
  children,
}) {
  return (
    <section
      id={id}
      className="
        scroll-mt-24

        border-b
        border-black/10

        py-7

        first:pt-0

        last:border-b-0
        last:pb-0

        sm:scroll-mt-28
        sm:py-8

        lg:py-9
      "
    >
      <div
        className="
          flex
          items-start

          gap-0

          sm:gap-5
        "
      >
        {/* SECTION NUMBER — HIDDEN ON PHONE */}

        <span
          aria-hidden="true"
          className="
            hidden

            h-9
            min-w-9

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[#EC1C40]/10

            px-2

            text-[13px]
            font-bold
            leading-none

            text-[#EC1C40]

            sm:flex
          "
        >
          {String(number).padStart(2, "0")}
        </span>

        {/* SECTION CONTENT */}

        <div className="min-w-0 flex-1">
          <h2
            className="
              text-[21px]
              font-bold
              leading-[1.3]

              tracking-[-0.025em]

              text-black

              sm:text-[22px]

              lg:text-[24px]
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-4

              space-y-4

              text-[15px]
              leading-7

              text-black/65

              sm:text-[16px]
              sm:text-black/70
            "
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BULLET LIST
============================================================ */

function BulletList({ children }) {
  return (
    <ul
      className="
        list-disc

        space-y-2.5

        pl-5

        marker:text-[#EC1C40]
      "
    >
      {children}
    </ul>
  );
}

/* ============================================================
   TERMS & CONDITIONS PAGE
============================================================ */

export default function TermsAndConditionsPage() {
  return (
    <main
      className="
        min-h-screen

        bg-white

        text-black

        selection:bg-[#EC1C40]
        selection:text-white
      "
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section
        className="
          border-b
          border-black/10

          bg-white

          px-4
          py-8

          min-[414px]:px-5

          sm:px-6
          sm:py-12

          md:px-8
          md:py-14

          lg:px-10
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
          "
        >
          <div className="max-w-4xl">
            <h1
              className="
                text-[32px]
                font-bold
                leading-[1.1]

                tracking-[-0.035em]

                text-black

                min-[414px]:text-[34px]

                sm:text-[40px]

                md:text-[46px]

                lg:text-[52px]
              "
            >
              Terms &amp;{" "}
              <span className="text-[#EC1C40]">
                Conditions
              </span>
            </h1>

            <p
              className="
                inline-flex
                items-center

                rounded-full

                border
                border-black/10

                bg-black/[0.025]

                px-4
                py-2
                mt-4

                text-[13px]
                font-semibold
                leading-5

                text-black/60

                sm:px-4
                sm:py-2
                sm:text-[14px]
                lg:mt-4
              "
            >
              Last Updated: 24 September 2026
            </p>

            <div
              className="
                mt-6

                max-w-4xl

                space-y-4

                text-[15px]
                leading-7

                text-black/65

                sm:mt-7
                sm:text-[16px]
                sm:text-black/70
              "
            >
              <p>
                Welcome to{" "}
                <strong className="font-semibold text-black">
                  Dholera Times
                </strong>
                .
              </p>

              <p>
                These Terms &amp; Conditions govern your access to
                and use of{" "}
                <a
                  href="http://www.dholeratimes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    font-semibold

                    text-[#EC1C40]

                    underline
                    decoration-[#EC1C40]/30
                    underline-offset-4

                    transition-colors
                    duration-200

                    hover:text-black
                  "
                >
                  www.dholeratimes.com
                </a>
                , including our news, articles, investment insights,
                property information, consultation services, enquiry
                forms and other services made available through the
                website.
              </p>

              <p>
                By accessing or using this website, you agree to these
                Terms &amp; Conditions. If you do not agree with them,
                please discontinue use of the website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section
        className="
          bg-white

          px-4
          py-8

          min-[414px]:px-5

          sm:px-6
          sm:py-10

          md:px-8

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

            gap-8

            lg:grid-cols-[280px_minmax(0,1fr)]
            lg:items-start
            lg:gap-10

            xl:grid-cols-[300px_minmax(0,1fr)]
            xl:gap-14
          "
        >
          {/* =================================================
              DESKTOP CONTENT NAVIGATION
          ================================================== */}

          

          <aside
              className="
                hidden
                min-w-0

                lg:sticky
                lg:top-24
                lg:block
              "
            >
            <nav
              aria-label="Terms and Conditions sections"
              className="
                max-h-[calc(100vh-120px)]

                overflow-hidden

                rounded-2xl

                border
                border-black/10

                bg-black/[0.02]
              "
            >
              {/* =================================================
                  CONTENTS HEADER
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  border-b
                  border-black/10

                  bg-white

                  px-4
                  py-4
                "
              >
                <FileText
                  size={19}
                  strokeWidth={1.9}
                  aria-hidden="true"
                  className="
                    shrink-0
                    text-[#EC1C40]
                  "
                />

                <h2
                  className="
                    text-[15px]
                    font-bold
                    leading-6

                    text-black
                  "
                >
                  Contents
                </h2>
              </div>

              {/* =================================================
                  SCROLLABLE CONTENT LIST
              ================================================= */}

              <div
                className="
                  max-h-[calc(100vh-185px)]

                  overflow-y-auto

                  p-2

                  [scrollbar-width:thin]

                  [&::-webkit-scrollbar]:w-[5px]

                  [&::-webkit-scrollbar-track]:bg-transparent

                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-black/10
                "
              >
                {tableOfContents.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="
                      group

                      flex
                      items-center

                      gap-3

                      rounded-lg

                      px-3
                      py-2.5

                      text-[13px]
                      font-medium
                      leading-5

                      text-black/55

                      transition-[background-color,color]
                      duration-200

                      hover:bg-[#EC1C40]/5
                      hover:text-black

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#EC1C40]
                      focus-visible:ring-inset
                    "
                  >
                    {/* Number */}
                    <span
                      className="
                        min-w-[22px]
                        shrink-0

                        text-[11px]
                        font-bold
                        leading-5

                        text-[#EC1C40]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Label */}
                    <span
                      className="
                        min-w-0

                        transition-colors
                        duration-200
                      "
                    >
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </nav>
          </aside>
          {/* =================================================
              TERMS DOCUMENT

              PHONE:
              No border, rounded card, shadow or padding box.

              TABLET / DESKTOP:
              Original document card returns.
          ================================================== */}

          <article
            className="
              min-w-0

              bg-white

              sm:rounded-2xl

              sm:border
              sm:border-black/10

              sm:p-7

              sm:shadow-[0_12px_38px_-28px_rgba(0,0,0,0.20)]

              md:p-8

              lg:p-9

              xl:p-10
            "
          >
            {/* =================================================
                1. ABOUT DHOLERA TIMES
            ================================================== */}

            <TermsSection
              number={1}
              id="about-dholera-times"
              title="About Dholera Times"
            >
              <p>
                Dholera Times is a Dholera-focused platform providing:
              </p>

              <BulletList>
                <li>Dholera Smart City news and updates</li>
                <li>Dholera SIR information</li>
                <li>Infrastructure and industry coverage</li>
                <li>Investment insights</li>
                <li>Property-market information</li>

                <li>
                  Investment consultation and property advisory
                </li>

                <li>Residential plot information</li>
                <li>Site-visit assistance</li>
                <li>NRI property information</li>
                <li>Business and media-related information</li>
              </BulletList>

              <p>
                Our website contains both editorial/informational
                content and commercial property-related content.
              </p>

              <p>
                Where relevant, we aim to make this distinction clear.
              </p>
            </TermsSection>

            {/* =================================================
                2. INFORMATION ON THIS WEBSITE
            ================================================== */}

            <TermsSection
              number={2}
              id="website-information"
              title="Information on This Website"
            >
              <p>
                We make reasonable efforts to provide useful and
                accurate information.
              </p>

              <p>
                However, Dholera is a developing region and
                information relating to:
              </p>

              <BulletList>
                <li>Infrastructure projects</li>
                <li>Government approvals</li>
                <li>Construction status</li>
                <li>Companies and industries</li>
                <li>Property prices</li>
                <li>Plot availability</li>
                <li>Development timelines</li>
                <li>Regulations</li>
                <li>Investment conditions</li>
              </BulletList>

              <p>
                may change over time.
              </p>

              <p>
                Users should therefore check the publication date,
                last-updated date and source of important information
                before relying on it.
              </p>

              <p>
                Dholera Times may update, correct, revise or remove
                website content when reliable new information becomes
                available.
              </p>
            </TermsSection>

            {/* =================================================
                3. NEWS & EDITORIAL CONTENT
            ================================================== */}

            <TermsSection
              number={3}
              id="news-editorial"
              title="News & Editorial Content"
            >
              <p>
                News, updates, reports and articles published by
                Dholera Times are provided for general information
                purposes.
              </p>

              <p>
                Where possible, we rely on sources such as:
              </p>

              <BulletList>
                <li>Government announcements</li>
                <li>Official authorities</li>
                <li>Regulatory information</li>
                <li>Company announcements</li>
                <li>Project updates</li>
                <li>On-ground observations</li>
                <li>Credible third-party sources</li>
              </BulletList>

              <p>
                An announcement, approval, MoU, proposal or reported
                development should not automatically be treated as a
                completed or operational project.
              </p>

              <p>
                Dholera Times aims to identify project status clearly
                wherever reliable information is available.
              </p>
            </TermsSection>

            {/* =================================================
                4. INVESTMENT INSIGHTS & CONSULTATION
            ================================================== */}

            <TermsSection
              number={4}
              id="investment-consultation"
              title="Investment Insights & Consultation"
            >
              <p>
                Dholera Times provides information and consultation
                relating to Dholera investment opportunities,
                property locations, infrastructure, market
                developments and residential property options.
              </p>

              <p>
                Such information is intended to help users research
                and understand Dholera.
              </p>

              <p>
                Unless specifically stated otherwise under an
                applicable professional engagement, content and
                consultations provided by Dholera Times should not be
                treated as:
              </p>

              <BulletList>
                <li>Personal financial advice</li>
                <li>Securities or investment advice</li>
                <li>Legal advice</li>
                <li>Tax advice</li>
                <li>Accounting advice</li>
                <li>A guarantee of investment returns</li>
              </BulletList>

              <p>
                Property values can rise or fall, and future
                appreciation cannot be guaranteed.
              </p>

              <p>
                Users should consider their own financial
                circumstances, investment horizon and risk tolerance
                and obtain independent professional advice where
                appropriate.
              </p>
            </TermsSection>

            {/* =================================================
                5. PROPERTY INFORMATION
            ================================================== */}

            <TermsSection
              number={5}
              id="property-information"
              title="Property Information"
            >
              <p>
                Dholera Times may provide information about
                residential plots and other property opportunities in
                the Dholera region.
              </p>

              <p>
                Property information may include:
              </p>

              <BulletList>
                <li>Location</li>
                <li>Plot size</li>
                <li>Pricing</li>
                <li>Availability</li>
                <li>Layout information</li>
                <li>Development status</li>
                <li>Documentation</li>
                <li>Distance from infrastructure</li>
                <li>Site photographs or videos</li>
              </BulletList>

              <p>
                Property details may change without prior notice.
              </p>

              <p>
                Users should independently verify important
                information before making a purchase decision.
              </p>
            </TermsSection>

            {/* =================================================
                6. INSIDE VS NEAR DHOLERA SIR
            ================================================== */}

            <TermsSection
              number={6}
              id="inside-near-sir"
              title="Inside Dholera SIR vs Near Dholera SIR"
            >
              <p>
                Property described as being in the Dholera region
                should not automatically be assumed to lie within the
                officially notified Dholera Special Investment
                Region.
              </p>

              <p>
                Before purchasing property, buyers should verify
                details including:
              </p>

              <BulletList>
                <li>Exact village</li>
                <li>Survey number</li>
                <li>Land title</li>
                <li>SIR boundary</li>
                <li>Land-use classification</li>
                <li>Applicable development authority</li>
                <li>Relevant approvals</li>
                <li>Road access</li>
                <li>Registration documents</li>
              </BulletList>

              <p>
                Dholera Times aims to describe locations accurately
                based on the information available to us.
              </p>
            </TermsSection>

            {/* =================================================
                7. PROPERTY DUE DILIGENCE
            ================================================== */}

            <TermsSection
              number={7}
              id="property-due-diligence"
              title="Property Due Diligence"
            >
              <p>
                Before entering into a property transaction, users
                should review relevant documents and conduct
                appropriate due diligence.
              </p>

              <p>
                Depending on the property, this may include
                verification of:
              </p>

              <BulletList>
                <li>Ownership and title</li>
                <li>Chain of title</li>
                <li>Encumbrances</li>
                <li>Survey details</li>
                <li>Land use</li>
                <li>Approved layout</li>
                <li>Applicable permissions</li>
                <li>Registration records</li>
                <li>RERA information, where applicable</li>
                <li>Taxes and statutory charges</li>
                <li>Sale documentation</li>
              </BulletList>

              <p>
                Users may also choose to obtain independent legal, tax
                or property advice before proceeding.
              </p>
            </TermsSection>

            {/* =================================================
                8. PROPERTY PRICES & AVAILABILITY
            ================================================== */}

            <TermsSection
              number={8}
              id="property-prices"
              title="Property Prices & Availability"
            >
              <p>
                Prices, inventory, plot sizes, offers and availability
                displayed or communicated by Dholera Times are
                subject to change.
              </p>

              <p>
                Unless expressly confirmed in a binding written
                agreement:
              </p>

              <BulletList>
                <li>Website prices are indicative</li>
                <li>Availability is not guaranteed</li>
                <li>A property enquiry does not reserve a plot</li>

                <li>
                  Submission of an enquiry does not create a purchase
                  agreement
                </li>

                <li>
                  Verbal discussions do not override signed
                  transaction documents
                </li>
              </BulletList>

              <p>
                The final commercial terms applicable to a property
                transaction will be those recorded in the relevant
                booking, allotment, sale or other transaction
                documents.
              </p>
            </TermsSection>

            {/* =================================================
                9. BOOKING, PAYMENTS & CANCELLATION
            ================================================== */}

            <TermsSection
              number={9}
              id="booking-payments"
              title="Booking, Payments & Cancellation"
            >
              <p>
                Where Dholera Times or an authorised partner accepts
                a property booking or payment, the applicable:
              </p>

              <BulletList>
                <li>Booking amount</li>
                <li>Payment schedule</li>
                <li>Taxes</li>
                <li>Registration charges</li>
                <li>Other statutory charges</li>
                <li>Cancellation terms</li>
                <li>Refund terms</li>
                <li>Payment deadlines</li>
              </BulletList>

              <p>
                will be communicated separately for the relevant
                property or transaction.
              </p>

              <p>
                Users should review the applicable written terms
                carefully before making any payment.
              </p>

              <p
                className="
                  rounded-xl

                  border
                  border-[#EC1C40]/20

                  bg-[#EC1C40]/5

                  px-4
                  py-3

                  font-bold

                  text-black
                "
              >
                Do not make payments to unauthorised individuals or
                accounts.
              </p>

              <p>
                Where payment instructions are provided, users should
                verify the recipient and payment details with an
                authorised Dholera Times representative before
                transferring funds.
              </p>
            </TermsSection>

            {/* =================================================
                10. SITE VISITS
            ================================================== */}

            <TermsSection
              number={10}
              id="site-visits"
              title="Site Visits"
            >
              <p>
                Dholera Times may assist users with arranging site
                visits in the Dholera region.
              </p>

              <p>
                Site visits are intended to help users understand:
              </p>

              <BulletList>
                <li>Property location</li>
                <li>Surrounding development</li>
                <li>Access roads</li>
                <li>Nearby infrastructure</li>
                <li>On-ground conditions</li>
              </BulletList>

              <p>
                Conditions seen during a site visit may change over
                time.
              </p>

              <p>
                A site visit should form part of, rather than replace,
                legal and documentary verification.
              </p>
            </TermsSection>

            {/* =================================================
                11. NRI & OVERSEAS BUYERS
            ================================================== */}

            <TermsSection
              number={11}
              id="nri-buyers"
              title="NRI & Overseas Buyers"
            >
              <p>
                Information provided to NRIs, OCIs and other overseas
                users is general in nature.
              </p>

              <p>
                Property ownership, payments, taxation, repatriation,
                Power of Attorney and other requirements may depend
                on individual circumstances and applicable laws.
              </p>

              <p>
                Overseas buyers should seek appropriate legal,
                banking or tax advice when necessary.
              </p>
            </TermsSection>

            {/* =================================================
                12. ENQUIRIES & COMMUNICATION
            ================================================== */}

            <TermsSection
              number={12}
              id="enquiries-communication"
              title="Enquiries & Communication"
            >
              <p>
                When you submit an enquiry, request a consultation,
                request property information or book a site visit,
                you authorise Dholera Times to respond using the
                contact information you provide.
              </p>

              <p>
                Communication may take place through:
              </p>

              <BulletList>
                <li>Phone</li>
                <li>WhatsApp</li>
                <li>Email</li>
                <li>SMS</li>
                <li>Other channels requested by you</li>
              </BulletList>

              <p>
                Use of personal information is also governed by our
                Privacy Policy.
              </p>
            </TermsSection>

            {/* =================================================
                13. NEWS TIPS, CORRECTIONS & USER SUBMISSIONS
            ================================================== */}

            <TermsSection
              number={13}
              id="news-tips"
              title="News Tips, Corrections & User Submissions"
            >
              <p>
                Users may contact Dholera Times to submit:
              </p>

              <BulletList>
                <li>News tips</li>
                <li>Company announcements</li>
                <li>Project information</li>
                <li>Corrections</li>
                <li>Photographs</li>
                <li>Videos</li>
                <li>Documents</li>
                <li>Business information</li>
              </BulletList>

              <p>
                By submitting material, you confirm that you have the
                right to share it with us.
              </p>

              <p>
                Submission does not guarantee publication.
              </p>

              <p>
                Dholera Times may review, verify, edit or decline
                submitted material according to its editorial
                requirements.
              </p>

              <p>
                If submitted information is confidential, clearly
                notify us before sharing it. Do not send sensitive or
                confidential material unless necessary.
              </p>
            </TermsSection>

            {/* =================================================
                14. IMAGES, MAPS & VISUAL MATERIAL
            ================================================== */}

            <TermsSection
              number={14}
              id="visual-material"
              title="Images, Maps & Visual Material"
            >
              <p>
                Images, maps, layouts, renders, illustrations,
                diagrams and other visual material may be used for
                informational or representational purposes.
              </p>

              <p>
                Where visual material represents a future development
                or proposed design, it should not automatically be
                interpreted as a guarantee of the final completed
                development.
              </p>

              <p>
                Actual development may differ because of approvals,
                design changes, construction decisions or other
                factors.
              </p>

              <p>
                Users should rely on applicable official and
                contractual documents for legally binding
                specifications.
              </p>
            </TermsSection>

            {/* =================================================
                15. THIRD-PARTY WEBSITES & INFORMATION
            ================================================== */}

            <TermsSection
              number={15}
              id="third-party"
              title="Third-Party Websites & Information"
            >
              <p>
                Dholera Times may link to:
              </p>

              <BulletList>
                <li>Government websites</li>
                <li>Official authorities</li>
                <li>Company websites</li>
                <li>Maps</li>
                <li>Social media platforms</li>
                <li>News sources</li>
                <li>Property partners</li>
                <li>Other third-party services</li>
              </BulletList>

              <p>
                These links are provided for convenience or reference.
              </p>

              <p>
                Dholera Times does not control third-party websites
                and is not responsible for their content,
                availability, privacy practices or terms.
              </p>

              <p>
                A link to a third-party website does not automatically
                constitute an endorsement.
              </p>
            </TermsSection>

            {/* =================================================
                16. INTELLECTUAL PROPERTY
            ================================================== */}

            <TermsSection
              number={16}
              id="intellectual-property"
              title="Intellectual Property"
            >
              <p>
                Unless otherwise stated, the website and its original
                content—including:
              </p>

              <BulletList>
                <li>Text</li>
                <li>Articles</li>
                <li>Graphics</li>
                <li>Branding</li>
                <li>Logos</li>
                <li>Photographs</li>
                <li>Videos</li>
                <li>Page design</li>
                <li>Research</li>
                <li>Original reports</li>
              </BulletList>

              <p>
                are owned by or licensed to Dholera Times and are
                protected by applicable intellectual-property laws.
              </p>

              <p>
                You may read and share links to our publicly available
                content for personal and non-commercial purposes.
              </p>

              <p>
                You may not reproduce, republish, commercially
                distribute, scrape or substantially copy our original
                content without permission, except where permitted by
                law.
              </p>
            </TermsSection>

            {/* =================================================
                17. ACCEPTABLE USE
            ================================================== */}

            <TermsSection
              number={17}
              id="acceptable-use"
              title="Acceptable Use"
            >
              <p>
                You must not use the Dholera Times website to:
              </p>

              <BulletList>
                <li>Engage in unlawful activity</li>

                <li>
                  Attempt unauthorised access to website systems
                </li>

                <li>Introduce malware or harmful code</li>
                <li>Interfere with website operation</li>
                <li>Submit fraudulent enquiries</li>
                <li>Impersonate another person</li>
                <li>Misuse personal information</li>

                <li>
                  Copy website content at scale without permission
                </li>

                <li>
                  Use automated systems in a way that unreasonably
                  affects website availability
                </li>
              </BulletList>

              <p>
                We may restrict access where misuse or security
                threats are detected.
              </p>
            </TermsSection>

            {/* =================================================
                18. WEBSITE AVAILABILITY
            ================================================== */}

            <TermsSection
              number={18}
              id="website-availability"
              title="Website Availability"
            >
              <p>
                We aim to keep the website accessible and functional,
                but uninterrupted availability cannot be guaranteed.
              </p>

              <p>
                The website may occasionally be unavailable because
                of:
              </p>

              <BulletList>
                <li>Maintenance</li>
                <li>Technical problems</li>
                <li>Hosting issues</li>
                <li>Security incidents</li>
                <li>Network failures</li>
                <li>Events outside our reasonable control</li>
              </BulletList>

              <p>
                We may change, suspend or discontinue website features
                when necessary.
              </p>
            </TermsSection>

            {/* =================================================
                19. NO GUARANTEE OF OUTCOMES
            ================================================== */}

            <TermsSection
              number={19}
              id="no-guarantee"
              title="No Guarantee of Outcomes"
            >
              <p>
                Dholera Times does not guarantee:
              </p>

              <BulletList>
                <li>Property appreciation</li>
                <li>Investment returns</li>
                <li>Resale timelines</li>
                <li>Rental income</li>
                <li>Infrastructure completion dates</li>
                <li>Government approvals</li>
                <li>Company investments</li>
                <li>Future market demand</li>
                <li>Availability of a particular property</li>
              </BulletList>

              <p>
                Statements concerning future developments are subject
                to uncertainty and should be evaluated accordingly.
              </p>
            </TermsSection>

            {/* =================================================
                20. LIMITATION OF LIABILITY
            ================================================== */}

            <TermsSection
              number={20}
              id="limitation-liability"
              title="Limitation of Liability"
            >
              <p>
                To the extent permitted by applicable law, Dholera
                Times will not be responsible for indirect,
                incidental or consequential losses arising solely
                from reliance on general website content.
              </p>

              <p>
                Nothing in these Terms excludes or limits liability
                where such exclusion or limitation is prohibited by
                applicable law.
              </p>

              <p>
                Users remain responsible for independently evaluating
                significant legal, financial, tax and property
                decisions.
              </p>
            </TermsSection>

            {/* =================================================
                21. PRIVACY
            ================================================== */}

            <TermsSection
              number={21}
              id="privacy"
              title="Privacy"
            >
              <p>
                Use of personal information collected through Dholera
                Times is governed by our{" "}
                <strong className="font-semibold text-black">
                  Privacy Policy
                </strong>
                .
              </p>

              <p>
                Please review the Privacy Policy to understand how we
                collect, use, store and manage personal information.
              </p>
            </TermsSection>

            {/* =================================================
                22. CHANGES TO THESE TERMS
            ================================================== */}

            <TermsSection
              number={22}
              id="changes"
              title="Changes to These Terms"
            >
              <p>
                Dholera Times may update these Terms &amp; Conditions
                when necessary because of:
              </p>

              <BulletList>
                <li>Changes to our services</li>
                <li>Changes to website functionality</li>

                <li>
                  Changes to property or advisory services
                </li>

                <li>Changes in applicable laws</li>
                <li>Changes in business practices</li>
              </BulletList>

              <p>
                The updated version will be published on this page
                with a revised{" "}
                <strong className="font-semibold text-black">
                  Last Updated
                </strong>{" "}
                date.
              </p>

              <p>
                Continued use of the website after an update will be
                subject to the revised terms.
              </p>
            </TermsSection>

            {/* =================================================
                23. GOVERNING LAW & JURISDICTION
            ================================================== */}

            <TermsSection
              number={23}
              id="governing-law"
              title="Governing Law & Jurisdiction"
            >
              <p>
                These Terms &amp; Conditions are governed by the laws
                of{" "}
                <strong className="font-semibold text-black">
                  India
                </strong>
                , subject to applicable consumer and other statutory
                rights.
              </p>

              <p>
                Any dispute relating to the use of this website will
                be handled in accordance with applicable law and the
                jurisdiction specified in the relevant contractual
                arrangement, where one exists.
              </p>
            </TermsSection>

            {/* =================================================
                24. CONTACT
            ================================================== */}

            <TermsSection
              number={24}
              id="contact"
              title="Contact Dholera Times"
            >
              <p>
                For questions about these Terms &amp; Conditions,
                contact:
              </p>

              <p className="font-semibold text-black">
                Dholera Times
              </p>

              <div
                className="
                  grid
                  grid-cols-1

                  gap-3

                  sm:grid-cols-2
                "
              >
                {/* EMAIL */}

                <a
                  href="mailto:info@dholeratimes.com"
                  className="
                    flex
                    items-start

                    gap-3

                    rounded-xl

                    border
                    border-black/10

                    bg-black/[0.02]

                    p-4

                    transition-[background-color,border-color]
                    duration-200

                    hover:border-[#EC1C40]/25
                    hover:bg-[#EC1C40]/5
                  "
                >
                  <span
                    className="
                      flex

                      h-9
                      w-9

                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      bg-[#EC1C40]/10

                      text-[#EC1C40]
                    "
                  >
                    <Mail
                      size={17}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="min-w-0">
                    <span
                      className="
                        block

                        text-[12px]
                        font-semibold

                        text-black/50
                      "
                    >
                      Email
                    </span>

                    <span
                      className="
                        mt-1

                        block

                        break-all

                        text-[14px]
                        font-semibold

                        text-black

                        sm:text-[15px]
                      "
                    >
                      info@dholeratimes.com
                    </span>
                  </span>
                </a>

                {/* PHONE */}

                <a
                  href="tel:+919958993549"
                  className="
                    flex
                    items-start

                    gap-3

                    rounded-xl

                    border
                    border-black/10

                    bg-black/[0.02]

                    p-4

                    transition-[background-color,border-color]
                    duration-200

                    hover:border-[#EC1C40]/25
                    hover:bg-[#EC1C40]/5
                  "
                >
                  <span
                    className="
                      flex

                      h-9
                      w-9

                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      bg-[#EC1C40]/10

                      text-[#EC1C40]
                    "
                  >
                    <Phone
                      size={17}
                      aria-hidden="true"
                    />
                  </span>

                  <span>
                    <span
                      className="
                        block

                        text-[12px]
                        font-semibold

                        text-black/50
                      "
                    >
                      Phone
                    </span>

                    <span
                      className="
                        mt-1

                        block

                        text-[14px]
                        font-semibold

                        text-black

                        sm:text-[15px]
                      "
                    >
                      +91 99589 93549
                    </span>
                  </span>
                </a>

                {/* HEAD OFFICE */}

                <div
                  className="
                    flex
                    items-start

                    gap-3

                    rounded-xl

                    border
                    border-black/10

                    bg-black/[0.02]

                    p-4

                    sm:col-span-2
                  "
                >
                  <span
                    className="
                      flex

                      h-9
                      w-9

                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      bg-[#EC1C40]/10

                      text-[#EC1C40]
                    "
                  >
                    <MapPin
                      size={17}
                      aria-hidden="true"
                    />
                  </span>

                  <span>
                    <span
                      className="
                        block

                        text-[12px]
                        font-semibold

                        text-black/50
                      "
                    >
                      Head Office:
                    </span>

                    <span
                      className="
                        mt-1

                        block

                        text-[14px]
                        font-medium
                        leading-6

                        text-black/70

                        sm:text-[15px]
                      "
                    >
                      CGJ - 194, DLF Capital Greens
                      <br />

                      Shivaji Marg, Karampura Industrial Area
                      <br />

                      Karam Pura, Delhi - 110015
                      <br />

                      India
                    </span>
                  </span>
                </div>
              </div>
            </TermsSection>

            {/* =================================================
                FINAL PROVIDED CONTENT

                Phone:
                Plain text.

                Tablet/Desktop:
                Black card.
            ================================================== */}

            <section
              className="
                mt-8

                border-t
                border-black/10

                pt-7

                sm:mt-9

                sm:rounded-2xl
                sm:border-0
                sm:bg-black
                sm:p-6

                md:p-7
              "
            >
              <h2
                className="
                  text-[21px]
                  font-bold
                  leading-[1.3]

                  tracking-[-0.02em]

                  text-black

                  sm:text-[23px]
                  sm:text-white
                "
              >
                Dholera Matlab{" "}
                <span className="text-[#EC1C40]">
                  Dholera Times
                </span>
              </h2>

              <div
                className="
                  mt-4

                  space-y-4

                  text-[15px]
                  leading-7

                  text-black/65

                  sm:text-white/70
                "
              >
                <p>
                  Dholera Times provides{" "}
                  <strong
                    className="
                      font-semibold
                      text-black

                      sm:text-white
                    "
                  >
                    Dholera Smart City news, investment insights,
                    property information and advisory support
                  </strong>{" "}
                  to help readers research Dholera with greater
                  clarity.
                </p>

                <p>
                  We encourage every investor and property buyer to{" "}
                  <strong
                    className="
                      font-semibold
                      text-black

                      sm:text-white
                    "
                  >
                    research carefully, verify important information
                    and make decisions based on their individual
                    requirements.
                  </strong>
                </p>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}