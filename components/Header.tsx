import Link from 'next/link'
import { SiteSettings } from '@/types'

interface HeaderProps {
  siteSettings: SiteSettings | null
}

export default function Header({ siteSettings }: HeaderProps) {
  const siteName = siteSettings?.metadata?.site_name || "Jeff's Live Stream Hub"
  const logo = siteSettings?.metadata?.logo

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {logo ? (
            <img 
              src={`${logo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={siteName}
              width={40}
              height={40}
              className="rounded-lg"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-foreground">{siteName}</h1>
            <p className="text-xs text-muted-foreground">Live Streaming</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            About
          </Link>
          <Link 
            href="/videos" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Videos
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}