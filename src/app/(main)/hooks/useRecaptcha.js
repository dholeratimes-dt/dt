// hooks/useRecaptcha.js
import { useRef, useCallback } from "react";

const SCRIPT_ID = "grecaptcha-script";
const SITE_KEY  = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function useRecaptcha() {
  const loading = useRef(false);

  // Call this onFocus on your form — injects the script once per page
  const load = useCallback(() => {
    if (
      loading.current ||
      document.getElementById(SCRIPT_ID) ||
      window.grecaptcha
    ) return;

    loading.current = true;
    const s = document.createElement("script");
    s.id    = SCRIPT_ID;
    s.src   = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Call this on submit — returns a Promise<token>
  const getToken = useCallback((action = "submit") =>
    new Promise((resolve, reject) => {
      const attempt = (tries = 0) => {
        if (window.grecaptcha?.ready) {
          window.grecaptcha.ready(() =>
            window.grecaptcha
              .execute(SITE_KEY, { action })
              .then(resolve)
              .catch(reject)
          );
        } else if (tries < 20) {
          setTimeout(() => attempt(tries + 1), 300); // waits up to 6s
        } else {
          reject(new Error("reCAPTCHA failed to load"));
        }
      };
      attempt();
    }), []);

  return { load, getToken };
}