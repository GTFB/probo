'use client'

import { useState, useCallback } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { TableOfContents } from '@/components/table-of-contents'
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
  ctaLink?: string
  ctaText?: string
}

const navigationItems: NavigationItem[] = [
  { id: 'intro', title: 'Главная идея', icon: 'Lightbulb', href: '#intro' },
  { id: 'market', title: 'Анализ рынка', icon: 'TrendingUp', href: '#market' },
  { id: 'product', title: 'Концепция продукта', icon: 'Package', href: '#product' },
  { id: 'tech', title: 'Технологический стек', icon: 'Cpu', href: '#tech' },
  { id: 'roadmap', title: 'Этапы и сроки', icon: 'Map', href: '#roadmap' },
  { id: 'offer', title: 'Ваши инвестиции', icon: 'Gem', href: '#offer' },
  { id: 'team', title: 'Наша экспертиза', icon: 'ShieldCheck', href: '#team' },
  { id: 'next', title: 'Следующие шаги', icon: 'Rocket', href: '#next' },
]

// Импортируем иконки для навигации
import {
  Lightbulb,
  TrendingUp,
  Package,
  Cpu,
  Map,
  Gem,
  ShieldCheck,
  Rocket,
} from 'lucide-react'

const navigationItemsWithIcons = [
  { id: 'intro', title: 'Главная идея', icon: Lightbulb, href: '#intro' },
  { id: 'market', title: 'Анализ рынка', icon: TrendingUp, href: '#market' },
  { id: 'product', title: 'Концепция продукта', icon: Package, href: '#product' },
  { id: 'tech', title: 'Технологический стек', icon: Cpu, href: '#tech' },
  { id: 'roadmap', title: 'Этапы и сроки', icon: Map, href: '#roadmap' },
  { id: 'offer', title: 'Ваши инвестиции', icon: Gem, href: '#offer' },
  { id: 'team', title: 'Наша экспертиза', icon: ShieldCheck, href: '#team' },
  { id: 'next', title: 'Следующие шаги', icon: Rocket, href: '#next' },
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('intro')
  const [currentFrontmatter, setCurrentFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentToc, setCurrentToc] = useState<Array<{ id: string; title: string; level: number }>>([])
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)

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

  const sectionNumber = navigationItems.findIndex(item => item.id === activeSection) + 1

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        {/* Десктопный левый сайдбар */}
        {isLeftSidebarOpen && (
          <AppSidebar
            items={navigationItemsWithIcons}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onToggle={() => setIsLeftSidebarOpen(false)}
          />
        )}
        
        {/* Основной контент */}
        <main className={`flex-1 overflow-y-auto ${isRightSidebarOpen ? 'xl:pr-80' : ''}`}>
          {/* Мобильная навигация */}
          <div className="lg:hidden">
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Menu className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <Gem className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">Дюжина</h2>
                          <p className="text-xs text-muted-foreground">Коммерческое предложение</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {navigationItemsWithIcons.map((item) => {
                          const Icon = item.icon
                          const isActive = activeSection === item.id
                          
                          return (
                            <Button
                              key={item.id}
                              variant={isActive ? "default" : "ghost"}
                              className="w-full justify-start"
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
                      Раздел {sectionNumber} из 8
                    </h3>
                    <h2 className="text-lg font-heading font-bold">
                      {currentFrontmatter?.title || navigationItems.find(item => item.id === activeSection)?.title}
                    </h2>
                  </div>
                </div>
                
                {/* Мобильное оглавление */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <List className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-4">Оглавление</h3>
                      <div className="space-y-1">
                        {currentToc.map((item) => (
                          <Button
                            key={item.id}
                            variant="ghost"
                            size="sm"
                            className={`w-full justify-start text-left h-auto py-2 px-3 ${
                              activeSection === item.id ? "bg-accent text-accent-foreground" : ""
                            }`}
                            style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                            onClick={() => {
                              // Прокручиваем к элементу на странице
                              const element = document.querySelector(`h${item.level}`)
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' })
                              }
                            }}
                          >
                            <span className="text-sm truncate">{item.title}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Контент */}
          <div className="p-4 sm:p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              {/* Кнопки управления сайдбарами (только на десктопе) */}
              <div className="hidden lg:flex gap-2 mb-4">
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

              <section>
                <div className="mb-8">
                  <MDXContent 
                    sectionId={activeSection} 
                    onFrontmatterChange={handleFrontmatterChange}
                    onTocChange={handleTocChange}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNextSection} className="gap-2">
                    <span>
                      {currentFrontmatter?.nextButtonText || 'Следующий раздел'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Десктопное правое оглавление */}
        {isRightSidebarOpen && (
          <TableOfContents
            items={currentToc}
            activeSection={activeSection}
            onSectionClick={handleSectionChange}
            onToggle={() => setIsRightSidebarOpen(false)}
          />
        )}
      </div>
    </SidebarProvider>
  )
}
