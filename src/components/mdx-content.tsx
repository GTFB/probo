'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'

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
}

// Простая функция для конвертации Markdown в HTML
function markdownToHtml(markdown: string): string {
  // Сначала удаляем frontmatter из начала файла
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  
  // Удаляем все \r символы
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  let html = cleanContent
    // Заголовки с ID
    .replace(/^### (.*$)/gim, (match, title) => {
      const id = `h3-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      return `<h3 id="${id}">${title}</h3>`
    })
    .replace(/^## (.*$)/gim, (match, title) => {
      const id = `h2-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      return `<h2 id="${id}">${title}</h2>`
    })
    .replace(/^# (.*$)/gim, (match, title) => {
      const id = `h1-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      return `<h1 id="${id}">${title}</h1>`
    })
    // Жирный текст
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Списки
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Параграфы (группируем строки, которые не являются заголовками или списками)
    .replace(/^(?!<[h|u|d])(.*$)/gim, '<p>$1</p>')
    // Убираем лишние <p> теги внутри других элементов
    .replace(/<p><(h[1-6]|ul|li|div)>/g, '<$1>')
    .replace(/<\/(h[1-6]|ul|li|div)><\/p>/g, '</$1>')
    // Ссылки
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Убираем лишние пустые параграфы
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
  
  return html
}

// Функция для извлечения оглавления из Markdown
function extractToc(markdown: string): Array<{ id: string; title: string; level: number }> {
  // Сначала удаляем frontmatter
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  
  // Удаляем все \r символы
  const cleanContent = contentWithoutFrontmatter.replace(/\r/g, '')
  
  const lines = cleanContent.split('\n')
  const toc: Array<{ id: string; title: string; level: number }> = []
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    
    if (trimmedLine.startsWith('# ')) {
      const title = trimmedLine.substring(2)
      const id = `h1-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      toc.push({
        id,
        title,
        level: 1
      })
    } else if (trimmedLine.startsWith('## ')) {
      const title = trimmedLine.substring(3)
      const id = `h2-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      toc.push({
        id,
        title,
        level: 2
      })
    } else if (trimmedLine.startsWith('### ')) {
      const title = trimmedLine.substring(4)
      const id = `h3-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      toc.push({
        id,
        title,
        level: 3
      })
    }
  })
  
  return toc
}

export function MDXContent({ sectionId, onFrontmatterChange, onTocChange }: MDXContentProps) {
  const [content, setContent] = useState<string>('')
  const [frontmatter, setFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const onFrontmatterChangeRef = useRef(onFrontmatterChange)
  const onTocChangeRef = useRef(onTocChange)

  // Обновляем ref при изменении callback
  useEffect(() => {
    onFrontmatterChangeRef.current = onFrontmatterChange
    onTocChangeRef.current = onTocChange
  }, [onFrontmatterChange, onTocChange])

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true)
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
        const htmlContent = markdownToHtml(data.content)
        setContent(htmlContent)
        
        // Устанавливаем frontmatter
        if (data.frontmatter) {
          setFrontmatter(data.frontmatter)
          onFrontmatterChangeRef.current?.(data.frontmatter)
        }
        
        // Извлекаем оглавление
        const toc = extractToc(data.content)
        onTocChangeRef.current?.(toc)
        
      } catch (error) {
        console.error('Error loading MDX:', error)
        setError(error instanceof Error ? error.message : 'Failed to load content')
        setContent(`<h1>Ошибка загрузки контента для раздела ${sectionId}</h1>`)
      } finally {
        setLoading(false)
      }
    }

    loadMDX()
  }, [sectionId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MDXLayout>
  )
}
