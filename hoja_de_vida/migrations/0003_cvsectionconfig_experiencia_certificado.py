from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hoja_de_vida', '0002_curso'),
    ]

    operations = [
        migrations.CreateModel(
            name='CVSectionConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('show_inicio', models.BooleanField(default=True)),
                ('show_formacion', models.BooleanField(default=True)),
                ('show_experiencia', models.BooleanField(default=True)),
                ('show_cursos', models.BooleanField(default=True)),
                ('show_referencias', models.BooleanField(default=True)),
            ],
        ),
        migrations.AddField(
            model_name='experiencialaboral',
            name='certificado',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
