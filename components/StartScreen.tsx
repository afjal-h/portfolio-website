import React from 'react';
import { ChannelData } from '../types';
import WiiButton from './WiiButton';

interface StartScreenProps {
    channel: ChannelData;
    onStart: () => void;
    onBack: () => void;
    onPrev: () => void;
    onNext: () => void;
    disableAnimation?: boolean;
    style?: React.CSSProperties;
    layoutState?: 'GRID' | 'FULL';
}

const WiiArrowSVG = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 54 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
    >
        <path d="M49.8991 1.7876L1.80718 47.9936C1.39761 48.3871 1.39761 49.0423 1.80718 49.4358L49.8991 95.6417C50.5915 96.307 51.7323 95.7089 51.5791 94.761L44.1343 48.7147L51.5791 2.66832C51.7323 1.72043 50.5915 1.12235 49.8991 1.7876Z" fill="url(#paint0_radial_5_18)" stroke="#24479B" strokeWidth="3" />
        <defs>
            <radialGradient id="paint0_radial_5_18" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.0566 48.7147) scale(45.5 30.5453)">
                <stop stopColor="#CBF6FF" />
                <stop offset="1" stopColor="#62D6FF" />
            </radialGradient>
        </defs>
    </svg>
);

const StartScreen: React.FC<StartScreenProps> = ({
    channel,
    onStart,
    onBack,
    onPrev,
    onNext,
    layoutState = 'FULL'
}) => {

    const isGrid = layoutState === 'GRID';

    return (
        <div
            className="w-full h-full flex flex-col relative overflow-hidden bg-white"
            style={{ containerType: 'size' } as React.CSSProperties}
        >

            {/* Navigation Arrows */}
            <button
                onClick={onPrev}
                className={`absolute left-[2cqw] top-[43%] -translate-y-1/2 p-[1cqw] transition-all z-40 hover:scale-110 active:scale-95 flex items-center justify-center ${isGrid ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <WiiArrowSVG className="w-[5cqw] md:w-[2.5cqw] h-auto" />
            </button>
            <button
                onClick={onNext}
                className={`absolute right-[2cqw] top-[43%] -translate-y-1/2 p-[1cqw] transition-all z-40 hover:scale-110 active:scale-95 flex items-center justify-center ${isGrid ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <WiiArrowSVG className="w-[5cqw] md:w-[2.5cqw] h-auto rotate-180" />
            </button>

            {/* Banner Area */}
            <div className={`flex-1 ${channel.color} relative overflow-hidden flex flex-col items-center justify-center`}>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent" />

                {/* Video Preview - if available */}
                {channel.previewVideo && (
                    <video
                        autoPlay
                        muted
                        loop
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        style={{ filter: 'brightness(0.9)' }}
                    >
                        <source src={channel.previewVideo} type="video/mp4" />
                    </video>
                )}

                {/* Icon Container - hidden if video is playing */}
                {!channel.previewVideo && (
                    <div
                        className={`
                        absolute transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20
                        ${isGrid ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100' : 'top-[14%] left-1/2 -translate-x-1/2 translate-y-0 scale-100'}
                    `}
                    >
                        <div
                            className={`
                            transition-all duration-600 flex items-center justify-center
                            ${isGrid ? 'bg-transparent p-0 shadow-none' : 'bg-white p-[2cqh] rounded-full shadow-lg'}
                        `}
                        >
                            {/* 
                           Force child SVGs to fit this container via CSS arbitrary variant [&>svg] 
                           Icon size is roughly 16% of container height 
                        */}
                            <div className={`
                            relative flex items-center justify-center 
                            ${isGrid ? 'w-[30cqh] h-[30cqh]' : 'w-[16cqh] h-[16cqh]'}
                            [&>svg]:!w-full [&>svg]:!h-full
                        `}>
                                {channel.icon}
                            </div>
                        </div>
                    </div>
                )}

                {/* Text Content */}
                <div
                    className={`
                    z-10 text-center transition-opacity duration-500 w-full max-w-[80cqw]
                    ${channel.previewVideo ? 'delay-1000' : 'delay-100'}
                    ${isGrid ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}
                    mt-[22cqh] space-y-[2cqh]
                `}
                >
                    <h1 className="font-bold text-gray-700 tracking-tight leading-none" style={{ fontSize: '9cqh' }}>
                        {channel.title}
                    </h1>
                    <p className="text-gray-600 font-medium px-4 leading-relaxed" style={{ fontSize: '4cqh' }}>
                        {channel.description}
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                className={`
                flex items-center justify-center relative shrink-0 transition-transform duration-500 ease-out z-30
                ${isGrid ? 'translate-y-full' : 'translate-y-0'}
            `}
                style={{
                    height: '27cqh',
                    borderTopWidth: '0.4cqh',
                    borderColor: '#9ca3af',
                    gap: '5cqw',
                    backgroundImage: 'repeating-linear-gradient(to bottom, #dcdcdc 0%, #dcdcdc 50%, #d1d1d1 50%, #d1d1d1 100%)',
                    backgroundSize: '100% 4%' // Scales with height
                }}
            >
                {/* Subtle top inner shadow */}
                <div className="absolute top-0 left-0 right-0 bg-white/50" style={{ height: '0.2cqh' }} />

                <WiiButton
                    onClick={onBack}
                    className="font-normal text-[#505050] w-[28cqw] md:w-[24cqw] text-[4.5cqh] md:text-[4cqh] mb-[1.5cqh]"
                    // reduced height from 55% -> 48%
                    style={{ height: '48%' }}
                >
                    Wii Menu
                </WiiButton>

                <WiiButton
                    onClick={onStart}
                    className="font-normal text-[#333333] w-[28cqw] md:w-[24cqw] text-[4.5cqh] md:text-[4cqh] mb-[1.5cqh]"
                    active={true}
                    // reduced height from 55% -> 48%
                    style={{ height: '48%' }}
                >
                    Start
                </WiiButton>
            </div>
        </div>
    );
};

export default StartScreen;