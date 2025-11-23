#!/bin/bash

# Exit on error
set -e

# Configuration
DIST_DIR="dist/ngx-logging-kit"
PROJECT_NAME="ngx-logging-kit"

# Parse arguments
DRY_RUN=false
for arg in "$@"
do
    if [ "$arg" == "--dry-run" ]; then
        DRY_RUN=true
    fi
done

# Check npm login status
echo "👤 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "⚠️  You are not logged in to npm."
    echo "🔑  Please log in..."
    npm login
    
    if ! npm whoami > /dev/null 2>&1; then
        echo "❌  Login failed. Aborting."
        exit 1
    fi
else
    echo "✅  Logged in as $(npm whoami)"
fi

echo "🚀 Starting publication process for $PROJECT_NAME..."

# 1. Clean
echo "🧹 Cleaning dist directory..."
rm -rf $DIST_DIR

# 2. Build
echo "🏗️  Building library..."
ng build $PROJECT_NAME --configuration production

# 3. Copy Assets
echo "COPYING assets..."
cp README.md $DIST_DIR/
cp LICENSE $DIST_DIR/

# 4. Publish
echo "📦 Publishing..."
cd $DIST_DIR

# Extract version from the BUILT package.json in the dist folder
VERSION=$(node -p "require('./package.json').version")
echo "ℹ️  Detected version: $VERSION"

PUBLISH_CMD="npm publish --access public"

# Check if version is a prerelease (contains a hyphen)
if [[ "$VERSION" == *"-"* ]]; then
    echo "⚠️  Prerelease version detected. Adding '--tag next'."
    PUBLISH_CMD="$PUBLISH_CMD --tag next"
fi

if [ "$DRY_RUN" = true ]; then
    echo "Running in DRY-RUN mode. Packing instead of publishing."
    echo "Would run: $PUBLISH_CMD"
    npm pack
    echo "✅ Pack complete. Check the .tgz file in $DIST_DIR."
else
    echo "Publishing to npm..."
    $PUBLISH_CMD
    echo "✅ Published successfully!"
fi
