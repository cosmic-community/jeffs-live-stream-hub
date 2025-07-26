import Link from 'next/link'
import { SiteSettings } from '@/types'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const siteName = siteSettings?.metadata?.site_name || "Jeff's Live Stream Hub"
  const logo = siteSettings?.metadata?.site_logo

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {logo && (
                <img
                  src={`${logo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                  alt={siteName}
                  className="w-10 h-10 rounded-lg"
                  width={40}
                  height={40}
                />
              )}
              <span className="text-xl font-bold text-white">
                {siteName}
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/videos"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Videos
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}