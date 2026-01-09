import React, { useRef } from 'react';

// ...existing code...
const MiiCharacter: React.FC = () => {
  const isSeeking = useRef(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget as HTMLVideoElement;
    // If we're within ~60ms of the end, jump back a tiny bit to avoid a visible gap.
    if (!isSeeking.current && v.duration && v.duration - v.currentTime < 0.06) {
      isSeeking.current = true;
      const resume = () => {
        isSeeking.current = false;
        v.play().catch(() => { });
        v.removeEventListener('seeked', resume);
      };
      v.addEventListener('seeked', resume);
      // seek to a tiny offset (not 0) to avoid some decoders' edge-case freeze
      v.currentTime = 0.02;
    }
  };

  const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget as HTMLVideoElement;
    if (!isSeeking.current) {
      isSeeking.current = true;
      const resume = () => {
        isSeeking.current = false;
        v.play().catch(() => { });
        v.removeEventListener('seeked', resume);
      };
      v.addEventListener('seeked', resume);
      v.currentTime = 0.02;
    }
  };

  return (
    // fixed to the viewport center horizontally and a consistent distance from the bottom
    <div
      className="pointer-events-none flex items-end justify-center"
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-20vh',
        width: '70vh',
        height: '70vh',
        zIndex: 50,
      }}
    >
      <video
        // Ensure you have a file named 'mii.webm' in your public folder
        src="/mii.webm"
        autoPlay
        // removed native loop to control looping manually (avoids Android Chrome stutter)
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain drop-shadow-2xl transform scale-110"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        // Ensure transparency is respected
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};
// ...existing code...
export default MiiCharacter;