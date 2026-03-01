import { motion } from "framer-motion";
import React, { lazy, Suspense, useRef, useLayoutEffect, useState } from "react";
import DevfolioApply from "./DevfolioApply";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <HeroBackground />
      {/* Background elements */}
      <div className="absolute inset-0 z-0"></div> {/* This div was incomplete in the instruction, closing it here */}

      {/* Main content grid */}
      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >

            {/* TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="hero-title text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.9]"
            >
              HACK HEIST <br />
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
            {/* Using light theme and inverting it via CSS to achieve a pure black background */}
            <div className="invert grayscale contrast-125">
              <DevfolioApply slug="hack-heist-2" theme="light" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.08] animate-scanline z-10" />
    </section>
  );
}