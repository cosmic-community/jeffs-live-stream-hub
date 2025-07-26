'use client'

import { useState, useEffect } from 'react'
import { StreamStatus } from '@/types'

interface StreamPlayerProps {
  streamUrl?: string
  title?: string
}

export default function StreamPlayer({ streamUrl, title }: StreamPlayerProps) {
  const [status, setStatus] = useState<StreamStatus>({
    isLive: false,
    viewerCount: 0,
    streamTitle: title || 'Stream Offline'
  })

  useEffect(() => {
    // Simulate stream status updates
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        viewerCount: Math.floor(Math.random() * 100) + 50,
        isLive: streamUrl ? true : Math.random() > 0.5
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [streamUrl])

  if (!streamUrl || !status.isLive) {
    return (
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Stream Offline</h3>
          <p className="text-gray-400">Check back later for live content!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={streamUrl}
          className="w-full h-full"
          allowFullScreen
          title={status.streamTitle}
        />
      </div>
      
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="bg-red-600 text-white px-2 py-1 rounded-md text-sm font-medium flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>LIVE</span>
        </div>
        {status.viewerCount && (
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
            {status.viewerCount} viewers
          </div>
        )}
      </div>
    </div>
  )
}