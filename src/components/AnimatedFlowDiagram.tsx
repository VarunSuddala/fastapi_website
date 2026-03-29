import { motion, type Variants } from 'framer-motion'
import { Server, MonitorSmartphone, Database } from 'lucide-react'

export function AnimatedFlowDiagram() {
  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
  }

  return (
    <div className="w-full h-48 my-8 relative flex items-center justify-between px-8 bg-secondary/20 rounded-2xl border border-border/50">
      <motion.div 
        className="flex flex-col items-center gap-2 z-10"
        variants={nodeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
          <MonitorSmartphone size={32} />
        </div>
        <span className="text-sm font-semibold">Client</span>
      </motion.div>

      {/* Animated Path */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-full pointer-events-none flex justify-center items-center px-24">
        <svg className="w-full h-8" preserveAspectRatio="none">
          <motion.line 
            x1="0" 
            y1="16" 
            x2="100%" 
            y2="16" 
            stroke="url(#gradient)" 
            strokeWidth="4" 
            strokeDasharray="8 8"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Moving dot */}
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          animate={{ x: ["-10vw", "10vw"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div 
        className="flex flex-col items-center gap-2 z-10"
        variants={nodeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
          <Server size={32} />
        </div>
        <span className="text-sm font-semibold">FastAPI Server</span>
      </motion.div>

      <div className="absolute left-[50%] top-1/2 -translate-y-1/2 h-full pointer-events-none flex justify-center items-center ml-24 hidden md:flex">
         <svg className="w-24 h-8" preserveAspectRatio="none">
          <motion.line 
            x1="0" 
            y1="16" 
            x2="100%" 
            y2="16" 
            stroke="#9333ea" 
            strokeWidth="4" 
            strokeDasharray="8 8"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
        </svg>
      </div>

      <motion.div 
        className="hidden md:flex flex-col items-center gap-2 z-10"
        variants={nodeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground border border-border">
          <Database size={32} />
        </div>
        <span className="text-sm font-semibold">Database</span>
      </motion.div>
    </div>
  )
}
