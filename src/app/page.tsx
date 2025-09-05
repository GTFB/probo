'use client'

import { useState, useCallback } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { TableOfContents } from '@/components/table-of-contents'
import { SearchEngine } from '@/components/search-engine'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/mdx-content'
import { ArrowRight, Menu, X, List } from 'lucide-react'
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

const navigationItems: NavigationItem[] = [
  { id: '1-intro', title: 'Введение и цели проекта', icon: 'FileText', href: '#1-intro' },
  { id: '2-functions', title: 'Функциональные требования', icon: 'Component', href: '#2-functions' },
  { id: '3-use-cases', title: 'Пользовательские сценарии', icon: 'Users', href: '#3-use-cases' },
  { id: '4-tech-spec', title: 'Технические требования', icon: 'Cpu', href: '#4-tech-spec' },
  { id: '5-api', title: 'Программные интерфейсы (API)', icon: 'Share2', href: '#5-api' },
  { id: '6-tests', title: 'Процедура приемки', icon: 'ClipboardCheck', href: '#6-tests' },
  { id: '7-finish', title: 'Заключение и План Реализации', icon: 'Rocket', href: '#7-finish' },
]

// Импортируем иконки для навигации
import {
  FileText,
  Component,
  Users,
  Cpu,
  Share2,
  ClipboardCheck,
  Rocket,
} from 'lucide-react'

// Функция для получения иконки по имени
const getIconByName = (iconName: string) => {
  const iconMap: Record<string, any> = {
    FileText,
    Component,
    Users,
    Cpu,
    Share2,
    ClipboardCheck,
    Rocket,
  }
  return iconMap[iconName] || Component // Fallback к Component если иконка не найдена
}

const navigationItemsWithIcons = [
  { id: '1-intro', title: 'Введение и цели проекта', icon: FileText, href: '#1-intro' },
  { id: '2-functions', title: 'Функциональные требования', icon: Component, href: '#2-functions' },
  { id: '3-use-cases', title: 'Пользовательские сценарии', icon: Users, href: '#3-use-cases' },
  { id: '4-tech-spec', title: 'Технические требования', icon: Cpu, href: '#4-tech-spec' },
  { id: '5-api', title: 'Программные интерфейсы (API)', icon: Share2, href: '#5-api' },
  { id: '6-tests', title: 'Процедура приемки', icon: ClipboardCheck, href: '#6-tests' },
  { id: '7-finish', title: 'Заключение и План Реализации', icon: Rocket, href: '#7-finish' },
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('1-intro')
  const [currentFrontmatter, setCurrentFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentToc, setCurrentToc] = useState<Array<{ id: string; title: string; level: number }>>([])
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [currentH1Title, setCurrentH1Title] = useState<string>('')
  const [isContentLoading, setIsContentLoading] = useState(true)

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }, [])

  const handleNextSection = useCallback(() => {
    const currentIndex = navigationItems.findIndex(item => item.id === activeSection)
    const nextIndex = (currentIndex + 1) % navigationItems.length
    setActiveSection(navigationItems[nextIndex].id)
  }, [activeSection])

  const handleFrontmatterChange = useCallback((frontmatter: MDXFrontmatter) => {
    setCurrentFrontmatter(frontmatter)
  }, [])

  const handleTocChange = useCallback((toc: Array<{ id: string; title: string; level: number }>) => {
    setCurrentToc(toc)
  }, [])

  const handleH1Change = useCallback((h1Title: string) => {
    setCurrentH1Title(h1Title)
  }, [])

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsContentLoading(loading)
  }, [])

  const sectionNumber = navigationItems.findIndex(item => item.id === activeSection) + 1

  return (
    <SidebarProvider defaultOpen={true}>
      <style jsx global>{`
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        /* Единый анимационный стиль для всех элементов */
        .sidebar-sync-animation {
          transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, right 0.3s ease-in-out, margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out !important;
        }
        
        /* Простая анимация для сайдбаров */
        .sidebar-animation {
          transition: transform 0.3s ease-in-out !important;
        }
        
        .sidebar-animation.hidden {
          transform: translateX(-100%) !important;
        }
        
        .sidebar-animation.visible {
          transform: translateX(0) !important;
        }
        
        .right-sidebar-animation {
          transition: transform 0.3s ease-in-out !important;
        }
        
        .right-sidebar-animation.hidden {
          transform: translateX(100%) !important;
        }
        
        .right-sidebar-animation.visible {
          transform: translateX(0) !important;
        }
        
        /* Синхронная анимация тем для всех элементов */
        .theme-transition {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
      `}</style>
      <div className="flex min-h-screen">
        {/* Десктопный левый сайдбар */}
        <div className={`hidden lg:block fixed left-0 top-0 h-full z-40 sidebar-animation ${
          isLeftSidebarOpen ? 'visible' : 'hidden'
        }`}>
          <AppSidebar
            items={navigationItemsWithIcons}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          />
        </div>
        
        {/* Sticky Header для десктопа */}
        <div 
          className="hidden lg:block fixed top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sidebar-sync-animation theme-transition"
          style={{
            left: isLeftSidebarOpen ? '16rem' : '0',
            right: isRightSidebarOpen ? '20rem' : '0'
          }}
        >
          <div className={`px-4 sm:px-6 md:px-10 h-25 flex items-center transition-all duration-300 ease-in-out`}>
            <div className="flex items-center justify-between w-full">
              <div className={`flex items-center gap-4 transition-all duration-300 ease-in-out ${isLeftSidebarOpen ? '' : 'lg:ml-0'}`}>
                <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 rounded-lg flex items-center justify-center">
                  {(() => {
                    const IconComponent = getIconByName(currentFrontmatter?.icon || 'Gem')
                    return <IconComponent className="w-4 h-4 text-white dark:text-black" />
                  })()}
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    {currentH1Title || currentFrontmatter?.title || navigationItems.find(item => item.id === activeSection)?.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Раздел {sectionNumber} из {navigationItems.length}
                  </p>
                </div>
              </div>
              
              {/* Кнопки управления сайдбарами */}
              <div className="flex gap-2">
                {!isLeftSidebarOpen && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsLeftSidebarOpen(true)}
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    Показать навигацию
                  </Button>
                )}
                {!isRightSidebarOpen && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsRightSidebarOpen(true)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Показать оглавление
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Основной контент */}
        <main 
          className="flex-1 overflow-y-auto sidebar-sync-animation theme-transition"
          style={{
            marginLeft: isLeftSidebarOpen ? '16rem' : '0',
            marginRight: isRightSidebarOpen ? '20rem' : '0'
          }}
        >
          {/* Мобильная навигация */}
          <div className="lg:hidden">
            <div className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <div className="flex items-center justify-between p-6 h-25">
                <div className="flex items-center gap-3">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Menu className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 rounded-lg flex items-center justify-center">
                          {(() => {
                            const IconComponent = getIconByName(currentFrontmatter?.icon || 'Gem')
                            return <IconComponent className="w-4 h-4 text-white dark:text-black" />
                          })()}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">INFLUBALANCE</h2>
                          <p className="text-xs text-muted-foreground">AI-powered outreach platform</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {navigationItemsWithIcons.map((item) => {
                          const Icon = item.icon
                          const isActive = activeSection === item.id
                          
                          return (
                            <Button
                              key={item.id}
                              variant="ghost"
                              className={`w-full justify-start ${isActive ? "bg-accent" : ""}`}
                              onClick={() => handleSectionChange(item.id)}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              {item.title}
                            </Button>
                          )
                        })}
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                                                <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                  Раздел {sectionNumber} из {navigationItems.length}
                                </h3>
                                <h1 className="text-lg font-heading font-bold">
                                  {currentH1Title || currentFrontmatter?.title || navigationItems.find(item => item.id === activeSection)?.title}
                                </h1>
                              </div>
                </div>
                
                {/* Мобильное оглавление с поиском */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <List className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-4">Оглавление</h3>
                      
                      {/* TOC - оглавление текущего раздела */}
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
                      
                      {/* Поиск */}
                      <div className="border-t pt-4">
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

          {/* Контент */}
          <div className={`pt-20 px-4 sm:px-6 md:px-10 pb-16 main-content-animation`}>
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

                {/* Фиксированный футер с навигацией */}
                <div 
                  className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t py-2 h-16 z-30 sidebar-sync-animation theme-transition"
                  style={{
                    left: isLeftSidebarOpen ? '16rem' : '0',
                    right: isRightSidebarOpen ? '20rem' : '0'
                  }}
                >
                  <div className="flex flex-col gap-2 p-2 items-center justify-center h-full">
                    {/* Десктопная навигация */}
                    <div className="hidden lg:flex gap-2">
                      {currentFrontmatter?.prevButtonText && (
                        <Button variant="outline" size="sm" disabled>
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

                    {/* Мобильная навигация */}
                    <div className="lg:hidden flex gap-2 w-full px-4">
                      {currentFrontmatter?.prevButtonText && (
                        <Button variant="outline" size="sm" className="flex-1" disabled>
                          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                          Назад
                        </Button>
                      )}
                      
                      {!isContentLoading && currentFrontmatter?.nextButtonText && (
                        <Button variant="outline" size="sm" className="flex-1" onClick={handleNextSection}>
                          <span>Вперед</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Десктопное правое оглавление */}
        <div className={`fixed right-0 top-0 h-full z-40 right-sidebar-animation ${
          isRightSidebarOpen ? 'visible' : 'hidden'
        }`}>
          <TableOfContents
            items={currentToc}
            activeSection={activeSection}
            onSectionClick={handleSectionChange}
            onSectionChange={handleSectionChange}
            onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          />
        </div>
      </div>
    </SidebarProvider>
  )
}
