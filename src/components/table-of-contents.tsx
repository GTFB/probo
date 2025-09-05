"use client"

import * as React from "react"
import { ChevronRight, PanelLeftClose, PanelRightClose, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SearchEngine } from "@/components/search-engine"

interface TableOfContentsProps {
  items: Array<{
    id: string
    title: string
    level: number
  }>
  activeSection: string
  onSectionClick: (sectionId: string) => void
  onSectionChange?: (sectionId: string) => void
  onToggle?: () => void
}

export function TableOfContents({ items, activeSection, onSectionClick, onSectionChange, onToggle }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<'toc' | 'search'>('toc')

  const handleSearchResultClick = (result: any) => {
    // Прокручиваем к найденному элементу
    const element = document.getElementById(result.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Fallback: ищем по тексту
      const headings = document.querySelectorAll('h1, h2, h3')
      headings.forEach(heading => {
        if (heading.textContent?.trim() === result.title) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }

  return (
    <div className="hidden xl:block w-80 border-l bg-muted/10 fixed right-0 top-0 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'toc' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('toc')}
              className="h-8 px-3"
            >
              Оглавление
            </Button>
            <Button
              variant={activeTab === 'search' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('search')}
              className="h-8 px-3"
            >
              <Search className="w-3 h-3 mr-1" />
              Поиск
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'toc' && (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ChevronRight className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
            {onToggle && (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onToggle}>
                <PanelRightClose className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Контент вкладок */}
        {activeTab === 'toc' && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent className="space-y-1">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Нет заголовков</p>
              ) : (
                items.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left h-auto py-2 px-3 ${
                      activeSection === item.id ? "bg-accent text-accent-foreground" : ""
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                    onClick={() => {
                      // Прокручиваем к элементу на странице по ID
                      console.log('Trying to scroll to ID:', item.id)
                      const element = document.getElementById(item.id)
                      console.log('Found element:', element)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      } else {
                        console.log('Element not found, trying alternative method')
                        // Попробуем найти по тексту заголовка
                        const headings = document.querySelectorAll('h1, h2, h3')
                        headings.forEach(heading => {
                          if (heading.textContent?.trim() === item.title) {
                            heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }
                        })
                      }
                    }}
                  >
                    <span className="text-sm truncate">{item.title}</span>
                  </Button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {activeTab === 'search' && (
          <SearchEngine 
            onResultClick={handleSearchResultClick}
            onSectionChange={onSectionChange}
          />
        )}
      </div>
    </div>
  )
}
