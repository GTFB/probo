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
}

export function MDXContent({ sectionId, onFrontmatterChange }: MDXContentProps) {
  const [content, setContent] = useState<string>('')
  const [frontmatter, setFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [loading, setLoading] = useState(true)
  const onFrontmatterChangeRef = useRef(onFrontmatterChange)

  // Обновляем ref при изменении callback
  useEffect(() => {
    onFrontmatterChangeRef.current = onFrontmatterChange
  }, [onFrontmatterChange])

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/mdx/${sectionId}`)
        if (response.ok) {
          const data = await response.json()
          setContent(data.content)
          setFrontmatter(data.frontmatter)
          onFrontmatterChangeRef.current?.(data.frontmatter)
        } else {
          setContent(`# Ошибка загрузки контента для раздела ${sectionId}`)
        }
      } catch (error) {
        setContent(`# Ошибка загрузки контента для раздела ${sectionId}`)
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

  return (
    <MDXLayout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MDXLayout>
  )
}
