import React from "react";

export default function HeroBackground() {
  return (
    <>
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        poster="/videos/poster.jpg"
      >
        <source src="/videos/hh_intro.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />
    </>
  );
}
