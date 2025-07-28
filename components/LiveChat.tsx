'use client'

import { SiteSettings } from '@/types'

interface LiveChatProps {
  siteSettings?: SiteSettings | null
}

export default function LiveChat({ siteSettings }: LiveChatProps) {
  // Check if LiveChat is enabled and widget ID is available
  const isLiveChatEnabled = siteSettings?.metadata?.livechat_enabled === true
  const widgetId = siteSettings?.metadata?.livechat_widget_id

  // Only render LiveChat if enabled and widget ID is provided
  if (isLiveChatEnabled && widgetId && typeof widgetId === 'string' && widgetId.trim() !== '') {
    return (
      <div className="bg-gray-900 rounded-lg p-4 h-96 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Live Chat</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>LiveChat Widget ID: {widgetId}</p>
            <p className="text-sm mt-2">Chat functionality would load here.</p>
          </div>
        </div>
      </div>
    )
  }

  // Fallback when LiveChat is disabled or not configured
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Community</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <span className="text-sm text-gray-400">Coming Soon</span>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Community features coming soon!</p>
          <p className="text-sm mt-2">Stay tuned for updates.</p>
        </div>
      </div>
    </div>
  )
}