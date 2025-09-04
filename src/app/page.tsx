'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TariffCard } from '@/components/tariff-card'
import { CompetitorChart } from '@/components/competitor-chart'
import { ArrowRight, BarChart3, Users, Gem, BellPlus, Settings2, QrCode, Smartphone, Gift, Swords, CreditCard, Globe } from 'lucide-react'
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
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Что мы строим?</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {activeSection === 'product' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 3 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Концепция продукта</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">Что именно мы строим: Функциональное ядро</h2>
              <p className="text-muted-foreground mb-8">
                Мы создаем три взаимосвязанных компонента, которые вместе образуют готовый к продаже продукт. 
                Ничего лишнего, только то, что приносит результат.
              </p>
              
              <Card className="mb-8">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">A. Панель Владельца Бизнеса</h4>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <BarChart3 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Дашборд:</strong> Ключевые бизнес-метрики (LTV, ROI).</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>CRM:</strong> Сегментация по RFM-анализу.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Gem className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Программы:</strong> Бонусы, скидки, "штампы".</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <BellPlus className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>PUSH:</strong> Триггерные и гео-рассылки.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Settings2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Интеграции:</strong> Готовый API для касс и CRM.</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-4">Б. Опыт Конечного Пользователя</h4>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <QrCode className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Бесшовная установка:</strong> Через QR-код или ссылку в Apple Wallet / Google Pay.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Никаких лишних приложений:</strong> Все работает нативно в телефоне клиента.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Прозрачность:</strong> Актуальный баланс и спецпредложения всегда под рукой.</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-4">В. Панель Администратора SaaS</h4>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <Swords className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Управление клиентами:</strong> Создание и администрирование аккаунтов.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Биллинг:</strong> Управление тарифами и подписками.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span><strong>Глобальная аналитика:</strong> Здоровье и рост всей платформы.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>На чем мы это строим?</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {activeSection === 'tech' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 4 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Технологический стек</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">Технологии: Фундамент для роста</h2>
              <p className="text-muted-foreground mb-8">
                Мы не используем конструкторы или устаревшие фреймворки. Ваш продукт будет построен на современном, 
                масштабируемом и открытом стеке. Это — ваша гарантия скорости, безопасности и возможности развития без ограничений.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Сердце системы (Backend)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <strong>Payload CMS (Node.js)</strong>. Headless-система, созданная для разработчиков. 
                      Дает нам скорость разработки API, гибкую модель данных и готовую, но полностью кастомизируемую админ-панель.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Интерфейс (Frontend)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <strong>Next.js (React) + Tailwind CSS</strong>. Золотой стандарт современного веба. 
                      Гарантирует молниеносную загрузку для пользователей и удобство поддержки для нас.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Хранилище данных</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <strong>PostgreSQL.</strong> Самая мощная и надежная open-source СУБД в мире. 
                      Выдержит экспоненциальный рост вашего бизнеса без компромиссов.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Инфраструктура</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <strong>Docker.</strong> Мы упакуем приложение в контейнеры. Это значит, что его можно будет 
                      развернуть на любом сервере одной командой, без головной боли и проблем с совместимостью.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Посмотреть план работ</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {activeSection === 'roadmap' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 5 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Этапы и сроки</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">Дорожная карта: от идеи до прибыли</h2>
              <p className="text-muted-foreground mb-8">
                Мы декомпозировали весь процесс на 4 четких, управляемых этапа. Вы всегда будете знать, 
                на какой стадии находится проект и какой результат будет получен на каждом шаге. <strong>Общий срок: ~9,5 недель.</strong>
              </p>
              
              <div className="space-y-8 mb-8">
                {[
                  {
                    phase: 'Фаза 1: Архитектура и Дизайн (2 недели)',
                    description: 'Разработка детального ТЗ. Проектирование UI/UX в Figma. Создание архитектуры базы данных и API.',
                    result: 'Утвержденное ТЗ, интерактивный прототип.'
                  },
                  {
                    phase: 'Фаза 2: Разработка MVP-ядра (3 недели)',
                    description: 'Создание модулей регистрации, выпуска карт, базовых PUSH-уведомлений и админ-панели.',
                    result: 'Рабочий прототип с основным функционалом.'
                  },
                  {
                    phase: 'Фаза 3: Автоматизация и "Полировка" (3 недели)',
                    description: 'Разработка системы триггеров, сегментации, аналитических дашбордов. Оттачивание пользовательского интерфейса.',
                    result: 'Полнофункциональная бета-версия.'
                  },
                  {
                    phase: 'Фаза 4: Запуск и Передача (1 неделя)',
                    description: 'Комплексное тестирование, развертывание на вашем сервере, передача исходного кода и документации.',
                    result: 'Готовый к продаже продукт.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <Card className="flex-1">
                      <CardHeader>
                        <CardTitle>{item.phase}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-2">{item.description}</p>
                        <p className="text-sm font-semibold text-primary">Результат: {item.result}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Перейти к инвестициям</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {activeSection === 'offer' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 6 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Ваши инвестиции</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">Инвестиции в ваш цифровой актив</h2>
              <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Мы предлагаем три пакета "под ключ", включающие полный цикл работ: от аналитики и дизайна в Figma до развертывания. 
                Цены отражают ценность и сложность создания SaaS-продукта.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {tariffData.map((tariff, index) => (
                  <TariffCard key={index} {...tariff} />
                ))}
              </div>
              
              <Card className="mb-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-heading font-bold mb-4">Больше чем разработка: Продуктовое партнерство</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
                    Создание продукта — это только старт. Мы предлагаем не расставаться после запуска, а перейти на модель 
                    долгосрочного партнерства, где мы выступаем как ваша внешняя продуктовая студия. Мы берем на себя развитие, 
                    CustDev, маркетинг и техподдержку, позволяя вам сфокусироваться на продажах и стратегии.
                  </p>
                  <p className="font-semibold">
                    Модель: Фиксированная ежемесячная плата (от €3,500) + % от дохода платформы.
                  </p>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Почему мы?</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {activeSection === 'team' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 7 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Наша экспертиза</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">Больше, чем разработчики: Ваша продуктовая команда</h2>
              <p className="text-muted-foreground mb-8">
                Мы — не просто фрилансеры. AIMAX — это слаженная команда инженеров, продакт-менеджеров и дизайнеров 
                с опытом запуска 20+ сложных цифровых продуктов. Мы знаем, как превращать идеи в прибыльный бизнес.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Наш главный актив: Altrp Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Мы являемся основателями и ключевыми разработчиками{' '}
                      <a href="https://altrp.org" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                        Altrp.org
                      </a>{' '}
                      — open-source low-code платформы. Мы досконально понимаем, как строить масштабируемые и гибкие системы, 
                      потому что делаем это каждый день для себя и мирового сообщества.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <a href="https://twim.trade" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                        Twim.trade
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Разработали криптобиржу "под ключ" за 3 месяца. Проект привлек более $1 млн в управление.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <a href="https://magiscan.app" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                        MagiScan.app
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Техническое соосновательство, разработка сайта и виджета для 3D-сканера (2+ млн скачиваний).
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <a href="https://regagro.ru" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                        Экосистема "ЦВС"
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Архитектура и разработка комплексной B2B-экосистемы для ветеринарной службы (REGAGRO).
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Начать работу</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}

          {activeSection === 'next' && (
            <section>
              <div className="md:hidden mb-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Раздел 8 из 8
                </h3>
                <h2 className="text-2xl font-heading font-bold">Следующие шаги</h2>
              </div>
              
              <h2 className="text-3xl font-heading font-bold mb-2">От идеи к первому камню</h2>
              <p className="text-muted-foreground mb-8">
                Мы готовы приступить к работе и превратить вашу идею в успешный продукт. Вот как мы предлагаем двигаться дальше.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  {
                    step: '1. Согласование и контракт',
                    description: 'Отвечаем на ваши вопросы, финализируем пакет и подписываем договор с четко зафиксированными этапами, сроками и стоимостью.'
                  },
                  {
                    step: '2. Стратегическая сессия',
                    description: 'Проводим установочную встречу (2-3 часа), где детально прорабатываем ТЗ для первого этапа, чтобы на 100% синхронизировать видение.'
                  },
                  {
                    step: '3. Старт работ',
                    description: 'Наша команда приступает к Фазе 1. Вы получаете доступ к нашему проектному трекеру и еженедельные отчеты о прогрессе.'
                  }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl font-bold text-primary">{index + 1}.</div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{item.step}</h4>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mb-8 bg-foreground text-background">
                <CardContent className="p-6">
                  <h4 className="font-bold text-xl mb-2">Готовы заложить фундамент вашего цифрового актива?</h4>
                  <p className="opacity-80 mb-4">Свяжитесь с нами, чтобы обсудить детали и начать работу.</p>
                  <p className="font-semibold mb-1">Тимур Акчурин, Руководитель отдела развития, AIMAX</p>
                  <a 
                    href="https://t.me/Loc_Carnal" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    Telegram: @Loc_Carnal
                  </a>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button onClick={handleNextSection} className="gap-2">
                  <span>Начать сначала</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
