"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-7 w-7 text-violet-600 dark:text-violet-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent">
              Career Vision
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-300 hover:scale-105"
              >
                Student Profile
              </Button>
            </Link>
            <Link href="/role-guidance">
              <Button 
                variant="ghost"
                className="hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-300 hover:scale-105"
              >
                Role Guidance
              </Button>
            </Link>
            <Link href="/career-chatbot">
              <Button 
                variant="ghost"
                className="hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-300 hover:scale-105"
              >
                Career Chatbot
              </Button>
            </Link>
            <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
