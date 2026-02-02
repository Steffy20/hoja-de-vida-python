import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configuracion.settings')
django.setup()

from hoja_de_vida.models import (
    DatosPersonales, FormacionAcademica, ExperienciaLaboral, 
    ReferenciaPersonal, Curso, Reconocimiento, ProductoAcademico, 
    ProductoLaboral, VentaGarage
)

def poblar_datos():
    # Datos Personales
    print("Poblando Datos Personales...")
    DatosPersonales.objects.all().delete()
    DatosPersonales.objects.create(
        nombres="Carmen Estefanía",
        apellidos="López Solórzano",
        estado_civil="SOLTERA",
        cedula="131786539-0",
        fecha_nacimiento="2000-04-20",
        edad=25,
        direccion="Calle 110 Av. 110 - Tarqui",
        telefono="0993679742",
        email="cl302709@gmail.com"
    )

    # Formacion Academica
    print("Poblando Formación Académica...")
    FormacionAcademica.objects.all().delete()
    FormacionAcademica.objects.create(
        nivel="NIVEL PRIMARIO",
        institucion="Unidad Educativa Fiscal Ramón Virgilio Azua",
        titulo="Enero 2006 - Enero 2012",
        estado="CULMINADO"
    )
    FormacionAcademica.objects.create(
        nivel="NIVEL SECUNDARIO",
        institucion="Unidad Educativa Particular Linus Pauling",
        titulo="Febrero 2012 - Febrero 2016",
        estado="CULMINADO"
    )
    FormacionAcademica.objects.create(
        nivel="NIVEL SECUNDARIO",
        institucion="Unidad Educativa Fiscal 4 de noviembre",
        titulo="Mayo 2016 - Marzo 2018",
        estado="CULMINADO"
    )
    FormacionAcademica.objects.create(
        nivel="NIVEL SUPERIOR",
        institucion="Universidad Laica Eloy Alfaro de Manabí",
        titulo="Estudiante de la Facultad de Ciencias de la vida y Tecnología",
        estado="EN CURSO (2018 - Actualidad)"
    )

    # Experiencia Laboral
    print("Poblando Experiencia Laboral...")
    ExperienciaLaboral.objects.all().delete()
    ExperienciaLaboral.objects.create(
        empresa="Cyber (Abril 2018 - Noviembre 2021)",
        cargo="Asistente Administrativo",
        descripcion="Realización de tramites del IESS, Realización de tramites del Registro Civil, Realización de Documentos Extraviados."
    )
    ExperienciaLaboral.objects.create(
        empresa="MEEL - Diseño, impresión y Publicidad (Enero 2022 - Marzo 2024)",
        cargo="Colaboradora en publicidad",
        descripcion="Realización de diseños y arreglos personalizados."
    )
    ExperienciaLaboral.objects.create(
        empresa="Fruiteam - Frutapac (Diciembre 2024 - Actualmente)",
        cargo="Producción",
        descripcion="Empresa de Exportación de Frutas, cargo en producción"
    )

    # Referencias Personales
    print("Poblando Referencias Personales...")
    ReferenciaPersonal.objects.all().delete()
    ReferenciaPersonal.objects.create(
        nombre="José González",
        telefono="0969008563",
        email="Josegonzalez@gmail.com"
    )
    ReferenciaPersonal.objects.create(
        nombre="Marjorie Solórzano",
        telefono="0979610155",
        email="mayiaj18@gmail.com"
    )
    ReferenciaPersonal.objects.create(
        nombre="Eulogio Rodriguez",
        telefono="0980769355",
        email="eulogio.rodriguez@uleam.edu.ec"
    )
    ReferenciaPersonal.objects.create(
        nombre="Raquel Toala",
        telefono="0997332913",
        email="Fruiteam@gmail.com"
    )

    # Cursos y Certificaciones
    print("Poblando Cursos...")
    Curso.objects.all().delete()
    Curso.objects.create(
        nombre="Curso de fundamentos de programación",
        institucion="Manta Capacita",
        certificado="/static/certificados/Estefania-Lopez-Solorzano-Fundamentos-de-Programacion--Septiembre-2021-Fundamentos-de-Programacion-Manta-Capacita.pdf"
    )
    Curso.objects.create(
        nombre="Curso de introducción a la seguridad cibernética",
        institucion="Cisco",
        certificado="/static/certificados/Carmen EstefaníaLópez Solórzano-LearnAThon_ESPOL-certificate.pdf"
    )
    Curso.objects.create(
        nombre="Programación profesional desde cero con c++",
        institucion="Udemy",
        certificado="/static/certificados/Curso Udemy.pdf"
    )

    # Reconocimientos
    print("Poblando Reconocimientos...")
    Reconocimiento.objects.all().delete()
    Reconocimiento.objects.create(
        tipo_reconocimiento="Académico",
        descripcion="Mejor promedio del semestre",
        entidad_patrocinadora="Universidad Laica Eloy Alfaro de Manabí",
        fecha_reconocimiento="2023-07-15",
        activo=True
    )
    Reconocimiento.objects.create(
        tipo_reconocimiento="Público",
        descripcion="Participación en hackathon universitario",
        entidad_patrocinadora="ESPOL",
        fecha_reconocimiento="2022-11-20",
        activo=True
    )

    # Productos Académicos
    print("Poblando Productos Académicos...")
    ProductoAcademico.objects.all().delete()
    ProductoAcademico.objects.create(
        nombre_recurso="Proyecto de Investigación: Aplicaciones Web con Django",
        clasificador="Investigación",
        descripcion="Desarrollo de aplicaciones web usando Python y Django",
        activo=True
    )
    ProductoAcademico.objects.create(
        nombre_recurso="Artículo: Seguridad Cibernética en Redes",
        clasificador="Publicación",
        descripcion="Análisis de vulnerabilidades en redes corporativas",
        activo=True
    )

    # Productos Laborales
    print("Poblando Productos Laborales...")
    ProductoLaboral.objects.all().delete()
    ProductoLaboral.objects.create(
        nombre_producto="Sistema de Gestión de Clientes",
        fecha_producto="2023-05-10",
        descripcion="Desarrollo de sistema CRM para pequeñas empresas",
        activo=True
    )
    ProductoLaboral.objects.create(
        nombre_producto="Diseño de Campaña Publicitaria",
        fecha_producto="2023-02-15",
        descripcion="Diseño completo de campaña para redes sociales",
        activo=True
    )

    # Venta Garage
    print("Poblando Venta Garage...")
    VentaGarage.objects.all().delete()
    VentaGarage.objects.create(
        nombre_producto="Laptop HP Pavilion",
        estado_producto="Bueno",
        descripcion="Laptop en excelente estado, 8GB RAM, 256GB SSD",
        valor_del_bien=350.00,
        activo=True
    )
    VentaGarage.objects.create(
        nombre_producto="Monitor Samsung 24 pulgadas",
        estado_producto="Regular",
        descripcion="Monitor funcional con pequeño rayón en esquina",
        valor_del_bien=80.00,
        activo=True
    )

    print("Población de datos completada.")

if __name__ == '__main__':
    poblar_datos()

