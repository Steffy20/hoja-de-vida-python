from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso, CVSectionConfig
from .serializers import (
    DatosPersonalesSerializer,
    FormacionAcademicaSerializer,
    ExperienciaLaboralSerializer,
    ReferenciaPersonalSerializer,
    CursoSerializer,
    CVSectionConfigSerializer,
)


class IndexView(TemplateView):
    template_name = 'index.html'


@api_view(['GET'])
def cv_api(request):
    datos_personales = DatosPersonales.objects.first()
    formacion = FormacionAcademica.objects.all()
    experiencia = ExperienciaLaboral.objects.all()
    referencias = ReferenciaPersonal.objects.all()
    cursos = Curso.objects.all()
    config, _ = CVSectionConfig.objects.get_or_create(pk=1)

    return Response({
        'datos_personales': DatosPersonalesSerializer(datos_personales).data if datos_personales else None,
        'formacion': FormacionAcademicaSerializer(formacion, many=True).data,
        'experiencia': ExperienciaLaboralSerializer(experiencia, many=True).data,
        'referencias': ReferenciaPersonalSerializer(referencias, many=True).data,
        'cursos': CursoSerializer(cursos, many=True).data,
        'section_visibility': {
            'inicio': config.show_inicio,
            'formacion': config.show_formacion,
            'experiencia': config.show_experiencia,
            'cursos': config.show_cursos,
            'referencias': config.show_referencias,
        },
        'section_config': CVSectionConfigSerializer(config).data,
    })
