'use client'

import { useState, useCallback, useEffect } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { TableOfContents } from '@/components/table-of-contents'
import { PROJECT_SETTINGS, NAVIGATION_ITEMS } from '@/lib/settings'
import { SearchEngine } from '@/components/search-engine'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/mdx-content'
import { ArrowRight, Menu, X, List, Sun, Moon } from 'lucide-react'
import { NavigationItem } from '@/types/proposal'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SidebarProvider } from '@/components/ui/sidebar'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
  prevButtonText?: string
  ctaLink?: string
  ctaText?: string
}

// Use navigation from settings
const navigationItems: NavigationItem[] = NAVIGATION_ITEMS.map(item => ({
  id: item.id,
  title: item.title,
  icon: item.icon,
  href: item.href
}))

// Import icons for navigation (keep only those used in getIconByName)
import {
  FileText,
  Component,
  Users,
  Cpu,
  Share2,
  TestTube,
  CheckCircle,
  Code,
} from 'lucide-react'

// Function to get icon by name from frontmatter
const getIconByName = (iconName: string) => {
  const iconMap: Record<string, any> = {
    FileText,
    Component,
    Users,
    Cpu,
    Share2,
    TestTube,
    CheckCircle,
    Code,
  }
  return iconMap[iconName] || Component // Fallback to Component if icon not found
}

// Use navigation with icons from settings
const navigationItemsWithIcons = NAVIGATION_ITEMS

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('1')
  const [currentFrontmatter, setCurrentFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentToc, setCurrentToc] = useState<Array<{ id: string; title: string; level: number }>>([])
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [isRightOffcanvasOpen, setIsRightOffcanvasOpen] = useState(false)
  const [isContentLoading, setIsContentLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // При серверном рендеринге всегда возвращаем false
    if (typeof window === 'undefined') return false
    
    // При клиентском рендеринге проверяем localStorage
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme === 'dark'
      }
      // Если нет сохраненной темы, используем системную
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      // Fallback: используем системную тему
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      } catch {
        return false
      }
    }
  })

  // Устанавливаем состояние гидратации и применяем тему
  useEffect(() => {
    setIsHydrated(true)
    
    // Дополнительная проверка и применение темы после гидратации
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        const isDark = savedTheme === 'dark'
        setIsDarkMode(isDark)
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } else {
        // Если нет сохраненной темы, используем системную
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(prefersDark)
        if (prefersDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }, [])

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }, [])

  const handleNextSection = useCallback(() => {
    const currentIndex = navigationItems.findIndex(item => item.id === activeSection)
    const nextIndex = (currentIndex + 1) % navigationItems.length
    setActiveSection(navigationItems[nextIndex].id)
    // Прокручиваем наверх страницы
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  const handlePrevSection = useCallback(() => {
    const currentIndex = navigationItems.findIndex(item => item.id === activeSection)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : navigationItems.length - 1
    setActiveSection(navigationItems[prevIndex].id)
    // Прокручиваем наверх страницы
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  const handleFrontmatterChange = useCallback((frontmatter: MDXFrontmatter) => {
    setCurrentFrontmatter(frontmatter)
  }, [])

  const handleTocChange = useCallback((toc: Array<{ id: string; title: string; level: number }>) => {
    setCurrentToc(toc)
  }, [])

  const handleH1Change = useCallback((h1Title: string) => {
    // Handle H1 title change if needed
  }, [])

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsContentLoading(loading)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    // Сохраняем тему в localStorage с дополнительной проверкой
    try {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    } catch (error) {
      console.warn('Не удалось сохранить тему в localStorage:', error)
    }
    
    // Сразу применяем изменения к DOM
    if (newTheme) {
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
  }, [isDarkMode])

  const sectionNumber = navigationItems.findIndex(item => item.id === activeSection) + 1

  // Определяем классы для сетки на основе состояния
  let lgGridColsClass = 'lg:grid-cols-1'; // По умолчанию, если оба закрыты
  if (isLeftSidebarOpen && isRightSidebarOpen) {
    lgGridColsClass = 'lg:grid-cols-[auto_1fr_auto]';
  } else if (isLeftSidebarOpen) {
    lgGridColsClass = 'lg:grid-cols-[auto_1fr]';
  } else if (isRightSidebarOpen) {
    lgGridColsClass = 'lg:grid-cols-[1fr_auto]';
  }

  return (
    <div className={`min-h-screen grid grid-cols-1 ${lgGridColsClass}`}>
        {/* Desktop left sidebar */}
        {isLeftSidebarOpen && (
          <div className="hidden lg:block">
            <SidebarProvider defaultOpen={true}>
              <AppSidebar
                items={navigationItemsWithIcons}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                onToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              />
            </SidebarProvider>
          </div>
        )}
        
        {/* Central section: Header, Content, Footer */}
        <div className="flex flex-col min-h-screen">
          {/* Sticky Header for desktop */}
          <div className="hidden lg:block sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l border-b">
            <div className={`px-4 sm:px-6 md:px-10 flex items-center transition-all duration-300 ease-in-out`} style={{ height: '72px' }}>
              <div className="flex items-center justify-between w-full">
                <div className={`flex items-center gap-4 transition-all duration-300 ease-in-out ${isLeftSidebarOpen ? '' : 'lg:ml-0'}`}>
                  <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 rounded-lg flex items-center justify-center">
                    {(() => {
                      const IconComponent = getIconByName(currentFrontmatter?.icon || 'Gem')
                      return <IconComponent className="w-4 h-4 text-white dark:text-black" />
                    })()}
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">{currentFrontmatter?.title || 'Загрузка...'}</h1>
                    <p className="text-xs text-muted-foreground">Раздел {sectionNumber} из {navigationItems.length}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!isLeftSidebarOpen && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsLeftSidebarOpen(true)}
                    >
                      <Menu className="w-4 h-4 mr-2" />
                      Навигация
                    </Button>
                  )}
                  {!isRightSidebarOpen && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsRightSidebarOpen(true)}
                    >
                      <List className="w-4 h-4 mr-2" />
                      Оглавление
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            {/* Mobile navigation */}
            <div className="lg:hidden">
              <div className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="flex items-center justify-between px-4 py-3" style={{ height: '72px' }}>
                  <div className="flex items-center gap-3">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Menu className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 p-0">
                        <div className="px-6 py-3 flex items-center justify-between" style={{ height: '72px' }}>
                          <div className="flex items-center gap-2">
                            <div>
                              <h2 className="text-lg font-semibold">{PROJECT_SETTINGS.name}</h2>
                              <p className="text-xs text-muted-foreground">{PROJECT_SETTINGS.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-2">
                          <div className="space-y-1">
                            {navigationItemsWithIcons.map((item) => {
                              const Icon = item.icon
                              const isActive = activeSection === item.id
                              
                              return (
                                <Button
                                  key={item.id}
                                  variant="ghost"
                                  className={`w-full justify-start h-9 px-3 ${isActive ? "bg-accent" : ""}`}
                                  onClick={() => handleSectionChange(item.id)}
                                >
                                  <Icon className="w-4 h-4 mr-3" />
                                  <span>{item.title}</span>
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 rounded-lg hidden sm:flex items-center justify-center">
                        {(() => {
                          const IconComponent = getIconByName(currentFrontmatter?.icon || 'Gem')
                          return <IconComponent className="w-4 h-4 text-white dark:text-black" />
                        })()}
                      </div>
                      <div className="text-left">
                        <h2 className="text-sm font-medium">{currentFrontmatter?.title || 'Загрузка...'}</h2>
                        <p className="text-xs text-muted-foreground">Раздел {sectionNumber} из {navigationItems.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Sheet open={isRightOffcanvasOpen} onOpenChange={setIsRightOffcanvasOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <List className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-80 p-0">
                        <div className="px-4 py-3 flex items-center justify-between" style={{ height: '72px' }}>
                          <div className="flex items-center gap-2">
                            <div>
                              <h2 className="text-base font-semibold">Оглавление</h2>
                              <p className="text-xs text-muted-foreground">Навигация по разделу</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-muted transition-colors duration-200 mr-5" 
                            onClick={toggleTheme}
                          >
                            {isDarkMode ? (
                              <Sun className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
                            ) : (
                              <Moon className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
                            )}
                          </Button>
                        </div>
                        <div className="px-2 py-2 overflow-y-auto scrollbar-hide h-[calc(100vh-72px)]">
                          <div className="space-y-1 mb-6">
                            {currentToc.length === 0 ? (
                              <p className="text-sm text-muted-foreground">Нет заголовков</p>
                            ) : (
                              currentToc.map((item) => (
                                <Button
                                  key={item.id}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-left h-auto py-2 px-3"
                                  style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                                  onClick={() => {
                                    const element = document.getElementById(item.id)
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    } else {
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
                          
                          <div className="border-t pt-4 px-2">
                            <h4 className="text-sm font-semibold mb-2">Поиск</h4>
                            <SearchEngine 
                              onResultClick={(result) => {
                                const element = document.getElementById(result.id)
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                } else {
                                  const headings = document.querySelectorAll('h1, h2, h3')
                                  headings.forEach(heading => {
                                    if (heading.textContent?.trim() === result.title) {
                                      heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                  })
                                }
                              }}
                              onSectionChange={handleSectionChange}
                            />
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pb-16 px-4 sm:px-6 md:px-6 lg:px-10 mobile-header-offset">
              <div className="w-full">
                <section>
                  <div className="mb-8">
                    <MDXContent 
                      sectionId={activeSection} 
                      onFrontmatterChange={handleFrontmatterChange}
                      onTocChange={handleTocChange}
                      onH1Change={handleH1Change}
                      onLoadingChange={handleLoadingChange}
                    />
                  </div>
                </section>
              </div>
            </div>
          </main>
          
          {/* Footer */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t py-2 h-16 z-30">
            <div className="flex flex-col gap-2 p-4 items-center justify-center h-full">
              {/* Desktop navigation */}
              <div className={`hidden lg:flex w-full gap-4 ${
                currentFrontmatter?.prevButtonText && currentFrontmatter?.nextButtonText 
                  ? 'justify-between' 
                  : currentFrontmatter?.prevButtonText 
                    ? 'justify-start' 
                    : 'justify-end'
              }`}>
                {currentFrontmatter?.prevButtonText && (
                  <Button variant="outline" size="sm" onClick={handlePrevSection}>
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    {currentFrontmatter.prevButtonText}
                  </Button>
                )}
                
                {!isContentLoading && currentFrontmatter?.nextButtonText && (
                  <Button variant="outline" size="sm" onClick={handleNextSection}>
                    <span>
                      {currentFrontmatter.nextButtonText}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>

              {/* Mobile navigation */}
              <div className={`lg:hidden flex w-full px-4 gap-4 ${
                currentFrontmatter?.prevButtonText && currentFrontmatter?.nextButtonText 
                  ? 'justify-between' 
                  : currentFrontmatter?.prevButtonText 
                    ? 'justify-start' 
                    : 'justify-end'
              }`}>
                {currentFrontmatter?.prevButtonText && (
                  <Button variant="outline" size="sm" onClick={handlePrevSection}>
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Назад
                  </Button>
                )}
                
                {!isContentLoading && currentFrontmatter?.nextButtonText && (
                  <Button variant="outline" size="sm" onClick={handleNextSection}>
                    <span>Вперед</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop right table of contents */}
        {isRightSidebarOpen && (
          <div className="hidden lg:block" style={{zIndex: 100}}>
            <TableOfContents
              items={currentToc}
              activeSection={activeSection}
              onSectionClick={handleSectionChange}
              onSectionChange={handleSectionChange}
              onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            />
          </div>
        )}
      </div>
  )
}
