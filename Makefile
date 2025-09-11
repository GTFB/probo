.PHONY: install dev build start test lint format clean start-protocol start-protocol-stash

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

# START protocol: sync branches and clean environment (pre-flight required)
start-protocol:
	sh -c 'if [ -n "$(git status --porcelain)" ]; then echo "Error: Uncommitted changes detected. Commit or stash before running START."; exit 1; else echo "Pre-flight: OK. No uncommitted changes."; fi'
	git switch main
	git pull origin main
	git switch develop
	git pull origin develop
	git merge main || true
	sh -c 'if [ -n "$(git ls-files -u)" ]; then echo "Merge conflicts detected during merge from main into develop. Resolve conflicts and rerun."; exit 1; else echo "Merge successful. No conflicts."; fi'
	sh -c 'git branch --merged develop | grep -v "\\*" | grep -Ev "^(main|develop)$" | xargs -r -n 1 git branch -d 2>/dev/null || true'
	@echo System Initialized. Workspace is clean and synchronized. Awaiting new goal for EXECUTE_TASK protocol.

# START protocol with auto-stash
start-protocol-stash:
	sh -c 'if [ -n "$(git status --porcelain)" ]; then git stash push -u -m auto/START-preflight-stash >/dev/null; echo "Local changes stashed: auto/START-preflight-stash"; else echo "No local changes to stash."; fi'
	git switch main
	git pull origin main
	git switch develop
	git pull origin develop
	git merge main || true
	sh -c 'if [ -n "$(git ls-files -u)" ]; then echo "Merge conflicts detected during merge from main into develop. Resolve conflicts and rerun."; exit 1; else echo "Merge successful. No conflicts."; fi'
	sh -c 'PRUNED=$$(git branch --merged develop | grep -v "\\*" | grep -Ev "^(main|develop)$$"); if [ -n "$$PRUNED" ]; then echo "$$PRUNED" | xargs -r -n 1 git branch -d; echo "Pruned local branches:" $$PRUNED; else echo "No local branches to prune."; fi'
	@echo System Initialized. Workspace is clean and synchronized. Awaiting new goal for EXECUTE_TASK protocol.
