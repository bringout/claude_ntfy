#!/bin/bash

# Script to help with releasing new versions

set -e

# Get the current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Ask for new version
echo "Enter new version (or press Enter to keep current version):"
read NEW_VERSION

if [ -z "$NEW_VERSION" ]; then
  NEW_VERSION=$CURRENT_VERSION
fi

# Update version in package.json
npm version $NEW_VERSION --no-git-tag-version

# Run build
echo "Building..."
bun run build

# Commit and tag
git add package.json
git commit -m "Release v$NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo "Ready to push. Run:"
echo "git push origin main"
echo "git push origin v$NEW_VERSION"