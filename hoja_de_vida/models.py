from django.db import models

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

    def __str__(self):
        return f"{self.cargo} en {self.empresa}"

class ReferenciaPersonal(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre
