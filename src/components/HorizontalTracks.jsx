import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── SVG Icons ─────────────────────────────────────────────── */
const BrainIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /></svg>;
const LayersIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
const ShieldIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 5.48.97 7 2a1 1 0 0 1 1 1v7z" /></svg>;
const ZapIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const CpuIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>;
const CodeIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;

/* ── Track data ────────────────────────────────────────────── */
const TRACKS = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    tagline: 'Teach Machines to Think',
    description:
      'Build intelligent systems that learn, reason, and adapt. From computer vision pipelines and NLP engines to generative AI tools — push the boundaries of what machines can understand and create using cutting-edge models, frameworks, and real-world datasets.',
    icon: <BrainIcon className="w-6 h-6" />,
    accent: '#ff4d4f',
  },
  {
    id: 'web3',
    title: 'Web3 & Blockchain',
    tagline: 'Decentralise Everything',
    description:
      'Architect the next generation of trustless applications. Design smart contracts, build DeFi protocols, create NFT ecosystems, or develop DAOs — leverage blockchain technology to rethink ownership, identity, and value exchange on the decentralised web.',
    icon: <LayersIcon className="w-6 h-6" />,
    accent: '#00d2be',
  },
  {
    id: 'cybersec',
    title: 'Cybersecurity',
    tagline: 'Defend the Digital Frontier',
    description:
      'Identify zero-day vulnerabilities, build intrusion-detection systems, craft threat-intelligence dashboards, or engineer secure-by-design architectures. Protect critical infrastructure and digital assets from increasingly sophisticated modern attack vectors.',
    icon: <ShieldIcon className="w-6 h-6" />,
    accent: '#ff4d4f',
  },
  {
    id: 'fintech',
    title: 'FinTech',
    tagline: 'Reinvent Money',
    description:
      'Disrupt traditional finance with innovative payment gateways, algorithmic trading bots, credit-scoring models, micro-lending platforms, or seamless cross-border remittance solutions. Build the financial infrastructure that empowers the next billion users.',
    icon: <ZapIcon className="w-6 h-6" />,
    accent: '#00d2be',
  },
  {
    id: 'iot',
    title: 'IoT & Hardware',
    tagline: 'Connect the Physical World',
    description:
      'Bridge atoms and bits. Design smart sensor networks, build edge-computing pipelines, prototype wearable health devices, or create home-automation systems. Connect the physical and digital worlds through intelligent hardware and embedded solutions.',
    icon: <CpuIcon className="w-6 h-6" />,
    accent: '#ff4d4f',
  },
  {
    id: 'open-dev',
    title: 'Open Innovation',
    tagline: 'No Limits, No Boundaries',
    description:
      'Have a wild idea that doesn\'t fit a box? This track is yours. Solve a real-world problem, build a creative tool, launch a social-impact project, or experiment with emerging tech. The only rule is — ship something that matters.',
    icon: <CodeIcon className="w-6 h-6" />,
    accent: '#00d2be',
  },
];

/* ── Card dimensions (keep in sync with container padding) ── */
const CARD_W = 500;          // px — card width on desktop
const CARD_GAP = 40;         // px — gap between cards
const N = 6;                 // total number of tracks

/* ── Scroll-timeline with dwell ────────────────────────────────
   Each card gets a "dwell" zone where x stays constant (card sits
   centered) + "transit" zones where x moves to the next card.

   Budget:  N × dwell  +  (N-1) × transit  =  1.0
   ────────────────────────────────────────────────────────────── */
const DWELL   = 0.07;                              // 7% of scroll per card pause
const TRANSIT = (1 - N * DWELL) / (N - 1);         // ~0.116 per transition
const CARD_STEP = CARD_W + CARD_GAP;               // 540 px

// Build the staircase keyframes once (for x transform & per-card transforms)
const getCardDwellStart = (i) => i * (TRANSIT + DWELL);
const getCardDwellEnd   = (i) => i * (TRANSIT + DWELL) + DWELL;

// x keyframes: flat during each dwell, linear ramp between dwells
const X_INPUT = [];
const X_OUTPUT = [];
for (let i = 0; i < N; i++) {
  X_INPUT.push(getCardDwellStart(i), getCardDwellEnd(i));
  X_OUTPUT.push(-i * CARD_STEP, -i * CARD_STEP);
}

/* ═══════════════════════════════════════════════════════════════
   TrackCard — desktop (inside horizontal scroll)
   ═══════════════════════════════════════════════════════════════ */
function TrackCard({ track, index, scrollYProgress }) {
  const dwellStart = getCardDwellStart(index);
  const dwellEnd   = getCardDwellEnd(index);

  // Transition radius: card ramps in during the transit *before* its dwell
  // and ramps out during the transit *after* its dwell
  const rampIn  = dwellStart - TRANSIT * 0.55;   // start becoming visible
  const rampOut = dwellEnd   + TRANSIT * 0.55;    // finish fading out

  const scale   = useTransform(scrollYProgress,
    [rampIn, dwellStart, dwellEnd, rampOut],
    [0.85,   1,          1,        0.85]);
  const opacity = useTransform(scrollYProgress,
    [rampIn, dwellStart, dwellEnd, rampOut],
    [0.06,   1,          1,        0.06]);
  const blurVal = useTransform(scrollYProgress,
    [rampIn, dwellStart, dwellEnd, rampOut],
    [8,      0,          0,        8]);
  const filter  = useTransform(blurVal, v => `blur(${v}px)`);

  return (
    <motion.div
      className="relative flex-none"
      style={{
        width: CARD_W,
        scale,
        opacity,
        filter,
        willChange: 'transform, opacity, filter',
      }}
    >
      <div
        className="relative h-full rounded-2xl border overflow-hidden
                   transition-colors duration-500 group"
        style={{
          borderColor: `${track.accent}15`,
          background: '#0a0a0a',
          boxShadow: '0 0 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${track.accent}40, transparent)` }}
        />

        {/* Glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-[0.04] group-hover:opacity-[0.08]
                     transition-opacity duration-700 pointer-events-none"
          style={{ background: track.accent, filter: 'blur(60px)' }}
        />

        <div className="relative p-7 lg:p-8 flex flex-col gap-5">
          {/* Icon + index */}
          <div className="flex items-center justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `${track.accent}0a`,
                border: `1px solid ${track.accent}18`,
                color: track.accent,
              }}
            >
              {track.icon}
            </div>
            <span
              className="text-[0.6rem] tracking-[0.25em] font-semibold uppercase"
              style={{ color: `${track.accent}60` }}
            >
              Track {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3
              className="text-[1.25rem] lg:text-[1.35rem] uppercase tracking-[0.08em] text-white leading-tight"
              style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", fontWeight: 'normal' }}
            >
              {track.title}
            </h3>
            <p
              className="text-[0.65rem] uppercase tracking-[0.18em] mt-1.5"
              style={{ color: track.accent, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, opacity: 0.8 }}
            >
              {track.tagline}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ background: `${track.accent}10` }} />

          {/* Problem statement */}
          <p
            className="text-[0.8rem] lg:text-[0.84rem] leading-[1.65] text-white/55"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {track.description}
          </p>

          {/* Hover CTA */}
          <div
            className="flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.15em] uppercase
                       opacity-0 translate-y-2 group-hover:opacity-70 group-hover:translate-y-0
                       transition-all duration-300 mt-auto pt-2"
            style={{ color: track.accent, fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>Explore Track</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Section header (shared between desktop & mobile)
   ═══════════════════════════════════════════════════════════════ */
function SectionHeader({ className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <span
        className="block text-[0.6rem] md:text-[0.65rem] font-semibold tracking-[0.45em] uppercase mb-3"
        style={{ color: 'rgba(255,77,79,0.75)', fontFamily: "'Montserrat', sans-serif" }}
      >
        The Challenges
      </span>
      <h2
        className="text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-[0.06em] text-white mb-3"
        style={{
          fontFamily: "'3rdMan', 'Montserrat', sans-serif",
          fontWeight: 'normal',
          textShadow: '0 0 40px rgba(255,77,79,0.15)',
          cursor: 'default',
        }}
      >
        {'Hackathon Tracks'.split('').map((char, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.028 * i, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, color: '#ff4d4f', transition: { duration: 0.15 } }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h2>
      <p
        className="text-[0.82rem] md:text-[0.9rem] text-white/45 max-w-lg mx-auto"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Choose your domain. Build the future. Win the ultimate prize.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Desktop — vertical scroll → horizontal card scroll

   Container padding `calc(50vw - CARD_W/2)` on each side ensures
   the FIRST card starts centred on screen and the LAST card ends
   centred.  With that geometry, card_i is centred at
   scrollYProgress = i / (N-1).
   ═══════════════════════════════════════════════════════════════ */
const HorizontalTracks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Staircase x: flat during each card's dwell, linear ramp between
  const x = useTransform(scrollYProgress, X_INPUT, X_OUTPUT);

  const halfCard = CARD_W / 2; // 250

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] hidden md:block"
      style={{ height: '450vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Header — fixed at top */}
        <div className="pt-16 lg:pt-20 pb-6 px-4 z-10">
          <SectionHeader />
        </div>

        {/* Horizontal cards */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex w-max"
            style={{
              x,
              gap: CARD_GAP,
              paddingLeft:  `calc(50vw - ${halfCard}px)`,
              paddingRight: `calc(50vw - ${halfCard}px)`,
            }}
          >
            {TRACKS.map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                index={i}
                scrollYProgress={scrollYProgress}
                totalCards={TRACKS.length}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll progress dots */}
        <div className="flex flex-col items-center pb-8 gap-3 opacity-40">
          <span
            className="text-[0.55rem] tracking-[0.3em] text-white uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Mobile — vertical stacked cards
   ═══════════════════════════════════════════════════════════════ */
export const MobileTracks = () => (
  <section className="relative bg-[#050505] py-16 px-5 md:hidden">
    <SectionHeader className="mb-10" />

    <div className="flex flex-col gap-4">
      {TRACKS.map((track, index) => (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          className="relative rounded-2xl border overflow-hidden"
          style={{
            borderColor: `${track.accent}12`,
            background: '#0a0a0a',
          }}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${track.accent}30, transparent)` }}
          />

          <div className="p-5 flex flex-col gap-3.5">
            {/* Icon + index row */}
            <div className="flex items-center justify-between">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: `${track.accent}08`,
                  border: `1px solid ${track.accent}15`,
                  color: track.accent,
                }}
              >
                {track.icon}
              </div>
              <span
                className="text-[0.5rem] tracking-[0.2em] font-semibold uppercase"
                style={{ color: `${track.accent}50` }}
              >
                Track {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title + tagline */}
            <div>
              <h3
                className="text-[1.05rem] uppercase tracking-[0.06em] text-white leading-tight"
                style={{ fontFamily: "'3rdMan', 'Montserrat', sans-serif", fontWeight: 'normal' }}
              >
                {track.title}
              </h3>
              <p
                className="text-[0.55rem] uppercase tracking-[0.15em] mt-1"
                style={{ color: track.accent, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, opacity: 0.7 }}
              >
                {track.tagline}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: `${track.accent}0a` }} />

            {/* Description */}
            <p
              className="text-[0.75rem] leading-[1.6] text-white/50"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {track.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HorizontalTracks;
