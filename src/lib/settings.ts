import {
  FileText,
  Component,
  Users,
  Cpu,
  Share2,
  TestTube,
  CheckCircle,
  Code,
} from 'lucide-react'

export const PROJECT_SETTINGS = {
  name: 'INFLUBALANCE',
  description: 'AI-powered outreach platform',
} as const;

const SECTIONS = [
  { id: '1', title: 'Введение и цели проекта', icon: FileText },
  { id: '2', title: 'Функциональные требования', icon: Component },
  { id: '3', title: 'Пользовательские сценарии', icon: Users },
  { id: '4', title: 'Технические требования', icon: Cpu },
  { id: '5', title: 'Программные интерфейсы (API)', icon: Share2 },
  { id: '6', title: 'Тестирование и валидация', icon: TestTube },
  { id: '7', title: 'Заключение и следующие шаги', icon: CheckCircle },
  { id: '8', title: 'Примеры стилей MDX', icon: FileText },
] as const;


export const NAVIGATION_ITEMS = SECTIONS.map(section => ({
  ...section,
  href: `#${section.id}`
}));


export const MDX_FILES = SECTIONS.map(section => ({
  id: section.id,
  name: section.title
}));
