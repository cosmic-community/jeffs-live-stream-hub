import Link from 'next/link'
import { VideoContent } from '@/types'

interface FeaturedVideosProps {
  videos: VideoContent[]
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">No Featured Videos</h3>
        <p className="text-gray-400">Check back later for featured content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link 
          key={video.id} 
          href={`/videos/${video.slug}`}
          className="group"
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500 transition-colors">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-800">
              {video.metadata.thumbnail?.imgix_url ? (
                <img
                  src={`${video.metadata.thumbnail.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={800}
                  height={450}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Duration overlay */}
              {video.metadata.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-xs">
                  {video.metadata.duration}
                </div>
              )}
              
              {/* Category badge */}
              {video.metadata.category && (
                <div className="absolute top-2 left-2 bg-purple-600 px-2 py-1 rounded text-white text-xs font-medium">
                  {video.metadata.category}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                {video.title}
              </h3>
              
              {video.metadata.description && (
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {video.metadata.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {new Date(video.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                
                {video.metadata.tags && video.metadata.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    {video.metadata.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-800 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}