'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'
import { MermaidDiagram } from './mermaid-diagram'
import { MDXRenderer } from './mdx-renderer'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
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

// Simple function to convert Markdown to HTML with Mermaid support
function markdownToHtml(markdown: string): { html: string; mermaidCharts: string[] } {
  // First remove frontmatter from beginning of file
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  
  // Remove all \r characters
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  const mermaidCharts: string[] = []
  let chartIndex = 0
  
  // Process Mermaid diagrams
  let processedContent = cleanContent.replace(/```mermaid\s*\n([\s\S]*?)\n```/g, (match, chart) => {
    const chartId = `mermaid-chart-${chartIndex++}`
    mermaidCharts.push(chart.trim())
    return `<div data-mermaid-chart="${chartId}" data-chart-index="${chartIndex - 1}"></div>`
  })
  
  let html = processedContent
    // Headers with ID
    .replace(/^### (.*$)/gim, (match, title) => {
      const id = `h3-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      return `<h3 id="${id}">${title}</h3>`
    })
    .replace(/^## (.*$)/gim, (match, title) => {
      const id = `h2-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      return `<h2 id="${id}">${title}</h2>`
    })
    .replace(/^# (.*$)/gim, (match, title) => {
      const id = `h1-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      return `<h1 id="${id}">${title}</h1>`
    })
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Lists - improved processing
    .replace(/^(\s*)\* (.*$)/gim, '<li>$2</li>')
    .replace(/^(\s*)\d+\. (.*$)/gim, '<li>$2</li>')
    // Group adjacent li into ul
    .replace(/(<li>.*<\/li>)(\s*<li>.*<\/li>)*/gs, (match) => {
      return `<ul>${match}</ul>`
    })
    // Paragraphs (group lines that are not headers or lists)
    .replace(/^(?!<[h|u|d])(.*$)/gim, '<p>$1</p>')
    // Remove extra <p> tags inside other elements
    .replace(/<p><(h[1-6]|ul|li|div)>/g, '<$1>')
    .replace(/<\/(h[1-6]|ul|li|div)><\/p>/g, '</$1>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Remove extra empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    // Remove empty paragraphs inside lists
    .replace(/<ul>\s*<p>\s*<\/p>\s*<\/ul>/g, '')
    .replace(/<li><p>\s*<\/p><\/li>/g, '')
  
  return { html, mermaidCharts }
}

// Function to extract table of contents from Markdown
function extractToc(markdown: string): Array<{ id: string; title: string; level: number }> {
  // First remove frontmatter
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  
  // Remove all \r characters
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  const lines = cleanContent.split('\n')
  const toc: Array<{ id: string; title: string; level: number }> = []
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    
    if (trimmedLine.startsWith('# ')) {
      const title = trimmedLine.substring(2)
      const id = `h1-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({
        id,
        title,
        level: 1
      })
    } else if (trimmedLine.startsWith('## ')) {
      const title = trimmedLine.substring(3)
      const id = `h2-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({
        id,
        title,
        level: 2
      })
    } else if (trimmedLine.startsWith('### ')) {
      const title = trimmedLine.substring(4)
      const id = `h3-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({
        id,
        title,
        level: 3
      })
    }
  })
  
  return toc
}

// Function to extract H1 header
function extractH1Title(markdown: string): string | null {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  const lines = cleanContent.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('# ')) {
      return trimmedLine.substring(2)
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

  // Update ref when callback changes
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
        
        if (!response.ok) {
          throw new Error(`Failed to load MDX: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        // Convert Markdown to HTML
        const { html: htmlContent, mermaidCharts: charts } = markdownToHtml(data.content)
        setContent(htmlContent)
        setMermaidCharts(charts)
        
        // Set frontmatter
        if (data.frontmatter) {
          setFrontmatter(data.frontmatter)
          onFrontmatterChangeRef.current?.(data.frontmatter)
        }
        
        // Extract table of contents
        const toc = extractToc(data.content)
        console.log('Generated TOC:', toc)
        console.log('Generated HTML:', htmlContent)
        onTocChangeRef.current?.(toc)
        
        // Extract H1 header
        const h1Title = extractH1Title(data.content)
        if (h1Title) {
          onH1ChangeRef.current?.(h1Title)
        }
        
        onLoadingChangeRef.current?.(false)
        
      } catch (error) {
        console.error('Error loading MDX:', error)
        setError(error instanceof Error ? error.message : 'Failed to load content')
        setContent(`<h1>Error loading content for section ${sectionId}</h1>`)
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
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
        <h2 className="text-destructive font-semibold mb-2">Loading Error</h2>
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
