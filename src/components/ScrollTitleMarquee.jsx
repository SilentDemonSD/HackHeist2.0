import React, { useRef, useEffect, useState } from 'react';
import useInView from '../hooks/useInView';

const TIER_STYLES = {
  Sponsors: { accent: '#FFD700', accentRgb: '255,215,0' },
  'Community Partners': { accent: '#DC2626', accentRgb: '220,38,38' },
};
const FALLBACK = { accent: '#888', accentRgb: '136,136,136' };

/* ── Single partner card ── */
function PartnerCard({ name, logo, link, accent, accentRgb }) {
  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="partner-card group relative flex flex-col items-center justify-center
                 gap-3 rounded-2xl border px-5 py-6 sm:px-7 sm:py-8
                 transition-all duration-300 hover:scale-[1.04] flex-shrink-0 no-underline"
      style={{
        borderColor: `rgba(${accentRgb},0.12)`,
        background: `linear-gradient(160deg, rgba(${accentRgb},0.06) 0%, rgba(10,10,10,0.85) 100%)`,
        width: 160,
        minWidth: 160,
        cursor: link ? 'pointer' : 'default',
        textDecoration: 'none',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 30px rgba(${accentRgb},0.1), inset 0 0 30px rgba(${accentRgb},0.03)`,
        }}
      />

      {/* Logo area */}
      <div className="flex items-center justify-center h-16 sm:h-20 w-full">
        {logo ? (
          <img
            src={logo}
            alt={name}
            loading="lazy"
            className="h-14 sm:h-16 w-auto max-w-[130px] sm:max-w-[150px] object-contain
                       opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
        ) : (
          <span
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20
                       rounded-xl text-xl sm:text-2xl font-bold"
            style={{
              background: `rgba(${accentRgb},0.1)`,
              color: accent,
              border: `1px solid rgba(${accentRgb},0.18)`,
            }}
          >
            {name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-center whitespace-nowrap"
        style={{ color: `rgba(${accentRgb},0.7)` }}
      >
        {name}
      </span>
    </Wrapper>
  );
}

/* ── Infinite marquee row ── */
function MarqueeRow({ tier, partners, style, reverse }) {
  const { accent, accentRgb } = style;
  const trackRef = useRef(null);
  const [animDuration, setAnimDuration] = useState(30);

  /* Duplicate partners enough times to fill viewport + extra */
  const repeated = partners.length < 4
    ? [...partners, ...partners, ...partners, ...partners]
    : [...partners, ...partners];

  useEffect(() => {
    if (!trackRef.current) return;
    /* Measure one "set" width to determine speed. ~50px/s feels right. */
    const halfW = trackRef.current.scrollWidth / 2;
    setAnimDuration(Math.max(halfW / 50, 12));
  }, [partners.length]);

  const direction = reverse ? 'marquee-reverse' : 'marquee-forward';

  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6">
      {/* Tier label */}
      <div className="flex items-center gap-3 w-full max-w-md px-4">
        <div className="flex-1 h-px" style={{ background: `rgba(${accentRgb},0.1)` }} />
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
          <span
            className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ color: accent, opacity: 0.9 }}
          >
            {tier}
          </span>
        </div>
        <div className="flex-1 h-px" style={{ background: `rgba(${accentRgb},0.1)` }} />
      </div>

      {/* Marquee track with blur-fade edges */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left fade */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }} />
        {/* Right fade */}
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }} />

        <div
          ref={trackRef}
          className="flex w-max gap-4 sm:gap-5 marquee-track"
          style={{
            animation: `${direction} ${animDuration}s linear infinite`,
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {/* First set */}
          {repeated.map((p, i) => (
            <PartnerCard
              key={`a-${p.name}-${i}`}
              name={p.name}
              logo={p.logo}
              link={p.link}
              accent={accent}
              accentRgb={accentRgb}
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {repeated.map((p, i) => (
            <PartnerCard
              key={`b-${p.name}-${i}`}
              name={p.name}
              logo={p.logo}
              link={p.link}
              accent={accent}
              accentRgb={accentRgb}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function ScrollTitleMarquee({ rows, partnerCta = '#' }) {
  const [ref, inView] = useInView({ margin: '0px', once: true });

  return (
    <div
      ref={ref}
      className={`relative w-full select-none transition-opacity duration-700 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <style>{`
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="flex flex-col gap-10 sm:gap-14 py-4">
        {rows.map((row, idx) => {
          const style = TIER_STYLES[row.tier] || FALLBACK;
          /* Sponsors: right-to-left (forward), Community Partners: left-to-right (reverse) */
          const reverse = idx % 2 === 1;
          return (
            <MarqueeRow
              key={row.tier || idx}
              tier={row.tier}
              partners={row.partners || []}
              style={style}
              reverse={reverse}
            />
          );
        })}
      </div>

      {/* CTA button */}
      <div className="flex justify-center mt-8 mb-2">
        <a
          href={partnerCta}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                     text-[0.75rem] md:text-[0.82rem] font-semibold tracking-wider uppercase
                     border border-red-800/40 text-red-400/80
                     hover:border-red-600/60 hover:text-red-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]
                     transition-all duration-300"
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
    </div>
  );
}
