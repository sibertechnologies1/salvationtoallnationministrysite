import { useEffect, useRef, useState } from "react";

// Returns [ref, isVisible]. Attach the ref to any section; isVisible flips
// to true once it scrolls into view, then stays true (animates once).
// Used across the site (Welcome strip, About snippet, etc.) — this just
// gives it a proper reusable home instead of copy-pasting the same
// useState/useEffect/useRef block into every section.
export function useScrollFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}