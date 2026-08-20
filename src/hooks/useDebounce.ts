import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const effectiveDelay = value ? delay : 0;

    const timer = setTimeout(() => setDebounced(value), effectiveDelay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
