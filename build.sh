#!/usr/bin/env bash
set -o errexit

echo "🚀 Iniciando build para Render..."

# Instalar dependencias Python
echo "📦 Instalando dependencias Python..."
pip install -r requirements.txt

# Construir frontend React
echo "⚛️ Construyendo frontend React..."
cd frontend
npm install
npm run build
cd ..

# Collectstatic
echo "📂 Recolectando archivos estáticos..."
python manage.py collectstatic --noinput

# Migraciones
echo "🗃️ Ejecutando migraciones..."
python manage.py migrate

# Poblar base de datos con datos de Carmen
echo "👤 Poblando base de datos con CV de Carmen López Solórzano..."
python populate_data.py

echo "✅ Build completado exitosamente!"
