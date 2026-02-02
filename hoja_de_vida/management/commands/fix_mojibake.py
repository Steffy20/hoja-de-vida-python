import re

from django.core.management.base import BaseCommand

from hoja_de_vida.models import (
    DatosPersonales,
    FormacionAcademica,
    ExperienciaLaboral,
    ReferenciaPersonal,
    Curso,
)


MOJIBAKE_RE = re.compile(r"[\u00c3\u00c2\uFFFD]")


def fix_text(value):
    if not value or not isinstance(value, str):
        return value, False
    if not MOJIBAKE_RE.search(value):
        return value, False
    try:
        fixed = value.encode("latin1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return value, False
    if fixed == value:
        return value, False
    if MOJIBAKE_RE.search(fixed):
        return value, False
    return fixed, True


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
