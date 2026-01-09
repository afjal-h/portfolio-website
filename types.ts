import React from 'react';

export type ViewState = 'GRID' | 'START_SCREEN' | 'APP';

export enum AppId {
  ABOUT = 'about',
  VIDEO = 'video',
  MUSIC = 'music',
  MAIL = 'mail',
  EMPTY = 'empty'
}

export interface ChannelData {
  id: AppId;
  title: string;
  icon: React.ReactNode;
  color: string;
  bannerImage?: string; // URL for the start screen banner
  description?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string; // Embed or link
  duration: string;
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  url: string; // Audio file URL
  cover: string;
}