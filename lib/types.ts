export interface StudentProfile {
  cgpa: number
  collegeTier: string
  backlogs: number
  currentBacklogs: number
  internships: number
  projects: number
  certifications: number
  hackathomsWon: number
  extracurricular: number
  skills: string[]
  communicationSkills: number
  problemSolving: number
  teamwork: number
  leadership: number
  timeManagement: number
  aptitudeScore: number
  codingScore: number
}

export interface PredictionResult {
  placementProbability: number
  placementPrediction: number
  expectedSalary: number
  recommendations: string[]
  skillGaps: string[]
  profile: StudentProfile
}
