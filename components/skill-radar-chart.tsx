"use client"

import type { StudentProfile } from "@/lib/types"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

interface SkillRadarChartProps {
  profile: StudentProfile
}

export default function SkillRadarChart({ profile }: SkillRadarChartProps) {
  const data = [
    {
      category: "Technical",
      value: Math.min(profile.skills.length * 20, 100),
    },
    {
      category: "Communication",
      value: profile.communicationSkills * 10,
    },
    {
      category: "Problem Solving",
      value: profile.problemSolving * 10,
    },
    {
      category: "Experience",
      value: Math.min((profile.internships + profile.projects) * 10, 100),
    },
    {
      category: "Academic",
      value: Math.min(profile.cgpa * 10, 100),
    },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Skill Profile Radar</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#cbd5e1" />
          <PolarAngleAxis dataKey="category" stroke="#64748b" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#cbd5e1" />
          <Radar name="Skills" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
