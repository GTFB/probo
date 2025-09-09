#!/bin/bash

# Script for updating project from probo template
# Used for getting latest changes from upstream

set -e

echo "🔄 Updating project from probo template..."

# Check if we are in a Git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: This is not a Git repository"
    exit 1
fi

# Check if upstream exists
if ! git remote get-url upstream &> /dev/null; then
    echo "❌ Error: Upstream is not configured"
    echo "💡 Run: git remote add upstream https://github.com/GTFB/probo.git"
    exit 1
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Switch to update-from-template branch or create it
if git show-ref --verify --quiet refs/heads/update-from-template; then
    echo "🌿 Switching to update-from-template branch..."
    git checkout update-from-template
else
    echo "🌿 Creating update-from-template branch..."
    git checkout -b update-from-template
fi

# Get latest changes from template
echo "📥 Fetching changes from upstream..."
git fetch upstream

# Merge changes from upstream/main
echo "🔀 Merging changes from upstream/main..."
git merge upstream/main

# Push updates to origin
echo "📤 Pushing updates to origin..."
git push origin update-from-template

# Return to original branch
echo "↩️  Returning to branch $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo ""
echo "✅ Update completed!"
echo ""
echo "📋 Next steps:"
echo "   1. Check changes: git diff main update-from-template"
echo "   2. Create PR from update-from-template to main"
echo "   3. After approval, merge the PR"
echo ""
echo "🔍 To view changes:"
echo "   git log main..update-from-template --oneline"
