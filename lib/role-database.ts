export interface RoleSkillRequirement {
  skill: string
  level: "beginner" | "intermediate" | "advanced"
  importance: "critical" | "important" | "nice-to-have"
}

export interface CareerRole {
  id: string
  title: string
  description: string
  salaryRange: {
    min: number
    max: number
  }
  requiredSkills: RoleSkillRequirement[]
  experienceYearsRequired: number
  careerProgression: string[]
  companies: string[]
  jobMarketDemand: number // 1-10 scale
  growthPotential: number // 1-10 scale
  courseRecommendations: string[]
}

export const roleDatabase: Record<string, CareerRole> = {
  "frontend-developer": {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Build user-facing web applications with modern frameworks and technologies",
    salaryRange: { min: 400000, max: 1200000 },
    requiredSkills: [
      { skill: "JavaScript/TypeScript", level: "advanced", importance: "critical" },
      { skill: "React.js", level: "advanced", importance: "critical" },
      { skill: "HTML/CSS", level: "advanced", importance: "critical" },
      { skill: "Web Development", level: "advanced", importance: "critical" },
      { skill: "REST APIs", level: "intermediate", importance: "important" },
      { skill: "Git & Version Control", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "intermediate", importance: "important" },
      { skill: "Communication Skills", level: "intermediate", importance: "nice-to-have" },
    ],
    experienceYearsRequired: 1,
    careerProgression: ["Junior Frontend Developer", "Senior Frontend Developer", "Tech Lead", "Engineering Manager"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Vercel", "Netflix"],
    jobMarketDemand: 9,
    growthPotential: 8,
    courseRecommendations: ["Web Development", "JavaScript Programming", "React.js Complete Guide"],
  },
  "backend-developer": {
    id: "backend-developer",
    title: "Backend Developer",
    description: "Design and maintain server-side applications, databases, and APIs",
    salaryRange: { min: 450000, max: 1400000 },
    requiredSkills: [
      { skill: "Python Programming", level: "advanced", importance: "critical" },
      { skill: "Java Programming", level: "advanced", importance: "critical" },
      { skill: "SQL & Databases", level: "advanced", importance: "critical" },
      { skill: "REST APIs", level: "advanced", importance: "critical" },
      { skill: "Data Structures & Algorithms", level: "advanced", importance: "critical" },
      { skill: "Cloud Computing", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "System Design", level: "intermediate", importance: "important" },
    ],
    experienceYearsRequired: 1,
    careerProgression: ["Junior Backend Developer", "Senior Backend Developer", "Tech Lead", "Architect"],
    companies: ["Google", "Amazon", "Microsoft", "Uber", "Airbnb", "Netflix"],
    jobMarketDemand: 9,
    growthPotential: 9,
    courseRecommendations: ["Python Programming", "SQL & Databases", "Data Structures & Algorithms"],
  },
  "data-scientist": {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze data and build machine learning models to solve business problems",
    salaryRange: { min: 500000, max: 1600000 },
    requiredSkills: [
      { skill: "Python Programming", level: "advanced", importance: "critical" },
      { skill: "Machine Learning", level: "advanced", importance: "critical" },
      { skill: "Data Science", level: "advanced", importance: "critical" },
      { skill: "SQL & Databases", level: "advanced", importance: "critical" },
      { skill: "Statistics & Mathematics", level: "advanced", importance: "critical" },
      { skill: "Data Visualization", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "Communication Skills", level: "intermediate", importance: "important" },
    ],
    experienceYearsRequired: 2,
    careerProgression: [
      "Junior Data Scientist",
      "Senior Data Scientist",
      "Lead Data Scientist",
      "Director of Analytics",
    ],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Tesla"],
    jobMarketDemand: 8,
    growthPotential: 9,
    courseRecommendations: ["Machine Learning", "Data Science", "Python Programming"],
  },
  "devops-engineer": {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "Manage infrastructure, deployment pipelines, and system reliability",
    salaryRange: { min: 550000, max: 1500000 },
    requiredSkills: [
      { skill: "Cloud Computing", level: "advanced", importance: "critical" },
      { skill: "Linux/Unix", level: "advanced", importance: "critical" },
      { skill: "Docker & Kubernetes", level: "advanced", importance: "critical" },
      { skill: "CI/CD Pipelines", level: "advanced", importance: "critical" },
      { skill: "Python Programming", level: "intermediate", importance: "important" },
      { skill: "Networking", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "System Design", level: "intermediate", importance: "important" },
    ],
    experienceYearsRequired: 2,
    careerProgression: ["Junior DevOps Engineer", "Senior DevOps Engineer", "DevOps Lead", "Infrastructure Architect"],
    companies: ["Google", "Amazon", "Microsoft", "Netflix", "Uber", "Airbnb"],
    jobMarketDemand: 9,
    growthPotential: 9,
    courseRecommendations: ["Cloud Computing", "Docker & Kubernetes", "CI/CD Pipelines"],
  },
  "full-stack-developer": {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: "Build complete web applications from frontend to backend",
    salaryRange: { min: 500000, max: 1500000 },
    requiredSkills: [
      { skill: "JavaScript/TypeScript", level: "advanced", importance: "critical" },
      { skill: "React.js", level: "advanced", importance: "critical" },
      { skill: "Python Programming", level: "advanced", importance: "critical" },
      { skill: "SQL & Databases", level: "advanced", importance: "critical" },
      { skill: "REST APIs", level: "advanced", importance: "critical" },
      { skill: "Web Development", level: "advanced", importance: "critical" },
      { skill: "Data Structures & Algorithms", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
    ],
    experienceYearsRequired: 2,
    careerProgression: [
      "Junior Full Stack Developer",
      "Senior Full Stack Developer",
      "Tech Lead",
      "Engineering Manager",
    ],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Vercel", "Stripe"],
    jobMarketDemand: 9,
    growthPotential: 9,
    courseRecommendations: ["Web Development", "Python Programming", "SQL & Databases"],
  },
  "mobile-developer": {
    id: "mobile-developer",
    title: "Mobile Developer",
    description: "Develop native and cross-platform mobile applications",
    salaryRange: { min: 450000, max: 1300000 },
    requiredSkills: [
      { skill: "JavaScript/TypeScript", level: "advanced", importance: "critical" },
      { skill: "React Native", level: "advanced", importance: "critical" },
      { skill: "Mobile Development", level: "advanced", importance: "critical" },
      { skill: "REST APIs", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "Git & Version Control", level: "intermediate", importance: "important" },
      { skill: "UI/UX Design", level: "intermediate", importance: "nice-to-have" },
      { skill: "Communication Skills", level: "intermediate", importance: "nice-to-have" },
    ],
    experienceYearsRequired: 1,
    careerProgression: ["Junior Mobile Developer", "Senior Mobile Developer", "Tech Lead", "Engineering Manager"],
    companies: ["Google", "Meta", "Apple", "Microsoft", "Uber", "Airbnb"],
    jobMarketDemand: 8,
    growthPotential: 8,
    courseRecommendations: ["Mobile Development", "JavaScript Programming", "React Native"],
  },
  "ml-engineer": {
    id: "ml-engineer",
    title: "ML Engineer",
    description: "Build and deploy machine learning models at scale",
    salaryRange: { min: 600000, max: 1800000 },
    requiredSkills: [
      { skill: "Python Programming", level: "advanced", importance: "critical" },
      { skill: "Machine Learning", level: "advanced", importance: "critical" },
      { skill: "Data Science", level: "advanced", importance: "critical" },
      { skill: "Deep Learning", level: "advanced", importance: "critical" },
      { skill: "SQL & Databases", level: "intermediate", importance: "important" },
      { skill: "Cloud Computing", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "System Design", level: "intermediate", importance: "important" },
    ],
    experienceYearsRequired: 2,
    careerProgression: ["Junior ML Engineer", "Senior ML Engineer", "Lead ML Engineer", "Director of AI/ML"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "OpenAI", "Tesla"],
    jobMarketDemand: 9,
    growthPotential: 10,
    courseRecommendations: ["Machine Learning", "Deep Learning", "Python Programming"],
  },
  "qa-engineer": {
    id: "qa-engineer",
    title: "QA Engineer",
    description: "Ensure software quality through testing and automation",
    salaryRange: { min: 350000, max: 1000000 },
    requiredSkills: [
      { skill: "Testing & QA", level: "advanced", importance: "critical" },
      { skill: "Automation Testing", level: "advanced", importance: "critical" },
      { skill: "Python Programming", level: "intermediate", importance: "important" },
      { skill: "SQL & Databases", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "Communication Skills", level: "intermediate", importance: "important" },
      { skill: "Attention to Detail", level: "advanced", importance: "critical" },
      { skill: "Git & Version Control", level: "intermediate", importance: "nice-to-have" },
    ],
    experienceYearsRequired: 1,
    careerProgression: ["QA Engineer", "Senior QA Engineer", "QA Lead", "Quality Manager"],
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Adobe"],
    jobMarketDemand: 7,
    growthPotential: 7,
    courseRecommendations: ["Testing & QA", "Automation Testing", "Python Programming"],
  },
  "cloud-architect": {
    id: "cloud-architect",
    title: "Cloud Architect",
    description: "Design scalable cloud infrastructure and solutions",
    salaryRange: { min: 700000, max: 2000000 },
    requiredSkills: [
      { skill: "Cloud Computing", level: "advanced", importance: "critical" },
      { skill: "System Design", level: "advanced", importance: "critical" },
      { skill: "Networking", level: "advanced", importance: "critical" },
      { skill: "Security", level: "advanced", importance: "critical" },
      { skill: "Docker & Kubernetes", level: "intermediate", importance: "important" },
      { skill: "Problem Solving", level: "advanced", importance: "important" },
      { skill: "Communication Skills", level: "advanced", importance: "important" },
      { skill: "Leadership", level: "intermediate", importance: "important" },
    ],
    experienceYearsRequired: 5,
    careerProgression: ["Senior Cloud Engineer", "Cloud Architect", "Principal Architect", "VP of Infrastructure"],
    companies: ["Google", "Amazon", "Microsoft", "IBM", "Accenture", "Deloitte"],
    jobMarketDemand: 8,
    growthPotential: 9,
    courseRecommendations: ["Cloud Computing", "System Design", "Networking"],
  },
}

export function getAllRoles(): CareerRole[] {
  return Object.values(roleDatabase)
}

export function getRoleById(id: string): CareerRole | undefined {
  return roleDatabase[id]
}

export function getRolesByDemand(): CareerRole[] {
  return Object.values(roleDatabase).sort((a, b) => b.jobMarketDemand - a.jobMarketDemand)
}

export function getRolesByGrowth(): CareerRole[] {
  return Object.values(roleDatabase).sort((a, b) => b.growthPotential - a.growthPotential)
}
