import { motion } from "framer-motion";
import React from "react";
import Dither from "./Dither";
import "./CinematicIntro.css";

export default function Hero() {
  return (
    <section className="cinematic-intro">
      {/* Layer 0 (BOTTOM) — Dark crimson dither BEHIND the video.
           waveColor ~0.35 red survives the shader's 0.2 bias to produce
           visible dither, but stays dim enough that lighten blend protects
           the bright building facade.  As the video zooms out and exposes
           more black sky, the dither gradually fills the background. */}
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

      {/* Layer 1 (MIDDLE) — Video with lighten blend
           Black areas → show dither through
           Building (white/gray) → stays clean, always brighter than dither */}
      <div className="cinematic-video-wrap">
        <video
          src="/videos/hh_intro.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Edge vignettes for cinematic framing */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Layer 2 (TOP) — Title + tagline */}
      <div className="cinematic-title-block">
        <motion.h1
          className="cinematic-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          HACK HEIST
        </motion.h1>

        <motion.p
          className="cinematic-tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
        >
          <span className="accent">28–29 March, 2026</span>
          <span className="separator">·</span>
          Assemble your crew. Crack the code. Pull off the perfect build.
        </motion.p>
      </div>
    </section>
  );
}