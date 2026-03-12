import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const TIER_PRESETS = {
  'Title Sponsors': { accent: '#FFD700', accentRgb: '255,215,0', baseDuration: 28 },
  'Gold Sponsors':  { accent: '#FFB90F', accentRgb: '255,185,15', baseDuration: 32 },
  'Silver Sponsors':{ accent: '#C0C0C0', accentRgb: '192,192,192', baseDuration: 36 },
  'Community Partners': { accent: '#DC2626', accentRgb: '220,38,38', baseDuration: 30 },
  'Media Partners': { accent: '#B91C1C', accentRgb: '185,28,28', baseDuration: 34 },
};
const FALLBACK = { accent: '#888', accentRgb: '136,136,136', baseDuration: 30 };

/* Minimum pills that must appear in ONE half of the ribbon so it
   always overflows and the blur-fade edges look correct. */
const MIN_PILLS = 16;

function PartnerPill({ name, logo, accent, accentRgb }) {
  return (
    <div
      className="partner-pill flex-shrink-0 flex items-center gap-2.5 h-10 md:h-11
                 px-4 md:px-5 rounded-full border whitespace-nowrap
                 transition-all duration-300"
      style={{
        borderColor: `rgba(${accentRgb},0.15)`,
        background: `linear-gradient(135deg, rgba(${accentRgb},0.06) 0%, rgba(10,10,10,0.7) 100%)`,
      }}
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          className="h-5 md:h-6 w-auto object-contain flex-shrink-0 opacity-85"
        />
      ) : (
        <span
          className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center
                     text-[0.55rem] md:text-[0.6rem] font-bold flex-shrink-0"
          style={{
            background: `rgba(${accentRgb},0.12)`,
            color: accent,
            border: `1px solid rgba(${accentRgb},0.2)`,
          }}
        >
          {name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-[0.72rem] md:text-[0.8rem] font-medium text-white/70 tracking-wide">
        {name}
      </span>
    </div>
  );
}

function InfiniteRibbon({ partners, accent, accentRgb, duration, reverse }) {
  const dir = reverse ? 'reverse' : 'normal';

  /* Build a "half" of the ribbon that is guaranteed to be wider
     than any viewport by repeating the partner list. */
  const reps = Math.max(1, Math.ceil(MIN_PILLS / Math.max(partners.length, 1)));
  const halfPills = useMemo(() => {
    const out = [];
    for (let r = 0; r < reps; r++) {
      partners.forEach((p, i) => out.push({ ...p, _k: `${r}-${i}` }));
    }
    return out;
  }, [partners, reps]);

  return (
    <div className="overflow-hidden flex" aria-hidden="true">
      <div
        className="flex gap-3 md:gap-4 w-max"
        style={{
          animation: `partnerMarquee ${duration}s linear infinite`,
          animationDirection: dir,
        }}
      >
        {halfPills.map((p) => (
          <PartnerPill key={`a-${p._k}`} name={p.name} logo={p.logo} accent={accent} accentRgb={accentRgb} />
        ))}
        {halfPills.map((p) => (
          <PartnerPill key={`b-${p._k}`} name={p.name} logo={p.logo} accent={accent} accentRgb={accentRgb} />
        ))}
      </div>
    </div>
  );
}

function TierRow({ tier, partners, preset, reverse, alignRight }) {
  const { accent, accentRgb, baseDuration } = preset;

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center gap-3 px-1 ${alignRight ? 'flex-row-reverse' : ''}`}>
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
        />
        <span
          className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.22em] font-semibold"
          style={{ color: accent, opacity: 0.9 }}
        >
          {tier}
        </span>
        <div className="flex-1 h-px" style={{ background: `rgba(${accentRgb},0.08)` }} />
      </div>

      <InfiniteRibbon
        partners={partners}
        accent={accent}
        accentRgb={accentRgb}
        duration={baseDuration}
        reverse={reverse}
      />
    </div>
  );
}

export default function ScrollTitleMarquee({ rows, partnerCta = '#' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full select-none"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)',
        }}
      />

      <div className="flex flex-col gap-5 md:gap-6 py-4">
        {rows.map((row, idx) => {
          const preset = TIER_PRESETS[row.tier] || FALLBACK;
          return (
            <TierRow
              key={row.tier || idx}
              tier={row.tier}
              partners={row.partners || []}
              preset={preset}
              reverse={idx % 2 !== 0}
              alignRight={idx % 2 !== 0}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-8 mb-2">
        <a
          href={partnerCta}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                     text-[0.75rem] md:text-[0.82rem] font-semibold tracking-wider uppercase
                     border border-red-800/40 text-red-400/80
                     hover:border-red-600/60 hover:text-red-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]
                     transition-all duration-300 pointer-events-auto"
          style={{ background: 'rgba(220,38,38,0.05)' }}
        >
          Why Sponsor Us?
          <svg
            className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes partnerMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-pill:hover {
          border-color: rgba(255,255,255,0.18) !important;
          background: rgba(255,255,255,0.06) !important;
          box-shadow: 0 0 16px rgba(255,255,255,0.04);
        }
      `}</style>
    </motion.div>
  );
}
