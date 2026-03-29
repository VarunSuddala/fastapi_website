import { useState, useEffect } from 'react'
import { createHighlighter } from 'shiki'
import { Copy, Check } from 'lucide-react'
import { cn } from '../utils/cn'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  highlightLines?: number[]
}

export function CodeBlock({ code, language = 'python', title, highlightLines = [] }: CodeBlockProps) {
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function highlight() {
      const highlighter = await createHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['python', 'typescript', 'json', 'bash'],
      })
      
      const theme = document.documentElement.className.includes('dark') ? 'github-dark' : 'github-light'
      
      const highlighted = highlighter.codeToHtml(code, {
        lang: language,
        theme: theme,
      })
      
      setHtml(highlighted)
    }
    highlight()
  }, [code, language])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border/50 bg-[#0d1117] my-6 shadow-sm">
      {title && (
        <div className="flex items-center px-4 py-2 border-b border-white/10 bg-white/5 text-xs font-mono text-muted-foreground">
          {title}
        </div>
      )}
      
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all z-10"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>

      <div 
        className={cn(
          "p-4 overflow-x-auto text-sm font-mono custom-scrollbar",
          "[&_pre]:!bg-transparent [&_pre]:!m-0",
          highlightLines.length > 0 && "[&_.line]:opacity-50"
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      
      {/* If there are specific highlights, we would apply styles to those lines, shiki supports metadata for this but a simple implementation is fine for now */}
    </div>
  )
}
