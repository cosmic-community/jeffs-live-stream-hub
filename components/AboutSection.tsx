import { Profile } from '@/types'

interface AboutSectionProps {
  profile: Profile | null
}

export default function AboutSection({ profile }: AboutSectionProps) {
  if (!profile) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">About</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm">
            Profile information is loading...
          </p>
        </div>
      </div>
    )
  }

  const bio = profile.metadata?.bio
  const avatar = profile.metadata?.avatar
  const socialLinks = profile.metadata?.social_links
  const streamingSchedule = profile.metadata?.streaming_schedule
  const favoriteGames = profile.metadata?.favorite_games
  const location = profile.metadata?.location

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">About Jeff</h2>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          {avatar ? (
            <img 
              src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt="Jeff's Avatar"
              width={80}
              height={80}
              className="rounded-full border-2 border-primary"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-foreground">{profile.title}</h3>
            {location && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <div>
            <p className="text-foreground text-sm leading-relaxed">
              {bio}
            </p>
          </div>
        )}

        {/* Streaming Schedule */}
        {streamingSchedule && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Schedule</h4>
            <p className="text-muted-foreground text-sm">
              {streamingSchedule}
            </p>
          </div>
        )}

        {/* Favorite Games */}
        {favoriteGames && favoriteGames.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Favorite Games</h4>
            <div className="flex flex-wrap gap-2">
              {favoriteGames.map((game) => (
                <span 
                  key={game}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
                >
                  {game}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {socialLinks && (Object.values(socialLinks).some(link => link)) && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Follow Me</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.youtube && (
                <a 
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X
                </a>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.070-4.85.070-3.204 0-3.584-.012-4.849-.070-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              )}
              {socialLinks.discord && (
                <a 
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                  </svg>
                  Discord
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}