#!/bin/bash

# Redirect stderr to stdout so execute_command does not fail on stderr output
exec 2>&1

set -e

# Get the directory where this script lives (workspace-agent/.zscripts)
# Use $0 to get the script path (compatible with sh and bash)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Next.js project path
NEXTJS_PROJECT_DIR="/home/z/my-project"

# Check if the Next.js project directory exists
if [ ! -d "$NEXTJS_PROJECT_DIR" ]; then
    echo "ERROR: Next.js project directory does not exist: $NEXTJS_PROJECT_DIR"
    exit 1
fi

echo "Starting build of Next.js app and mini-services..."
echo "Next.js project path: $NEXTJS_PROJECT_DIR"

# Change to the Next.js project directory
cd "$NEXTJS_PROJECT_DIR" || exit 1

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1

BUILD_DIR="/tmp/build_fullstack_$BUILD_ID"
echo "Cleaning and creating build directory: $BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Install dependencies
echo "Installing dependencies..."
bun install

# Build the Next.js app
echo "Building Next.js app..."
bun run build

# Build mini-services
# Check if the Next.js project directory has a mini-services subdirectory
if [ -d "$NEXTJS_PROJECT_DIR/mini-services" ]; then
    echo "Building mini-services..."
    # Use the mini-services scripts from the workspace-agent directory
    sh "$SCRIPT_DIR/mini-services-install.sh"
    sh "$SCRIPT_DIR/mini-services-build.sh"

    # Copy mini-services-start.sh into the mini-services-dist directory
    echo "  - Copy mini-services-start.sh to $BUILD_DIR"
    cp "$SCRIPT_DIR/mini-services-start.sh" "$BUILD_DIR/mini-services-start.sh"
    chmod +x "$BUILD_DIR/mini-services-start.sh"
else
    echo "INFO: mini-services directory not found, skipping"
fi

# Copy all build artifacts into the temporary build directory
echo "Collecting build artifacts into $BUILD_DIR..."

# Copy the Next.js standalone build output
if [ -d ".next/standalone" ]; then
    echo "  - Copy .next/standalone"
    cp -r .next/standalone "$BUILD_DIR/next-service-dist/"
fi

# Copy the Next.js static files
if [ -d ".next/static" ]; then
    echo "  - Copy .next/static"
    mkdir -p "$BUILD_DIR/next-service-dist/.next"
    cp -r .next/static "$BUILD_DIR/next-service-dist/.next/"
fi

# Copy the public directory
if [ -d "public" ]; then
    echo "  - Copy public"
    cp -r public "$BUILD_DIR/next-service-dist/"
fi

# Finally, migrate the database to BUILD_DIR/db
if [ "$(ls -A ./db 2>/dev/null)" ]; then
    echo "Database file detected, running database migration..."
    DATABASE_URL=file:$BUILD_DIR/db/custom.db bun run db:push
    echo "Database migration complete"
    ls -lah $BUILD_DIR/db
else
    echo "INFO: db directory is empty, skipping database migration"
fi

# Copy Caddyfile (if it exists)
if [ -f "Caddyfile" ]; then
    echo "  - Copy Caddyfile"
    cp Caddyfile "$BUILD_DIR/"
else
    echo "INFO: Caddyfile not found, skipping"
fi

# Copy the start.sh script
echo "  - Copy start.sh to $BUILD_DIR"
cp "$SCRIPT_DIR/start.sh" "$BUILD_DIR/start.sh"
chmod +x "$BUILD_DIR/start.sh"

# Package into $BUILD_DIR.tar.gz
PACKAGE_FILE="${BUILD_DIR}.tar.gz"
echo ""
echo "Packaging build artifacts into $PACKAGE_FILE..."
cd "$BUILD_DIR" || exit 1
tar -czf "$PACKAGE_FILE" .
cd - > /dev/null || exit 1

# # Clean up the temporary directory
# rm -rf "$BUILD_DIR"

echo ""
echo "Build complete! All artifacts have been packaged into $PACKAGE_FILE"
echo "Package file size:"
ls -lh "$PACKAGE_FILE"
