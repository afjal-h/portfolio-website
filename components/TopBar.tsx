import React from 'react';

const TopBar: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 right-0 h-[9%] md:h-[11%] min-h-[60px] flex justify-center z-50 pointer-events-none">
            {/* Container for the Bar Content & Background */}
            <div className="relative w-full h-full pointer-events-auto">
                {/* SVG Background Shape (straight, stroke only at bottom) */}
                <div className="absolute inset-0 w-full h-full drop-shadow-[0_5px_15px_rgba(0,0,0,0.08)]">
                    <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 1920 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <rect x="0" y="0" width="1920" height="90" fill="#FFF8DC" />
                        <line x1="2.5" y1="90" x2="1917.5" y2="90" stroke="#FFC107" strokeWidth="2" />
                    </svg>
                </div>
                {/* Centered Pixelated Text */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="text-gray-800 text-lg md:text-2xl font-bold select-none" style={{ fontFamily: '"Press Start 2P", "VT323", "Consolas", "monospace"', letterSpacing: '0.04em' }}>

                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
