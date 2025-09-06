'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'
import { MDXRenderer } from './mdx-renderer-new'
import { createHighlighter } from 'shiki'

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

let highlighter: any = null

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['javascript', 'typescript', 'jsx', 'tsx', 'python', 'java', 'sql', 'html', 'css', 'json', 'yaml', 'bash', 'shell', 'markdown'],
    })
  }
  return highlighter
}

async function highlightCode(code: string, language: string = 'text'): Promise<string> {
  try {
    const hl = await getHighlighter()
    const supportedLangs = hl.getLoadedLanguages()
    const lang = supportedLangs.includes(language) ? language : 'text'
    
    const html = hl.codeToHtml(code, {
      lang: lang,
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false,
      transformers: [
        {
          pre(node) {
            this.addClassToHast(node, 'shiki-code-block')
            node.properties['data-language'] = lang
          }
        }
      ]
    })
    
    return html
  } catch (error) {
    return `<pre class="shiki-code-block" data-language="${language}"><code class="shiki-code">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`
  }
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
    placeholders.set(key, JSON.stringify({ lang: lang || 'text', code: code.trim() }))
    return key
  })

  for (const [key, value] of placeholders.entries()) {
    const { lang, code } = JSON.parse(value)
    let replacement = ''
    if (lang === 'mermaid') {
      mermaidCharts.push(code)
      // ИСПРАВЛЕНИЕ: Убираем лишнюю обертку. Оставляем только плейсхолдер.
      replacement = `<div class="mermaid-placeholder" data-chart-index="${chartIndex++}"></div>`
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
        onLoadingChangeRef.current?.(true)
        
        const response = await fetch(`/api/mdx/${sectionId}`)
        if (!response.ok) throw new Error(`Failed to load MDX: ${response.status}`)
        
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        
        const { html: htmlContent, mermaidCharts: charts } = await markdownToHtml(data.content)
        setContent(htmlContent)
        setMermaidCharts(charts)
        
        if (data.frontmatter) {
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