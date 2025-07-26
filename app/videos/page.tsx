import { getAllVideos } from '@/lib/cosmic'
import { formatDistanceToNow } from 'date-fns'

export const metadata = {
  title: 'Videos',
  description: 'Browse all video content from the stream archive.',
}

export default async function VideosPage() {
  const videos = await getAllVideos()

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">All Videos</h1>
        
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">No Videos Yet</h2>
            <p className="text-gray-400">Check back later for video content!</p>
          </div>
        ) : (
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
                  {video.metadata.category && (
                    <div className="mt-2">
                      <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        {video.metadata.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}