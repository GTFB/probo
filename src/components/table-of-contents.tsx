"use client"

import * as React from "react"
import { PanelRightClose, Search, Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  const [activeTab, setActiveTab] = React.useState<'toc' | 'search'>('toc')
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

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

  // Синхронизация с системной темой
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      const systemPrefersDark = mediaQuery.matches
      const hasDarkClass = document.documentElement.classList.contains('dark')
      
      if (!hasDarkClass && systemPrefersDark) {
        document.documentElement.classList.add('dark')
        setIsDarkMode(true)
      } else if (hasDarkClass && !systemPrefersDark) {
        document.documentElement.classList.remove('dark')
        setIsDarkMode(false)
      }
    }

    updateTheme()
    mediaQuery.addEventListener('change', updateTheme)
    
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    // Плавное переключение темы для всех элементов
    const elements = document.querySelectorAll('.theme-transition')
    elements.forEach(el => {
      (el as HTMLElement).style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    })
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Убираем transition после завершения
    setTimeout(() => {
      elements.forEach(el => {
        (el as HTMLElement).style.transition = ''
      })
    }, 300)
  }

  return (
    <div className="hidden xl:block w-80 border-l bg-muted/10 h-screen overflow-y-auto theme-transition">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('toc')}
              className={`h-8 px-3 ${activeTab === 'toc' ? 'bg-muted text-muted-foreground' : ''}`}
            >
              Оглавление
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('search')}
              className={`h-8 px-3 ${activeTab === 'search' ? 'bg-muted text-muted-foreground' : ''}`}
            >
              Поиск
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-200" onClick={toggleTheme}>
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
              ) : (
                <Moon className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
              )}
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-200" onClick={onToggle}>
              <PanelRightClose className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
            </Button>
          </div>
        </div>
        
        {/* Контент вкладок */}
        {activeTab === 'toc' && (
          <div className="space-y-1">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Нет заголовков</p>
            ) : (
              items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3"
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
          </div>
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
