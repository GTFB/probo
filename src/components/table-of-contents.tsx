"use client"

import * as React from "react"
import { PanelRightClose, Search, Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchEngine } from "@/components/search-engine"
import { useTheme } from "@/hooks/use-theme"
import { useTranslations } from "@/hooks/use-translations"
import { useRightSectionState } from "./providers/RightSectionStateProvider"
import { LanguageSwitcher } from "@/components/language-switcher"

interface TableOfContentsProps {
  items: Array<{
    id: string
    title: string
    level: number
    slug?: string
  }>
  activeSection: string
  onSectionClick: (sectionId: string) => void
  onSectionChange?: (sectionId: string) => void
  onToggle?: () => void
  defaultTheme?: 'light' | 'dark'
}

export function TableOfContents({ items, activeSection, onSectionClick, onSectionChange, onToggle, defaultTheme = 'light', ...props }: TableOfContentsProps) {

  const [activeTab, setActiveTab] = React.useState<'toc' | 'search'>('toc')

  const  {theme, setTheme} = useTheme()
  const {rightSectionState, setRightSectionState} = useRightSectionState()
  const t = useTranslations()

  
  // Get theme from state or use passed default value
  const isDarkMode = theme === 'dark'
  

  const handleSearchResultClick = (result: any) => {
    // Scroll to found element
    const element = document.getElementById(result.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Fallback: search by text
      const headings = document.querySelectorAll('h1, h2, h3')
      headings.forEach(heading => {
        if (heading.textContent?.trim() === result.title) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }

  // Sync with theme state
  React.useEffect(() => {
    const updateTheme = () => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    // Apply theme on load
    updateTheme()
  }, [theme])

  const toggleTheme = async () => {
    // Determine new theme based on current
    const newTheme: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    
    // Update state in cookies
     setTheme(newTheme)
    
    // Apply theme to DOM
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Smooth theme transition for all elements
    const elements = document.querySelectorAll('.theme-transition')
    elements.forEach(el => {
      (el as HTMLElement).style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    })
    
    // Remove transition after completion
    setTimeout(() => {
      elements.forEach(el => {
        (el as HTMLElement).style.transition = ''
      })
    }, 300)
  }

  return (
    <div className="hidden lg:block w-80 bg-muted/10 h-screen theme-transition sticky top-0 scrollbar-hide border-l">
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="sticky top-0 bg-muted/10 backdrop-blur-sm z-10 flex items-center justify-between p-4 border-b mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('toc')}
              className={`h-7 px-2 text-sm ${activeTab === 'toc' ? 'bg-muted text-muted-foreground' : ''}`}
            >
              {t('navigation.tableOfContents')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('search')}
              className={`h-7 px-2 text-sm ${activeTab === 'search' ? 'bg-muted text-muted-foreground' : ''}`}
            >
              {t('common.search')}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="minimal" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-200" 
              onClick={toggleTheme}
              suppressHydrationWarning
            >
              {/* Icon for light theme - hidden in dark theme */}
              <Moon className="h-4 w-4 text-black dark:text-white transition-colors duration-200 dark:hidden" />
              {/* Icon for dark theme - hidden in light theme */}
              <Sun className="h-4 w-4 text-black dark:text-white transition-colors duration-200 hidden dark:block" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted transition-colors duration-200" 
            onClick={() => {
              setRightSectionState(rightSectionState !== 'open' ? 'open' : 'close')
              onToggle?.()
            }}>
              <PanelRightClose className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
            </Button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-4">
        {activeTab === 'toc' && (
          <div className="space-y-1">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('search.noHeadings')}</p>
            ) : (
              items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-1 px-2 text-sm"
                  style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                  onClick={() => {
                    // Scroll to element on page by ID
                    console.log('Trying to scroll to ID:', item.id)
                    const element = document.getElementById(item.id)
                    console.log('Found element:', element)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      
                      // Update URL with hash
                      if (item.slug) {
                        const newUrl = `${window.location.pathname}#${item.slug}`
                        window.history.pushState(null, '', newUrl)
                      }
                    } else {
                      console.log('Element not found, trying alternative method')
                      // Try to find by header text - search all heading levels
                      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
                      headings.forEach(heading => {
                        if (heading.textContent?.trim() === item.title) {
                          heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          
                          // Update URL with hash
                          if (item.slug) {
                            const newUrl = `${window.location.pathname}#${item.slug}`
                            window.history.pushState(null, '', newUrl)
                          }
                        }
                      })
                    }
                  }}
                >
                  <div className="flex flex-col items-start w-full">
                    <span className="text-sm truncate w-full">{item.title}</span>
                  </div>
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
    </div>
  )
}
