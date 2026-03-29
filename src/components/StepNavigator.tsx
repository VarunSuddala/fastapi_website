import { ArrowLeft, ArrowRight } from 'lucide-react'

interface StepNavigatorProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  onComplete: () => void
}

export function StepNavigator({ currentStep, totalSteps, onNext, onPrev, onComplete }: StepNavigatorProps) {
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div className="flex items-center justify-between border-t border-border/40 py-6 mt-12 mb-8">
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <ArrowLeft size={16} />
        <span>Previous Step</span>
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentStep ? 'bg-cyan-500 scale-125' : 
              i < currentStep ? 'bg-cyan-500/40' : 'bg-secondary'
            }`}
          />
        ))}
      </div>

      <button
        onClick={isLastStep ? onComplete : onNext}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:scale-105 active:scale-95 transition-all shadow-md shadow-cyan-500/10"
      >
        <span>{isLastStep ? 'Complete Topic' : 'Next Step'}</span>
        {!isLastStep && <ArrowRight size={16} />}
      </button>
    </div>
  )
}
