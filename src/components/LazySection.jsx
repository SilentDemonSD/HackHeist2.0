import { useState, useEffect, useRef } from "react";

export default function LazySection({ children, rootMargin = "300px", minHeight = "40vh" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  if (visible) return children;

  return (
    <div
      ref={ref}
      style={{
        minHeight,
        background: "#000",
        contentVisibility: "auto",
        containIntrinsicSize: `0 ${minHeight}`,
      }}
    />
  );
}
