'use client'

import parse, { HTMLReactParserOptions } from 'html-react-parser'
import { InteractiveMermaid } from './interactive-mermaid'
import { shouldEnableZoom } from '../lib/mermaid-config'
import { useTheme } from '../hooks/use-theme'

interface MDXRendererProps {
  htmlContent: string
  mermaidCharts: string[]
}

export function MDXRenderer({ htmlContent, mermaidCharts }: MDXRendererProps) {
  const theme = useTheme()

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs['class'] === 'mermaid-placeholder') {
        const chartIndex = parseInt(domNode.attribs['data-chart-index'] || '0', 10)
        const chart = mermaidCharts[chartIndex]
        const settingsData = domNode.attribs['data-settings']
        const individualSettings = settingsData ? JSON.parse(settingsData) : {}
        
        if (chart) {
          const enableZoom = individualSettings.enableZoom !== undefined 
            ? individualSettings.enableZoom 
            : shouldEnableZoom(chart, chartIndex)
          
          return (
            <div 
              key={`mermaid-${chartIndex}-${chart.slice(0, 20)}`}
              className="interactive-mermaid-container"
              style={individualSettings.height ? { height: individualSettings.height } : undefined}
            >
              <InteractiveMermaid 
                chart={chart} 
                id={`mermaid-${chartIndex}-${chart.slice(0, 20)}`}
                enableZoom={enableZoom}
                settings={individualSettings}
                theme={theme}
              />
            </div>
          )
        }
      }
      return undefined
    }
  }

  return (
    <div className="mdx-content" key={theme}>
      {parse(htmlContent, options)}
    </div>
  )
}
