.PHONY: install dev build start test lint format clean

# Install dependencies
install:
	bun install

# Start development server
dev:
	bun run dev

# Build for production
build:
	bun run build

# Start production server
start:
	bun run start

# Run tests
test:
	bun test

# Lint code
lint:
	bun run lint

# Format code
format:
	bun run format

# Clean build artifacts
clean:
	rm -rf dist .next node_modules
