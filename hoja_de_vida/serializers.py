from rest_framework import serializers
from .models import (
    DatosPersonales,
    FormacionAcademica,
    ExperienciaLaboral,
    ReferenciaPersonal,
    Curso,
    CVSectionConfig,
)
from .utils.text import fix_mojibake_text
from datetime import date


class MojibakeFixMixin:
    def to_representation(self, instance):
        data = super().to_representation(instance)
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = fix_mojibake_text(value)
        return data


class DatosPersonalesSerializer(MojibakeFixMixin, serializers.ModelSerializer):
    class Meta:
        model = DatosPersonales
        fields = '__all__'

    def validate_fecha_nacimiento(self, value):
        if value >= date.today():
            raise serializers.ValidationError("La fecha de nacimiento debe ser anterior a la fecha actual.")

        age = (date.today() - value).days // 365
        if age > 120:
            raise serializers.ValidationError("La fecha de nacimiento no es valida.")

        return value

    def validate_edad(self, value):
        if value < 0:
            raise serializers.ValidationError("La edad debe ser un numero positivo.")
        if value > 120:
            raise serializers.ValidationError("La edad no es valida.")
        return value

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError("Debe proporcionar un email valido.")
        return value.lower()


class FormacionAcademicaSerializer(MojibakeFixMixin, serializers.ModelSerializer):
    class Meta:
        model = FormacionAcademica
        fields = '__all__'

    def validate_nivel(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("El nivel de formacion es requerido.")
        return value

    def validate_institucion(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("La institucion es requerida.")
        return value


class ExperienciaLaboralSerializer(MojibakeFixMixin, serializers.ModelSerializer):
    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'

    def validate(self, data):
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')

        if fecha_inicio and fecha_fin and fecha_fin < fecha_inicio:
            raise serializers.ValidationError({
                'fecha_fin': 'La fecha de finalizacion debe ser posterior a la fecha de inicio.'
            })

        if fecha_inicio and fecha_inicio > date.today():
            raise serializers.ValidationError({
                'fecha_inicio': 'La fecha de inicio no puede ser futura.'
            })
        if fecha_fin and fecha_fin > date.today():
            raise serializers.ValidationError({
                'fecha_fin': 'La fecha de finalizacion no puede ser futura.'
            })

        return data

    def validate_cargo(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("El cargo es requerido.")
        return value

    def validate_empresa(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("La empresa es requerida.")
        return value


class ReferenciaPersonalSerializer(MojibakeFixMixin, serializers.ModelSerializer):
    class Meta:
        model = ReferenciaPersonal
        fields = '__all__'

    def validate_nombre(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("El nombre de referencia es requerido.")
        return value

    def validate_telefono(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("El telefono es requerido.")

        cleaned = value.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
        if not cleaned.isdigit() or len(cleaned) < 7:
            raise serializers.ValidationError("El telefono debe contener al menos 7 digitos.")

        return value


class CursoSerializer(MojibakeFixMixin, serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


class CVSectionConfigSerializer(MojibakeFixMixin, serializers.ModelSerializer):
    class Meta:
        model = CVSectionConfig
        fields = '__all__'
