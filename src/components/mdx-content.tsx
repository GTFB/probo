'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'
import { MDXRenderer } from './mdx-renderer-new'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
  prevButtonText?: string
  ctaLink?: string
  ctaText?: string
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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
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
    const content = processInlineMarkdown(
      trimmedLine.replace(/^(\*|-|\d+\.)\s*/, '')
    )

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

function markdownToHtml(markdown: string): { html: string; mermaidCharts: string[] } {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')

  const mermaidCharts: string[] = []
  let chartIndex = 0

  let processedContent = cleanContent.replace(/```mermaid\s*\n([\s\S]*?)\n```/g, (match, chart) => {
    mermaidCharts.push(chart.trim())
    return `<div class="mermaid-placeholder" data-chart-index="${chartIndex++}"></div>`
  })

  const lines = processedContent.split('\n')
  const htmlLines: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    if (!trimmedLine) {
      i++
      continue
    }

    if (trimmedLine.startsWith('#')) {
      const level = trimmedLine.match(/^#+/)?.[0].length || 0
      if (level > 0 && level <= 6) {
        const title = trimmedLine.substring(level).trim().replace(/\*\*/g, '')
        const id = `h${level}-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
        htmlLines.push(`<h${level} id="${id}">${title}</h${level}>`)
        i++
        continue
      }
    }
    
    if (/^\s*-\s*\[[x\s]\]\s/.test(trimmedLine)) {
      const content = trimmedLine.replace(/^\s*-\s*\[[x\s]\]\s/, '')
      const isCompleted = trimmedLine.includes('[x]')
      const iconSvg = isCompleted
        ? '<svg class="task-icon completed-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>'
        : '<svg class="task-icon pending-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
      htmlLines.push(`<div class="task-item ${isCompleted ? 'completed' : 'pending'}">${iconSvg}<span class="task-text">${processInlineMarkdown(content)}</span></div>`)
      i++
      continue
    }

    if (/^\s*(\*|-|\d+\.)\s/.test(trimmedLine)) {
      const listBlock: string[] = []
      while (i < lines.length && (/^\s*(\*|-|\d+\.)\s/.test(lines[i].trim()) || (lines[i].trim() !== '' && /^\s+/.test(lines[i])))) {
        listBlock.push(lines[i])
        i++
      }
      htmlLines.push(processList(listBlock))
      continue
    }
    
    htmlLines.push(`<p>${processInlineMarkdown(trimmedLine)}</p>`)
    i++
  }

  return { html: htmlLines.join('\n'), mermaidCharts }
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
        const id = `h${level}-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
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
  const [frontmatter, setFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true)
        onLoadingChangeRef.current?.(true)
        setError(null)
        
        const response = await fetch(`/api/mdx/${sectionId}`)
        if (!response.ok) throw new Error(`Failed to load MDX: ${response.status}`)
        
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        
        const { html: htmlContent, mermaidCharts: charts } = markdownToHtml(data.content)
        setContent(htmlContent)
        setMermaidCharts(charts)
        
        if (data.frontmatter) {
          setFrontmatter(data.frontmatter)
          onFrontmatterChangeRef.current?.(data.frontmatter)
        }
        
        const toc = extractToc(data.content)
        onTocChangeRef.current?.(toc)
        
        const h1Title = extractH1Title(data.content)
        if (h1Title) {
          onH1ChangeRef.current?.(h1Title)
        }
        
      } catch (error) {
        console.error('Error loading MDX:', error)
        setError(error instanceof Error ? error.message : 'Failed to load content')
        setContent(`<h1>Ошибка загрузки контента для раздела ${sectionId}</h1>`)
      } finally {
        setLoading(false)
        onLoadingChangeRef.current?.(false)
      }
    }

    loadMDX()
  }, [sectionId])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Загрузка контента...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
        <h2 className="text-destructive font-semibold mb-2">Ошибка загрузки</h2>
        <p className="text-destructive/80">{error}</p>
      </div>
    )
  }

  return (
    <MDXLayout>
      <div className="mt-8">
        <MDXRenderer htmlContent={content} mermaidCharts={mermaidCharts} />
      </div>
    </MDXLayout>
  )
}