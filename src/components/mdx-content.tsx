'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'
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

function processInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}


async function highlightCode(code: string, language: string = 'text'): Promise<string> {
  // Простая подсветка синтаксиса без внешних зависимостей
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

  const [headerLine, ...bodyLines] = tableLines
  const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean)
  const rows = bodyLines.map(rowLine => rowLine.split('|').map(c => c.trim()).filter(Boolean))

  let html = '<table><thead><tr>'
  headers.forEach(header => {
    html += `<th>${processInlineMarkdown(header)}</th>`
  })
  html += '</tr></thead><tbody>'

  rows.forEach(row => {
    if (row.length === headers.length) {
      html += '<tr>'
      row.forEach(cell => {
        html += `<td>${processInlineMarkdown(cell)}</td>`
      })
      html += '</tr>'
    }
  })

  html += '</tbody></table>'
  return html
}

// Интерфейс для настроек диаграммы
interface MermaidSettings {
  enableZoom?: boolean
  height?: string
  zoomMin?: number
  zoomMax?: number
  zoomInitial?: number
  tooltipText?: string
  disableTooltip?: boolean
}

// Функция для извлечения настроек из комментариев в коде диаграммы
function extractMermaidSettings(code: string): MermaidSettings {
  const settings: MermaidSettings = {}
  
  // Ищем комментарии с настройками
  const lines = code.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Пропускаем пустые строки и комментарии без настроек
    if (!trimmedLine || !trimmedLine.startsWith('%%')) continue
    
    // Извлекаем настройки из комментариев вида %% zoom: true
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

async function markdownToHtml(markdown: string): Promise<{ html: string; mermaidCharts: string[] }> {
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')

  const mermaidCharts: string[] = []
  let chartIndex = 0

  const codeBlockRegex = /```(\w+)?\s*\n([\s\S]*?)\n```/g
  const placeholders = new Map<string, string>()
  let placeholderId = 0

  let processedContent = cleanContent.replace(codeBlockRegex, (match, lang, code) => {
    const key = `__CODE_BLOCK_${placeholderId++}__`
    
    // Извлекаем настройки из комментариев перед диаграммой
    const settings = extractMermaidSettings(code)
    
    placeholders.set(key, JSON.stringify({ 
      lang: lang || 'text', 
      code: code.trim(),
      settings: settings
    }))
    return key
  })

  for (const [key, value] of placeholders.entries()) {
    const { lang, code, settings } = JSON.parse(value)
    let replacement = ''
    if (lang === 'mermaid') {
      // Удаляем комментарии Mermaid перед сохранением
      const cleanCode = code.replace(/^%% .*$/gm, '').trim()
      mermaidCharts.push(cleanCode)
      // ИСПРАВЛЕНИЕ: Убираем лишнюю обертку. Оставляем только плейсхолдер.
      replacement = `<div class="mermaid-placeholder" data-chart-index="${chartIndex}" data-settings='${JSON.stringify(settings || {})}'></div>`
      chartIndex++
    } else {
      replacement = await highlightCode(code, lang)
    }
    processedContent = processedContent.replace(key, replacement)
  }

  const lines = processedContent.split('\n')
  const htmlLines: string[] = []
  let i = 0

  const isTableLine = (line: string) => line.trim().includes('|')
  const isTableSeparator = (line: string) => /^\s*\|?(\s*:?-+:?\s*\|)+/.test(line)

  while (i < lines.length) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // Эта проверка нужна, чтобы не оборачивать уже готовый HTML от Shiki или Mermaid в тег <p>
    if (trimmedLine.startsWith('<div') || trimmedLine.startsWith('<pre')) {
      htmlLines.push(line)
      i++
      continue
    }

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
    
    if (isTableLine(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const tableBlock: string[] = [line]
      i += 2 // Пропускаем заголовок и разделитель
      while (i < lines.length && isTableLine(lines[i])) {
        tableBlock.push(lines[i])
        i++
      }
      htmlLines.push(processTable(tableBlock))
      continue
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

    if (trimmedLine.startsWith('>')) {
      const quoteBlock: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteBlock.push(lines[i])
        i++
      }
      htmlLines.push(processBlockquote(quoteBlock))
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
  const [contentCache, setContentCache] = useState<Record<string, { content: string; mermaidCharts: string[]; frontmatter?: any; toc?: any; h1Title?: string }>>({})
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
        // Проверяем кэш
        if (contentCache[sectionId]) {
          const cached = contentCache[sectionId]
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
        if (!response.ok) throw new Error(`Failed to load MDX: ${response.status}`)
        
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        
        const { html: htmlContent, mermaidCharts: charts } = await markdownToHtml(data.content)
        
        const toc = extractToc(data.content)
        const h1Title = extractH1Title(data.content)
        
        // Сохраняем в кэш
        const cacheData = {
          content: htmlContent,
          mermaidCharts: charts,
          frontmatter: data.frontmatter,
          toc,
          h1Title: h1Title || undefined
        }
        
        setContentCache(prev => ({ ...prev, [sectionId]: cacheData }))
        setContent(htmlContent)
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
        setContent(`<h1>Ошибка загрузки контента для раздела ${sectionId}</h1>`)
      } finally {
        onLoadingChangeRef.current?.(false)
      }
    }

    loadMDX()
  }, [sectionId])

  return (
    <MDXLayout>
      <div className="mt-8">
        <MDXRenderer htmlContent={content} mermaidCharts={mermaidCharts} />
      </div>
    </MDXLayout>
  )
}