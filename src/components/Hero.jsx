import { motion } from "framer-motion";
import React, { lazy, Suspense, useRef, useLayoutEffect, useState } from "react";

const VideoCanvas = lazy(() => import("./VideoCanvas"));
const Mask = lazy(() => import("./Mask"));

function useSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);

  return size;
}

export default function Hero() {
  const maskRef = useRef(null);
  const wrapperRef = useRef(null);
  const size = useSize(maskRef);

  const [maskRightOffset, setMaskRightOffset] = useState(16);

  useLayoutEffect(() => {
    function update() {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const offset = Math.round(window.innerWidth - rect.right);
      const clamped = Math.min(Math.max(offset, 20), 100);
      setMaskRightOffset(clamped);
    }

    document.fonts.ready.then(update);
    window.addEventListener("resize", update);
    setTimeout(update, 50);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="relative isolate pt-24 md:pt-28 pb-8 overflow-hidden bg-black">
      <div ref={wrapperRef} className="mx-auto w-full max-w-7xl px-4 relative">

        {/* MASK SECTION */}
        <div
          ref={maskRef}
          className="absolute top-1/2 -translate-y-1/2 hidden md:block pointer-events-none"
          style={{
            zIndex: 30,
            width: "46vw",
            maxWidth: "700px",
            height: "68vh",
            right: maskRightOffset,
          }}
        >
          {size.width > 20 && (
            <>
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 65%, transparent 85%)",
                    filter: "blur(44px)",
                  }}
                />
              </div>

              <div className="absolute inset-0 z-10">
                <Suspense fallback={null}>
                  <Mask wrapperSize={size} />
                </Suspense>
              </div>
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="relative z-20">
          <div
            className="grid md:grid-cols-2 gap-8 items-center"
            style={{ minHeight: "calc(100vh - 200px)" }}
          >
            <div className="flex flex-col justify-center">

              {/* TITLE */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9]"
                style={{
                  fontFamily: "'Bruno Ace SC', sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                HACK HEIST SEASON 2
              </motion.h1>

              {/* SUBTITLE */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Oxanium', sans-serif" }}
              >
                <span className="font-semibold text-red-500">
                  28–29 March, 2026
                </span>
                <br />
                Assemble your crew, crack the toughest challenges, and pull off
                the perfect build in 36 hours.
              </motion.p>

              {/* DEVFOLIO APPLY BUTTON */}
             <div className="mt-8">
  <div
    className="apply-button"
    data-hackathon-slug="hack-heist-2"
    data-button-theme="dark"
    style={{ height: "44px", width: "312px" }}
  />
</div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO BACKGROUND */}
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-black" />}>
        <VideoCanvas />
      </Suspense>

      {/* OVERLAYS */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.08] animate-scanline" />
    </section>
  );
}