'use client'

import { useState, useEffect } from 'react'

interface StreamStatusData {
  isLive: boolean
  viewerCount: number
  streamTitle: string
  startTime?: string
}

export default function StreamStatus() {
  const [status, setStatus] = useState<StreamStatusData>({
    isLive: true,
    viewerCount: 1234,
    streamTitle: "Live Gaming Session - Building Something Cool!",
    startTime: new Date().toISOString()
  })

  const [uptime, setUptime] = useState<string>('0:00:00')

  useEffect(() => {
    if (!status.isLive || !status.startTime) return

    const updateUptime = () => {
      const start = new Date(status.startTime!)
      const now = new Date()
      const diff = now.getTime() - start.getTime()
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setUptime(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    const interval = setInterval(updateUptime, 1000)
    updateUptime() // Initial call

    return () => clearInterval(interval)
  }, [status.isLive, status.startTime])

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            status.isLive ? 'bg-red-600' : 'bg-gray-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              status.isLive ? 'bg-white animate-pulse' : 'bg-gray-400'
            }`}></div>
            <span className="text-white text-sm font-medium">
              {status.isLive ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
          
          <div>
            <h2 className="text-white text-lg font-semibold">{status.streamTitle}</h2>
            {status.isLive && (
              <p className="text-gray-400 text-sm">
                Started {uptime} ago
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-gray-400">
              {status.viewerCount.toLocaleString()} viewers
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">HD Quality</span>
          </div>
        </div>
      </div>
    </div>
  )
}