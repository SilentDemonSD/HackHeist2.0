import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { lazy, Suspense, useState, useRef, useLayoutEffect } from "react";
import Modal from "./Modal";

const VideoCanvas = lazy(() => import("./VideoCanvas"));
const Mask = lazy(() => import("./Mask"));

function HeistButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // <Link to="/register">
      <motion.div
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative rounded-full bg-heist-red px-8 py-4 text-white font-bold shadow-lg overflow-hidden cursor-pointer text-base uppercase tracking-wide"
        style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700 }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          }}
          animate={{ x: isHovered ? ["-100%", "100%"] : "0%" }}
          transition={{ duration: 0.9, ease: "linear", repeat: isHovered ? Infinity : 0 }}
        />

        <span className="relative z-10 flex items-center justify-center">
          {["J", "o", "i", "n", " ", "t", "h", "e", " ", "H", "e", "i", "s", "t"].map(
            (letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 0 }}
                animate={{ y: isHovered ? [0, -4, 0] : 0 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.5,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 0.6,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            )
          )}
        </span>
      </motion.div>
    // </Link>
  );
}

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
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    function update() {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      if (!rect.right || rect.width < 200) {
        setMaskRightOffset(16);
        return;
      }

      const offset = Math.round(window.innerWidth - rect.right);
      const clamped = Math.min(Math.max(offset, 20), 100);
      setMaskRightOffset(clamped);
    }

    document.fonts.ready.then(() => {
      update();
    });
    window.addEventListener("resize", update);
    setTimeout(update, 50);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="relative isolate pt-24 md:pt-28 pb-8 overflow-hidden">
      <div ref={wrapperRef} className="mx-auto w-full max-w-7xl px-4 relative">

        <div
          ref={maskRef}
          className="absolute top-1/2 -translate-y-1/2 hidden md:block pointer-events-none"
          style={{
            zIndex: 30,
            width: "46vw",
            maxWidth: "700px",
            height: "68vh",
            right: maskRightOffset,
            overflow: "visible",
          }}
        >
          {size.width > 20 && (
            <>
              <div
                className="absolute pointer-events-none"
                style={{
                  zIndex: 0,
                  top: "-10%",
                  bottom: "-10%",
                  left: "-10%",
                  right: "-50%",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 65%, transparent 85%)",
                    filter: "blur(44px)",
                  }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)",
                    opacity: 0.85,
                  }}
                />
              </div>

              <div className="absolute inset-0" style={{ zIndex: 10 }}>
                <Suspense fallback={null}>
                  <Mask wrapperSize={size} />
                </Suspense>
              </div>
            </>
          )}
        </div>

        <div className="relative z-20">
          <div
            className="grid md:grid-cols-2 gap-8 items-center"
            style={{ minHeight: "calc(100vh - 200px)" }}
          >
            <div className="flex flex-col justify-center">
              <motion.h1
                className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9]"
                style={{
                  fontFamily: "'Bruno Ace SC', sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                }}
              >
                {["HACK", " ", "HEIST", " ", "SEASON", " ", "2"].map(
                  (word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: wordIndex * 0.1,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word === " "
                        ? "\u00A0"
                        : word.split("").map((letter, letterIndex) => (
                          <motion.span
                            key={letterIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay:
                                wordIndex * 0.1 + letterIndex * 0.02,
                              duration: 0.4,
                              ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.1, color: "#ff4444" }}
                            style={{ display: "inline-block" }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                    </motion.span>
                  )
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Oxanium', sans-serif" }}
              >
                <span className="font-semibold" style={{ color: "#ff4444" }}>
                  28–29 March, 2026
                </span><br />
                Assemble your crew, crack the toughest challenges, and pull off the perfect build in 36 hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-8 flex items-center gap-3"
              >
                <HeistButton onClick={() => setShowModal(true)} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-black" />}>
        <VideoCanvas />
      </Suspense>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#000]/90 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.08] animate-scanline" />

      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Registrations"
      >
        <div className="text-center">
          <p className="text-lg" style={{ fontFamily: "'Oxanium', sans-serif" }}>
            Registrations will open soon!
          </p>
          <p className="text-gray-400 mt-2" style={{ fontFamily: "'Oxanium', sans-serif" }}>
            Stay tuned for updates.
          </p>
        </div>
      </Modal>
    </section>
  );
}
