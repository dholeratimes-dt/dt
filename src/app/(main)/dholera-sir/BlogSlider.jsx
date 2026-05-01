"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

export default function BlogSlider({ posts }) {
  const [current, setCurrent] = useState(0);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCols(3);
      else if (window.innerWidth >= 768) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset to first slide when cols change
  useEffect(() => {
    setCurrent(0);
  }, [cols]);

  const totalSlides = Math.ceil(posts.length / cols);
  const clamp = (n) => Math.min(Math.max(n, 0), totalSlides - 1);

  const prev = () => setCurrent((c) => clamp(c - 1));
  const next = () => setCurrent((c) => clamp(c + 1));

  if (!posts.length) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Blog Posts Available
        </h3>
        <p className="text-gray-600">
          Check back soon for information about Dholera SIR investment
          opportunities.
        </p>
      </div>
    );
  }

  // Group posts into pages of `cols`
  const pages = Array.from({ length: totalSlides }, (_, i) =>
    posts.slice(i * cols, i * cols + cols)
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* ── Viewport ── */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="flex gap-6 w-full flex-shrink-0"
              style={{ minWidth: "100%" }}
            >
              {page.map((post) => (
                <div
                  key={post._id}
                  style={{ flex: `0 0 calc((100% - ${(cols - 1) * 24}px) / ${cols})` }}
                >
                  <BlogCard post={post} />
                </div>
              ))}

              {/* Fill empty slots on last page so layout doesn't break */}
              {page.length < cols &&
                Array.from({ length: cols - page.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    style={{ flex: `0 0 calc((100% - ${(cols - 1) * 24}px) / ${cols})` }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between mt-6">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300 focus:outline-none"
              style={{
                height: 8,
                width: i === current ? 28 : 8,
                background: i === current ? "#d7b56d" : "#d1c9b8",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-base transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#d7b56d", color: "#d7b56d" }}
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={current === totalSlides - 1}
            aria-label="Next"
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#d7b56d" }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}