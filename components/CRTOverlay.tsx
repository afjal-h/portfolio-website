import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[100] crt-scanlines">
      {/* Vignette - darkens edges */}
      <div
        className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};

export default CRTOverlay;