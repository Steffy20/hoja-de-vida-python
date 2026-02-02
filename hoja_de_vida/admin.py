from django.contrib import admin
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso

admin.site.register(DatosPersonales)
admin.site.register(FormacionAcademica)
admin.site.register(ExperienciaLaboral)
admin.site.register(ReferenciaPersonal)
admin.site.register(Curso)