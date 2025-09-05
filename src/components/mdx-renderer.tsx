'use client'

import { useEffect, useRef, useState } from 'react'
import { MermaidDiagram } from './mermaid-diagram'

interface MDXRendererProps {
  htmlContent: string
  mermaidCharts: string[]
}

export function MDXRenderer({ htmlContent, mermaidCharts }: MDXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [processedContent, setProcessedContent] = useState<string>('')

  useEffect(() => {
    if (!htmlContent) return

    // Создаем временный контейнер для обработки HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent

    // Находим все плейсхолдеры для Mermaid диаграмм
    const mermaidPlaceholders = tempDiv.querySelectorAll('[data-mermaid-chart]')
    
    // Заменяем плейсхолдеры на специальные маркеры
    mermaidPlaceholders.forEach((placeholder, index) => {
      const marker = document.createElement('div')
      marker.className = 'mermaid-placeholder'
      marker.setAttribute('data-chart-index', index.toString())
      marker.innerHTML = `🔄 Загрузка диаграммы ${index + 1}...`
      placeholder.parentNode?.replaceChild(marker, placeholder)
    })

    setProcessedContent(tempDiv.innerHTML)
  }, [htmlContent])

  return (
    <div ref={containerRef} className="mdx-content">
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      {mermaidCharts.map((chart, index) => (
        <MermaidDiagram key={`chart-${index}`} chart={chart} />
      ))}
    </div>
  )
}
