#!/usr/bin/env bash
set -o errexit

echo "🚀 Iniciando build para Render..."

# Instalar dependencias Python
echo "📦 Instalando dependencias Python..."
pip install -r requirements.txt

# Construir frontend React
echo "⚛️ Construyendo frontend React..."
cd frontend
node -v
npm install
npm run build
echo "📂 Contenido de frontend/dist:"
ls -la dist
if [ -f "dist/index.html" ]; then
    echo "✅ index.html encontrado en frontend/dist"
    # Copiar a una carpeta de templates en la raíz para Django
    cd ..
    mkdir -p templates
    cp frontend/dist/index.html templates/index.html
    echo "📋 index.html copiado a la carpeta templates/ en la raíz"
else
    echo "❌ ERROR: index.html NO encontrado en frontend/dist"
    exit 1
fi

# Collectstatic
echo "📂 Recolectando archivos estáticos..."
python manage.py collectstatic --noinput

# Migraciones
echo "🗃️ Ejecutando migraciones..."
python manage.py migrate

<<<<<<< HEAD
=======
# Reparar mojibake (acentos da?ados)
echo "Reparando textos con encoding incorrecto..."
python manage.py fix_mojibake

# Crear/asegurar superusuario (si hay variables de entorno)
echo "Asegurando superusuario..."
python manage.py ensure_superuser

>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
# Poblar base de datos con datos de Carmen
echo "👤 Poblando base de datos con CV de Carmen López Solórzano..."
python populate_data.py

echo "✅ Build completado exitosamente!"
