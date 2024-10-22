# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Camaras(models.Model):
    ubicacion = models.CharField(max_length=45, blank=True, null=True)
    estado = models.CharField(max_length=45, blank=True, null=True)
    posicion_x_inicio = models.FloatField(blank=True, null=True)
    posicion_x_cierre = models.FloatField(blank=True, null=True)
    posicion_y_inicio = models.FloatField(blank=True, null=True)
    posicion_y_cierre = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'camaras'


class CamarasHasEvento(models.Model):
    camaras = models.ForeignKey(Camaras, models.DO_NOTHING)
    evento = models.ForeignKey('Evento', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'camaras_has_evento'
        unique_together = (('id', 'camaras', 'evento'),)


class Evento(models.Model):
    tipo_evento = models.CharField(max_length=45, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evento'


class Luminaria(models.Model):
    luz1 = models.IntegerField(blank=True, null=True)
    luz2 = models.IntegerField(blank=True, null=True)
    luz3 = models.IntegerField(blank=True, null=True)
    luz4 = models.IntegerField(blank=True, null=True)
    luz5 = models.IntegerField(blank=True, null=True)
    luz6 = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'luminaria'


class LuminariaHasEvento(models.Model):
    luminaria = models.ForeignKey(Luminaria, models.DO_NOTHING)
    evento = models.ForeignKey(Evento, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'luminaria_has_evento'
        unique_together = (('id', 'luminaria', 'evento'),)


class MonitoreoServicioHasCamaras(models.Model):
    monitorero_servicio = models.ForeignKey('MonitoreroServicio', models.DO_NOTHING)
    monitorero_servicio_usuario = models.ForeignKey('MonitoreroServicio', models.DO_NOTHING, to_field='usuario_id', related_name='monitoreoserviciohascamaras_monitorero_servicio_usuario_set')
    camaras = models.ForeignKey(Camaras, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'monitoreo_servicio_has_camaras'
        unique_together = (('id', 'monitorero_servicio', 'monitorero_servicio_usuario', 'camaras'),)


class MonitoreroServicio(models.Model):
    usuario = models.OneToOneField('Usuario', models.DO_NOTHING)
    estado = models.CharField(max_length=45, blank=True, null=True)
    tipo_servicio = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'monitorero_servicio'
        unique_together = (('id', 'usuario'),)


class MonitoreroServicioHasLuminaria(models.Model):
    monitorero_servicio = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING)
    monitorero_servicio_usuario = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING, to_field='usuario_id', related_name='monitoreroserviciohasluminaria_monitorero_servicio_usuario_set')
    luminaria = models.ForeignKey(Luminaria, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'monitorero_servicio_has_luminaria'
        unique_together = (('id', 'monitorero_servicio', 'monitorero_servicio_usuario', 'luminaria'),)


class MonitoreroServicioHasRegado(models.Model):
    monitorero_servicio = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING)
    monitorero_servicio_usuario = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING, to_field='usuario_id', related_name='monitoreroserviciohasregado_monitorero_servicio_usuario_set')
    regado = models.ForeignKey('Regado', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'monitorero_servicio_has_regado'
        unique_together = (('id', 'monitorero_servicio', 'monitorero_servicio_usuario', 'regado'),)


class MonitoreroServicioHasSensorMovimiento(models.Model):
    monitorero_servicio = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING)
    monitorero_servicio_usuario = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING, to_field='usuario_id', related_name='monitoreroserviciohassensormovimiento_monitorero_servicio_usuario_set')
    sensor_movimiento = models.ForeignKey('SensorMovimiento', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'monitorero_servicio_has_sensor_movimiento'
        unique_together = (('id', 'monitorero_servicio', 'monitorero_servicio_usuario', 'sensor_movimiento'),)


class MonitoreroServicioHasTanqueAgua(models.Model):
    monitorero_servicio = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING)
    monitorero_servicio_usuario = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING, to_field='usuario_id', related_name='monitoreroserviciohastanqueagua_monitorero_servicio_usuario_set')
    tanque_agua = models.ForeignKey('TanqueAgua', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'monitorero_servicio_has_tanque_agua'
        unique_together = (('id', 'monitorero_servicio', 'monitorero_servicio_usuario', 'tanque_agua'),)


class MonitoreroServicioHasTermostato(models.Model):
    monitorero_servicio = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING)
    monitorero_servicio_usuario = models.ForeignKey(MonitoreroServicio, models.DO_NOTHING, to_field='usuario_id', related_name='monitoreroserviciohastermostato_monitorero_servicio_usuario_set')
    termostato = models.ForeignKey('Termostato', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'monitorero_servicio_has_termostato'
        unique_together = (('id', 'monitorero_servicio', 'monitorero_servicio_usuario', 'termostato'),)


class Regado(models.Model):
    estado = models.CharField(max_length=45, blank=True, null=True)
    nivel_humedad = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'regado'


class RegadoHasEvento(models.Model):
    regado = models.ForeignKey(Regado, models.DO_NOTHING)
    evento = models.ForeignKey(Evento, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'regado_has_evento'
        unique_together = (('id', 'regado', 'evento'),)


class SensorMovimiento(models.Model):
    estado = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sensor_movimiento'


class SensorMovimientoHasEvento(models.Model):
    sensor_movimiento = models.ForeignKey(SensorMovimiento, models.DO_NOTHING)
    evento = models.ForeignKey(Evento, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'sensor_movimiento_has_evento'
        unique_together = (('id', 'sensor_movimiento', 'evento'),)


class TanqueAgua(models.Model):
    nivel_agua = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tanque_agua'


class TanqueAguaHasEvento(models.Model):
    tanque_agua = models.ForeignKey(TanqueAgua, models.DO_NOTHING)
    evento = models.ForeignKey(Evento, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'tanque_agua_has_evento'
        unique_together = (('id', 'tanque_agua', 'evento'),)


class TanqueAguaNiveles(models.Model):
    nivel_maximo = models.IntegerField()
    nivel_minimo = models.IntegerField()
    altura = models.FloatField()
    diametro = models.FloatField() 

    class Meta:
        managed = False
        db_table = 'tanque_agua_niveles'


class TemporizadorLuminarias(models.Model):
    dispositivo = models.CharField(max_length=50, blank=True, null=True)
    horario_inicio = models.TimeField(blank=True, null=True)
    horario_cierre = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'temporizador_luminaria'

class TemporizadorRegado(models.Model):
    dispositivo = models.CharField(max_length=50, blank=True, null=True)
    horario_inicio = models.TimeField(blank=True, null=True)
    horario_cierre = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'temporizador_regado'


class Termostato(models.Model):
    temperatura = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    humedad = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'termostato'

class TermostatoNiveles(models.Model):
    dispositivo = models.CharField(max_length=50, blank=True, null=True)
    temperatura_deseada = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'termostato_niveles'


class TermostatoHasEvento(models.Model):
    termostato = models.ForeignKey(Termostato, models.DO_NOTHING)
    evento = models.ForeignKey(Evento, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'termostato_has_evento'
        unique_together = (('id', 'termostato', 'evento'),)


class Usuario(models.Model):
    nombre = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'usuario'
