#!/usr/bin/env bash
set -o errexit

echo "Running DB tasks..."
python manage.py migrate --noinput
python manage.py fix_mojibake
python manage.py ensure_superuser
python populate_data.py

echo "Starting server..."
gunicorn app:app
