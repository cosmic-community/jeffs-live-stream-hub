import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSiteSettings } from '@/lib/cosmic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  const siteName = "Jeff's Live Stream Hub"
  
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: 'Personal live streaming platform featuring real-time video, interactive content, and community engagement.',
    keywords: ['live streaming', 'video content', 'gaming', 'entertainment', 'streaming'],
    authors: [{ name: 'Jeff' }],
    creator: 'Jeff',
    metadataBase: new URL('https://jeffs-stream.vercel.app'),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: siteName,
      description: 'Personal live streaming platform featuring real-time video, interactive content, and community engagement.',
      siteName: siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: 'Personal live streaming platform featuring real-time video, interactive content, and community engagement.',
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
  
  // Check for maintenance mode
  if (siteSettings?.metadata?.maintenance_mode) {
    return (
      <html lang="en" className="dark">
        <body className={inter.className}>
          <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="max-w-md mx-auto text-center px-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">J</span>
              </div>
              <div 
                className="text-white prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: siteSettings.metadata.maintenance_message || 
                    "<h2>We'll be back soon!</h2><p>We're performing scheduled maintenance. Please check back in a few hours.</p>" 
                }}
              />
            </div>
          </div>
        </body>
      </html>
    )
  }
  
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-950">
          <Header siteSettings={siteSettings} />
          <main className="flex-1">
            {children}
          </main>
          <Footer siteSettings={siteSettings} />
        </div>
        
        {/* Google Analytics */}
        {siteSettings?.metadata?.google_analytics_id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.metadata.google_analytics_id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteSettings.metadata.google_analytics_id}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}