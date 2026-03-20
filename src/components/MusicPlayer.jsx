import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_SRC = "/music/bella_ciao.mp3";
const KEY_VOLUME = "hh_music_vol";
const KEY_PLAYING = "hh_music_playing";

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function Waveform({ playing }) {
  return (
    <span className="flex items-end gap-[2px] h-3.5" aria-hidden>
      {[1, 2, 3, 4, 3].map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-current"
          style={{
            height: playing ? `${h * 3}px` : "3px",
            animation: playing
              ? `hh-wave ${0.5 + i * 0.12}s ease-in-out infinite alternate`
              : "none",
            transition: "height 0.3s",
          }}
        />
      ))}
    </span>
  );
}

function VolIcon({ vol }) {
  if (vol === 0)
    return (
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v3M8 23h8" />
      </svg>
    );
  if (vol < 0.5)
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 9H3a1 1 0 00-1 1v4a1 1 0 001 1h3l4 4V5L6 9zm10.54 0a5 5 0 010 6" />
      </svg>
    );
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  );
}

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() =>
    parseFloat(localStorage.getItem(KEY_VOLUME) ?? "0.35"),
  );
  const [expanded, setExpanded] = useState(false); // show volume panel
  const [showHint, setShowHint] = useState(true); // show "Play BGM" nudge
  const [visible, setVisible] = useState(true);

  const initAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const savedVol = parseFloat(localStorage.getItem(KEY_VOLUME) ?? "0.35");
    const audio = new Audio();
    audio.preload = "none";
    audio.loop = true;
    audio.volume = clamp(savedVol, 0, 1);
    audio.src = MUSIC_SRC; // fetch starts here, on demand
    audioRef.current = audio;
    return audio;
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = clamp(volume, 0, 1);
    localStorage.setItem(KEY_VOLUME, String(volume));
  }, [volume]);

  const toggle = useCallback(() => {
    setShowHint(false);

    if (playing) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setPlaying(false);
        localStorage.setItem(KEY_PLAYING, "false");
      }
    } else {
      const audio = initAudio();
      audio
        .play()
        .then(() => {
          setPlaying(true);
          localStorage.setItem(KEY_PLAYING, "true");
        })
        .catch(() => {});
    }
  }, [playing, initAudio]);

  const handleVolume = useCallback(
    (e) => {
      const v = parseFloat(e.target.value);
      setVolume(v);
      if (audioRef.current) {
        audioRef.current.volume = v;
        if (v > 0 && !playing) toggle();
      }
    },
    [playing, toggle],
  );

  useEffect(() => {
    if (playing) return;
    const t = setTimeout(() => setVisible(false), 14000);
    return () => clearTimeout(t);
  }, [playing]);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("mousemove", show, { passive: true });
    window.addEventListener("touchstart", show, { passive: true });
    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("touchstart", show);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const close = (e) => {
      if (!e.target.closest("[data-music-player]")) setExpanded(false);
    };
    document.addEventListener("pointerdown", close, { passive: true });
    return () => document.removeEventListener("pointerdown", close);
  }, [expanded]);

  return (
    <>
      <style>{`
        @keyframes hh-wave {
          from { transform: scaleY(0.35); }
          to   { transform: scaleY(1); }
        }
        .hh-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
        }
        .hh-slider::-webkit-slider-runnable-track {
          height: 3px;
          border-radius: 9px;
          background: rgba(255,255,255,0.12);
        }
        .hh-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 13px; height: 13px;
          border-radius: 50%;
          background: #ef4444;
          margin-top: -5px;
          box-shadow: 0 0 8px rgba(239,68,68,0.6);
          transition: transform 0.15s;
        }
        .hh-slider:hover::-webkit-slider-thumb { transform: scale(1.25); }
        .hh-slider::-moz-range-track {
          height: 3px; border-radius: 9px;
          background: rgba(255,255,255,0.12);
        }
        .hh-slider::-moz-range-thumb {
          width: 13px; height: 13px; border: none;
          border-radius: 50%; background: #ef4444;
          box-shadow: 0 0 8px rgba(239,68,68,0.6);
        }
      `}</style>

      <AnimatePresence>
        {showHint && (
          <motion.button
            key="hint"
            data-music-player
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={toggle}
            className="fixed bottom-[4.5rem] right-5 z-[9998] px-4 py-2 rounded-full
                       text-[0.62rem] font-semibold uppercase tracking-[0.2em]
                       bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.55)]
                       hover:bg-red-500 transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ▶ Play BGM
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="player"
            data-music-player
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-2"
          >
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="vol-panel"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="px-4 py-3.5 rounded-2xl backdrop-blur-xl border border-white/[0.08]"
                  style={{ background: "rgba(8,8,8,0.88)", minWidth: 180 }}
                >
                  <div className="mb-3">
                    <p
                      className="text-[0.6rem] uppercase tracking-[0.25em] text-red-500/70 mb-0.5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Now Playing
                    </p>
                    <p
                      className="text-[0.78rem] font-semibold text-white/90 flex items-center gap-1.5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span>Bella Ciao</span>
                      {playing && <Waveform playing />}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-white/40 shrink-0">
                      <VolIcon vol={volume} />
                    </span>
                    <div className="flex-1 relative flex items-center">
                      <div
                        className="absolute left-0 h-[3px] rounded-full bg-red-500/60 pointer-events-none"
                        style={{ width: `${volume * 100}%` }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolume}
                        className="hh-slider relative z-10"
                        aria-label="Volume"
                      />
                    </div>
                    <span
                      className="text-[0.62rem] text-white/35 w-6 text-right tabular-nums shrink-0"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {Math.round(volume * 100)}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setExpanded((v) => !v)}
                aria-label="Toggle volume panel"
                className="flex h-9 w-9 items-center justify-center rounded-full
                           border backdrop-blur-md transition-all duration-300"
                style={{
                  background: "rgba(0,0,0,0.72)",
                  borderColor: expanded ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.1)",
                  color: expanded ? "#ef4444" : "rgba(255,255,255,0.4)",
                }}
              >
                <VolIcon vol={volume} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                aria-label={playing ? "Pause background music" : "Play background music"}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-full
                           backdrop-blur-md border transition-all duration-300 select-none group"
                style={{
                  background: "rgba(0,0,0,0.72)",
                  borderColor: playing ? "rgba(220,38,38,0.45)" : "rgba(255,255,255,0.1)",
                  boxShadow: playing
                    ? "0 0 22px rgba(220,38,38,0.22), inset 0 0 12px rgba(220,38,38,0.04)"
                    : "none",
                  color: playing ? "#ef4444" : "rgba(255,255,255,0.45)",
                }}
              >
                <span className="text-xs font-mono" aria-hidden>
                  {playing ? "❚❚" : "▶"}
                </span>
                {playing ? (
                  <Waveform playing />
                ) : (
                  <span
                    className="text-[0.6rem] uppercase tracking-[0.18em] font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    BGM
                  </span>
                )}
                <span
                  className="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg
                                 text-[0.6rem] font-medium uppercase tracking-widest
                                 bg-black/90 text-white/70 whitespace-nowrap
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                 pointer-events-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {playing ? "Pause music" : "Play Bella Ciao"}
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
