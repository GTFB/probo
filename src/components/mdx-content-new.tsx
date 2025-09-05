'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'
import { MermaidDiagram } from './mermaid-diagram'
import { MDXRenderer } from './mdx-renderer'

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

// Улучшенная функция для конвертации Markdown в HTML с поддержкой Mermaid
function markdownToHtml(markdown: string): { html: string; mermaidCharts: string[] } {
  // Удаляем frontmatter
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  const mermaidCharts: string[] = []
  let chartIndex = 0
  
  // Обрабатываем Mermaid диаграммы
  let processedContent = cleanContent.replace(/```mermaid\s*\n([\s\S]*?)\n```/g, (match, chart) => {
    const chartId = `mermaid-chart-${chartIndex++}`
    mermaidCharts.push(chart.trim())
    return `<div data-mermaid-chart="${chartId}" data-chart-index="${chartIndex - 1}"></div>`
  })
  
  // Разбиваем на строки для обработки
  const lines = processedContent.split('\n')
  const htmlLines: string[] = []
  let inList = false
  let listItems: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line) {
      // Пустая строка - закрываем список если он открыт
      if (inList && listItems.length > 0) {
        htmlLines.push(`<ul>${listItems.join('')}</ul>`)
        listItems = []
        inList = false
      }
      htmlLines.push('')
      continue
    }
    
    // Заголовки
    if (line.startsWith('#### ')) {
      const title = line.substring(5)
      const id = `h4-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      htmlLines.push(`<h4 id="${id}">${title}</h4>`)
    } else if (line.startsWith('### ')) {
      const title = line.substring(4)
      const id = `h3-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      htmlLines.push(`<h3 id="${id}">${title}</h3>`)
    } else if (line.startsWith('## ')) {
      const title = line.substring(3)
      const id = `h2-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      htmlLines.push(`<h2 id="${id}">${title}</h2>`)
    } else if (line.startsWith('# ')) {
      const title = line.substring(2)
      const id = `h1-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      htmlLines.push(`<h1 id="${id}">${title}</h1>`)
    }
    // Списки
    else if (line.startsWith('* ') || line.startsWith('- ')) {
      const content = line.substring(2)
      listItems.push(`<li>${processInlineMarkdown(content)}</li>`)
      inList = true
    } else if (/^\d+\. /.test(line)) {
      const content = line.replace(/^\d+\. /, '')
      listItems.push(`<li>${processInlineMarkdown(content)}</li>`)
      inList = true
    }
    // Обычный текст
    else {
      // Закрываем список если он открыт
      if (inList && listItems.length > 0) {
        htmlLines.push(`<ul>${listItems.join('')}</ul>`)
        listItems = []
        inList = false
      }
      
      // Обрабатываем как параграф
      htmlLines.push(`<p>${processInlineMarkdown(line)}</p>`)
    }
  }
  
  // Закрываем список если он остался открытым
  if (inList && listItems.length > 0) {
    htmlLines.push(`<ul>${listItems.join('')}</ul>`)
  }
  
  const html = htmlLines.join('\n')
  return { html, mermaidCharts }
}

// Функция для обработки inline Markdown
function processInlineMarkdown(text: string): string {
  return text
    // Жирный текст
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Курсив
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Ссылки
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Код
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

// Функция для извлечения оглавления из Markdown
function extractToc(markdown: string): Array<{ id: string; title: string; level: number }> {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  const lines = cleanContent.split('\n')
  const toc: Array<{ id: string; title: string; level: number }> = []
  
  lines.forEach((line) => {
    const trimmedLine = line.trim()
    
    if (trimmedLine.startsWith('# ')) {
      const title = trimmedLine.substring(2)
      const id = `h1-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({ id, title, level: 1 })
    } else if (trimmedLine.startsWith('## ')) {
      const title = trimmedLine.substring(3)
      const id = `h2-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({ id, title, level: 2 })
    } else if (trimmedLine.startsWith('### ')) {
      const title = trimmedLine.substring(4)
      const id = `h3-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({ id, title, level: 3 })
    } else if (trimmedLine.startsWith('#### ')) {
      const title = trimmedLine.substring(5)
      const id = `h4-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
      toc.push({ id, title, level: 4 })
    }
  })
  
  return toc
}

// Функция для извлечения H1 заголовка
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

  // Обновляем ref при изменении callback
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
        
        // Конвертируем Markdown в HTML
        const { html: htmlContent, mermaidCharts: charts } = markdownToHtml(data.content)
        setContent(htmlContent)
        setMermaidCharts(charts)
        
        // Устанавливаем frontmatter
        if (data.frontmatter) {
          setFrontmatter(data.frontmatter)
          onFrontmatterChangeRef.current?.(data.frontmatter)
        }
        
        // Извлекаем оглавление
        const toc = extractToc(data.content)
        console.log('Generated TOC:', toc)
        console.log('Generated HTML:', htmlContent)
        onTocChangeRef.current?.(toc)
        
        // Извлекаем H1 заголовок
        const h1Title = extractH1Title(data.content)
        if (h1Title) {
          onH1ChangeRef.current?.(h1Title)
        }
        
        onLoadingChangeRef.current?.(false)
        
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
