import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LazySection from '../components/LazySection'
import useIsMobile from '../hooks/useIsMobile'
import DevfolioApply from '../components/DevfolioApply'
import HeroCountdownTransition from '../components/HeroCountdownTransition'
import Timeline from '../components/Timeline'
import FAQ from '../components/FAQ'
import Countdown from '../components/Countdown'
import Footer from '../components/Footer'
import AboutHeist from '../components/AboutHeist'
import TeamSection from '../components/TeamSection'
import VaultSection from '../components/VaultSection'
import ScrollTitleMarquee from '../components/ScrollTitleMarquee'
import HorizontalTracks, { MobileTracks } from '../components/HorizontalTracks'
import { motion } from 'framer-motion'

// Lazy-load every below-fold section — only Hero + Navbar are critical-path
const DevfolioApply = lazy(() => import(/* webpackChunkName: "devfolio" */ '../components/DevfolioApply'))
const Timeline = lazy(() => import(/* webpackChunkName: "timeline" */ '../components/Timeline'))
const FAQ = lazy(() => import(/* webpackChunkName: "faq" */ '../components/FAQ'))
const Countdown = lazy(() => import(/* webpackChunkName: "countdown" */ '../components/Countdown'))
const Footer = lazy(() => import(/* webpackChunkName: "footer" */ '../components/Footer'))
const AboutHeist = lazy(() => import(/* webpackChunkName: "about" */ '../components/AboutHeist'))
const TeamSection = lazy(() => import(/* webpackChunkName: "team" */ '../components/TeamSection'))
const VaultSection = lazy(() => import(/* webpackChunkName: "vault" */ '../components/VaultSection'))



// Dark placeholder while lazy chunks load — prevents white flash
const SectionFallback = () => (
  <div style={{ minHeight: '40vh', background: '#000' }} />
)

const gallerySources = [
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.47 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.47 PM (1).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.48 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.48 PM (1).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.48 PM (2).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.49 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.40.49 PM (1).jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.41.14 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.41.15 PM.jpeg', import.meta.url).href,
  new URL('../assets/gallery/WhatsApp Image 2025-11-20 at 9.41.15 PM (2).jpeg', import.meta.url).href,
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

const gallerySpan = ['md:col-span-2 md:row-span-2', 'md:row-span-1', 'md:row-span-2', 'md:row-span-1', 'md:row-span-2', '', 'md:row-span-2', 'md:row-span-2', 'md:col-span-2', 'md:row-span-1']

/* ── Per-letter animated heading (simplified single-element fade on mobile) ── */
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
            <div className="invert grayscale contrast-200">
              <DevfolioApply slug="hack-heist-2" theme="light" />
            </div>
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
          <section id="timeline">
            <Suspense fallback={<SectionFallback />}>
              <Timeline />
            </Suspense>
          </section>
        </LazySection>
        <AboutHeist />

        <div id="tracks">
          <HorizontalTracks />
          <MobileTracks />
        </div>

        <section id="timeline">
          <Timeline />
        </section>

        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <VaultSection />
          </Suspense>
        </LazySection>

        <LazySection>
        <SectionShell id="partners" title="Partners" eyebrow="Allied Forces" subtitle="Our trusted allies in this heist." centeredHeading isMobile={isMobile}>
          <div className="relative">
            {/* Revealing Soon Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-heist-red/30 bg-gradient-to-r from-heist-red/10 via-heist-red/5 to-heist-red/10 backdrop-blur-sm shadow-[0_0_25px_rgba(179,0,0,0.3)]"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.span
                  className="text-heist-red text-sm md:text-base font-semibold uppercase tracking-wider"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Revealing Very Soon
                </motion.span>
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated Placeholder Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative h-32 rounded-2xl overflow-hidden"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-transparent border border-white/10 rounded-2xl"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-heist-red/30"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  />

                  {/* Pulsing Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/5 blur-xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                  />

                  {/* Center Icon/Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded bg-heist-red/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.15,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        <SectionShell id="partners" title="Partners" eyebrow="Allied Forces" subtitle="Our trusted allies in this heist." centeredHeading>
          <ScrollTitleMarquee rows={['Title Sponsors', 'Gold Sponsors', 'Silver Sponsors', 'Community Partners', 'Media Partners']} />
        </SectionShell>
        </LazySection>

        <LazySection>
        <SectionShell id="tracks" title="Our Tracks" eyebrow="Mission Paths" subtitle="Choose your path in this heist." centeredHeading isMobile={isMobile}>
          <div className="relative">
            {/* Animated Track Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                'AI/ML',
                'Web3 & Blockchain',
                'IoT',
                'AR/VR',
                'App Development',
                'Open Innovation'
              ].map((track, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-heist-red/20 via-heist-red/10 to-transparent border border-heist-red/30 rounded-2xl"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-heist-red/40"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  />

                  {/* Pulsing Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/10 blur-xl"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                  />

                  {/* Track Name */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.h3
                      className="text-white font-bold text-lg md:text-xl text-center px-4"
                      style={{ fontFamily: 'Oxanium, sans-serif', textShadow: '0 0 15px rgba(179, 0, 0, 0.6)' }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                    >
                      {track}
                    </motion.h3>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionShell>
        </LazySection>

        <LazySection>
        <SectionShell id="past" title="Our Past Heists" eyebrow="Field Records" subtitle="Gallery playback from previous ops." centeredHeading isMobile={isMobile}>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-heist-red/10 via-transparent to-heist-red/10 blur-3xl pointer-events-none" />
            <div className="relative grid gap-4 md:grid-cols-3 auto-rows-[200px]">
              {pastGallery.map((item, idx) => (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.35)] ${gallerySpan[idx] ?? ''}`}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <motion.p
                      className="text-lg font-semibold tracking-wide"
                      style={{ fontFamily: 'Oxanium, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {item.caption}
                    </motion.p>
                  </div>
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-3xl pointer-events-none"
                    whileHover={{ borderColor: 'rgba(255,77,79,0.55)' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.article>
              ))}
            </div>
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


