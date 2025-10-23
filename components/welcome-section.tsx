"use client"

export default function WelcomeSection() {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">🎓 Student Career Guidance System</h1>
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
        Predict Your Placement Probability & Get Personalized Career Recommendations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Predict</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Your placement probability</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Estimate</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Expected salary range</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Identify</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Your skill gaps</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-3xl mb-2">📚</div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Recommend</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Personalized courses</p>
        </div>
      </div>
    </div>
  )
}
