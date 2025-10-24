"use client"

import { useState, useRef } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function CareerChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return

    const nextMessages = [...messages, { role: "user", content: text }]
    setMessages(nextMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/career-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationHistory: nextMessages }),
      })
      const data = await res.json()
      if (data?.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
      } else if (data?.error) {
        const errText = typeof data.error === "string" ? data.error : "The chat service returned an error."
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${errText}` },
        ])
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't generate a response." }])
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "There was an error contacting the chat service." }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Career Guidance Chat</h1>
        <div className="border rounded-lg p-4 bg-white dark:bg-slate-900 min-h-[60vh]">
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block px-3 py-2 rounded-lg ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-slate-500">Thinking...</div>}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about roles, skills, learning paths..."
            className="flex-1 border rounded-md px-3 py-2 bg-white dark:bg-slate-900"
          />
          <button onClick={sendMessage} disabled={loading} className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
