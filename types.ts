// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Stream settings for managing live status
export interface StreamSettings extends CosmicObject {
  type: 'stream-settings';
  metadata: {
    is_live?: boolean;
    stream_url?: string;
    stream_title?: string;
    offline_message?: string;
    fallback_video?: {
      url: string;
      imgix_url: string;
    };
    max_viewers?: number;
    stream_key?: string;
  };
}

// Chat messages for live interaction
export interface ChatMessage extends CosmicObject {
  type: 'chat-messages';
  metadata: {
    username: string;
    message: string;
    timestamp: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    is_moderator?: boolean;
    user_color?: string;
  };
}

// Streamer profile information
export interface Profile extends CosmicObject {
  type: 'profiles';
  metadata: {
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    social_links?: {
      youtube?: string;
      twitter?: string;
      instagram?: string;
      discord?: string;
    };
    streaming_schedule?: string;
    favorite_games?: string[];
    location?: string;
  };
}

// Past videos and highlights
export interface Video extends CosmicObject {
  type: 'videos';
  metadata: {
    video_url?: string;
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    duration?: string;
    view_count?: number;
    description?: string;
    tags?: string[];
    is_featured?: boolean;
    recorded_date?: string;
  };
}

// Site configuration and branding
export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    site_name?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    primary_color?: string;
    secondary_color?: string;
    footer_text?: string;
    contact_email?: string;
    analytics_id?: string;
  };
}

// Type guard functions
export function isStreamSettings(obj: CosmicObject): obj is StreamSettings {
  return obj.type === 'stream-settings';
}

export function isChatMessage(obj: CosmicObject): obj is ChatMessage {
  return obj.type === 'chat-messages';
}

export function isProfile(obj: CosmicObject): obj is Profile {
  return obj.type === 'profiles';
}

export function isVideo(obj: CosmicObject): obj is Video {
  return obj.type === 'videos';
}

export function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type === 'site-settings';
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Chat connection status
export type ChatStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

// Stream status types
export type StreamStatus = 'live' | 'offline' | 'starting' | 'ending';