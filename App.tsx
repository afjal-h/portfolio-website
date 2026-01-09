import React, { useState, useEffect } from 'react';
import { AppId, ChannelData, ViewState } from './types';
import { CHANNELS } from './constants';
import Cursor from './components/Cursor';
import GridChannel from './components/GridChannel';
import StartScreen from './components/StartScreen';
import BottomBar from './components/BottomBar';
import AboutApp from './apps/About';
import VideoApp from './apps/Videos';
import MusicApp from './apps/Music';
import MailApp from './apps/Mail';
import MiiCharacter from './components/MiiCharacter';
import CRTOverlay from './components/CRTOverlay';
import { ArrowLeft } from 'lucide-react';

// Channel Shape Definition
const CHANNEL_PATH = "M196 3.5C263.661 3.5 319.468 3.49908 358.541 5.64062L362.27 5.85449L362.278 5.85547C367.854 6.21006 373.127 8.51403 377.176 12.3643C381.218 16.209 383.783 21.3508 384.421 26.8926C387.028 47.9647 388.5 82.1481 388.5 108.5C388.5 134.842 387.029 169.009 384.423 190.083L384.424 190.084C383.79 195.635 381.224 200.786 377.176 204.636C373.127 208.486 367.854 210.79 362.278 211.145L362.27 211.146C323.056 213.501 265.844 213.5 196 213.5C126.156 213.5 68.9442 213.501 29.7305 211.146L29.7217 211.145C24.146 210.79 18.8726 208.486 14.8242 204.636C10.7759 200.786 8.20994 195.635 7.57617 190.084V190.083C4.97044 169.009 3.5 134.882 3.5 108.5C3.5 82.108 4.97152 47.9647 7.5791 26.8926C8.21742 21.3508 10.7816 16.209 14.8242 12.3643C18.8726 8.51402 24.146 6.21006 29.7217 5.85547L29.7305 5.85449L33.459 5.64062C72.5319 3.49908 128.339 3.5 196 3.5Z";

const MASK_URI = `data:image/svg+xml,%3Csvg width='392' height='217' viewBox='0 0 392 217' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='${CHANNEL_PATH}' fill='black'/%3E%3C/svg%3E`;

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('GRID');
  const [activeChannel, setActiveChannel] = useState<ChannelData | null>(null);

  // Mail State for Swipe Animation
  const [isMailOpen, setIsMailOpen] = useState(false); // Controls mounting
  const [isMailVisible, setIsMailVisible] = useState(false); // Controls CSS transition

  const [blackout, setBlackout] = useState(false);

  const [bootPhase, setBootPhase] = useState<'NOTICE' | 'FADING_TEXT' | 'WAITING' | 'FADING_OVERLAY' | 'COMPLETE'>('NOTICE');

  const [animState, setAnimState] = useState<'IDLE' | 'MEASURING' | 'EXPANDING' | 'OPEN'>('IDLE');
  const [geometry, setGeometry] = useState<{
    start: { top: number; left: number; width: number; height: number };
    end: { top: number; left: number; width: number; height: number };
  } | null>(null);

  const handleDisclaimerClick = () => {
    if (bootPhase !== 'NOTICE') return;
    setBootPhase('FADING_TEXT');
    setTimeout(() => {
      setBootPhase('WAITING');
      setTimeout(() => {
        setBootPhase('FADING_OVERLAY');
        setTimeout(() => {
          setBootPhase('COMPLETE');
        }, 1500);
      }, 200);
    }, 1000);
  };

  const calculateGeometry = (channelRect: DOMRect) => {
    const container = document.getElementById('crt-warp-container');
    if (!container) return null;

    // Get the visual (scaled) rect and the internal (layout) dimensions
    const containerRect = container.getBoundingClientRect();
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Calculate the active scale factor (prevent divide by zero)
    const scaleX = containerRect.width / containerWidth || 1;
    const scaleY = containerRect.height / containerHeight || 1;

    const isMd = window.innerWidth >= 768;

    // Calculate internal coordinates
    const startTop = (channelRect.top - containerRect.top) / scaleY;
    const startLeft = (channelRect.left - containerRect.left) / scaleX;
    const startWidth = channelRect.width / scaleX;
    const startHeight = channelRect.height / scaleY;

    // End State Dimensions
    // Enforce aspect ratio of the SVG (392/217) to prevent shape distortion
    const ASPECT_RATIO = 392 / 217;
    const marginX = containerWidth * (isMd ? 0.08 : 0.05); // 8% margin on desktop, 5% on mobile

    const maxW = containerWidth - (marginX * 2);
    const maxH = containerHeight * (isMd ? 0.82 : 0.75);

    let targetW = maxW;
    let targetH = targetW / ASPECT_RATIO;

    if (targetH > maxH) {
      targetH = maxH;
      targetW = targetH * ASPECT_RATIO;
    }

    const start = {
      top: startTop,
      left: startLeft,
      width: startWidth,
      height: startHeight,
    };

    const end = {
      top: (containerHeight - targetH) / 2,
      left: (containerWidth - targetW) / 2,
      width: targetW,
      height: targetH,
    };

    return { start, end };
  };

  const handleChannelClick = (channel: ChannelData, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const geom = calculateGeometry(rect);
    if (!geom) return;

    setActiveChannel(channel);
    setGeometry(geom);
    setAnimState('MEASURING');

    setTimeout(() => {
      setAnimState('EXPANDING');
      setView('START_SCREEN');
    }, 16);

    setTimeout(() => setAnimState('OPEN'), 600);
  };

  const switchChannel = (direction: 'next' | 'prev') => {
    if (!activeChannel) return;
    const currentIndex = CHANNELS.findIndex(c => c.id === activeChannel.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % CHANNELS.length;
    } else {
      newIndex = (currentIndex - 1 + CHANNELS.length) % CHANNELS.length;
    }

    const nextChannel = CHANNELS[newIndex];

    // Attempt to update geometry to animate back to the correct place if the user clicks 'Wii Menu'
    // This makes sure we shrink back to the NEW channel's grid position.
    setTimeout(() => {
      const nextElement = document.getElementById(`channel-card-${nextChannel.id}`);
      if (nextElement) {
        const rect = nextElement.getBoundingClientRect();
        const newGeom = calculateGeometry(rect);
        if (newGeom) {
          setGeometry(newGeom);
        }
      }
    }, 0);

    setActiveChannel(nextChannel);
  };

  const handleBackToGrid = () => {
    if (geometry) {
      setAnimState('EXPANDING');
      setTimeout(() => {
        setAnimState('MEASURING');
        setView('GRID');
      }, 16);
      setTimeout(() => {
        setAnimState('IDLE');
        setActiveChannel(null);
        setGeometry(null);
      }, 600);
    } else {
      setView('GRID');
      setActiveChannel(null);
    }
  };

  const handleStartApp = () => {
    setBlackout(true);
    setTimeout(() => {
      setView('APP');
      setTimeout(() => {
        setBlackout(false);
      }, 300);
    }, 1000);
  };

  const handleOpenMail = () => {
    setIsMailOpen(true);
    // Double requestAnimationFrame to ensure the DOM has painted the "closed" state (opacity 0 / translate full)
    // before applying the "open" state (opacity 100 / translate 0), triggering the CSS transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsMailVisible(true);
      });
    });
  };

  const handleCloseMail = () => {
    setIsMailVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      setIsMailOpen(false);
    }, 500);
  };

  const renderAppContent = () => {
    switch (activeChannel?.id) {
      case AppId.ABOUT: return <AboutApp onHome={handleBackToGrid} />;
      case AppId.VIDEO: return <VideoApp onHome={handleBackToGrid} />;
      case AppId.MUSIC: return <MusicApp onHome={handleBackToGrid} />;
      default: return null;
    }
  };

  const isTransitioning = animState === 'EXPANDING' || animState === 'MEASURING';
  const isOpen = animState === 'OPEN';
  const currentGeom = (animState === 'MEASURING' || animState === 'IDLE') && geometry ? geometry.start : geometry?.end;

  return (
    <>
      {/* 
        Cursor stays outside the warp container so it doesn't get distorted 
        by the barrel filter, making navigation easier while the rest 
        of the UI feels curved.
      */}
      <Cursor />

      <div id="crt-warp-container">
        <CRTOverlay />

        {/* Blackout Layer for App Transitions */}
        <div
          className={`fixed inset-0 bg-black z-[10001] pointer-events-none transition-opacity duration-500 ${blackout ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="relative w-full h-full text-gray-800 flex flex-col overflow-hidden">

          {bootPhase !== 'COMPLETE' && (
            <div
              onMouseDown={handleDisclaimerClick}
              className={`
                    absolute inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center p-8 text-center cursor-pointer 
                    transition-opacity duration-[1500ms] ease-in-out
                    ${bootPhase === 'FADING_OVERLAY' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <div className={`
                    max-w-2xl space-y-8 
                    transition-opacity duration-1000 ease-in-out
                    ${(bootPhase === 'NOTICE') ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white italic uppercase tracking-widest">Notice</h1>
                <div className="h-1 w-24 bg-white mx-auto rounded-full"></div>
                <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-300">
                  The content showcased in this portfolio is a showcase of MY creative development work.
                  <br /><br />
                  I love my friends for motivating me to get this far.
                </p>
                <div className="pt-12">
                  <p className="text-sm text-gray-500 uppercase tracking-widest animate-pulse">Press any button to continue</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative flex-1 w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-black z-30 pointer-events-none transition-opacity duration-300"
              style={{ opacity: (view === 'START_SCREEN' || isTransitioning) ? 1 : 0 }}
            />

            <div className={`relative w-full h-full transition-opacity duration-300 ${view === 'GRID' && !isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative z-20 w-full h-full flex flex-col items-center pt-24 md:pt-[12vh] pb-32 overflow-y-auto no-scrollbar">
                <div className="flex flex-wrap justify-center gap-4 md:gap-[4vh] w-full max-w-7xl px-4">
                  {CHANNELS.map((channel, index) => (
                    <div key={channel.id} className="w-[45%] md:w-[30%] lg:w-[25%] max-w-[320px] animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      <GridChannel channel={channel} onClick={handleChannelClick} index={index} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-[13%] md:bottom-[15%] left-1/2 -translate-x-1/2 z-50">
                <MiiCharacter />
              </div>
              <BottomBar onWiiClick={handleBackToGrid} onMailClick={handleOpenMail} />
            </div>

            {(isTransitioning || isOpen) && activeChannel && currentGeom && (
              <div
                className="absolute z-40 flex flex-col"
                style={{
                  top: currentGeom.top,
                  left: currentGeom.left,
                  width: currentGeom.width,
                  height: currentGeom.height,
                  transition: isTransitioning ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                  pointerEvents: isTransitioning ? 'none' : 'auto',
                  willChange: 'top, left, width, height'
                }}
              >
                {/* Shape Container with Shadow and Border */}
                <div className="relative w-full h-full filter drop-shadow-2xl">
                  {/* SVG Border Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full z-50 pointer-events-none overflow-visible"
                    viewBox="0 0 392 217"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={CHANNEL_PATH}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Masked Content */}
                  <div
                    className="w-full h-full overflow-hidden bg-white"
                    style={{
                      maskImage: `url("${MASK_URI}")`,
                      WebkitMaskImage: `url("${MASK_URI}")`,
                      maskSize: '100% 100%',
                      WebkitMaskSize: '100% 100%',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat'
                    }}
                  >
                    <StartScreen
                      channel={activeChannel}
                      onStart={handleStartApp}
                      onBack={handleBackToGrid}
                      onNext={() => switchChannel('next')}
                      onPrev={() => switchChannel('prev')}
                      layoutState={animState === 'MEASURING' ? 'GRID' : 'FULL'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mail Overlay with Swipe Animation */}
            {isMailOpen && (
              <MailApp visible={isMailVisible} onClose={handleCloseMail} />
            )}

            {view === 'APP' && activeChannel && (
              <div className="absolute inset-0 bg-white z-[60] flex flex-col">
                <div className="w-full h-16 bg-white/90 backdrop-blur border-b border-gray-300 flex items-center px-4 justify-between shrink-0">
                  <button onClick={() => setView('START_SCREEN')} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 px-4 py-2 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-bold">Wii Menu</span>
                  </button>
                  <span className="font-bold text-lg text-gray-700">{activeChannel?.title}</span>
                  <div className="w-8"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  {renderAppContent()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;