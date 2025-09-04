'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/mdx-content'
import { ArrowRight } from 'lucide-react'
import { NavigationItem } from '@/types/proposal'

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

const sectionTitles = {
  intro: 'Главная идея',
  market: 'Анализ рынка',
  product: 'Концепция продукта',
  tech: 'Технологический стек',
  roadmap: 'Этапы и сроки',
  offer: 'Ваши инвестиции',
  team: 'Наша экспертиза',
  next: 'Следующие шаги'
}

const nextButtonTexts = {
  intro: 'К анализу рынка',
  market: 'Что мы строим?',
  product: 'На чем мы это строим?',
  tech: 'Посмотреть план работ',
  roadmap: 'Перейти к инвестициям',
  offer: 'Почему мы?',
  team: 'Начать работу',
  next: 'Начать сначала'
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('intro')

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  const handleNextSection = () => {
    const currentIndex = navigationItems.findIndex(item => item.id === activeSection)
    const nextIndex = (currentIndex + 1) % navigationItems.length
    setActiveSection(navigationItems[nextIndex].id)
  }

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
                {sectionTitles[activeSection as keyof typeof sectionTitles]}
              </h2>
            </div>

            {/* MDX контент для всех секций */}
            <div className="mb-8">
              <MDXContent sectionId={activeSection} />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNextSection} className="gap-2">
                <span>
                  {nextButtonTexts[activeSection as keyof typeof nextButtonTexts]}
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
