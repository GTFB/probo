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
  
  return contentWithoutFrontmatter
    // Заголовки
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
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
}

// Функция для извлечения оглавления из Markdown
function extractToc(markdown: string): Array<{ id: string; title: string; level: number }> {
  // Сначала удаляем frontmatter
  const contentWithoutFrontmatter = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const lines = contentWithoutFrontmatter.split('\n')
  const toc: Array<{ id: string; title: string; level: number }> = []
  
  lines.forEach((line) => {
    const h1Match = line.match(/^# (.*)$/)
    const h2Match = line.match(/^## (.*)$/)
    const h3Match = line.match(/^### (.*)$/)
    
    if (h1Match) {
      toc.push({
        id: h1Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: h1Match[1],
        level: 1
      })
    } else if (h2Match) {
      toc.push({
        id: h2Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: h2Match[1],
        level: 2
      })
    } else if (h3Match) {
      toc.push({
        id: h3Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: h3Match[1],
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
