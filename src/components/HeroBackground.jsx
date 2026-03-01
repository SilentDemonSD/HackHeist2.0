import React from 'react';

export default function HeroBackground() {
    return (
        <div className="cinematic-video-wrap">
            <video
                src="/videos/hh_intro.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
            />
        </div>
    );
}
