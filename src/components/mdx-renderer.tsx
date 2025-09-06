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

    // Create temporary container for HTML processing
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent

    // Find all placeholders for Mermaid diagrams
    const mermaidPlaceholders = tempDiv.querySelectorAll('[data-mermaid-chart]')
    
    // Replace placeholders with special markers
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
