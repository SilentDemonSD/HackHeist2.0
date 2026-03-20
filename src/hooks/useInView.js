import { useEffect, useRef, useState } from "react";

/**
 * Lightweight replacement for framer-motion's whileInView.
 * Returns [ref, isInView]. Once triggered (once=true by default),
 * the element stays "in view" permanently.
 */
export default function useInView({ margin = "0px", once = true, threshold = 0 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, once, threshold]);

  return [ref, inView];
}
