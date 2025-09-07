import rehypePrettyCode from 'rehype-pretty-code'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'

// Интерфейс для настроек диаграммы
interface MermaidSettings {
  enableZoom?: boolean
  height?: string
  zoomMin?: number
  zoomMax?: number
  zoomInitial?: number
  tooltipText?: string
  disableTooltip?: boolean
}

// Функция для извлечения настроек из комментариев в коде диаграммы
function extractMermaidSettings(code: string): MermaidSettings {
  const settings: MermaidSettings = {}
  
  const lines = code.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (!trimmedLine || !trimmedLine.startsWith('%%')) continue
    
    if (trimmedLine.includes('zoom:')) {
      const zoomMatch = trimmedLine.match(/zoom:\s*(true|false)/i)
      if (zoomMatch) {
        settings.enableZoom = zoomMatch[1].toLowerCase() === 'true'
      }
    }
    
    if (trimmedLine.includes('height:')) {
      const heightMatch = trimmedLine.match(/height:\s*([^\s]+)/i)
      if (heightMatch) {
        settings.height = heightMatch[1]
      }
    }
    
    if (trimmedLine.includes('zoom-min:')) {
      const zoomMinMatch = trimmedLine.match(/zoom-min:\s*([0-9.]+)/i)
      if (zoomMinMatch) {
        settings.zoomMin = parseFloat(zoomMinMatch[1])
      }
    }
    
    if (trimmedLine.includes('zoom-max:')) {
      const zoomMaxMatch = trimmedLine.match(/zoom-max:\s*([0-9.]+)/i)
      if (zoomMaxMatch) {
        settings.zoomMax = parseFloat(zoomMaxMatch[1])
      }
    }
    
    if (trimmedLine.includes('zoom-initial:')) {
      const zoomInitialMatch = trimmedLine.match(/zoom-initial:\s*([0-9.]+)/i)
      if (zoomInitialMatch) {
        settings.zoomInitial = parseFloat(zoomInitialMatch[1])
      }
    }
    
    if (trimmedLine.includes('tooltip:')) {
      const tooltipMatch = trimmedLine.match(/tooltip:\s*(.+)/i)
      if (tooltipMatch) {
        settings.tooltipText = tooltipMatch[1].trim()
      }
    }
    
    if (trimmedLine.includes('disable-tooltip:')) {
      const disableTooltipMatch = trimmedLine.match(/disable-tooltip:\s*(true|false)/i)
      if (disableTooltipMatch) {
        settings.disableTooltip = disableTooltipMatch[1].toLowerCase() === 'true'
      }
    }
  }
  
  return settings
}

// Плагин для обработки Mermaid диаграмм
function rehypeMermaid() {
  return (tree: any) => {
    const mermaidCharts: string[] = []
    let chartIndex = 0

    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
        const codeNode = node.children[0]
        const className = codeNode.properties?.className || []
        const language = className.find((cls: string) => cls.startsWith('language-'))?.replace('language-', '')
        
        if (language === 'mermaid') {
          const code = codeNode.children?.[0]?.value || ''
          const settings = extractMermaidSettings(code)
          
          // Удаляем комментарии Mermaid перед сохранением
          const cleanCode = code.replace(/^%% .*$/gm, '').trim()
          mermaidCharts.push(cleanCode)
          
          // Заменяем блок кода на плейсхолдер для Mermaid
          node.tagName = 'div'
          node.properties = {
            className: ['mermaid-placeholder'],
            'data-chart-index': chartIndex.toString(),
            'data-settings': JSON.stringify(settings || {})
          }
          node.children = []
          
          chartIndex++
        }
      }
    })

    // Сохраняем диаграммы в метаданных дерева
    ;(tree as any).mermaidCharts = mermaidCharts
  }
}

export async function processMDX(markdown: string): Promise<{ html: string; mermaidCharts: string[] }> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: {
        dark: 'github-dark',
        light: 'github-light'
      },
      keepBackground: false,
      onVisitLine(node: any) {
        // Предотвращаем добавление пустой строки в конце
        if (node.children.length === 0) {
          node.children.push({ type: 'text', value: ' ' })
        }
      },
      onVisitHighlightedLine(node: any) {
        // Добавляем класс к подсвеченным строкам
        node.properties.className.push('line--highlighted')
      },
      onVisitHighlightedWord(node: any) {
        // Добавляем класс к подсвеченным словам
        node.properties.className = ['word--highlighted']
      }
    })
    .use(rehypeMermaid)
    .use(rehypeStringify, { allowDangerousHtml: true })

  const result = await processor.process(markdown)
  const html = String(result)
  const mermaidCharts = (result.data as any)?.mermaidCharts || []

  return { html, mermaidCharts }
}
