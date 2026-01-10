import React, { useEffect, useRef } from 'react';

function getGridSize() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return 24; // smaller grid on mobile
    }
    return 40;
}
const PULSE_DURATION = 1200; // ms
const PULSE_COUNT = 12; // how many squares pulse at once

function getGridDimensions(gridSize: number) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
        cols: Math.ceil(w / gridSize),
        rows: Math.ceil(h / gridSize)
    };
}

const PulsatingGrid: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [gridSize, setGridSize] = React.useState(getGridSize());
    const [dimensions, setDimensions] = React.useState(getGridDimensions(gridSize));

    useEffect(() => {
        const handleResize = () => {
            const newSize = getGridSize();
            setGridSize(newSize);
            setDimensions(getGridDimensions(newSize));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Assign a persistent random delay and duration to each square
    const squareDelays = React.useMemo(
        () => Array.from({ length: dimensions.cols * dimensions.rows }, () => Math.floor(Math.random() * 1200)),
        [dimensions]
    );
    const squareDurations = React.useMemo(
        () => Array.from({ length: dimensions.cols * dimensions.rows }, () => 700 + Math.floor(Math.random() * 900)),
        [dimensions]
    );

    useEffect(() => {
        const squares: HTMLDivElement[] = Array.from(
            gridRef.current?.querySelectorAll('.grid-square') || []
        );
        let timeout: NodeJS.Timeout;
        function pulseRandomSquares() {
            squares.forEach(sq => sq.classList.remove('pulse'));
            const chosen = new Set<number>();
            while (chosen.size < Math.min(PULSE_COUNT, squares.length)) {
                chosen.add(Math.floor(Math.random() * squares.length));
            }
            chosen.forEach(idx => squares[idx]?.classList.add('pulse'));
            // Next pulse after a random interval (900-1600ms)
            timeout = setTimeout(pulseRandomSquares, 900 + Math.floor(Math.random() * 700));
        }
        pulseRandomSquares();
        return () => clearTimeout(timeout);
    }, [dimensions]);

    const { cols, rows } = dimensions;
    // Calculate the pixel-perfect grid size and center it
    const gridWidth = cols * gridSize;
    const gridHeight = rows * gridSize;
    const left = `calc(50% - ${gridWidth / 2}px)`;
    const top = `calc(50% - ${gridHeight / 2}px)`;

    return (
        <div className="absolute inset-0 z-5 pointer-events-none">
            {/* Static grid lines */}
            <div
                style={{
                    position: 'absolute',
                    left,
                    top,
                    width: `${gridWidth}px`,
                    height: `${gridHeight}px`,
                    backgroundImage: `linear-gradient(0deg, rgba(107,114,128,0.13) 1px, transparent 1px),linear-gradient(90deg, rgba(107,114,128,0.13) 1px, transparent 1px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    zIndex: 1,
                }}
            />
            {/* Animated squares */}
            <div
                ref={gridRef}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, ${gridSize}px)`,
                    gridTemplateRows: `repeat(${rows}, ${gridSize}px)`,
                    width: `${gridWidth}px`,
                    height: `${gridHeight}px`,
                    position: 'absolute',
                    left,
                    top,
                    zIndex: 2,
                }}
            >
                {Array.from({ length: cols * rows }).map((_, i) => {
                    // Each square gets a persistent random transition delay and duration
                    const delay = squareDelays[i] || 0;
                    const duration = squareDurations[i] || 900;
                    return (
                        <div
                            key={i}
                            className="grid-square"
                            style={{
                                width: `${gridSize}px`,
                                height: `${gridSize}px`,
                                background: 'rgba(107,114,128,0.10)',
                                transition: `background ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`
                            }}
                        />
                    );
                })}
                <style>{`
          .grid-square.pulse {
            background: rgba(74,85,104,0.28) !important;
            transition: background 900ms cubic-bezier(0.4,0,0.2,1), opacity 900ms cubic-bezier(0.4,0,0.2,1) !important;
          }
        `}</style>
            </div>
        </div>
    );
};

export default PulsatingGrid;
