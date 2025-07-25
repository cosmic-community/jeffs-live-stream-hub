'use client'

import { useState, useEffect } from 'react'

interface StreamPlayerProps {
  isLive: boolean
  streamUrl?: string
  streamTitle?: string
  fallbackVideo?: {
    url: string
    imgix_url: string
  }
  offlineMessage?: string
}

export default function StreamPlayer({ 
  isLive, 
  streamUrl, 
  streamTitle, 
  fallbackVideo, 
  offlineMessage 
}: StreamPlayerProps) {
  const [videoError, setVideoError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setVideoError(false)
    setIsLoading(true)
  }, [streamUrl, isLive])

  const handleVideoLoad = () => {
    setIsLoading(false)
    setVideoError(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setVideoError(true)
  }

  return (
    <div className="space-y-4">
      {/* Stream Title */}
      {isLive && streamTitle && (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{streamTitle}</h1>
          <div className="status-indicator status-live">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            LIVE
          </div>
        </div>
      )}

      {/* Video Player Container */}
      <div className="stream-player">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-sm">Loading stream...</p>
            </div>
          </div>
        )}

        {isLive && streamUrl && !videoError ? (
          <>
            <video
              src={streamUrl}
              controls
              autoPlay
              muted
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className="w-full h-full object-cover"
            />
            <div className="stream-overlay">
              LIVE
            </div>
          </>
        ) : !isLive && fallbackVideo && !videoError ? (
          <div className="relative w-full h-full">
            <video
              src={fallbackVideo.url}
              controls
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className="w-full h-full object-cover"
              poster={`${fallbackVideo.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
            />
            <div className="absolute top-4 left-4 bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-semibold">
              REPLAY
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center bg-black text-white h-full">
            <div className="text-center space-y-4 p-8">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {offlineMessage || "Jeff is currently offline"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Follow on social media to get notified when the stream goes live!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stream Info */}
      {!isLive && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="status-indicator status-offline">
            <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
            OFFLINE
          </div>
          <span>Check back soon for the next stream</span>
        </div>
      )}

      {videoError && (
        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 text-center">
          <p className="text-red-400 text-sm">
            Unable to load video. Please try refreshing the page.
          </p>
        </div>
      )}
    </div>
  )
}