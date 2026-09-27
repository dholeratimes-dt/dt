import {
  Copyright,
  ExternalLink,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

/* ============================================================
   SEO METADATA
============================================================ */

export const metadata = {
  title: "Copyright Policy | Dholera Times",

  description:
    "Read the Dholera Times Copyright Policy covering articles, news, images, videos, graphics, research, brand content and permitted use of website material.",

  alternates: {
    canonical: "/copyright",
  },
};

/* ============================================================
   TABLE OF CONTENTS
============================================================ */

const tableOfContents = [
  {
    id: "protected-content",
    label: "Content Protected by Copyright",
  },
  {
    id: "personal-use",
    label: "Personal & Non-Commercial Use",
  },
  {
    id: "not-permitted",
    label: "What You May Not Do",
  },
  {
    id: "republishing",
    label: "Republishing Content",
  },
  {
    id: "photographs",
    label: "Photographs & On-Ground Content",
  },
  {
    id: "third-party",
    label: "Government & Third-Party Material",
  },
  {
    id: "user-content",
    label: "User-Submitted Content",
  },
  {
    id: "brand-logo",
    label: "Dholera Times Brand & Logo",
  },
  {
    id: "linking",
    label: "Linking to Dholera Times",
  },
  {
    id: "scraping",
    label: "Automated Scraping",
  },
  {
    id: "infringement",
    label: "Copyright Infringement",
  },
  {
    id: "unauthorised-use",
    label: "Reporting Unauthorised Use",
  },
  {
    id: "no-transfer",
    label: "No Transfer of Rights",
  },
  {
    id: "changes",
    label: "Changes to This Policy",
  },
  {
    id: "contact",
    label: "Contact Dholera Times",
  },
];

/* ============================================================
   REUSABLE COMPONENTS
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
        scroll-mt-28

        border-b
        border-black/10

        py-7

        first:pt-0

        last:border-b-0
        last:pb-0

        sm:py-8

        lg:py-9
      "
    >
      <div
        className="
          flex
          items-start

          gap-4

          sm:gap-5
        "
      >
        <span
          aria-hidden="true"
          className="
            flex

            h-8
            min-w-8

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[#EC1C40]/10

            px-2

            text-[12px]
            font-bold
            leading-none

            text-[#EC1C40]

            sm:h-9
            sm:min-w-9
            sm:text-[13px]
          "
        >
          {String(number).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h2
            className="
              text-[20px]
              font-bold
              leading-[1.3]

              tracking-[-0.02em]

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

              text-black/70

              sm:text-[16px]
            "
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function BulletList({ children }) {
  return (
    <ul
      className="
        space-y-2.5

        pl-5

        marker:text-[#EC1C40]

        list-disc
      "
    >
      {children}
    </ul>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function CopyrightPolicyPage() {
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
          HERO
      ====================================================== */}

      <section
        className="
          border-b
          border-black/10

          bg-white

          px-4
          py-10

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
          <div
            className="
              max-w-4xl
            "
          >
            {/* EYEBROW */}

            <div
              className="
                mb-4

                flex
                items-center

                gap-2.5
              "
            >
              <span
                className="
                  flex

                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-lg

                  bg-[#EC1C40]/10

                  text-[#EC1C40]
                "
              >
                <Copyright
                  size={19}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </span>

              <p
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  leading-5

                  tracking-[0.14em]

                  text-[#EC1C40]
                "
              >
                Legal Information
              </p>
            </div>

            {/* TITLE */}

            <h1
              className="
                text-[34px]
                font-bold
                leading-[1.1]

                tracking-[-0.035em]

                text-black

                sm:text-[40px]

                md:text-[46px]

                lg:text-[52px]
              "
            >
              Copyright{" "}
              <span className="text-[#EC1C40]">
                Policy
              </span>
            </h1>

            {/* DATE */}

            <div
              className="
                mt-5

                inline-flex
                items-center

                rounded-full

                border
                border-black/10

                bg-black/[0.025]

                px-3.5
                py-1.5

                text-[13px]
                font-semibold
                leading-5

                text-black/65
              "
            >
              Last Updated: 24 September 2026
            </div>

            {/* INTRO */}

            <div
              className="
                mt-6

                max-w-4xl

                space-y-4

                text-[15px]
                leading-7

                text-black/70

                sm:text-[16px]
              "
            >
              <p>
                The content published on{" "}
                <strong className="font-semibold text-black">
                  Dholera Times
                </strong>{" "}
                is created to inform readers about Dholera Smart City,
                Dholera SIR, infrastructure, industries, investment
                developments and property opportunities.
              </p>

              <p>
                Unless otherwise stated, original content published on{" "}
                <a
                  href="https://www.dholeratimes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center

                    gap-1

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

                  <ExternalLink
                    size={13}
                    aria-hidden="true"
                  />
                </a>{" "}
                is owned by, licensed to, or used with permission by
                Dholera Times and is protected by applicable copyright
                and intellectual-property laws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN DOCUMENT
      ====================================================== */}

      <section
        className="
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
              LEFT SIDEBAR
          ================================================== */}

          <aside
            className="
              min-w-0

              lg:sticky
              lg:top-24
            "
          >
            <div
              className="
                overflow-hidden

                rounded-2xl

                border
                border-black/10

                bg-black/[0.02]
              "
            >
              <div
                className="
                  border-b
                  border-black/10

                  px-5
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center

                    gap-2.5
                  "
                >
                  <FileCheck2
                    size={18}
                    strokeWidth={1.9}
                    aria-hidden="true"
                    className="text-[#EC1C40]"
                  />

                  <h2
                    className="
                      text-[15px]
                      font-bold

                      text-black
                    "
                  >
                    Contents
                  </h2>
                </div>
              </div>

              <nav
                aria-label="Copyright policy sections"
                className="
                  max-h-[62vh]

                  overflow-y-auto

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
            </div>
          </aside>

          {/* =================================================
              POLICY CONTENT
          ================================================== */}

          <article
            className="
              min-w-0

              rounded-2xl

              border
              border-black/10

              bg-white

              p-5

              shadow-[0_12px_38px_-28px_rgba(0,0,0,0.20)]

              min-[414px]:p-6

              sm:p-7

              md:p-8

              lg:p-9

              xl:p-10
            "
          >
            {/* =================================================
                1
            ================================================== */}

            <PolicySection
              number={1}
              id="protected-content"
              title="Content Protected by Copyright"
            >
              <p>
                Copyright-protected material on Dholera Times may
                include:
              </p>

              <BulletList>
                <li>News articles</li>
                <li>Original reports</li>
                <li>Investment insights</li>
                <li>Research and analysis</li>
                <li>Website copy</li>
                <li>Photographs</li>
                <li>On-ground images</li>
                <li>Videos</li>
                <li>Graphics and infographics</li>
                <li>Charts</li>
                <li>Maps created by Dholera Times</li>
                <li>Project comparisons</li>
                <li>Property guides</li>
                <li>Page layouts and design elements</li>
                <li>Logos, branding and original visual assets</li>
              </BulletList>

              <p className="font-medium text-black">
                All rights are reserved unless specifically stated
                otherwise.
              </p>
            </PolicySection>

            {/* =================================================
                2
            ================================================== */}

            <PolicySection
              number={2}
              id="personal-use"
              title="Personal & Non-Commercial Use"
            >
              <p>
                You may access and read Dholera Times content for{" "}
                <strong className="font-semibold text-black">
                  personal, informational and non-commercial use
                </strong>
                .
              </p>

              <p>
                You may also share links to our publicly available
                articles through:
              </p>

              <BulletList>
                <li>Social media</li>
                <li>Email</li>
                <li>Messaging platforms</li>
                <li>Websites</li>
                <li>Online discussions</li>
              </BulletList>

              <p>
                When referring to Dholera Times content, please
                provide clear attribution and a link to the original
                page.
              </p>
            </PolicySection>

            {/* =================================================
                3
            ================================================== */}

            <PolicySection
              number={3}
              id="not-permitted"
              title="What You May Not Do Without Permission"
            >
              <p>
                Unless permitted by applicable law or authorised by
                Dholera Times in writing, you may not:
              </p>

              <BulletList>
                <li>Republish complete Dholera Times articles</li>
                <li>Copy substantial portions of our content</li>
                <li>Reproduce our photographs or videos</li>
                <li>
                  Remove watermarks, credits or copyright notices
                </li>
                <li>Reproduce graphics or infographics</li>
                <li>Sell or commercially distribute our content</li>
                <li>Present Dholera Times content as your own</li>
                <li>
                  Copy our research into another publication without
                  attribution
                </li>
                <li>
                  Systematically download or scrape website content
                </li>
                <li>
                  Create a competing content database using our
                  material
                </li>
                <li>Modify our content in a misleading way</li>
                <li>Use our logo or branding without permission</li>
              </BulletList>

              <p>
                Brief quotations may be used where permitted by law,
                provided appropriate attribution is given and the use
                does not misrepresent the original content.
              </p>
            </PolicySection>

            {/* =================================================
                4
            ================================================== */}

            <PolicySection
              number={4}
              id="republishing"
              title="Republishing Dholera Times Content"
            >
              <p>
                Publishers, media organisations, businesses or other
                websites interested in republishing Dholera Times
                content should obtain permission before doing so.
              </p>

              <p>
                Permission requests should include:
              </p>

              <BulletList>
                <li>Content or article URL</li>
                <li>Material you want to use</li>
                <li>Where it will be published</li>
                <li>Intended purpose</li>
                <li>Commercial or non-commercial use</li>
              </BulletList>

              <div
                className="
                  rounded-xl

                  border
                  border-[#EC1C40]/20

                  bg-[#EC1C40]/5

                  p-4

                  sm:p-5
                "
              >
                <p className="font-semibold text-black">
                  Permission requests
                </p>

                <a
                  href="mailto:info@dholeratimes.com?subject=Content%20Permission%20Request"
                  className="
                    mt-2

                    inline-flex
                    items-center

                    gap-2

                    font-semibold

                    text-[#EC1C40]

                    hover:underline
                    hover:underline-offset-4
                  "
                >
                  <Mail
                    size={17}
                    aria-hidden="true"
                  />

                  info@dholeratimes.com
                </a>

                <p className="mt-2 text-[14px] text-black/60">
                  Please use{" "}
                  <strong className="font-semibold text-black">
                    “Content Permission Request”
                  </strong>{" "}
                  as the email subject.
                </p>
              </div>
            </PolicySection>

            {/* =================================================
                5
            ================================================== */}

            <PolicySection
              number={5}
              id="photographs"
              title="Photographs & On-Ground Content"
            >
              <p>
                Dholera Times may publish original photographs,
                videos and on-ground development updates captured by
                our team.
              </p>

              <p>
                Unless otherwise credited, such original material
                should not be downloaded, republished, edited,
                commercially used or redistributed without
                permission.
              </p>

              <p>
                Where a photograph or visual comes from another
                organisation, company, authority or third party,
                ownership remains with the respective copyright
                holder.
              </p>
            </PolicySection>

            {/* =================================================
                6
            ================================================== */}

            <PolicySection
              number={6}
              id="third-party"
              title="Government, Company & Third-Party Material"
            >
              <p>
                Dholera Times may sometimes use or refer to material
                from:
              </p>

              <BulletList>
                <li>Government departments</li>
                <li>Public authorities</li>
                <li>Companies</li>
                <li>Press releases</li>
                <li>Regulatory bodies</li>
                <li>Project authorities</li>
                <li>Social media accounts</li>
                <li>Other third-party sources</li>
              </BulletList>

              <p>
                Such material may remain the property of its original
                owner.
              </p>

              <p>
                Dholera Times does not claim ownership of third-party
                material where ownership belongs to another party.
                Where appropriate, we aim to provide source
                attribution or credit.
              </p>
            </PolicySection>

            {/* =================================================
                7
            ================================================== */}

            <PolicySection
              number={7}
              id="user-content"
              title="User-Submitted Content"
            >
              <p>
                Users, companies and other organisations may submit:
              </p>

              <BulletList>
                <li>News tips</li>
                <li>Photographs</li>
                <li>Videos</li>
                <li>Press releases</li>
                <li>Documents</li>
                <li>Project updates</li>
                <li>Business announcements</li>
              </BulletList>

              <p>
                By submitting content to Dholera Times, you confirm
                that you have the necessary rights or permission to
                share it with us.
              </p>

              <p>
                Unless separately agreed, submission does not
                automatically transfer ownership of your copyright to
                Dholera Times.
              </p>

              <p>
                However, by submitting material for publication, you
                grant Dholera Times permission to review, edit and
                publish the submitted material for the purpose for
                which it was provided.
              </p>
            </PolicySection>

            {/* =================================================
                8
            ================================================== */}

            <PolicySection
              number={8}
              id="brand-logo"
              title="Dholera Times Brand & Logo"
            >
              <p>
                The name Dholera Times, its logo, tagline, visual
                identity and other brand elements may be protected by
                applicable intellectual-property rights.
              </p>

              <div
                className="
                  rounded-xl

                  border-l-[3px]
                  border-[#EC1C40]

                  bg-black/[0.025]

                  px-4
                  py-4

                  sm:px-5
                "
              >
                <p
                  className="
                    text-[17px]
                    font-bold
                    leading-7

                    text-black

                    sm:text-[18px]
                  "
                >
                  “Dholera Matlab Dholera Times”
                </p>

                <p className="mt-1 text-[14px] text-black/60">
                  Part of the Dholera Times brand identity.
                </p>
              </div>

              <p>
                You may not use the Dholera Times name, logo or brand
                presentation in a way that suggests endorsement,
                partnership or affiliation without permission.
              </p>
            </PolicySection>

            {/* =================================================
                9
            ================================================== */}

            <PolicySection
              number={9}
              id="linking"
              title="Linking to Dholera Times"
            >
              <p>
                You are welcome to link to publicly available pages
                on Dholera Times.
              </p>

              <p>
                Links should:
              </p>

              <BulletList>
                <li>
                  Direct users to the original Dholera Times page
                </li>
                <li>Not misrepresent our content</li>
                <li>
                  Not suggest an endorsement that does not exist
                </li>
                <li>Not obscure the original source</li>
              </BulletList>

              <p>
                Direct linking is preferred over copying and
                republishing complete content.
              </p>
            </PolicySection>

            {/* =================================================
                10
            ================================================== */}

            <PolicySection
              number={10}
              id="scraping"
              title="Automated Scraping & Large-Scale Content Use"
            >
              <p>
                Automated systems must not systematically copy,
                extract or reproduce substantial amounts of Dholera
                Times content in a manner that:
              </p>

              <BulletList>
                <li>Recreates our website or database</li>
                <li>Competes with our original publication</li>
                <li>Removes attribution</li>
                <li>Republishes our content at scale</li>
                <li>Circumvents technical restrictions</li>
              </BulletList>

              <p>
                Organisations seeking access to Dholera Times content
                for commercial datasets, syndication, research
                databases or large-scale automated use should contact
                us for permission.
              </p>
            </PolicySection>

            {/* =================================================
                11
            ================================================== */}

            <PolicySection
              number={11}
              id="infringement"
              title="Copyright Infringement"
            >
              <p>
                Dholera Times respects the intellectual-property
                rights of others.
              </p>

              <p>
                If you believe content published on our website
                infringes your copyright, please contact us with:
              </p>

              <BulletList>
                <li>Your full name</li>
                <li>Contact details</li>
                <li>
                  Identification of the copyrighted work
                </li>
                <li>
                  URL of the allegedly infringing content
                </li>
                <li>
                  Explanation of your ownership or authority
                </li>
                <li>
                  Supporting evidence, where available
                </li>
                <li>The action you are requesting</li>
              </BulletList>

              <div
                className="
                  rounded-xl

                  border
                  border-[#EC1C40]/20

                  bg-[#EC1C40]/5

                  p-4

                  sm:p-5
                "
              >
                <p className="font-semibold text-black">
                  Copyright complaints
                </p>

                <a
                  href="mailto:info@dholeratimes.com?subject=Copyright%20Infringement%20Notice"
                  className="
                    mt-2

                    inline-flex
                    items-center

                    gap-2

                    font-semibold

                    text-[#EC1C40]

                    hover:underline
                    hover:underline-offset-4
                  "
                >
                  <Mail
                    size={17}
                    aria-hidden="true"
                  />

                  info@dholeratimes.com
                </a>

                <p className="mt-2 text-[14px] text-black/60">
                  Subject:{" "}
                  <strong className="font-semibold text-black">
                    Copyright Infringement Notice
                  </strong>
                </p>
              </div>

              <p>
                We will review legitimate copyright complaints and
                may remove, modify, attribute or restrict access to
                material where appropriate.
              </p>
            </PolicySection>

            {/* =================================================
                12
            ================================================== */}

            <PolicySection
              number={12}
              id="unauthorised-use"
              title="Reporting Unauthorised Use of Dholera Times Content"
            >
              <p>
                If you find Dholera Times articles, photographs,
                videos, graphics or other original material
                reproduced elsewhere without permission or proper
                attribution, please send us:
              </p>

              <BulletList>
                <li>The Dholera Times original URL</li>
                <li>
                  The URL where the copied content appears
                </li>
                <li>Screenshots, where helpful</li>
                <li>
                  Any additional relevant information
                </li>
              </BulletList>

              <p>
                Our team may review the use and take appropriate
                action.
              </p>
            </PolicySection>

            {/* =================================================
                13
            ================================================== */}

            <PolicySection
              number={13}
              id="no-transfer"
              title="No Transfer of Rights"
            >
              <p>
                Accessing the Dholera Times website does not transfer
                ownership or intellectual-property rights in our
                content to the user.
              </p>

              <p>
                Any rights not expressly granted in this Copyright
                Policy remain reserved.
              </p>
            </PolicySection>

            {/* =================================================
                14
            ================================================== */}

            <PolicySection
              number={14}
              id="changes"
              title="Changes to This Copyright Policy"
            >
              <p>
                Dholera Times may update this Copyright Policy when
                our content practices, services or legal requirements
                change.
              </p>

              <p>
                The latest version will always be published on this
                page with the updated date.
              </p>
            </PolicySection>

            {/* =================================================
                15
            ================================================== */}

            <PolicySection
              number={15}
              id="contact"
              title="Contact Dholera Times"
            >
              <p>
                For copyright, licensing, syndication or
                content-permission enquiries:
              </p>

              <div
                className="
                  mt-5

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
                    group

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

                  <span>
                    <span
                      className="
                        block

                        text-[12px]
                        font-semibold
                        uppercase

                        tracking-[0.08em]

                        text-black/50
                      "
                    >
                      Email
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
                      info@dholeratimes.com
                    </span>
                  </span>
                </a>

                {/* PHONE */}

                <a
                  href="tel:+919958993549"
                  className="
                    group

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
                        uppercase

                        tracking-[0.08em]

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
                        uppercase

                        tracking-[0.08em]

                        text-black/50
                      "
                    >
                      Head Office
                    </span>

                    <span
                      className="
                        mt-1
                        block

                        max-w-2xl

                        text-[14px]
                        font-medium
                        leading-6

                        text-black/70

                        sm:text-[15px]
                      "
                    >
                      CGJ - 194, DLF Capital Greens Shivaji
                      Marg, Karampura Industrial Area Karam
                      Pura, Delhi - 110015 India.
                    </span>
                  </span>
                </div>
              </div>
            </PolicySection>

            {/* =================================================
                FINAL RIGHTS NOTICE
            ================================================== */}

            <div
              className="
                mt-9

                flex
                items-start

                gap-3

                rounded-xl

                border
                border-black/10

                bg-black

                p-5

                text-white

                sm:p-6
              "
            >
              <ShieldCheck
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
                className="
                  mt-0.5

                  shrink-0

                  text-[#EC1C40]
                "
              />

              <div>
                <p
                  className="
                    text-[15px]
                    font-semibold
                    leading-6

                    text-white

                    sm:text-[16px]
                  "
                >
                  Copyright © Dholera Times
                </p>

                <p
                  className="
                    mt-1

                    text-[13px]
                    leading-6

                    text-white/65

                    sm:text-[14px]
                  "
                >
                  Any rights not expressly granted in this
                  Copyright Policy remain reserved.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}