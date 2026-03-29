import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, BookOpen, Code, Search } from 'lucide-react'
import { topics } from '../data/topics'
import { useProgressStore } from '../store/useProgressStore'
import { cn } from '../utils/cn'

export function Sidebar() {
  const location = useLocation()
  const currentPath = location.pathname
  const { completedTopics } = useProgressStore()

  const progressPercentage = Math.round((completedTopics.length / topics.length) * 100)

  return (
    <aside className="w-72 h-screen sticky top-0 border-r border-border/40 bg-background/50 backdrop-blur-xl flex flex-col hidden md:flex">
      <div className="p-6 border-b border-border/40">
        <Link to="/" className="flex items-center gap-2 text-xl font-display font-bold text-foreground">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white">
            <BookOpen size={18} />
          </div>
          FastLearn
        </Link>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search topics..." 
            className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-sans"
          />
        </div>
      </div>

      <div className="px-6 py-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress</span>
          <span className="text-xs font-bold text-cyan-500">{progressPercentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
        {topics.map((topic) => {
          const isCompleted = completedTopics.includes(topic.id)
          const isActive = currentPath.includes(`/topic/${topic.id}`)
          
          return (
            <Link key={topic.id} to={`/topic/${topic.id}`}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive 
                    ? "bg-cyan-500/10 text-cyan-500 font-medium" 
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                ) : (
                  <Circle className={cn(
                    "w-4 h-4 flex-shrink-0",
                    isActive ? "text-cyan-500" : "text-muted-foreground/50"
                  )} />
                )}
                <span className="truncate">{topic.title}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-8 bg-cyan-500 rounded-r-full"
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
      
      <div className="p-4 border-t border-border/40">
        <Link to="/playground">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-lg transition-colors text-sm"
          >
            <Code size={16} />
            Playground
          </motion.div>
        </Link>
      </div>
    </aside>
  )
}
