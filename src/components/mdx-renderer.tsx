'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { InteractiveMermaid } from './interactive-mermaid'
import { shouldEnableZoom } from '../lib/mermaid-config'
import { useTheme } from '../hooks/use-theme'
import { Button } from './ui/button'
import Link from 'next/link'
import { Check, Square, CheckSquare, SquareCheck } from 'lucide-react'
import { Accordion, AccordionItem } from './ui/accordion'
import { Avatar } from './ui/avatar'
import { Breadcrumb } from './ui/breadcrumb'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { Carousel } from './ui/carousel'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle,  } from './ui/chart'
import { Checkbox } from './ui/checkbox'
import { Collapsible } from './ui/collapsible'
import { DropdownMenu } from './ui/dropdown-menu'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Separator } from './ui/separator'
import { Switch } from './ui/switch'
import { Tabs } from './ui/tabs'
import { Toggle } from './ui/toggle'
import { ToggleGroup } from './ui/toggle-group'
import { Tooltip } from './ui/tooltip'
import { Input } from './ui/input'
import { VideoPlayer } from './ui/video-player'
import { useAuth } from '@/components/providers/AuthProvider'

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
  toc?: Array<{ id: string; title: string; level: number; slug?: string }>
}

// Function to create heading components with ID support
const createHeadingComponents = (toc?: Array<{ id: string; title: string; level: number; slug?: string }>) => {
  const getHeadingId = (level: number, children: any) => {
    if (!toc) return undefined
    
    const title = typeof children === 'string' ? children : 
                  Array.isArray(children) ? children.join('') : 
                  children?.toString() || ''
    
    // Clean the title from markdown formatting
    const cleanTitle = title.replace(/\*\*/g, '').trim()
    
    const tocItem = toc.find(item => 
      item.level === level && 
      item.title.trim() === cleanTitle
    )
    
    return tocItem?.id
  }

  return {
    // Headings
    h1: ({ children, ...props }: any) => {
      const id = getHeadingId(1, children)
      const tocItem = toc?.find(item => item.id === id)

      const copyLink = () => {
        if (tocItem?.slug) {
          const url = `${window.location.origin}${window.location.pathname}#${tocItem.slug}`
          navigator.clipboard.writeText(url)
        }
      }
      
      return (
        <div className="group relative">
          <h1 
            id={id}
            className="text-3xl sm:text-4xl font-heading font-extrabold mb-6 text-foreground scroll-mt-20" 
            {...props}
          >
            {children}
          </h1>
          {tocItem?.slug && (
            <button
              onClick={copyLink}
              className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
              title="Copy link to this heading"
            >
              <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" href={`#${tocItem.slug}`} />
            </button>
          )}
        </div>
      )
    },
    h2: ({ children, ...props }: any) => {
      const id = getHeadingId(2, children)
      const tocItem = toc?.find(item => item.id === id)
      
      const copyLink = () => {
        if (tocItem?.slug) {
          const url = `${window.location.origin}${window.location.pathname}#${tocItem.slug}`
          navigator.clipboard.writeText(url)
        }
      }
      
      return (
        <div className="group relative">
          <h2 
            id={id}
            className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-foreground scroll-mt-20" 
            {...props}
          >
            {children}
          </h2>
          {tocItem?.slug && (
            <button
              onClick={copyLink}
              className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
              title="Copy link to this heading"
            >
              <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" href={`#${tocItem.slug}`} />
            </button>
          )}
        </div>
      )
    },
    h3: ({ children, ...props }: any) => {
      const id = getHeadingId(3, children)
      const tocItem = toc?.find(item => item.id === id)
      
      const copyLink = () => {
        if (tocItem?.slug) {
          const url = `${window.location.origin}${window.location.pathname}#${tocItem.slug}`
          navigator.clipboard.writeText(url)
        }
      }
      
      return (
        <div className="group relative">
          <h3 
            id={id}
            className="text-xl sm:text-2xl font-heading font-semibold mb-3 text-foreground scroll-mt-20" 
            {...props}
          >
            {children}
          </h3>
          {tocItem?.slug && (
            <Button
              onClick={copyLink}
              className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
              title="Copy link to this heading"
            >
              <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" href={`#${tocItem.slug}`} />
            </Button>
          )}
        </div>
      )
    },
    h4: ({ children, ...props }: any) => {
      const id = getHeadingId(4, children)
      const tocItem = toc?.find(item => item.id === id)
      
      const copyLink = () => {
        if (tocItem?.slug) {
          const url = `${window.location.origin}${window.location.pathname}#${tocItem.slug}`
          navigator.clipboard.writeText(url)
        }
      }
      
      return (
        <div className="group relative">
          <h4 
            id={id}
            className="text-lg font-bold mb-2 text-foreground" 
            {...props}
          >
            {children}
          </h4>
          {tocItem?.slug && (
            <button
              onClick={copyLink}
              className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
              title="Copy link to this heading"
            >
              <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" href={`#${tocItem.slug}`} />
            </button>
          )}
        </div>
      )
    },
    h5: ({ children, ...props }: any) => {
      const id = getHeadingId(5, children)
      const tocItem = toc?.find(item => item.id === id)
      
      const copyLink = () => {
        if (tocItem?.slug) {
          const url = `${window.location.origin}${window.location.pathname}#${tocItem.slug}`
          navigator.clipboard.writeText(url)
        }
      }
      
      return (
        <div className="group relative">
          <h5 
            id={id}
            className="text-base font-semibold mb-2 text-foreground" 
            {...props}
          >
            {children}
          </h5>
          {tocItem?.slug && (
            <button
              onClick={copyLink}
              className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
              title="Copy link to this heading"
            >
              <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" href={`#${tocItem.slug}`} />
            </button>
          )}
        </div>
      )
    },
    h6: ({ children, ...props }: any) => {
      const id = getHeadingId(6, children)
      const tocItem = toc?.find(item => item.id === id)
      
      const copyLink = () => {
        if (tocItem?.slug) {
          const url = `${window.location.origin}${window.location.pathname}#${tocItem.slug}`
          navigator.clipboard.writeText(url)
        }
      }
      
      return (
        <div className="group relative">
          <h6 
            id={id}
            className="text-sm font-medium mb-2 text-muted-foreground" 
            {...props}
          >
            {children}
          </h6>
          {tocItem?.slug && (
            <button
              onClick={copyLink}
              className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
              title="Copy link to this heading"
            >
              <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" href={`#${tocItem.slug}`} />
            </button>
          )}
        </div>
      )
    },
  
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
  input: ({ children, checked, type, ...props }: any) => {
    if (type === 'checkbox') {
      return (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex-shrink-0">
          {checked ? (
            <CheckSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
          ) : (
            <Square className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      )
    }
    return <input {...props} />
  },
  li: ({ children,  ...props }: any) => {
    
    const isTaskListItem = props.className?.includes('task-list-item')
    const baseClasses = 'text-foreground text-sm sm:text-base leading-relaxed mb-1 relative'
    const listClasses = isTaskListItem ? 'list-none' : ''
    
    props.className = (props.className || '') + ' ' + baseClasses + ' ' + listClasses
    return (
      <li {...props}>
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
    <Button 
      asChild
      variant="link"
      className="h-auto p-0 text-primary hover:text-primary/80 underline"
    >
      <Link href={href || '#'} {...props}>
        {children}
      </Link>
    </Button>
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
    return (
      <img 
        src={src} 
        alt={alt} 
        className="my-6 rounded-lg shadow-md max-w-full h-auto block" 
        onError={(e) => {
          console.error('Image failed to load:', src)
          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
        }}
        onLoad={() => {
        }}
        {...props}
      />
    )
  },
  //Accordion
  accordionui: ({ children, ...props }: any) => {
    return (
      <Accordion {...props}>
        {children}
      </Accordion>
    )
  },
  //AccordionItem
  accordionitemui: ({ children, ...props }: any) => {
    return (
      <AccordionItem {...props}>
        {children}
      </AccordionItem>)
  },
  //buttonui
  buttonui: ({ children, ...props }: any) => {
    return (
      <Button {...props}>
        {children}
      </Button>)
  },
  //avatarui
  avatarui: ({ children, ...props }: any) => {
    return (
      <Avatar {...props}>
        {children}
      </Avatar>)
  },
  //badgeui
  badgeui: ({ children, ...props }: any) => {
    return (
      <Badge {...props}>
        {children}
      </Badge>)
  },
  //breadcrumbui
  breadcrumbui: ({ children, ...props }: any) => {
    return (
      <Breadcrumb {...props}>
        {children}
      </Breadcrumb>)
  },
  cardui: ({ children, ...props }: any) => {
    return (
      <Card {...props}>
        {children}
      </Card>)
  },
  //carouselui
  carouselui: ({ children, ...props }: any) => {
    return (
      <Carousel {...props}>
        {children}
      </Carousel>)
  },
  //chartstyleui
  chartstyleui: ({ children, ...props }: any) => {
    return (
      <ChartStyle {...props}>
        {children}
      </ChartStyle>)
  },
  //charttooltipui
  charttooltipui: ({ children, ...props }: any) => {
    return (
      <ChartTooltip {...props}>
        {children}
      </ChartTooltip>)
  },
  //charttooltipcontentui
  charttooltipcontentui: ({ children, ...props }: any) => {
    return (
      <ChartTooltipContent {...props}>
        {children}
      </ChartTooltipContent>)
  },
  //chartlegendui
  chartlegendui: ({ children, ...props }: any) => {
    return (
      <ChartLegend {...props}>
        {children}
      </ChartLegend>)
  },
  //chartlegendcontentui
  chartlegendcontentui: ({ children, ...props }: any) => {
    return (
      <ChartLegendContent {...props}>
        {children}
      </ChartLegendContent>)
  },
  //chartcontainerui
  chartcontainerui: ({ children, ...props }: any) => {
    return (
      <ChartContainer {...props}>
        {children}
      </ChartContainer>)
  },
  //checkboxui
  checkboxui: ({ children, ...props }: any) => {
    return (
      <Checkbox {...props}>
        {children}
      </Checkbox>)
  },
  //collapsibleui
  collapsibleui: ({ children, ...props }: any) => {
    return (
      <Collapsible {...props}>
        {children}
      </Collapsible>)
  },
  //dropdownmenuui
  dropdownmenuui: ({ children, ...props }: any) => {
    return (
      <DropdownMenu {...props}>
        {children}
      </DropdownMenu>)
  },
  //labelui
  labelui: ({ children, ...props }: any) => {
    return (
      <Label {...props}>
        {children}
      </Label>)
  },
  //selectui
  selectui: ({ children, ...props }: any) => {
    return (
      <Select {...props}>
        {children}
      </Select>)
  },
  //separatorui
  separatorui: ({ children, ...props }: any) => {
    return (
      <Separator {...props}>
        {children}
      </Separator>)
  },
  //switchui
  switchui: ({ children, ...props }: any) => {
    return (
      <Switch {...props}>
        {children}
      </Switch>)
  },
  //tabsui
  tabsui: ({ children, ...props }: any) => {
    return (
      <Tabs {...props}>
        {children}
      </Tabs>)
  }, 
  //tooggleui
  tooggleui: ({ children, ...props }: any) => {
    return (
      <Toggle {...props}>
        {children}
      </Toggle>)
  },
  //toogglegroupui
  toogglegroupui: ({ children, ...props }: any) => {
    return (
      <ToggleGroup {...props}>
        {children}
      </ToggleGroup>)
  },
  //tooltipui
  tooltipui: ({ children, ...props }: any) => {
    return (
      <Tooltip {...props}>
        {children}
      </Tooltip>)
  },
  //inputui
  inputui: ({ children, ...props }: any) => {
    return (
      <Input {...props}>
        {children}
      </Input>)
  },
  //VideoPlayeroui
  videoplayerui: ({ children, ...props }: any) => {
    return (
      <VideoPlayer {...props}>
        {children}
      </VideoPlayer>)
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
}

export function MDXRenderer({ markdownContent, mermaidCharts, toc }: MDXRendererProps) {
  const theme = useTheme()
  const { sessionData } = useAuth()

  // Check that markdownContent exists
  if (!markdownContent) {
    return <div className="mdx-content">Loading...</div>
  }
  
  // Create components with TOC support
  const components = createHeadingComponents(toc)
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
    <div className="mdx-content" key={theme.theme || 'light'}>
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
              theme={theme.theme || 'light'}
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
