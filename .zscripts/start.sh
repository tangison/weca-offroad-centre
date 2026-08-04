#!/bin/sh

set -e

# Get the directory where this script lives
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR"

# Store the PIDs of all child processes
pids=""

# Cleanup function: gracefully shut down all services
cleanup() {
    echo ""
    echo "Stopping all services..."
    
    # Send SIGTERM to all child processes
    for pid in $pids; do
        if kill -0 "$pid" 2>/dev/null; then
            service_name=$(ps -p "$pid" -o comm= 2>/dev/null || echo "unknown")
            echo "   Stopping process $pid ($service_name)..."
            kill -TERM "$pid" 2>/dev/null
        fi
    done
    
    # Wait for all processes to exit (up to 5 seconds)
    sleep 1
    for pid in $pids; do
        if kill -0 "$pid" 2>/dev/null; then
            # If still running, wait up to 4 more seconds
            timeout=4
            while [ $timeout -gt 0 ] && kill -0 "$pid" 2>/dev/null; do
                sleep 1
                timeout=$((timeout - 1))
            done
            # If still running after that, force kill
            if kill -0 "$pid" 2>/dev/null; then
                echo "   Force killing process $pid..."
                kill -KILL "$pid" 2>/dev/null
            fi
        fi
    done
    
    echo "All services stopped"
    exit 0
}

echo "Starting all services..."
echo ""

# Change to the build directory
cd "$BUILD_DIR" || exit 1

ls -lah

# Initialize the database (if present)
if [ -d "./next-service-dist/db" ] && [ "$(ls -A ./next-service-dist/db 2>/dev/null)" ] && [ -d "/db" ]; then
    echo "Initializing database from ./next-service-dist/db to /db..."
    cp -r ./next-service-dist/db/* /db/ 2>/dev/null || echo "  WARN: Could not copy to /db, skipping database initialization"
    echo "Database initialization complete"
fi

# Start the Next.js server
if [ -f "./next-service-dist/server.js" ]; then
    echo "Starting Next.js server..."
    cd next-service-dist/ || exit 1
    
    # Set environment variables
    export NODE_ENV=production
    export PORT=${PORT:-3000}
    export HOSTNAME=${HOSTNAME:-0.0.0.0}
    
    # Start Next.js in the background
    bun server.js &
    NEXT_PID=$!
    pids="$NEXT_PID"
    
    # Wait briefly to check if the process started successfully
    sleep 1
    if ! kill -0 "$NEXT_PID" 2>/dev/null; then
        echo "ERROR: Next.js server failed to start"
        exit 1
    else
        echo "Next.js server started (PID: $NEXT_PID, Port: $PORT)"
    fi
    
    cd ../
else
    echo "WARN: Next.js server file not found: ./next-service-dist/server.js"
fi

# Start mini-services
if [ -f "./mini-services-start.sh" ]; then
    echo "Starting mini-services..."
    
    # Run the start script (from the root directory; the script handles the mini-services-dist directory internally)
    sh ./mini-services-start.sh &
    MINI_PID=$!
    pids="$pids $MINI_PID"
    
    # Wait briefly to check if the process started successfully
    sleep 1
    if ! kill -0 "$MINI_PID" 2>/dev/null; then
        echo "WARN: mini-services may have failed to start, but continuing..."
    else
        echo "mini-services started (PID: $MINI_PID)"
    fi
elif [ -d "./mini-services-dist" ]; then
    echo "WARN: mini-services start script not found, but the directory exists"
else
    echo "INFO: mini-services directory not found, skipping"
fi

# Start Caddy (if a Caddyfile is present)
echo "Starting Caddy..."

# Caddy runs in the foreground (main process)
echo "Caddy started (running in foreground)"
echo ""
echo "All services started!"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Caddy runs as the main process
exec caddy run --config Caddyfile --adapter caddyfile
