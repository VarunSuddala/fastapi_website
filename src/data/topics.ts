import { tutorialTopics, type TutorialTopic } from './tutorialLoader'

export interface Topic {
  id: string
  title: string
  description: string
  content: string[]
  htmlContent?: string
}

// Re-export TutorialTopic for convenience
export type { TutorialTopic }

// Use the parsed topics from the HTML file.
// Falls back to the original 5 topics if parsing fails.
const fallbackTopics: Topic[] = [
  {
    id: 'fastapi-intro',
    title: '1. Introduction to FastAPI',
    description: 'Learn why FastAPI is fast, modern, and easy to use.',
    content: ['Intuition', 'Real-world analogy', 'Code example', 'Visualization', 'Edge cases'],
  },
  {
    id: 'fastapi-routes',
    title: '2. Path Parameters & Routes',
    description: 'Handling dynamics paths in FastAPI.',
    content: ['Intuition', 'Real-world analogy', 'Code example', 'Visualization'],
  },
  {
    id: 'fastapi-pydantic',
    title: '3. Pydantic Models',
    description: 'Data validation and settings management using Pydantic.',
    content: ['Intuition', 'Real-world analogy', 'Code example', 'Visualization', 'Edge cases'],
  },
  {
    id: 'fastapi-dependencies',
    title: '4. Dependency Injection',
    description: "FastAPI's powerful dependency injection system.",
    content: ['Intuition', 'Real-world analogy', 'Code example', 'Visualization'],
  },
  {
    id: 'fastapi-project',
    title: '5. Build a ToDo API',
    description: 'Put your skills to test by building a full backend.',
    content: ['Setup', 'Implementation', 'Testing'],
  },
]

export const topics: Topic[] =
  tutorialTopics.length > 0 ? tutorialTopics : fallbackTopics
