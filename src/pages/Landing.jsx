import { lazy, Suspense, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LazySection from '../components/LazySection'
import useIsMobile from '../hooks/useIsMobile'
import ScrollTitleMarquee from '../components/ScrollTitleMarquee'
import HorizontalTracks, { MobileTracks } from '../components/HorizontalTracks'
import { motion } from 'framer-motion'

const DevfolioApply = lazy(() => import(/* webpackChunkName: "devfolio" */ '../components/DevfolioApply'))
const Timeline = lazy(() => import(/* webpackChunkName: "timeline" */ '../components/Timeline'))
const FAQ = lazy(() => import(/* webpackChunkName: "faq" */ '../components/FAQ'))
const Countdown = lazy(() => import(/* webpackChunkName: "countdown" */ '../components/Countdown'))
const Footer = lazy(() => import(/* webpackChunkName: "footer" */ '../components/Footer'))
const AboutHeist = lazy(() => import(/* webpackChunkName: "about" */ '../components/AboutHeist'))
const AboutGDG = lazy(() => import(/* webpackChunkName: "aboutgdg" */ '../components/AboutGDG'))
const TeamSection = lazy(() => import(/* webpackChunkName: "team" */ '../components/TeamSection'))
const VaultSection = lazy(() => import(/* webpackChunkName: "vault" */ '../components/VaultSection'))



const SectionFallback = () => (
  <div style={{ minHeight: '40vh', background: '#000' }} />
)

const gallerySources = [
  new URL('../assets/gallery/gallery-02.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-01.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-05.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-03.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-04.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-07.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-06.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-08.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-11.webp', import.meta.url).href,
  new URL('../assets/gallery/gallery-10.webp', import.meta.url).href,
]

const pastGallery = [
  {

    caption: 'Registration desk crew keeping the queue efficient.',
    src: gallerySources[0],
  },
  {

    caption: 'Product mentors giving teams live feedback.',
    src: gallerySources[1],
  },
  {

    caption: 'Opening talk that set the pulse for 36 hours.',
    src: gallerySources[2],
  },
  {

    caption: 'Hardware + swag handoff to the winning squad.',
    src: gallerySources[3],
  },
  {

    caption: 'Teams heading into the arena with MIET kits.',
    src: gallerySources[4],
  },
  {

    caption: 'Builders showing their dashboards on-device.',
    src: gallerySources[5],
  },
  {

    caption: 'Organizing team synced before the rush.',
    src: gallerySources[6],
  },
  {

    caption: 'Community partners and crew outside the arena.',
    src: gallerySources[9],
  },
  {

    caption: 'Judges awarding the precision trophy.',
    src: gallerySources[7],
  },
  {

    caption: 'Tradition + tech to open the build floor.',
    src: gallerySources[8],
  },
]

/* Grid layout for gallery masonry */
const galleryLayout = [
  { col: '1 / 3', row: '1 / 3' },  // 0: hero 2×2
  { col: '3 / 4', row: '1 / 2' },  // 1: top-right
  { col: '3 / 4', row: '2 / 3' },  // 2: mid-right
  { col: '1 / 2', row: '3 / 4' },  // 3: left
  { col: '2 / 3', row: '3 / 5' },  // 4: center tall
  { col: '3 / 4', row: '3 / 5' },  // 5: right tall
  { col: '1 / 2', row: '4 / 5' },  // 6: below-left
  { col: '1 / 3', row: '5 / 6' },  // 7: wide bottom
  { col: '3 / 4', row: '5 / 6' },  // 8: bottom-right
  { col: '1 / 4', row: '6 / 7' },  // 9: full-width closing
]


const PARTNERS_DATA = [
  {
    tier: 'Sponsors',
    partners: [
      { name: '.XYZ', logo: '/logo/xyz.svg' },
      { name: 'UseQR', logo: '/logo/useqr.svg' },
      { name: 'Sponsor X' },
      { name: 'Sponsor X' },
    ],
  },
  {
    tier: 'Community Partners',
    partners: [
      { name: 'Community X' },
      { name: 'Community X' },
      { name: 'Community X' },
    ],
  },
  {
    tier: 'Media Partners',
    partners: [
      { name: 'Media X' },
      { name: 'Media X' },
    ],
  },
]

/* Per-letter animated heading (single fade on mobile) */
function LetterHeading({ text, centered = false, isMobile = false }) {
  const headingStyle = {
    fontFamily: "'3rdMan', 'Montserrat', sans-serif",
    fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)',
    fontWeight: 'normal',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#ffffff',
    margin: 0,
    lineHeight: 1.1,
    textAlign: centered ? 'center' : 'left',
    cursor: 'default',
  }

  // Mobile: single motion.h2 instead of N motion.span per letter
  if (isMobile) {
    return (
      <motion.h2
        style={headingStyle}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.h2>
    )
  }

  const chars = text.split('')
  return (
    <h2 style={headingStyle}>
      {chars.map((char, i) => (
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
  )
}

function SectionShell({ id, title, eyebrow, subtitle, children, centeredHeading = false, isMobile = false }) {
  return (
    <section id={id} className="container my-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: centeredHeading ? 'center' : 'left', marginBottom: '1.5rem' }}
      >
        {eyebrow && (
          <span style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(255,77,79,0.75)',
            marginBottom: '0.55rem',
          }}>
            {eyebrow}
          </span>
        )}
        <LetterHeading text={title} centered={centeredHeading} isMobile={isMobile} />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.12 }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.88rem',
              color: 'rgba(200,200,200,0.6)',
              marginTop: '0.6rem',
              letterSpacing: '0.02em',
              maxWidth: centeredHeading ? '520px' : 'none',
              margin: centeredHeading ? '0.6rem auto 0' : '0.6rem 0 0',
            }}
          >{subtitle}</motion.p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mt-6"
      >{children}</motion.div>
    </section>
  )
}

export default function Landing() {
  const isMobile = useIsMobile()
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(-1)

  return (
    <div className="bg-black text-white relative">
      <Navbar />
      <main>
        <Hero />

        {/* ── CTA band — near fold, renders immediately ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="cinematic-cta"
        >
          <p className="cinematic-cta-text" style={{ fontFamily: '3rdMan, sans-serif' }}>
            Ready to join the heist?
          </p>
          <Suspense fallback={<div style={{ height: 44 }} />}>
            <DevfolioApply />
          </Suspense>
        </motion.section>

        {/* ── Below-fold: each section deferred via IntersectionObserver ── */}
        <LazySection>
          <section className="container my-16">
            <Suspense fallback={<SectionFallback />}>
              <Countdown target={new Date('2025-03-29T09:00:00+05:30').getTime()} />
            </Suspense>
          </section>
        </LazySection>

        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <AboutHeist />
          </Suspense>
        </LazySection>

        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <AboutGDG />
          </Suspense>
        </LazySection>

        <LazySection>
          <div id="tracks">
            <HorizontalTracks />
            <MobileTracks />
          </div>
        </LazySection>

        <LazySection>
          <section id="timeline">
            <Suspense fallback={<SectionFallback />}>
              <Timeline />
            </Suspense>
          </section>
        </LazySection>

        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <VaultSection />
          </Suspense>
        </LazySection>

        <LazySection>
          <SectionShell id="partners" title="Partners" eyebrow="Allied Forces" subtitle="Our trusted allies in this heist." centeredHeading isMobile={isMobile}>
            <ScrollTitleMarquee rows={PARTNERS_DATA} partnerCta="https://fortune-cowl-835.notion.site/Hack-Heist-2-0-2bf0d83def6381f0af4bd849f5068fea" />
          </SectionShell>
        </LazySection>

        <LazySection>
          <SectionShell id="past" title="Our Past Heists" eyebrow="Field Records" subtitle="Gallery playback from previous ops." centeredHeading isMobile={isMobile}>
            <div className="relative max-w-6xl mx-auto">
              {/* Ambient radial glow */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,77,79,0.05) 0%, transparent 65%)' }} />

              {/* ── Desktop: explicit-placement masonry grid ── */}
              {!isMobile && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: '200px',
                    gap: '10px',
                  }}
                >
                  {pastGallery.map((item, idx) => (
                    <motion.article
                      key={idx}
                      initial={{ opacity: 0, y: 38, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
                      style={{
                        gridColumn: galleryLayout[idx].col,
                        gridRow: galleryLayout[idx].row,
                      }}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-900"
                    >
                      {/* Image — grayscale by default, color on hover */}
                      <img
                        src={item.src}
                        alt={item.caption}
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={400}
                        className="h-full w-full object-cover grayscale brightness-[0.7] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-[1.06]"
                      />
                      {/* Gradient scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none" />
                      {/* Glow border on hover */}
                      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/[0.06] transition-all duration-300 group-hover:border-red-500/40 group-hover:shadow-[inset_0_0_30px_rgba(255,77,79,0.08)]" />
                      {/* Caption — slides up on hover */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-1 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p
                          className="text-[0.82rem] md:text-[0.88rem] font-medium tracking-wide text-white/90 group-hover:text-white leading-snug"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {item.caption}
                        </p>
                      </div>
                      {/* Corner accent dot */}
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-red-500/0 group-hover:bg-red-500/70 transition-all duration-300" />
                    </motion.article>
                  ))}
                </div>
              )}

              {/* ── Mobile: single-column stack — tap to reveal color ── */}
              {isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {pastGallery.map((item, idx) => {
                    const isActive = activeGalleryIdx === idx
                    return (
                      <motion.article
                        key={idx}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setActiveGalleryIdx(isActive ? -1 : idx)}
                        className="relative overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer"
                        style={{ aspectRatio: '16 / 10' }}
                        animate={isActive ? { scale: 1.01 } : { scale: 1 }}
                      >
                        <img
                          src={item.src}
                          alt={item.caption}
                          loading="lazy"
                          decoding="async"
                          width={600}
                          height={400}
                          className={`h-full w-full object-cover transition-all duration-700 ease-out ${isActive
                              ? 'grayscale-0 brightness-105 scale-[1.03]'
                              : 'grayscale brightness-[0.7]'
                            }`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-45' : 'opacity-90'
                          }`} />
                        <div className={`absolute inset-0 rounded-2xl pointer-events-none border transition-all duration-300 ${isActive
                            ? 'border-red-500/40 shadow-[inset_0_0_30px_rgba(255,77,79,0.08)]'
                            : 'border-white/[0.06]'
                          }`} />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p
                            className="text-[0.82rem] font-medium tracking-wide text-white/90 leading-snug"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {item.caption}
                          </p>
                          {!isActive && (
                            <span
                              className="text-[0.6rem] text-white/35 mt-1.5 block tracking-widest uppercase"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              Tap to reveal
                            </span>
                          )}
                        </div>
                      </motion.article>
                    )
                  })}
                </div>
              )}
            </div>
          </SectionShell>
        </LazySection>

        <LazySection>
          <SectionShell id="team" title="Meet Our Organizers" eyebrow="The Crew" centeredHeading isMobile={isMobile}>
            <Suspense fallback={<SectionFallback />}>
              <TeamSection />
            </Suspense>
          </SectionShell>
        </LazySection>

        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
        </LazySection>
      </main>
      <LazySection>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  )
}


