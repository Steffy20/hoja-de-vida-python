from rest_framework import serializers
<<<<<<< HEAD
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso
=======
from .models import DatosPersonales, FormacionAcademica, ExperienciaLaboral, ReferenciaPersonal, Curso, CVSectionConfig
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
from datetime import date

class DatosPersonalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosPersonales
        fields = '__all__'
    
    def validate_fecha_nacimiento(self, value):
        """Validate that birth date is in the past"""
        if value >= date.today():
            raise serializers.ValidationError("La fecha de nacimiento debe ser anterior a la fecha actual.")
        
        # Check if person is not unreasonably old
        age = (date.today() - value).days // 365
        if age > 120:
            raise serializers.ValidationError("La fecha de nacimiento no es válida.")
        
        return value
    
    def validate_edad(self, value):
        """Validate that age is reasonable"""
        if value < 0:
            raise serializers.ValidationError("La edad debe ser un número positivo.")
        if value > 120:
            raise serializers.ValidationError("La edad no es válida.")
        return value
    
    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Debe proporcionar un email válido.")
        return value.lower()

class FormacionAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormacionAcademica
        fields = '__all__'
    
    def validate_nivel(self, value):
        """Validate that education level is provided"""
        if not value or not value.strip():
            raise serializers.ValidationError("El nivel de formación es requerido.")
        return value
    
    def validate_institucion(self, value):
        """Validate that institution is provided"""
        if not value or not value.strip():
            raise serializers.ValidationError("La institución es requerida.")
        return value

class ExperienciaLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'
    
    def validate(self, data):
        """Validate that end date is after start date"""
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')
        
<<<<<<< HEAD
        if fecha_inicio and fecha_fin:
            if fecha_fin < fecha_inicio:
                raise serializers.ValidationError({
                    'fecha_fin': 'La fecha de finalización debe ser posterior a la fecha de inicio.'
                })
            
            # Validate that dates are not in the future
            if fecha_inicio > date.today():
                raise serializers.ValidationError({
                    'fecha_inicio': 'La fecha de inicio no puede ser futura.'
                })
        
        return data
    
=======
        if fecha_inicio and fecha_fin and fecha_fin < fecha_inicio:
            raise serializers.ValidationError({
                'fecha_fin': 'La fecha de finalizacion debe ser posterior a la fecha de inicio.'
            })
        
        # Validate that dates are not in the future
        if fecha_inicio and fecha_inicio > date.today():
            raise serializers.ValidationError({
                'fecha_inicio': 'La fecha de inicio no puede ser futura.'
            })
        if fecha_fin and fecha_fin > date.today():
            raise serializers.ValidationError({
                'fecha_fin': 'La fecha de finalizacion no puede ser futura.'
            })
        
        return data

>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    def validate_cargo(self, value):
        """Validate that position title is provided"""
        if not value or not value.strip():
            raise serializers.ValidationError("El cargo es requerido.")
        return value
    
    def validate_empresa(self, value):
        """Validate that company name is provided"""
        if not value or not value.strip():
            raise serializers.ValidationError("La empresa es requerida.")
        return value

class ReferenciaPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenciaPersonal
        fields = '__all__'
    
    def validate_nombre(self, value):
        """Validate that name is provided"""
        if not value or not value.strip():
            raise serializers.ValidationError("El nombre de referencia es requerido.")
        return value
    
    def validate_telefono(self, value):
        """Validate phone number format"""
        if not value or not value.strip():
            raise serializers.ValidationError("El teléfono es requerido.")
        
        # Remove common separators for validation
        cleaned = value.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
        if not cleaned.isdigit() or len(cleaned) < 7:
            raise serializers.ValidationError("El teléfono debe contener al menos 7 dígitos.")
        
        return value

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
<<<<<<< HEAD
=======

class CVSectionConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = CVSectionConfig
        fields = '__all__'
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
