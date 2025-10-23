import { generateText } from "ai"

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

export async function POST(request: Request) {
  try {
    const { message, conversationHistory }: ChatRequest = await request.json()

    // Format conversation history for context
    const conversationContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const prompt = `${CAREER_CONTEXT}

Previous conversation:
${conversationContext}

User's new question: ${message}

Provide a helpful, specific response about career guidance. Keep responses concise but informative.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
