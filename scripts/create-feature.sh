#!/bin/bash

# Script for creating a new feature branch
# Used for developing new features

set -e

# Check arguments
if [ $# -eq 0 ]; then
    echo "❌ Error: Please specify feature branch name"
    echo "💡 Usage: $0 <feature-name>"
    echo "📝 Example: $0 user-authentication"
    exit 1
fi

FEATURE_NAME=$1
FEATURE_BRANCH="feature/$FEATURE_NAME"

echo "🌿 Creating feature branch: $FEATURE_BRANCH"

# Check if we are in a Git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: This is not a Git repository"
    exit 1
fi

# Check if branch exists
if git show-ref --verify --quiet refs/heads/$FEATURE_BRANCH; then
    echo "⚠️  Branch $FEATURE_BRANCH already exists"
    read -p "Switch to it? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout $FEATURE_BRANCH
        echo "✅ Switched to branch $FEATURE_BRANCH"
    fi
    exit 0
fi

# Switch to main and update it
echo "📍 Switching to main..."
git checkout main

echo "🔄 Updating main from origin..."
git pull origin main

# Create new feature branch
echo "🌿 Creating branch $FEATURE_BRANCH..."
git checkout -b $FEATURE_BRANCH

echo ""
echo "✅ Feature branch created!"
echo ""
echo "📋 Information:"
echo "   Branch: $FEATURE_BRANCH"
echo "   Based on: main"
echo ""
echo "🔧 Next steps:"
echo "   1. Develop the feature"
echo "   2. git add ."
echo "   3. git commit -m 'feat: add $FEATURE_NAME'"
echo "   4. git push origin $FEATURE_BRANCH"
echo "   5. Create PR to develop"
