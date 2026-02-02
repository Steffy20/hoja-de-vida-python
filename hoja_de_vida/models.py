from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone


class DatosPersonales(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    estado_civil = models.CharField(max_length=50)
    cedula = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    edad = models.IntegerField()
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()

    def clean(self):
        today = timezone.now().date()
        if self.fecha_nacimiento and self.fecha_nacimiento >= today:
            raise ValidationError({'fecha_nacimiento': 'La fecha de nacimiento debe ser anterior a la fecha actual.'})
        if self.edad is not None:
            if self.edad < 0 or self.edad > 120:
                raise ValidationError({'edad': 'La edad no es valida.'})

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class FormacionAcademica(models.Model):
    nivel = models.CharField(max_length=100)
    institucion = models.CharField(max_length=200)
    titulo = models.CharField(max_length=200)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.titulo} - {self.institucion}"


class ExperienciaLaboral(models.Model):
    empresa = models.CharField(max_length=200)
    cargo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    # URL o ruta estatica (p.ej. /static/certificados/archivo.pdf)
    certificado = models.CharField(max_length=500, blank=True, null=True)

    def clean(self):
        today = timezone.now().date()
        if self.fecha_inicio and self.fecha_inicio > today:
            raise ValidationError({'fecha_inicio': 'La fecha de inicio no puede ser futura.'})
        if self.fecha_fin and self.fecha_fin > today:
            raise ValidationError({'fecha_fin': 'La fecha de finalizacion no puede ser futura.'})
        if self.fecha_inicio and self.fecha_fin and self.fecha_fin < self.fecha_inicio:
            raise ValidationError({'fecha_fin': 'La fecha de finalizacion debe ser posterior a la fecha de inicio.'})

    def __str__(self):
        return f"{self.cargo} en {self.empresa}"


class ReferenciaPersonal(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre


class Curso(models.Model):
    nombre = models.CharField(max_length=200)
    institucion = models.CharField(max_length=200)
    fecha = models.DateField(blank=True, null=True)
    # URL o ruta estatica (p.ej. /static/certificados/archivo.pdf)
    certificado = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} - {self.institucion}"


class CVSectionConfig(models.Model):
    show_inicio = models.BooleanField(default=True)
    show_formacion = models.BooleanField(default=True)
    show_experiencia = models.BooleanField(default=True)
    show_cursos = models.BooleanField(default=True)
    show_referencias = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return "Configuracion de secciones del CV"
