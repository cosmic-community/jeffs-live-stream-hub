'use client'

import { useState, useEffect } from 'react'

interface StreamPlayerProps {
  streamUrl?: string
  isLive?: boolean
}

export default function StreamPlayer({ streamUrl, isLive = false }: StreamPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading stream...</p>
          </div>
        </div>
      </div>
    )
  }

  if (hasError || !streamUrl) {
    return (
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold mb-2">Stream Offline</h3>
              <p className="text-gray-400">
                {isLive ? "Technical difficulties. Stream will be back shortly." : "Stream is currently offline. Check back later!"}
              </p>
            </div>
            <button 
              onClick={() => {
                setIsLoading(true)
                setHasError(false)
                setTimeout(() => setIsLoading(false), 2000)
              }}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        
        {/* Live indicator when stream should be live */}
        {isLive && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">LIVE</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {/* Stream embed would go here */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">Stream Ready</h3>
            <p className="text-gray-400">Click to start watching the live stream</p>
          </div>
        </div>
      </div>
      
      {/* Live indicator */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">LIVE</span>
        </div>
      </div>

      {/* Viewer count */}
      <div className="absolute top-4 right-4">
        <div className="bg-black bg-opacity-50 px-3 py-1 rounded-full">
          <span className="text-white text-sm">1,234 viewers</span>
        </div>
      </div>
    </div>
  )
}