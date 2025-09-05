# Influbalance

Клиентский репозиторий для проекта Influbalance, созданный на основе шаблона Probo.

## Описание
Система для генерации коммерческих предложений на основе MDX файлов с динамическим управлением контентом и профессиональным форматированием.

## Tech Stack
- **Runtime:** Bun
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **MDX Processing:** @mdx-js/mdx
- **Theme Management:** next-themes
- **UI Components:** Shadcn/ui

## Структура проекта
```
influbalance/
├── .github/workflows/      # GitHub Actions для автоматизации
├── docs/                   # Документация проекта
├── scripts/                # Скрипты для автоматизации
├── src/                    # Исходный код приложения
│   ├── app/                # Next.js app directory
│   ├── components/         # React компоненты
│   ├── lib/               # Утилиты
│   └── types/             # TypeScript типы
├── content/                # MDX контент
├── public/                # Статические файлы
└── external-storage/       # Внешнее хранилище (.env, database.db)
```

## Features
- MDX-based proposal templates
- Dynamic content injection
- Professional PDF generation
- Theme customization
- Responsive design
- Type-safe development

## Работа с шаблоном

Этот проект создан на основе шаблона [Probo](https://github.com/GTFB/probo) и настроен для получения обновлений.

### Получение обновлений из шаблона

```bash
# Автоматический способ
./scripts/update-from-template.sh

# Ручной способ
git checkout update-from-template
git fetch upstream
git merge upstream/main
git push origin update-from-template
```

### Создание новых функций

```bash
# Создать feature ветку
./scripts/create-feature.sh my-feature-name

# Разработать функцию и создать PR в develop
```

### Структура веток

- `main` - основная ветка (синхронизирована с шаблоном)
- `develop` - ветка разработки
- `feature/*` - ветки для новых функций
- `update-from-template` - ветка для обновлений из шаблона

Подробная документация: [docs/template-workflow.md](docs/template-workflow.md)

## Разработка
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun test
```

## Environment Setup
- `.env` and `database.db` files are stored in external storage directory
- All terminal operations use Makefile commands
- File structure changes are automatically reflected in structure.md
