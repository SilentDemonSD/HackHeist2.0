import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function MarqueeRow({ row, direction }) {
    const { scrollY } = useScroll();
    const invertScroll = useTransform(scrollY, (v) => v * -1);
    const baseScroll = direction === 1 ? scrollY : invertScroll;
    const moveX = useTransform(baseScroll, (v) => v * 0.4);

    return (
        <motion.div
            style={{
                x: moveX,
                marginLeft: direction === 1 ? '-4000px' : '0px',
                width: 'max-content'
            }}
            className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        >
            {Array.from({ length: 40 }).map((_, i) => (
                <span
                    key={i}
                    className={`text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-none ${i % 2 === 0 ? 'text-white' : 'text-transparent'
                        }`}
                    style={{
                        WebkitTextStroke: i % 2 !== 0 ? '2px #8B0000' : 'none',
                        fontFamily: "'3rdMan', 'Montserrat', sans-serif"
                    }}
                >
                    {row}
                </span>
            ))}
        </motion.div>
    );
}

export default function ScrollTitleMarquee({ rows }) {
    return (
        <div className="overflow-hidden w-full pb-10 pointer-events-none select-none bg-black">
            <div className="flex flex-col gap-4 md:gap-6">
                {rows.map((row, idx) => (
                    <MarqueeRow key={idx} row={row} direction={idx % 2 === 0 ? 1 : -1} />
                ))}
            </div>
        </div>
    );
}
