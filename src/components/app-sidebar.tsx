"use client"

import * as React from "react"
import {
  Lightbulb,
  TrendingUp,
  Package,
  Cpu,
  Map,
  Gem,
  ShieldCheck,
  Rocket,
  Search,
  PanelLeftClose,
} from "lucide-react"

import { SearchForm } from "@/components/search-form"
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
import { Separator } from "@/components/ui/separator"

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
    <Sidebar className="hidden lg:block">
      <SidebarHeader className="border-b px-6 h-25 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Gem className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Дюжина</h2>
            <p className="text-xs text-muted-foreground">Коммерческое предложение</p>
          </div>
        </div>
        {onToggle && (
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onToggle}>
              <PanelLeftClose className="h-3 w-3" />
            </Button>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="px-3 py-2">
        <div className="px-3 py-2">
          <SearchForm />
        </div>
        <Separator className="my-2" />
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
      <SidebarFooter className="border-t px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">AIMAX</p>
            <p className="text-xs text-muted-foreground">Ваш технологический партнер</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
