import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BrainIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /></svg>;
const LayersIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
const ShieldIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.89 0 5.48.97 7 2a1 1 0 0 1 1 1v7z" /></svg>;
const ZapIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const CpuIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>;
const CodeIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;

const TRACKS = [
    {
        id: 'ai-ml',
        title: 'AI & Machine Learning',
        description: 'Build intelligent systems that learn and adapt using cutting-edge models and datasets.',
        icon: <BrainIcon className="w-8 h-8 text-[#ff4d4f]" />,
        gradient: 'from-[#ff4d4f]/20 to-transparent'
    },
    {
        id: 'web3',
        title: 'Web3 & Blockchain',
        description: 'Develop decentralized applications, smart contracts, and secure the future of the web.',
        icon: <LayersIcon className="w-8 h-8 text-[#ff4d4f]" />,
        gradient: 'from-[#00d2be]/20 to-transparent'
    },
    {
        id: 'cybersec',
        title: 'Cybersecurity',
        description: 'Identify vulnerabilities, secure networks, and protect digital assets from modern threats.',
        icon: <ShieldIcon className="w-8 h-8 text-[#ff4d4f]" />,
        gradient: 'from-[#ff4d4f]/20 to-transparent'
    },
    {
        id: 'fintech',
        title: 'FinTech',
        description: 'Revolutionize finance with innovative payment solutions, trading platforms, and DeFi.',
        icon: <ZapIcon className="w-8 h-8 text-[#ff4d4f]" />,
        gradient: 'from-[#00d2be]/20 to-transparent'
    },
    {
        id: 'iot',
        title: 'IoT & Hardware',
        description: 'Connect the physical and digital worlds with smart devices and hardware solutions.',
        icon: <CpuIcon className="w-8 h-8 text-[#ff4d4f]" />,
        gradient: 'from-[#ff4d4f]/20 to-transparent'
    },
    {
        id: 'open-dev',
        title: 'Open Innovation',
        description: 'No limits. Build anything that solves a real-world problem or pushes boundaries.',
        icon: <CodeIcon className="w-8 h-8 text-[#ff4d4f]" />,
        gradient: 'from-[#00d2be]/20 to-transparent'
    }
];

const TrackCard = ({ track, index, scrollYProgress, totalCards }) => {
    // Calculate relative position based on total cards
    const step = 1 / totalCards;
    const center = (index * step) + (step / 2);
    const start = center - step;
    const end = center + step;

    // Amplified scale range to give more distinct zoom effect per card
    const scale = useTransform(
        scrollYProgress,
        [start, center, end],
        [0.75, 1.1, 0.75]
    );

    const opacity = useTransform(
        scrollYProgress,
        [start, center, end],
        [0.3, 1, 0.3]
    );

    const filter = useTransform(
        scrollYProgress,
        [start, center, end],
        ['blur(3px)', 'blur(0px)', 'blur(3px)']
    );

    return (
        <motion.div
            className="relative flex-none w-[85vw] sm:w-[500px] h-[350px] sm:h-[400px] snap-center"
            style={{
                scale,
                opacity,
                filter,
                willChange: "transform, opacity, filter",
                transform: "translateZ(0)",
                WebkitFontSmoothing: "antialiased",
                backfaceVisibility: "hidden"
            }}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-50 rounded-[32px]`} />

            <div className="relative h-full w-full bg-[#0d1117] border border-[rgba(255,77,79,0.15)] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-[rgba(255,77,79,0.4)] transition-colors duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">

                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4d4f] rounded-full blur-[100px] opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500" />

                <div>
                    <div className="mb-6 inline-flex p-4 rounded-2xl bg-[rgba(255,77,79,0.05)] border border-[rgba(255,77,79,0.1)]">
                        {track.icon}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-['3rdMan',sans-serif] text-white uppercase tracking-wider mb-4">
                        {track.title}
                    </h3>

                    <p className="text-[rgba(255,255,255,0.7)] font-['Montserrat',sans-serif] leading-relaxed text-sm sm:text-base">
                        {track.description}
                    </p>
                </div>

                <div className="flex items-center text-[#ff4d4f] font-['Montserrat',sans-serif] text-sm font-semibold tracking-widest uppercase mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Track</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

const HorizontalTracks = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform scroll progress to horizontal movement
    // Using calc(-100% + 100vw) guarantees it scrolls EXACTLY to the end of the cards
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

    return (
        <section
            ref={containerRef}
            className="relative bg-[#050505] hidden md:block"
            style={{ height: '400vh' }} // Increased height gives more scroll time for 6 cards
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* Section Header */}
                <div className="absolute top-24 left-0 w-full text-center z-10 px-4">
                    <span className="font-['Montserrat',sans-serif] text-[0.65rem] font-semibold tracking-[0.45em] text-[#ff4d4f] uppercase mb-4 block">
                        The Challenges
                    </span>
                    <h2 className="font-['3rdMan',sans-serif] text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-wider mb-4" style={{ textShadow: '0 0 40px rgba(255, 77, 79, 0.2)' }}>
                        Hackathon Tracks
                    </h2>
                    <p className="font-['Montserrat',sans-serif] text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto text-sm sm:text-base">
                        Choose your domain. Build the future. Win the ultimate prize.
                    </p>
                </div>

                {/* Horizontal Scrolling Container */}
                <motion.div
                    className="flex gap-8 sm:gap-16 px-[10vw] sm:px-[15vw] pt-20 w-max"
                    style={{ x }}
                >
                    {TRACKS.map((track, index) => (
                        <TrackCard
                            key={track.id}
                            track={track}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            totalCards={TRACKS.length}
                        />
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
                    <span className="font-['Montserrat',sans-serif] text-[0.6rem] tracking-[0.3em] text-white uppercase mb-3">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </div>
            </div>
        </section>
    );
};

// Mobile Fallback (Vertical Stack)
export const MobileTracks = () => {
    return (
        <section className="relative bg-[#050505] py-24 px-6 md:hidden">
            <div className="text-center mb-16">
                <span className="font-['Montserrat',sans-serif] text-[0.65rem] font-semibold tracking-[0.45em] text-[#ff4d4f] uppercase mb-4 block">
                    The Challenges
                </span>
                <h2 className="font-['3rdMan',sans-serif] text-4xl text-white uppercase tracking-wider mb-4" style={{ textShadow: '0 0 40px rgba(255, 77, 79, 0.2)' }}>
                    Hackathon Tracks
                </h2>
                <p className="font-['Montserrat',sans-serif] text-[rgba(255,255,255,0.6)] text-sm">
                    Choose your domain. Build the future. Win the ultimate prize.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                {TRACKS.map((track) => (
                    <div
                        key={track.id}
                        className="relative w-full bg-[#0d1117] border border-[rgba(255,77,79,0.15)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-20`} />

                        <div className="relative z-10">
                            <div className="mb-5 inline-flex p-3 rounded-2xl bg-[rgba(255,77,79,0.05)] border border-[rgba(255,77,79,0.1)]">
                                {track.icon}
                            </div>

                            <h3 className="text-xl font-bold font-['3rdMan',sans-serif] text-white uppercase tracking-wider mb-3">
                                {track.title}
                            </h3>

                            <p className="text-[rgba(255,255,255,0.7)] font-['Montserrat',sans-serif] leading-relaxed text-sm">
                                {track.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HorizontalTracks;
