export interface Course {
  name: string
  company: string
  link: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
}

export const courseDatabase: Record<string, Course[]> = {
  "Python Programming": [
    {
      name: "Python for Data Science",
      company: "Google",
      link: "https://www.coursera.org/learn/python-data-analysis",
      category: "Python",
      level: "beginner",
    },
    {
      name: "Python Programming Masterclass",
      company: "Udemy",
      link: "https://www.udemy.com/course/complete-python-bootcamp/",
      category: "Python",
      level: "beginner",
    },
    {
      name: "Advanced Python",
      company: "LinkedIn Learning",
      link: "https://www.linkedin.com/learning/advanced-python",
      category: "Python",
      level: "advanced",
    },
  ],
  "Web Development": [
    {
      name: "Full Stack Web Development",
      company: "Deloitte",
      link: "https://www.deloitte.com/us/en/services/consulting/perspectives/technology-consulting.html",
      category: "Web Development",
      level: "intermediate",
    },
    {
      name: "React.js Complete Guide",
      company: "Udemy",
      link: "https://www.udemy.com/course/react-the-complete-guide/",
      category: "Web Development",
      level: "intermediate",
    },
    {
      name: "Web Development Bootcamp",
      company: "Coursera",
      link: "https://www.coursera.org/specializations/web-development",
      category: "Web Development",
      level: "beginner",
    },
    {
      name: "Next.js & Node.js",
      company: "Vercel",
      link: "https://nextjs.org/learn",
      category: "Web Development",
      level: "intermediate",
    },
  ],
  "Machine Learning": [
    {
      name: "Machine Learning Basics",
      company: "Google",
      link: "https://developers.google.com/machine-learning/crash-course",
      category: "Machine Learning",
      level: "beginner",
    },
    {
      name: "Deep Learning Specialization",
      company: "Coursera",
      link: "https://www.coursera.org/specializations/deep-learning",
      category: "Machine Learning",
      level: "advanced",
    },
    {
      name: "ML Engineering for Production",
      company: "Coursera",
      link: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
      category: "Machine Learning",
      level: "advanced",
    },
    {
      name: "TensorFlow Developer Certificate",
      company: "Google",
      link: "https://www.tensorflow.org/certificate",
      category: "Machine Learning",
      level: "intermediate",
    },
  ],
  "Data Structures & Algorithms": [
    {
      name: "Data Structures & Algorithms",
      company: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/data-structures/",
      category: "DSA",
      level: "beginner",
    },
    {
      name: "Algorithms Specialization",
      company: "Coursera",
      link: "https://www.coursera.org/specializations/algorithms",
      category: "DSA",
      level: "intermediate",
    },
    {
      name: "Competitive Programming",
      company: "CodeChef",
      link: "https://www.codechef.com/learn",
      category: "DSA",
      level: "advanced",
    },
    {
      name: "LeetCode Premium",
      company: "LeetCode",
      link: "https://leetcode.com/",
      category: "DSA",
      level: "intermediate",
    },
  ],
  "SQL & Databases": [
    {
      name: "SQL for Data Analysis",
      company: "Coursera",
      link: "https://www.coursera.org/learn/sql-for-data-analysis",
      category: "Database",
      level: "beginner",
    },
    {
      name: "Database Design & SQL",
      company: "Udemy",
      link: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
      category: "Database",
      level: "beginner",
    },
    {
      name: "Advanced SQL",
      company: "Mode Analytics",
      link: "https://mode.com/sql-tutorial/",
      category: "Database",
      level: "intermediate",
    },
    {
      name: "PostgreSQL & MongoDB",
      company: "Udemy",
      link: "https://www.udemy.com/course/the-complete-developers-guide-to-mongodb/",
      category: "Database",
      level: "intermediate",
    },
  ],
  "Cloud Computing": [
    {
      name: "AWS Cloud Practitioner",
      company: "Amazon",
      link: "https://aws.amazon.com/training/",
      category: "Cloud",
      level: "beginner",
    },
    {
      name: "Google Cloud Fundamentals",
      company: "Google",
      link: "https://www.coursera.org/learn/gcp-fundamentals",
      category: "Cloud",
      level: "beginner",
    },
    {
      name: "Azure Fundamentals",
      company: "Microsoft",
      link: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/",
      category: "Cloud",
      level: "beginner",
    },
    {
      name: "DevOps & Cloud Architecture",
      company: "Linux Academy",
      link: "https://www.pluralsight.com/paths/devops",
      category: "Cloud",
      level: "advanced",
    },
  ],
  "Data Science": [
    {
      name: "Data Science Specialization",
      company: "Coursera",
      link: "https://www.coursera.org/specializations/jhu-data-science",
      category: "Data Science",
      level: "intermediate",
    },
    {
      name: "Python for Data Science",
      company: "DataCamp",
      link: "https://www.datacamp.com/courses/intro-to-python-for-data-science",
      category: "Data Science",
      level: "beginner",
    },
    {
      name: "Advanced Data Science",
      company: "Udacity",
      link: "https://www.udacity.com/course/data-scientist-nanodegree--nd025",
      category: "Data Science",
      level: "advanced",
    },
  ],
  "Communication Skills": [
    {
      name: "Communication Skills Mastery",
      company: "LinkedIn Learning",
      link: "https://www.linkedin.com/learning/communication-skills",
      category: "Soft Skills",
      level: "beginner",
    },
    {
      name: "Public Speaking & Presentation",
      company: "Coursera",
      link: "https://www.coursera.org/learn/public-speaking",
      category: "Soft Skills",
      level: "beginner",
    },
    {
      name: "Professional Communication",
      company: "Udemy",
      link: "https://www.udemy.com/course/professional-communication-skills/",
      category: "Soft Skills",
      level: "beginner",
    },
  ],
  "Aptitude & Reasoning": [
    {
      name: "Quantitative Aptitude Training",
      company: "IndiaBIX",
      link: "https://www.indiabix.com/aptitude/",
      category: "Aptitude",
      level: "beginner",
    },
    {
      name: "Logical Reasoning",
      company: "Unacademy",
      link: "https://unacademy.com/",
      category: "Aptitude",
      level: "beginner",
    },
    {
      name: "Placement Preparation",
      company: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/gate-cs-notes-gq/",
      category: "Aptitude",
      level: "intermediate",
    },
  ],
  "Java Programming": [
    {
      name: "Java Programming Masterclass",
      company: "Udemy",
      link: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
      category: "Java",
      level: "beginner",
    },
    {
      name: "Advanced Java",
      company: "Coursera",
      link: "https://www.coursera.org/learn/java-programming-advanced",
      category: "Java",
      level: "advanced",
    },
    {
      name: "Spring Boot Microservices",
      company: "Udemy",
      link: "https://www.udemy.com/course/spring-boot-microservices/",
      category: "Java",
      level: "advanced",
    },
  ],
  "Internship Preparation": [
    {
      name: "Internship Preparation Workshop",
      company: "LinkedIn Learning",
      link: "https://www.linkedin.com/learning/internship-success",
      category: "Career",
      level: "beginner",
    },
    {
      name: "Resume & Interview Prep",
      company: "Coursera",
      link: "https://www.coursera.org/learn/resume-interview",
      category: "Career",
      level: "beginner",
    },
    {
      name: "Technical Interview Prep",
      company: "Pramp",
      link: "https://www.pramp.com/",
      category: "Career",
      level: "intermediate",
    },
  ],
}

export function getCoursesForRecommendation(recommendationName: string): Course[] {
  // Map recommendation names to course database keys
  const keyMap: Record<string, string> = {
    "📚 Academic Excellence Program": "Python Programming",
    "⏰ Backlog Clearance Strategy": "Aptitude & Reasoning",
    "🐍 Python Programming Fundamentals": "Python Programming",
    "🗄️ Database Management with SQL": "SQL & Databases",
    "🤖 Machine Learning Basics": "Machine Learning",
    "💼 Internship Preparation Workshop": "Internship Preparation",
    "🎤 Communication Skills Mastery": "Communication Skills",
    "🧠 Quantitative Aptitude Training": "Aptitude & Reasoning",
    "⚡ Data Structures & Algorithms": "Data Structures & Algorithms",
    "☁️ AWS Cloud Practitioner": "Cloud Computing",
    "🌐 Advanced Full Stack Development": "Web Development",
  }

  const key = keyMap[recommendationName] || recommendationName
  return courseDatabase[key] || []
}

export function getAllCoursesByCategory(): Record<string, Course[]> {
  const byCategory: Record<string, Course[]> = {}

  for (const courses of Object.values(courseDatabase)) {
    for (const course of courses) {
      if (!byCategory[course.category]) {
        byCategory[course.category] = []
      }
      byCategory[course.category].push(course)
    }
  }

  return byCategory
}
