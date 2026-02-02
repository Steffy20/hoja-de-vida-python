from django.db import models

class DatosPersonales(models.Model):
    SEXO_CHOICES = [
        ('H', 'Hombre'),
        ('M', 'Mujer'),
    ]
    
    # Campos originales
    nombres = models.CharField(max_length=60)
    apellidos = models.CharField(max_length=60)
    estado_civil = models.CharField(max_length=50, blank=True, null=True)
    cedula = models.CharField(max_length=10, unique=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)  # direccion_domiciliaria
    telefono = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    
    # Nuevos campos según especificación
    descripcion_perfil = models.CharField(max_length=50, blank=True, null=True)
    perfil_activo = models.BooleanField(default=True)
    nacionalidad = models.CharField(max_length=20, blank=True, null=True)
    lugar_nacimiento = models.CharField(max_length=60, blank=True, null=True)
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES, blank=True, null=True)
    licencia_conducir = models.CharField(max_length=6, blank=True, null=True)
    telefono_convencional = models.CharField(max_length=15, blank=True, null=True)
    telefono_fijo = models.CharField(max_length=15, blank=True, null=True)
    direccion_trabajo = models.CharField(max_length=50, blank=True, null=True)
    sitio_web = models.CharField(max_length=60, blank=True, null=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
    
    class Meta:
        verbose_name = "Datos Personales"
        verbose_name_plural = "Datos Personales"


class FormacionAcademica(models.Model):
    nivel = models.CharField(max_length=100)
    institucion = models.CharField(max_length=200)
    titulo = models.CharField(max_length=200)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.titulo} - {self.institucion}"
    
    class Meta:
        verbose_name = "Formación Académica"
        verbose_name_plural = "Formaciones Académicas"


class ExperienciaLaboral(models.Model):
    # Campos originales
    empresa = models.CharField(max_length=50)  # nombre_empresa
    cargo = models.CharField(max_length=100)  # cargo_desempenado
    descripcion = models.TextField(blank=True, null=True)  # descripcion_funciones
    fecha_inicio = models.DateField(blank=True, null=True)  # fecha_inicio_gestion
    fecha_fin = models.DateField(blank=True, null=True)  # fecha_fin_gestion
    
    # Nuevos campos según especificación
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='experiencias')
    lugar_empresa = models.CharField(max_length=50, blank=True, null=True)
    email_empresa = models.CharField(max_length=100, blank=True, null=True)
    sitio_web_empresa = models.CharField(max_length=100, blank=True, null=True)
    nombre_contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono_contacto = models.CharField(max_length=60, blank=True, null=True)
    activo = models.BooleanField(default=True)  # activar_para_que_se_vea_en_front
    ruta_certificado = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.cargo} en {self.empresa}"
    
    class Meta:
        verbose_name = "Experiencia Laboral"
        verbose_name_plural = "Experiencias Laborales"
        ordering = ['-fecha_inicio']


class ReferenciaPersonal(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='referencias')

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Referencia Personal"
        verbose_name_plural = "Referencias Personales"


class Curso(models.Model):
    # Campos originales
    nombre = models.CharField(max_length=100)  # nombre_curso
    institucion = models.CharField(max_length=100, blank=True, null=True)  # entidad_patrocinadora
    fecha = models.DateField(blank=True, null=True)  # Para compatibilidad
    certificado = models.CharField(max_length=500, blank=True, null=True)  # ruta_certificado
    
    # Nuevos campos según especificación
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='cursos')
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    total_horas = models.IntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    nombre_contacto_auspicia = models.CharField(max_length=100, blank=True, null=True)
    telefono_contacto_auspicia = models.CharField(max_length=60, blank=True, null=True)
    email_empresa_patrocinadora = models.CharField(max_length=60, blank=True, null=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} - {self.institucion}"
    
    class Meta:
        verbose_name = "Curso Realizado"
        verbose_name_plural = "Cursos Realizados"


class Reconocimiento(models.Model):
    TIPO_CHOICES = [
        ('Académico', 'Académico'),
        ('Público', 'Público'),
        ('Privado', 'Privado'),
    ]
    
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='reconocimientos')
    tipo_reconocimiento = models.CharField(max_length=100, choices=TIPO_CHOICES, blank=True, null=True)
    fecha_reconocimiento = models.DateField(blank=True, null=True)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    entidad_patrocinadora = models.CharField(max_length=100, blank=True, null=True)
    nombre_contacto_auspicia = models.CharField(max_length=100, blank=True, null=True)
    telefono_contacto_auspicia = models.CharField(max_length=60, blank=True, null=True)
    activo = models.BooleanField(default=True)
    ruta_certificado = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_reconocimiento} - {self.descripcion}"
    
    class Meta:
        verbose_name = "Reconocimiento"
        verbose_name_plural = "Reconocimientos"


class ProductoAcademico(models.Model):
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='productos_academicos')
    nombre_recurso = models.CharField(max_length=100)
    clasificador = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre_recurso
    
    class Meta:
        verbose_name = "Producto Académico"
        verbose_name_plural = "Productos Académicos"


class ProductoLaboral(models.Model):
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='productos_laborales')
    nombre_producto = models.CharField(max_length=100)
    fecha_producto = models.DateField(blank=True, null=True)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre_producto
    
    class Meta:
        verbose_name = "Producto Laboral"
        verbose_name_plural = "Productos Laborales"


class VentaGarage(models.Model):
    ESTADO_CHOICES = [
        ('Bueno', 'Bueno'),
        ('Regular', 'Regular'),
    ]
    
    perfil = models.ForeignKey(DatosPersonales, on_delete=models.CASCADE, blank=True, null=True, related_name='ventas_garage')
    nombre_producto = models.CharField(max_length=100)
    estado_producto = models.CharField(max_length=40, choices=ESTADO_CHOICES, blank=True, null=True)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    valor_del_bien = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre_producto
    
    class Meta:
        verbose_name = "Venta Garage"
        verbose_name_plural = "Ventas Garage"
