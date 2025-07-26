'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatMessage } from '@/types'

export default function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Simulate connection status
    setIsConnected(true)
    
    // Simulate incoming messages
    const interval = setInterval(() => {
      const sampleMessages = [
        'Great stream!',
        'How are you doing today?',
        'Love this setup!',
        'Keep up the good work!',
        'Amazing content as always',
      ]
      
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)]
      const randomUser = `User${Math.floor(Math.random() * 1000)}`
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        username: randomUser,
        message: randomMessage,
        timestamp: new Date().toISOString(),
      }
      
      setMessages(prev => [...prev.slice(-49), newMsg])
    }, Math.random() * 10000 + 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: 'You',
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Live Chat</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Be the first to chat!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="text-sm">
              <span className="font-medium text-blue-400">{message.username}:</span>
              <span className="text-gray-300 ml-2">{message.message}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />
        <button
          type="submit"
          disabled={!isConnected || !newMessage.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}