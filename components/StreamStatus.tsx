'use client'

import { useState, useEffect } from 'react'
import { StreamStatus as StreamStatusType } from '@/types'

export default function StreamStatus() {
  const [status, setStatus] = useState<StreamStatusType>({
    isLive: false,
    viewerCount: 0,
    streamTitle: 'Getting ready to stream...'
  })

  useEffect(() => {
    // Simulate stream status updates
    const updateStatus = () => {
      setStatus(prev => ({
        ...prev,
        isLive: Math.random() > 0.3,
        viewerCount: Math.floor(Math.random() * 200) + 25,
        streamTitle: prev.isLive ? 'Live Gaming Session' : 'Stream will begin shortly'
      }))
    }

    updateStatus()
    const interval = setInterval(updateStatus, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Stream Status</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${status.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className={`text-sm font-medium ${status.isLive ? 'text-red-400' : 'text-gray-400'}`}>
            {status.isLive ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-400">Current Status</p>
          <p className="text-white font-medium">{status.streamTitle}</p>
        </div>

        {status.isLive && (
          <div>
            <p className="text-sm text-gray-400">Viewers</p>
            <p className="text-white font-medium">{status.viewerCount} watching now</p>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-400">Next Stream</p>
          <p className="text-white font-medium">
            {status.isLive ? 'Now!' : 'Check back soon!'}
          </p>
        </div>
      </div>

      {!status.isLive && (
        <div className="mt-4 p-3 bg-gray-800 rounded-md">
          <p className="text-sm text-gray-300">
            Get notified when the stream goes live! Follow on social media for updates.
          </p>
        </div>
      )}
    </div>
  )
}