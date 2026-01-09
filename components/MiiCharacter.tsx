
import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- Helper Hook for the Typing Effect ---
const useTypingEffect = (text: string, speed = 40) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Always reset when text changes
    
    if (text) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index += 1;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [text, speed]);

  return displayedText;
};


// --- Self-contained Speech Bubble Component ---
const SpeechBubble = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const typedText = useTypingEffect(text);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typedText === text) {
      const visibilityTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 400); // Let fade-out animation finish
      }, 3500);

      return () => clearTimeout(visibilityTimer);
    }
  }, [typedText, text, onComplete]);

  return (
    <div className={`speech-bubble ${isVisible ? 'visible' : ''}`}>
      {typedText}
    </div>
  );
};


// --- Main Mii Character Component ---
const videoSources = [
  '/mii loop/thinking.webm',         // 0
  '/mii loop/wave.webm',             // 1
  '/mii loop/HANDS UP PRAYING.webm', // 2
  '/mii loop/arms moving eyes shut.webm',// 3
  '/mii loop/head swaying side to side.webm', // 4
  '/mii loop/point wink.webm',       // 5
  '/mii loop/why so down.webm',      // 6
];

const dialogueAndAnimations = [
    { dialogue: "Hope you're enjoying your visit :D ", videoIndex: 0 },
    { dialogue: "Welcome to my website ^_^", videoIndex: 1 },
    { dialogue: "ALLAH!", videoIndex: 2 },
    { dialogue: "My life is nothing without art.", videoIndex: 3 },
    { dialogue: "If you wanna work DM ME! >:D ", videoIndex: 4 },
    { dialogue: "Make sure u visit every channel!", videoIndex: 5 },
    { dialogue: "It's so cold in the UK bruh", videoIndex: 6 },
    { dialogue: "Follow me on Instagram @kid.kareem!!", videoIndex: 4 },
    { dialogue: "PREMIERE PRO KEEPS CRASHING ON ME BRUH", videoIndex: 2 },
    { dialogue: "Do you fw me? ", videoIndex: 0 },
];

const MiiCharacter: React.FC = () => {
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1); // Start with "wave.webm"
  const [currentDialogue, setCurrentDialogue] = useState<{ key: number; text: string } | null>(null);

  const handleVideoClick = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * dialogueAndAnimations.length);
    } while (dialogueAndAnimations[randomIndex].videoIndex === currentVideoIndex && dialogueAndAnimations.length > 1);

    const { dialogue, videoIndex: newVideoIndex } = dialogueAndAnimations[randomIndex];

    setCurrentDialogue({ key: Date.now(), text: dialogue });

    const inactivePlayerIndex = 1 - activePlayerIndex;
    const inactiveVideoEl = videoRefs[inactivePlayerIndex].current;
    const activeVideoEl = videoRefs[activePlayerIndex].current;

    if (!inactiveVideoEl || !activeVideoEl) return;

    const performSwap = () => {
      inactiveVideoEl.play().catch(console.error);
      setActivePlayerIndex(inactivePlayerIndex); // Trigger the cross-fade
      setCurrentVideoIndex(newVideoIndex);
      
      setTimeout(() => {
        activeVideoEl.pause();
      }, 100); 

      inactiveVideoEl.removeEventListener('canplaythrough', performSwap);
    };

    inactiveVideoEl.src = videoSources[newVideoIndex];
    inactiveVideoEl.load();

    if (inactiveVideoEl.readyState >= 4) { // HAVE_ENOUGH_DATA
      performSwap();
    } else {
      inactiveVideoEl.addEventListener('canplaythrough', performSwap);
    }
  };

  const handleVideoEnded = useCallback((playerIndex: number) => {
    const videoEl = videoRefs[playerIndex].current;
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play().catch(console.error);
    }
  }, []);

  return (
    <>
      <style>{`
        .mii-video {
          cursor: pointer !important;
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0;
          transition: opacity 80ms ease-in-out; /* The cross-fade */
        }
        .mii-video.active {
          opacity: 1;
        }
        .speech-bubble-container {
          position: absolute; top: 20%; left: 50%;
          transform: translateX(-50%);
          width: 90%; max-width: 320px; z-index: 10;
          pointer-events: none;
        }
        .speech-bubble {
          position: relative; background: #f8f9fa;
          border-radius: 12px; padding: 14px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 1.1rem; font-weight: 500; color: #212529;
          text-align: center; line-height: 1.4;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08);
          border: 1px solid #dee2e6; opacity: 0;
          transform: translateY(15px) scale(0.95);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .speech-bubble.visible { opacity: 1; transform: translateY(0) scale(1); }
        .speech-bubble::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          width: 0; height: 0; border: 18px solid transparent;
          border-top-color: #f8f9fa; border-bottom: 0;
          transform: translateX(-50%) translateY(99%);
        }
      `}</style>
      
      {/* REMOVED zIndex: 10001 from this container */}
      <div style={{ position: 'fixed', left: '50%', transform: 'translateX(-51%)', bottom: '-20vh', width: '70vh', height: '70vh' }}>
        <div className="speech-bubble-container">
          {currentDialogue && <SpeechBubble key={currentDialogue.key} text={currentDialogue.text} onComplete={() => setCurrentDialogue(null)} />}
        </div>

        <div className="relative w-full h-full object-contain drop-shadow-2xl transform scale-110 pointer-events-auto" onClick={handleVideoClick}>
          <video
            ref={videoRefs[0]}
            className={`mii-video ${activePlayerIndex === 0 ? 'active' : ''}`}
            src={videoSources[1]} // Initial video is "wave"
            autoPlay
            muted
            playsInline
            onEnded={() => handleVideoEnded(0)}
            onContextMenu={(e) => e.preventDefault()}
            disablePictureInPicture
            disableRemotePlayback
          />
          <video
            ref={videoRefs[1]}
            className={`mii-video ${activePlayerIndex === 1 ? 'active' : ''}`}
            autoPlay
            muted
            playsInline
            onEnded={() => handleVideoEnded(1)}
            onContextMenu={(e) => e.preventDefault()}
            disablePictureInPicture
            disableRemotePlayback
          />
        </div>
      </div>
    </>
  );
};

export default MiiCharacter;
