'use client'

import { useEffect, useRef } from 'react'
import { MermaidDiagram } from './mermaid-diagram'

interface MDXRendererProps {
  htmlContent: string
  mermaidCharts: string[]
}

export function MDXRenderer({ htmlContent, mermaidCharts }: MDXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !htmlContent) return

    // Устанавливаем HTML контент
    containerRef.current.innerHTML = htmlContent

    // Находим все плейсхолдеры и заменяем их на Mermaid диаграммы
    const placeholders = containerRef.current.querySelectorAll('.mermaid-placeholder')
    
    placeholders.forEach((placeholder) => {
      const chartIndex = parseInt(placeholder.getAttribute('data-chart-index') || '0')
      const chart = mermaidCharts[chartIndex]
      
      if (chart) {
        // Создаем контейнер для диаграммы
        const diagramContainer = document.createElement('div')
        diagramContainer.className = 'mermaid-diagram-container'
        
        // Заменяем плейсхолдер на контейнер
        placeholder.parentNode?.replaceChild(diagramContainer, placeholder)
        
        // Рендерим диаграмму
        const diagramElement = document.createElement('div')
        diagramElement.className = 'mermaid-chart'
        diagramContainer.appendChild(diagramElement)
        
        // Инициализируем Mermaid
        import('mermaid').then((mermaid) => {
          mermaid.default.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
            flowchart: {
              htmlLabels: true,
              curve: 'basis'
            }
          })

          // Очищаем и исправляем диаграмму
          const cleanChart = chart
            .replace(/[^\x00-\x7F]/g, (char) => {
              const replacements: { [key: string]: string } = {
                '\u2014': '-',  // em dash
                '\u201C': '"',  // left double quotation mark
                '\u201D': '"',  // right double quotation mark
                '\u2018': "'",  // left single quotation mark
                '\u2019': "'",  // right single quotation mark
                '\u2026': '...', // horizontal ellipsis
                '\u2013': '-'   // en dash
              }
              return replacements[char] || char
            })
            .replace(/<br\s*\/?>/gi, ' ') // Заменяем <br> на пробел
            .replace(/\[([^\]]*[^\x00-\x7F][^\]]*)\]/g, (match, content) => {
              return `['${content.trim()}']`
            })

          const renderId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          
          mermaid.default.render(renderId, cleanChart).then(({ svg }) => {
            diagramElement.innerHTML = svg
          }).catch((error) => {
            console.error('Mermaid rendering error:', error)
            diagramElement.innerHTML = `
              <div class="text-red-500 p-4 border border-red-200 rounded bg-red-50 dark:bg-red-900/20">
                <div class="font-semibold mb-2">Ошибка отображения диаграммы</div>
                <div class="text-sm mb-2">${error.message}</div>
                <details class="text-xs">
                  <summary class="cursor-pointer text-blue-600 hover:text-blue-800">Показать исходный код</summary>
                  <pre class="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">${chart}</pre>
                </details>
              </div>
            `
          })
        }).catch((error) => {
          console.error('Failed to load mermaid:', error)
          diagramElement.innerHTML = `
            <div class="text-red-500 p-4 border border-red-200 rounded">
              Ошибка загрузки Mermaid: ${error.message}
            </div>
          `
        })
      }
    })
  }, [htmlContent, mermaidCharts])

  return (
    <div ref={containerRef} className="mdx-content" />
  )
}
