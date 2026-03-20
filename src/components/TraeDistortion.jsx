import { useRef, useEffect, useCallback } from "react";

const SLICES = 14;
const MAX_SHIFT = 32;
const EASE = 0.12;
const DPR = 2;
const FONT_SIZE = 25;
const IMG_H = 44;
const GAP = 14;
const PAD = 6;

export default function TraeDistortion({ src, className = "" }) {
  const canvasRef = useRef(null);
  const offscreenRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const offsets = useRef(new Float32Array(SLICES));
  const targets = useRef(new Float32Array(SLICES));
  const rafId = useRef(0);
  const ready = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const off = offscreenRef.current;
    if (!canvas || !off || !ready.current) return;

    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    const sliceH = ch / SLICES;

    let needsUpdate = false;
    for (let i = 0; i < SLICES; i++) {
      const diff = targets.current[i] - offsets.current[i];
      if (Math.abs(diff) > 0.1) {
        offsets.current[i] += diff * EASE;
        needsUpdate = true;
      } else {
        offsets.current[i] = targets.current[i];
      }
    }

    ctx.clearRect(0, 0, cw, ch);
    for (let i = 0; i < SLICES; i++) {
      const sy = i * sliceH;
      ctx.drawImage(off, 0, sy, cw, sliceH, offsets.current[i], sy, cw, sliceH + 0.5);
    }

    if (needsUpdate || mouse.current.active) {
      rafId.current = requestAnimationFrame(draw);
    }
  }, []);

  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(draw);
  }, [draw]);

  const handleMove = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height;
      mouse.current = { x: relX, y: relY, active: true };

      for (let i = 0; i < SLICES; i++) {
        const sliceCenter = (i + 0.5) / SLICES;
        const dist = Math.abs(relY - sliceCenter);
        const influence = Math.max(0, 1 - dist * 2.5);
        targets.current[i] = relX * influence * MAX_SHIFT * (1 + Math.sin(i * 0.8) * 0.3);
      }
      startLoop();
    },
    [startLoop],
  );

  const handleLeave = useCallback(() => {
    mouse.current.active = false;
    targets.current.fill(0);
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    const compose = () => {
      document.fonts.ready.then(() => {
        // Measure text width
        const tmp = document.createElement("canvas").getContext("2d");
        tmp.font = `${FONT_SIZE}px '3rdMan', sans-serif`;
        if (tmp.letterSpacing !== undefined) tmp.letterSpacing = "3px";
        const textW = tmp.measureText("BUILD WITH").width;

        // Image size preserving native aspect ratio
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const imgW = IMG_H * imgAspect;

        const totalW = Math.ceil(PAD + textW + GAP + imgW + PAD);
        const totalH = Math.ceil(IMG_H + 12);

        // Composite offscreen
        const off = document.createElement("canvas");
        off.width = totalW * DPR;
        off.height = totalH * DPR;
        const octx = off.getContext("2d");
        octx.scale(DPR, DPR);

        // Draw text
        octx.font = `${FONT_SIZE}px '3rdMan', sans-serif`;
        if (octx.letterSpacing !== undefined) octx.letterSpacing = "3px";
        octx.fillStyle = "rgba(255,255,255,0.6)";
        octx.textBaseline = "middle";
        octx.fillText("BUILD WITH", PAD, totalH / 2);

        // Draw logo (proper aspect ratio)
        const imgX = PAD + textW + GAP;
        const imgY = (totalH - IMG_H) / 2;
        octx.drawImage(img, imgX, imgY, imgW, IMG_H);

        offscreenRef.current = off;
        ready.current = true;

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = totalW * DPR;
          canvas.height = totalH * DPR;
          canvas.style.width = `${totalW}px`;
          canvas.style.height = `${totalH}px`;
          draw();
        }
      });
    };

    img.onload = compose;
    img.src = src;

    return () => {
      cancelAnimationFrame(rafId.current);
      img.onload = null;
    };
  }, [src, draw]);

  const openTrae = () => window.open("https://www.trae.ai", "_blank", "noopener,noreferrer");

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={openTrae}
      className={className}
      aria-label="Build with Trae — visit trae.ai"
      role="link"
      style={{ cursor: "pointer" }}
    />
  );
}
