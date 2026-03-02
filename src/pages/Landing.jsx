import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
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

/* ── Per-letter animated heading ── */
function LetterHeading({ text, centered = false }) {
  const chars = text.split('')
  return (
    <h2
      style={{
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
      }}
    >
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

function SectionShell({ id, title, eyebrow, subtitle, children, centeredHeading = false }) {
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
        <LetterHeading text={title} centered={centeredHeading} />
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
  return (
    <div className="bg-black text-white relative">
      <Navbar />
      <main>
        <Hero />

        {/* ── Call-to-action band ── */}
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
          <div className="invert grayscale contrast-200">
            <DevfolioApply slug="hack-heist-2" theme="light" />
          </div>
        </motion.section>

        {/* Countdown Section */}
        <section className="container my-16">
          <Countdown target={new Date('2025-03-29T09:00:00+05:30').getTime()} />
        </section>

        <AboutHeist />

        <div id="tracks">
          <HorizontalTracks />
          <MobileTracks />
        </div>

        <section id="timeline">
          <Timeline />
        </section>

        {/* The Vault / Loot Section */}
        <VaultSection />

        <SectionShell id="partners" title="Partners" eyebrow="Allied Forces" subtitle="Our trusted allies in this heist." centeredHeading>
          <ScrollTitleMarquee rows={['Title Sponsors', 'Gold Sponsors', 'Silver Sponsors', 'Community Partners', 'Media Partners']} />
        </SectionShell>


        <SectionShell id="past" title="Our Past Heists" eyebrow="Field Records" subtitle="Gallery playback from previous ops." centeredHeading>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-heist-red/10 via-transparent to-heist-red/10 blur-3xl pointer-events-none" />
            <div className="relative grid gap-4 md:grid-cols-3 auto-rows-[200px]">
              {pastGallery.map((item, idx) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.35)] ${gallerySpan[idx] ?? ''}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <motion.h3
                      className="text-lg font-semibold tracking-wide"
                      style={{ fontFamily: 'Oxanium, sans-serif' }}
                      whileHover={{ x: 4 }}
                    >
                      {item.title}
                    </motion.h3>
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

        <SectionShell id="team" title="Meet Our Organizers" eyebrow="The Crew" centeredHeading>
          <TeamSection />
        </SectionShell>




        <FAQ />
      </main>
      <Footer />
    </div >
  )
}


