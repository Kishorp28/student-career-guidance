"use client"

import { BarChart3, DollarSign, Target, BookOpen } from "lucide-react"

export default function WelcomeSection() {
  return (
    <div className="mb-16 text-center animate-in fade-in duration-700">
      <div className="mb-6 relative inline-block">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 dark:from-violet-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4 animate-in slide-in-from-top duration-500">
          Student Career Guidance System
        </h1>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl -z-10" />
      </div>
      
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-100">
        Predict Your Placement Probability & Get Personalized Career Recommendations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="group relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-violet-200 dark:border-violet-900/30 hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-violet-100 dark:bg-violet-950/50 rounded-xl group-hover:bg-violet-200 dark:group-hover:bg-violet-900/50 transition-colors duration-300">
                <BarChart3 className="h-8 w-8 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Predict</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your placement probability</p>
          </div>
        </div>

        <div className="group relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-900/30 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-950/50 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Estimate</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Expected salary range</p>
          </div>
        </div>

        <div className="group relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-cyan-200 dark:border-cyan-900/30 hover:shadow-2xl hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-cyan-100 dark:bg-cyan-950/50 rounded-xl group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900/50 transition-colors duration-300">
                <Target className="h-8 w-8 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Identify</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your skill gaps</p>
          </div>
        </div>

        <div className="group relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-900/30 hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-950/50 rounded-xl group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors duration-300">
                <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Recommend</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Personalized courses</p>
          </div>
        </div>
      </div>
    </div>
  )
}
