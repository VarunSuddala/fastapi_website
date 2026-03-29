import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

interface PracticeModeProps {
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

export function PracticeMode({ question, options, correctAnswerIndex, explanation }: PracticeModeProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isCorrect = selected === correctAnswerIndex

  const handleSubmit = () => {
    if (selected !== null) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="bg-secondary/30 border border-border/40 rounded-xl p-6 my-8">
      <div className="flex items-center gap-2 mb-4 text-purple-400 font-mono text-sm">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse-slow" />
        PRACTICE
      </div>
      
      <h3 className="text-lg font-semibold mb-6">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !isSubmitted && setSelected(idx)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selected === idx 
                ? 'border-cyan-500 bg-cyan-500/10' 
                : 'border-border/50 bg-background/50 hover:border-cyan-500/50'
            } ${isSubmitted && idx === correctAnswerIndex ? 'border-green-500 bg-green-500/10' : ''} ${
              isSubmitted && selected === idx && !isCorrect ? 'border-red-500 bg-red-500/10' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{option}</span>
              {isSubmitted && idx === correctAnswerIndex && (
                <CheckCircle2 size={18} className="text-green-500" />
              )}
              {isSubmitted && selected === idx && !isCorrect && (
                <XCircle size={18} className="text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {!isSubmitted && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onClick={handleSubmit}
            disabled={selected === null}
            className={`mt-6 px-6 py-2.5 rounded-lg font-medium transition-all ${
              selected !== null 
                ? 'bg-foreground text-background hover:scale-[1.02] shadow-lg' 
                : 'bg-secondary text-muted-foreground cursor-not-allowed'
            }`}
          >
            Check Answer
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg border flex gap-3 ${
              isCorrect ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold mb-1 text-foreground">
                {isCorrect ? "Correct!" : "Not quite right."}
              </p>
              <p className="text-sm text-foreground/80">{explanation}</p>
              
              {!isCorrect && (
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-sm font-medium underline underline-offset-4 hover:text-cyan-400"
                >
                  Try Again
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
