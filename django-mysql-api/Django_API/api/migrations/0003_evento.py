# Generated by Django 5.0.6 on 2024-06-25 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_usuario_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='evento',
            fields=[
                ('id', models.AutoField(max_length=11, primary_key=True, serialize=False)),
                ('tipo_evento', models.CharField(max_length=45)),
                ('fecha', models.DateField()),
            ],
        ),
    ]
