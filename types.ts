export interface SiteSettings {
  id: string
  title: string
  slug: string
  metadata: {
    maintenance_mode?: boolean
    maintenance_message?: string
    contact_email?: string
    google_analytics_id?: string
  }
}

export interface StreamStatus {
  isLive: boolean
  viewerCount: number
  streamTitle: string
}

export interface VideoContent {
  id: string
  title: string
  slug: string
  content?: string
  metadata: {
    description?: string
    video_url?: string
    thumbnail?: {
      imgix_url: string
    }
    duration?: string
    featured?: boolean
    category?: string
    tags?: string[]
  }
  created_at: string
}

export interface CosmicObject {
  id: string
  title: string
  slug: string
  content?: string
  metadata: Record<string, any>
  created_at: string
  modified_at: string
}