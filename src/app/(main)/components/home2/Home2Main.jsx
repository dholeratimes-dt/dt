import React from "react";
import HOME2 from "./carosuel";
import Dholera from "./Dholera";
import LatestUpdates from "../Latest-updates";
import WhyDT from "./WhyDT";
import AboutDT from "./AboutDT";
import MegaIndustries from "./MegaIndusties";
import TestimonialPagination from "./Testimonials";
import FAQS from "./FAQs";
import PopupForm from "./PopUpForm";
import BulkLand from "../BulkLandForm";
import Primary from "./Primary";

export default function Home2Main() {
  return (
    <>
      <div>
        <HOME2 />
        {/* <Primary/> */}
      </div>
      <div>
        <AboutDT />
      </div>
      <div></div>
      <div>
        <Dholera />
      </div>

      <div>
        <LatestUpdates />
      </div>

      <div>
        <WhyDT />
      </div>
      <div>
        <BulkLand
          title="Invest in Registry-Ready Plots in Dholera SIR Under ₹10 Lakh"
          buttonName="Get A Call Back"
          pageName="Home"
        />
      </div>

      {/* <div>
        <InvestmentTimeline />
      </div> */}

      <div>
        <MegaIndustries />
      </div>

      <div>
        <FAQS />
      </div>
      <div>
        <TestimonialPagination />
      </div>

      <PopupForm />
    </>
  );
}
