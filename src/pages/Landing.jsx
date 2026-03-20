import { lazy, Suspense, useState } from 'react'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import LazySection from '../components/LazySection'
import useIsMobile from '../hooks/useIsMobile'
import useInView from '../hooks/useInView'

import HorizontalTracks, { MobileTracks } from '../components/HorizontalTracks'

const DevfolioApply = lazy(
  () => import(/* webpackChunkName: "devfolio" */ "../components/DevfolioApply"),
);
const Timeline = lazy(() => import(/* webpackChunkName: "timeline" */ "../components/Timeline"));
const FAQ = lazy(() => import(/* webpackChunkName: "faq" */ "../components/FAQ"));
const Countdown = lazy(() => import(/* webpackChunkName: "countdown" */ "../components/Countdown"));
const Footer = lazy(() => import(/* webpackChunkName: "footer" */ "../components/Footer"));
const AboutHeist = lazy(() => import(/* webpackChunkName: "about" */ "../components/AboutHeist"));
const AboutGDG = lazy(() => import(/* webpackChunkName: "aboutgdg" */ "../components/AboutGDG"));
const TeamSection = lazy(() => import(/* webpackChunkName: "team" */ "../components/TeamSection"));
const VaultSection = lazy(
  () => import(/* webpackChunkName: "vault" */ "../components/VaultSection"),
);
const HiringBlimp = lazy(
  () => import(/* webpackChunkName: "hiring-blimp" */ "../components/HiringBlimp"),
);

const SectionFallback = () => <div className="section-skeleton" aria-hidden="true" />;

const gallerySources = [
  new URL("../assets/gallery/gallery-02.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-01.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-05.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-03.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-04.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-07.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-06.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-08.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-11.webp", import.meta.url).href,
  new URL("../assets/gallery/gallery-10.webp", import.meta.url).href,
];

const pastGallery = [
  {
    caption: "Registration desk crew keeping the queue efficient.",
    src: gallerySources[0],
  },
  {
    caption: "Product mentors giving teams live feedback.",
    src: gallerySources[1],
  },
  {
    caption: "Opening talk that set the pulse for 36 hours.",
    src: gallerySources[2],
  },
  {
    caption: "Hardware + swag handoff to the winning squad.",
    src: gallerySources[3],
  },
  {
    caption: "Teams heading into the arena with MIET kits.",
    src: gallerySources[4],
  },
  {
    caption: "Builders showing their dashboards on-device.",
    src: gallerySources[5],
  },
  {
    caption: "Organizing team synced before the rush.",
    src: gallerySources[6],
  },
  {
    caption: "Community partners and crew outside the arena.",
    src: gallerySources[9],
  },
  {
    caption: "Judges awarding the precision trophy.",
    src: gallerySources[7],
  },
  {
    caption: "Tradition + tech to open the build floor.",
    src: gallerySources[8],
  },
];

const galleryLayout = [
  { col: "1 / 3", row: "1 / 3" }, // 0: hero 2×2
  { col: "3 / 4", row: "1 / 2" }, // 1: top-right
  { col: "3 / 4", row: "2 / 3" }, // 2: mid-right
  { col: "1 / 2", row: "3 / 4" }, // 3: left
  { col: "2 / 3", row: "3 / 5" }, // 4: center tall
  { col: "3 / 4", row: "3 / 5" }, // 5: right tall
  { col: "1 / 2", row: "4 / 5" }, // 6: below-left
  { col: "1 / 3", row: "5 / 6" }, // 7: wide bottom
  { col: "3 / 4", row: "5 / 6" }, // 8: bottom-right
  { col: "1 / 4", row: "6 / 7" }, // 9: full-width closing
];

const PartnersSection = lazy(() => import(/* webpackChunkName: "partners" */ '../components/PartnersSection'))

/* Per-letter animated heading (CSS animations, no framer-motion) */
function LetterHeading({ text, centered = false, isMobile = false }) {
  const [ref, inView] = useInView({ margin: "0px", once: true });

  const headingStyle = {
    fontFamily: "'3rdMan', 'Montserrat', sans-serif",
    fontSize: "clamp(1.9rem, 4.5vw, 3.6rem)",
    fontWeight: "normal",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#ffffff",
    margin: 0,
    lineHeight: 1.1,
    textAlign: centered ? "center" : "left",
    cursor: "default",
  };

  // Mobile: single fade-up
  if (isMobile) {
    return (
      <h2 ref={ref} style={headingStyle} className={`reveal-section ${inView ? "revealed" : ""}`}>
        {text}
      </h2>
    );
  }

  const chars = text.split("");
  return (
    <h2 ref={ref} style={headingStyle}>
      {chars.map((char, i) => (
        <span key={i} className={`letter-char ${inView ? "revealed" : ""}`} style={{ "--i": i }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
}

function SectionShell({
  id,
  title,
  eyebrow,
  subtitle,
  children,
  centeredHeading = false,
  isMobile = false,
}) {
  const [headRef, headInView] = useInView({ once: true });
  const [bodyRef, bodyInView] = useInView({ once: true });

  return (
    <section id={id} className="container my-16">
      <div
        ref={headRef}
        className={`reveal-section ${headInView ? "revealed" : ""}`}
        style={{ textAlign: centeredHeading ? "center" : "left", marginBottom: "1.5rem" }}
      >
        {eyebrow && (
          <span
            style={{
              display: "block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(255,77,79,0.75)",
              marginBottom: "0.55rem",
            }}
          >
            {eyebrow}
          </span>
        )}
        <LetterHeading text={title} centered={centeredHeading} isMobile={isMobile} />
        {subtitle && (
          <p
            className={`reveal-section ${headInView ? "revealed" : ""}`}
            style={{
              "--delay": "120ms",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(200,200,200,0.6)",
              marginTop: "0.6rem",
              letterSpacing: "0.02em",
              maxWidth: centeredHeading ? "520px" : "none",
              margin: centeredHeading ? "0.6rem auto 0" : "0.6rem 0 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div
        ref={bodyRef}
        className={`reveal-section ${bodyInView ? "revealed" : ""} mt-6`}
        style={{ "--delay": "50ms" }}
      >
        {children}
      </div>
    </section>
  );
}

function CtaSection() {
  const [ref, inView] = useInView({ once: true });
  return (
    <section
      ref={ref}
      className={`cinematic-cta reveal-section ${inView ? "revealed" : ""}`}
      style={{ "--delay": "200ms" }}
    >
      <p className="cinematic-cta-text" style={{ fontFamily: "3rdMan, sans-serif" }}>
        Ready to join the heist?
      </p>
      <Suspense fallback={<div style={{ height: 44 }} />}>
        <DevfolioApply />
      </Suspense>
    </section>
  );
}

function GalleryGrid({ items, layout }) {
  const [ref, inView] = useInView({ margin: "-50px", once: true });
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "clamp(120px, 18vw, 220px)",
        gap: "10px",
      }}
    >
      {items.map((item, idx) => (
        <article
          key={idx}
          className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-900 reveal-gallery ${inView ? "revealed" : ""}`}
          style={{
            gridColumn: layout[idx].col,
            gridRow: layout[idx].row,
            "--delay": `${idx * 55}ms`,
          }}
        >
          <img
            src={item.src}
            alt={item.caption}
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
            className="h-full w-full object-cover grayscale brightness-[0.7] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/[0.06] transition-all duration-300 group-hover:border-red-500/40 group-hover:shadow-[inset_0_0_30px_rgba(255,77,79,0.08)]" />
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-1 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p
              className="text-[0.82rem] md:text-[0.88rem] font-medium tracking-wide text-white/90 group-hover:text-white leading-snug"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {item.caption}
            </p>
          </div>
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-red-500/0 group-hover:bg-red-500/70 transition-all duration-300" />
        </article>
      ))}
    </div>
  );
}

const MOBILE_GALLERY_INITIAL = 6;

function MobileGallery({ items, activeIdx, setActiveIdx }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, MOBILE_GALLERY_INITIAL);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {visible.map((item, idx) => {
        const isActive = activeIdx === idx;
        return (
          <article
            key={idx}
            onClick={() => setActiveIdx(isActive ? -1 : idx)}
            className="relative overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer reveal-section revealed"
            style={{
              aspectRatio: "16 / 10",
              "--delay": "40ms",
              transform: isActive ? "scale(1.01)" : "scale(1)",
              transition: "transform 0.3s ease-out",
            }}
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
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-45' : 'opacity-90'}`} />
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
          </article>
        );
      })}
      {!showAll && items.length > MOBILE_GALLERY_INITIAL && (
        <button
          onClick={() => setShowAll(true)}
          className="mx-auto mt-2 rounded-full border border-white/10 px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-white/50 transition-all duration-300 hover:border-red-500/40 hover:text-white/80"
          style={{ fontFamily: "'Montserrat', sans-serif", background: "rgba(255,255,255,0.03)" }}
        >
          Show all photos
        </button>
      )}
    </div>
  );
}

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Hack Heist 2.0",
  description:
    "A 36-hour hackathon where developers, designers, and innovators assemble to build impactful solutions for real-world problems.",
  startDate: "2026-03-28T00:00:00+05:30",
  endDate: "2026-03-29T12:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "MIET",
    address: {
      "@type": "PostalAddress",
      streetAddress: "N.H. 58, Delhi-Roorkee Highway, Baghpat Bypass Road Crossing",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      postalCode: "250005",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "GDG On Campus MIET",
    url: "https://gdg.community.dev/",
    email: "gdgoncampus@miet.ac.in",
  },
  offers: {
    "@type": "Offer",
    url: "https://hack-heist-2.devfolio.co",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  image: "https://www.hackheist2.xyz/og-image.png",
  url: "https://www.hackheist2.xyz/",
};

export default function Landing() {
  const isMobile = useIsMobile();
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(-1);

  return (
    <div className="bg-black text-white relative">
      <SEO url="/" structuredData={eventSchema} />
      <Navbar />
      <Suspense fallback={null}>
        <HiringBlimp />
      </Suspense>
      <main>
        <Hero />

        <CtaSection />

        <LazySection>
          <section className="container my-16">
            <Suspense fallback={<SectionFallback />}>
              <Countdown target={new Date("2025-03-29T09:00:00+05:30").getTime()} />
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
          <Suspense fallback={<SectionFallback />}>
            <PartnersSection ctaLink="https://fortune-cowl-835.notion.site/Hack-Heist-2-0-2bf0d83def6381f0af4bd849f5068fea" />
          </Suspense>
        </LazySection>

        <LazySection>
          <SectionShell
            id="past"
            title="Our Past Heists"
            eyebrow="Field Records"
            subtitle="Gallery playback from previous ops."
            centeredHeading
            isMobile={isMobile}
          >
            <div className="relative max-w-6xl mx-auto">
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, rgba(255,77,79,0.05) 0%, transparent 65%)",
                }}
              />

              {!isMobile && <GalleryGrid items={pastGallery} layout={galleryLayout} />}

              {isMobile && (
                <MobileGallery
                  items={pastGallery}
                  activeIdx={activeGalleryIdx}
                  setActiveIdx={setActiveGalleryIdx}
                />
              )}
            </div>
          </SectionShell>
        </LazySection>

        <LazySection>
          <SectionShell
            id="team"
            title="Meet Our Organizers"
            eyebrow="The Crew"
            centeredHeading
            isMobile={isMobile}
          >
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
  );
}
