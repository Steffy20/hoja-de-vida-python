from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal
from .serializers import (
    DatosPersonalesSerializer, 
    FormacionAcademicaSerializer, 
    ExperienciaLaboralSerializer, 
    ReferenciaPersonalSerializer
)

class IndexView(TemplateView):
    template_name = 'index.html'

@api_view(['GET'])
def cv_api(request):
    datos_personales = DatosPersonales.objects.first()
    formacion = FormacionAcademica.objects.all()
    experiencia = ExperienciaLaboral.objects.all()
    referencias = ReferenciaPersonal.objects.all()
    
    return Response({
        'datos_personales': DatosPersonalesSerializer(datos_personales).data if datos_personales else None,
        'formacion': FormacionAcademicaSerializer(formacion, many=True).data,
        'experiencia': ExperienciaLaboralSerializer(experiencia, many=True).data,
        'referencias': ReferenciaPersonalSerializer(referencias, many=True).data,
    })
