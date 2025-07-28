import { getAllVideos } from '@/lib/cosmic'
import FeaturedVideos from '@/components/FeaturedVideos'

export const metadata = {
  title: 'Videos',
  description: 'Browse all videos from Jeff\'s Live Stream Hub - gaming sessions, coding tutorials, and more',
}

export default async function VideosPage() {
  const videos = await getAllVideos()

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Video Library</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore all the content from Jeff's Stream Hub. From gaming highlights to coding tutorials, 
            find everything you need to stay entertained and learn something new.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 rounded-lg p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-purple-400 mb-2">{videos.length}</div>
            <div className="text-gray-400">Total Videos</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-pink-400 mb-2">50+</div>
            <div className="text-gray-400">Hours of Content</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
            <div className="text-gray-400">Categories</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 mr-4">Filter by category:</span>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
              Gaming
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
              Coding
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
              Tutorials
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
              Reviews
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        <FeaturedVideos videos={videos} />

        {videos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Videos Yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Videos will appear here as they are uploaded. Check back soon for exciting content!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}