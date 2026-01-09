import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { TRACKS } from '../constants';
import { TrackItem } from '../types';

interface MusicAppProps {
  onHome?: () => void;
}

const MusicApp: React.FC<MusicAppProps> = ({ onHome }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent || 0);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden rounded-b-3xl">
      
      {/* Visualizer / Cover Art Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative min-h-[50%] md:min-h-auto">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        
        {/* CD Art */}
        <div className={`
            relative w-48 h-48 md:w-96 md:h-96 rounded-full border-4 md:border-8 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden shrink-0
            ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}
        `}>
            <div className="absolute inset-0 bg-gray-900 rounded-full flex items-center justify-center z-10">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-full border-2 border-gray-700"></div>
            </div>
            <img src={currentTrack.cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            
            {/* Gloss */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Info */}
        <div className="mt-6 md:mt-8 text-center z-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide">{currentTrack.title}</h2>
            <p className="text-gray-400 text-lg md:text-xl mt-2">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Playlist & Controls */}
      <div className="w-full md:w-96 bg-gray-800/80 backdrop-blur-md p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-700 flex flex-col pb-24 md:pb-6">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 md:mb-6 pr-2 max-h-48 md:max-h-full">
            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-2 md:mb-4">Playlist</h3>
            {TRACKS.map((track, idx) => (
                <button
                    key={track.id}
                    onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                    className={`
                        w-full flex items-center p-2 md:p-3 rounded-xl transition-all
                        ${currentTrackIndex === idx ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-white/5 hover:bg-white/10 border border-transparent'}
                    `}
                >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3 text-[10px] md:text-xs font-bold">
                        {idx + 1}
                    </div>
                    <div className="flex-1 text-left truncate font-medium text-sm md:text-base">
                        {track.title}
                    </div>
                    {currentTrackIndex === idx && isPlaying && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                </button>
            ))}
        </div>

        {/* Player Controls */}
        <div className="bg-gray-900/50 rounded-2xl p-4 md:p-6 border border-gray-700">
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-1 rounded-full mb-4 md:mb-6 overflow-hidden">
                <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="flex items-center justify-between">
                <button onClick={prevTrack} className="p-2 md:p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                    <SkipBack size={20} className="md:w-6 md:h-6" fill="currentColor" />
                </button>
                
                <button 
                    onClick={togglePlay}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-400 text-black flex items-center justify-center shadow-lg transform hover:scale-105 transition-all"
                >
                    {isPlaying ? <Pause size={24} className="md:w-[28px]" fill="currentColor" /> : <Play size={24} className="md:w-[28px]" fill="currentColor" ml-1 />}
                </button>

                <button onClick={nextTrack} className="p-2 md:p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                    <SkipForward size={20} className="md:w-6 md:h-6" fill="currentColor" />
                </button>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
                <Volume2 size={14} />
                <span>Stereo Output</span>
            </div>
        </div>

        {/* Footer Navigation */}
        <button 
            onClick={onHome}
            className="mt-6 w-full py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl font-bold transition-colors shadow-lg border border-gray-600"
        >
            Return to Home
        </button>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
    </div>
  );
};

export default MusicApp;