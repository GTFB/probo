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
- **Interactive Diagrams:** react-zoom-pan-pinch

## Структура проекта

```
probo/
├── docs/
│   ├── mermaid-configuration.md
│   ├── TECH_STACK.md
│   └── structure.md
├── content/
│   ├── components.mdx
│   ├── intro.mdx
│   ├── market.mdx
│   ├── next.mdx
│   ├── offer.mdx
│   ├── product.mdx
│   ├── roadmap.mdx
│   ├── team.mdx
│   └── tech.mdx
├── settings.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── mdx/
│   │   │       └── [sectionId]/
│   │   │           └── route.ts
│   │   ├── dashboard/
│   │   │   ├── data.json
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── chart-area-interactive.tsx
│   │   ├── competitor-chart.tsx
│   │   ├── data-table.tsx
│   │   ├── interactive-mermaid.tsx
│   │   ├── mdx-content.tsx
│   │   ├── mdx-content-new.tsx
│   │   ├── mdx-content-old.tsx
│   │   ├── mdx-layout.tsx
│   │   ├── mdx-renderer-new.tsx
│   │   ├── mdx-renderer.tsx
│   │   ├── nav-documents.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-projects.tsx
│   │   ├── nav-secondary.tsx
│   │   ├── nav-user.tsx
│   │   ├── navigation.tsx
│   │   ├── search-engine.tsx
│   │   ├── search-form.tsx
│   │   ├── section-cards.tsx
│   │   ├── site-header.tsx
│   │   ├── table-of-contents.tsx
│   │   └── tariff-card.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── mermaid-config.ts
│   │   ├── settings.ts
│   │   └── utils.ts
│   └── types/
│       └── proposal.ts
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── probo.svg
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
- ✅ Интерактивные Mermaid диаграммы с зумом и панорамированием
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
