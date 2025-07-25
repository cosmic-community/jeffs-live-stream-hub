import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSiteSettings } from '@/lib/cosmic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  const siteName = siteSettings?.metadata?.site_name || "Jeff's Live Stream Hub"
  
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: 'Personal live streaming platform featuring real-time video, interactive chat, and community engagement.',
    keywords: ['live streaming', 'video chat', 'gaming', 'entertainment'],
    authors: [{ name: 'Jeff' }],
    creator: 'Jeff',
    metadataBase: new URL('https://jeffs-stream.vercel.app'),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: siteName,
      description: 'Personal live streaming platform featuring real-time video, interactive chat, and community engagement.',
      siteName: siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: 'Personal live streaming platform featuring real-time video, interactive chat, and community engagement.',
      creator: '@jeff',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const siteSettings = await getSiteSettings()
  
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header siteSettings={siteSettings} />
          <main className="flex-1">
            {children}
          </main>
          <Footer siteSettings={siteSettings} />
        </div>
      </body>
    </html>
  )
}