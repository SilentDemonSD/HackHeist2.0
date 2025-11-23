import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import clsx from "clsx";
import "./timeline.css";

const VIEWBOX = { width: 1200, height: 360 };

const timelineEvents = [
  { id: "doors", time: "09:00", title: "Doors Open", detail: "Check-in & Coffee", t: 0.05 },
  { id: "brief", time: "10:00", title: "Opening Heist Brief", detail: "Rules & intel drop", t: 0.23 },
  { id: "hacking", time: "11:00", title: "Hacking Starts", detail: "24h cyber run", t: 0.43 },
  { id: "review", time: "18:00", title: "Midway Review", detail: "Mentor circuit", t: 0.65 },
  { id: "submit", time: "09:00+1", title: "Submission", detail: "Code freeze & demos", t: 0.9 },
];

const noop = () => { };

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
        <p className="timeline-heading-group__eyebrow"></p>
        <h2>OPERATION TIMELINE</h2>
        <p>Hover the winding road to trace the pulse of HackHeist.</p>
      </div>

      <div
        className="timeline-stage"
        ref={stageRef}
        onMouseMove={handleRoadMove}
        onMouseEnter={handleRoadEnter}
        onMouseLeave={handleRoadLeave}
        onMouseDown={() => setIsDragging(true)}
        role="presentation"
      >
        <svg className="timeline-road" viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <mask id="timeline-road-mask">
              <path d="M40 300 C 220 120, 380 40, 560 160 S 860 350, 1120 180" stroke="white" strokeWidth="20" fill="none" id="road-centerline" />
            </mask>
          </defs>
          <path
            ref={pathRef}
            className="timeline-road__path"
            d="M40 300 C 220 120, 380 40, 560 160 S 860 350, 1120 180"
          />
          <path
            className="timeline-road__dash"
            d="M40 300 C 220 120, 380 40, 560 160 S 860 350, 1120 180"
            strokeDasharray="16 18"
          />
          {wakeSegments.map((segment) => (
            <g
              key={segment.id}
              className="timeline-road__wake"
              transform={`translate(${(segment.x / stageSize.width) * VIEWBOX.width} ${(segment.y / stageSize.height) * VIEWBOX.height}) rotate(${(
                (segment.angle * 180) /
                Math.PI
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
          <span className="timeline-pointer__coin" />
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
                className="timeline-flag"
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
              >
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
    </section>
  );
}
