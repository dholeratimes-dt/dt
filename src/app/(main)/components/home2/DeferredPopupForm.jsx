"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { AUTO_POPUP_PAGES, AUTO_POPUP_SCROLL_PERCENT } from "./popupTriggers";

const PopupForm = dynamic(() => import("./PopUpForm"), {
  ssr: false,
  loading: () => (
    <div role="status" className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/70 text-white">
      Loading form…
    </div>
  ),
});

export default function DeferredPopupForm() {
  const pathname = usePathname() || "/";
  const [activePath, setActivePath] = useState(null);

  useEffect(() => {
    // A new page visit gets a fresh trigger, even when returning to the homepage.
    setActivePath(null);
    let triggered = false;
    let frame = 0;
    const open = () => {
      if (triggered) return;
      triggered = true;
      setActivePath(pathname);
    };
    const onClick = (event) => {
      if (event.target instanceof Element && event.target.closest("[data-open-dholera-popup]")) open();
    };
    const checkScroll = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && (window.scrollY / scrollable) * 100 >= AUTO_POPUP_SCROLL_PERCENT) open();
    };
    const onScroll = () => {
      if (!triggered && !frame) frame = requestAnimationFrame(checkScroll);
    };
    document.addEventListener("click", onClick);
    if (AUTO_POPUP_PAGES.includes(pathname)) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return activePath === pathname ? <PopupForm key={pathname} initiallyOpen /> : null;
}
