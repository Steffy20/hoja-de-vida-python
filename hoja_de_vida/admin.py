from django.contrib import admin
<<<<<<< HEAD
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso
=======
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso, CVSectionConfig
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7

admin.site.register(DatosPersonales)
admin.site.register(FormacionAcademica)
admin.site.register(ExperienciaLaboral)
admin.site.register(ReferenciaPersonal)
<<<<<<< HEAD
admin.site.register(Curso)
=======
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
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
