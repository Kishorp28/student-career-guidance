"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CourseCard from "./course-card"
import { getCoursesForRecommendation } from "@/lib/course-database"
import type { Course } from "@/lib/course-database"

interface RecommendationSectionProps {
  recommendations: string[]
}

export default function RecommendationSection({ recommendations }: RecommendationSectionProps) {
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null)

  if (recommendations.length === 0) {
    return (
      <Card className="p-8 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-700">
        <p className="text-green-700 dark:text-green-400 font-semibold">
          🌟 You're on the right track! No additional courses needed.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, idx) => {
        const courses = getCoursesForRecommendation(recommendation)
        const isExpanded = expandedRecommendation === recommendation

        return (
          <Card
            key={idx}
            className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-900 dark:text-white font-medium">{recommendation}</p>
              {courses.length > 0 && (
                <Button
                  onClick={() => setExpandedRecommendation(isExpanded ? null : recommendation)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  {isExpanded ? "Hide" : "Show"} Courses ({courses.length})
                </Button>
              )}
            </div>

            {isExpanded && courses.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {courses.map((course: Course, courseIdx: number) => (
                  <CourseCard key={courseIdx} course={course} />
                ))}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
