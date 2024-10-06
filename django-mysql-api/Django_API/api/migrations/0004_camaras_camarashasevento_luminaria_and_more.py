# Generated by Django 5.0.6 on 2024-06-25 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_evento'),
    ]

    operations = [
        migrations.CreateModel(
            name='Camaras',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ubicacion', models.CharField(blank=True, max_length=45, null=True)),
                ('estado', models.CharField(blank=True, max_length=45, null=True)),
                ('posicion_x_inicio', models.FloatField(blank=True, null=True)),
                ('posicion_x_cierre', models.FloatField(blank=True, null=True)),
                ('posicion_y_inicio', models.FloatField(blank=True, null=True)),
                ('posicion_y_cierre', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'camaras',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CamarasHasEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'camaras_has_evento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Luminaria',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('ubicacion', models.CharField(blank=True, max_length=45, null=True)),
                ('estado', models.CharField(blank=True, max_length=45, null=True)),
                ('auto_encendido', models.TimeField(blank=True, null=True)),
                ('auto_apagado', models.TimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'luminaria',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LuminariaHasEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'luminaria_has_evento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicio',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('estado', models.CharField(blank=True, max_length=45, null=True)),
                ('tipo_servicio', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'monitorero_servicio',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicioHasCamaras',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'monitorero_servicio_has_camaras',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicioHasLuminaria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'monitorero_servicio_has_luminaria',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicioHasRegado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'monitorero_servicio_has_regado',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicioHasSensorMovimiento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'monitorero_servicio_has_sensor_movimiento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicioHasTanqueAgua',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'monitorero_servicio_has_tanque_agua',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MonitoreroServicioHasTermostato',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'monitorero_servicio_has_termostato',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Regado',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('estado', models.CharField(blank=True, max_length=45, null=True)),
                ('nivel_humedad', models.IntegerField(blank=True, null=True)),
                ('auto_riego_inicio', models.TimeField(blank=True, null=True)),
                ('auto_riego_cierre', models.TimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'regado',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RegadoHasEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'regado_has_evento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SensorMovimiento',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('sensibilidad', models.IntegerField(blank=True, null=True)),
                ('estado', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'sensor_movimiento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SensorMovimientoHasEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'sensor_movimiento_has_evento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TanqueAgua',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nivel_agua', models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True)),
                ('nivel_max', models.IntegerField(blank=True, null=True)),
                ('nivel_min', models.IntegerField(blank=True, null=True)),
                ('date', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'tanque_agua',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TanqueAguaHasEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'tanque_agua_has_evento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Termostato',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('registro_temperatura', models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True)),
                ('temperatura_deseada', models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True)),
                ('date', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'termostato',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TermostatoHasEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'termostato_has_evento',
                'managed': False,
            },
        ),
        migrations.AlterModelOptions(
            name='evento',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='usuario',
            options={'managed': False},
        ),
    ]