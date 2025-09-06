'use client'

import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import mermaid from 'mermaid'
import { InteractiveMermaid } from './interactive-mermaid'
import { shouldEnableZoom, getZoomSettings, defaultMermaidConfig } from '../lib/mermaid-config'
import { useWindowSize } from '../hooks/use-window-size'

interface MDXRendererProps {
  htmlContent: string
  mermaidCharts: string[]
}

export function MDXRenderer({ htmlContent, mermaidCharts }: MDXRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const mermaidRoots = useRef(new Map())
  const isInitialized = useRef(false)
  const windowSize = useWindowSize()

  useEffect(() => {
    // Инициализируем Mermaid только один раз
    if (!isInitialized.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'Inter, "Font Awesome 6 Free", sans-serif',
        flowchart: {
          htmlLabels: true,
          curve: 'basis'
        },
        mindmap: {
          htmlLabels: true
        }
      })
      isInitialized.current = true
    }

    const currentContentRef = contentRef.current
    if (!currentContentRef) return

    // Find all placeholders for diagrams
    const placeholders = currentContentRef.querySelectorAll('.mermaid-placeholder')

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      placeholders.forEach((placeholder) => {
        const chartIndex = parseInt(placeholder.getAttribute('data-chart-index') || '0', 10)
        const chart = mermaidCharts[chartIndex]
        const settingsData = placeholder.getAttribute('data-settings')
        const individualSettings = settingsData ? JSON.parse(settingsData) : {}
        
        if (chart) {
          // Проверяем, не был ли уже создан контейнер для этой диаграммы
          const existingContainer = placeholder.parentNode?.querySelector(`[data-mermaid-index="${chartIndex}"]`)
          if (existingContainer) {
            return // Диаграмма уже существует, пропускаем
          }

          // Create a new container for the interactive diagram
          const interactiveContainer = document.createElement('div')
          interactiveContainer.className = 'interactive-mermaid-container'
          interactiveContainer.setAttribute('data-mermaid-index', chartIndex.toString())
          
          // Применяем индивидуальные настройки высоты
          if (individualSettings.height) {
            interactiveContainer.style.height = individualSettings.height
          }
          
          // Replace placeholder with the new container
          placeholder.parentNode?.replaceChild(interactiveContainer, placeholder)
          
          // Use createRoot for rendering our React component in the new container
          if (!mermaidRoots.current.has(interactiveContainer)) {
            const root = createRoot(interactiveContainer)
            mermaidRoots.current.set(interactiveContainer, root)
            
            // Определяем, нужен ли зум для этой диаграммы
            // Приоритет: индивидуальные настройки > глобальные настройки
            const enableZoom = individualSettings.enableZoom !== undefined 
              ? individualSettings.enableZoom 
              : shouldEnableZoom(chart, chartIndex)
            
            root.render(<InteractiveMermaid 
              chart={chart} 
              id={`mermaid-${chartIndex}`} 
              enableZoom={enableZoom}
              settings={individualSettings}
            />)
          }
        }
      })
    }, 100)

    // Cleanup function that unmounts all React components
    return () => {
      // Use setTimeout to avoid unmounting during render
      setTimeout(() => {
        mermaidRoots.current.forEach((root) => {
          try {
            root.unmount()
          } catch (error) {
            console.warn('Error unmounting root:', error)
          }
        })
        mermaidRoots.current.clear()
      }, 0)
    }
  }, [htmlContent, mermaidCharts])

  return (
    <div
      ref={contentRef}
      className="mdx-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
