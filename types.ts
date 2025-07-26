export interface CosmicObject {
  id: string
  title: string
  slug: string
  content?: string
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  thumbnail?: string
  metadata: Record<string, any>
}

export interface SiteSettings extends CosmicObject {
  metadata: {
    site_name: string
    site_description?: string
    site_logo?: {
      imgix_url: string
    }
    social_links?: {
      twitter?: string
      youtube?: string
      twitch?: string
      discord?: string
    }
    primary_color?: string
    secondary_color?: string
  }
}

export interface VideoContent extends CosmicObject {
  metadata: {
    video_url: string
    video_type: 'youtube' | 'twitch' | 'vimeo' | 'direct'
    duration?: string
    category?: string
    featured?: boolean
    thumbnail_image?: {
      imgix_url: string
    }
    description?: string
    tags?: string[]
  }
}

export interface StreamStatus {
  isLive: boolean
  viewerCount?: number
  streamTitle?: string
  streamUrl?: string
}

export interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: string
  userId?: string
}

export interface User {
  id: string
  username: string
  avatar?: string
  role: 'viewer' | 'moderator' | 'admin'
}