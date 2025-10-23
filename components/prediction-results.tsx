"use client"

import type { PredictionResult } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SkillRadarChart from "./skill-radar-chart"
import PlacementGauge from "./placement-gauge"
import FactorImportance from "./factor-importance"
import RecommendationSection from "./recommendation-section"

interface PredictionResultsProps {
  result: PredictionResult
  onReset: () => void
}

export default function PredictionResults({ result, onReset }: PredictionResultsProps) {
  const isPlaced = result.placementPrediction === 1
  const placementPercentage = (result.placementProbability * 100).toFixed(1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">🎯 Your Career Prediction Results</h1>
        <p className="text-slate-600 dark:text-slate-400">Based on your profile analysis</p>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placement Prediction */}
        <Card
          className={`p-8 border-2 ${
            isPlaced
              ? "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700"
              : "bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">🎯 Placement Prediction</h2>

          {isPlaced ? (
            <div>
              <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">✅ Likely to be PLACED!</h3>
              <p className="text-lg font-semibold text-green-600 dark:text-green-300 mb-4">
                Probability: {placementPercentage}%
              </p>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Expected Salary: ₹{result.expectedSalary.toFixed(2)} LPA
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-2">❌ Unlikely to be Placed</h3>
              <p className="text-lg font-semibold text-red-600 dark:text-red-300 mb-4">
                Probability: {placementPercentage}%
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                Focus on improvements below to increase your chances!
              </p>
            </div>
          )}
        </Card>

        {/* Skill Gap Analysis */}
        <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">🔍 Skill Gap Analysis</h2>

          {result.skillGaps.length > 0 ? (
            <div className="space-y-2">
              {result.skillGaps.map((gap, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-950 rounded">
                  <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                  <span className="text-slate-700 dark:text-slate-300">{gap}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded">
              <p className="text-green-700 dark:text-green-400 font-semibold">🎉 No major skill gaps identified!</p>
            </div>
          )}
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">📚 Recommended Courses</h2>

        <RecommendationSection recommendations={result.recommendations} />
      </Card>

      {/* Visualizations */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">📊 Profile Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SkillRadarChart profile={result.profile} />
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <PlacementGauge probability={result.placementProbability} />
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <FactorImportance profile={result.profile} />
          </Card>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          onClick={onReset}
          className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          ← Analyze Another Profile
        </Button>
      </div>
    </div>
  )
}
