import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressState {
  completedTopics: string[]
  markCompleted: (topicId: string) => void
  isCompleted: (topicId: string) => boolean
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: [],
      markCompleted: (topicId) => 
        set((state) => ({
          completedTopics: state.completedTopics.includes(topicId)
            ? state.completedTopics
            : [...state.completedTopics, topicId],
        })),
      isCompleted: (topicId) => get().completedTopics.includes(topicId),
    }),
    {
      name: 'education-progress-storage',
    }
  )
)
