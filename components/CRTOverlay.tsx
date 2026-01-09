import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[10000]">
      {/* Combined Vignette & Reflection */}
      <div
        className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent"
      />

      {/* Optimized Scanlines & Shadow Mask */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))
          `,
          backgroundSize: '100% 3px, 3px 100%'
        }}
      />

      {/* Subtle Analog Flicker */}
      <div className="absolute inset-0 crt-flicker-anim bg-white/[0.01] mix-blend-overlay" />
    </div>
  );
};

export default CRTOverlay;