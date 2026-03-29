import { motion } from 'framer-motion'

export function Playground() {
  return (
    <div className="w-full h-full p-6 text-center text-muted-foreground pt-32">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold font-display mb-4 text-foreground">Playground Sandbox</h2>
        <p>This is where an interactive coding sandbox would live.</p>
        <p className="mt-4 text-sm opacity-60">(Coming Soon)</p>
      </motion.div>
    </div>
  )
}
