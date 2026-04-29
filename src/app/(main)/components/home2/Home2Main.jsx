import React from "react";
import HOME2 from "./carosuel";
import Dholera from "./Dholera";
import LatestUpdates from "../Latest-updates";
import WhyDT from "./WhyDT";
import AboutDT from "./AboutDT";
import TestimonialPagination from "./Testimonials";
import FAQS from "./FAQs";
import PopupForm from "./PopUpForm";
import BulkLand from "../BulkLandForm";

export default function Home2Main() {
  return (
    <>
      <HOME2 />

      <Dholera />

      <AboutDT />

      <LatestUpdates />

      <WhyDT />

      <BulkLand
        title="Invest in Registry-Ready Plots in Dholera Starting from ₹8 Lakh"
        buttonName="Get A Call Back"
        pageName="Home"
      />

      <FAQS />

      <TestimonialPagination />

      <PopupForm />
    </>
  );
}
