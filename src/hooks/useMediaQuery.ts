import { useEffect, useState } from "react";

/** Live boolean for a media query — actually mounts/unmounts, unlike CSS hidden/block. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

// 👈 768px matches the site's existing Tailwind `md:` breakpoint, so this stays in sync with
// every other md: class already used across the site (sidebar/bottom-nav switch included).
export const useIsPhone = () => useMediaQuery("(max-width: 767px)");
