import React from "react";
import HOME2 from "./carosuel";
import Dholera from "./Dholera";
import LatestUpdates from "../Latest-updates";
import WhyDT from "./WhyDT";
import AboutDT from "./AboutDT";
import FAQS from "./FAQs";
import ObservedSection from "./ObservedSection_codex_temp";
import {
  LazyBulkLandSection,
  LazyTestimonialsSection,
} from "./LazyHomeSections";
import ExploreDholera from "./ExploreDholera";





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
      <FAQS />

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
