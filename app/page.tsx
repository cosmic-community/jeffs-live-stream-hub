import { getSiteSettings, getFeaturedVideos } from '@/lib/cosmic'
import StreamPlayer from '@/components/StreamPlayer'
import FeaturedVideos from '@/components/FeaturedVideos'
import StreamStatus from '@/components/StreamStatus'

export default async function HomePage() {
  const [siteSettings, featuredVideos] = await Promise.all([
    getSiteSettings(),
    getFeaturedVideos()
  ])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Jeff's Stream Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your ultimate destination for live streaming, gaming content, and interactive entertainment. 
              Join the community and experience the excitement of live content creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Watch Live Stream
              </button>
              <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold text-lg transition-colors">
                Browse Videos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stream Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Live Stream</h2>
            <p className="text-gray-400">Join me live for gaming, coding, and interactive sessions</p>
          </div>
          <StreamStatus />
          <div className="mt-6">
            <StreamPlayer isLive={true} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What to Expect</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover what makes Jeff's Stream Hub the perfect place for entertainment and learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Gaming</h3>
              <p className="text-gray-400">
                Watch live gameplay sessions with commentary, tips, and interactive discussions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Coding Sessions</h3>
              <p className="text-gray-400">
                Learn web development, see real projects being built, and get coding insights
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400">
                Join a friendly community of viewers and participate in the conversation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Videos</h2>
              <p className="text-gray-400">Check out some of the best moments from recent streams</p>
            </div>
            <a 
              href="/videos" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              View All Videos →
            </a>
          </div>
          <FeaturedVideos videos={featuredVideos} />
        </div>
      </section>
    </div>
  )
}