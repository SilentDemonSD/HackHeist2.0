import React from 'react';
import Dither from './Dither';

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#060010' }}>
            <Dither
                waveColor={[0.6, 0, 0]}
                colorNum={40}
                waveFrequency={3.7}
                mouseRadius={0.1}
                waveAmplitude={0.13}
                waveSpeed={0.05}
                enableMouseInteraction={true}
                disableAnimation={false}
            />
        </div>
    );
}
