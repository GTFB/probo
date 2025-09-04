# Probo - Commercial Proposal Generator

## Описание проекта

Система для генерации коммерческих предложений на основе MDX файлов с использованием современного веб-стека.

## Технологический стек

- **Runtime:** Bun
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Theming:** next-themes
- **Content:** MDX
- **MDX Processing:** next-mdx-remote
- **Typography:** @tailwindcss/typography
- **Code Highlighting:** Shiki/Rehype Pretty Code
- **Charts:** Recharts

## Структура проекта

```
probo/
├── docs/
│   ├── TECH_STACK.md
│   └── structure.md
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── navigation.tsx
│   │   ├── competitor-chart.tsx
│   │   └── tariff-card.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── types/
│   │   └── proposal.ts
│   └── mdx/
│       ├── intro.mdx
│       ├── market.mdx
│       ├── product.mdx
│       ├── tech.mdx
│       ├── roadmap.mdx
│       ├── offer.mdx
│       ├── team.mdx
│       └── next.mdx
├── public/
├── external-storage/
├── .env
├── .gitignore
├── LICENSE
├── Makefile
├── package.json
├── postcss.config.js
├── README.md
├── structure.md
├── tailwind.config.js
└── tsconfig.json
```

## Основные функции

- ✅ Генерация коммерческих предложений на основе MDX
- ✅ Адаптивный дизайн с мобильной навигацией
- ✅ Интерактивные графики и диаграммы
- ✅ Тарифные карточки с CTA
- ✅ Современный UI с Shadcn/ui компонентами
- ✅ Типизация TypeScript
- ✅ Оптимизация производительности

## Разработка

### Установка зависимостей
```bash
make install
```

### Запуск в режиме разработки
```bash
make dev
```

### Сборка проекта
```bash
make build
```

### Запуск продакшн версии
```bash
make start
```

### Линтинг и форматирование
```bash
make lint
make format
```

## Окружение

Файлы `.env` и `database.db` находятся в директории `external-storage/`.

## Лицензия

MIT License
