"use client"

import type React from "react"
import { useState } from "react"
import type { StudentProfile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GraduationCap, Briefcase, Code2, Brain, Sparkles } from "lucide-react"

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
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      <Card className="relative overflow-hidden p-8 md:p-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-violet-200 dark:border-violet-900/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-cyan-500/5 dark:from-violet-500/10 dark:via-blue-500/10 dark:to-cyan-500/10" />
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
              Student Profile
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Fill in your details for personalized career guidance</p>
          </div>

          {/* Academic Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-violet-100 dark:bg-violet-950/50 rounded-lg">
                <GraduationCap className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  CGPA: <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">{formData.cgpa.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.1"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: Number.parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-400 hover:accent-violet-700 dark:hover:accent-violet-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  College Tier
                </label>
                <select
                  value={formData.collegeTier}
                  onChange={(e) => setFormData({ ...formData, collegeTier: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900/50 transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-600"
                >
                  <option>Tier1</option>
                  <option>Tier2</option>
                  <option>Tier3</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Total Backlogs: <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">{formData.backlogs}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.backlogs}
                  onChange={(e) => setFormData({ ...formData, backlogs: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-400 hover:accent-violet-700 dark:hover:accent-violet-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Current Backlogs: <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">{formData.currentBacklogs}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.currentBacklogs}
                  onChange={(e) => setFormData({ ...formData, currentBacklogs: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-400 hover:accent-violet-700 dark:hover:accent-violet-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Internships: <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{formData.internships}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={formData.internships}
                  onChange={(e) => setFormData({ ...formData, internships: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 hover:accent-blue-700 dark:hover:accent-blue-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Projects: <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{formData.projects}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.projects}
                  onChange={(e) => setFormData({ ...formData, projects: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 hover:accent-blue-700 dark:hover:accent-blue-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Certifications: <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{formData.certifications}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 hover:accent-blue-700 dark:hover:accent-blue-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Hackathons Won: <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{formData.hackathomsWon}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.hackathomsWon}
                  onChange={(e) => setFormData({ ...formData, hackathomsWon: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 hover:accent-blue-700 dark:hover:accent-blue-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Extracurricular: <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{formData.extracurricular}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.extracurricular}
                  onChange={(e) => setFormData({ ...formData, extracurricular: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 hover:accent-blue-700 dark:hover:accent-blue-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-950/50 rounded-lg">
                <Code2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Skills</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`group relative px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    formData.skills.includes(skill)
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/30 dark:shadow-violet-500/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {formData.skills.includes(skill) && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <span className="relative z-10">{skill}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Soft Skills & Aptitude */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Soft Skills & Aptitude</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Communication Skills: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.communicationSkills}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.communicationSkills}
                  onChange={(e) => setFormData({ ...formData, communicationSkills: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Problem Solving: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.problemSolving}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.problemSolving}
                  onChange={(e) => setFormData({ ...formData, problemSolving: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Teamwork: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.teamwork}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.teamwork}
                  onChange={(e) => setFormData({ ...formData, teamwork: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Leadership: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.leadership}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.leadership}
                  onChange={(e) => setFormData({ ...formData, leadership: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Time Management: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.timeManagement}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.timeManagement}
                  onChange={(e) => setFormData({ ...formData, timeManagement: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Aptitude Test Score: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.aptitudeScore}%</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.aptitudeScore}
                  onChange={(e) => setFormData({ ...formData, aptitudeScore: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Coding Test Score: <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{formData.codingScore}%</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.codingScore}
                  onChange={(e) => setFormData({ ...formData, codingScore: Number.parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400 hover:accent-emerald-700 dark:hover:accent-emerald-300 transition-all"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="group relative w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/50 dark:hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Analyzing Your Profile...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Predict Placement & Get Recommendations
                </>
              )}
            </span>
          </Button>
        </form>
      </Card>
    </div>
  )
}
