'use client'

import { useState, useEffect } from 'react'
import { MDXLayout } from './mdx-layout'

interface MDXContentProps {
  sectionId: string
}

export function MDXContent({ sectionId }: MDXContentProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/mdx/${sectionId}`)
        if (response.ok) {
          const data = await response.json()
          setContent(data.content)
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
