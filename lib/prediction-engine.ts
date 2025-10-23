import type { StudentProfile } from "./types"

export function predictPlacement(profile: StudentProfile): number {
  let score = 0

  // CGPA weight (25%)
  score += (profile.cgpa / 10) * 0.25

  // Internships weight (20%)
  score += Math.min(profile.internships / 3, 1) * 0.2

  // Skills weight (18%)
  score += Math.min(profile.skills.length / 5, 1) * 0.18

  // Communication weight (15%)
  score += (profile.communicationSkills / 10) * 0.15

  // Projects weight (12%)
  score += Math.min(profile.projects / 10, 1) * 0.12

  // Backlogs penalty (10%)
  const backlogPenalty = Math.max(0, 1 - profile.backlogs * 0.1)
  score += backlogPenalty * 0.1

  // Add some randomness for realism
  const randomFactor = (Math.random() - 0.5) * 0.1

  return Math.max(0, Math.min(1, score + randomFactor))
}

export function predictSalary(profile: StudentProfile, placementProb: number): number {
  let baseSalary = 5.0 // Base LPA

  // CGPA bonus
  baseSalary += (profile.cgpa - 6) * 0.5

  // Internship bonus
  baseSalary += profile.internships * 1.5

  // Skills bonus
  baseSalary += profile.skills.length * 0.3

  // College tier bonus
  if (profile.collegeTier === "Tier1") baseSalary += 2.0
  else if (profile.collegeTier === "Tier2") baseSalary += 1.0

  // Certifications bonus
  baseSalary += profile.certifications * 0.5

  // Hackathons bonus
  baseSalary += profile.hackathomsWon * 0.8

  // Placement probability multiplier
  baseSalary *= 0.7 + placementProb * 0.3

  // Constrain to realistic range
  return Math.max(3.0, Math.min(25.0, baseSalary))
}

export function generateRecommendations(profile: StudentProfile, placementProb: number): string[] {
  const recommendations: string[] = []

  // Academic improvements
  if (profile.cgpa < 7.5) {
    recommendations.push("📚 Academic Excellence Program")
  }

  if (profile.backlogs > 0) {
    recommendations.push("⏰ Backlog Clearance Strategy")
  }

  // Skill-based recommendations
  if (!profile.skills.includes("Python") && placementProb > 0.3) {
    recommendations.push("🐍 Python Programming Fundamentals")
  }

  if (!profile.skills.includes("SQL")) {
    recommendations.push("🗄️ Database Management with SQL")
  }

  if (!profile.skills.includes("Machine Learning") && placementProb > 0.6) {
    recommendations.push("🤖 Machine Learning Basics")
  }

  // Experience improvements
  if (profile.internships === 0) {
    recommendations.push("💼 Internship Preparation Workshop")
  }

  // Soft skills
  if (profile.communicationSkills < 7) {
    recommendations.push("🎤 Communication Skills Mastery")
  }

  if (profile.aptitudeScore < 70) {
    recommendations.push("🧠 Quantitative Aptitude Training")
  }

  if (profile.codingScore < 70) {
    recommendations.push("⚡ Data Structures & Algorithms")
  }

  // Advanced courses for high-potential students
  if (placementProb > 0.7) {
    if (profile.skills.includes("Cloud Computing")) {
      recommendations.push("☁️ AWS Cloud Practitioner")
    }
    if (profile.skills.includes("Web Development")) {
      recommendations.push("🌐 Advanced Full Stack Development")
    }
  }

  return recommendations
}

export function analyzeSkillGaps(profile: StudentProfile): string[] {
  const gaps: string[] = []

  // Technical skill gaps
  const essentialSkills = ["Python", "SQL", "Web Development"]
  for (const skill of essentialSkills) {
    if (!profile.skills.includes(skill)) {
      gaps.push(`Missing ${skill} skills`)
    }
  }

  // Experience gaps
  if (profile.internships === 0) {
    gaps.push("No internship experience")
  }

  if (profile.projects < 3) {
    gaps.push("Insufficient project portfolio")
  }

  // Academic gaps
  if (profile.cgpa < 7.0) {
    gaps.push("CGPA below competitive threshold")
  }

  if (profile.backlogs > 2) {
    gaps.push("Multiple backlogs affecting prospects")
  }

  // Soft skill gaps
  if (profile.communicationSkills < 6) {
    gaps.push("Communication skills need improvement")
  }

  return gaps
}
