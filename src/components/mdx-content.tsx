'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXLayout } from './mdx-layout'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
  ctaLink?: string
  ctaText?: string
}

interface MDXContentProps {
  sectionId: string
  onFrontmatterChange?: (frontmatter: MDXFrontmatter) => void
}

// Статические данные для тестирования
const mdxData = {
  intro: {
    content: `
# Главная идея

Вы строите не программу лояльности. **Вы становитесь владельцем цифрового актива.**

Ваша цель — не разовый проект, а масштабируемый бизнес, приносящий стабильный доход. Наша задача — дать вам для этого технологический фундамент "под ключ", который позволит продавать мощную систему лояльности сотням компаний: от ресторанов и фитнес-залов до онлайн-курсов.

## Ключевые преимущества

### Универсальность в ядре
Мы проектируем систему для легкой адаптации под любую бизнес-модель: ритейл, услуги, e-commerce.

### Продукт, а не код
Вы получаете готовый к продаже продукт с админ-панелью, документацией и безграничным потенциалом роста.

### Полное владение
Весь исходный код и интеллектуальная собственность принадлежат вам. Никаких скрытых платежей или роялти.
    `,
    frontmatter: {
      title: "Главная идея",
      icon: "Lightbulb",
      nextButtonText: "К анализу рынка"
    }
  },
  market: {
    content: `
# Анализ рынка

## Занять стратегическую нишу

Рынок систем лояльности переполнен, но поляризован. С одной стороны — дорогие и сложные "комбайны" для корпораций. С другой — примитивные "коробочные" решения с нулевой гибкостью. Ваша ниша — золотая середина, самый крупный и голодный сегмент рынка.

## Конкурентный анализ

### Ваш продукт: "Дюжина"
Мы позиционируем вас как идеальный баланс: вся мощь enterprise-решений в простом и понятном интерфейсе по справедливой цене.

### WalletFactory (Enterprise)
Мощно, кастомно, очень дорого. Недоступно для 95% рынка. **Мы даем 80% их функционала за 10% цены.**

### OSMI Cards (Середняк)
Хороший баланс, но с ограничениями по PUSH и жесткими тарифами. **Мы даем свободу без искусственных лимитов.**

### CardPR (Бюджетник)
Дешево, но без автоматизации и аналитики. **Мы даем мощные инструменты, а не просто "цифровую визитку".**
    `,
    frontmatter: {
      title: "Анализ рынка",
      icon: "TrendingUp",
      nextButtonText: "Что мы строим?"
    }
  },
  product: {
    content: `
# Концепция продукта

## Что именно мы строим: Функциональное ядро

Мы создаем три взаимосвязанных компонента, которые вместе образуют готовый к продаже продукт. Ничего лишнего, только то, что приносит результат.

### A. Панель Владельца Бизнеса

- **Дашборд:** Ключевые бизнес-метрики (LTV, ROI)
- **CRM:** Сегментация по RFM-анализу
- **Программы:** Бонусы, скидки, "штампы"
- **PUSH:** Триггерные и гео-рассылки
- **Интеграции:** Готовый API для касс и CRM

### Б. Опыт Конечного Пользователя

- **Бесшовная установка:** Через QR-код или ссылку в Apple Wallet / Google Pay
- **Никаких лишних приложений:** Все работает нативно в телефоне клиента
- **Прозрачность:** Актуальный баланс и спецпредложения всегда под рукой

### В. Панель Администратора SaaS

- **Управление клиентами:** Создание и администрирование аккаунтов
- **Биллинг:** Управление тарифами и подписками
- **Глобальная аналитика:** Здоровье и рост всей платформы
    `,
    frontmatter: {
      title: "Концепция продукта",
      icon: "Package",
      nextButtonText: "На чем мы это строим?"
    }
  },
  tech: {
    content: `
# Технологический стек

## Технологии: Фундамент для роста

Мы не используем конструкторы или устаревшие фреймворки. Ваш продукт будет построен на современном, масштабируемом и открытом стеке. Это — ваша гарантия скорости, безопасности и возможности развития без ограничений.

### Сердце системы (Backend)

**Payload CMS (Node.js)**. Headless-система, созданная для разработчиков. Дает нам скорость разработки API, гибкую модель данных и готовую, но полностью кастомизируемую админ-панель.

### Интерфейс (Frontend)

**Next.js (React) + Tailwind CSS**. Золотой стандарт современного веба. Гарантирует молниеносную загрузку для пользователей и удобство поддержки для нас.

### Хранилище данных

**PostgreSQL.** Самая мощная и надежная open-source СУБД в мире. Выдержит экспоненциальный рост вашего бизнеса без компромиссов.

### Инфраструктура

**Docker.** Мы упакуем приложение в контейнеры. Это значит, что его можно будет развернуть на любом сервере одной командой, без головной боли и проблем с совместимостью.
    `,
    frontmatter: {
      title: "Технологический стек",
      icon: "Cpu",
      nextButtonText: "Посмотреть план работ"
    }
  },
  roadmap: {
    content: `
# Этапы и сроки

## Дорожная карта: от идеи до прибыли

Мы декомпозировали весь процесс на 4 четких, управляемых этапа. Вы всегда будете знать, на какой стадии находится проект и какой результат будет получен на каждом шаге. **Общий срок: ~9,5 недель.**

### Фаза 1: Архитектура и Дизайн (2 недели)

Разработка детального ТЗ. Проектирование UI/UX в Figma. Создание архитектуры базы данных и API.

**Результат:** Утвержденное ТЗ, интерактивный прототип.

### Фаза 2: Разработка MVP-ядра (3 недели)

Создание модулей регистрации, выпуска карт, базовых PUSH-уведомлений и админ-панели.

**Результат:** Рабочий прототип с основным функционалом.

### Фаза 3: Автоматизация и "Полировка" (3 недели)

Разработка системы триггеров, сегментации, аналитических дашбордов. Оттачивание пользовательского интерфейса.

**Результат:** Полнофункциональная бета-версия.

### Фаза 4: Запуск и Передача (1 неделя)

Комплексное тестирование, развертывание на вашем сервере, передача исходного кода и документации.

**Результат:** Готовый к продаже продукт.
    `,
    frontmatter: {
      title: "Этапы и сроки",
      icon: "Map",
      nextButtonText: "Перейти к инвестициям"
    }
  },
  offer: {
    content: `
# Ваши инвестиции

## Инвестиции в ваш цифровой актив

Мы предлагаем три пакета "под ключ", включающие полный цикл работ: от аналитики и дизайна в Figma до развертывания. Цены отражают ценность и сложность создания SaaS-продукта.

## Тарифные планы

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <div className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
    <h3 className="text-2xl font-bold mb-2">MVP Launch</h3>
    <p className="text-muted-foreground mb-4">Надежный MVP для быстрого выхода на рынок и первых продаж.</p>
    <div className="text-4xl font-bold mb-6">€7,500</div>
    <ul className="space-y-3 mb-8 flex-1">
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Панель владельца бизнеса</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Базовая CRM</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Конструктор карт (1 шаблон)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Массовые PUSH-рассылки</span>
      </li>
    </ul>
    <a href="https://t.me/Loc_Carnal?text=Здравствуйте!%20Меня%20заинтересовала%20ваша%20платформа%20лояльности%20'Дюжина'.%20Хотел%20бы%20обсудить%20детали%20по%20тарифу%20MVP%20Launch" 
       target="_blank" 
       rel="noopener noreferrer"
       className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-center hover:bg-primary/90 transition-colors">
      Выбрать
    </a>
  </div>

  <div className="bg-card border-2 border-primary rounded-lg p-6 flex flex-col h-full relative scale-105 shadow-lg">
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
        Популярный
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-2">Business Core</h3>
    <p className="text-muted-foreground mb-4">Полнофункциональная платформа для активных продаж.</p>
    <div className="text-4xl font-bold mb-6">€12,500</div>
    <ul className="space-y-3 mb-8 flex-1">
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Все из пакета "MVP Launch"</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Продвинутая сегментация</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Автоматические PUSH</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Расширенная аналитика</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Готовый API для интеграций</span>
      </li>
    </ul>
    <a href="https://t.me/Loc_Carnal?text=Здравствуйте!%20Меня%20заинтересовала%20ваша%20платформа%20лояльности%20'Дюжина'.%20Хотел%20бы%20обсудить%20детали%20по%20тарифу%20Business%20Core" 
       target="_blank" 
       rel="noopener noreferrer"
       className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-center hover:bg-primary/90 transition-colors">
      Выбрать
    </a>
  </div>

  <div className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
    <h3 className="text-2xl font-bold mb-2">Market Leader</h3>
    <p className="text-muted-foreground mb-4">Платформа для захвата рынка с уникальными функциями.</p>
    <div className="text-4xl font-bold mb-6">€18,500</div>
    <ul className="space-y-3 mb-8 flex-1">
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Все из пакета "Business Core"</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">White-Label функционал</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Базовый AI-модуль</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">PWA-приложение для админов</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-primary">✓</span>
        <span className="text-sm">Приоритетная поддержка (6 мес.)</span>
      </li>
    </ul>
    <a href="https://t.me/Loc_Carnal?text=Здравствуйте!%20Меня%20заинтересовала%20ваша%20платформа%20лояльности%20'Дюжина'.%20Хотел%20бы%20обсудить%20детали%20по%20тарифу%20Market%20Leader" 
       target="_blank" 
       rel="noopener noreferrer"
       className="w-full border border-border bg-background text-foreground px-4 py-2 rounded-md text-center hover:bg-accent transition-colors">
      Выбрать
    </a>
  </div>
</div>

## Больше чем разработка: Продуктовое партнерство

Создание продукта — это только старт. Мы предлагаем не расставаться после запуска, а перейти на модель долгосрочного партнерства, где мы выступаем как ваша внешняя продуктовая студия. Мы берем на себя развитие, CustDev, маркетинг и техподдержку, позволяя вам сфокусироваться на продажах и стратегии.

**Модель:** Фиксированная ежемесячная плата (от €3,500) + % от дохода платформы.
    `,
    frontmatter: {
      title: "Ваши инвестиции",
      icon: "Gem",
      nextButtonText: "Почему мы?"
    }
  },
  team: {
    content: `
# Наша экспертиза

## Больше, чем разработчики: Ваша продуктовая команда

Мы — не просто фрилансеры. AIMAX — это слаженная команда инженеров, продакт-менеджеров и дизайнеров с опытом запуска 20+ сложных цифровых продуктов. Мы знаем, как превращать идеи в прибыльный бизнес.

### Наш главный актив: Altrp Platform

Мы являемся основателями и ключевыми разработчиками [Altrp.org](https://altrp.org) — open-source low-code платформы. Мы досконально понимаем, как строить масштабируемые и гибкие системы, потому что делаем это каждый день для себя и мирового сообщества.

### Twim.trade

Разработали криптобиржу "под ключ" за 3 месяца. Проект привлек более $1 млн в управление.

### MagiScan.app

Техническое соосновательство, разработка сайта и виджета для 3D-сканера (2+ млн скачиваний).

### Экосистема "ЦВС"

Архитектура и разработка комплексной B2B-экосистемы для ветеринарной службы (REGAGRO).
    `,
    frontmatter: {
      title: "Наша экспертиза",
      icon: "ShieldCheck",
      nextButtonText: "Начать работу"
    }
  },
  next: {
    content: `
# Следующие шаги

## От идеи к первому камню

Мы готовы приступить к работе и превратить вашу идею в успешный продукт. Вот как мы предлагаем двигаться дальше.

### 1. Согласование и контракт

Отвечаем на ваши вопросы, финализируем пакет и подписываем договор с четко зафиксированными этапами, сроками и стоимостью.

### 2. Стратегическая сессия

Проводим установочную встречу (2-3 часа), где детально прорабатываем ТЗ для первого этапа, чтобы на 100% синхронизировать видение.

### 3. Старт работ

Наша команда приступает к Фазе 1. Вы получаете доступ к нашему проектному трекеру и еженедельные отчеты о прогрессе.

## Готовы заложить фундамент вашего цифрового актива?

Свяжитесь с нами, чтобы обсудить детали и начать работу.

**Тимур Акчурин, Руководитель отдела развития, AIMAX**

Telegram: [@Loc_Carnal](https://t.me/Loc_Carnal)
    `,
    frontmatter: {
      title: "Следующие шаги",
      icon: "Rocket",
      nextButtonText: "Начать сначала"
    }
  }
}

export function MDXContent({ sectionId, onFrontmatterChange }: MDXContentProps) {
  const [content, setContent] = useState<string>('')
  const [frontmatter, setFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [loading, setLoading] = useState(true)
  const onFrontmatterChangeRef = useRef(onFrontmatterChange)

  // Обновляем ref при изменении callback
  useEffect(() => {
    onFrontmatterChangeRef.current = onFrontmatterChange
  }, [onFrontmatterChange])

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true)
        
        // Используем статические данные вместо API
        const data = mdxData[sectionId as keyof typeof mdxData]
        
        if (data) {
          setContent(data.content)
          setFrontmatter(data.frontmatter)
          onFrontmatterChangeRef.current?.(data.frontmatter)
        } else {
          setContent(`# Ошибка загрузки контента для раздела ${sectionId}`)
        }
      } catch (error) {
        setContent(`# Ошибка загрузки контента для раздела ${sectionId}`)
      } finally {
        setLoading(false)
      }
    }

    loadMDX()
  }, [sectionId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <MDXLayout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MDXLayout>
  )
}
