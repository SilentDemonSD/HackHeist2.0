export default function HeroBackground({ isMobile = false }) {
  const videoSrc = isMobile
    ? "/videos/hh_intro_mobile.mp4"
    : "/videos/hh_intro_desktop.mp4";

  return (
    <>
      <video
        src={videoSrc}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <track kind="captions" />
      </video>

      <div className="absolute inset-0 bg-black/60 z-0" />
    </>
  );
}
