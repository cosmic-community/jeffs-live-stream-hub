import { getSiteSettings, getFeaturedVideos } from '@/lib/cosmic'
import StreamPlayer from '@/components/StreamPlayer'
import LiveChat from '@/components/LiveChat'
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Jeff's Stream Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your ultimate destination for live streaming, gaming content, and interactive community experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stream Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Stream */}
            <div className="lg:col-span-2">
              <StreamStatus />
              <div className="mt-6">
                <StreamPlayer />
              </div>
            </div>
            
            {/* Chat */}
            <div className="lg:col-span-1">
              <LiveChat siteSettings={siteSettings} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Videos</h2>
          <FeaturedVideos videos={featuredVideos} />
        </div>
      </section>
    </div>
  )
}