import { useThemeStore } from '../store/useThemeStore'
import { useLocation } from 'react-router-dom'
import { topics } from '../data/topics'
import { Sun, Moon } from 'lucide-react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'


export function TopBar() {
  const { isDark, toggleTheme } = useThemeStore()
  const location = useLocation()
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const topicId = location.pathname.split('/').pop()
  const currentTopic = topics.find(t => t.id === topicId)
  
  const currentIndex = topics.findIndex(t => t.id === topicId)
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null
  const nextTopic = currentIndex !== -1 && currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/40 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        {currentTopic ? (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <span>Learn</span>
            <span className="text-border">/</span>
            <span className="text-foreground">{currentTopic.title}</span>
          </motion.div>
        ) : (
          <div className="text-sm font-medium text-foreground">
            {location.pathname === '/' ? 'Dashboard' : 'Playground'}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Navigation shortcuts preview */}
        {currentTopic && (
          <div className="hidden lg:flex items-center gap-3 text-xs text-muted-foreground mr-4">
            {prevTopic && (
              <div className="flex items-center gap-1 opacity-60">
                <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-border/50 text-[10px]">←</kbd>
              </div>
            )}
            {nextTopic && (
              <div className="flex items-center gap-1 opacity-60">
                <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-border/50 text-[10px]">→</kbd>
              </div>
            )}
          </div>
        )}

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
