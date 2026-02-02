from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    DatosPersonales, FormacionAcademica, ExperienciaLaboral, 
    ReferenciaPersonal, Curso, Reconocimiento, ProductoAcademico, 
    ProductoLaboral, VentaGarage
)
from .serializers import (
    DatosPersonalesSerializer,
    FormacionAcademicaSerializer,
    ExperienciaLaboralSerializer, 
    ReferenciaPersonalSerializer,
    CursoSerializer,
    ReconocimientoSerializer,
    ProductoAcademicoSerializer,
    ProductoLaboralSerializer,
    VentaGarageSerializer
)

class IndexView(TemplateView):
    template_name = 'index.html'

@api_view(['GET'])
def cv_api(request):
    datos_personales = DatosPersonales.objects.first()
    formacion = FormacionAcademica.objects.all()
    experiencia = ExperienciaLaboral.objects.filter(activo=True).order_by('-fecha_inicio')
    referencias = ReferenciaPersonal.objects.all()
    cursos = Curso.objects.filter(activo=True)
    reconocimientos = Reconocimiento.objects.filter(activo=True)
    productos_academicos = ProductoAcademico.objects.filter(activo=True)
    productos_laborales = ProductoLaboral.objects.filter(activo=True)
    ventas_garage = VentaGarage.objects.filter(activo=True)
    
    return Response({
        'datos_personales': DatosPersonalesSerializer(datos_personales).data if datos_personales else None,
        'formacion': FormacionAcademicaSerializer(formacion, many=True).data,
        'experiencia': ExperienciaLaboralSerializer(experiencia, many=True).data,
        'referencias': ReferenciaPersonalSerializer(referencias, many=True).data,
        'cursos': CursoSerializer(cursos, many=True).data,
        'reconocimientos': ReconocimientoSerializer(reconocimientos, many=True).data,
        'productos_academicos': ProductoAcademicoSerializer(productos_academicos, many=True).data,
        'productos_laborales': ProductoLaboralSerializer(productos_laborales, many=True).data,
        'ventas_garage': VentaGarageSerializer(ventas_garage, many=True).data,
    })
