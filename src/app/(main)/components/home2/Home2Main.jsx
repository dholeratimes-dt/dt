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
  LazyPopupForm,
  LazyTestimonialsSection,
} from "./LazyHomeSections";

export default function Home2Main() {
  return (
    <>
      <HOME2 />

      <ObservedSection animation="fade-up">
        <Dholera />
      </ObservedSection>

      <ObservedSection animation="fade-right">
        <AboutDT />
      </ObservedSection>

      <ObservedSection animation="fade-up" delay={80}>
        <LatestUpdates />
      </ObservedSection>

      <ObservedSection animation="fade-left">
        <WhyDT />
      </ObservedSection>

      <LazyBulkLandSection />

      <ObservedSection animation="fade-up">
        <FAQS />
      </ObservedSection>

      <LazyTestimonialsSection />

      <LazyPopupForm />
    </>
  );
}