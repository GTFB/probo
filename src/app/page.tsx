'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TariffCard } from '@/components/tariff-card'
import { CompetitorChart } from '@/components/competitor-chart'
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

const chartData = [
  { name: 'Цена', 'Дюжина': 4, 'WalletFactory': 1, 'OSMI Cards': 3, 'CardPR': 5 },
  { name: 'Функционал', 'Дюжина': 5, 'WalletFactory': 5, 'OSMI Cards': 4, 'CardPR': 2 },
  { name: 'Простота', 'Дюжина': 5, 'WalletFactory': 2, 'OSMI Cards': 4, 'CardPR': 5 },
  { name: 'Интеграции', 'Дюжина': 4, 'WalletFactory': 5, 'OSMI Cards': 4, 'CardPR': 1 },
  { name: 'Гибкость', 'Дюжина': 5, 'WalletFactory': 3, 'OSMI Cards': 4, 'CardPR': 2 },
]

const tariffData = [
  {
    title: 'MVP Launch',
    description: 'Надежный MVP для быстрого выхода на рынок и первых продаж.',
    price: '€7,500',
    features: [
      'Панель владельца бизнеса',
      'Базовая CRM',
      'Конструктор карт (1 шаблон)',
      'Массовые PUSH-рассылки'
    ],
    ctaText: 'Выбрать',
    ctaLink: 'https://t.me/Loc_Carnal?text=Здравствуйте!%20Меня%20заинтересовала%20ваша%20платформа%20лояльности%20\'Дюжина\'.%20Хотел%20бы%20обсудить%20детали%20по%20тарифу%20MVP%20Launch'
  },
  {
    title: 'Business Core',
    description: 'Полнофункциональная платформа для активных продаж.',
    price: '€12,500',
    features: [
      'Все из пакета "MVP Launch"',
      'Продвинутая сегментация',
      'Автоматические PUSH',
      'Расширенная аналитика',
      'Готовый API для интеграций'
    ],
    isRecommended: true,
    isPopular: true,
    ctaText: 'Выбрать',
    ctaLink: 'https://t.me/Loc_Carnal?text=Здравствуйте!%20Меня%20заинтересовала%20ваша%20платформа%20лояльности%20\'Дюжина\'.%20Хотел%20бы%20обсудить%20детали%20по%20тарифу%20Business%20Core'
  },
  {
    title: 'Market Leader',
    description: 'Платформа для захвата рынка с уникальными функциями.',
    price: '€18,500',
    features: [
      'Все из пакета "Business Core"',
      'White-Label функционал',
      'Базовый AI-модуль',
      'PWA-приложение для админов',
      'Приоритетная поддержка (6 мес.)'
    ],
    ctaText: 'Выбрать',
    ctaLink: 'https://t.me/Loc_Carnal?text=Здравствуйте!%20Меня%20заинтересовала%20ваша%20платформа%20лояльности%20\'Дюжина\'.%20Хотел%20бы%20обсудить%20детали%20по%20тарифу%20Market%20Leader'
  }
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

  const renderSectionContent = () => {
    const sectionNumber = navigationItems.findIndex(item => item.id === activeSection) + 1

    return (
      <section>
        <div className="md:hidden mb-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Раздел {sectionNumber} из 8
          </h3>
          <h2 className="text-2xl font-heading font-bold">{sectionTitles[activeSection as keyof typeof sectionTitles]}</h2>
        </div>

        {/* Специальные секции с интерактивными элементами */}
        {activeSection === 'market' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <Card>
              <CardContent className="p-6">
                <CompetitorChart data={chartData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="font-bold">Ваш продукт: "Дюжина"</h4>
                  <p className="text-sm text-muted-foreground">
                    Мы позиционируем вас как идеальный баланс: вся мощь enterprise-решений в простом и понятном интерфейсе по справедливой цене.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-muted-foreground">WalletFactory (Enterprise)</h4>
                  <p className="text-sm text-muted-foreground">
                    Мощно, кастомно, очень дорого. Недоступно для 95% рынка.{' '}
                    <strong className="text-primary">Мы даем 80% их функционала за 10% цены.</strong>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-muted-foreground">OSMI Cards (Середняк)</h4>
                  <p className="text-sm text-muted-foreground">
                    Хороший баланс, но с ограничениями по PUSH и жесткими тарифами.{' '}
                    <strong className="text-primary">Мы даем свободу без искусственных лимитов.</strong>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-muted-foreground">CardPR (Бюджетник)</h4>
                  <p className="text-sm text-muted-foreground">
                    Дешево, но без автоматизации и аналитики.{' '}
                    <strong className="text-primary">Мы даем мощные инструменты, а не просто "цифровую визитку".</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'offer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tariffData.map((tariff, index) => (
              <TariffCard key={index} {...tariff} />
            ))}
          </div>
        )}

        {/* MDX контент для всех секций */}
        <div className="mb-8">
          <MDXContent sectionId={activeSection} />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNextSection} className="gap-2">
            <span>
              {activeSection === 'intro' && 'К анализу рынка'}
              {activeSection === 'market' && 'Что мы строим?'}
              {activeSection === 'product' && 'На чем мы это строим?'}
              {activeSection === 'tech' && 'Посмотреть план работ'}
              {activeSection === 'roadmap' && 'Перейти к инвестициям'}
              {activeSection === 'offer' && 'Почему мы?'}
              {activeSection === 'team' && 'Начать работу'}
              {activeSection === 'next' && 'Начать сначала'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation
        items={navigationItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="main-content">
          {renderSectionContent()}
        </div>
      </main>
    </div>
  )
}
