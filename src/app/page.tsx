'use client'

import { useState, useCallback } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { TableOfContents } from '@/components/table-of-contents'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/mdx-content'
import { ArrowRight, Menu, X } from 'lucide-react'
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

  const sectionNumber = navigationItems.findIndex(item => item.id === activeSection) + 1

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar
          items={navigationItemsWithIcons}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Мобильная навигация */}
            <div className="lg:hidden mb-6">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="mb-4">
                    <Menu className="w-4 h-4 mr-2" />
                    Меню
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
            </div>

            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел {sectionNumber} из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">
                  {currentFrontmatter?.title || navigationItems.find(item => item.id === activeSection)?.title}
                </h2>
              </div>

              <div className="mb-8">
                <MDXContent 
                  sectionId={activeSection} 
                  onFrontmatterChange={handleFrontmatterChange}
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
        </main>

        <TableOfContents
          items={navigationItems.map((item, index) => ({
            id: item.id,
            title: item.title,
            level: 1
          }))}
          activeSection={activeSection}
          onSectionClick={handleSectionChange}
        />
      </div>
    </SidebarProvider>
  )
}
