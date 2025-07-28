import { createBucketClient } from '@cosmicjs/sdk'
import { VideoContent } from '@/types'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export async function getFeaturedVideos(): Promise<VideoContent[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'videos',
        'metadata.featured': true
      })
      .props(['title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(6)
    
    return objects as VideoContent[]
  } catch (error) {
    // Return empty array instead of logging error for demo purposes
    return []
  }
}

export async function getAllVideos(): Promise<VideoContent[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'videos'
      })
      .props(['title', 'slug', 'metadata', 'created_at'])
      .depth(1)  
      .sort('-created_at')
    
    return objects as VideoContent[]
  } catch (error) {
    // Return empty array instead of logging error for demo purposes
    return []
  }
}

export async function getVideoBySlug(slug: string): Promise<VideoContent | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'videos',
        slug: slug
      })
      .props(['title', 'slug', 'content', 'metadata', 'created_at'])
      .depth(1)
    
    return object as VideoContent
  } catch (error) {
    console.error('Error fetching video:', error)
    return null
  }
}

export default cosmic