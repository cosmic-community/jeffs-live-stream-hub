'use client'

import { useState, useEffect, useRef } from 'react'
import { getChatMessages, addChatMessage } from '@/lib/cosmic'
import { ChatMessage, ChatStatus } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface LiveChatProps {
  isStreamLive: boolean
}

export default function LiveChat({ isStreamLive }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState<ChatStatus>('disconnected')
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const usernameInputRef = useRef<HTMLInputElement>(null)

  // Generate random user color
  const getUserColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Load initial chat messages
  useEffect(() => {
    async function loadMessages() {
      try {
        setIsLoading(true)
        const initialMessages = await getChatMessages(50)
        setMessages(initialMessages as ChatMessage[])
        setIsConnected('connected')
      } catch (error) {
        console.error('Failed to load chat messages:', error)
        setIsConnected('error')
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Set username from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('chat-username')
    if (savedUsername) {
      setUsername(savedUsername)
    } else {
      // Focus username input if no saved username
      setTimeout(() => {
        usernameInputRef.current?.focus()
      }, 100)
    }
  }, [])

  // Save username to localStorage when it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('chat-username', username)
    }
  }, [username])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !username.trim()) return

    try {
      const userColor = localStorage.getItem('user-color') || getUserColor()
      localStorage.setItem('user-color', userColor)

      // Add message to Cosmic - ensure username is not undefined
      const trimmedUsername = username.trim()
      const trimmedMessage = newMessage.trim()
      
      if (!trimmedUsername || !trimmedMessage) return
      
      // Fix: Ensure userColor is properly defined before passing to addChatMessage
      const finalUserColor = userColor || getUserColor()
      const message = await addChatMessage(trimmedUsername, trimmedMessage, finalUserColor)
      
      // Add to local state immediately for better UX
      setMessages(prev => [...prev, message as ChatMessage])
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem('chat-username', username.trim())
    }
  }

  const getConnectionStatus = () => {
    switch (isConnected) {
      case 'connected':
        return { text: 'Connected', color: 'text-green-400' }
      case 'connecting':
        return { text: 'Connecting...', color: 'text-yellow-400' }
      case 'error':
        return { text: 'Connection Error', color: 'text-red-400' }
      default:
        return { text: 'Disconnected', color: 'text-muted-foreground' }
    }
  }

  const status = getConnectionStatus()

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Chat</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected === 'connected' ? 'bg-green-400' : 'bg-muted-foreground'}`}></div>
          <span className={`text-xs ${status.color}`}>{status.text}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground text-sm">Loading chat...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">No messages yet</p>
              <p className="text-muted-foreground text-xs">Be the first to say hello!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className="chat-message">
                <div 
                  className="chat-avatar"
                  style={{ backgroundColor: message.metadata?.user_color || '#6B7280' }}
                >
                  {(message.metadata?.username?.[0] || 'U').toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="font-semibold text-sm"
                      style={{ color: message.metadata?.user_color || '#6B7280' }}
                    >
                      {message.metadata?.username || 'Anonymous'}
                    </span>
                    {message.metadata?.is_moderator && (
                      <span className="text-xs bg-primary text-primary-foreground px-1 rounded">MOD</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground break-words">
                    {message.metadata?.message}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat Input */}
      <div className="chat-input-container">
        {!username ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-3">
            <input
              ref={usernameInputRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username to chat..."
              className="chat-input"
              maxLength={20}
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isStreamLive ? "Type a message..." : "Chat while offline..."}
              className="flex-1 chat-input"
              maxLength={200}
              disabled={isConnected !== 'connected'}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isConnected !== 'connected'}
              className="bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0"
            >
              Send
            </button>
          </form>
        )}
        
        {!isStreamLive && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Chat is available even when the stream is offline
          </p>
        )}
      </div>
    </div>
  )
}