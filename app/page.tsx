import { getStreamSettings, getProfile, getFeaturedVideos } from '@/lib/cosmic'
import StreamPlayer from '@/components/StreamPlayer'
import LiveChat from '@/components/LiveChat'
import AboutSection from '@/components/AboutSection'
import FeaturedVideos from '@/components/FeaturedVideos'
import StreamStatus from '@/components/StreamStatus'

export default async function HomePage() {
  const [streamSettings, profile, featuredVideos] = await Promise.all([
    getStreamSettings(),
    getProfile(),
    getFeaturedVideos(4)
  ])

  const isLive = streamSettings?.metadata?.is_live || false
  const streamUrl = streamSettings?.metadata?.stream_url
  const streamTitle = streamSettings?.metadata?.stream_title || 'Live Stream'
  const offlineMessage = streamSettings?.metadata?.offline_message || "Jeff is currently offline"

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Stream Status Header */}
      <div className="text-center">
        <StreamStatus 
          isLive={isLive} 
          streamTitle={streamTitle}
          offlineMessage={offlineMessage}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Video Player - Takes up 3 columns on XL screens */}
        <div className="xl:col-span-3 space-y-6">
          <StreamPlayer 
            isLive={isLive}
            streamUrl={streamUrl}
            streamTitle={streamTitle}
            fallbackVideo={streamSettings?.metadata?.fallback_video}
            offlineMessage={offlineMessage}
          />
          
          {/* About Section - Below video on mobile, hidden on XL */}
          <div className="xl:hidden">
            <AboutSection profile={profile} />
          </div>
        </div>

        {/* Sidebar - Chat and About */}
        <div className="xl:col-span-1 space-y-8">
          {/* Live Chat */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Live Chat</h2>
            <LiveChat isStreamLive={isLive} />
          </div>

          {/* About Section - Only shown on XL screens */}
          <div className="hidden xl:block">
            <AboutSection profile={profile} />
          </div>
        </div>
      </div>

      {/* Featured Videos Section */}
      {!isLive && featuredVideos && featuredVideos.length > 0 && (
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Videos</h2>
            <p className="text-muted-foreground">Check out some of my recent streams while I'm offline</p>
          </div>
          <FeaturedVideos videos={featuredVideos} />
        </section>
      )}

      {/* CTA Section when offline */}
      {!isLive && (
        <section className="text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Never Miss a Stream</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Follow me on social media to get notified when I go live. 
            I stream regularly and love interacting with the community!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {profile?.metadata?.social_links?.youtube && (
              <a 
                href={profile.metadata.social_links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Follow on YouTube
              </a>
            )}
            {profile?.metadata?.social_links?.twitter && (
              <a 
                href={profile.metadata.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Follow on X
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  )
}