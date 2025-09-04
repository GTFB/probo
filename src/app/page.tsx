'use client'

import { useState, useCallback } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/mdx-content'
import { ArrowRight } from 'lucide-react'
import { NavigationItem } from '@/types/proposal'

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

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('intro')
  const [currentFrontmatter, setCurrentFrontmatter] = useState<MDXFrontmatter | null>(null)

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation
        items={navigationItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="main-content">
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
    </div>
  )
}
