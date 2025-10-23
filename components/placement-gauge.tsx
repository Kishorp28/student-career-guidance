"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface PlacementGaugeProps {
  probability: number
}

export default function PlacementGauge({ probability }: PlacementGaugeProps) {
  const percentage = probability * 100
  const data = [
    { name: "Probability", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ]

  const getColor = () => {
    if (percentage >= 70) return "#10b981"
    if (percentage >= 50) return "#f59e0b"
    return "#ef4444"
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Placement Probability</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
            <Cell fill={getColor()} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{percentage.toFixed(1)}%</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {percentage >= 70 ? "High" : percentage >= 50 ? "Medium" : "Low"} Probability
        </p>
      </div>
    </div>
  )
}
