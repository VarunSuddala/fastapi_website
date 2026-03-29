import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Zap, Link as LinkIcon } from 'lucide-react'
import { topics } from '../data/topics'
import { useProgressStore } from '../store/useProgressStore'
import { CodeBlock } from '../components/CodeBlock'
import { CalloutBox } from '../components/CalloutBox'
import { AnimatedFlowDiagram } from '../components/AnimatedFlowDiagram'
import { StepNavigator } from '../components/StepNavigator'
import { PracticeMode } from '../components/PracticeMode'
import { TutorialContent } from '../components/TutorialContent'

export function Topic() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const { markCompleted } = useProgressStore()
  
  const [currentStep, setCurrentStep] = useState(0)

  const topicData = topics.find(t => t.id === topicId)
  
  // Reset step when topic changes
  useEffect(() => {
    setCurrentStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [topicId])

  if (!topicData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Topic Not Found</h2>
          <button onClick={() => navigate('/')} className="text-cyan-500 hover:underline">
            Return Home
          </button>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(prev => prev + 1)
  }

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(prev => prev - 1)
  }

  const handleComplete = () => {
    if (topicId) markCompleted(topicId)
    const currentIndex = topics.findIndex(t => t.id === topicId)
    if (currentIndex < topics.length - 1) {
      navigate(`/topic/${topics[currentIndex + 1].id}`)
    } else {
      navigate('/')
    }
  }

  // --- Custom React content for "fastapi-intro" topic (step-by-step) ---
  const getIntroStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Rocket size={24} />
              </div>
              <h2 className="text-3xl font-display font-bold">1. Intuition</h2>
            </div>
            
            <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p className="mb-4">
                Imagine you're running a busy restaurant. The waiters take orders from customers and rush back to the kitchen to get the food prepared.
              </p>
              <p className="mb-4">
                If your waiters are slow, customers get angry. If your kitchen gets confused by orders, the wrong food comes out.
              </p>
              <p>
                <strong>FastAPI</strong> is like hiring a fleet of highly efficient, lightning-fast waiters who instantly validate every single order before it even reaches the kitchen. If a customer orders a "blue" steak but you only serve rare or well-done, the waiter instantly catches it and tells the customer, saving the kitchen's time.
              </p>
            </div>

            <CalloutBox type="tip" title="Why 'Fast'?">
              It's fast to <strong>run</strong> (comparable to NodeJS or Go thanks to Starlette) and delightfully fast to <strong>code</strong> (fewer bugs, automatic documentation).
            </CalloutBox>
          </motion.div>
        )
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Zap size={24} />
              </div>
              <h2 className="text-3xl font-display font-bold">2. The Code</h2>
            </div>
            
            <p className="text-muted-foreground text-lg mb-6">
              Let's see just how little code it takes to spin up a fully functioning API endpoint.
            </p>

            <CodeBlock 
              language="python"
              title="main.py"
              code={`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to FastLearn!"}
`} 
            />

            <CalloutBox type="info" title="What just happened?">
              We imported FastAPI, created an <code>app</code> instance, and used a decorator <code>@app.get("/")</code> to tell FastAPI that when someone visits the root URL, it should run the <code>read_root</code> function.
            </CalloutBox>
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <LinkIcon size={24} />
              </div>
              <h2 className="text-3xl font-display font-bold">3. Visualization</h2>
            </div>
            
            <p className="text-muted-foreground text-lg mb-6">
              When a user opens their browser (Client) and visits your API, the request flows directly to your FastAPI application. Let's visualize this flow:
            </p>

            <AnimatedFlowDiagram />

            <p className="text-muted-foreground text-lg mt-8">
              The magical part? FastAPI automatically handles the serialisation of your python dictionary <code>{`{"message": "Welcome"}`}</code> into JSON that the browser natively understands!
            </p>
          </motion.div>
        )
      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                <span className="font-bold text-xl font-mono px-2">?</span>
              </div>
              <h2 className="text-3xl font-display font-bold">4. Try it out!</h2>
            </div>
            
            <p className="text-muted-foreground text-lg mb-6">
              Let's test what you've learned so far.
            </p>

            <PracticeMode 
              question="What is the primary role of the @app.get('/') decorator?"
              options={[
                "It validates incoming JSON data",
                "It tells FastAPI which function to run when the '/' path receives a GET request",
                "It connects the FastAPI app to the Database",
                "It automatically deploys the app"
              ]}
              correctAnswerIndex={1}
              explanation="Decorators like @app.get() setup routing, telling FastAPI how to handle specific HTTP methods requests to specific URL paths."
            />
          </motion.div>
        )
      default: return null
    }
  }

  // Determine if this topic has custom React content (fastapi-intro step-by-step)
  const isIntro = topicId === 'fastapi-intro'
  const stepsLength = isIntro ? 4 : 1
  const hasHtmlContent = !!topicData.htmlContent

  const getStepContent = (step: number) => {
    if (isIntro) {
      return getIntroStepContent(step)
    }

    // For all other topics — render their HTML content from the tutorial file
    if (hasHtmlContent) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <TutorialContent htmlContent={topicData.htmlContent!} />
        </motion.div>
      )
    }

    // Fallback
    return (
      <div className="text-center py-20 text-muted-foreground">
        Content for this section is still being forged in the code mines.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 pb-32">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
          {topicData.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {topicData.description}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3 }}
           className="min-h-[40vh]"
        >
          {getStepContent(currentStep)}
        </motion.div>
      </AnimatePresence>

      <StepNavigator 
        currentStep={currentStep}
        totalSteps={stepsLength}
        onNext={handleNext}
        onPrev={handlePrev}
        onComplete={handleComplete}
      />
    </div>
  )
}
