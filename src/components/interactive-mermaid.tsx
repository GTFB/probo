'use client'

import React, { useRef, useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import mermaid from 'mermaid'
import { Plus, Minus, Maximize, Info } from 'lucide-react'
import { getZoomSettings, defaultMermaidConfig } from '../lib/mermaid-config'

interface InteractiveMermaidProps {
  chart: string
  id: string
  enableZoom?: boolean // Новый пропс для управления зумом
  settings?: {
    enableZoom?: boolean
    height?: string
    zoomMin?: number
    zoomMax?: number
    zoomInitial?: number
    tooltipText?: string
    disableTooltip?: boolean
  }
}

export function InteractiveMermaid({ chart, id, enableZoom = true, settings = {} }: InteractiveMermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const hasRendered = useRef(false)
  
  // Используем индивидуальные настройки зума или глобальные
  const zoomSettings = {
    minScale: settings.zoomMin ?? getZoomSettings(defaultMermaidConfig).minScale,
    maxScale: settings.zoomMax ?? getZoomSettings(defaultMermaidConfig).maxScale,
    initialScale: settings.zoomInitial ?? getZoomSettings(defaultMermaidConfig).initialScale
  }

  useEffect(() => {
    // Предотвращаем повторный рендеринг
    if (hasRendered.current) {
      return
    }
    
    if (mermaidRef.current) {
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

      // Ensure DOM is ready and create a temporary container for Mermaid
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '-9999px'
      document.body.appendChild(tempContainer)

      const renderId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      mermaid.render(renderId, cleanChart).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg
          setIsRendered(true)
          hasRendered.current = true
          
          // Apply section-specific styling after rendering
          setTimeout(() => {
            const svgElement = mermaidRef.current?.querySelector('svg')
            if (svgElement) {
              // Find all text elements and their parent groups
              const textElements = svgElement.querySelectorAll('text')
              textElements.forEach(textElement => {
                const text = textElement.textContent || ''
                
                // Find the parent group that contains this text
                let parentGroup = textElement.closest('g')
                if (!parentGroup) {
                  parentGroup = textElement.parentElement
                }
                
                if (parentGroup) {
                  // Find shapes in the same group
                  const shapes = parentGroup.querySelectorAll('rect, circle, ellipse, polygon, path')
                  
                  if (text.includes('Frontend')) {
                    shapes.forEach(shape => {
                      shape.setAttribute('fill', '#eff6ff')
                      shape.setAttribute('stroke', '#2563eb')
                      shape.setAttribute('stroke-width', '2')
                    })
                  } else if (text.includes('Backend')) {
                    shapes.forEach(shape => {
                      shape.setAttribute('fill', '#fef2f2')
                      shape.setAttribute('stroke', '#dc2626')
                      shape.setAttribute('stroke-width', '2')
                    })
                  } else if (text.includes('Интеграции')) {
                    shapes.forEach(shape => {
                      shape.setAttribute('fill', '#f0fdf4')
                      shape.setAttribute('stroke', '#16a34a')
                      shape.setAttribute('stroke-width', '2')
                    })
                  } else if (text.includes('DevOps')) {
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
        }
        
        // Clean up temporary container
        document.body.removeChild(tempContainer)
      }).catch((error) => {
        console.error('Mermaid rendering error:', error)
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `
            <div class="text-red-500 p-4 border border-red-200 rounded bg-red-50 dark:bg-red-900/20">
              <div class="font-semibold mb-2">Ошибка отображения диаграммы</div>
              <div class="text-sm mb-2">${error.message}</div>
              <details class="text-xs">
                <summary class="cursor-pointer text-blue-600 hover:text-blue-800">Показать исходный код</summary>
                <pre class="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">${chart}</pre>
              </details>
            </div>
          `
        }
        setIsRendered(true)
        hasRendered.current = true
        
        // Clean up temporary container
        if (document.body.contains(tempContainer)) {
          document.body.removeChild(tempContainer)
        }
      })
    }
  }, [chart, id])

  return (
    <div 
      className={`mermaid-diagram-container ${!enableZoom ? 'no-zoom' : ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && !settings.disableTooltip && !defaultMermaidConfig.tooltip.disabled && (
        <div className="mermaid-tooltip">
          <Info size={14} />
          <span>
            {settings.tooltipText || (enableZoom 
              ? defaultMermaidConfig.tooltip.defaultInteractiveText
              : defaultMermaidConfig.tooltip.defaultStaticText
            )}
          </span>
        </div>
      )}
      
      {enableZoom ? (
        <div className="interactive-mermaid-wrapper">
          <TransformWrapper
            minScale={zoomSettings.minScale}
            maxScale={zoomSettings.maxScale}
            initialScale={zoomSettings.initialScale}
            limitToBounds={false}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className="zoom-controls">
                  <button onClick={() => zoomIn()} aria-label="Приблизить">
                    <Plus size={16} />
                  </button>
                  <button onClick={() => zoomOut()} aria-label="Отдалить">
                    <Minus size={16} />
                  </button>
                  <button onClick={() => resetTransform()} aria-label="Сбросить масштаб">
                    <Maximize size={14} />
                  </button>
                </div>
                
                <TransformComponent
                  wrapperStyle={{ width: '100%', height: '100%', display: isRendered ? 'block' : 'none' }}
                  contentStyle={{ width: '100%', height: '100%' }}
                >
                  <div ref={mermaidRef} className="mermaid-svg-container" />
                </TransformComponent>
                
                {!isRendered && (
                  <div className="mermaid-loading-placeholder">
                    🔄 Загрузка диаграммы...
                  </div>
                )}
              </>
            )}
          </TransformWrapper>
        </div>
      ) : (
        <div className="interactive-mermaid-wrapper">
          <div ref={mermaidRef} className="mermaid-svg-container" />
          {!isRendered && (
            <div className="mermaid-loading-placeholder">
              🔄 Загрузка диаграммы...
            </div>
          )}
        </div>
      )}
    </div>
  )
}
