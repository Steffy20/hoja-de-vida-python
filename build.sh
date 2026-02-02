#!/usr/bin/env bash
set -o errexit

echo "Starting Render build..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Build React frontend
echo "Building React frontend..."
cd frontend
node -v
npm install
npm run build
echo "frontend/dist contents:"
ls -la dist
if [ -f "dist/index.html" ]; then
    echo "index.html found in frontend/dist"
    # Copy to templates/ for Django
    cd ..
    mkdir -p templates
    cp frontend/dist/index.html templates/index.html
    echo "index.html copied to templates/"
else
    echo "ERROR: index.html not found in frontend/dist"
    exit 1
fi

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Build completed."
