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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header with Career Vision Branding */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/placeholder-logo.svg"
              alt="Career Vision Logo"
              width={60}
              height={60}
              className="rounded-full bg-blue-600 p-2"
            />
            <div>
              <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Career Vision</h1>
              <p className="text-slate-600 dark:text-slate-400">AI-Powered Career Guidance</p>
            </div>
          </div>
        </div>
        <Card className="h-[600px] flex flex-col shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <div>
                <CardTitle>Career Guidance Chatbot</CardTitle>
                <CardDescription>Ask me anything about your career path and skills</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {/* Avatar for assistant messages */}
                {message.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {mounted && message.timestamp && (
                    <span className="text-xs opacity-70 mt-1 block" suppressHydrationWarning>
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
                    <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-600 dark:text-slate-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about careers, skills, roles..."
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/placeholder.svg"
                alt="Career Paths"
                width={40}
                height={40}
                className="rounded-lg bg-blue-100 p-2"
              />
              <h3 className="font-semibold text-blue-600">Career Paths</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Explore different career options and progression paths
            </p>
          </Card>
          
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/placeholder.svg"
                alt="Skill Development"
                width={40}
                height={40}
                className="rounded-lg bg-green-100 p-2"
              />
              <h3 className="font-semibold text-blue-600">Skill Development</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get personalized recommendations for skill improvement
            </p>
          </Card>
          
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/placeholder.svg"
                alt="Interview Tips"
                width={40}
                height={40}
                className="rounded-lg bg-purple-100 p-2"
              />
              <h3 className="font-semibold text-blue-600">Interview Tips</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Learn interview strategies and preparation techniques
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
