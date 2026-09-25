import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // 👈 Small delay so the target page has rendered before we try to find the element
      // (e.g. Home's Explore cards linking to /skills-experience#approach or #experience).
      const id = hash.replace("#", "");
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }, 0);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export default ScrollToTop;
