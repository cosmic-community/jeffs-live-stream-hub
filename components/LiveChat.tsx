'use client'

import { useEffect } from 'react'

interface SiteSettings {
  livechat_enabled: boolean
  livechat_widget_id: string
  maintenance_mode: boolean
  maintenance_message: string
  contact_email: string
  google_analytics_id: string
}

interface LiveChatProps {
  settings: SiteSettings | null
}

export default function LiveChat({ settings }: LiveChatProps) {
  useEffect(() => {
    // Only load LiveChat if settings exist, LiveChat is enabled, and widget ID is provided
    if (!settings?.livechat_enabled || !settings?.livechat_widget_id) {
      return
    }

    // Ensure widget ID is a non-empty string before proceeding
    const widgetId = settings.livechat_widget_id.trim()
    if (!widgetId) {
      return
    }

    // Create and inject the LiveChat script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://widget.livechat.com/widget.js'
    
    // Set up LiveChat configuration
    window.__lc = window.__lc || {}
    window.__lc.license = widgetId
    
    document.head.appendChild(script)

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src="https://widget.livechat.com/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      
      // Clean up LiveChat global variables
      delete window.__lc
      delete window.LC_API
    }
  }, [settings?.livechat_enabled, settings?.livechat_widget_id])

  // This component doesn't render any visible content
  // The LiveChat widget is injected via script
  return null
}

// Extend Window interface to include LiveChat globals
declare global {
  interface Window {
    __lc?: {
      license: string
      [key: string]: any
    }
    LC_API?: any
  }
}