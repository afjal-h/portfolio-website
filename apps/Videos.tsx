import React, { useState } from 'react';
import { Play, Clock, X } from 'lucide-react';
import { VIDEOS } from '../constants';
import { VideoItem } from '../types';
import WiiButton from '../components/WiiButton';

interface VideoAppProps {
  onHome?: () => void;
}

const VideoApp: React.FC<VideoAppProps> = ({ onHome }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="h-full w-full p-4 md:p-8 pb-32 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 tracking-tight border-b-2 border-red-100 pb-4 inline-block">
            Video Productions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {VIDEOS.map((video) => (
            <div 
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-red-400 transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                        <Play className="text-red-500 fill-current w-6 h-6 md:w-8 md:h-8" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock size={12} /> {video.duration}
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-gray-800 text-base md:text-lg group-hover:text-red-500 transition-colors line-clamp-1">{video.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Cinematography / Editing</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex justify-center pb-8 border-t border-gray-200 pt-8">
             <WiiButton onClick={onHome} className="px-8 py-3 text-lg rounded-full shadow-lg border-gray-300">
                Return to Home
            </WiiButton>
        </div>
      </div>

      {/* Video Modal Player Overlay */}
      {activeVideo && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-12 animate-[fade-in_0.2s_ease-out]"
            onClick={() => setActiveVideo(null)} // Click outside to close
        >
            <div 
                className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl aspect-video flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
            >
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                    <button 
                        onClick={() => setActiveVideo(null)}
                        className="bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <video
                    key={activeVideo.id} // Add key to force re-render on video change
                    src={activeVideo.url}
                    className="w-full h-full"
                    autoPlay
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    disableRemotePlayback
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default VideoApp;