"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { CareerRole } from "@/lib/role-database"
import type { StudentProfile } from "@/lib/types"

interface RoleDetailsProps {
  role: CareerRole
  studentProfile?: StudentProfile
  onBack: () => void
}

export default function RoleDetails({ role, studentProfile, onBack }: RoleDetailsProps) {
  const getSkillLevel = (skill: string): number => {
    // Map student skills to proficiency levels
    const skillMap: Record<string, number> = {
      "Python Programming": studentProfile?.skills.includes("Python") ? 70 : 0,
      "JavaScript/TypeScript": studentProfile?.skills.includes("JavaScript") ? 70 : 0,
      "React.js": studentProfile?.skills.includes("React") ? 70 : 0,
      "SQL & Databases": studentProfile?.skills.includes("SQL") ? 70 : 0,
      "Machine Learning": studentProfile?.skills.includes("ML") ? 70 : 0,
      "Cloud Computing": studentProfile?.skills.includes("Cloud") ? 70 : 0,
      "Problem Solving": (studentProfile?.problemSolving || 0) * 10,
      "Communication Skills": (studentProfile?.communicationSkills || 0) * 10,
    }
    return skillMap[skill] || 0
  }

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="outline" className="mb-4 bg-transparent">
        ← Back to Roles
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 dark:text-slate-50">{role.title}</CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Salary Range</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{(role.salaryRange.min / 100000).toFixed(1)}L - ₹{(role.salaryRange.max / 100000).toFixed(1)}L
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Experience Required</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {role.experienceYearsRequired} years
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Job Market Demand</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={role.jobMarketDemand * 10} className="flex-1" />
                    <span className="font-bold text-purple-600 dark:text-purple-400">{role.jobMarketDemand}/10</span>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Growth Potential</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={role.growthPotential * 10} className="flex-1" />
                    <span className="font-bold text-orange-600 dark:text-orange-400">{role.growthPotential}/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-50">Required Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {role.requiredSkills.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-50">{skill.skill}</span>
                      <Badge
                        variant="outline"
                        className={
                          skill.importance === "critical"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : skill.importance === "important"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }
                      >
                        {skill.importance}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    {studentProfile && (
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        Your Level: {getSkillLevel(skill.skill)}%
                      </span>
                    )}
                  </div>
                  {studentProfile && <Progress value={getSkillLevel(skill.skill)} className="h-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Career Progression */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-50">Career Progression Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 flex-wrap">
                {role.careerProgression.map((position, index) => (
                  <div key={position} className="flex items-center gap-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700">{position}</Badge>
                    {index < role.careerProgression.length - 1 && (
                      <span className="text-2xl text-slate-400 dark:text-slate-600">→</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Companies */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-50">Top Hiring Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {role.companies.map((company) => (
                  <div
                    key={company}
                    className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-sm font-semibold text-slate-900 dark:text-slate-50"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-50">Recommended Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {role.courseRecommendations.map((course) => (
                  <div
                    key={course}
                    className="p-2 bg-green-50 dark:bg-green-950 rounded text-sm font-semibold text-green-900 dark:text-green-200"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
