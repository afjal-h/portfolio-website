import React from 'react';
import { User, Video, Music, Mail } from 'lucide-react';
import { AppId, ChannelData, VideoItem, TrackItem } from './types';

export const CHANNELS: ChannelData[] = [
  {
    id: AppId.ABOUT,
    title: "About Me",
    icon: <User className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />,
    color: "bg-blue-100",
    description: "Learn more about my background, skills, and experience."
  },
  {
    id: AppId.VIDEO,
    title: "Video Portfolio",
    icon: <img src="/assets/yt banner.png" alt="Video Portfolio" className="w-full h-full object-cover" />,
    color: "bg-red-100",
    description: "A showcase of my cinematography and editing work.",
    previewVideo: "/videos/accordion.mp4"
  },
  {
    id: AppId.MUSIC,
    title: "Beat Maker",
    icon: <Music className="w-8 h-8 md:w-12 md:h-12 text-green-500" />,
    color: "bg-green-100",
    description: "Listen to my original beats and music productions."
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: "Cinematic Reel 2024",
    thumbnail: "https://picsum.photos/400/225?random=1",
    url: "#",
    duration: "2:34"
  },
  {
    id: 'v2',
    title: "Commercial Project",
    thumbnail: "https://picsum.photos/400/225?random=2",
    url: "#",
    duration: "0:45"
  },
  {
    id: 'v3',
    title: "Short Film: Echoes",
    thumbnail: "https://picsum.photos/400/225?random=3",
    url: "#",
    duration: "12:10"
  },
  {
    id: 'v4',
    title: "Music Video",
    thumbnail: "https://picsum.photos/400/225?random=4",
    url: "#",
    duration: "3:50"
  },
];

export const TRACKS: TrackItem[] = [
  {
    id: 't1',
    title: "Neon Highway",
    artist: "My Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/200/200?random=10"
  },
  {
    id: 't2',
    title: "Lo-Fi Sunday",
    artist: "My Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/200/200?random=11"
  },
  {
    id: 't3',
    title: "Cyber Funk",
    artist: "My Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/200/200?random=12"
  }
];