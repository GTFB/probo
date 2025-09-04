"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface TableOfContentsProps {
  items: Array<{
    id: string
    title: string
    level: number
  }>
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

export function TableOfContents({ items, activeSection, onSectionClick }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="hidden xl:block w-80 border-l bg-muted/10 fixed right-0 top-0 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Оглавление</h3>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ChevronRight className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="space-y-1">
            {items.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-left h-auto py-2 px-3 ${
                  activeSection === item.id ? "bg-accent text-accent-foreground" : ""
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                onClick={() => onSectionClick(item.id)}
              >
                <span className="text-sm truncate">{item.title}</span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
