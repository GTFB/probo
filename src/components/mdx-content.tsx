'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'
import { MDXRenderer } from './mdx-renderer'
import { PasswordPrompt } from './password-prompt'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
  prevButtonText?: string
  ctaLink?: string
  ctaText?: string
  locked?: boolean
  password?: string
}

interface MDXContentProps {
  sectionId: string
  onFrontmatterChange?: (frontmatter: MDXFrontmatter) => void
  onTocChange?: (toc: Array<{ id: string; title: string; level: number }>) => void
  onH1Change?: (h1Title: string) => void
  onLoadingChange?: (loading: boolean) => void
}

function processInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline">$1</a>')
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border">$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-6 rounded-lg shadow-md max-w-full h-auto" />')
}


async function highlightCode(code: string, language: string = 'text'): Promise<string> {
  // Simple syntax highlighting without external dependencies
  const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return `<pre class="code-block" data-language="${language}"><code class="code">${escapedCode}</code></pre>`
}

function processList(listLines: string[]): string {
  if (listLines.length === 0) return ''
  let html = ''
  const stack: Array<{ type: 'ul' | 'ol'; indent: number }> = []
  let currentIndent = -1
  const getIndent = (line: string) => line.match(/^\s*/)?.[0].length || 0

  for (const line of listLines) {
    const indent = getIndent(line)
    const trimmedLine = line.trim()
    const isOrdered = /^\d+\./.test(trimmedLine)
    const listType = isOrdered ? 'ol' : 'ul'
    const content = processInlineMarkdown(trimmedLine.replace(/^(\*|-|\d+\.)\s*/, ''))

    if (indent > currentIndent) {
      stack.push({ type: listType, indent: indent })
      html += `<${listType}>`
    } else if (indent < currentIndent) {
      while (stack.length > 0 && stack[stack.length - 1].indent > indent) {
        const last = stack.pop()
        html += `</li></${last!.type}>`
      }
      html += '</li>'
    } else {
      html += '</li>'
    }
    html += `<li>${content}`
    currentIndent = indent
  }

  while (stack.length > 0) {
    const last = stack.pop()
    html += `</li></${last!.type}>`
  }
  return html
}

function processBlockquote(quoteLines: string[]): string {
  if (quoteLines.length === 0) return ''
  let html = '<blockquote>'
  let currentParagraph: string[] = []

  for (const line of quoteLines) {
    const content = line.trim().replace(/^>\s?/, '')
    if (line.trim() === '>') {
      if (currentParagraph.length > 0) {
        html += `<p>${processInlineMarkdown(currentParagraph.join(' '))}</p>`
        currentParagraph = []
      }
    } else {
      currentParagraph.push(content)
    }
  }

  if (currentParagraph.length > 0) {
    html += `<p>${processInlineMarkdown(currentParagraph.join(' '))}</p>`
  }

  html += '</blockquote>'
  return html
}

function processTable(tableLines: string[]): string {
  if (tableLines.length < 2) return tableLines.join('\n')

  const [headerLine, separatorLine, ...bodyLines] = tableLines
  const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean)
  const rows = bodyLines.map(rowLine => rowLine.split('|').map(c => c.trim()).filter(Boolean))
  
  // Determine alignment for each column
  const alignments: string[] = []
  if (separatorLine) {
    const separatorCells = separatorLine.split('|').map(c => c.trim()).filter(Boolean)
    separatorCells.forEach(cell => {
      if (cell.startsWith(':') && cell.endsWith(':')) {
        alignments.push('center')
      } else if (cell.endsWith(':')) {
        alignments.push('right')
      } else if (cell.startsWith(':')) {
        alignments.push('left')
      } else {
        alignments.push('left') // default
      }
    })
  } else {
    // If there's no separator line, align all columns to the left
    headers.forEach(() => alignments.push('left'))
  }

  let html = '<table><thead><tr>'
  headers.forEach((header, index) => {
    const alignment = alignments[index] || 'left'
    html += `<th style="text-align: ${alignment}">${processInlineMarkdown(header)}</th>`
  })
  html += '</tr></thead><tbody>'

  rows.forEach(row => {
    if (row.length === headers.length) {
      html += '<tr>'
      row.forEach((cell, index) => {
        const alignment = alignments[index] || 'left'
        html += `<td style="text-align: ${alignment}">${processInlineMarkdown(cell)}</td>`
      })
      html += '</tr>'
    }
  })

  html += '</tbody></table>'
  return html
}

// Interface for diagram settings
interface MermaidSettings {
  enableZoom?: boolean
  height?: string
  zoomMin?: number
  zoomMax?: number
  zoomInitial?: number
  tooltipText?: string
  disableTooltip?: boolean
}

// Function to extract settings from comments in diagram code
function extractMermaidSettings(code: string): MermaidSettings {
  const settings: MermaidSettings = {}
  
  // Look for comments with settings
  const lines = code.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Skip empty lines and comments without settings
    if (!trimmedLine || !trimmedLine.startsWith('%%')) continue
    
    // Extract settings from comments like %% zoom: true
    if (trimmedLine.includes('zoom:')) {
      const zoomMatch = trimmedLine.match(/zoom:\s*(true|false)/i)
      if (zoomMatch) {
        settings.enableZoom = zoomMatch[1].toLowerCase() === 'true'
      }
    }
    
    if (trimmedLine.includes('height:')) {
      const heightMatch = trimmedLine.match(/height:\s*([^\s]+)/i)
      if (heightMatch) {
        settings.height = heightMatch[1]
      }
    }
    
    if (trimmedLine.includes('zoom-min:')) {
      const zoomMinMatch = trimmedLine.match(/zoom-min:\s*([0-9.]+)/i)
      if (zoomMinMatch) {
        settings.zoomMin = parseFloat(zoomMinMatch[1])
      }
    }
    
    if (trimmedLine.includes('zoom-max:')) {
      const zoomMaxMatch = trimmedLine.match(/zoom-max:\s*([0-9.]+)/i)
      if (zoomMaxMatch) {
        settings.zoomMax = parseFloat(zoomMaxMatch[1])
      }
    }
    
    if (trimmedLine.includes('zoom-initial:')) {
      const zoomInitialMatch = trimmedLine.match(/zoom-initial:\s*([0-9.]+)/i)
      if (zoomInitialMatch) {
        settings.zoomInitial = parseFloat(zoomInitialMatch[1])
      }
    }
    
    if (trimmedLine.includes('tooltip:')) {
      const tooltipMatch = trimmedLine.match(/tooltip:\s*(.+)/i)
      if (tooltipMatch) {
        settings.tooltipText = tooltipMatch[1].trim()
      }
    }
    
    if (trimmedLine.includes('disable-tooltip:')) {
      const disableTooltipMatch = trimmedLine.match(/disable-tooltip:\s*(true|false)/i)
      if (disableTooltipMatch) {
        settings.disableTooltip = disableTooltipMatch[1].toLowerCase() === 'true'
      }
    }
  }
  
  return settings
}

async function processMarkdownContent(markdown: string): Promise<{ content: string; mermaidCharts: string[] }> {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')

  const mermaidCharts: string[] = []
  
  // Extract Mermaid diagrams
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g
  cleanContent.replace(mermaidRegex, (match, code) => {
    const cleanCode = code.replace(/^%% .*$/gm, '').trim()
    mermaidCharts.push(cleanCode)
    return match // Return original match to not change content
  })

  return { content: cleanContent, mermaidCharts }
}

function extractToc(markdown: string): Array<{ id: string; title: string; level: number }> {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const lines = contentWithoutFrontmatter.replace(/\r/g, '').split('\n')
  const toc: Array<{ id: string; title: string; level: number }> = []

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('#')) {
      const level = trimmedLine.match(/^#+/)?.[0].length || 0
      if (level > 0 && level <= 6) {
        const title = trimmedLine.substring(level).trim().replace(/\*\*/g, '')
        const id = `h${level}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
        toc.push({ id, title, level })
      }
    }
  })
  return toc
}

function extractH1Title(markdown: string): string | null {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const lines = contentWithoutFrontmatter.replace(/\r/g, '').split('\n')
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('# ')) {
      return trimmedLine.substring(2).replace(/\*\*/g, '')
    }
  }
  return null
}

export function MDXContent({ sectionId, onFrontmatterChange, onTocChange, onH1Change, onLoadingChange }: MDXContentProps) {
  const [content, setContent] = useState<string>('')
  const [mermaidCharts, setMermaidCharts] = useState<string[]>([])
  const [contentCache, setContentCache] = useState<Record<string, { content: string; mermaidCharts: string[]; frontmatter?: any; toc?: any; h1Title?: string }>>({})
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState<boolean>(true)
  const onFrontmatterChangeRef = useRef(onFrontmatterChange)
  const onTocChangeRef = useRef(onTocChange)
  const onH1ChangeRef = useRef(onH1Change)
  const onLoadingChangeRef = useRef(onLoadingChange)

  useEffect(() => {
    onFrontmatterChangeRef.current = onFrontmatterChange
    onTocChangeRef.current = onTocChange
    onH1ChangeRef.current = onH1Change
    onLoadingChangeRef.current = onLoadingChange
  }, [onFrontmatterChange, onTocChange, onH1Change, onLoadingChange])

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth')
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      } finally {
        setIsCheckingAccess(false)
      }
    }
    
    checkAuth()
  }, [])

  useEffect(() => {
    const loadMDX = async () => {
      // Don't load content if we're still checking access
      if (isCheckingAccess) return
      
      try {
        // Check cache
        if (contentCache[sectionId]) {
          const cached = contentCache[sectionId]
          
          // Check if content is locked and user is not authenticated
          if (cached.frontmatter?.locked && !isAuthenticated) {
            setIsLocked(true)
            return
          }
          
          setContent(cached.content)
          setMermaidCharts(cached.mermaidCharts)
          
          if (cached.frontmatter) {
            onFrontmatterChangeRef.current?.(cached.frontmatter)
          }
          if (cached.toc) {
            onTocChangeRef.current?.(cached.toc)
          }
          if (cached.h1Title) {
            onH1ChangeRef.current?.(cached.h1Title)
          }
          return
        }

        onLoadingChangeRef.current?.(true)
        
        const response = await fetch(`/api/mdx/${sectionId}`)
        if (!response.ok) {
          const errorText = await response.text()
          console.error(`API Error ${response.status}:`, errorText)
          throw new Error(`Failed to load MDX: ${response.status} - ${errorText}`)
        }
        
        const data = await response.json()
        if (data.error) {
          console.error('API returned error:', data.error)
          throw new Error(data.error)
        }
        
        // Check if content is locked and user is not authenticated
        if (data.frontmatter?.locked && !isAuthenticated) {
          setIsLocked(true)
          return
        }
        
        const { content: markdownContent, mermaidCharts: charts } = await processMarkdownContent(data.content)
        
        const toc = extractToc(data.content)
        const h1Title = extractH1Title(data.content)
        
        // Save to cache
        const cacheData = {
          content: markdownContent,
          mermaidCharts: charts,
          frontmatter: data.frontmatter,
          toc,
          h1Title: h1Title || undefined
        }
        
        setContentCache(prev => ({ ...prev, [sectionId]: cacheData }))
        setContent(markdownContent)
        setMermaidCharts(charts)
        
        if (data.frontmatter) {
          onFrontmatterChangeRef.current?.(data.frontmatter)
        }
        
        if (toc) {
          onTocChangeRef.current?.(toc)
        }
        
        if (h1Title) {
          onH1ChangeRef.current?.(h1Title)
        }
        
      } catch (error) {
        console.error('Error loading MDX:', error)
        setContent(`<h1>Error loading content for section ${sectionId}</h1>`)
      } finally {
        onLoadingChangeRef.current?.(false)
      }
    }

    loadMDX()
  }, [sectionId, isAuthenticated, isCheckingAccess])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setIsLocked(false)
  }

  // Show loading while checking access
  if (isCheckingAccess) {
    return (
      <MDXLayout>
        <div className="mt-8 flex items-center justify-center">
          <div className="text-muted-foreground">Checking access...</div>
        </div>
      </MDXLayout>
    )
  }

  // Show password prompt if content is locked and user is not authenticated
  if (isLocked && !isAuthenticated) {
    return <PasswordPrompt sectionId={sectionId} onSuccess={handleAuthSuccess} />
  }

  return (
    <MDXLayout>
      <div className="mt-8">
        <MDXRenderer markdownContent={content} mermaidCharts={mermaidCharts} />
      </div>
    </MDXLayout>
  )
}