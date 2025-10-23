"use client"

import type { StudentProfile } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface FactorImportanceProps {
  profile: StudentProfile
}

export default function FactorImportance({ profile }: FactorImportanceProps) {
  const data = [
    { factor: "CGPA", impact: Math.min(profile.cgpa * 3, 25) },
    { factor: "Internships", impact: Math.min(profile.internships * 5, 20) },
    { factor: "Skills", impact: Math.min(profile.skills.length * 2, 18) },
    { factor: "Communication", impact: Math.min(profile.communicationSkills * 1.5, 15) },
    { factor: "Projects", impact: Math.min(profile.projects * 1, 12) },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Key Placement Factors</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#64748b" />
          <YAxis dataKey="factor" type="category" stroke="#64748b" width={80} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Bar dataKey="impact" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
