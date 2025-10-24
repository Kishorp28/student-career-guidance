"use client"

import { useState } from "react"
import StudentForm from "@/components/student-form"
import PredictionResults from "@/components/prediction-results"
import WelcomeSection from "@/components/welcome-section"
import type { StudentProfile, PredictionResult } from "@/lib/types"
import { predictPlacement, predictSalary, generateRecommendations, analyzeSkillGaps } from "@/lib/prediction-engine"

export default function Home() {
  const [predictions, setPredictions] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (profile: StudentProfile) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const placementProb = predictPlacement(profile)
    const salary = predictSalary(profile, placementProb)
    const recommendations = generateRecommendations(profile, placementProb)
    const skillGaps = analyzeSkillGaps(profile)

    setPredictions({
      placementProbability: placementProb,
      placementPrediction: placementProb > 0.5 ? 1 : 0,
      expectedSalary: salary,
      recommendations,
      skillGaps,
      profile,
    })

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/30 dark:from-slate-950 dark:via-violet-950/20 dark:to-blue-950/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {!predictions ? (
          <>
            <WelcomeSection />
            <StudentForm onSubmit={handleSubmit} isLoading={isLoading} />
          </>
        ) : (
          <>
            <PredictionResults result={predictions} onReset={() => setPredictions(null)} />
          </>
        )}
      </div>
    </main>
  )
}
