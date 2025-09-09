# Template Workflow Process

This document describes the process of working with a client repository created from the probo template.

## Branch Structure

### Main Branches

- **`main`** - main client branch, synchronized with template
- **`develop`** - client development branch
- **`update-from-template`** - branch for getting updates from template

### Feature Branches

- **`feature/*`** - branches for developing new features
- Created from `main` branch
- Merged into `develop` via Pull Request

## Update Process

### Automatic Method

```bash
# Use the ready-made script
./scripts/update-from-template.sh
```

### Manual Method

```bash
# 1. Switch to update branch
git checkout update-from-template

# 2. Get latest changes from template
git fetch upstream
git merge upstream/main

# 3. Push updates to origin
git push origin update-from-template

# 4. Create Pull Request from update-from-template to main
```

## Development Process

### Creating a New Feature

```bash
# 1. Create feature branch
./scripts/create-feature.sh user-authentication

# 2. Develop the feature
# ... код ...

# 3. Commit changes
git add .
git commit -m "feat: add user authentication"

# 4. Push to origin
git push origin feature/user-authentication

# 5. Create Pull Request to develop
```

### Working with Existing Feature Branch

```bash
# Switch to branch
git checkout feature/user-authentication

# Update from main (if needed)
git checkout main
git pull origin main
git checkout feature/user-authentication
git merge main

# Continue development...
```

## Deployment Process

### Release Preparation

```bash
# 1. Ensure all feature branches are merged into develop
git checkout develop
git pull origin develop

# 2. Create release branch
git checkout -b release/v1.0.0

# 3. Test and fix bugs
# ... тестирование ...

# 4. Create Pull Request from release to main
```

### Deploy to Production

```bash
# 1. After PR approval, merge to main
git checkout main
git pull origin main

# 2. Create release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 3. Deploy to production
# ... процесс деплоя ...
```

## Conflict Resolution

### When Updating from Template

If conflicts arise when merging with `upstream/main`:

```bash
# 1. Resolve conflicts manually
git status  # view conflicting files
# ... редактировать файлы ...

# 2. Add resolved files
git add <resolved-files>

# 3. Complete merge
git commit

# 4. Push changes
git push origin update-from-template
```

### When Merging Feature Branches

```bash
# 1. Update develop
git checkout develop
git pull origin develop

# 2. Switch to feature branch
git checkout feature/my-feature

# 3. Merge develop
git merge develop

# 4. Resolve conflicts
# ... редактировать файлы ...

# 5. Complete merge
git add .
git commit

# 6. Push changes
git push origin feature/my-feature
```

## Useful Commands

### View Changes

```bash
# View changes between branches
git diff main..develop

# View commits between branches
git log main..develop --oneline

# View changes in file
git diff HEAD~1 -- <file>
```

### Working with Remote

```bash
# View all remotes
git remote -v

# Update upstream
git fetch upstream

# View upstream branches
git branch -r
```

### Cleanup

```bash
# Delete local branch
git branch -d feature/old-feature

# Удалить remote ветку
git push origin --delete feature/old-feature

# Очистить неиспользуемые ветки
git remote prune origin
```
