from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(MonitoreroServicio)
admin.site.register(Usuario)
admin.site.register(Camaras)
admin.site.register(Luminaria)
admin.site.register(Regado)
admin.site.register(SensorMovimiento)
admin.site.register(TanqueAgua)
admin.site.register(Termostato)
admin.site.register(Evento)
admin.site.register(MonitoreoServicioHasCamaras)
admin.site.register(MonitoreroServicioHasLuminaria)
admin.site.register(MonitoreroServicioHasRegado)
admin.site.register(MonitoreroServicioHasSensorMovimiento)
admin.site.register(MonitoreroServicioHasTanqueAgua)
admin.site.register(MonitoreroServicioHasTermostato)
admin.site.register(LuminariaHasEvento)
admin.site.register(CamarasHasEvento)
admin.site.register(RegadoHasEvento)
admin.site.register(SensorMovimientoHasEvento)
admin.site.register(TanqueAguaHasEvento)
admin.site.register(TermostatoHasEvento)