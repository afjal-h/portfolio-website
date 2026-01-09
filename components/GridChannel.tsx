import React from 'react';
import { ChannelData, AppId } from '../types';

interface GridChannelProps {
  channel: ChannelData;
  onClick: (channel: ChannelData, e: React.MouseEvent<HTMLDivElement>) => void;
  index: number;
}

const CHANNEL_PATH = "M196 3.5C263.661 3.5 319.468 3.49908 358.541 5.64062L362.27 5.85449L362.278 5.85547C367.854 6.21006 373.127 8.51403 377.176 12.3643C381.218 16.209 383.783 21.3508 384.421 26.8926C387.028 47.9647 388.5 82.1481 388.5 108.5C388.5 134.842 387.029 169.009 384.423 190.083L384.424 190.084C383.79 195.635 381.224 200.786 377.176 204.636C373.127 208.486 367.854 210.79 362.278 211.145L362.27 211.146C323.056 213.501 265.844 213.5 196 213.5C126.156 213.5 68.9442 213.501 29.7305 211.146L29.7217 211.145C24.146 210.79 18.8726 208.486 14.8242 204.636C10.7759 200.786 8.20994 195.635 7.57617 190.084V190.083C4.97044 169.009 3.5 134.882 3.5 108.5C3.5 82.108 4.97152 47.9647 7.5791 26.8926C8.21742 21.3508 10.7816 16.209 14.8242 12.3643C18.8726 8.51402 24.146 6.21006 29.7217 5.85547L29.7305 5.85449L33.459 5.64062C72.5319 3.49908 128.339 3.5 196 3.5Z";

const MASK_URI = `data:image/svg+xml,%3Csvg width='392' height='217' viewBox='0 0 392 217' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='${CHANNEL_PATH}' fill='black'/%3E%3C/svg%3E`;

const GridChannel: React.FC<GridChannelProps> = ({ channel, onClick, index }) => {
  const isEmpty = channel.id === AppId.EMPTY;
  const isMusic = channel.id === AppId.MUSIC;

  return (
    <div 
        id={`channel-card-${channel.id}`}
        className="relative group z-0 hover:z-50"
    >
        {/* Tooltip positioned above the card - visible on group hover */}
        {!isEmpty && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-max z-[60]">
                <div className="bg-white/90 backdrop-blur-md px-8 py-3 rounded-full text-lg md:text-xl font-bold text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-2 border-white whitespace-nowrap">
                    {channel.title}
                </div>
                {/* Small arrow pointing down */}
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white/90 mx-auto -mt-[1px]"></div>
            </div>
        )}

        {/* The Channel Card - Custom Aspect Ratio 392:217 */}
        <div
            onClick={(e) => !isEmpty && onClick(channel, e)}
            className={`
                relative w-full aspect-[392/217]
                transition-transform duration-300 transform group-hover:scale-[1.04]
                ${!isEmpty ? 'cursor-pointer' : ''}
            `}
        >
            {/* SVG Border Layer - Absolute Overlay */}
            <svg 
                viewBox="0 0 392 217" 
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
            >
                 <path 
                    d={CHANNEL_PATH}
                    fill="none"
                    strokeWidth="5"
                    className={`transition-all duration-300 ${
                        isEmpty 
                        ? 'stroke-gray-700' 
                        : 'stroke-gray-300 group-hover:stroke-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                    }`}
                />
            </svg>

            {/* Masked Content Container - Contains background, static, icon */}
            <div 
                className={`
                    absolute inset-0 z-10
                    ${isEmpty ? 'bg-black' : channel.color}
                `}
                style={{
                    maskImage: `url("${MASK_URI}")`,
                    WebkitMaskImage: `url("${MASK_URI}")`,
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat'
                }}
            >
                {/* Inner Bezel Shadow */}
                <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] pointer-events-none z-30" />

                {/* Empty Channel Static */}
                {isEmpty && (
                    <div className="absolute inset-0 tv-static opacity-40 pointer-events-none mix-blend-screen" />
                )}

                {/* Glassy Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 pointer-events-none z-20" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4 z-10">
                    {!isEmpty && (
                    <>
                        {/* Background Pattern - subtle */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

                        {/* Icon Container - No longer floats */}
                        <div className="relative transform transition-transform group-hover:scale-110 duration-300">
                            {/* Scale icon slightly up to match "Banner" feel */}
                            <div className="scale-[1.5] md:scale-[2.2]">
                                {isMusic ? (
                                    /* Rotating CD Animation */
                                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-300 shadow-md border-[0.5px] border-gray-400/30 animate-[spin_4s_linear_infinite] overflow-hidden">
                                        {/* Iridescent / Shine Effect */}
                                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.8),transparent,rgba(255,255,0.5),transparent)] opacity-60" />
                                        
                                        {/* Inner Ring (grooves) */}
                                        <div className="absolute inset-[10%] rounded-full border border-gray-400/10" />
                                        <div className="absolute inset-[25%] rounded-full border border-gray-400/10" />

                                        {/* Center Hole Assembly */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-transparent rounded-full border border-gray-400/30">
                                            {/* Matches channel background color to simulate hole transparency */}
                                            <div className="absolute inset-0 rounded-full bg-green-100 opacity-90" />
                                        </div>
                                    </div>
                                ) : (
                                    channel.icon
                                )}
                            </div>
                        </div>
                    </>
                    )}
                </div>
            </div>
            
            {/* Soft Shadow behind the whole shape (optional, relying on SVG glow mostly) */}
            {!isEmpty && (
                <div className="absolute inset-4 rounded-[2rem] shadow-lg transition-all duration-300 group-hover:shadow-xl -z-10 bg-white/50" />
            )}
        </div>
    </div>
  );
};

export default GridChannel;
