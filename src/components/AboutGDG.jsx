import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "./AboutGDG.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function AboutGDG() {
  return (
    <motion.section
      id="about-gdg"
      aria-labelledby="gdg-heading"
      className={clsx("relative overflow-hidden", styles.missionSection)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className={styles.radialGlow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.topBorder} aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <motion.p className={styles.eyebrow} variants={fadeUp} custom={0}></motion.p>

        <div className={styles.headingRow}>
          <h2 id="gdg-heading" className={styles.heading} style={{ cursor: "default" }}>
            {"About GDG On Campus MIET".split("").map((char, i) =>
              char === " " ? (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{ display: "inline-block", width: "0.22em" }}
                />
              ) : (
                <motion.span
                  key={i}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ color: "#ff4d4f", y: -6, transition: { duration: 0.13 } }}
                >
                  {char}
                </motion.span>
              ),
            )}
          </h2>
          <span className={styles.headingRule} />
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.leftCol}>
            <motion.div className={styles.copyBlock} variants={fadeUp} custom={1}>
              <p className={styles.leadLine}>
                <strong>What is GDG On Campus?</strong>
              </p>
              <p>
                GDG on Campus is a student-led initiative under Google Developer Groups (GDG) aimed
                at fostering a community of student developers. It provides resources, networking
                opportunities, and events to help students grow their technical and professional
                skills.
              </p>

              <br />

              <p className={styles.leadLine}>
                <strong>About GDG On Campus MIET Chapter</strong>
              </p>
              <p>
                Google Developer Groups (GDG) On Campus MIET is a dynamic community that empowers
                students to grow, connect, and innovate through collaboration and skill development.
                Now in its third year, GDG On Campus MIET actively supports participation in Google
                initiatives like the Solution Challenge and hosts impactful workshops, bootcamps,
                and expert talks.
              </p>
              <p>
                Built on Unity, Growth, and Innovation, GDG On Campus MIET inspires changemakers to
                learn, share, and lead.
              </p>
            </motion.div>
          </div>

          <motion.div
            className={styles.logoShell}
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          >
            <div className={styles.logoContainer}>
              <a
                href="https://gdg.community.dev/gdg-on-campus-meerut-institute-of-engineering-and-technology-meerut-india/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoLink}
              >
                <img
                  src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/sq_FdXQyvm.png"
                  alt="GDG On Campus MIET"
                  className={styles.gdgLogoImg}
                  loading="lazy"
                />
              </a>
            </div>

            <svg className={styles.blueprintSvgOverlay} viewBox="0 0 460 500" role="presentation">
              <g stroke="rgba(255,77,79,0.4)" strokeWidth="0.8">
                <line x1="14" y1="38" x2="24" y2="38" />
                <line x1="19" y1="33" x2="19" y2="43" />
                <line x1="436" y1="38" x2="446" y2="38" />
                <line x1="441" y1="33" x2="441" y2="43" />
                <line x1="14" y1="470" x2="24" y2="470" />
                <line x1="19" y1="465" x2="19" y2="475" />
                <line x1="436" y1="470" x2="446" y2="470" />
                <line x1="441" y1="465" x2="441" y2="475" />
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
