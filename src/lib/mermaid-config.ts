// Configuration for Mermaid diagrams
export interface MermaidConfig {
  // Zoom settings
  zoom: {
    // Enable zoom by default
    enabled: boolean
    // Minimum scale
    minScale: number
    // Maximum scale
    maxScale: number
    // Initial scale
    initialScale: number
  }
  
  // Size settings
  sizing: {
    // Fixed container height
    containerHeight: string
    // Maximum SVG width
    maxSvgWidth: string
    // Maximum SVG height
    maxSvgHeight: string
  }
  
  // Tooltip settings
  tooltip: {
    // Disable tooltip by default
    disabled: boolean
    // Default text for interactive diagrams
    defaultInteractiveText: string
    // Default text for static diagrams
    defaultStaticText: string
  }
  
  // Rules for disabling zoom
  disableZoomRules: {
    // Disable zoom for ER diagrams
    disableForErDiagrams: boolean
    // Disable zoom for diagrams with fewer nodes than specified
    disableForSimpleDiagrams: boolean
    minNodesForZoom: number
    // Disable zoom for first N diagrams
    disableForFirstNDiagrams: boolean
    firstNDiagramsCount: number
    // Disable zoom for diagrams with certain keywords
    disableForKeywords: boolean
    keywords: string[]
  }
}

// Default configuration
export const defaultMermaidConfig: MermaidConfig = {
  zoom: {
    enabled: true,
    minScale: 0.2,
    maxScale: 4,
    initialScale: 1
  },
  
  sizing: {
    containerHeight: '50vh',
    maxSvgWidth: '100%',
    maxSvgHeight: '100%'
  },
  
  tooltip: {
    disabled: false,
    defaultInteractiveText: 'Use mouse wheel to zoom and drag to pan',
    defaultStaticText: 'Diagram without interactivity'
  },
  
  disableZoomRules: {
    disableForErDiagrams: true,
    disableForSimpleDiagrams: true,
    minNodesForZoom: 10,
    disableForFirstNDiagrams: false,
    firstNDiagramsCount: 2,
    disableForKeywords: false,
    keywords: ['simple', 'basic', 'overview']
  }
}

// Function to determine if zoom is needed for a diagram
export function shouldEnableZoom(chart: string, chartIndex: number, config: MermaidConfig = defaultMermaidConfig): boolean {
  if (!config.zoom.enabled) {
    return false
  }
  
  const rules = config.disableZoomRules
  
  // 1. Disable zoom for ER diagrams
  if (rules.disableForErDiagrams && chart.includes('erDiagram')) {
    return false
  }
  
  // 2. Disable zoom for simple diagrams
  if (rules.disableForSimpleDiagrams) {
    const nodeCount = (chart.match(/\[.*?\]/g) || []).length
    if (nodeCount < rules.minNodesForZoom) {
      return false
    }
  }
  
  // 3. Disable zoom for first N diagrams
  if (rules.disableForFirstNDiagrams && chartIndex < rules.firstNDiagramsCount) {
    return false
  }
  
  // 4. Disable zoom for diagrams with certain keywords
  if (rules.disableForKeywords) {
    const chartLower = chart.toLowerCase()
    if (rules.keywords.some(keyword => chartLower.includes(keyword.toLowerCase()))) {
      return false
    }
  }
  
  // By default, enable zoom
  return true
}

// Function to get zoom settings
export function getZoomSettings(config: MermaidConfig = defaultMermaidConfig) {
  return {
    minScale: config.zoom.minScale,
    maxScale: config.zoom.maxScale,
    initialScale: config.zoom.initialScale
  }
}
