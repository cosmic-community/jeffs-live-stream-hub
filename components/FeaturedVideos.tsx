import { Video } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface FeaturedVideosProps {
  videos: Video[]
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          </div>

          {/* Video Info */}
          <div className="space-y-2">
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
                {video.metadata.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}