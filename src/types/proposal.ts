import { ComponentType } from 'react'

export interface NavigationItem {
  id: string
  title: string
  icon: ComponentType<{ className?: string }>
  href: string
}

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
