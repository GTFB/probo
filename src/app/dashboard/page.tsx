"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TrendingUp, Package, Cpu, ShieldCheck } from "lucide-react"

// Navigation elements for dashboard
const navigationItems = [
  { id: 'overview', title: 'Overview', icon: TrendingUp, href: '#overview' },
  { id: 'projects', title: 'Projects', icon: Package, href: '#projects' },
  { id: 'analytics', title: 'Analytics', icon: Cpu, href: '#analytics' },
  { id: 'settings', title: 'Settings', icon: ShieldCheck, href: '#settings' },
]

export default function Page() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar 
            items={navigationItems}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
