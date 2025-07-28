export interface SiteSettings {
  id: string
  title: string
  slug: string
  metadata: {
    maintenance_mode: boolean
    maintenance_message: string
    contact_email: string
    google_analytics_id: string
  }
}

export interface VideoObject {
  id: string
  title: string
  slug: string
  metadata: {
    video_url: string
    description: string
    thumbnail?: {
      imgix_url: string
    }
    duration?: string
    view_count?: number
    published_date: string
  }
}

export interface StreamData {
  id: string
  title: string
  slug: string
  metadata: {
    stream_url: string
    is_live: boolean
    description: string
    thumbnail?: {
      imgix_url: string
    }
    viewer_count?: number
    start_time?: string
  }
}