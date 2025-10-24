# Overview

Career Vision is an AI-powered student career guidance platform that helps students predict their placement probability, estimate expected salary, and receive personalized career recommendations. The system analyzes student profiles including academic performance, skills, projects, internships, and soft skills to provide data-driven insights and tailored guidance for career development.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js 14+ with App Router (React Server Components)
- **Rationale**: Provides optimal performance through server-side rendering, automatic code splitting, and built-in routing. The App Router enables modern React patterns with server and client components.
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui component library
- **State Management**: React hooks (useState, useEffect) for local component state
- **UI Components**: Radix UI primitives wrapped with shadcn/ui for accessible, customizable components

**Key Design Decisions**:
- Client-side prediction engine for instant feedback without server round-trips
- Chart visualizations using Recharts for placement probability, skill radar, and factor importance
- Theme system with dark/light mode support via next-themes
- Responsive design with mobile-first approach

## Backend Architecture

**Python FastAPI Service** (`backend/app.py`)
- **Purpose**: Machine learning model serving for advanced placement predictions
- **Tech Stack**: FastAPI, scikit-learn, pandas, numpy
- **Model Architecture**: Pre-trained ML models loaded via joblib for placement and salary predictions
- **API Design**: RESTful endpoints with Pydantic validation for type safety
- **Note**: Currently exists alongside client-side prediction logic; can be integrated for production ML workflows

**Prediction Engine** (`lib/prediction-engine.ts`)
- **Approach**: Client-side heuristic-based prediction algorithm
- **Rationale**: Provides immediate feedback without API latency; suitable for MVP and demo purposes
- **Factors Weighted**: CGPA (25%), Internships (20%), Skills (18%), Communication (15%), Projects (12%), Backlogs penalty (10%)
- **Alternatives Considered**: Server-side ML models (implemented in FastAPI backend as alternative)
- **Trade-offs**: Client-side is faster but less sophisticated; server-side ML is more accurate but adds latency

## Role-Based Guidance System

**Architecture**: Static database with role definitions and skill mappings
- **Data Structure**: Typed TypeScript objects defining career roles, skill requirements, salary ranges, and progression paths
- **Skill Matching**: Client-side algorithm comparing student profiles against role requirements
- **Course Recommendations**: Curated course database mapped to skill gaps and recommendations
- **Companies Listing**: Target companies for each role to guide job search

## AI Career Chatbot

**Technology**: Google Generative AI (Gemini)
- **Integration**: Server-side API route (`app/api/career-chat/route.ts`) with streaming support
- **Context**: Specialized career counselor system prompt with tech industry expertise
- **Conversation Management**: Client-side state management with full conversation history
- **Fallback Logic**: Conditional responses for common queries when AI unavailable
- **Security**: API key managed via environment variables

## Component Architecture

**Design System**: Atomic design principles
- **Base Components** (`components/ui/`): Reusable primitives (Button, Card, Input, Badge, Progress)
- **Feature Components** (`components/`): Domain-specific components (StudentForm, PredictionResults, RoleSelector)
- **Layout Components**: Navigation, theme provider, page layouts
- **Chart Components**: Specialized visualization components (PlacementGauge, SkillRadarChart, FactorImportance)

**TypeScript Integration**:
- Strict type checking enabled
- Shared type definitions in `lib/types.ts` for StudentProfile and PredictionResult
- Interface-driven development for props and data structures

# External Dependencies

## Third-Party Services

**Google Generative AI (Gemini)**
- **Purpose**: Powers the career chatbot with conversational AI
- **Integration Point**: `/api/career-chat` API route
- **Authentication**: API key via environment variable
- **Usage**: Career guidance, skill recommendations, interview preparation advice

**Vercel Analytics**
- **Purpose**: Track user engagement and application performance
- **Integration**: Client-side SDK included in package.json

## UI Component Libraries

**Radix UI**
- **Components Used**: Dialog, Dropdown Menu, Select, Tabs, Tooltip, Progress, and 15+ other primitives
- **Rationale**: Unstyled, accessible components that serve as foundation for custom design system
- **Customization**: Wrapped with tailwind classes via shadcn/ui patterns

**Recharts**
- **Purpose**: Data visualization for placement probability, skill radar charts, and factor importance graphs
- **Alternative Considered**: Chart.js (less React-friendly) and D3.js (steeper learning curve)

## Development Tools

**TypeScript & ESLint**
- Strict type checking for type safety
- Code quality enforcement via ESLint

**Tailwind CSS**
- Utility-first CSS framework
- Custom design tokens defined in globals.css with CSS custom properties
- Dark mode support via class strategy

**Next.js Image Optimization**
- Built-in image optimization for performance

## Python Backend Dependencies

**Machine Learning Stack**:
- **scikit-learn**: ML model training and inference
- **pandas & numpy**: Data manipulation and numerical operations
- **joblib**: Model serialization and loading

**Web Framework**:
- **FastAPI**: Modern async API framework with automatic OpenAPI documentation
- **Pydantic**: Request/response validation and serialization
- **uvicorn**: ASGI server for production deployment

## Deployment Platform

**Vercel**
- **Frontend Hosting**: Next.js application deployed on Vercel
- **Edge Functions**: API routes run on Vercel's edge network
- **Environment Variables**: Secure storage for API keys and configuration
- **Automatic Deployments**: Git-based continuous deployment from repository