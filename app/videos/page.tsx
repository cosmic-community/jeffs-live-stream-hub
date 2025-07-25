import { cosmic } from '@/lib/cosmic'
import { Video } from '@/types'
import { Metadata } from 'next'
import { formatDistanceToNow } from 'date-fns'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Browse all of Jeff\'s streaming videos and highlights.',
}

async function getAllVideos(): Promise<Video[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'videos',
      sort: '-created_at',
      limit: 50
    }).props(['id', 'title', 'slug', 'metadata', 'created_at'])
    
    return response.objects as Video[]
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    return []
  }
}

export default async function VideosPage() {
  const videos = await getAllVideos()

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Videos</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through all of Jeff's streaming content, including past live streams, highlights, and featured videos.
          </p>
        </div>

        {/* Videos Grid */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="feature-card group cursor-pointer">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-muted rounded overflow-hidden mb-4">
                  {video.metadata?.thumbnail ? (
                    <img 
                      src={`${video.metadata.thumbnail.imgix_url}?w=600&h=338&fit=crop&auto=format,compress`}
                      alt={video.title}
                      width={300}
                      height={169}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.metadata?.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.metadata.duration}
                    </div>
                  )}

                  {/* Featured Badge */}
                  {video.metadata?.is_featured && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  
                  {video.metadata?.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.metadata.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {video.metadata?.recorded_date 
                        ? formatDistanceToNow(new Date(video.metadata.recorded_date), { addSuffix: true })
                        : formatDistanceToNow(new Date(video.created_at), { addSuffix: true })
                      }
                    </span>
                    {video.metadata?.view_count && (
                      <span>{video.metadata.view_count.toLocaleString()} views</span>
                    )}
                  </div>

                  {/* Tags */}
                  {video.metadata?.tags && video.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {video.metadata.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {video.metadata.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{video.metadata.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Videos Yet</h3>
            <p className="text-muted-foreground">
              Videos will appear here once streaming content is available.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Don't Miss Future Streams</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stay up to date with new content by following on social media. Get notified when new videos are posted and when live streams are starting!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://youtube.com/@jeff" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
            <a 
              href="https://x.com/jeff" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow on X
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}