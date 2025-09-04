# Probo - Commercial Proposal Generator

## Description
A system for generating commercial proposals based on MDX files with dynamic content management and professional formatting.

## Tech Stack
- **Runtime:** Bun
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **MDX Processing:** @mdx-js/mdx
- **Theme Management:** next-themes
- **UI Components:** Shadcn/ui

## Project Structure
```
probo/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── mdx/                # MDX templates and content
├── docs/                   # Documentation
├── public/                 # Static assets
└── external-storage/       # External storage (.env, database.db)
```

## Features
- MDX-based proposal templates
- Dynamic content injection
- Professional PDF generation
- Theme customization
- Responsive design
- Type-safe development

## Development
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
