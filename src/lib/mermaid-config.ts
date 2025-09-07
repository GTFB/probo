// Конфигурация для Mermaid диаграмм
export interface MermaidConfig {
  // Настройки зума
  zoom: {
    // Включить зум по умолчанию
    enabled: boolean
    // Минимальный масштаб
    minScale: number
    // Максимальный масштаб
    maxScale: number
    // Начальный масштаб
    initialScale: number
  }
  
  // Настройки размеров
  sizing: {
    // Фиксированная высота контейнера
    containerHeight: string
    // Максимальная ширина SVG
    maxSvgWidth: string
    // Максимальная высота SVG
    maxSvgHeight: string
  }
  
  // Настройки tooltip
  tooltip: {
    // Отключить tooltip по умолчанию
    disabled: boolean
    // Текст по умолчанию для интерактивных диаграмм
    defaultInteractiveText: string
    // Текст по умолчанию для статичных диаграмм
    defaultStaticText: string
  }
  
  // Правила для отключения зума
  disableZoomRules: {
    // Отключить зум для ER-диаграмм
    disableForErDiagrams: boolean
    // Отключить зум для диаграмм с количеством узлов меньше указанного
    disableForSimpleDiagrams: boolean
    minNodesForZoom: number
    // Отключить зум для первых N диаграмм
    disableForFirstNDiagrams: boolean
    firstNDiagramsCount: number
    // Отключить зум для диаграмм с определенными ключевыми словами
    disableForKeywords: boolean
    keywords: string[]
  }
}

// Конфигурация по умолчанию
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
    defaultInteractiveText: 'Используйте колесико мыши для масштабирования и перетаскивания для перемещения',
    defaultStaticText: 'Диаграмма без интерактивности'
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

// Функция для определения, нужен ли зум для диаграммы
export function shouldEnableZoom(chart: string, chartIndex: number, config: MermaidConfig = defaultMermaidConfig): boolean {
  if (!config.zoom.enabled) {
    return false
  }
  
  const rules = config.disableZoomRules
  
  // 1. Отключить зум для ER-диаграмм
  if (rules.disableForErDiagrams && chart.includes('erDiagram')) {
    return false
  }
  
  // 2. Отключить зум для простых диаграмм
  if (rules.disableForSimpleDiagrams) {
    const nodeCount = (chart.match(/\[.*?\]/g) || []).length
    if (nodeCount < rules.minNodesForZoom) {
      return false
    }
  }
  
  // 3. Отключить зум для первых N диаграмм
  if (rules.disableForFirstNDiagrams && chartIndex < rules.firstNDiagramsCount) {
    return false
  }
  
  // 4. Отключить зум для диаграмм с определенными ключевыми словами
  if (rules.disableForKeywords) {
    const chartLower = chart.toLowerCase()
    if (rules.keywords.some(keyword => chartLower.includes(keyword.toLowerCase()))) {
      return false
    }
  }
  
  // По умолчанию включаем зум
  return true
}

// Функция для получения настроек зума
export function getZoomSettings(config: MermaidConfig = defaultMermaidConfig) {
  return {
    minScale: config.zoom.minScale,
    maxScale: config.zoom.maxScale,
    initialScale: config.zoom.initialScale
  }
}
