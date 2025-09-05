'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && chart) {
      // Очищаем предыдущий контент
      ref.current.innerHTML = ''
      
      // Инициализируем Mermaid с улучшенными настройками
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'Inter, sans-serif',
        flowchart: {
          htmlLabels: true,
          curve: 'basis'
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          messageAlign: 'center',
          mirrorActors: true,
          bottomMarginAdj: 1,
          useMaxWidth: true,
          rightAngles: false,
          showSequenceNumbers: false
        },
        gantt: {
          titleTopMargin: 25,
          barHeight: 20,
          barGap: 4,
          topPadding: 50,
          leftPadding: 75,
          gridLineStartPadding: 35,
          fontSize: 11,
          sectionFontSize: 24,
          numberSectionStyles: 4
        }
      })

      // Очищаем и исправляем диаграмму
      const cleanChart = chart
        .replace(/[^\x00-\x7F]/g, (char) => {
          // Заменяем проблемные символы на безопасные
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
          // Оборачиваем русский текст в одинарные кавычки для узлов
          return `['${content.trim()}']`
        })

      // Рендерим диаграмму
      const renderId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      mermaid.render(renderId, cleanChart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error)
        console.error('Original chart:', chart)
        console.error('Cleaned chart:', cleanChart)
        
        if (ref.current) {
          ref.current.innerHTML = `
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
      })
    }
  }, [chart])

  return (
    <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
      <div ref={ref} className="mermaid-container" />
    </div>
  )
}
