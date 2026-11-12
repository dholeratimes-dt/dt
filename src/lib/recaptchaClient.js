let configurationPromise;
let scriptPromise;

const LOAD_ERROR =
  "Security verification could not load. Please check your connection and try again.";

async function getConfiguration() {
  if (!configurationPromise) {
    configurationPromise = fetch("/api/submit-form", {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.siteKey) {
          throw new Error(data.error || LOAD_ERROR);
        }
        return data;
      })
      .catch((error) => {
        configurationPromise = null;
        throw error;
      });
  }
  return configurationPromise;
}

function loadScript() {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      let script = document.querySelector('script[src*="/recaptcha/api.js"]');
      let checkingReady = false;
      let settled = false;

      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearInterval(interval);
        clearTimeout(timeout);
        script?.removeEventListener("error", onError);
        if (error) script?.remove();
        if (error) reject(error);
        else resolve(window.grecaptcha);
      };
      const onError = () => {
        // A failed script must be replaceable on the next attempt.
        finish(new Error(LOAD_ERROR));
      };
      const checkReady = () => {
        const api = window.grecaptcha;
        if (!checkingReady && typeof api?.render === "function") {
          checkingReady = true;
          if (typeof api.ready === "function") api.ready(() => finish());
          else finish();
        }
      };

      // api.js can finish before its dependent bundle supplies render(). This
      // also handles a script inserted by another form whose load event passed.
      const interval = setInterval(checkReady, 50);
      const timeout = setTimeout(() => finish(new Error(LOAD_ERROR)), 15000);

      if (!script && typeof window.grecaptcha?.render !== "function") {
        script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.addEventListener("error", onError, { once: true });
        document.head.appendChild(script);
      } else {
        script?.addEventListener("error", onError, { once: true });
      }
      checkReady();
    }).catch((error) => {
      scriptPromise = null;
      throw error;
    });
  }
  return scriptPromise;
}

export async function loadRecaptcha() {
  const { siteKey } = await getConfiguration();
  const api = await loadScript();
  return { api, siteKey };
}
