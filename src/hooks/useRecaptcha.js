"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadRecaptcha } from "@/lib/recaptchaClient";

export default function useRecaptcha(enabled = true) {
  const recaptchaRef = useRef(null);
  const widgetRef = useRef(null);
  const pendingRef = useRef(null);
  const activeRef = useRef(enabled);
  const visitRef = useRef(0);

  const resetRecaptcha = useCallback(() => {
    const widget = widgetRef.current;
    if (widget) {
      try {
        widget.api.reset(widget.id);
      } catch {
        // The container may already have been removed by navigation.
      }
    }
  }, []);

  useEffect(() => {
    activeRef.current = enabled;
    if (!enabled) return;
    return () => {
      activeRef.current = false;
      visitRef.current += 1;
      pendingRef.current?.reject(new Error("Verification cancelled."));
      resetRecaptcha();
    };
  }, [enabled, resetRecaptcha]);

  const verifyRecaptcha = useCallback(async () => {
    const visit = visitRef.current;
    const { api, siteKey } = await loadRecaptcha();
    const element = recaptchaRef.current;
    if (!activeRef.current || visitRef.current !== visit || !element) {
      throw new Error("Verification cancelled.");
    }

    // Checkbox widgets are completed by the user. execute() only applies to
    // invisible widgets; retries reset this form's widget, including ID 0.
    if (widgetRef.current?.element === element) resetRecaptcha();

    return new Promise((resolve, reject) => {
      let timeout;
      const finish = (error, token) => {
        clearTimeout(timeout);
        pendingRef.current = null;
        if (error) reject(error);
        else resolve(token);
      };
      pendingRef.current = {
        reject: (error) => finish(error),
        resolve: (token) => finish(null, token),
      };
      timeout = setTimeout(() => {
        finish(new Error("Verification timed out. Please try again."));
        resetRecaptcha();
      }, 120000);

      try {
        if (widgetRef.current?.element !== element) {
          const widget = { api, element };
          widgetRef.current = widget;
          const id = api.render(element, {
            sitekey: siteKey,
            theme: "light",
            size: "compact",
            callback: (token) => {
              if (token && widgetRef.current === widget) {
                pendingRef.current?.resolve(token);
              }
            },
            "expired-callback": () => {
              if (widgetRef.current === widget) pendingRef.current?.reject(
                new Error("Verification expired. Please try again."),
              );
            },
            "error-callback": () => {
              if (widgetRef.current === widget) pendingRef.current?.reject(
                new Error("Verification failed. Please check your connection and try again."),
              );
            },
          });
          widget.id = id;
        }
      } catch {
        widgetRef.current = null;
        finish(new Error("Security verification could not start. Please try again."));
      }
    });
  }, [resetRecaptcha]);

  return { recaptchaRef, loadRecaptcha, verifyRecaptcha, resetRecaptcha };
}
