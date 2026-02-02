import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configuracion.settings')
django.setup()

from hoja_de_vida.models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso

def _seed_if_empty(model, label, seed_fn):
    if model.objects.exists():
        print(f"Skipping {label}: already has data.")
        return
    seed_fn()

def poblar_datos():
    seed_data = os.environ.get('SEED_DATA', 'True').lower() in ('true', '1', 'yes')
    if not seed_data:
        print("SEED_DATA is disabled. Skipping seed.")
        return

    # Datos Personales
    def seed_datos_personales():
        print("Poblando Datos Personales...")
        DatosPersonales.objects.create(
            nombres="Carmen EstefanÃ­a",
            apellidos="LÃ³pez SolÃ³rzano",
            estado_civil="SOLTERA",
            cedula="131786539-0",
            fecha_nacimiento="2000-04-20",
            edad=25,
            direccion="Calle 110 Av. 110 - Tarqui",
            telefono="0993679742",
            email="cl302709@gmail.com"
        )
    _seed_if_empty(DatosPersonales, "Datos Personales", seed_datos_personales)

    # Formacion Academica
    def seed_formacion():
        print("Poblando FormaciÃ³n AcadÃ©mica...")
        FormacionAcademica.objects.create(
            nivel="NIVEL PRIMARIO",
            institucion="Unidad Educativa Fiscal RamÃ³n Virgilio Azua",
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
            institucion="Universidad Laica Eloy Alfaro de ManabÃ­",
            titulo="Estudiante de la Facultad de Ciencias de la vida y TecnologÃ­a",
            estado="EN CURSO (2018 - Actualidad)"
        )
    _seed_if_empty(FormacionAcademica, "Formacion Academica", seed_formacion)

    # Experiencia Laboral
    def seed_experiencia():
        print("Poblando Experiencia Laboral...")
        ExperienciaLaboral.objects.create(
            empresa="Cyber (Abril 2018 - Noviembre 2021)",
            cargo="Asistente Administrativo",
            descripcion="RealizaciÃ³n de tramites del IESS, RealizaciÃ³n de tramites del Registro Civil, RealizaciÃ³n de Documentos Extraviados."
        )
        ExperienciaLaboral.objects.create(
            empresa="MEEL - DiseÃ±o, impresiÃ³n y Publicidad (Enero 2022 - Marzo 2024)",
            cargo="Colaboradora en publicidad",
            descripcion="RealizaciÃ³n de diseÃ±os y arreglos personalizados."
        )
        ExperienciaLaboral.objects.create(
            empresa="Fruiteam - Frutapac (Diciembre 2024 - Actualmente)",
            cargo="ProducciÃ³n",
            descripcion="Empresa de ExportaciÃ³n de Frutas, cargo en producciÃ³n"
        )
    _seed_if_empty(ExperienciaLaboral, "Experiencia Laboral", seed_experiencia)

    # Referencias Personales
    def seed_referencias():
        print("Poblando Referencias Personales...")
        ReferenciaPersonal.objects.create(
            nombre="JosÃ© GonzÃ¡lez",
            telefono="0969008563",
            email="Josegonzalez@gmail.com"
        )
        ReferenciaPersonal.objects.create(
            nombre="Marjorie SolÃ³rzano",
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
    _seed_if_empty(ReferenciaPersonal, "Referencias Personales", seed_referencias)

    # Cursos y Certificaciones
    def seed_cursos():
        print("Poblando Cursos...")
        Curso.objects.create(
            nombre="Curso de fundamentos de programaciÃ³n",
            institucion="Manta Capacita",
            certificado="/static/certificados/Estefania-Lopez-Solorzano-Fundamentos-de-Programacion--Septiembre-2021-Fundamentos-de-Programacion-Manta-Capacita.pdf"
        )
        Curso.objects.create(
            nombre="Curso de introducciÃ³n a la seguridad cibernÃ©tica",
            institucion="Cisco",
            certificado="/static/certificados/Carmen EstefanÃ­aLÃ³pez SolÃ³rzano-LearnAThon_ESPOL-certificate.pdf"
        )
        Curso.objects.create(
            nombre="ProgramaciÃ³n profesional desde cero con c++",
            institucion="Udemy",
            certificado="/static/certificados/Curso Udemy.pdf"
        )
    _seed_if_empty(Curso, "Cursos", seed_cursos)

    print("PoblaciÃ³n de datos completada.")

if __name__ == '__main__':
    poblar_datos()
