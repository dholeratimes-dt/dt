import React from "react";
import Home2Main from "./components/home2/Home2Main";
import Script from "next/script";

export default function page() {

  return (
    <>
      <title>Dholera Smart City Gujarat | High ROI Plots -Dholera Times</title>
      <link rel="canonical" href="https://www.dholeratimes.com" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "Dholera Times",
            alternateName: "DT",
            url: "https://www.dholeratimes.com/",
            logo: "	https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdt.7009f759.webp&w=128&q=75",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572970112485/",
              "https://www.instagram.com/dholeratimes/",
              "https://www.youtube.com/@dholeratimes",
              "https://x.com/dholeratimes",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Dholera Times",
            url: "https://www.dholeratimes.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.dholeratimes.com/search?q={search_term_string}{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Dholera Times",
            url: "https://www.dholeratimes.com",
            logo: "https://www.dholeratimes.com/src/assets/dtlogo.png",
            image:
              "	https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdt.7009f759.webp&w=128&q=75",
            priceRange: "from ₹10 Lakh",
            telephone: "+91 99589 93549",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            areaServed: {
              "@type": "Place",
              name: "Dholera Smart City",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is Dholera Smart City Completed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera Smart City is currently under development. Phase 1 infrastructure is nearing completion, and full development is planned in phases up to 2040. Key infrastructure such as roads, power, water supply, and the activation area is progressing rapidly.",
                },
              },
              {
                "@type": "Question",
                name: "Is Dholera Smart City a good investment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Dholera is considered a promising long-term investment due to rapid infrastructure development, government support, and increasing industrial interest. Land prices are comparatively lower today, offering strong potential for future returns.",
                },
              },
              {
                "@type": "Question",
                name: "Is Dholera bigger than Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera Special Investment Region (DSIR) covers around 920 sq km, making it geographically larger than Delhi (approx. 1,484 sq km including urban areas). The planned urban development area of Dholera is about 500 sq km, positioning it among India's largest planned cities.",
                },
              },
              {
                "@type": "Question",
                name: "Is Tata investing in Dholera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the Tata Group has announced major investments in Dholera, including India's first semiconductor manufacturing plant, renewable energy initiatives, and advanced electronics manufacturing. Further expansion is expected as part of India's semiconductor and industrial growth roadmap.",
                },
              },
              {
                "@type": "Question",
                name: "What is the distance between Dholera Smart City and Ahmedabad?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is approximately 100 km from Ahmedabad. The new Ahmedabad–Dholera Expressway will reduce travel time to around one hour. Future metro and high-speed rail connectivity is also proposed.",
                },
              },
            ],
          }),
        }}
      />

      <meta
        name="description"
        content="Exclusive residential plots in Dholera Smart City Gujarat! Close to Dholera SIR & International Airport. Book now for high returns!"
      />
      <meta
        name="keywords`"
        content="Exclusive residential plots in Dholera Smart City Gujarat! Close to Dholera SIR & International Airport. Book now for high returns!"
      />
      <div>
        <Home2Main/>
      </div>
    </>
  );
}