'use client'

import React, { useState, useEffect } from 'react'
import { NavigationItem } from '@/types/proposal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { LanguageSwitcher } from '@/components/shared/language-switcher'

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
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getIcon = (IconComponent: React.ComponentType<{ className?: string }>) => {
    return <IconComponent className="w-4 h-4" />
  }

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 bg-background border-b border-border md:hidden">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <LanguageSwitcher variant="inline" showGlobe={false} />
          </div>
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
    <aside className={cn("md:block w-72 bg-card border-r border-border p-6 flex-shrink-0 flex flex-col h-screen sticky top-0", className)}>
      <div className="flex items-center justify-center mb-6">
        <LanguageSwitcher variant="inline" showGlobe={true} />
      </div>
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
