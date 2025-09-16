"use client"

import * as React from "react"
import { PanelRightClose, Search, Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchEngine } from "@/components/shared/search-engine"
import { useTheme } from "@/hooks/use-theme"
import { useTranslations } from "@/hooks/use-translations"
import { useRightSectionState } from "../providers/RightSectionStateProvider"
import { LanguageSwitcher } from "@/components/shared/language-switcher"

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

  const [internalActive, setInternalActive] = React.useState<string>("")
  const validIds = React.useMemo(() => new Set(items.map(i => i.id)), [items])
  const currentActive = (activeSection && validIds.has(activeSection)) ? activeSection : internalActive


  React.useEffect(() => {
    if (!items?.length) return

    const headingElements = items
      .map(i => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el))


    if (headingElements.length === 0) return

    let ticking = false

    const setActiveFromScroll = () => {
      ticking = false
      const viewportTop = window.scrollY
      const offset = 120
      let bestId = items[0]?.id || ""

      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= viewportTop + offset) {
          bestId = items[i].id
        } else {
          break
        }
      }

      if (bestId && bestId !== internalActive) {
        setInternalActive(bestId)
        onSectionChange?.(bestId)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(setActiveFromScroll)
        ticking = true
      }
    }

    const observer = new IntersectionObserver(
      () => {
        onScroll()
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    headingElements.forEach(el => observer.observe(el))

    setActiveFromScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll as any)
      observer.disconnect()
    }
  }, [items, onSectionChange, internalActive])

  
  // Get theme from state or use passed default value
  const isDarkMode = theme === 'dark'
  

  const handleSearchResultClick = (result: any) => {
    const element = document.getElementById(result.id)
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const offset = 100
      
      window.scrollTo({
        top: absoluteElementTop - offset,
        behavior: 'smooth'
      })
    } else {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      headings.forEach(heading => {
        if (heading.textContent?.trim() === result.title) {
          const elementRect = heading.getBoundingClientRect()
          const absoluteElementTop = elementRect.top + window.pageYOffset
          const offset = 100
          
          window.scrollTo({
            top: absoluteElementTop - offset,
            behavior: 'smooth'
          })
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

    updateTheme()
  }, [theme])

  const toggleTheme = async () => {
    const newTheme: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const elements = document.querySelectorAll('.theme-transition')
    elements.forEach(el => {
      (el as HTMLElement).style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    })

    setTimeout(() => {
      elements.forEach(el => {
        (el as HTMLElement).style.transition = ''
      })
    }, 300)
  }

  return (
    <div className="hidden lg:block w-80 bg-sidebar-right h-screen theme-transition sticky top-0 scrollbar-hide">
      <div className="h-full overflow-y-auto scrollbar-hide relative">
        <div className="sticky top-0 backdrop-blur-sm z-10 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('toc')}
              className={`h-7 px-0 text-sm hover:bg-muted dark:hover:bg-transparent hover:text-foreground dark:hover:text-white transition-colors duration-200 cursor-pointer ${activeTab === 'toc' ? '' : 'bg-muted text-muted-foreground'}`}
            >
              {t('common.tableOfContents')}
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`h-7 px-0 text-sm hover:bg-muted dark:hover:bg-transparent hover:text-foreground dark:hover:text-white transition-colors duration-200 cursor-pointer ${activeTab === 'search' ? '' : 'bg-muted text-muted-foreground'}`}
            >
              {t('common.search')}
            </button>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher variant="minimal" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 cursor-pointer hover:bg-muted hover:text-muted-foreground" 
              onClick={toggleTheme}
              suppressHydrationWarning
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 transition-colors duration-200" />
              ) : (
                <Moon className="h-4 w-4 transition-colors duration-200" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 cursor-pointer hover:bg-muted hover:text-muted-foreground" 
              onClick={() => {
                setRightSectionState(rightSectionState !== 'open' ? 'open' : 'close')
                onToggle?.()
              }}
            >
              <PanelRightClose className="h-4 w-4 transition-colors duration-200" />
            </Button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="px-4 pt-3 pb-8">
        {activeTab === 'toc' && (
          <div className="space-y-1 relative">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('search.noHeadings')}</p>
            ) : (
              <div className="relative border-0 outline-0">
                {items.map((item) => (
                <button
                  key={item.id}
                  className={`group w-full justify-start text-left h-auto py-1 px-2 text-sm relative hover:bg-muted dark:hover:bg-transparent dark:bg-transparent transition-colors duration-200 cursor-pointer border-0 outline-0 ${currentActive === item.id ? 'text-foreground' : 'text-muted-foreground'}`}
                  style={{ 
                    paddingLeft: `${(item.level - 1) * 12 + 8}px`
                  }}
                  onClick={() => {
                    const element = document.getElementById(item.id)
                    if (element) {
                      // Calculate the position with proper offset
                      const elementRect = element.getBoundingClientRect()
                      const absoluteElementTop = elementRect.top + window.pageYOffset
                      const offset = 100 // Account for header and scroll-mt-20
                      
                      window.scrollTo({
                        top: absoluteElementTop - offset,
                        behavior: 'smooth'
                      })
                      
                      if (item.slug) {
                        const newUrl = `${window.location.pathname}#${item.slug}`
                        window.history.pushState(null, '', newUrl)
                      }
                      setInternalActive(item.id)
                      onSectionChange?.(item.id)
                    } else {
                      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
                      headings.forEach(heading => {
                        if (heading.textContent?.trim() === item.title) {
                          const elementRect = heading.getBoundingClientRect()
                          const absoluteElementTop = elementRect.top + window.pageYOffset
                          const offset = 100
                          
                          window.scrollTo({
                            top: absoluteElementTop - offset,
                            behavior: 'smooth'
                          })
                          
                          if (item.slug) {
                            const newUrl = `${window.location.pathname}#${item.slug}`
                            window.history.pushState(null, '', newUrl)
                          }
                        }
                      })
                    }
                  }}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[1px] transition-colors border-0 outline-0 shadow-none ${
                    currentActive === item.id 
                      ? 'bg-primary group-hover:bg-primary/80' 
                      : 'bg-border group-hover:bg-muted-foreground/60 dark:group-hover:bg-border'
                  }`} />
                  <div className="flex flex-col items-start w-full">
                    <span className={`text-sm truncate w-full transition-colors ${
                      currentActive === item.id 
                        ? 'font-medium text-foreground group-hover:text-foreground' 
                        : 'font-normal text-muted-foreground group-hover:text-foreground'
                    }`}>{item.title}</span>
                  </div>
                </button>
                ))}
              </div>
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
      {/* Fixed gradient overlay at bottom of screen */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20 bg-gradient-to-t from-sidebar to-transparent border-0 outline-0 shadow-none"
      />
    </div>
  )
}
