import React from 'react';

interface WiiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  style?: React.CSSProperties;
}

const ButtonBackgroundSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 560 162"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    style={{ overflow: 'visible' }}
  >
    <g opacity="0.9" filter="url(#filter0_dii_5_4_btn)">
      <rect x="7" y="7" width="546" height="148" rx="74" fill="#E3E8EF" />
      <rect x="7" y="7" width="546" height="148" rx="74" stroke="#34BEED" strokeWidth="8" />
      <g filter="url(#filter1_f_5_4_btn)">
        <path d="M89.108 61.1313C35.1323 61.1313 25.9698 89.0437 28.1355 103C-1.05148 50.8 56.1229 16 76.6137 16H482.431C516.915 16 513.417 61.1313 482.431 61.1313H89.108Z" fill="white" />
      </g>
    </g>
    <defs>
      <filter id="filter0_dii_5_4_btn" x="-5" y="-5" width="570" height="171" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="2.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.203922 0 0 0 0 0.745098 0 0 0 0 0.929412 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5_4" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_4" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feMorphology radius="16" operator="erode" in="SourceAlpha" result="effect2_innerShadow_5_4" />
        <feOffset dy="-10" />
        <feGaussianBlur stdDeviation="9.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.695347 0 0 0 0 0.737503 0 0 0 0 0.79371 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_5_4" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="10" dy="9" />
        <feGaussianBlur stdDeviation="30" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend mode="normal" in2="effect2_innerShadow_5_4" result="effect3_innerShadow_5_4" />
      </filter>
      <filter id="filter1_f_5_4_btn" x="17" y="13" width="493" height="93" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_5_4" />
      </filter>
    </defs>
  </svg>
);

const WiiButton: React.FC<WiiButtonProps> = ({ children, onClick, className = '', active = false, style }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`
        relative group
        transition-all duration-200 ease-out
        active:scale-95
        flex items-center justify-center
        ${className}
      `}
    >
      {/* SVG Background Layer */}
      {/* Added hover glow drop-shadow to simulate the blue aura in the reference image */}
      <div className="absolute inset-0 z-0 drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(52,190,237,0.7)]">
        <ButtonBackgroundSVG />
      </div>

      {/* Hover Light Overlay Effect Layer */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-white/20 rounded-full mix-blend-overlay" />

      {/* Text Layer */}
      {/* Changed font-bold to font-normal */}
      <span
        className="relative z-20 font-normal tracking-wide flex items-center justify-center gap-2 w-full h-full pb-1 pointer-events-none select-none"
        style={{ fontFamily: "'FOT-RodinBokutoh Pro', 'Rodin', sans-serif" }}
      >
        {children}
      </span>
    </button>
  );
};

export default WiiButton;