"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const PREVIEW_RATIO = 0.25;
const FADE_HEIGHT = 96;

export default function BlogReadMore({ children }) {
  const contentId = useId();
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(null);

  useLayoutEffect(() => {
    if (expanded) return;

    const content = contentRef.current;
    const concealedElements = new Set();

    const restoreContent = () => {
      concealedElements.forEach((element) => {
        element.inert = false;
      });
      concealedElements.clear();
    };

    const measureContent = () => {
      restoreContent();
      const bounds = content.getBoundingClientRect();
      const height = Math.ceil(bounds.height * PREVIEW_RATIO);
      setPreviewHeight(height);

      // Clipped blocks and controls must also stay out of keyboard navigation
      // and the accessibility tree until the reader opens the full article.
      const visibleBottom = bounds.top + Math.max(0, height - FADE_HEIGHT);
      const candidates = new Set([
        ...content.children,
        ...content.querySelectorAll(
          "a, button, input, select, textarea, [tabindex]",
        ),
      ]);

      candidates.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const concealed = element.parentElement === content
          ? rect.top >= visibleBottom
          : rect.bottom > visibleBottom;

        if (concealed && !element.inert) {
          element.inert = true;
          concealedElements.add(element);
        }
      });
    };

    const revealHeading = (hash) => {
      if (!hash || hash === "#") return;

      let id;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }

      const heading = document.getElementById(id);
      if (!heading || !content.contains(heading)) return;

      // Expand before the existing Key Highlights handler scrolls to a heading.
      flushSync(() => setExpanded(true));
      return heading;
    };

    const handleAnchorClick = (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey) return;

      const anchor = event.target.closest?.("a[href]");
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.search === window.location.search) {
        revealHeading(url.hash);
      }
    };

    const handleHashChange = () => {
      const heading = revealHeading(window.location.hash);
      heading?.scrollIntoView({ block: "start" });
    };

    measureContent();
    const observer = new ResizeObserver(measureContent);
    observer.observe(content);
    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("hashchange", handleHashChange);
    // Wait until the layout effect has finished before revealing a deep link.
    const frame = requestAnimationFrame(handleHashChange);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("hashchange", handleHashChange);
      restoreContent();
    };
  }, [expanded]);

  const collapsed = !expanded && previewHeight !== 0;

  const readMore = () => {
    setExpanded(true);
    requestAnimationFrame(() => {
      contentRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="relative">
      <div
        data-blog-preview=""
        className={collapsed ? "overflow-hidden" : undefined}
        style={collapsed ? { maxHeight: previewHeight ?? "65vh" } : undefined}
      >
        <div
          ref={contentRef}
          id={contentId}
          tabIndex={-1}
          className="flow-root max-w-none text-xl outline-none [&>:first-child]:mt-0"
        >
          {children}
        </div>
      </div>

      {collapsed && (
        <div
          data-blog-read-more=""
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-36 items-end justify-center bg-gradient-to-t from-white via-white/95 to-transparent pb-2"
        >
          <button
            type="button"
            aria-expanded={false}
            aria-controls={contentId}
            onClick={readMore}
            className="pointer-events-auto inline-flex min-h-11 items-center justify-center rounded-lg bg-[#d71920] px-5 py-2.5 text-base font-semibold leading-6 text-white shadow-md transition-colors hover:bg-[#bb151b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d71920] focus-visible:ring-offset-2"
          >
            Read More
          </button>
        </div>
      )}

      <noscript>
        <style>{`
          [data-blog-preview] { max-height: none !important; overflow: visible !important; }
          [data-blog-read-more] { display: none !important; }
        `}</style>
      </noscript>
    </div>
  );
}
