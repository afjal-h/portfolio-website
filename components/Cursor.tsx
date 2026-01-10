import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const isClickingRef = useRef(false);
    const position = useRef({ x: -100, y: -100 });
    const lastPosition = useRef({ x: -100, y: -100 });
    const rotation = useRef(0);
    const targetRotation = useRef(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            // Common breakpoint for desktop
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const updatePosition = (e: MouseEvent) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            const dx = currentX - lastPosition.current.x;
            lastPosition.current = { x: currentX, y: currentY };

            position.current = { x: currentX, y: currentY };

            const sensitivity = 2.0;
            const maxRotation = 25;

            targetRotation.current = Math.max(Math.min(dx * sensitivity, maxRotation), -maxRotation);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => { isClickingRef.current = true; };
        const handleMouseUp = () => { isClickingRef.current = false; };

        window.addEventListener('mousemove', updatePosition, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        let rafId: number;
        const animate = () => {
            if (cursorRef.current) {
                rotation.current += (targetRotation.current - rotation.current) * 0.15;
                targetRotation.current *= 0.8;

                const scale = isClickingRef.current ? 0.9 : 1;
                // Align tip: translate(-12%, -8%) positions the index finger tip roughly at the cursor coordinates
                cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) rotate(${rotation.current}deg) scale(${scale})`;
            }
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(rafId);
        };
    }, [isVisible, isDesktop]);

    // Completely hide on mobile
    if (!isDesktop) return null;

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                transform: 'translate3d(-100px, -100px, 0)'
            }}
        >
            <div className="relative">
                {/* Custom Wii Cursor SVG */}
                {/* Hotspot alignment: viewBox is -6 -6 20 20. Origin (0,0) is at 6,6 relative to box start. 6/20 = 30%. */}
                <div
                    className="relative w-16 md:w-20 h-auto filter drop-shadow-[2px_4px_6px_rgba(0,0,0,0.3)]"
                    style={{ transform: 'translate(-30%, -30%)' }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="-6 -6 20 20"
                        version="1.1"
                        id="svg1"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <defs id="defs1">
                            <linearGradient id="linearGradient4">
                                <stop style={{ stopColor: '#bfe2ff', stopOpacity: 1 }} offset="0.1" id="stop3" />
                                <stop style={{ stopColor: '#ffffff', stopOpacity: 1 }} offset="0.8" id="stop4" />
                            </linearGradient>
                            <linearGradient id="linearGradient2">
                                <stop style={{ stopColor: '#bfe2ff', stopOpacity: 1 }} offset="0.1" id="stop1" />
                                <stop style={{ stopColor: '#ffffff', stopOpacity: 1 }} offset="0.8" id="stop2" />
                            </linearGradient>
                            <linearGradient
                                xlinkHref="#linearGradient2"
                                id="linearGradient40"
                                gradientUnits="userSpaceOnUse"
                                x1="100.22274"
                                y1="155.46613"
                                x2="100.22274"
                                y2="148.26958"
                            />
                            <linearGradient
                                xlinkHref="#linearGradient4"
                                id="linearGradient42"
                                x1="100.22274"
                                y1="155.46613"
                                x2="100.22274"
                                y2="148.26958"
                                gradientUnits="userSpaceOnUse"
                            />
                        </defs>
                        <g id="g68" transform="translate(8.5221861e-5,8.1085126e-4)" style={{ display: 'inline' }}>
                            <g id="g3" transform="translate(0.1695841,-0.08889199)" style={{ display: 'inline' }}>
                                <g id="layer2" style={{ display: 'inline' }} transform="translate(-101.26042,-144.56232)">
                                    <path
                                        style={{ fill: '#000000', fillOpacity: 1, stroke: '#000000', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'miter', strokeOpacity: 1, paintOrder: 'normal' }}
                                        xlinkHref="#path15"
                                        id="path1"
                                        d="m 101.18359,148.24023 -0.21679,0.18165 c -0.37574,0.31179 -0.59375,0.77345 -0.59375,1.26171 v 2.0918 c 0,0.336 0.146,0.65549 0.40039,0.875 l 1.48242,1.2793 c 0.25439,0.21951 0.40039,0.539 0.40039,0.875 v 0.18359 c 0,0.29225 0.23705,0.5293 0.5293,0.5293 h 4.40234 c 0.27053,0.0217 0.5076,-0.18064 0.5293,-0.45117 0,-0.34434 0.10632,-0.67949 0.30469,-0.96094 l 0.71484,-1.01367 c 0.19835,-0.28145 0.29297,-0.6166 0.29297,-0.96094 v -2.77148 l -7.48242,0.11523 v 0.22851 a 0.31950433,0.31950433 135 0 1 -0.32032,0.32032 h -0.125 a 0.31950433,0.31950433 45 0 1 -0.31836,-0.32032 v -0.22851 z"
                                    />
                                    <path
                                        style={{ display: 'inline', fill: '#000000', stroke: '#000000', strokeWidth: 3.3999, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                                        xlinkHref="#path11"
                                        id="path2"
                                        d="m 102.74609,142.19141 v 5.97656 z"
                                    />
                                    <path
                                        style={{ fill: '#000000', stroke: '#000000', strokeWidth: 3.4, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                                        xlinkHref="#path12"
                                        id="path3"
                                        d="m 104.9082,146.95312 v 0.98829 z"
                                        transform="translate(0.14188336)"
                                    />
                                    <path
                                        style={{ fill: '#000000', stroke: '#000000', strokeWidth: 3.1, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                                        xlinkHref="#path13"
                                        id="path4"
                                        d="m 106.91992,147.28125 v 0.79883 z"
                                        transform="translate(0.07093669)"
                                    />
                                    <path
                                        style={{ fill: '#000000', stroke: '#000000', strokeWidth: 3.1, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                                        xlinkHref="#path14"
                                        id="path5"
                                        d="m 108.78125,147.8457 v 1.06446 z"
                                    />
                                </g>
                                <g id="layer3" style={{ display: 'inline' }} transform="translate(-101.26042,-144.56232)">
                                    <path
                                        style={{ display: 'inline', mixBlendMode: 'normal', fill: 'url(#linearGradient40)', fillRule: 'nonzero', stroke: 'url(#linearGradient42)', strokeWidth: 0.3, strokeLinecap: 'round', strokeLinejoin: 'miter' }}
                                        d="m 109.44141,149.35938 v 2.77083 c 0,0.34434 -0.10648,0.68025 -0.30485,0.9617 l -0.71374,1.01267 c -0.19837,0.28145 -0.30485,0.61736 -0.30485,0.9617 -0.0217,0.27053 -0.25864,0.47224 -0.52917,0.45052 h -4.40298 c -0.29225,0 -0.52917,-0.23692 -0.52917,-0.52917 v -0.18346 c 0,-0.336 -0.14624,-0.65537 -0.40063,-0.87488 l -1.48265,-1.27942 c -0.25439,-0.21951 -0.40063,-0.53888 -0.40063,-0.87488 v -2.09071 c 0,-0.48826 0.2174,-0.95116 0.59314,-1.26295 l 0.21723,-0.18026 v 1.23307 0.22971 a 0.31950433,0.31950433 45 0 0 0.3195,0.3195 h 0.12461 a 0.31950433,0.31950433 135 0 0 0.3195,-0.3195 v -0.22971 -1.28237 h 7.45568 z"
                                        id="path6"
                                    />
                                    <path style={{ display: 'inline', fill: 'none', stroke: '#ffffff', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="m 102.74687,142.19218 v 5.97508" id="path11" />
                                    <path style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="m 104.90812,147.94122 v -0.98841" id="path12" />
                                    <path style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="m 106.91936,147.28081 v 0.79897" id="path13" />
                                    <path style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="m 108.78061,147.8463 v 1.06461" id="path14" />
                                    <path style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 0.2, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="m 103.59738,147.6298 v 0.0419 a 0.214437,0.214437 45.372505 0 0 0.21165,0.21442 l 0.0381,5e-4 a 0.20893213,0.20893213 135.37251 0 0 0.21165,-0.20892 v -0.0477" id="path17" transform="translate(0,0.26888592)" />
                                    <use x="0" y="0" xlinkHref="#path17" id="use37" transform="translate(4.0226084)" style={{ fill: 'none', stroke: '#ffffff' }} />
                                    <use x="0" y="0" xlinkHref="#path17" id="use38" transform="translate(2.1600749)" style={{ fill: 'none', stroke: '#ffffff' }} />
                                </g>
                            </g>
                            <g id="layer12" style={{ display: 'inline' }}>
                                <g id="layer4" style={{ display: 'inline' }} transform="translate(-101.09084,-144.65121)">
                                    <path
                                        style={{ display: 'inline', fill: 'none', fillRule: 'nonzero', stroke: '#008cff', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeOpacity: 1 }}
                                        d="m 104.55548,149.51174 h 1.11107 v 3.97909"
                                        id="path42"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>

                    {/* Player 1 Indicator - Positioned over the hand body */}
                    <div className="absolute top-[48%] left-0 w-full flex justify-center pointer-events-none">
                        <span
                            className="text-[#0095ff] font-extrabold text-sm md:text-lg font-sans tracking-tighter"
                            style={{ textShadow: '0px 1px 1px rgba(255,255,255,0.8)' }}
                        >

                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cursor;