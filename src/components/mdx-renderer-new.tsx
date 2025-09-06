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

    // Set HTML content
    containerRef.current.innerHTML = htmlContent

    // Find all placeholders and replace them with Mermaid diagrams
    const placeholders = containerRef.current.querySelectorAll('.mermaid-placeholder')
    
    placeholders.forEach((placeholder) => {
      const chartIndex = parseInt(placeholder.getAttribute('data-chart-index') || '0')
      const chart = mermaidCharts[chartIndex]
      
      if (chart) {
        // Create container for diagram
        const diagramContainer = document.createElement('div')
        diagramContainer.className = 'mermaid-diagram-container'
        
        // Replace placeholder with container
        placeholder.parentNode?.replaceChild(diagramContainer, placeholder)
        
        // Render diagram
        const diagramElement = document.createElement('div')
        diagramElement.className = 'mermaid-chart'
        diagramContainer.appendChild(diagramElement)
        
        // Initialize Mermaid
        import('mermaid').then((mermaid) => {
          mermaid.default.initialize({
            startOnLoad: false,
            theme: 'default',
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

          // Clean and fix diagram - minimal processing
          const cleanChart = chart
            .replace(/<br\s*\/?>/gi, ' ') // Replace <br> with space
            .replace(/-->/g, '-->')
            .replace(/<--/g, '<--')
            // Process icon syntax for mindmap - ensure proper formatting
            .replace(/::icon\(fa fa-(\w+)\)/g, (match, iconName) => {
              return `::icon(fa fa-${iconName})`
            })
            // Clean up icon syntax spacing
            .replace(/\s+::icon/g, '\n      ::icon')
            // Only process Russian text that's not already quoted
            .replace(/\[([^\]]*[а-яё][^\]]*)\]/gi, (match, content) => {
              // Skip if already has quotes
              if (content.includes('"') || content.includes("'")) {
                return match
              }
              // Only quote if contains spaces or special characters
              if (content.includes(' ') || content.includes('-') || content.includes('(') || content.includes(')')) {
                return `["${content.trim()}"]`
              }
              return match
            })

          const renderId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          
          console.log('=== Mermaid Diagram Debug ===')
          console.log('Original:', chart)
          console.log('Cleaned:', cleanChart)
          console.log('Changes made:', chart !== cleanChart ? 'YES' : 'NO')
          console.log('=============================')
          
          mermaid.default.render(renderId, cleanChart).then(({ svg }) => {
            diagramElement.innerHTML = svg
            
            // Apply section-specific styling after rendering
            setTimeout(() => {
              const svgElement = diagramElement.querySelector('svg')
              if (svgElement) {
                console.log('Applying mindmap styling...')
                
                // Find all text elements and their parent groups
                const textElements = svgElement.querySelectorAll('text')
                textElements.forEach(textElement => {
                  const text = textElement.textContent || ''
                  console.log('Found text:', text)
                  
                  // Find the parent group that contains this text
                  let parentGroup = textElement.closest('g')
                  if (!parentGroup) {
                    parentGroup = textElement.parentElement
                  }
                  
                  if (parentGroup) {
                    // Find shapes in the same group
                    const shapes = parentGroup.querySelectorAll('rect, circle, ellipse, polygon, path')
                    
                    if (text.includes('Frontend')) {
                      console.log('Applying Frontend styling')
                      shapes.forEach(shape => {
                        shape.setAttribute('fill', '#eff6ff')
                        shape.setAttribute('stroke', '#2563eb')
                        shape.setAttribute('stroke-width', '2')
                      })
                    } else if (text.includes('Backend')) {
                      console.log('Applying Backend styling')
                      shapes.forEach(shape => {
                        shape.setAttribute('fill', '#fef2f2')
                        shape.setAttribute('stroke', '#dc2626')
                        shape.setAttribute('stroke-width', '2')
                      })
                    } else if (text.includes('Интеграции')) {
                      console.log('Applying Интеграции styling')
                      shapes.forEach(shape => {
                        shape.setAttribute('fill', '#f0fdf4')
                        shape.setAttribute('stroke', '#16a34a')
                        shape.setAttribute('stroke-width', '2')
                      })
                    } else if (text.includes('DevOps')) {
                      console.log('Applying DevOps styling')
                      shapes.forEach(shape => {
                        shape.setAttribute('fill', '#fffbeb')
                        shape.setAttribute('stroke', '#ca8a04')
                        shape.setAttribute('stroke-width', '2')
                      })
                    }
                  }
                })
              }
            }, 200)
          }).catch((error) => {
            console.error('Mermaid rendering error:', error)
            console.error('Original chart:', chart)
            console.error('Cleaned chart:', cleanChart)
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
