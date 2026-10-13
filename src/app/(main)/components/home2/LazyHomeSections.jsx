"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ObservedSection from "./ObservedSection_codex_temp";

const BulkLand = dynamic(() => import("../BulkLandForm"), {
  ssr: false,
  loading: () => null,
});

const TestimonialPagination = dynamic(() => import("./Testimonials"), {
  ssr: false,
  loading: () => null,
});

function NearViewport({ children }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: "300px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="min-h-[460px]">{ready ? children : null}</div>;
}

export function LazyBulkLandSection() {
  return (
    <NearViewport><ObservedSection animation="scale-soft">
      <BulkLand
        title="Invest in Registry Ready Plots in Dholera Starting from ₹10 Lakh"
        buttonName="Get A Call Back"
        pageName="Home"
      />
    </ObservedSection></NearViewport>
  );
}

export function LazyTestimonialsSection() {
  return (
    <NearViewport><ObservedSection animation="fade-up" delay={80}>
      <TestimonialPagination />
    </ObservedSection></NearViewport>
  );
}
