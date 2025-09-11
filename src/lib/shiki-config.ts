import { createHighlighter } from 'shiki'

let highlighter: any = null
let highlighterPromise: Promise<any> | null = null

export async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'json',
        'css',
        'html',
        'markdown',
        'bash',
        'python',
        'java',
        'cpp',
        'c',
        'csharp',
        'php',
        'ruby',
        'go',
        'rust',
        'swift',
        'kotlin',
        'scala',
        'sql',
        'yaml',
        'xml',
        'dockerfile',
        'shell',
        'powershell',
        'diff',
        'plaintext'
      ]
    }).then(h => {
      highlighter = h
      return h
    })
  }
  
  if (highlighter) {
    return highlighter
  }
  
  return highlighterPromise
}

export async function highlightCode(code: string, lang: string, theme: 'light' | 'dark' = 'light') {
  try {
    const highlighter = await getHighlighter()
    const themeName = theme === 'dark' ? 'github-dark' : 'github-light'
    
    return highlighter.codeToHtml(code, {
      lang,
      theme: themeName,
      transformers: [
        {
          name: 'add-classes',
          code(node: any) {
            node.properties.class = 'shiki-code'
          },
          pre(node: any) {
            node.properties.class = 'shiki-pre'
          }
        }
      ]
    })
  } catch (error) {
    console.error('Shiki error:', error)
    // Fallback to simple HTML
    return `<pre class="shiki-pre"><code class="shiki-code">${code}</code></pre>`
  }
}
