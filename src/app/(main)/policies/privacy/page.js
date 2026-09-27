import Image from "next/image";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import hero from "@/assets/hero5.webp";

/* ============================================================
   SEO METADATA
============================================================ */

export const metadata = {
  title: "Privacy Policy | Dholera Times",

  description:
    "Read the Dholera Times Privacy Policy to understand how we collect, use, protect and manage personal information submitted through our website and services.",

  alternates: {
    canonical:
      "https://www.dholeratimes.com/policies/privacypolicy",
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

  openGraph: {
    title: "Privacy Policy | Dholera Times",

    description:
      "Read the Dholera Times Privacy Policy to understand how we collect, use, protect and manage personal information submitted through our website and services.",

    url:
      "https://www.dholeratimes.com/policies/privacypolicy",

    siteName: "Dholera Times",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Privacy Policy | Dholera Times",

    description:
      "Read the Dholera Times Privacy Policy to understand how we collect, use, protect and manage personal information submitted through our website and services.",
  },
};

/* ============================================================
   TABLE OF CONTENTS
============================================================ */

const tableOfContents = [
  {
    id: "information-we-collect",
    label: "Information We May Collect",
  },
  {
    id: "how-we-use-information",
    label: "How We Use Your Information",
  },
  {
    id: "investment-property-enquiries",
    label: "Investment & Property Enquiries",
  },
  {
    id: "news-editorial-communication",
    label: "News, Updates & Editorial Communication",
  },
  {
    id: "calls-whatsapp",
    label: "Calls, WhatsApp & Other Communications",
  },
  {
    id: "cookies-analytics",
    label: "Cookies & Analytics",
  },
  {
    id: "share-information",
    label: "How We May Share Information",
  },
  {
    id: "third-party",
    label: "Third-Party Websites & Services",
  },
  {
    id: "data-security",
    label: "Data Security",
  },
  {
    id: "retention",
    label: "How Long We Keep Information",
  },
  {
    id: "privacy-rights",
    label: "Your Privacy Choices & Rights",
  },
  {
    id: "children",
    label: "Children’s Privacy",
  },
  {
    id: "international-users",
    label: "International Users",
  },
  {
    id: "investment-financial",
    label: "Investment & Financial Information",
  },
  {
    id: "changes",
    label: "Changes to This Privacy Policy",
  },
  {
    id: "contact",
    label: "Contact Us About Privacy",
  },
];

/* ============================================================
   POLICY SECTION
============================================================ */

function PolicySection({
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
        {/* ===================================================
            NUMBER

            Hidden on phone.
            Visible from sm breakpoint.
        ==================================================== */}

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

        {/* ===================================================
            SECTION CONTENT
        ==================================================== */}

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
   PRIVACY POLICY PAGE
============================================================ */

export default function PrivacyPolicyPage() {
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
          HERO IMAGE
      ====================================================== */}

      <section
        aria-label="Dholera Times Privacy Policy"
        className="
          relative

          w-full

          overflow-hidden

          border-b
          border-black/10

          bg-black
        "
      >
        <div
          className="
            relative

            aspect-[16/9]

            w-full

            min-[480px]:aspect-[16/8]

            sm:aspect-[16/7]

            md:aspect-[16/6]

            lg:aspect-[16/5]

            xl:aspect-[16/4.5]
          "
        >
          <Image
            src={hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-black/[0.06]
            "
          />
        </div>
      </section>

      {/* =====================================================
          PRIVACY POLICY INTRO
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
          sm:py-11

          md:px-8
          md:py-12

          lg:px-10
          lg:py-14
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
              Privacy{" "}
              <span className="text-[#EC1C40]">
                Policy
              </span>
            </h1>

            <p
              className="
                mt-4

                text-[13px]
                font-semibold
                leading-5

                text-black/60

                sm:mt-5
                sm:text-[14px]
              "
            >
              Last Updated: 23 September 2026
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
                Dholera Times respects your privacy and is committed
                to handling your personal information responsibly and
                transparently.
              </p>

              <p>
                This Privacy Policy explains how Dholera Times
                (“Dholera Times,” “we,” “our,” or “us”) may collect,
                use, store and share information when you visit{" "}
                <a
                  href="http://www.dholeratimes.com"
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
                , submit an enquiry, request investment consultation,
                explore property opportunities, book a site visit,
                subscribe to updates or communicate with our team.
              </p>

              <p>
                By using our website or voluntarily providing your
                information, you acknowledge the practices described
                in this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN POLICY
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
              DESKTOP TABLE OF CONTENTS
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
              aria-label="Privacy Policy sections"
              className="
                max-h-[calc(100vh-120px)]

                overflow-y-auto

                rounded-2xl

                border
                border-black/10

                bg-black/[0.02]

                p-2
              "
            >
              {tableOfContents.map(
                (item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="
                      group

                      flex
                      items-start

                      gap-2.5

                      rounded-lg

                      px-3
                      py-2.5

                      text-[13px]
                      font-medium
                      leading-5

                      text-black/60

                      transition-[background-color,color]
                      duration-200

                      hover:bg-[#EC1C40]/5
                      hover:text-black

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#EC1C40]
                    "
                  >
                    <span
                      className="
                        mt-[1px]

                        min-w-[22px]

                        text-[11px]
                        font-bold

                        text-[#EC1C40]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      {item.label}
                    </span>
                  </a>
                ),
              )}
            </nav>
          </aside>

          {/* =================================================
              PRIVACY POLICY CONTENT

              Phone:
              Plain document / no card.

              Tablet + desktop:
              Rounded document container.
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
                1. INFORMATION WE MAY COLLECT
            ================================================== */}

            <PolicySection
              number={1}
              id="information-we-collect"
              title="Information We May Collect"
            >
              <p>
                The information we collect depends on how you interact
                with Dholera Times.
              </p>

              <h3
                className="
                  text-[17px]
                  font-bold
                  leading-6

                  text-black
                "
              >
                Information You Provide
              </h3>

              <p>
                You may provide information such as:
              </p>

              <BulletList>
                <li>Name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>City or country</li>
                <li>Enquiry or message</li>
                <li>Property requirements</li>
                <li>Preferred plot size or budget</li>
                <li>Investment preferences</li>
                <li>Site visit requirements</li>

                <li>
                  NRI or overseas buyer information, where relevant
                </li>

                <li>
                  Information shared during calls, WhatsApp
                  conversations or consultations
                </li>
              </BulletList>

              <p>
                You are not required to provide personal information
                simply to read news, articles or general information
                on our website.
              </p>

              <h3
                className="
                  pt-2

                  text-[17px]
                  font-bold
                  leading-6

                  text-black
                "
              >
                Information Collected Automatically
              </h3>

              <p>
                When you visit our website, certain technical
                information may be collected automatically, including:
              </p>

              <BulletList>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time spent on the website</li>
                <li>Referring website or source</li>

                <li>
                  Approximate location based on technical information
                </li>

                <li>Cookie and analytics data</li>
              </BulletList>

              <p>
                This information helps us understand how visitors use
                the website and improve its performance.
              </p>
            </PolicySection>

            {/* =================================================
                2. HOW WE USE YOUR INFORMATION
            ================================================== */}

            <PolicySection
              number={2}
              id="how-we-use-information"
              title="How We Use Your Information"
            >
              <p>
                We may use personal information to:
              </p>

              <BulletList>
                <li>
                  Respond to your enquiries
                </li>

                <li>
                  Provide Dholera investment consultation or property
                  advisory support
                </li>

                <li>
                  Share residential plot details, pricing and
                  availability requested by you
                </li>

                <li>
                  Arrange Dholera site visits
                </li>

                <li>
                  Provide information about Dholera Smart City and
                  Dholera SIR
                </li>

                <li>
                  Assist with property comparison, documentation and
                  buying-related queries
                </li>

                <li>
                  Send requested news, updates or investment
                  information
                </li>

                <li>
                  Communicate through phone, email, SMS or WhatsApp
                  where appropriate
                </li>

                <li>
                  Manage customer and enquiry records
                </li>

                <li>
                  Improve our website, content and services
                </li>

                <li>
                  Understand website usage and visitor interests
                </li>

                <li>
                  Detect misuse, fraud or security threats
                </li>

                <li>
                  Meet applicable legal or regulatory requirements
                </li>
              </BulletList>

              <p>
                We aim to collect and use only the information
                reasonably required for these purposes.
              </p>
            </PolicySection>

            {/* =================================================
                3. INVESTMENT & PROPERTY ENQUIRIES
            ================================================== */}

            <PolicySection
              number={3}
              id="investment-property-enquiries"
              title="Investment & Property Enquiries"
            >
              <p>
                When you submit an enquiry related to Dholera
                investment, residential plots, property consultation
                or site visits, our team may contact you using the
                details you provide.
              </p>

              <p>
                This may include communication regarding:
              </p>

              <BulletList>
                <li>Available residential plots</li>
                <li>Current pricing</li>
                <li>Locations</li>
                <li>Property documentation</li>
                <li>Site visits</li>
                <li>Investment insights</li>
                <li>Property comparison</li>
                <li>Registration or purchase assistance</li>
                <li>Related Dholera property opportunities</li>
              </BulletList>

              <p>
                Submitting an enquiry does not require you to purchase
                any property or service.
              </p>
            </PolicySection>

            {/* =================================================
                4. NEWS, UPDATES & EDITORIAL COMMUNICATION
            ================================================== */}

            <PolicySection
              number={4}
              id="news-editorial-communication"
              title="News, Updates & Editorial Communication"
            >
              <p>
                Dholera Times also operates as a Dholera-focused
                information platform.
              </p>

              <p>
                If you contact us regarding:
              </p>

              <BulletList>
                <li>News tips</li>
                <li>Company announcements</li>
                <li>Development updates</li>
                <li>Corrections</li>
                <li>Media enquiries</li>
                <li>Partnerships</li>
                <li>Business information</li>
              </BulletList>

              <p>
                We may use the information provided to review and
                respond to your communication.
              </p>

              <p>
                Information submitted as a news tip or source material
                will be handled according to its nature. Please do not
                submit confidential or sensitive information unless
                necessary and appropriate.
              </p>
            </PolicySection>

            {/* =================================================
                5. CALLS, WHATSAPP & OTHER COMMUNICATIONS
            ================================================== */}

            <PolicySection
              number={5}
              id="calls-whatsapp"
              title="Calls, WhatsApp & Other Communications"
            >
              <p>
                If you contact us or request a callback, we may
                communicate with you by:
              </p>

              <BulletList>
                <li>Phone</li>
                <li>WhatsApp</li>
                <li>Email</li>
                <li>SMS</li>

                <li>
                  Other communication channels you choose to use
                </li>
              </BulletList>

              <p>
                Where required, marketing or promotional communication
                will be sent in accordance with applicable consent and
                communication requirements.
              </p>

              <p>
                You can ask us to stop promotional communication at
                any time by contacting us or using an available
                unsubscribe or opt-out option.
              </p>

              <p>
                Operational communication relating to an enquiry or
                service already requested may still be sent where
                necessary.
              </p>
            </PolicySection>

            {/* =================================================
                6. COOKIES & ANALYTICS
            ================================================== */}

            <PolicySection
              number={6}
              id="cookies-analytics"
              title="Cookies & Analytics"
            >
              <p>
                Dholera Times may use cookies and similar technologies
                to operate and improve the website.
              </p>

              <p>
                Cookies may help us:
              </p>

              <BulletList>
                <li>Keep the website functioning correctly</li>
                <li>Remember visitor preferences</li>
                <li>Understand website traffic</li>
                <li>Measure page performance</li>

                <li>
                  Understand which content visitors find useful
                </li>

                <li>
                  Measure marketing campaigns
                </li>

                <li>
                  Improve user experience
                </li>
              </BulletList>

              <p>
                We may use third-party analytics or advertising tools
                where appropriate.
              </p>

              <p>
                Where required by applicable law, visitors will be
                given appropriate choices regarding non-essential
                cookies.
              </p>

              <p>
                You can also manage cookies through your browser
                settings. Disabling certain cookies may affect some
                website features.
              </p>
            </PolicySection>

            {/* =================================================
                7. HOW WE MAY SHARE INFORMATION
            ================================================== */}

            <PolicySection
              number={7}
              id="share-information"
              title="How We May Share Information"
            >
              <p>
                We do not disclose personal information unnecessarily.
              </p>

              <p>
                We may share information with third parties where
                reasonably required to operate our services,
                including:
              </p>

              <h3 className="text-[17px] font-bold text-black">
                Service Providers
              </h3>

              <p>
                Companies that help us with services such as:
              </p>

              <BulletList>
                <li>Website hosting</li>
                <li>Customer relationship management</li>
                <li>Email communication</li>
                <li>Analytics</li>
                <li>Cloud storage</li>
                <li>IT and security</li>
                <li>Messaging or communication tools</li>
              </BulletList>

              <p>
                These providers may process information only as
                required to provide their services.
              </p>

              <h3
                className="
                  pt-2

                  text-[17px]
                  font-bold

                  text-black
                "
              >
                Property or Service Partners
              </h3>

              <p>
                If you enquire about a specific property, service or
                opportunity, relevant information may be shared with
                an authorised property, project or service partner
                where necessary to fulfil your request or where you
                have agreed to such sharing.
              </p>

              <h3
                className="
                  pt-2

                  text-[17px]
                  font-bold

                  text-black
                "
              >
                Professional Advisers
              </h3>

              <p>
                Information may be shared with legal, accounting or
                other professional advisers where reasonably
                necessary.
              </p>

              <h3
                className="
                  pt-2

                  text-[17px]
                  font-bold

                  text-black
                "
              >
                Legal Requirements
              </h3>

              <p>
                We may disclose information where required by law,
                court order, regulatory authority or a lawful
                government request.
              </p>

              <h3
                className="
                  pt-2

                  text-[17px]
                  font-bold

                  text-black
                "
              >
                Business Changes
              </h3>

              <p>
                If Dholera Times undergoes a merger, restructuring,
                acquisition, sale or transfer of business assets,
                information may be transferred as part of that
                transaction subject to applicable law.
              </p>
            </PolicySection>

            {/* =================================================
                8. THIRD-PARTY WEBSITES & SERVICES
            ================================================== */}

            <PolicySection
              number={8}
              id="third-party"
              title="Third-Party Websites & Services"
            >
              <p>
                Our website may contain links to:
              </p>

              <BulletList>
                <li>Government websites</li>
                <li>Official project authorities</li>
                <li>Company websites</li>
                <li>Social media platforms</li>
                <li>Maps</li>
                <li>News sources</li>
                <li>Property or business partners</li>
                <li>Other third-party websites</li>
              </BulletList>

              <p>
                Dholera Times does not control the privacy practices
                of third-party websites.
              </p>

              <p>
                When you leave our website, the privacy policy and
                terms of the third-party service will apply.
              </p>

              <p>
                We recommend reviewing those policies before providing
                personal information.
              </p>
            </PolicySection>

            {/* =================================================
                9. DATA SECURITY
            ================================================== */}

            <PolicySection
              number={9}
              id="data-security"
              title="Data Security"
            >
              <p>
                We take reasonable technical and organisational
                measures to protect personal information against:
              </p>

              <BulletList>
                <li>Unauthorised access</li>
                <li>Loss</li>
                <li>Misuse</li>
                <li>Alteration</li>
                <li>Disclosure</li>
                <li>Destruction</li>
              </BulletList>

              <p>
                However, no website, internet transmission or
                electronic storage system can be guaranteed to be
                completely secure.
              </p>

              <p>
                Users should therefore avoid sending unnecessary
                sensitive information through ordinary website forms,
                email or messaging platforms.
              </p>
            </PolicySection>

            {/* =================================================
                10. HOW LONG WE KEEP INFORMATION
            ================================================== */}

            <PolicySection
              number={10}
              id="retention"
              title="How Long We Keep Information"
            >
              <p>
                We retain personal information only for as long as
                reasonably necessary for the purpose for which it was
                collected, including:
              </p>

              <BulletList>
                <li>Responding to enquiries</li>
                <li>Providing requested services</li>
                <li>Maintaining necessary business records</li>
                <li>Handling ongoing customer relationships</li>

                <li>
                  Meeting legal, regulatory or accounting requirements
                </li>

                <li>Resolving disputes</li>
                <li>Protecting against fraud or misuse</li>
              </BulletList>

              <p>
                When information is no longer reasonably required, we
                may delete, anonymise or securely dispose of it,
                subject to applicable legal requirements.
              </p>
            </PolicySection>

            {/* =================================================
                11. YOUR PRIVACY CHOICES & RIGHTS
            ================================================== */}

            <PolicySection
              number={11}
              id="privacy-rights"
              title="Your Privacy Choices & Rights"
            >
              <p>
                Depending on applicable law and your circumstances,
                you may have the right to:
              </p>

              <BulletList>
                <li>
                  Ask what personal information we hold about you
                </li>

                <li>
                  Request correction of inaccurate information
                </li>

                <li>
                  Request updating of incomplete information
                </li>

                <li>
                  Request deletion or erasure where applicable
                </li>

                <li>
                  Withdraw consent where processing is based on
                  consent
                </li>

                <li>
                  Opt out of promotional communication
                </li>

                <li>
                  Raise a complaint or grievance regarding how your
                  information is handled
                </li>
              </BulletList>

              <p>
                Withdrawal of consent does not affect processing that
                was lawful before the withdrawal or information we
                are required to retain under applicable law.
              </p>

              <p>
                To make a privacy-related request, contact us using
                the details below.
              </p>
            </PolicySection>

            {/* =================================================
                12. CHILDREN'S PRIVACY
            ================================================== */}

            <PolicySection
              number={12}
              id="children"
              title="Children’s Privacy"
            >
              <p>
                Our property consultation, investment advisory and
                enquiry services are intended for adults.
              </p>

              <p>
                We do not knowingly solicit personal information from
                children for property or investment services.
              </p>

              <p>
                If we learn that personal information relating to a
                child has been collected inappropriately, we will take
                reasonable steps to address it in accordance with
                applicable law.
              </p>
            </PolicySection>

            {/* =================================================
                13. INTERNATIONAL USERS
            ================================================== */}

            <PolicySection
              number={13}
              id="international-users"
              title="International Users"
            >
              <p>
                Dholera Times may be accessed by NRIs and other users
                located outside India.
              </p>

              <p>
                Information submitted through our website may be
                processed or stored in India or through service
                providers operating in other jurisdictions.
              </p>

              <p>
                Where applicable, we will handle cross-border
                processing and transfers in accordance with relevant
                legal requirements.
              </p>
            </PolicySection>

            {/* =================================================
                14. INVESTMENT & FINANCIAL INFORMATION
            ================================================== */}

            <PolicySection
              number={14}
              id="investment-financial"
              title="Investment & Financial Information"
            >
              <p>
                Content published by Dholera Times regarding Dholera
                investment, property prices, infrastructure, market
                trends and investment opportunities is provided for
                general information and research purposes.
              </p>

              <p>
                Personal information submitted for investment
                consultation may be used to understand your
                requirements and provide relevant property or market
                information.
              </p>

              <p>
                Dholera Times does not guarantee future property
                appreciation, investment returns or market
                performance.
              </p>

              <p>
                Users should independently evaluate legal, financial,
                tax and investment considerations before making a
                transaction.
              </p>
            </PolicySection>

            {/* =================================================
                15. CHANGES
            ================================================== */}

            <PolicySection
              number={15}
              id="changes"
              title="Changes to This Privacy Policy"
            >
              <p>
                We may update this Privacy Policy from time to time to
                reflect:
              </p>

              <BulletList>
                <li>Changes to our services</li>
                <li>New website features</li>
                <li>Changes in technology</li>

                <li>
                  Changes in legal or regulatory requirements
                </li>

                <li>
                  Changes in our information-handling practices
                </li>
              </BulletList>

              <p>
                When material changes are made, the “Last Updated”
                date at the top of this page will be revised.
              </p>

              <p>
                We encourage users to review this page periodically.
              </p>
            </PolicySection>

            {/* =================================================
                16. CONTACT
            ================================================== */}

            <PolicySection
              number={16}
              id="contact"
              title="Contact Us About Privacy"
            >
              <p>
                If you have a question, request or complaint regarding
                this Privacy Policy or your personal information,
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
                  href="mailto:info@dholeratimes.com?subject=Privacy%20Request"
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

                {/* ADDRESS */}

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
                      Head Office
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
                      CGJ - 194, DLF Capital Greens Shivaji
                      Marg, Karampura Industrial Area Karam
                      Pura, Delhi - 110015 India
                    </span>
                  </span>
                </div>
              </div>

              <p>
                Please include{" "}
                <strong className="font-semibold text-black">
                  “Privacy Request”
                </strong>{" "}
                in the subject line of privacy-related emails so our
                team can identify your request appropriately.
              </p>
            </PolicySection>

            {/* =================================================
                CLOSING
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
                Your Privacy{" "}
                <span className="text-[#EC1C40]">
                  Matters to Us
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
                  Dholera Times aims to provide Dholera Smart City
                  news, investment insights, property information and
                  advisory services while respecting the privacy of
                  the people who use our platform.
                </p>

                <p
                  className="
                    font-semibold

                    text-black

                    sm:text-white
                  "
                >
                  Dholera Matlab Dholera Times.
                </p>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}