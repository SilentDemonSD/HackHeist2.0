import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import clsx from "clsx";
import "./timeline.css";

const VIEWBOX = { width: 2400, height: 360 };
const PATH_D = "M 60 295 C 240 165, 460 112, 660 197 S 940 315, 1160 222 S 1380 112, 1600 197 S 1860 315, 2060 222 S 2240 128, 2360 171";

// 13 events spanning 09:00 Day 1 → 17:00 Day 2 (32h total)
// t formula: 0.03 + (hoursFromStart / 32) * 0.94
const timelineEvents = [
  { id: "checkin",   day: 1, time: "09:00", title: "Doors Open",        detail: "Registration & welcome kit",      t: 0.03, above: true  },
  { id: "brief",     day: 1, time: "10:00", title: "Opening Ceremony",  detail: "Kickoff, rules & intel briefing", t: 0.07, above: false },
  { id: "hacking",   day: 1, time: "11:00", title: "Hacking Begins",    detail: "Clock starts — 30h to crack",     t: 0.12, above: true  },
  { id: "lunch",     day: 1, time: "13:00", title: "Lunch Break",       detail: "Fuel up — 45 min",               t: 0.18, above: false },
  { id: "snack",     day: 1, time: "16:00", title: "Snack Break",       detail: "Coffee & quick bites",           t: 0.27, above: true  },
  { id: "dinner",    day: 1, time: "20:00", title: "Dinner",            detail: "Evening refuel",                 t: 0.38, above: true },
  { id: "mentor",    day: 1, time: "22:00", title: "Mentor Rounds",     detail: "Guidance & feedback circuit",    t: 0.45, above: true  },
  { id: "midnight",  day: 2, time: "00:00", title: "Midnight Snacks",   detail: "Night fuel drop",                t: 0.51, above: false },
  { id: "dawn",      day: 2, time: "03:00", title: "Dawn Coffee",       detail: "Survival kit distribution",      t: 0.57, above: false  },
  { id: "breakfast", day: 2, time: "07:00", title: "Breakfast",         detail: "Morning meal before final push",  t: 0.65, above: false },
  { id: "freeze",    day: 2, time: "11:00", title: "Code Freeze",       detail: "Submissions close — push it",    t: 0.74, above: true  },
  { id: "judging",   day: 2, time: "14:00", title: "Judging Begins",    detail: "Panel evaluates all builds",     t: 0.85, above: true },
  { id: "ceremony",  day: 2, time: "17:00", title: "Closing Ceremony",  detail: "Results, awards & wrap-up",      t: 0.97, above: false  },
];

const noop = () => { };

/* ─── Heist Getaway Car — top-down view, nose faces RIGHT (0°) ─── */
function HeistCar() {
  return (
    <svg
      viewBox="0 0 60 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 60, height: 28, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="hcBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#252838" />
          <stop offset="55%"  stopColor="#141620" />
          <stop offset="100%" stopColor="#0b0c12" />
        </linearGradient>
        <radialGradient id="hcRoof" cx="55%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#32364e" />
          <stop offset="100%" stopColor="#151720" />
        </radialGradient>
        <radialGradient id="hcShadow" cx="50%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="30" cy="17" rx="25" ry="8" fill="url(#hcShadow)" />

      {/* ── Main body ── */}
      <path
        d="M8 14 C8 7,13 3,22 3 L40 3 C51 3,56 7,56 14 C56 21,51 25,40 25 L22 25 C13 25,8 21,8 14Z"
        fill="url(#hcBody)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.6"
      />

      {/* Red accent pinstripes */}
      <path d="M22 3.8 L40 3.8" stroke="rgba(255,77,79,0.6)"  strokeWidth="0.9" strokeLinecap="round" />
      <path d="M22 24.2 L40 24.2" stroke="rgba(255,77,79,0.6)" strokeWidth="0.9" strokeLinecap="round" />

      {/* ── Roof dome ── */}
      <path
        d="M20 14 C20 10,23 8,30 8 L34 8 C42 8,43 10,43 14 C43 18,42 20,34 20 L30 20 C23 20,20 18,20 14Z"
        fill="url(#hcRoof)"
      />
      {/* Roof highlight glint */}
      <ellipse cx="33" cy="11" rx="5.5" ry="1.4" fill="rgba(255,255,255,0.065)" />

      {/* ── Front windshield (right / nose side) ── */}
      <path
        d="M43 9.5 L50.5 11.5 L50.5 16.5 L43 18.5 Z"
        fill="rgba(80,175,255,0.18)"
        stroke="rgba(140,210,255,0.22)"
        strokeWidth="0.5"
      />
      {/* ── Rear window (left / tail side) ── */}
      <path
        d="M20 9.5 L13 11.5 L13 16.5 L20 18.5 Z"
        fill="rgba(80,175,255,0.12)"
        stroke="rgba(140,210,255,0.16)"
        strokeWidth="0.5"
      />

      {/* ── Headlights (front / right) ── */}
      <ellipse cx="54.5" cy="10.5" rx="2.4" ry="1.7" fill="#fff9e0" opacity="0.93" />
      <ellipse cx="54.5" cy="17.5" rx="2.4" ry="1.7" fill="#fff9e0" opacity="0.93" />
      <ellipse cx="54.5" cy="10.5" rx="1.1" ry="0.9" fill="white" />
      <ellipse cx="54.5" cy="17.5" rx="1.1" ry="0.9" fill="white" />

      {/* ── Tail lights (rear / left) ── */}
      <ellipse cx="7.5" cy="10.5" rx="2.2" ry="1.6" fill="#ff4d4f" />
      <ellipse cx="7.5" cy="17.5" rx="2.2" ry="1.6" fill="#ff4d4f" />
      {/* inner glow */}
      <ellipse cx="7.5" cy="10.5" rx="1.0" ry="0.8" fill="#ff8080" />
      <ellipse cx="7.5" cy="17.5" rx="1.0" ry="0.8" fill="#ff8080" />

      {/* ── Rear spoiler ── */}
      <rect x="5.5" y="9.5" width="2.2" height="9" rx="1.1"
        fill="#1a1b28" stroke="rgba(255,77,79,0.55)" strokeWidth="0.7" />

      {/* ── Wheel-arch recesses ── */}
      <rect x="14" y="0.5"  width="9" height="5.5" rx="2.2" fill="#08090e" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <rect x="37" y="0.5"  width="9" height="5.5" rx="2.2" fill="#08090e" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <rect x="14" y="22"   width="9" height="5.5" rx="2.2" fill="#08090e" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <rect x="37" y="22"   width="9" height="5.5" rx="2.2" fill="#08090e" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* ── Tires (rubber) ── */}
      <ellipse cx="18.5" cy="3"  rx="3.8" ry="2.4" fill="#191921" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" />
      <ellipse cx="41.5" cy="3"  rx="3.8" ry="2.4" fill="#191921" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" />
      <ellipse cx="18.5" cy="25" rx="3.8" ry="2.4" fill="#191921" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" />
      <ellipse cx="41.5" cy="25" rx="3.8" ry="2.4" fill="#191921" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" />

      {/* ── Alloy rims ── */}
      <ellipse cx="18.5" cy="3"  rx="2"   ry="1.3" fill="#3a3b52" />
      <ellipse cx="41.5" cy="3"  rx="2"   ry="1.3" fill="#3a3b52" />
      <ellipse cx="18.5" cy="25" rx="2"   ry="1.3" fill="#3a3b52" />
      <ellipse cx="41.5" cy="25" rx="2"   ry="1.3" fill="#3a3b52" />
      {/* rim center dot */}
      <circle cx="18.5" cy="3"  r="0.7" fill="#5a5c78" />
      <circle cx="41.5" cy="3"  r="0.7" fill="#5a5c78" />
      <circle cx="18.5" cy="25" r="0.7" fill="#5a5c78" />
      <circle cx="41.5" cy="25" r="0.7" fill="#5a5c78" />

      {/* Hood center crease */}
      <path d="M44 14 L50 14" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

export default function Timeline({
  onHoverFlag = noop,
  onLeaveFlag = noop,
  onRoadEnter = noop,
  onRoadLeave = noop,
}) {
  const stageRef = useRef(null);
  const pathRef = useRef(null);
  const pathLengthRef = useRef(0);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [roadActive, setRoadActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pointerState, setPointerState] = useState("idle");
  const [pointerAngle, setPointerAngle] = useState(0);
  const [tailSamples, setTailSamples] = useState([]);
  const [pulseVisible, setPulseVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [wakeSegments, setWakeSegments] = useState([]);
  const [activeFlag, setActiveFlag] = useState(null);

  const pointerX = useSpring(0, { stiffness: 280, damping: 22 });
  const pointerY = useSpring(0, { stiffness: 280, damping: 22 });
  const pointerScale = useSpring(1, { stiffness: 240, damping: 18 });

  useLayoutEffect(() => {
    if (pathRef.current) {
      pathLengthRef.current = pathRef.current.getTotalLength();
    }
  }, []);

  useEffect(() => {
    if (!stageRef.current) return undefined;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStageSize({ width, height });
    });
    resizeObserver.observe(stageRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (pointerState === "flag") {
      pointerScale.set(1.6);
    } else if (roadActive) {
      pointerScale.set(1.15);
    } else {
      pointerScale.set(1);
    }
  }, [pointerState, roadActive, pointerScale]);

  const projectToPath = useCallback(
    (clientX) => {
      if (!pathRef.current || !stageRef.current || !stageSize.width) return null;
      const bounds = stageRef.current.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - bounds.left) / bounds.width, 0), 1);
      const pathLength = pathLengthRef.current;
      const targetLength = pathLength * ratio;
      const point = pathRef.current.getPointAtLength(targetLength);
      const ahead = pathRef.current.getPointAtLength(Math.min(targetLength + 8, pathLength));

      const px = (point.x / VIEWBOX.width) * stageSize.width;
      const py = (point.y / VIEWBOX.height) * stageSize.height;
      pointerX.set(px);
      pointerY.set(py);
      const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x);
      setPointerAngle(angle);

      setTailSamples((prev) => {
        const next = [...prev, { x: px, y: py }];
        return next.slice(-4);
      });

      return { px, py, angle };
    },
    [pointerX, pointerY, stageSize]
  );

  const registerWake = useCallback((segment) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : String(performance.now());
    setWakeSegments((prev) => [...prev, { id, ...segment }]);
    setTimeout(() => {
      setWakeSegments((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  }, []);

  const spawnConfetti = useCallback((origin) => {
    const shards = Array.from({ length: 3 }).map((_, idx) => ({
      id: `${origin}-${idx}-${Math.random()}`,
      rotate: Math.random() * 120 - 60,
      delay: idx * 0.04,
    }));
    setConfetti(shards);
    setTimeout(() => setConfetti([]), 450);
  }, []);

  const handleRoadMove = useCallback(
    (event) => {
      const projected = projectToPath(event.clientX);
      if (projected && isDragging) {
        registerWake({
          x: projected.px,
          y: projected.py,
          angle: projected.angle,
        });
      }
    },
    [isDragging, projectToPath, registerWake]
  );

  const handleRoadEnter = useCallback(() => {
    setRoadActive(true);
    onRoadEnter();
  }, [onRoadEnter]);

  const handleRoadLeave = useCallback(() => {
    setRoadActive(false);
    setPointerState("idle");
    onRoadLeave();
  }, [onRoadLeave]);

  useEffect(() => {
    const upHandler = () => setIsDragging(false);
    window.addEventListener("mouseup", upHandler);
    window.addEventListener("mouseleave", upHandler);
    return () => {
      window.removeEventListener("mouseup", upHandler);
      window.removeEventListener("mouseleave", upHandler);
    };
  }, []);

  useEffect(() => {
    if (!stageSize.width || !pathLengthRef.current || !pathRef.current) return;
    const start = pathRef.current.getPointAtLength(pathLengthRef.current * 0.02);
    pointerX.set((start.x / VIEWBOX.width) * stageSize.width);
    pointerY.set((start.y / VIEWBOX.height) * stageSize.height);
  }, [stageSize, pointerX, pointerY]);

  const eventMarkers = (() => {
    if (!pathLengthRef.current || !pathRef.current) {
      return timelineEvents.map((event) => ({ event, x: 0, y: 0 }));
    }
    return timelineEvents.map((event) => {
      const point = pathRef.current.getPointAtLength(pathLengthRef.current * event.t);
      return { event, x: point.x, y: point.y };
    });
  })();

  return (
    <section className="timeline-section" aria-label="Heist timeline">
      <div className="timeline-heading-group">
        <p className="timeline-heading-group__eyebrow">Operation</p>
        <h2 style={{ cursor: "default" }}>
          {"OPERATION TIMELINE".split("").map((char, i) =>
            char === " " ? (
              <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "0.2em" }} />
            ) : (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.038,
                  duration: 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ color: "#ff4d4f", y: -6, transition: { duration: 0.14 } }}
              >
                {char}
              </motion.span>
            )
          )}
        </h2>
        <p>Hover the winding road to trace the pulse of HackHeist.</p>
      </div>

      <p className="timeline-touch-hint">&#8592; scroll to trace the heist timeline &#8594;</p>

      <div className="timeline-scroll-wrap">
        <div
          className="timeline-stage"
          ref={stageRef}
          onMouseMove={handleRoadMove}
          onMouseEnter={handleRoadEnter}
          onMouseLeave={handleRoadLeave}
          onMouseDown={() => setIsDragging(true)}
          role="presentation"
        >
          <div className="timeline-stage-grid" aria-hidden="true" />

          {/* Day labels */}
          <div className="timeline-day-label timeline-day-label--1" aria-hidden="true">DAY 1</div>
          <div className="timeline-day-label timeline-day-label--2" aria-hidden="true">DAY 2</div>

          <svg className="timeline-road" viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} preserveAspectRatio="xMidYMid meet">
            <defs>
              <mask id="timeline-road-mask">
                <path d={PATH_D} stroke="white" strokeWidth="20" fill="none" />
              </mask>
            </defs>
            <path className="timeline-road__path-glow" d={PATH_D} />
            <path className="timeline-road__surface" d={PATH_D} />
            <path ref={pathRef} className="timeline-road__path" d={PATH_D} />
            <path className="timeline-road__dash" d={PATH_D} strokeDasharray="16 18" />
            <path className="timeline-road__edge-l" d={PATH_D} />
            <path className="timeline-road__edge-r" d={PATH_D} />
            {wakeSegments.map((segment) => (
              <g
                key={segment.id}
                className="timeline-road__wake"
                transform={`translate(${(segment.x / stageSize.width) * VIEWBOX.width} ${(segment.y / stageSize.height) * VIEWBOX.height}) rotate(${(
                  (segment.angle * 180) / Math.PI
                ).toFixed(2)})`}
              >
                <rect x="-40" y="-2" width="80" height="4" rx="2" />
              </g>
            ))}
          </svg>

          <div className="timeline-pointer__trail-layer" aria-hidden="true">
            {tailSamples.map((sample, index) => (
              <span
                key={`${sample.x}-${sample.y}-${index}`}
                className="timeline-pointer__trail-dot"
                style={{
                  left: sample.x,
                  top: sample.y,
                  opacity: 1 - index * 0.25,
                  transform: `scale(${1 - index * 0.2})`,
                }}
              />
            ))}
          </div>

          <motion.div
            className={clsx("timeline-pointer", { "timeline-pointer--active": roadActive })}
            style={{
              x: pointerX,
              y: pointerY,
              scale: pointerScale,
              rotate: `${(pointerAngle * 180) / Math.PI}deg`,
            }}
          >
            <HeistCar />
            {pulseVisible && <span className="timeline-pointer__pulse" />}
            {confetti.map((shard) => (
              <span
                key={shard.id}
                className="timeline-pointer__confetti"
                style={{
                  transform: `rotate(${shard.rotate}deg)`,
                  animationDelay: `${shard.delay}s`,
                }}
              />
            ))}
          </motion.div>

          <div className="timeline-events">
            {eventMarkers.map(({ event, x, y }) => {
              const left = stageSize.width ? (x / VIEWBOX.width) * stageSize.width : 0;
              const top = stageSize.height ? (y / VIEWBOX.height) * stageSize.height : 0;
              return (
                <button
                  key={event.id}
                  type="button"
                  className={clsx("timeline-flag", {
                    "timeline-flag--above": event.above,
                    "timeline-flag--active": activeFlag === event.id,
                  })}
                  style={{ left, top }}
                  onMouseEnter={() => {
                    setPointerState("flag");
                    setPulseVisible(true);
                    spawnConfetti(event.id);
                    onHoverFlag(event);
                  }}
                  onMouseLeave={() => {
                    setPointerState("idle");
                    setPulseVisible(false);
                    onLeaveFlag(event);
                  }}
                  onClick={() =>
                    setActiveFlag((prev) => (prev === event.id ? null : event.id))
                  }
                >
                  <span className="timeline-flag__pin" aria-hidden="true" />
                  <span className="timeline-flag__pole" />
                  <span className="timeline-flag__label">
                    <span className="timeline-flag__time">{event.time}</span>
                    <span className="timeline-flag__title">{event.title}</span>
                    <span className="timeline-flag__detail">{event.detail}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* legacy mobile vertical list removed — road UI used on all screens */}
    </section>
  );
}
