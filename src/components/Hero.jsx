import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import "./CinematicIntro.css";

const Dither = lazy(() => import(/* webpackChunkName: "dither" */ "./Dither"));

const TITLE = "HACK HEIST 2.0";
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!*?^~+=/<>{}[]|\\".split("");
const rand = () => POOL[Math.floor(Math.random() * POOL.length)];


function CipherLetter({ finalChar, isRevealed, isMobile }) {
  const [display, setDisplay] = useState(rand);
  const [isScrambling, setIsScrambling] = useState(true);
  const noiseRef = useRef(null);
  const hoverRef = useRef(null);

  // Live noise while unrevealed; lock to finalChar on reveal
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

  // Per-letter hover re-scramble
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

  // Colour logic
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

export default function Hero() {
  const isMobile = useIsMobile();
  const { chars, revealed, allDone } = useCipherReveal(TITLE);

  const videoSrc = isMobile
    ? "/videos/hh_intro_mobile.mp4"
    : "/videos/hh_intro_desktop.mp4";

  return (
    <section className="cinematic-intro">
      {/* Dither (desktop only) */}
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

      {/* Video */}
      <div className="cinematic-video-wrap">
        <video
          src={videoSrc}
          muted
          autoPlay
          playsInline
          preload="auto"
        >
          <track kind="captions" />
        </video>
      </div>

      {/* Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Layer 2 — Title + tagline */}
      <div className="cinematic-title-block w-full flex flex-col items-center justify-center pointer-events-none z-10">

        {/* 1. Sponsor Row (BUILD WITH + TRAE Logo) */}
        <motion.div
          className="sponsor-row flex items-center justify-center gap-0 mt-20 mb-1 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-montserrat font-bold text-white/80 tracking-[0.25em] text-xl md:text-2xl">BUILD WITH</span>
          <div className="relative flex items-center justify-center">
            {/* Subtle red glow behind logo */}
            <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full scale-150" aria-hidden />
            <motion.img
              src="/trae.png"
              alt="Trae logo"
              className="h-20 md:h-32 w-auto object-contain relative z-10"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* 2. Cipher Main Title */}
        <motion.h1
          className="cinematic-title pointer-events-auto m-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

        {/* 3. Event Tagline */}
        <motion.p
          className="cinematic-tagline pointer-events-auto mt-2 px-4"
          initial={{ opacity: 0 }}
          animate={allDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        >
          <span className="text-[#c53030] font-bold tracking-[0.12em]">28–29 MARCH, 2026</span>
          <span className="mx-3 text-white/20">·</span>
          <span>Assemble your crew. Crack the code. Pull off the perfect build.</span>
        </motion.p>

      </div>
    </section>
  );
}