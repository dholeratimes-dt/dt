import React from "react";
import HOME2 from "./carosuel";
import Dholera from "./Dholera";
import LatestUpdates from "../Latest-updates";
import WhyDT from "./WhyDT";
import ObservedSection from "./ObservedSection_codex_temp";
import {
  LazyTestimonialsSection,
} from "./LazyHomeSections";
import ExploreDholera from "./ExploreDholera";
import CommonFAQ from "../Common/Faq";


const faqItems  = [
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



export async function generateMetadata() {
  return {
    title: "Dholera Times | Dholera Smart City News, Updates & Investment Insights",
    description: "Follow Dholera Smart City news, Dholera SIR development updates, infrastructure progress, industry announcements and investment insights with Dholera Times.",
    keywords: [
      "Dholera Smart City",
      "Dholera Smart City news",
      "Dholera news",
      "Dholera latest updates",
      "Dholera SIR updates",
      "Dholera development",
      "Dholera investment insights",
    ],
    alternates: {
      canonical: "https://www.dholeratimes.com/",
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [
      {
        name: "Dholera Times",
      },
    ],
    openGraph: {
      title:"Dholera Times | Dholera Smart City News, Updates & Investment Insights",
      description:"Follow Dholera Smart City news, Dholera SIR development updates, infrastructure progress, industry announcements and investment insights with Dholera Times.",
      url: "https://www.dholeratimes.com/",
      siteName: "Dholera Times",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title:"Dholera Times | Dholera Smart City News, Updates & Investment Insights",
      description:"Follow Dholera Smart City news, Dholera SIR development updates, infrastructure progress, industry announcements and investment insights with Dholera Times.",
    },
  };
}

export default function Home2Main() {
  return (
    <>
      <HOME2 />
      <LatestUpdates />
      <Dholera />

      <ExploreDholera />
      <WhyDT />
      <LazyTestimonialsSection />
      <CommonFAQ faqItems={faqItems} />



      {/* <ObservedSection animation="fade-up"> */}
      {/* </ObservedSection> */}

      {/* <ObservedSection animation="fade-right">
        <AboutDT />
      </ObservedSection> */}

      {/* <ObservedSection animation="fade-up" delay={80}> */}
      {/* </ObservedSection> */}

      {/* <ObservedSection animation="fade-left"> */}
      {/* </ObservedSection> */}

      {/* <LazyBulkLandSection /> */}

      {/* <ObservedSection animation="fade-up"> */}
  
      {/* </ObservedSection> */}


    </>
  );
}
