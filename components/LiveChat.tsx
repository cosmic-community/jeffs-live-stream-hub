'use client'

import { useEffect } from 'react'

interface LiveChatProps {
  widgetId?: string
  enabled?: boolean
}

export default function LiveChat({ widgetId, enabled = false }: LiveChatProps) {
  useEffect(() => {
    // Only load LiveChat if enabled and widgetId is provided
    if (!enabled || !widgetId) {
      return
    }

    // Ensure widgetId is a valid string before using it
    const validWidgetId = widgetId.trim()
    if (!validWidgetId) {
      console.warn('LiveChat widget ID is empty')
      return
    }

    // Create the LiveChat script element
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://widget.livechat.com/static/js/widget.js'
    
    // Add the LiveChat configuration - now TypeScript knows validWidgetId is a string
    ;(window as any).__lc = {
      license: validWidgetId,
      integration_name: "manual_onboarding"
    }

    // Append script to document head
    document.head.appendChild(script)

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      // Clean up global LiveChat object
      delete (window as any).__lc
    }
  }, [widgetId, enabled])

  // This component doesn't render anything visible
  return null
}