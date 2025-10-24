"use client"

import type React from "react"
import Image from "next/image"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send, MessageCircle, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  // Use string to avoid Date serialization/hydration issues; set on client
  timestamp?: string
}

export default function CareerChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)
    // Initialize welcome message only on client to avoid hydration mismatch
    setMessages([{
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Career Guidance Chatbot. I can help you with:\n\n• Career path recommendations\n• Skill development advice\n• Role-specific guidance\n• Course recommendations\n• Interview preparation tips\n• Salary expectations\n• Job market insights\n\nWhat would you like to know about your career?",
      timestamp: new Date().toISOString(),
    }])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/career-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      let content: string
      if (data?.response) {
        content = data.response
      } else if (data?.error) {
        content = `❌ ${data.error}`
      } else {
        content = "Sorry, I couldn't generate a response. Please try asking about career paths, skills, or interview tips!"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ I'm having trouble connecting right now. Try asking about 'career paths', 'salary info', 'skills', or 'interview tips' for instant help!",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Career Vision
                </h1>
                <p className="text-sm text-slate-500">Professional Career Guidance</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Assistant Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="text-white">
                <h2 className="font-semibold">Career Advisor</h2>
                <p className="text-indigo-100 text-sm">Get personalized career guidance</p>
              </div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                {/* Avatar for assistant messages */}
                {message.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  {mounted && message.timestamp && (
                    <span className={`text-xs mt-2 block ${
                      message.role === "user" ? "text-indigo-200" : "text-slate-400"
                    }`} suppressHydrationWarning>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                
                {/* Avatar for user messages */}
                {message.role === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span className="text-sm text-slate-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-100 bg-white p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about career paths, skills, salaries, or interview tips..."
                  disabled={loading}
                  className="w-full pl-4 pr-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </form>
            <p className="text-xs text-slate-500 mt-2 text-center">Try asking about specific career topics for instant guidance</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Career Pathways</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Discover career opportunities and progression routes tailored to your interests and skills.
                </p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Skill Development</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get personalized learning roadmaps and skill recommendations for your career growth.
                </p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">Interview Excellence</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Master interview techniques and get tips for salary negotiations and job applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Quick Start Suggestions</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "What career suits me?",
              "Software engineer salary", 
              "Interview preparation tips",
              "Skills for data science",
              "Career change advice",
              "Remote work opportunities"
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-sm transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
