import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./PreloaderGSAP.css";

const BILL_POOL = 24;
const TIMELINE_TOTAL = 2.4;

export default function PreloaderGSAP({ onFinish = () => {} }) {
  const rootRef = useRef(null);
  const cameraRef = useRef(null);
  const vaultRef = useRef(null);
  const doorHingeRef = useRef(null);
  const dialRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const glowRef = useRef(null);
  const flashRef = useRef(null);
  const billRefs = useRef([]);
  const timelineRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const billIds = useMemo(() => Array.from({ length: BILL_POOL }, (_, i) => i), []);

  const emitBills = useCallback(() => {
    const bills = billRefs.current.filter(Boolean);
    if (!bills.length) return;

    const playableBills = gsap.utils.shuffle(bills).slice(0, gsap.utils.random(18, BILL_POOL));

    playableBills.forEach((bill, index) => {
      const startDelay = index * 0.035;
      const scale = gsap.utils.random(0.85, 1.25);
      const horizontalVector = gsap.utils.random(-220, 220);
      const lift = gsap.utils.random(80, 140);
      const drop = gsap.utils.random(260, 360);
      const total = gsap.utils.random(1.1, 1.9);

      gsap.set(bill, {
        opacity: 1,
        x: 0,
        y: 0,
        scale,
        rotation: gsap.utils.random(-12, 12),
        skewY: gsap.utils.random(-6, 6),
      });

      const billTl = gsap.timeline({ delay: startDelay });
      billTl.to(bill, {
        y: -lift,
        duration: 0.35,
        ease: "power2.out",
      });
      billTl.to(
        bill,
        {
          y: drop,
          duration: total,
          ease: "power2.in",
          onComplete: () => gsap.set(bill, { opacity: 0 }),
        },
        0.32
      );

      gsap.to(
        bill,
        {
          x: horizontalVector,
          duration: total + 0.25,
          ease: "sine.out",
          delay: startDelay,
        }
      );

      gsap.to(
        bill,
        {
          rotation: `+=${gsap.utils.random(-240, 240)}`,
          skewY: gsap.utils.random(-8, 8),
          duration: total,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
          delay: startDelay,
        }
      );
    });
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(motionQuery.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    gsap.set(root, { autoAlpha: 1 });

    if (prefersReducedMotion) {
      const reducedTl = gsap.timeline({
        defaults: { ease: "power1.out" },
        onComplete: onFinish,
      });

      reducedTl.to(root, { autoAlpha: 1, duration: 0.1 });
      reducedTl.to(root, { autoAlpha: 0, duration: 0.4 }, "+=0.8");

      timelineRef.current = reducedTl;
      return () => reducedTl.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: onFinish,
    });
    timelineRef.current = tl;

    gsap.set(
      [
        cameraRef.current,
        vaultRef.current,
        doorHingeRef.current,
        dialRef.current,
        outerRingRef.current,
        innerRingRef.current,
        glowRef.current,
      ].filter(Boolean),
      { clearProps: "all" }
    );

    gsap.set(cameraRef.current, { scale: 0.95, y: 18 });
    gsap.set(doorHingeRef.current, { rotationY: 0, transformOrigin: "left center", transformPerspective: 800 });
    gsap.set(dialRef.current, { rotation: 0 });
    gsap.set([outerRingRef.current, innerRingRef.current], { rotation: 0, transformOrigin: "50% 50%" });
    gsap.set(glowRef.current, { opacity: 0.4 });
    gsap.set(flashRef.current, { autoAlpha: 0 });
    gsap.set(billRefs.current, { opacity: 0 });

    tl.addLabel("start");
    tl.to(glowRef.current, { opacity: 0.8, duration: 0.6 }, "start");
    tl.fromTo(
      outerRingRef.current,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "start+=0.1"
    );

    tl.fromTo(
      innerRingRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 0.85, duration: 0.8 },
      "start+=0.18"
    );

    tl.to(cameraRef.current, { scale: 1, y: 0, duration: 0.8 }, "start");
    tl.to(dialRef.current, { rotation: 160, duration: 0.7, ease: "power3.inOut" }, "start+=0.2");

    tl.to(
      doorHingeRef.current,
      {
        rotationY: -90,
        duration: 1,
        ease: "power3.inOut",
      },
      "start+=0.4"
    );
    tl.fromTo(
      doorHingeRef.current,
      { scaleX: 0.96 },
      { scaleX: 1, duration: 0.3, ease: "elastic.out(1, 0.6)" },
      "start+=0.38"
    );

    tl.to(
      cameraRef.current,
      {
        scale: 1.08,
        y: -6,
        rotateZ: -1.5,
        duration: 0.8,
        ease: "power2.out",
      },
      "start+=1"
    );

    tl.add(() => {
      gsap.fromTo(
        flashRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }, "start+=1");

    tl.add(() => emitBills(), "start+=1.05");

    tl.to(
      root,
      {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.inOut",
      },
      TIMELINE_TOTAL
    );

    const outerRingSpin = gsap.to(outerRingRef.current, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
    });
    const innerRingSpin = gsap.to(innerRingRef.current, {
      rotation: -360,
      duration: 9,
      repeat: -1,
      ease: "none",
    });

    return () => {
      tl.kill();
      outerRingSpin.kill();
      innerRingSpin.kill();
    };
  }, [prefersReducedMotion, emitBills, onFinish]);

  return (
    <div className="preloader-root" ref={rootRef} role="status" aria-live="assertive">
      <div className="preloader-root__ambient" aria-hidden="true" />
      {prefersReducedMotion ? (
        <div className="preloader-simple" aria-live="polite">
          <span className="preloader-simple__dot" />
          <p className="preloader-simple__headline"></p>
        </div>
      ) : (
        <>
          <div className="camera" ref={cameraRef} aria-hidden="true">
            <div className="vault-wrap">
              <div className="vault-glow" ref={glowRef} />
              <div className="vault-ring vault-ring--outer" ref={outerRingRef} />
              <div className="vault-ring vault-ring--inner" ref={innerRingRef} />

              <div className="vault-door" ref={vaultRef}>
                <div className="vault-door__hinge" ref={doorHingeRef} aria-hidden="true">
                  <div className="vault-door__plate">
                    <div className="vault-door__texture" />
                    <div className="vault-dial" ref={dialRef}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bill-layer" aria-hidden="true">
            {billIds.map((id) => (
              <div
                key={id}
                className="bill"
                ref={(el) => {
                  billRefs.current[id] = el;
                }}
              >
                <div className="bill__face" />
              </div>
            ))}
          </div>

          <div className="camera-flash" ref={flashRef} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

