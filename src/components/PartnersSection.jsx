import React, { useRef, useEffect, useState } from 'react';
import useInView from '../hooks/useInView';

/* ── Tier configuration ── */
const TIERS = [
  {
    name: 'Gold Sponsors',
    tag: 'GOLD',
    accent: '#FFD700',
    accentRgb: '255,215,0',
    cardSize: 'lg',
    partners: [
      { name: 'Trae', logo: '/trae.webp', link: 'https://www.trae.ai' },
      { name: 'ACIC MIET', logo: '/logo/image.png', link: 'https://acicmeerut.org/' },
    ],
  },
  {
    name: 'Silver Sponsors',
    tag: 'SILVER',
    accent: '#C0C0C0',
    accentRgb: '192,192,192',
    cardSize: 'md',
    partners: [
      { name: 'GitHub', logo: '/logo/github.png', link: 'https://github.com' },
      { name: 'BUMP.FM', logo: '/logo/Logo Light Version Bump fm.png', link: 'https://bump.fm' },
    ],
  },
  {
    name: 'In-Kind Sponsors',
    tag: 'IN-KIND',
    accent: '#ff4d4f',
    accentRgb: '255,77,79',
    cardSize: 'sm',
    partners: [
      { name: 'ElevenLabs', logo: '/logo/elevenlabs.png', link: 'https://elevenlabs.io/' },
      { name: '.XYZ', logo: '/logo/xyz.svg', link: 'https://gen.xyz' },
      { name: 'UseQR', logo: '/logo/useqr.svg', link: 'https://www.useqr.codes/' },
    ],
  },
  {
    name: 'Community Partners',
    tag: 'COMMUNITY',
    accent: '#C0C0C0',
    accentRgb: '192,192,192',
    isMarquee: true,
    headingSize: 'text-[0.7rem] sm:text-[0.8rem]',
    partners: [
      { name: 'Technovators', logo: '/logo/techInnovators.jpeg' },
      { name: 'Cloud Hustlers', logo: '/logo/cloud.png' },
      { name: 'Hackholt', logo: '/logo/holt.png' },
      { name: 'Code Crafters', logo: '/logo/CodeCrafters.png' },
      { name: 'Sdiet Techies', logo: '/logo/sdiet.png' },
      { name: 'gdg USICT', logo: '/logo/gdg.png' },
      { name: 'Event Info', logo: '/logo/event.png' },
      { name: 'Tech Masters', logo: '/logo/Tech_Masters.jpeg' }
    ],
  },
];

/* ── Card size presets ── */
const SIZE = {
  lg: {
    card: 'w-[220px] sm:w-[260px] md:w-[280px]',
    inner: 'px-7 py-8 sm:px-9 sm:py-10',
    logoH: 'h-16 sm:h-20 md:h-24',
    logoMax: 'max-w-[180px] sm:max-w-[210px]',
    nameSize: 'text-sm sm:text-base',
    containerH: 'h-20 sm:h-24 md:h-28',
  },
  md: {
    card: 'w-[180px] sm:w-[210px] md:w-[230px]',
    inner: 'px-6 py-6 sm:px-7 sm:py-8',
    logoH: 'h-12 sm:h-14 md:h-16',
    logoMax: 'max-w-[140px] sm:max-w-[170px]',
    nameSize: 'text-xs sm:text-sm',
    containerH: 'h-16 sm:h-20 md:h-22',
  },
  sm: {
    card: 'w-[150px] sm:w-[170px] md:w-[190px]',
    inner: 'px-5 py-5 sm:px-6 sm:py-6',
    logoH: 'h-10 sm:h-12 md:h-14',
    logoMax: 'max-w-[110px] sm:max-w-[130px]',
    nameSize: 'text-[0.65rem] sm:text-xs',
    containerH: 'h-14 sm:h-16 md:h-18',
  },
};

/* ── Sponsor card ── */
const SponsorCard = React.memo(({ partner, size, accent, accentRgb, delay }) => {
  const s = SIZE[size];
  const Wrapper = partner.link ? 'a' : 'div';
  const wrapperProps = partner.link
    ? { href: partner.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`sponsor-card group relative flex flex-col items-center justify-center
                  gap-3 rounded-2xl border overflow-hidden
                  transition-all duration-500 hover:scale-[1.05]
                  ${s.card} reveal-section`}
      style={{
        borderColor: `rgba(${accentRgb},0.12)`,
        background: `linear-gradient(165deg, rgba(${accentRgb},0.07) 0%, rgba(8,8,8,0.95) 60%)`,
        textDecoration: 'none',
        cursor: partner.link ? 'pointer' : 'default',
        '--delay': `${delay}ms`,
        willChange: 'transform',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 5%, rgba(${accentRgb},0.5) 50%, transparent 95%)`,
        }}
      />

      {/* Corner glow - simplified opacity and removed blur filter for optimization */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full
                   opacity-[0.02] group-hover:opacity-[0.05]
                   transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`
        }}
      />

      {/* Bottom glow on hover - focused radial gradient instead of heavy blur filter */}
      <div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full
                   opacity-0 group-hover:opacity-[0.04]
                   transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`
        }}
      />

      {/* Hover border glow - simplified */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 12px rgba(${accentRgb},0.04), 0 0 10px rgba(${accentRgb},0.05)`,
        }}
      />

      <div className={`${s.inner} relative flex flex-col items-center gap-3 w-full`}>
        {/* Logo */}
        <div className={`flex items-center justify-center ${s.containerH} w-full`}>
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              className={`${s.logoH} ${s.logoMax} w-auto object-contain
                         opacity-85 group-hover:opacity-100
                         transition-all duration-500 group-hover:scale-105`}
              /* Removed drop-shadow filter for better performance */
              style={{ transform: 'translateZ(0)' }}
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span
                className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16
                           rounded-xl text-lg sm:text-xl font-bold ${partner.revealingSoon ? 'reveal-soon-icon' : ''}`}
                style={{
                  background: `rgba(${accentRgb},0.1)`,
                  color: accent,
                  border: `1px solid rgba(${accentRgb},0.2)`,
                }}
              >
                {partner.revealingSoon ? '?' : partner.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <span
          className={`${s.nameSize} font-semibold tracking-[0.18em] uppercase text-center
                     whitespace-nowrap transition-colors duration-300 ${partner.revealingSoon ? 'animate-pulse' : ''}`}
          style={{ color: partner.revealingSoon ? accent : `rgba(${accentRgb},0.55)` }}
        >
          {partner.revealingSoon ? 'Revealing Soon' : partner.name}
        </span>
      </div>
    </Wrapper>
  );
});

/* ── Infinite marquee row ── */
const MarqueeRow = React.memo(({ tier, partners, index }) => {
  const trackRef = useRef(null);
  const [animDuration, setAnimDuration] = useState(30);
  const [ref, inView] = useInView({ margin: '-30px', once: true });

  const repeated = partners.length < 8
    ? [...partners, ...partners, ...partners, ...partners]
    : [...partners, ...partners];

  useEffect(() => {
    if (!trackRef.current) return;
    const halfW = trackRef.current.scrollWidth / 2;
    setAnimDuration(Math.max(halfW / 50, 15));
  }, [partners.length]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      {/* Tier header */}
      <div className="flex items-center gap-4 w-full max-w-xl px-4">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${tier.accentRgb},0.2), transparent)` }} />
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full flex-shrink-0 sponsor-tier-dot" style={{ background: tier.accent, boxShadow: `0 0 10px ${tier.accent}` }} />
          <span
            className={`${tier.headingSize || 'text-[0.6rem] sm:text-[0.7rem]'} uppercase tracking-[0.35em] font-bold`}
            style={{ color: tier.accent, fontFamily: "'Montserrat', sans-serif" }}
          >
            {tier.name}
          </span>
        </div>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${tier.accentRgb},0.2), transparent)` }} />
      </div>

      <div className="relative w-full overflow-hidden py-4">
        {/* Fades - optimized to use simple opacity backgrounds */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }} />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }} />

        <div
          ref={trackRef}
          className={`flex w-max gap-4 sm:gap-6 marquee-track ${inView ? 'partners-revealed' : 'partners-hidden'}`}
          style={{
            animation: `marquee-forward ${animDuration}s linear infinite`,
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s ease-out',
            willChange: 'transform',
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {repeated.map((p, i) => (
            <SponsorCard
              key={`${i}-${p.name}`}
              partner={p}
              size="md"
              accent={tier.accent}
              accentRgb={tier.accentRgb}
              delay={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Tier row switch ── */
function TierRow({ tier, index }) {
  if (tier.isMarquee) return <MarqueeRow tier={tier} partners={tier.partners} index={index} />;

  const [ref, inView] = useInView({ margin: '-30px', once: true });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-6 sm:gap-8 ${inView ? '' : ''}`}
    >
      {/* Tier header */}
      <div className="flex items-center gap-4 w-full max-w-xl px-4">
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, transparent, rgba(${tier.accentRgb},0.2), transparent)` }}
        />
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 sponsor-tier-dot"
            style={{
              background: tier.accent,
              boxShadow: `0 0 10px ${tier.accent}, 0 0 20px rgba(${tier.accentRgb},0.3)`,
            }}
          />
          <span
            className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.35em] font-bold"
            style={{
              color: tier.accent,
              fontFamily: "'Montserrat', sans-serif",
              textShadow: `0 0 20px rgba(${tier.accentRgb},0.3)`,
            }}
          >
            {tier.name}
          </span>
        </div>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, transparent, rgba(${tier.accentRgb},0.2), transparent)` }}
        />
      </div>

      {/* Sponsor cards grid */}
      <div
        className={`flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6
                    ${inView ? 'partners-revealed' : 'partners-hidden'}`}
      >
        {tier.partners.map((partner, pIdx) => (
          <SponsorCard
            key={partner.name}
            partner={partner}
            size={tier.cardSize}
            accent={tier.accent}
            accentRgb={tier.accentRgb}
            delay={index * 100 + pIdx * 80}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Partners Section ── */
export default function PartnersSection({ ctaLink = '#' }) {
  const [headRef, headInView] = useInView({ once: true });
  const [bodyRef, bodyInView] = useInView({ once: true });

  return (
    <section id="partners" className="container my-16 py-8">
      {/* Section header */}
      <div
        ref={headRef}
        className={`text-center mb-12 sm:mb-16 reveal-section ${headInView ? 'revealed' : ''}`}
      >
        <span
          className="block text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.45em] uppercase mb-3"
          style={{ color: 'rgba(255,77,79,0.75)', fontFamily: "'Montserrat', sans-serif" }}
        >
          Allied Forces
        </span>
        <h2
          className="text-[clamp(1.9rem,4.5vw,3.6rem)] uppercase tracking-[0.06em] text-white mb-3"
          style={{
            fontFamily: "'3rdMan', 'Montserrat', sans-serif",
            fontWeight: 'normal',
            lineHeight: 1.1,
            cursor: 'default',
          }}
        >
          Our Partners
        </h2>
        <p
          className="text-[0.82rem] md:text-[0.88rem] text-white/45 max-w-md mx-auto"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '0.02em',
          }}
        >
          The masterminds backing this heist.
        </p>
      </div>

      {/* Tier rows */}
      <div
        ref={bodyRef}
        className={`flex flex-col gap-12 sm:gap-16 reveal-section ${bodyInView ? 'revealed' : ''}`}
        style={{ '--delay': '100ms' }}
      >
        {TIERS.map((tier, idx) => (
          <TierRow key={tier.tag} tier={tier} index={idx} />
        ))}
      </div>

      {/* CTA button */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
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

      <style>{`
        .partners-hidden .sponsor-card {
          opacity: 0;
          transform: translateY(24px) scale(0.96);
        }
        .partners-revealed .sponsor-card {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--delay, 0ms);
        }
        .sponsor-tier-dot {
          animation: tierPulse 2.5s ease-in-out infinite;
        }
        @keyframes tierPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          will-change: transform;
        }
        .reveal-soon-icon {
          animation: mysteryPulse 2s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(192, 192, 192, 0.1);
        }
        @keyframes mysteryPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; filter: brightness(1.2); }
        }
      `}</style>
    </section>
  );
}
