import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { topics } from '../data/topics'
import { useProgressStore } from '../store/useProgressStore'

export function Home() {
  const { completedTopics } = useProgressStore()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
          Master FastAPI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Intuitively
          </span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
          A step-by-step interactive journey to building modern, fast, and robust backend APIs.
        </p>
        <Link to={`/topic/${topics[0].id}`}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-foreground text-background font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            {completedTopics.length > 0 ? 'Continue Learning' : 'Start Learning'}
          </motion.button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border border-border/40 bg-secondary/30 backdrop-blur-sm hover:border-cyan-500/50 transition-colors"
          >
            <div className="text-cyan-500 font-mono text-sm mb-2">Module {index + 1}</div>
            <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>
            <Link to={`/topic/${topic.id}`} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              Go to Module →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
