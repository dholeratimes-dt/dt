"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/* DESKTOP FORM CODE SPLITTING*/

const DesktopForm = dynamic(() => import("./HeroDesktopFormLayer"), {
  ssr: false,
  loading: () => null,
});

export default function HeroDesktopFormGate() {
  const [hasBeenDesktop, setHasBeenDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");

    function update() {
      if (query.matches) {
        setHasBeenDesktop(true);
        // Load the actual lead form alongside the desktop-only layer.
        // The mobile viewport never executes either dynamic import.
        void import("./HeroForm");
      }
    }

    update();
    if (query.addEventListener) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }

    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  // Keep the layer mounted after a desktop visit so popup state survives resizing.
  return hasBeenDesktop ? <DesktopForm /> : null;
}
