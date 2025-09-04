'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation
        items={navigationItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="main-content">
          {activeSection === 'intro' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 1 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Главная идея</h2>
              </div>
              
              <h1 className="text-4xl font-heading font-extrabold mb-4">
                Вы строите не программу лояльности.{' '}
                <span className="text-primary">Вы становитесь владельцем цифрового актива.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Ваша цель — не разовый проект, а масштабируемый бизнес, приносящий стабильный доход. 
                Наша задача — дать вам для этого технологический фундамент "под ключ", который позволит 
                продавать мощную систему лояльности сотням компаний: от ресторанов и фитнес-залов до онлайн-курсов.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Универсальность в ядре</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Мы проектируем систему для легкой адаптации под любую бизнес-модель: ритейл, услуги, e-commerce.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Продукт, а не код</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Вы получаете готовый к продаже продукт с админ-панелью, документацией и безграничным потенциалом роста.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Полное владение</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Весь исходный код и интеллектуальная собственность принадлежат вам. Никаких скрытых платежей или роялти.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>К анализу рынка</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}
          
          {activeSection === 'market' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 2 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Анализ рынка</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">Занять стратегическую нишу</h2>
              <p className="text-muted-foreground mb-8">
                Рынок систем лояльности переполнен, но поляризован. С одной стороны — дорогие и сложные "комбайны" 
                для корпораций. С другой — примитивные "коробочные" решения с нулевой гибкостью. Ваша ниша — 
                золотая середина, самый крупный и голодный сегмент рынка.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                      График конкурентного анализа
                    </div>
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
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Что мы строим?</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}
          
          {/* Добавьте остальные секции аналогично */}
        </div>
      </main>
    </div>
  )
}
