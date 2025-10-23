"use client"

import type React from "react"

import { useState } from "react"
import type { StudentProfile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const SKILLS = [
  "Python",
  "Java",
  "SQL",
  "Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Data Science",
  "Mobile Development",
  "DevOps",
]

interface StudentFormProps {
  onSubmit: (profile: StudentProfile) => void
  isLoading: boolean
}

export default function StudentForm({ onSubmit, isLoading }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentProfile>({
    cgpa: 7.5,
    collegeTier: "Tier2",
    backlogs: 0,
    currentBacklogs: 0,
    internships: 1,
    projects: 3,
    certifications: 1,
    hackathomsWon: 0,
    extracurricular: 2,
    skills: ["Python", "SQL"],
    communicationSkills: 7,
    problemSolving: 7,
    teamwork: 7,
    leadership: 6,
    timeManagement: 6,
    aptitudeScore: 70,
    codingScore: 65,
  })

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Academic Details */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🎓 Academic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  CGPA (0-10): {formData.cgpa.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.1"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: Number.parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  College Tier
                </label>
                <select
                  value={formData.collegeTier}
                  onChange={(e) => setFormData({ ...formData, collegeTier: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option>Tier1</option>
                  <option>Tier2</option>
                  <option>Tier3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Total Backlogs: {formData.backlogs}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.backlogs}
                  onChange={(e) => setFormData({ ...formData, backlogs: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Current Backlogs: {formData.currentBacklogs}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.currentBacklogs}
                  onChange={(e) => setFormData({ ...formData, currentBacklogs: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">💼 Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Internships: {formData.internships}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={formData.internships}
                  onChange={(e) => setFormData({ ...formData, internships: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Projects: {formData.projects}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.projects}
                  onChange={(e) => setFormData({ ...formData, projects: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Certifications: {formData.certifications}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Hackathons Won: {formData.hackathomsWon}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.hackathomsWon}
                  onChange={(e) => setFormData({ ...formData, hackathomsWon: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Extracurricular: {formData.extracurricular}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.extracurricular}
                  onChange={(e) => setFormData({ ...formData, extracurricular: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🛠️ Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    formData.skills.includes(skill)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Soft Skills & Aptitude */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">🌟 Soft Skills & Aptitude</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Communication Skills (1-10): {formData.communicationSkills}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.communicationSkills}
                  onChange={(e) => setFormData({ ...formData, communicationSkills: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Problem Solving (1-10): {formData.problemSolving}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.problemSolving}
                  onChange={(e) => setFormData({ ...formData, problemSolving: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Teamwork (1-10): {formData.teamwork}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.teamwork}
                  onChange={(e) => setFormData({ ...formData, teamwork: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Leadership (1-10): {formData.leadership}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.leadership}
                  onChange={(e) => setFormData({ ...formData, leadership: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Time Management (1-10): {formData.timeManagement}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.timeManagement}
                  onChange={(e) => setFormData({ ...formData, timeManagement: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Aptitude Test Score: {formData.aptitudeScore}
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.aptitudeScore}
                  onChange={(e) => setFormData({ ...formData, aptitudeScore: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Coding Test Score: {formData.codingScore}
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.codingScore}
                  onChange={(e) => setFormData({ ...formData, codingScore: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isLoading ? "🔮 Analyzing..." : "🔮 Predict Placement & Get Recommendations"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
