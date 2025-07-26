import { getFeaturedVideos } from '@/lib/cosmic'
import StreamPlayer from '@/components/StreamPlayer'
import StreamStatus from '@/components/StreamStatus'
import LiveChat from '@/components/LiveChat'
import FeaturedVideos from '@/components/FeaturedVideos'
import AboutSection from '@/components/AboutSection'

export default async function Home() {
  const featuredVideos = await getFeaturedVideos()

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Stream */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <StreamPlayer 
                streamUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Live Gaming Session"
              />
            </div>
            <div className="space-y-6">
              <StreamStatus />
              <LiveChat />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <FeaturedVideos videos={featuredVideos} />

      {/* About Section */}
      <AboutSection />
    </div>
  )
}