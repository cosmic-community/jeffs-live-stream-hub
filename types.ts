export interface VideoContent {
  id: string
  title: string
  slug: string
  content?: string
  created_at: string
  metadata: {
    description?: string
    thumbnail?: {
      imgix_url: string
    }
    video_url?: string
    duration?: string
    featured?: boolean
    category?: string
  }
}