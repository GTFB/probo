'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { InteractiveMermaid } from './interactive-mermaid'
import { shouldEnableZoom } from '../lib/mermaid-config'
import { useTheme } from '../hooks/use-theme'
import { Check, Square } from 'lucide-react'

// Interface for diagram settings
interface MermaidSettings {
  enableZoom?: boolean
  height?: string
  zoomMin?: number
  zoomMax?: number
  zoomInitial?: number
  tooltipText?: string
  disableTooltip?: boolean
}

// Function to extract settings from comments in diagram code
function extractMermaidSettings(code: string): MermaidSettings {
  const settings: MermaidSettings = {}
  
  // Look for comments with settings
  const lines = code.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Skip empty lines and comments without settings
    if (!trimmedLine || !trimmedLine.startsWith('%%')) continue
    
    // Extract settings from comments like %% zoom: true
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

interface MDXRendererProps {
  markdownContent: string
  mermaidCharts: string[]
}

// Custom components for Markdown elements
const components = {
  // Headings
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl sm:text-4xl font-heading font-extrabold mb-6 text-foreground scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-foreground scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-3 text-foreground scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-lg font-bold mb-2 text-foreground" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: any) => (
    <h5 className="text-base font-semibold mb-2 text-foreground" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: any) => (
    <h6 className="text-sm font-medium mb-2 text-muted-foreground" {...props}>
      {children}
    </h6>
  ),
  
  // Paragraphs
  p: ({ children, ...props }: any) => (
    <p className="text-foreground mb-4 leading-relaxed text-sm sm:text-base" {...props}>
      {children}
    </p>
  ),
  
  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="mb-6 space-y-2 pl-6 list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="mb-6 space-y-2 pl-6 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, checked, ...props }: any) => {
    // remark-gfm adds the `checked` property (true/false) for task list items.
    // For regular list items `checked` will be `undefined`.
    if (typeof checked === 'boolean') {
      // This is a task list item.
      // The first child element that remark-gfm adds is <input type="checkbox">.
      // We'll filter it out and keep only the task text.
      const taskText = React.Children.toArray(children).slice(1);

      return (
        <li
          // Use flexbox for beautiful alignment and remove the standard list marker
          className="flex items-start gap-2 mb-2 list-none -ml-6" 
          {...props}
        >
          {/* Our custom icon */}
          <div className="flex-shrink-0 mt-1"> {/* mt-1 for better vertical alignment with text */}
            {checked ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Square className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          {/* Task text */}
          <span className="flex-grow text-foreground text-sm sm:text-base leading-relaxed">
            {taskText}
          </span>
        </li>
      );
    }

    // This is a regular list item
    return (
      <li className="text-foreground text-sm sm:text-base leading-relaxed mb-1" {...props}>
        {children}
      </li>
    );
  },
  
  // Text formatting
  strong: ({ children, ...props }: any) => (
    <strong className="text-foreground font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  del: ({ children, ...props }: any) => (
    <del className="text-muted-foreground line-through" {...props}>
      {children}
    </del>
  ),
  
  // Links
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-primary hover:text-primary/80 underline" 
      target="_blank" 
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  
  // Code
  code: ({ children, className, ...props }: any) => {
    const isInline = !className?.includes('language-')
    if (isInline) {
      return (
        <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border" {...props}>
          {children}
        </code>
      )
    }
    // For code blocks with syntax highlighting, use classes from rehype-highlight
    return (
      <code className={`${className} hljs`} {...props}>
        {children}
      </code>
    )
  },
  
  // Code blocks
  pre: ({ children, ...props }: any) => (
    <pre className="relative my-6 rounded-lg overflow-hidden border bg-muted/50 hljs" {...props}>
      {children}
    </pre>
  ),
  
  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="my-6 border-l-4 border-primary/50 pl-6 py-4 italic text-muted-foreground bg-secondary/30 rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),
  
  // Tables
  table: ({ children, ...props }: any) => (
    <table className="my-6 w-full text-sm sm:text-base border-collapse border border-border rounded-lg overflow-hidden" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }: any) => (
    <thead {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => (
    <tr className="hover:bg-secondary/50 border-b border-border" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: any) => (
    <th className="p-4 text-left bg-muted font-semibold text-foreground" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="p-4 text-left" {...props}>
      {children}
    </td>
  ),
  
  // Images
  img: ({ src, alt, ...props }: any) => {
    console.log('Rendering image:', { src, alt })
    return (
      <div className="my-6">
        <img 
          src={src} 
          alt={alt} 
          className="rounded-lg shadow-md max-w-full h-auto" 
          onError={(e) => {
            console.error('Image failed to load:', src)
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', src)
          }}
          {...props}
        />
      </div>
    )
  },
  
  // Horizontal line
  hr: ({ ...props }: any) => (
    <hr className="my-8 border-t border-border" {...props} />
  ),
  
  // Highlighted text
  mark: ({ children, ...props }: any) => (
    <mark className="bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-200 px-1 py-0.5 rounded-sm font-medium" {...props}>
      {children}
    </mark>
  ),
  
  // Keyboard keys
  kbd: ({ children, ...props }: any) => (
    <kbd className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 text-sm font-mono" {...props}>
      {children}
    </kbd>
  ),
  
  // Subscript
  sub: ({ children, ...props }: any) => (
    <sub className="text-xs" {...props}>
      {children}
    </sub>
  ),
  
  // Superscript
  sup: ({ children, ...props }: any) => (
    <sup className="text-xs" {...props}>
      {children}
    </sup>
  ),
  
  // Highlighting
  u: ({ children, ...props }: any) => (
    <u className="underline decoration-2 decoration-primary/50" {...props}>
      {children}
    </u>
  ),
  
  // Bold underlined text (combination of strong + u)
  'strong u': ({ children, ...props }: any) => (
    <strong className="text-foreground font-semibold">
      <u className="underline decoration-2 decoration-primary/50" {...props}>
        {children}
      </u>
    </strong>
  ),
  
  // Bold italic (styled as bold underlined)
  'strong em': ({ children, ...props }: any) => (
    <strong className="text-foreground font-semibold">
      <u className="underline decoration-2 decoration-primary/50" {...props}>
        {children}
      </u>
    </strong>
  ),
}

export function MDXRenderer({ markdownContent, mermaidCharts }: MDXRendererProps) {
  const theme = useTheme()
  
  // Check that markdownContent exists
  if (!markdownContent) {
    return <div className="mdx-content">Loading...</div>
  }
  
  // Process Mermaid diagrams
  let processedContent = markdownContent
  let chartIndex = 0
  
  // Replace mermaid code blocks with placeholders
  const mermaidPlaceholders: Array<{ index: number; settings: MermaidSettings }> = []
  
  processedContent = processedContent.replace(/```mermaid\n([\s\S]*?)\n```/g, (match, code) => {
    // Extract settings from comments before the diagram
    const settings = extractMermaidSettings(code)
    
    // Remove Mermaid comments before saving
    const cleanCode = code.replace(/^%% .*$/gm, '').trim()
    mermaidCharts.push(cleanCode)
    
    const currentIndex = chartIndex++
    mermaidPlaceholders.push({ index: currentIndex, settings })
    return `MERMAID_PLACEHOLDER_${currentIndex}`
  })
  
  // Split content into parts and process
  const parts = processedContent.split(/(MERMAID_PLACEHOLDER_\d+)/g)
  
  return (
    <div className="mdx-content" key={theme}>
      {parts.map((part, index) => {
        if (part.startsWith('MERMAID_PLACEHOLDER_')) {
          const chartIndex = parseInt(part.replace('MERMAID_PLACEHOLDER_', ''), 10)
          const placeholder = mermaidPlaceholders.find(p => p.index === chartIndex)
          const settings = placeholder?.settings || {}
          const chart = mermaidCharts[chartIndex]
          
          if (chart) {
            const enableZoom = settings.enableZoom !== undefined 
              ? settings.enableZoom 
              : shouldEnableZoom(chart, chartIndex)
            
            return (
              <div 
                key={`mermaid-${chartIndex}-${chart.slice(0, 20)}`}
                className="interactive-mermaid-container"
                style={settings.height ? { height: settings.height } : undefined}
              >
                <InteractiveMermaid 
              chart={chart} 
                  id={`mermaid-${chartIndex}-${chart.slice(0, 20)}`}
              enableZoom={enableZoom}
                  settings={settings}
              theme={theme}
                />
              </div>
            )
          }
        }

  return (
          <ReactMarkdown
            key={index}
            remarkPlugins={[
              [remarkGfm, { 
                taskListItems: true,
                singleTilde: false 
              }]
            ]}
            rehypePlugins={[
              [rehypeHighlight, { 
                detect: true,
                ignoreMissing: true,
                subset: false
              }], 
              rehypeRaw
            ]}
            components={components}
          >
            {part}
          </ReactMarkdown>
        )
      })}
    </div>
  )
}
