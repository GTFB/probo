'use client'

import React, { useState, useEffect } from 'react'
import { NavigationItem } from '@/lib/settings'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UI_CONSTANTS } from '@/lib/settings'

// Navigation constants
const NAVIGATION_CONSTANTS = {
  MOBILE_BREAKPOINT: 768,
  ICON_SIZE: 'w-4 h-4',
  MOBILE_PADDING: 'p-4',
  DESKTOP_PADDING: 'p-6',
} as const;

interface NavigationProps {
  items: NavigationItem[]
  activeSection: string
  onSectionChange: (sectionId: string) => void
  className?: string
}

export function Navigation({ items, activeSection, onSectionChange, className }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < NAVIGATION_CONSTANTS.MOBILE_BREAKPOINT)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getIcon = (IconComponent: React.ComponentType<{ className?: string }>) => {
    return <IconComponent className={NAVIGATION_CONSTANTS.ICON_SIZE} />
  }

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 bg-background border-b border-border md:hidden">
        <div className={NAVIGATION_CONSTANTS.MOBILE_PADDING}>
          <nav className="flex gap-2 overflow-x-auto scrollbar-hide">
            {items.map((item, index) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className="flex-shrink-0 whitespace-nowrap"
              >
                {index + 1}
              </Button>
            ))}
          </nav>
        </div>
      </header>
    )
  }

  return (
    <aside className={cn("hidden md:block", UI_CONSTANTS.SIDEBAR_WIDTH, "bg-card border-r border-border", NAVIGATION_CONSTANTS.DESKTOP_PADDING, "flex-shrink-0 flex flex-col h-screen sticky top-0", className)}>
      <div className="flex-1">
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={cn(
                "justify-start gap-3",
                activeSection === item.id && "bg-foreground text-background font-semibold"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              {getIcon(item.icon)}
              <span>{item.title}</span>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
