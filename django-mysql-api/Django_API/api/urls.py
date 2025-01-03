﻿from django.urls import path
from .views import *

urlpatterns = [
    path('login/',LoginUserView.as_view(), name='login_user'),
    path('users/',UsuarioView.as_view(), name='users_list'),
    path('users/<int:id>',UsuarioView.as_view(), name='users_process'),
    path('serviceM/',MonitoreroServicioView.as_view(), name='services_list'),
    path('serviceM/<int:id>',MonitoreroServicioView.as_view(), name='service_process'),
    path('cameras/',CamarasView.as_view(), name='cameras_list'),
    path('cameras/<int:id>',CamarasView.as_view(), name='camera_process'),
    path('lights/',LuminariaView.as_view(), name='lights_list'),
    path('lights/<int:id>',LuminariaView.as_view(), name='light_process'),
    path('spray/',RegadoView.as_view(), name='spray_list'),
    path('spray/<int:id>',RegadoView.as_view(), name='spray_process'),
    path('mSensors/',SensorMovimientoView.as_view(), name='msensor_list'),
    path('mSensors/<int:id>',SensorMovimientoView.as_view(), name='msensor_process'),
    path('watertank/',TanqueAguaView.as_view(), name='watertank_list'),
    path('watertank/<int:id>',TanqueAguaView.as_view(), name='watertank_process'),
    path('watertank/levels/',TanqueaguaNivelesView.as_view(), name='watertanklevels_list'),
    path('watertank/levels/<int:id>',TanqueaguaNivelesView.as_view(), name='watertanklevels_process'),
    path('thermostat/',TermostatoView.as_view(), name='thermostat_list'),
    path('thermostat/<int:id>',TermostatoView.as_view(), name='thermostat_process'),
    path('thermostat/levels/',TermostatoNivelesView.as_view(), name='thermostatlevels_list'),
    path('thermostat/levels/<int:id>',TermostatoNivelesView.as_view(), name='thermostatlevels_process'),
    path('events/',EventoView.as_view(), name='events_list'),
    path('events/<int:id>',EventoView.as_view(), name='event_process'),
    path('cameras/monitors/',MonitoreroServicioHasCamarasView.as_view(), name='camerasmonitors_list'),
    path('cameras/monitors/<int:id>',MonitoreroServicioHasCamarasView.as_view(), name='camerasmonitor_process'),
    path('lights/monitors/',MonitoreroServicioHasLuminariaView.as_view(), name='lightsmonitors_list'),
    path('lights/monitors/<int:id>',MonitoreroServicioHasLuminariaView.as_view(), name='lightmonitor_process'),
    path('spray/monitors/',MonitoreroServicioHasRegadoView.as_view(), name='spraymonitors_list'),
    path('spray/monitors/<int:id>',MonitoreroServicioHasRegadoView.as_view(), name='spraymonitor_process'),
    path('spray/monitors/',MonitoreroServicioHasRegadoView.as_view(), name='spraymonitors_list'),
    path('spray/monitors/<int:id>',MonitoreroServicioHasRegadoView.as_view(), name='spraymonitor_process'),
    path('mSensor/monitors/',MonitoreroServicioHasSensorMovimientoView.as_view(), name='msensormonitors_list'),
    path('mSensor/monitors/<int:id>',MonitoreroServicioHasSensorMovimientoView.as_view(), name='msensormonitor_process'),
    path('watertank/monitors/',MonitoreroServicioHasTanqueAguaView.as_view(), name='watertankmonitors_list'),
    path('watertank/monitors/<int:id>',MonitoreroServicioHasTanqueAguaView.as_view(), name='watertankmonitor_process'),
    path('thermostat/monitors/',MonitoreroServicioHasTermostatoView.as_view(), name='thermostatmonitors_list'),
    path('thermostat/monitors/<int:id>',MonitoreroServicioHasTermostatoView.as_view(), name='thermostatmonitor_process'),
    path('lights/events/',LuminariaHasEventoView.as_view(), name='lightsevents_list'),
    path('lights/events/<int:id>',LuminariaHasEventoView.as_view(), name='lightevent_process'),
    path('cameras/events/',CamarasHasEventoView.as_view(), name='camerasevents_list'),
    path('cameras/events/<int:id>',CamarasHasEventoView.as_view(), name='cameraevent_process'),
    path('spray/events/',RegadoHasEventoView.as_view(), name='sprayevents_list'),
    path('spray/events/<int:id>',RegadoHasEventoView.as_view(), name='sprayevent_process'),
    path('mSensor/events/',SensorMovimientoHasEventoView.as_view(), name='msensorevents_list'),
    path('mSensor/events/<int:id>',SensorMovimientoHasEventoView.as_view(), name='msensorevent_process'),
    path('watertank/events/',TanqueAguaHasEventoView.as_view(), name='watertankevents_list'),
    path('watertank/events/<int:id>',TanqueAguaHasEventoView.as_view(), name='watertankevent_process'),
    path('thermostat/events/',TermostatoHasEventoView.as_view(), name='thermostatevents_list'),
    path('thermostate/vents/<int:id>',TermostatoHasEventoView.as_view(), name='thermostatevent_process'),
    path('lights/timer/',TemporizadorLuminariasView.as_view(), name='temporizadorluz_list'),
    path('lights/timer/<int:id>',TemporizadorLuminariasView.as_view(), name='temporizadorluz_process'),
    path('spray/timer/',TemporizadorRegadoView.as_view(), name='temporizadorregado_list'),
    path('spray/timer/<int:id>',TemporizadorRegadoView.as_view(), name='temporizadorregado_process'),
]