from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
<<<<<<< HEAD
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso
=======
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso, CVSectionConfig
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
from .serializers import (
    DatosPersonalesSerializer,
    FormacionAcademicaSerializer,
    ExperienciaLaboralSerializer, 
    ReferenciaPersonalSerializer,
<<<<<<< HEAD
    CursoSerializer
=======
    CursoSerializer,
    CVSectionConfigSerializer
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
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
<<<<<<< HEAD
=======
    config, _ = CVSectionConfig.objects.get_or_create(pk=1)
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    
    return Response({
        'datos_personales': DatosPersonalesSerializer(datos_personales).data if datos_personales else None,
        'formacion': FormacionAcademicaSerializer(formacion, many=True).data,
        'experiencia': ExperienciaLaboralSerializer(experiencia, many=True).data,
        'referencias': ReferenciaPersonalSerializer(referencias, many=True).data,
        'cursos': CursoSerializer(cursos, many=True).data,
<<<<<<< HEAD
=======
        'section_visibility': {
            'inicio': config.show_inicio,
            'formacion': config.show_formacion,
            'experiencia': config.show_experiencia,
            'cursos': config.show_cursos,
            'referencias': config.show_referencias,
        },
        'section_config': CVSectionConfigSerializer(config).data,
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    })
