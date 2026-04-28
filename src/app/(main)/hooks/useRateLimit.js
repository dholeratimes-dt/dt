
import { useState, useEffect, useCallback } from "react";

export function useRateLimit(key, maxAttempts = 3) {
  const countKey = `${key}_count`;
  const timeKey  = `${key}_time`;

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const count    = parseInt(localStorage.getItem(countKey) || "0", 10);
    const lastTime = parseInt(localStorage.getItem(timeKey)  || "0", 10);

    if (lastTime) {
      const hoursPassed = (Date.now() - lastTime) / 3600000;
      if (hoursPassed >= 24) {
        // Reset after 24 hours
        localStorage.setItem(countKey, "0");
        localStorage.setItem(timeKey, String(Date.now()));
      } else if (count >= maxAttempts) {
        setIsDisabled(true);
      }
    }
  }, [countKey, timeKey, maxAttempts]);

  const increment = useCallback(() => {
    const next = parseInt(localStorage.getItem(countKey) || "0", 10) + 1;
    localStorage.setItem(countKey, String(next));
    localStorage.setItem(timeKey,  String(Date.now()));
    if (next >= maxAttempts) setIsDisabled(true);
  }, [countKey, timeKey, maxAttempts]);

  return { isDisabled, increment };
}