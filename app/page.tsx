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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
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
