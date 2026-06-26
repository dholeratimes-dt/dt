"use client";

import dynamic from "next/dynamic";
import ObservedSection from "./ObservedSection_codex_temp";

const BulkLand = dynamic(() => import("../BulkLandForm"), {
  ssr: false,
  loading: () => null,
});

const TestimonialPagination = dynamic(() => import("./Testimonials"), {
  ssr: false,
  loading: () => null,
});

const PopupForm = dynamic(() => import("./PopUpForm"), {
  ssr: false,
  loading: () => null,
});

export function LazyBulkLandSection() {
  return (
    <ObservedSection animation="scale-soft">
      <BulkLand
        title="Invest in Registry-Ready Plots in Dholera Starting from â‚¹8 Lakh"
        buttonName="Get A Call Back"
        pageName="Home"
      />
    </ObservedSection>
  );
}

export function LazyTestimonialsSection() {
  return (
    <ObservedSection animation="fade-up" delay={80}>
      <TestimonialPagination />
    </ObservedSection>
  );
}

export function LazyPopupForm() {
  return <PopupForm />;
}