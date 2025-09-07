# Probo

Client repository for the Probo project, created based on the Probo template.

## Description
System for generating commercial proposals based on MDX files with dynamic content management and professional formatting.

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
├── .github/workflows/      # GitHub Actions for automation
├── docs/                   # Project documentation
├── scripts/                # Automation scripts
├── src/                    # Application source code
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
├── content/                # MDX content
├── public/                # Static files
└── external-storage/       # External storage (.env, database.db)
```

## Features
- MDX-based proposal templates
- Dynamic content injection
- Professional PDF generation
- Theme customization
- Responsive design
- Type-safe development

## Working with Template

This project is created based on the [Probo](https://github.com/GTFB/probo) template and configured to receive updates.

### Setting up Upstream for Git Pull

To receive updates from the original Probo template, you need to configure the upstream remote:

```bash
# Add upstream remote pointing to the original template
git remote add upstream https://github.com/GTFB/probo.git

# Verify remotes are configured correctly
git remote -v
# Should show:
# origin    https://github.com/GTFB/probo.git (fetch)
# origin    https://github.com/GTFB/probo.git (push)
# upstream  https://github.com/GTFB/probo.git (fetch)
# upstream  https://github.com/GTFB/probo.git (push)

# Fetch latest changes from upstream
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main
```

**Note:** If you're working with a fork of the Probo template, replace the upstream URL with the original template repository URL.

### Getting Updates from Template

```bash
# Automatic way
./scripts/update-from-template.sh

# Manual way
git checkout update-from-template
git fetch upstream
git merge upstream/main
git push origin update-from-template
```

### Creating New Features

```bash
# Create feature branch
./scripts/create-feature.sh my-feature-name

# Develop feature and create PR to develop
```

### Branch Structure

- `main` - main branch (synchronized with template)
- `develop` - development branch
- `feature/*` - branches for new features
- `update-from-template` - branch for template updates

Detailed documentation: [docs/template-workflow.md](docs/template-workflow.md)

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
