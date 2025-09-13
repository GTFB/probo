# Probo - Commercial Proposal Generator

## Project Description

A system for generating commercial proposals based on MDX files using a modern web stack.

## Technology Stack

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

## Project Structure

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
│   │   │   ├── auth/
│   │   │   │   └── route.ts
│   │   │   └── mdx/
│   │   │       └── [sectionId]/
│   │   │           └── route.ts
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── data.json
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
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
│   │   ├── blocks app/
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── nav-documents.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-projects.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── site-header.tsx
│   │   │   └── table-of-contents.tsx
│   │   ├── shared/
│   │   │   ├── chart-area-interactive.tsx
│   │   │   ├── code-highlight.tsx
│   │   │   ├── competitor-chart.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── interactive-mermaid.tsx
│   │   │   ├── language-switcher.tsx
│   │   │   ├── mdx-content.tsx
│   │   │   ├── mdx-layout.tsx
│   │   │   ├── mdx-renderer.tsx
│   │   │   ├── mermaid-diagram.tsx
│   │   │   ├── password-groups-info.tsx
│   │   │   ├── password-prompt.tsx
│   │   │   ├── search-engine.tsx
│   │   │   ├── search-form.tsx
│   │   │   ├── section-cards.tsx
│   │   │   └── tariff-card.tsx
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

## Main Features

- ✅ MDX-based commercial proposal generation
- ✅ Responsive design with mobile navigation
- ✅ Interactive charts and diagrams
- ✅ Interactive Mermaid diagrams with zoom and pan
- ✅ Tariff cards with CTA
- ✅ Modern UI with Shadcn/ui components
- ✅ TypeScript typing
- ✅ Performance optimization

## Development

### Install Dependencies
```bash
make install
```

### Run in Development Mode
```bash
make dev
```

### Build Project
```bash
make build
```

### Run Production Version
```bash
make start
```

### Linting and Formatting
```bash
make lint
make format
```

## Environment

`.env` and `database.db` files are located in the `external-storage/` directory.

## License

MIT License
