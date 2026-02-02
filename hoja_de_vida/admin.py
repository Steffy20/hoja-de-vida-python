from django.contrib import admin
from .models import (
    DatosPersonales,
    FormacionAcademica,
    ExperienciaLaboral,
    ReferenciaPersonal,
    Curso,
    CVSectionConfig,
)

admin.site.register(DatosPersonales)
admin.site.register(FormacionAcademica)
admin.site.register(ExperienciaLaboral)
admin.site.register(ReferenciaPersonal)
admin.site.register(Curso)


@admin.register(CVSectionConfig)
class CVSectionConfigAdmin(admin.ModelAdmin):
    list_display = (
        'show_inicio',
        'show_formacion',
        'show_experiencia',
        'show_cursos',
        'show_referencias',
    )

    def has_add_permission(self, request):
        return not CVSectionConfig.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
