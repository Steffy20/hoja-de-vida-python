from django.contrib import admin
from .models import (
    DatosPersonales, FormacionAcademica, ExperienciaLaboral, 
    ReferenciaPersonal, Curso, Reconocimiento, ProductoAcademico, 
    ProductoLaboral, VentaGarage
)


@admin.register(DatosPersonales)
class DatosPersonalesAdmin(admin.ModelAdmin):
    list_display = ('nombres', 'apellidos', 'cedula', 'email', 'telefono', 'perfil_activo')
    search_fields = ('nombres', 'apellidos', 'cedula', 'email')
    list_filter = ('perfil_activo', 'sexo', 'estado_civil', 'nacionalidad')


@admin.register(FormacionAcademica)
class FormacionAcademicaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'institucion', 'nivel', 'estado')
    search_fields = ('titulo', 'institucion')
    list_filter = ('nivel', 'estado')


@admin.register(ExperienciaLaboral)
class ExperienciaLaboralAdmin(admin.ModelAdmin):
    list_display = ('cargo', 'empresa', 'fecha_inicio', 'fecha_fin', 'activo')
    search_fields = ('cargo', 'empresa')
    list_filter = ('activo', 'empresa')
    ordering = ['-fecha_inicio']


@admin.register(ReferenciaPersonal)
class ReferenciaPersonalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'telefono', 'email')
    search_fields = ('nombre', 'telefono', 'email')


@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'institucion', 'fecha_inicio', 'fecha_fin', 'total_horas', 'activo')
    search_fields = ('nombre', 'institucion')
    list_filter = ('activo', 'institucion')


@admin.register(Reconocimiento)
class ReconocimientoAdmin(admin.ModelAdmin):
    list_display = ('tipo_reconocimiento', 'descripcion', 'entidad_patrocinadora', 'fecha_reconocimiento', 'activo')
    search_fields = ('descripcion', 'entidad_patrocinadora')
    list_filter = ('tipo_reconocimiento', 'activo')


@admin.register(ProductoAcademico)
class ProductoAcademicoAdmin(admin.ModelAdmin):
    list_display = ('nombre_recurso', 'clasificador', 'descripcion', 'activo')
    search_fields = ('nombre_recurso', 'clasificador')
    list_filter = ('activo', 'clasificador')


@admin.register(ProductoLaboral)
class ProductoLaboralAdmin(admin.ModelAdmin):
    list_display = ('nombre_producto', 'fecha_producto', 'descripcion', 'activo')
    search_fields = ('nombre_producto', 'descripcion')
    list_filter = ('activo',)


@admin.register(VentaGarage)
class VentaGarageAdmin(admin.ModelAdmin):
    list_display = ('nombre_producto', 'estado_producto', 'valor_del_bien', 'activo')
    search_fields = ('nombre_producto', 'descripcion')
    list_filter = ('activo', 'estado_producto')