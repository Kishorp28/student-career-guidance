"use client"

import type { PredictionResult } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SkillRadarChart from "./skill-radar-chart"
import PlacementGauge from "./placement-gauge"
import FactorImportance from "./factor-importance"
import RecommendationSection from "./recommendation-section"
import { Target, AlertTriangle, TrendingUp, BarChart3, ArrowLeft } from "lucide-react"

interface PredictionResultsProps {
  result: PredictionResult
  onReset: () => void
}

export default function PredictionResults({ result, onReset }: PredictionResultsProps) {
  const isPlaced = result.placementPrediction === 1
  const placementPercentage = (result.placementProbability * 100).toFixed(1)

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-950/50 dark:to-blue-950/50 rounded-2xl">
            <Target className="h-10 w-10 text-violet-600 dark:text-violet-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent mb-3">
          Your Career Prediction Results
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Based on your comprehensive profile analysis</p>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Prediction */}
        <Card
          className={`relative overflow-hidden p-8 border-2 transition-all duration-500 hover:scale-[1.02] ${
            isPlaced
              ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-300 dark:border-emerald-700/50 shadow-2xl shadow-emerald-500/20 dark:shadow-emerald-500/10"
              : "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-300 dark:border-orange-700/50 shadow-2xl shadow-orange-500/20 dark:shadow-orange-500/10"
          }`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 ${
            isPlaced ? "bg-emerald-500" : "bg-orange-500"
          }`} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${
                isPlaced 
                  ? "bg-emerald-100 dark:bg-emerald-950/50" 
                  : "bg-orange-100 dark:bg-orange-950/50"
              }`}>
                {isPlaced ? (
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Placement Prediction</h2>
            </div>

            {isPlaced ? (
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <span className="text-5xl">✓</span> Likely to be PLACED!
                </h3>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-300">
                    Probability: <span className="text-3xl">{placementPercentage}%</span>
                  </p>
                  <div className="p-4 bg-white/60 dark:bg-slate-900/60 rounded-xl">
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      Expected Salary: <span className="text-2xl text-emerald-600 dark:text-emerald-400">₹{result.expectedSalary.toFixed(2)} LPA</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
                  <span className="text-4xl">⚠</span> Needs Improvement
                </h3>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-orange-600 dark:text-orange-300">
                    Probability: <span className="text-3xl">{placementPercentage}%</span>
                  </p>
                  <div className="p-4 bg-white/60 dark:bg-slate-900/60 rounded-xl">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      Focus on the improvements below to significantly increase your chances!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Skill Gap Analysis */}
        <Card className="relative overflow-hidden p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-2xl hover:scale-[1.02] transition-all duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-xl">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skill Gap Analysis</h2>
            </div>

            {result.skillGaps.length > 0 ? (
              <div className="space-y-3">
                {result.skillGaps.map((gap, idx) => (
                  <div 
                    key={idx} 
                    className="group flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border border-orange-200 dark:border-orange-900/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                  >
                    <div className="mt-1 p-1 bg-orange-500 rounded-full">
                      <div className="w-2 h-2" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{gap}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">🎉</span> No major skill gaps identified!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="relative overflow-hidden p-8 md:p-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-violet-200 dark:border-violet-900/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-blue-500/5 dark:from-violet-500/10 dark:to-blue-500/10" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-violet-100 dark:bg-violet-950/50 rounded-xl">
              <BarChart3 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Recommended Courses</h2>
          </div>

          <RecommendationSection recommendations={result.recommendations} />
        </div>
      </Card>

      {/* Visualizations */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-xl">
            <BarChart3 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          Profile Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <SkillRadarChart profile={result.profile} />
          </Card>

          <Card className="p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <PlacementGauge probability={result.placementProbability} />
          </Card>

          <Card className="p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <FactorImportance profile={result.profile} />
          </Card>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={onReset}
          className="group relative bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/50 dark:hover:shadow-slate-500/30"
        >
          <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-3 text-lg">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Analyze Another Profile
          </span>
        </Button>
      </div>
    </div>
  )
}
