import { useState, useEffect, useRef, lazy, Suspense } from "react";
import useIsMobile from "../hooks/useIsMobile";
import useReducedMotion from "../hooks/useReducedMotion";
import TraeDistortion from "./TraeDistortion";
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

  useEffect(() => {
    if (noiseRef.current) clearInterval(noiseRef.current);
    if (isRevealed) {
      setDisplay(finalChar);
      setIsScrambling(false);
      return;
    }
    setIsScrambling(true);
    noiseRef.current = setInterval(() => setDisplay(rand()), isMobile ? 150 : 55);
    return () => {
      if (noiseRef.current) clearInterval(noiseRef.current);
    };
  }, [isRevealed, finalChar, isMobile]);

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

  useEffect(
    () => () => {
      if (noiseRef.current) clearInterval(noiseRef.current);
      if (hoverRef.current) clearInterval(hoverRef.current);
    },
    [],
  );

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

function useCipherReveal(text, startDelay = 380) {
  const chars = text.split("");
  const [revealed, setRevealed] = useState(() => chars.map((c) => c === " "));
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let ci = 0;

    const timer = setTimeout(function advance() {
      if (cancelled) return;
      if (ci >= chars.length) {
        setAllDone(true);
        return;
      }
      if (chars[ci] === " ") {
        ci++;
        setTimeout(advance, 20);
        return;
      }

      const idx = ci++;
      setTimeout(() => {
        if (cancelled) return;
        setRevealed((prev) => {
          const n = [...prev];
          n[idx] = true;
          return n;
        });
        setTimeout(advance, 60);
      }, 110);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []); // oxlint-disable-line react-hooks/exhaustive-deps

  return { chars, revealed, allDone };
}

function HeroVideo({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Ensure playback starts even if autoPlay attribute is blocked
    video.play().catch(() => {});
  }, [src]);

  return (
    <video ref={videoRef} src={src} muted autoPlay playsInline preload="auto" aria-hidden="true">
      <track kind="captions" />
    </video>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { chars, revealed, allDone } = useCipherReveal(TITLE);

  const videoSrc = isMobile ? "/videos/hh_intro_mobile.mp4" : "/videos/hh_intro_desktop.mp4";

  return (
    <section className="cinematic-intro">
      {isMobile ? (
        <div className="cinematic-dither-bg cinematic-mobile-bg" />
      ) : (
        <Suspense
          fallback={<div className="cinematic-dither-bg" style={{ background: "rgb(40,5,2)" }} />}
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
              disableAnimation={prefersReducedMotion}
            />
          </div>
        </Suspense>
      )}

      <div className="cinematic-video-wrap">
        <HeroVideo src={videoSrc} />
      </div>

      <div className="cinematic-vignette" aria-hidden="true" />

      <div className="cinematic-title-block">
        <div
          className="sponsor-row hero-entry"
          style={{ "--hero-y": "-12px", "--hero-dur": "0.7s", "--hero-delay": "0.1s" }}
        >
          {isMobile ? (
            <>
              <span className="sponsor-label">BUILD WITH</span>
              <img
                src="/trae.webp"
                alt="Trae logo"
                width={90}
                height={32}
                className="sponsor-trae-static"
                onClick={() => window.open("https://www.trae.ai", "_blank", "noopener,noreferrer")}
                style={{ cursor: "pointer" }}
                loading="eager"
                fetchPriority="high"
              />
            </>
          ) : (
            <TraeDistortion src="/trae.webp" className="sponsor-canvas" />
          )}
        </div>

        <h1
          className="cinematic-title hero-entry"
          style={{
            cursor: "default",
            willChange: "auto",
            "--hero-y": "30px",
            "--hero-dur": "0.8s",
            "--hero-delay": "0.25s",
          }}
        >
          {chars.map((char, i) =>
            char === " " ? (
              <span
                key={i}
                aria-hidden="true"
                style={{ display: "inline-block", width: "0.2em" }}
              />
            ) : (
              <CipherLetter key={i} finalChar={char} isRevealed={revealed[i]} isMobile={isMobile} />
            ),
          )}
        </h1>

        <p
          className={`cinematic-tagline hero-tagline${allDone ? " visible" : ""}`}
          style={{ willChange: "auto" }}
        >
          <span className="accent">28–29 March, 2026</span>
          <span className="separator">·</span>
          Assemble your crew. Crack the code. Pull off the perfect build.
        </p>
      </div>
    </section>
  );
}
