from django.core.management.base import BaseCommand

from hoja_de_vida.models import (
    DatosPersonales,
    FormacionAcademica,
    ExperienciaLaboral,
    ReferenciaPersonal,
    Curso,
)
from hoja_de_vida.utils.text import fix_mojibake_text


def fix_text(value):
    if not value or not isinstance(value, str):
        return value, False
    fixed = fix_mojibake_text(value)
    return fixed, fixed != value


class Command(BaseCommand):
    help = "Fix common mojibake text stored in the database."

    def handle(self, *args, **options):
        models_fields = [
            (DatosPersonales, [
                "nombres",
                "apellidos",
                "estado_civil",
                "cedula",
                "direccion",
                "telefono",
                "email",
            ]),
            (FormacionAcademica, [
                "nivel",
                "institucion",
                "titulo",
                "estado",
            ]),
            (ExperienciaLaboral, [
                "empresa",
                "cargo",
                "descripcion",
                "certificado",
            ]),
            (ReferenciaPersonal, [
                "nombre",
                "telefono",
                "email",
            ]),
            (Curso, [
                "nombre",
                "institucion",
                "certificado",
            ]),
        ]

        updated = 0
        for model, fields in models_fields:
            for obj in model.objects.all():
                changed = False
                for field in fields:
                    value = getattr(obj, field, None)
                    fixed, did_change = fix_text(value)
                    if did_change:
                        setattr(obj, field, fixed)
                        changed = True
                if changed:
                    obj.save(update_fields=fields)
                    updated += 1

        self.stdout.write(f"Updated {updated} records.")
