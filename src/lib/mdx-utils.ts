import { 
  FileText, 
  Component, 
  Users, 
  Cpu, 
  Share2, 
  TestTube, 
  CheckCircle, 
  Code,
  LucideIcon
} from 'lucide-react'

// Map of icon names to Lucide React components
const ICON_MAP: Record<string, LucideIcon> = {
  'FileText': FileText,
  'Component': Component,
  'Users': Users,
  'Cpu': Cpu,
  'Share2': Share2,
  'TestTube': TestTube,
  'CheckCircle': CheckCircle,
  'Code': Code,
}

export interface NavigationItem {
  id: string
  title: string
  icon: LucideIcon
  href: string
}

// Static navigation items based on MDX files
// This will be updated when MDX files change
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: '1',
    title: 'MDX Styling Examples',
    icon: Code,
    href: '/widgets'
  },
  {
    id: '2',
    title: 'Group 1 - Section A',
    icon: Users,
    href: '/group-1-section-a'
  },
  {
    id: '4',
    title: 'Group 2 - Section D',
    icon: Cpu,
    href: '/group-2-section-d'
  }
]
