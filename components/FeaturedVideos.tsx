import Link from 'next/link'
import { VideoContent } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface FeaturedVideosProps {
  videos: VideoContent[]
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  if (!videos || videos.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Videos</h2>
          <div className="text-center py-12">
            <p className="text-gray-400">No featured videos available yet.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-8">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
              <div className="aspect-video bg-gray-800">
                {video.metadata.thumbnail_image ? (
                  <img
                    src={`${video.metadata.thumbnail_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {video.title}
                </h3>
                {video.metadata.description && (
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {video.metadata.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}
                  </span>
                  {video.metadata.duration && (
                    <span className="text-xs text-gray-500">
                      {video.metadata.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/videos"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Videos
          </Link>
        </div>
      </div>
    </section>
  )
}