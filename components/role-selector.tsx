"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllRoles } from "@/lib/role-database"
import type { CareerRole } from "@/lib/role-database"

interface RoleSelectorProps {
  onSelectRole: (role: CareerRole) => void
}

export default function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = getAllRoles()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "All Roles" },
    { id: "development", label: "Development" },
    { id: "data", label: "Data & AI" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "quality", label: "Quality" },
  ]

  const categoryMap: Record<string, string[]> = {
    development: ["frontend-developer", "backend-developer", "full-stack-developer", "mobile-developer"],
    data: ["data-scientist", "ml-engineer"],
    infrastructure: ["devops-engineer", "cloud-architect"],
    quality: ["qa-engineer"],
  }

  const filteredRoles =
    selectedCategory === "all" ? roles : roles.filter((r) => categoryMap[selectedCategory]?.includes(r.id))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Select Your Target Role</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="rounded-full"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoles.map((role) => (
          <Card
            key={role.id}
            className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200 dark:border-slate-700"
            onClick={() => onSelectRole(role)}
          >
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 dark:text-slate-50">{role.title}</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Salary Range:</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  ₹{(role.salaryRange.min / 100000).toFixed(1)}L - ₹{(role.salaryRange.max / 100000).toFixed(1)}L
                </span>
              </div>

              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Demand: {role.jobMarketDemand}/10
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  Growth: {role.growthPotential}/10
                </Badge>
              </div>

              <Button onClick={() => onSelectRole(role)} className="w-full bg-blue-600 hover:bg-blue-700">
                Explore Role
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
