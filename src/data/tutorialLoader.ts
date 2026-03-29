// Imports the HTML file as a raw string via Vite's ?raw import
import rawHtml from './fastapi_complete_tutorial.html?raw'

export interface TutorialTopic {
  id: string
  title: string
  description: string
  content: string[]
  htmlContent: string
}

function parseTopicsFromHtml(html: string): TutorialTopic[] {
  // Extract the <script> block
  const scriptStart = html.indexOf('<script>')
  const scriptEnd = html.indexOf('</script>', scriptStart)
  if (scriptStart === -1 || scriptEnd === -1) return []

  const scriptBody = html.substring(scriptStart + 8, scriptEnd)

  // Extract just the topics array by finding where it starts and ends
  const arrStart = scriptBody.indexOf('const topics = [')
  if (arrStart === -1) return []

  // Use a balanced bracket finder on the substring starting from '['
  const fromBracket = scriptBody.indexOf('[', arrStart)
  let depth = 0
  let inStr = false
  let strChar = ''
  let arrEnd = -1

  for (let i = fromBracket; i < scriptBody.length; i++) {
    const ch = scriptBody[i]
    const prev = i > 0 ? scriptBody[i - 1] : ''

    if (!inStr) {
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = true
        strChar = ch
      } else if (ch === '[') {
        depth++
      } else if (ch === ']') {
        depth--
        if (depth === 0) {
          arrEnd = i
          break
        }
      }
    } else {
      // Inside a string — detect end of string (ignore escaped chars)
      if (ch === strChar && prev !== '\\') {
        inStr = false
      }
    }
  }

  if (arrEnd === -1) return []

  const arrayStr = scriptBody.substring(fromBracket, arrEnd + 1)

  // Evaluate the array safely using Function constructor
  try {
    // eslint-disable-next-line no-new-func
    const rawTopics: { title: string; content: string }[] = new Function(`return ${arrayStr}`)()

    return rawTopics.map((t) => {
      // Generate URL-safe ID from title
      let id = t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      // Remap "introduction" to match existing route
      if (id === 'introduction') id = 'fastapi-intro'

      // Extract first paragraph as description
      const pMatch = t.content.match(/<p[^>]*>([\s\S]*?)<\/p>/)
      let description = t.title
      if (pMatch) {
        description = pMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
        if (description.length > 120) description = description.substring(0, 117) + '...'
      }

      return {
        id,
        title: t.title,
        description,
        content: [],
        htmlContent: t.content,
      }
    })
  } catch {
    return []
  }
}

// Extract CSS from <style> block
function parseCssFromHtml(html: string): string {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  return styleMatch ? styleMatch[1] : ''
}

export const tutorialTopics: TutorialTopic[] = parseTopicsFromHtml(rawHtml)
export const tutorialCss: string = parseCssFromHtml(rawHtml)
