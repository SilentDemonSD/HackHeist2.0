import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import "./CinematicIntro.css";

// Lazy-load Dither → keeps Three.js / R3F / postprocessing (~2.2 MiB)
// out of the critical initial bundle  (Three.js best-practice #83 / #84)
const Dither = lazy(() => import(/* webpackChunkName: "dither" */ "./Dither"));

const TITLE = "HACK HEIST 2.0";

// Rich pool: letters + digits + symbols
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!*?^~+=/<>{}[]|\\".split("");
const rand = () => POOL[Math.floor(Math.random() * POOL.length)];

// ── Per-letter component ──────────────────────────────────────────────────────
// isScrambling tracks whether a random char is currently showing so we can
// dim it — real letter = white, temporary cipher char = muted grey.
function CipherLetter({ finalChar, isRevealed, isMobile }) {
  const [display, setDisplay] = useState(rand);
  const [isScrambling, setIsScrambling] = useState(true);
  const noiseRef = useRef(null);
  const hoverRef = useRef(null);

  // ① Live noise while unrevealed; lock to finalChar on reveal
  // On mobile: 150 ms interval (vs 55 ms desktop) to reduce main-thread work
  useEffect(() => {
    if (noiseRef.current) clearInterval(noiseRef.current);
    if (isRevealed) {
      setDisplay(finalChar);
      setIsScrambling(false);
      return;
    }
    setIsScrambling(true);
    noiseRef.current = setInterval(() => setDisplay(rand()), isMobile ? 150 : 55);
    return () => { if (noiseRef.current) clearInterval(noiseRef.current); };
  }, [isRevealed, finalChar, isMobile]);

  // ② Per-letter hover — fires whenever mouse enters THIS letter's span
  //    Skipped on mobile (no pointer) to save CPU
  const handleEnter = () => {
    if (isMobile || !isRevealed) return;
    if (hoverRef.current) clearInterval(hoverRef.current);
    setIsScrambling(true);
    let tick = 0;
    hoverRef.current = setInterval(() => {
      setDisplay(rand());
      tick++;
      if (tick >= 10) {
        clearInterval(hoverRef.current);
        hoverRef.current = null;
        setDisplay(finalChar);
        setIsScrambling(false);
      }
    }, 65);
  };

  const handleLeave = () => {
    if (hoverRef.current) {
      clearInterval(hoverRef.current);
      hoverRef.current = null;
    }
    if (isRevealed) {
      setDisplay(finalChar);
      setIsScrambling(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => () => {
    if (noiseRef.current) clearInterval(noiseRef.current);
    if (hoverRef.current) clearInterval(hoverRef.current);
  }, []);

  // Colour logic:
  // • unrevealed (initial decode noise) → red glow, as before
  // • hover scrambling (revealed but cycling) → dim grey
  // • resolved real letter → bright white
  const color = isRevealed
    ? isScrambling
      ? "rgba(155, 155, 155, 0.5)"
      : "#ffffff"
    : "rgba(205, 38, 38, 0.88)";

  const textShadow = isRevealed
    ? "0 0 20px rgba(255,255,255,0.07)"
    : "0 0 18px rgba(255,50,50,0.9), 0 0 5px rgba(255,80,80,0.45)";

  return (
    <span
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "inline-block",
        letterSpacing: "0.02em",
        color,
        textShadow,
        transition: "color 0.07s ease",
        cursor: "default",
      }}
    >
      {display}
    </span>
  );
}

// ── Reveal sequencer ─────────────────────────────────────────────────────────
function useCipherReveal(text, startDelay = 380) {
  const chars = text.split("");
  const [revealed, setRevealed] = useState(() => chars.map(c => c === " "));
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let ci = 0;

    const timer = setTimeout(function advance() {
      if (cancelled) return;
      if (ci >= chars.length) { setAllDone(true); return; }
      if (chars[ci] === " ") { ci++; setTimeout(advance, 20); return; }

      const idx = ci++;
      setTimeout(() => {
        if (cancelled) return;
        setRevealed(prev => { const n = [...prev]; n[idx] = true; return n; });
        setTimeout(advance, 60);
      }, 110);
    }, startDelay);

    return () => { cancelled = true; clearTimeout(timer); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { chars, revealed, allDone };
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const isMobile = useIsMobile();
  const { chars, revealed, allDone } = useCipherReveal(TITLE);
  const videoRef = useRef(null);

  // On mobile: defer the actual video src until the browser is idle.
  // The poster gives an instant visual (22 KB), the 2.8 MB video streams in
  // after the main thread settles — keeping FCP/LCP fast.
  useEffect(() => {
    if (!isMobile) return;
    const el = videoRef.current;
    if (!el) return;
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const id = schedule(() => {
      el.src = "/videos/hh_intro.mp4";
      el.load();
    });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
    };
  }, [isMobile]);

  return (
    <section className="cinematic-intro">
      {/* Layer 0 — Dither: desktop-only (Three.js ~850 KB skipped on mobile) */}
      {isMobile ? (
        <div className="cinematic-dither-bg cinematic-mobile-bg" />
      ) : (
        <Suspense
          fallback={
            <div
              className="cinematic-dither-bg"
              style={{ background: "rgb(40,5,2)" }}
            />
          }
        >
          <div className="cinematic-dither-bg">
            <Dither
              waveColor={[0.35, 0.04, 0.02]}
              colorNum={50}
              waveFrequency={2}
              mouseRadius={0.12}
              waveAmplitude={0.25}
              waveSpeed={0.07}
              enableMouseInteraction={false}
              disableAnimation={false}
            />
          </div>
        </Suspense>
      )}

      {/* Layer 1 — Video */}
      <div className="cinematic-video-wrap">
        {isMobile ? (
          /* Mobile: poster shows instantly, video src deferred via rIC */
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            poster="/videos/poster.jpg"
            preload="none"
          >
            <track kind="captions" />
          </video>
        ) : (
          /* Desktop: load normally */
          <video
            autoPlay
            muted
            playsInline
            preload="none"
            src="/videos/hh_intro.mp4"
          >
            <track kind="captions" />
          </video>
        )}
      </div>

      {/* Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Layer 2 — Title + tagline */}
      <div className="cinematic-title-block">

        {/* ── Cipher title ── */}
        <motion.h1
          className="cinematic-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, delay: 0.2 }}
          style={{ cursor: "default" }}
        >
          {chars.map((char, i) =>
            char === " " ? (
              <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.2em" }} />
            ) : (
              <CipherLetter
                key={i}
                finalChar={char}
                isRevealed={revealed[i]}
                isMobile={isMobile}
              />
            )
          )}
        </motion.h1>

        {/* ── Tagline — fades in once decode completes ── */}
        <motion.p
          className="cinematic-tagline"
          initial={{ opacity: 0, y: 8 }}
          animate={allDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="accent">28–29 March, 2026</span>
          <span className="separator">·</span>
          Assemble your crew. Crack the code. Pull off the perfect build.
        </motion.p>
      </div>
    </section>
  );
}