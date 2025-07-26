import Link from 'next/link'
import { SiteSettings } from '@/types'

interface FooterProps {
  siteSettings: SiteSettings | null
}

export default function Footer({ siteSettings }: FooterProps) {
  const siteName = siteSettings?.metadata?.site_name || "Jeff's Live Stream Hub"
  const socialLinks = siteSettings?.metadata?.social_links

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{siteName}</h3>
            <p className="text-gray-400 text-sm">
              Personal live streaming platform featuring real-time video, interactive chat, and community engagement.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  YouTube
                </a>
              )}
              {socialLinks?.twitch && (
                <a
                  href={socialLinks.twitch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitch
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}