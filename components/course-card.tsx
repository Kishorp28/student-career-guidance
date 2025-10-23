import { ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/course-database"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const levelColors = {
    beginner: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    intermediate: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    advanced: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
  }

  return (
    <Card className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{course.name}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">by {course.company}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded ${levelColors[course.level]}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{course.category}</span>
        </div>

        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 h-auto">
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            View Course
            <ExternalLink size={14} />
          </a>
        </Button>
      </div>
    </Card>
  )
}
