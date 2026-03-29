import type { ReactNode } from 'react'
import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

type CalloutType = 'info' | 'warning' | 'success' | 'tip'

interface CalloutBoxProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

export function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  const config = {
    info: {
      icon: Info,
      style: 'bg-blue-500/10 border-blue-500/50 text-blue-500 dark:text-blue-400',
    },
    warning: {
      icon: AlertTriangle,
      style: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400',
    },
    success: {
      icon: CheckCircle,
      style: 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400',
    },
    tip: {
      icon: Lightbulb,
      style: 'bg-cyan-500/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400',
    },
  }

  const { icon: Icon, style } = config[type]

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("p-4 my-6 rounded-xl border flex gap-4 items-start", style)}
    >
      <Icon size={20} className="mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm opacity-90 leading-relaxed text-foreground">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
