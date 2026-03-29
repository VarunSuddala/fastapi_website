import { useEffect, useRef } from 'react'
import { tutorialCss } from '../data/tutorialLoader'

interface TutorialContentProps {
  htmlContent: string
  className?: string
}

/**
 * Renders HTML content from the tutorial file inside a scoped container.
 * The tutorial's own CSS is injected as a <style> scoped to this wrapper
 * so it doesn't bleed into the rest of the app.
 */
export function TutorialContent({ htmlContent, className = '' }: TutorialContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Activate copy-to-clipboard for code blocks after render
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const copyButtons = container.querySelectorAll<HTMLButtonElement>('.copy-btn')
    copyButtons.forEach((btn) => {
      // Remove any pre-existing onclick (set as HTML attribute)
      btn.removeAttribute('onclick')
      btn.addEventListener('click', () => {
        const pre = btn.closest('.code-block')?.querySelector('pre')
        if (!pre) return
        navigator.clipboard.writeText(pre.innerText).then(() => {
          btn.textContent = 'Copied!'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.textContent = 'Copy'
            btn.classList.remove('copied')
          }, 2000)
        })
      })
    })
  }, [htmlContent])

  return (
    <div ref={containerRef} className={`tutorial-scope ${className}`}>
      {/* Scoped styles — prefixed so they only affect .tutorial-scope children */}
      <style>{scopeStyles(tutorialCss, '.tutorial-scope')}</style>
      {/* The actual tutorial HTML content */}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

/**
 * Prefix every CSS rule with a scope selector so the tutorial styles
 * don't conflict with Tailwind or the app's own styles.
 */
function scopeStyles(css: string, scope: string): string {
  // Remove @import rules (fonts already loaded globally)
  let scoped = css.replace(/@import[^;]+;/g, '')

  // Add scope prefix to each rule block
  // Simple approach: prefix selectors that aren't @-rules
  scoped = scoped.replace(
    /([^{}@]+)\{([^{}]*)\}/g,
    (match, selector, body) => {
      const trimmed = selector.trim()
      if (!trimmed || trimmed.startsWith('@')) return match

      // Split comma-separated selectors and prefix each
      const prefixed = trimmed
        .split(',')
        .map((s) => {
          const sel = s.trim()
          // Don't prefix :root, html, body — map them to the scope container
          if (sel === ':root' || sel === 'html') return scope
          if (sel === 'body') return scope
          if (sel === '*') return `${scope} *`
          // Already scoped
          if (sel.startsWith(scope)) return sel
          return `${scope} ${sel}`
        })
        .join(', ')

      return `${prefixed} { ${body} }`
    }
  )

  return scoped
}
