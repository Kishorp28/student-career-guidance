"use client"

import { useState } from "react"
import RoleSelector from "@/components/role-selector"
import RoleDetails from "@/components/role-details"
import type { CareerRole } from "@/lib/role-database"

export default function RoleGuidancePage() {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Role-Based Career Guidance</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore different career paths and get personalized recommendations based on your target role
          </p>
        </div>

        {!selectedRole ? (
          <RoleSelector onSelectRole={setSelectedRole} />
        ) : (
          <RoleDetails role={selectedRole} onBack={() => setSelectedRole(null)} />
        )}
      </div>
    </main>
  )
}
