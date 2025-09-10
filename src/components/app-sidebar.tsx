"use client"

import { PROJECT_SETTINGS } from '@/lib/settings'
import { useTranslations } from '@/hooks/use-translations'
import {
  Lightbulb,
  TrendingUp,
  Package,
  Cpu,
  Map,
  ShieldCheck,
  Rocket,
  PanelLeftClose,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useLeftSectionState } from './providers/LeftSectionStateProvider'
import { LanguageSwitcher } from '@/components/language-switcher'

interface NavigationItem {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

interface AppSidebarProps {
  items: NavigationItem[]
  activeSection: string
  onSectionChange: (sectionId: string) => void
  onToggle?: () => void
}

export function AppSidebar({ items, activeSection, onSectionChange, onToggle }: AppSidebarProps) {
  const {  setLeftSectionState } = useLeftSectionState()
  const t = useTranslations()
  
  return (
    <Sidebar className="hidden lg:block transition-transform duration-300 ease-in-out theme-transition">
      <SidebarHeader className="px-6 h-25 flex justify-between flex-nowrap" style={{ height: 'calc(6.25rem + 1px)', flexFlow: 'nowrap' }}>
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-lg font-semibold">{t('project.name')}</h2>
            <p className="text-xs text-muted-foreground">{t('project.description')}</p>
          </div>
        </div>
        {onToggle && (
          <Button variant="ghost" size="sm" className="mt-2 h-6 w-6 p-0 flex-shrink-0"
           onClick={() => {
            onToggle()
            setLeftSectionState('close')
           }}>
            <PanelLeftClose className="h-3 w-3" />
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => onSectionChange(item.id)}
                  className={isActive ? "bg-accent" : ""}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="px-6 py-2 h-16 flex flex-col items-center justify-center gap-2">
        <LanguageSwitcher variant="compact" showText={true} size="sm" />
        <img 
          src="/logo.svg" 
          alt="Logo" 
          className="h-8 w-auto"
          style={{ WebkitWritingMode: 'vertical-lr' }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
