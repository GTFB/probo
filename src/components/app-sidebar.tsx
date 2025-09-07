"use client"

import * as React from "react"
import { PROJECT_SETTINGS } from '@/lib/settings'
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
  return (
    <Sidebar className="hidden lg:block transition-transform duration-300 ease-in-out theme-transition">
      <SidebarHeader className="px-6 h-25 flex items-center justify-between flex-nowrap" style={{ height: 'calc(6.25rem + 1px)', flexFlow: 'nowrap' }}>
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-lg font-semibold">{PROJECT_SETTINGS.name}</h2>
            <p className="text-xs text-muted-foreground">{PROJECT_SETTINGS.description}</p>
          </div>
        </div>
        {onToggle && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0" onClick={onToggle}>
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
      <SidebarFooter className="px-6 py-2 h-16 flex items-start justify-center">
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
