import { ComponentType } from 'react'

// Re-export NavigationItem from settings for backward compatibility
export type { NavigationItem } from '@/lib/settings'

export interface SectionData {
  id: string
  title: string
  subtitle?: string
  content: string
  order: number
}

export interface ProposalData {
  id: string
  title: string
  company: string
  sections: SectionData[]
  navigation: NavigationItem[]
  theme: {
    primaryColor: string
    logo?: string
  }
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
  }[]
}
