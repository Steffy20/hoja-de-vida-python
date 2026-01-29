# CV Carmen Estefanía López Solórzano

Hoja de vida digital interactiva construida con Django (backend) y React (frontend).

### Configuración Automática

El proyecto está completamente configurado para deployment en Render con PostgreSQL.

### Instalación

1. **Instalar dependencias Python**
   ```bash
   pip install -r requirements.txt
   ```

2. **Instalar dependencias Node**
   ```bash
   cd frontend
   npm install
   ```

3. **Construir frontend**
   ```bash
   npm run build
   cd ..
   ```

4. **Ejecutar migraciones**
   ```bash
   python manage.py migrate
   ```

5. **Poblar datos de Carmen**
   ```bash
   python populate_data.py
   ```

6. **Iniciar servidor de desarrollo**
   ```bash
   python manage.py runserver
   ```

7. Abre [http://localhost:8000](http://localhost:8000)

## Características

- **Diseño Moderno**: Layout tipo card con navegación por pestañas
- **Responsive**: Se adapta a todos los tamaños de pantalla
- **Interactivo**: Navegación fluida entre secciones
- **Animaciones**: Transiciones suaves
- **Secciones**: Inicio, Formación, Experiencia, Referencias

## Estructura del Proyecto

```
hoja-de-vida-python-carmen/
├── configuracion/          # Configuración Django
│   ├── settings.py        # Settings (dev + prod)
│   ├── urls.py
│   └── wsgi.py
├── hoja_de_vida/          # App Django
│   ├── models.py          # Modelos de datos
│   ├── serializers.py     # Serializadores DRF
│   └── views.py           # API endpoints
├── frontend/              # React App
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.jsx
│   │   └── App.css
│   └── dist/              # Build de producción
├── populate_data.py       # Script para poblar BD
├── requirements.txt       # Dependencias Python
├── build.sh              # Script de build para Render
├── render.yaml           # Configuración de Render
└── runtime.txt           # Versión de Python

```

## API Endpoints

- `GET /api/cv/` - Obtiene todos los datos del CV
- `GET /admin/` - Panel de administración Django

## Tecnologías

**Backend:**
- Django 4.2
- Django REST Framework
- PostgreSQL (producción) / SQLite (desarrollo)
- Gunicorn
- WhiteNoise

**Frontend:**
- React 18
- Vite
- CSS moderno con animaciones

## Datos del CV

El CV contiene la información de:
- **Carmen Estefanía López Solórzano**
- Formación académica (primaria, secundaria, universidad)
- Experiencia laboral (3 empleos)
- Referencias personales (4 contactos)

## Licencia

Proyecto personal - CV de Carmen López Solórzano
