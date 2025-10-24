import { GoogleGenerativeAI } from "@google/generative-ai"

export const runtime = "nodejs"

interface ChatRequest {
  message: string
  conversationHistory: Array<{
    role: "user" | "assistant"
    content: string
  }>
}

const CAREER_CONTEXT = `You are an expert Career Guidance Counselor with deep knowledge of:
- Tech industry roles and career paths (Frontend, Backend, Full Stack, Data Science, DevOps, etc.)
- Skill requirements for different positions
- Salary expectations and market trends
- Interview preparation and tips
- Course recommendations and learning paths
- Career progression and growth opportunities
- Industry best practices and emerging technologies

Provide personalized, actionable advice based on user questions. Be encouraging and specific.
When recommending courses, mention real platforms like Coursera, Udemy, Google Cloud, AWS, etc.
Always ask clarifying questions if needed to give better recommendations.`

// Helper function to detect question types and provide conditional responses
function getConditionalResponse(userMessage: string): string | null {
  const message = userMessage.toLowerCase().trim()
  
  // Handle empty or very short messages
  if (message.length < 2) {
    return "🤔 Could you please provide more details about what you'd like to know?"
  }
  
  // If asking about salary
  if (message.includes('salary') || message.includes('pay') || message.includes('wage') || message.includes('compensation')) {
    return "💰 **Salary Information**\n\nSalary varies by role, experience, and location:\n\n• **Entry Level (0-2 years):** $40K-$70K\n• **Mid Level (3-5 years):** $70K-$120K\n• **Senior Level (5+ years):** $120K-$200K+\n\n**Factors affecting salary:**\n- Technical skills depth\n- Industry domain\n- Company size\n- Geographic location\n- Years of experience\n\n💡 Would you like specific salary info for a particular role or location?"
  }
  
  // If asking about skills
  else if (message.includes('skill') || message.includes('learn') || message.includes('study') || message.includes('course')) {
    return "🚀 **Essential Skills Development**\n\n**Technical Skills:**\n• Programming languages (Python, JavaScript, Java, C++)\n• Frameworks & libraries (React, Node.js, Django)\n• Database management (SQL, NoSQL)\n• Cloud platforms (AWS, Azure, GCP)\n• Version control (Git, GitHub)\n\n**Soft Skills:**\n• Problem-solving & critical thinking\n• Communication & presentation\n• Teamwork & collaboration\n• Time management & organization\n• Adaptability & learning agility\n\n**Learning Resources:**\n• Online: Coursera, Udemy, Pluralsight, freeCodeCamp\n• Practice: GitHub projects, Kaggle competitions\n• Reading: Tech blogs, documentation, books\n\n🎯 What specific skill area interests you most?"
  }
  
  // If asking about interviews
  else if (message.includes('interview') || message.includes('preparation') || message.includes('tips') || message.includes('job application')) {
    return "🎯 **Interview Preparation Guide**\n\n**Before the Interview:**\n• Research the company & role thoroughly\n• Practice coding problems (LeetCode, HackerRank)\n• Prepare STAR method examples\n• Review your projects & achievements\n• Prepare thoughtful questions to ask\n\n**During the Interview:**\n• Ask clarifying questions\n• Think out loud while problem-solving\n• Show enthusiasm and genuine interest\n• Demonstrate cultural fit\n• Follow up with thank-you notes\n\n**Common Questions:**\n• Technical challenges you've solved\n• Why you want this specific role\n• Your short-term & long-term career goals\n• Behavioral scenarios (teamwork, conflict resolution)\n\n💪 Need help with any specific interview aspect?"
  }
  
  // If asking about career paths
  else if (message.includes('career') || message.includes('path') || message.includes('role') || message.includes('job') || message.includes('profession')) {
    return "🛤️ **Career Path Options**\n\n**Popular Tech Roles:**\n• **Frontend Developer:** UI/UX, React, Vue.js\n• **Backend Developer:** APIs, databases, server logic\n• **Full Stack Developer:** Complete web applications\n• **Data Scientist:** Analytics, ML, Python/R\n• **DevOps Engineer:** Infrastructure, deployment, CI/CD\n• **Product Manager:** Strategy, roadmaps, coordination\n• **UX/UI Designer:** User experience & interface design\n• **Cybersecurity Specialist:** Security, compliance, risk\n\n**Career Progression:**\nJunior → Mid-level → Senior → Tech Lead → Architect/Manager → Director\n\n**Growth Tips:**\n• Build a strong portfolio with diverse projects\n• Contribute to open source projects\n• Network with industry professionals\n• Stay updated with emerging technologies\n• Pursue relevant certifications\n\n🚀 Which career path interests you most?"
  }
  
  // If asking about education or degree
  else if (message.includes('degree') || message.includes('education') || message.includes('college') || message.includes('university')) {
    return "🎓 **Education & Career Guidance**\n\n**Traditional Paths:**\n• Computer Science/Engineering degrees\n• Information Technology programs\n• Business/Management degrees\n• Specialized certifications\n\n**Alternative Paths:**\n• Coding bootcamps (3-6 months)\n• Online courses & self-learning\n• Professional certifications\n• Portfolio-based learning\n\n**Industry Reality:**\n• Skills matter more than degrees in many tech roles\n• Continuous learning is essential\n• Experience & projects often outweigh formal education\n• Many successful professionals are self-taught\n\n📚 What's your current educational background or learning preference?"
  }
  
  // If greeting or basic questions
  else if (message.includes('hello') || message.includes('hi') || message.includes('help') || message.includes('start') || message.includes('hey')) {
    return "👋 **Welcome to Career Vision!**\n\nI'm your AI career counselor, ready to help you navigate your professional journey!\n\n🎯 **Career Planning**\n• Role recommendations based on your interests\n• Career progression pathways\n• Industry insights & trends\n\n📚 **Skill Development**\n• Personalized learning roadmaps\n• Course & certification recommendations\n• Technology stack guidance\n\n💼 **Job Preparation**\n• Interview strategies & practice\n• Resume optimization tips\n• Salary negotiation advice\n\n📊 **Market Intelligence**\n• Job market analysis\n• Emerging technology demands\n• Career opportunity insights\n\n✨ **What would you like to explore first?** Just ask me anything about careers, skills, interviews, or professional growth!"
  }
  
  return null // Return null if no conditional match found
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return Response.json({ error: "Missing GOOGLE_GENERATIVE_AI_API_KEY" }, { status: 500 })
    }

    const { message, conversationHistory }: ChatRequest = await request.json()
    
    // Check for conditional responses first
    const conditionalResponse = getConditionalResponse(message)
    if (conditionalResponse) {
      return Response.json({ response: conditionalResponse, model: "conditional-logic" })
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Enhanced model candidates with better fallback options
    const MODEL_CANDIDATES = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest", 
      "gemini-1.5-pro-latest",
      "gemini-1.5-pro",
      "gemini-pro",
    ] as const

    // Build Gemini-compatible conversation context (keep last 6 turns)
    const contents: any[] = []
    for (const msg of (conversationHistory || []).slice(-6)) {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    }
    // Append the latest user message
    contents.push({ role: "user", parts: [{ text: message }] })

    let lastErr: any = null
    for (const candidate of MODEL_CANDIDATES) {
      try {
        const model = genAI.getGenerativeModel({
          model: candidate,
          systemInstruction: CAREER_CONTEXT,
        })
        const result = await model.generateContent({
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 800,
            topP: 0.95,
            topK: 40,
          },
        })
        const text = result.response.text()
        if (!text || text.trim().length === 0) {
          throw new Error("Empty response from AI model")
        }
        return Response.json({ 
          response: text, 
          model: candidate,
          timestamp: new Date().toISOString(),
          success: true 
        })
      } catch (e: any) {
        lastErr = e
        const msg = String(e?.message || "")
        console.warn(`Model ${candidate} failed:`, msg)
        
        // Try next model on these specific errors
        if (
          e?.status === 404 ||
          e?.status === 400 ||
          msg.includes("not found") ||
          msg.includes("is not found") ||
          msg.includes("not supported") ||
          msg.includes("model not available") ||
          msg.includes("quota exceeded")
        ) {
          continue
        }
        // For other errors, still try next model but log the error
        continue
      }
    }
    // If all models failed, provide a helpful fallback response
    const fallbackResponse = "I'm experiencing some technical difficulties right now, but I can still help! Try asking about specific topics like 'career paths', 'salary information', 'interview tips', or 'skill development' for instant guidance."
    
    return Response.json({ 
      response: fallbackResponse, 
      model: "fallback",
      timestamp: new Date().toISOString(),
      success: false,
      error: "AI models temporarily unavailable" 
    })

  } catch (error: any) {
    console.error("Chat API error:", error)
    
    // Provide user-friendly error messages
    let userMessage = "Sorry, I encountered an error. Please try again."
    
    if (error?.message?.includes("quota") || error?.message?.includes("rate limit")) {
      userMessage = "I'm currently experiencing high traffic. Please try again in a few moments."
    } else if (error?.message?.includes("network") || error?.message?.includes("connection")) {
      userMessage = "I'm having connectivity issues. Please check your connection and try again."
    } else if (error?.message?.includes("API key")) {
      userMessage = "There's a configuration issue. Please contact support."
    }
    
    const status = error?.status ?? 500
    return Response.json({ 
      error: userMessage, 
      timestamp: new Date().toISOString(),
      success: false 
    }, { status })
  }
}
