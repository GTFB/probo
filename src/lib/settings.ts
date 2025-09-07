import {
  FileText,
  Component,
  Users,
  Cpu,
  Share2,
  TestTube,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react'

// Project configuration constants
export const PROJECT_SETTINGS = {
  name: 'INFLUBALANCE',
  description: 'AI-powered outreach platform',
} as const;

// UI constants
export const UI_CONSTANTS = {
  HEADER_HEIGHT: 'calc(theme(spacing.14))',
  SIDEBAR_WIDTH: 'w-72',
  CONTAINER_MAX_WIDTH: 'max-w-7xl',
} as const;

// Section configuration with proper typing
interface SectionConfig {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
}

const SECTIONS: readonly SectionConfig[] = [
  { id: '1', title: 'Введение и цели проекта', icon: FileText },
  { id: '2', title: 'Функциональные требования', icon: Component },
  { id: '3', title: 'Пользовательские сценарии', icon: Users },
  { id: '4', title: 'Технические требования', icon: Cpu },
  { id: '5', title: 'Программные интерфейсы (API)', icon: Share2 },
  { id: '6', title: 'Тестирование и валидация', icon: TestTube },
  { id: '7', title: 'Заключение и следующие шаги', icon: CheckCircle },
  { id: '8', title: 'Примеры стилей MDX', icon: FileText },
] as const;


// Navigation items with href
export const NAVIGATION_ITEMS = SECTIONS.map(section => ({
  ...section,
  href: `#${section.id}`
}));

// MDX files mapping
export const MDX_FILES = SECTIONS.map(section => ({
  id: section.id,
  name: section.title
}));

// Export types for external use
export type { SectionConfig };
export type NavigationItem = typeof NAVIGATION_ITEMS[number];
export type MdxFile = typeof MDX_FILES[number];
