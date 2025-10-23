"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Career Guidance
        </Link>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="ghost">Student Profile</Button>
          </Link>
          <Link href="/role-guidance">
            <Button variant="ghost">Role Guidance</Button>
          </Link>
          <Link href="/career-chatbot">
            <Button variant="ghost">Career Chatbot</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
