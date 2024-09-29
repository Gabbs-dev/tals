from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from .models import *
from .ard_conn_v4 import orden_django as arduino
import json
 
# Create your views here.



class UsuarioView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            users=list(Usuario.objects.filter(id=id).values())
            if len(users) > 0:
                user=users[0]
                datos = {'message': "Success", 'User': user}
            else:
                datos= {'message': "User not found"}
            return JsonResponse(datos)
        else:
            users= list(Usuario.objects.values())
            if len(users)>0:
                datos= {'message': "Success",'Users':users}
            else:
                datos= {'message': "Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        Usuario.objects.create(nombre=jd['nombre'],email=jd['email'],password=jd['password'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        users= list(Usuario.objects.filter(id=id).values())
        if len(users) > 0:
            user= Usuario.objects.get(id=id)
            user.nombre= jd['nombre']
            user.email= jd['email']
            user.password= jd['password']
            user.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        users= list(Usuario.objects.filter(id=id).values())
        if len(users) > 0:
            Usuario.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "User not found"}
        return JsonResponse(datos)
class MonitoreroServicioView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            m_service=list(MonitoreroServicio.objects.filter(id=id).values())
            if len(m_service) > 0:
                service=m_service[0]
                datos = {'message': "Success", 'MonitoreroServicio': service}
            else:
                datos= {'message': "User not found"}
            return JsonResponse(datos)
        else:
            m_service= list(MonitoreroServicio.objects.values())
            if len(m_service)>0:
                datos= {'message': "Success",'Usuarios':m_service}
            else:
                datos= {'message': "Users monitoring not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreroServicio.objects.create(usuario_id=jd['usuario_id'],estado=jd['estado'],tipo_servicio=jd['tipo_servicio'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        m_service= list(MonitoreroServicio.objects.filter(id=id).values())
        if len(m_service) > 0:
            user_services= MonitoreroServicio.objects.get(id=id)
            user_services.usuario_id= jd['usuario_id']
            user_services.estado= jd['estado']
            user_services.tipo_servicio= jd['tipo_servicio']
            user_services.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        usersServices= list(MonitoreroServicio.objects.filter(id=id).values())
        if len(usersServices) > 0:
            MonitoreroServicio.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "User not found"}
        return JsonResponse(datos)
class CamarasView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            cams=list(Camaras.objects.filter(id=id).values())
            if len(cams) > 0:
                cam=cams[0]
                datos = {'message': "Success", 'Camera': cam}
            else:
                datos= {'message': "Cameras not found"}
            return JsonResponse(datos)
        else:
            cams= list(Camaras.objects.values())
            if len(cams)>0:
                datos= {'message': "Success",'Cameras':cams}
            else:
                datos= {'message': "Cameras not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        Camaras.objects.create(ubicacion=jd['ubicacion'],estado=jd['estado'],posicion_x_inicio=jd['posicion_x_inicio'],posicion_x_cierre=jd['posicion_x_cierre'],posicion_y_inicio=jd['posicion_y_inicio'],posicion_y_cierre=jd['posicion_y_cierre'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        cams= list(Camaras.objects.filter(id=id).values())
        if len(cams) > 0:
            cam= Camaras.objects.get(id=id)
            cam.ubicacion=jd['ubicacion']
            cam.estado=jd['estado']
            cam.posicion_x_inicio=jd['posicion_x_inicio']
            cam.posicion_x_cierre=jd['posicion_x_cierre']
            cam.posicion_y_inicio=jd['posicion_y_inicio']
            cam.posicion_y_cierre=jd['posicion_y_cierre']
            cam.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        cams= list(Camaras.objects.filter(id=id).values())
        if len(cams) > 0:
            Camaras.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "User not found"}
        return JsonResponse(datos)
class LuminariaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            lights=list(Luminaria.objects.filter(id=id).values())
            if len(lights) > 0:
                light=lights[0]
                datos = {'message': "Success", 'Light': light}
            else:
                datos= {'message': "Light not found"}
            return JsonResponse(datos)
        else:
            lights= list(Luminaria.objects.values())
            if len(lights)>0:
                datos= {'message': "Success",'Lights':lights}
            else:
                datos= {'message': "Lights not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        Luminaria.objects.create(ubicacion=jd['ubicacion'],estado=jd['estado'],auto_encendido=jd['auto_encendido'],auto_apagado=jd['auto_apagado'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        lights= list(Luminaria.objects.filter(id=id).values())
        if len(lights) > 0:
            light= Luminaria.objects.get(id=id)
            light.ubicacion= jd['ubicacion']
            light.estado= jd['estado']
            light.auto_encendido=jd['auto_encendido']
            light.auto_apagado=jd['auto_apagado']
            light.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Light not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        lights= list(Luminaria.objects.filter(id=id).values())
        if len(lights) > 0:
            Luminaria.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Light not found"}
        return JsonResponse(datos)
class RegadoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            water=list(Regado.objects.filter(id=id).values())
            if len(water) > 0:
                spray=water[0]
                datos = {'message': "Success", 'Spray': spray}
            else:
                datos= {'message': "Spray not found"}
            return JsonResponse(datos)
        else:
            water= list(Regado.objects.values())
            if len(water)>0:
                datos= {'message': "Success",'Spray':water}
            else:
                datos= {'message': "Spray not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        Regado.objects.create(estado=jd['estado'],nivel_humedad=jd['nivel_humedad'],auto_riego_inicio=jd['auto_riego_inicio'],auto_riego_cierre=jd['auto_riego_cierre'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        water= list(Regado.objects.filter(id=id).values())
        if len(water) > 0:
            spray= Regado.objects.get(id=id)
            spray.estado= jd['estado']
            spray.nivel_humedad= jd['nivel_humedad']
            spray.auto_riego_inicio= jd['auto_riego_inicio']
            spray.auto_riego_cierre= jd['auto_riego_cierre']
            spray.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Spray not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        water= list(Regado.objects.filter(id=id).values())
        if len(water) > 0:
            Regado.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Spray not found"}
        return JsonResponse(datos)
class SensorMovimientoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            m_sensors=list(SensorMovimiento.objects.filter(id=id).values())
            if len(m_sensors) > 0:
                m_sensor=m_sensors[0]
                datos = {'message': "Success", 'Motion Sensor': m_sensor}
            else:
                datos= {'message': "Motion Sensor not found"}
            return JsonResponse(datos)
        else:
            m_sensors= list(SensorMovimiento.objects.values())
            if len(m_sensors)>0:
                datos= {'message': "Success",'Motion Sensors':m_sensors}
            else:
                datos= {'message': "Motion Sensors not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        SensorMovimiento.objects.create(sensibilidad=jd['sensibilidad'],estado=jd['estado'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        m_sensors= list(SensorMovimiento.objects.filter(id=id).values())
        if len(m_sensors) > 0:
            m_sensor= SensorMovimiento.objects.get(id=id)
            m_sensor.sensibilidad= jd['sensibilidad']
            m_sensor.estado= jd['estado']
            m_sensor.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Motion Sensor not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        m_sensors= list(SensorMovimiento.objects.filter(id=id).values())
        if len(m_sensors) > 0:
            SensorMovimiento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Motion Sensor not found"}
        return JsonResponse(datos)
class TanqueAguaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            watertank=list(TanqueAgua.objects.filter(id=id).values())
            if len(watertank) > 0:
                user=watertank[0]
                datos = {'message': "Success", 'Water Tank': user}
            else:
                datos= {'message': "Water Tank not found"}
            return JsonResponse(datos)
        else:
            watertank= list(TanqueAgua.objects.values())
            if len(watertank)>0:
                datos= {'message': "Success",'Water Tank':watertank}
            else:
                datos= {'message': "Water Tank not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TanqueAgua.objects.create(nivel_agua=jd['nivel_agua'],nivel_max=jd['nivel_max'],nivel_min=jd['nivel_min'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        watertank= list(TanqueAgua.objects.filter(id=id).values())
        if len(watertank) > 0:
            user= TanqueAgua.objects.get(id=id)
            user.nivel_agua= jd['nivel_agua']
            user.nivel_max= jd['nivel_max']
            user.nivel_min= jd['nivel_min']
            #user.date= jd['date']
            user.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Water Tank not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        watertank= list(TanqueAgua.objects.filter(id=id).values())
        if len(watertank) > 0:
            TanqueAgua.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Water Tank not found"}
        return JsonResponse(datos)
class TermostatoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            therm=list(Termostato.objects.filter(id=id).values())
            if len(therm) > 0:
                device=therm[0]
                datos = {'message': "Success", 'Thermostat': device}
            else:
                datos= {'message': "Thermostat not found"}
            return JsonResponse(datos)
        else:
            therm= list(Termostato.objects.values())
            if len(therm)>0:
                datos= {'message': "Success",'Thermostats':therm}
            else:
                datos= {'message': "Thermostats not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        Termostato.objects.create(registro_temperatura=jd['registro_temperatura'],temperatura_deseada=jd['temperatura_deseada'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        therm= list(Termostato.objects.filter(id=id).values())
        if len(therm) > 0:
            device= Termostato.objects.get(id=id)
            device.registro_temperatura= jd['registro_temperatura']
            device.temperatura_deseada= jd['temperatura_deseada']
            device.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Thermostat not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        therm= list(Termostato.objects.filter(id=id).values())
        if len(therm) > 0:
            Termostato.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Thermostat not found"}
        return JsonResponse(datos)
class EventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(Evento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Event': event}
            else:
                datos= {'message': "Event not found"}
            return JsonResponse(datos)
        else:
            events= list(Evento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Events':events}
            else:
                datos= {'message': "Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        Evento.objects.create(tipo_evento=jd['tipo_evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(Evento.objects.filter(id=id).values())
        if len(events) > 0:
            event= Evento.objects.get(id=id)
            event.tipo_evento= jd['tipo_evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(Evento.objects.filter(id=id).values())
        if len(events) > 0:
            Evento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Event not found"}
        return JsonResponse(datos)

class MonitoreroServicioHasCamarasView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(MonitoreoServicioHasCamaras.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Cameras Monitor': event}
            else:
                datos= {'message': "Cameras Monitor not found"}
            return JsonResponse(datos)
        else:
            events= list(MonitoreoServicioHasCamaras.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Cameras Monitor Users':events}
            else:
                datos= {'message': "Cameras Monitor Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreoServicioHasCamaras.objects.create(monitorero_servicio=jd['monitoreo_servicio'],monitorero_servicio_usuario=jd['monitoreo_servicio_usuario'],camaras=jd['camaras'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(MonitoreoServicioHasCamaras.objects.filter(id=id).values())
        if len(events) > 0:
            event= MonitoreoServicioHasCamaras.objects.get(id=id)
            event.monitorero_servicio= jd['monitoreo_servicio']
            event.monitorero_servicio_usuario= jd['monitoreo_servicio_usuario']
            event.camaras= jd['camaras']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Cameras Monitor User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(MonitoreoServicioHasCamaras.objects.filter(id=id).values())
        if len(events) > 0:
            MonitoreoServicioHasCamaras.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Cameras Monitor not found"}
        return JsonResponse(datos)   

class MonitoreroServicioHasLuminariaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(MonitoreroServicioHasLuminaria.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Lights Monitor': event}
            else:
                datos= {'message': "Lights Monitor not found"}
            return JsonResponse(datos)
        else:
            events= list(MonitoreroServicioHasLuminaria.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Lights Monitor Users':events}
            else:
                datos= {'message': "Lights Monitor Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreroServicioHasLuminaria.objects.create(monitorero_servicio=jd['monitoreo_servicio'],monitorero_servicio_usuario=jd['monitoreo_servicio_usuario'],luminaria=jd['luminaria'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(MonitoreroServicioHasLuminaria.objects.filter(id=id).values())
        if len(events) > 0:
            event= MonitoreroServicioHasLuminaria.objects.get(id=id)
            event.monitorero_servicio= jd['monitoreo_servicio']
            event.monitorero_servicio_usuario= jd['monitoreo_servicio_usuario']
            event.luminaria= jd['luminaria']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Lights Monitor User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(MonitoreroServicioHasLuminaria.objects.filter(id=id).values())
        if len(events) > 0:
            MonitoreroServicioHasLuminaria.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Lights Monitor not found"}
        return JsonResponse(datos)

class MonitoreroServicioHasRegadoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(MonitoreroServicioHasRegado.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Spray Monitor': event}
            else:
                datos= {'message': "Spray Monitor not found"}
            return JsonResponse(datos)
        else:
            events= list(MonitoreroServicioHasRegado.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Spray Monitor Users':events}
            else:
                datos= {'message': "Spray Monitor Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreroServicioHasRegado.objects.create(monitorero_servicio=jd['monitoreo_servicio'],monitorero_servicio_usuario=jd['monitoreo_servicio_usuario'],regado=jd['regado'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(MonitoreroServicioHasRegado.objects.filter(id=id).values())
        if len(events) > 0:
            event= MonitoreroServicioHasRegado.objects.get(id=id)
            event.monitorero_servicio= jd['monitoreo_servicio']
            event.monitorero_servicio_usuario= jd['monitoreo_servicio_usuario']
            event.regado= jd['regado']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Spray Monitor User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(MonitoreroServicioHasRegado.objects.filter(id=id).values())
        if len(events) > 0:
            MonitoreroServicioHasRegado.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Spray Monitor not found"}
        return JsonResponse(datos)

class MonitoreroServicioHasSensorMovimientoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(MonitoreroServicioHasSensorMovimiento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Motion Sensor Monitor': event}
            else:
                datos= {'message': "Motion Sensor Monitor not found"}
            return JsonResponse(datos)
        else:
            events= list(MonitoreroServicioHasSensorMovimiento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Motion Sensor Monitor Users':events}
            else:
                datos= {'message': "Motion Sensor Monitor Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreroServicioHasSensorMovimiento.objects.create(monitorero_servicio=jd['monitoreo_servicio'],monitorero_servicio_usuario=jd['monitoreo_servicio_usuario'],sensor_movimiento=jd['sensor_movimiento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(MonitoreroServicioHasSensorMovimiento.objects.filter(id=id).values())
        if len(events) > 0:
            event= MonitoreroServicioHasSensorMovimiento.objects.get(id=id)
            event.monitorero_servicio= jd['monitoreo_servicio']
            event.monitorero_servicio_usuario= jd['monitoreo_servicio_usuario']
            event.sensor_movimiento= jd['sensor_movimiento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Motion Sensor Monitor User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(MonitoreroServicioHasSensorMovimiento.objects.filter(id=id).values())
        if len(events) > 0:
            MonitoreroServicioHasSensorMovimiento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Motion Sensor Monitor not found"}
        return JsonResponse(datos)

class MonitoreroServicioHasTanqueAguaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(MonitoreroServicioHasTanqueAgua.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Water Tank Monitor': event}
            else:
                datos= {'message': "Water Tank Monitor not found"}
            return JsonResponse(datos)
        else:
            events= list(MonitoreroServicioHasTanqueAgua.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Water Tank Monitor Users':events}
            else:
                datos= {'message': "Water Tank Monitor Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreroServicioHasTanqueAgua.objects.create(monitorero_servicio=jd['monitoreo_servicio'],monitorero_servicio_usuario=jd['monitoreo_servicio_usuario'],tanque_agua=jd['tanque_agua'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(MonitoreroServicioHasTanqueAgua.objects.filter(id=id).values())
        if len(events) > 0:
            event= MonitoreroServicioHasTanqueAgua.objects.get(id=id)
            event.monitorero_servicio= jd['monitoreo_servicio']
            event.monitorero_servicio_usuario= jd['monitoreo_servicio_usuario']
            event.tanque_agua= jd['tanque_agua']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Water Tank Monitor User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(MonitoreroServicioHasTanqueAgua.objects.filter(id=id).values())
        if len(events) > 0:
            MonitoreroServicioHasTanqueAgua.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Water Tank Monitor not found"}
        return JsonResponse(datos)

class MonitoreroServicioHasTermostatoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(MonitoreroServicioHasTermostato.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Thermostat Monitor': event}
            else:
                datos= {'message': "Thermostat Monitor not found"}
            return JsonResponse(datos)
        else:
            events= list(MonitoreroServicioHasTermostato.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Thermostat Monitor Users':events}
            else:
                datos= {'message': "Thermostat Monitor Users not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        MonitoreroServicioHasTermostato.objects.create(monitorero_servicio=jd['monitoreo_servicio'],monitorero_servicio_usuario=jd['monitoreo_servicio_usuario'],termostato=jd['termostato'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(MonitoreroServicioHasTermostato.objects.filter(id=id).values())
        if len(events) > 0:
            event= MonitoreroServicioHasTermostato.objects.get(id=id)
            event.monitorero_servicio= jd['monitoreo_servicio']
            event.monitorero_servicio_usuario= jd['monitoreo_servicio_usuario']
            event.termostato= jd['termostato']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Thermostat Monitor User not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(MonitoreroServicioHasTermostato.objects.filter(id=id).values())
        if len(events) > 0:
            MonitoreroServicioHasTermostato.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Thermostat Monitor not found"}
        return JsonResponse(datos)

class LuminariaHasEventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(LuminariaHasEvento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Light Event': event}
            else:
                datos= {'message': "Light Event not found"}
            return JsonResponse(datos)
        else:
            events= list(LuminariaHasEvento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Lights Events':events}
            else:
                datos= {'message': "Lights Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        LuminariaHasEvento.objects.create(luminaria=jd['luminaria'],evento=jd['evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(LuminariaHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            event= LuminariaHasEvento.objects.get(id=id)
            event.luminaria= jd['luminaria']
            event.evento= jd['evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Light Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(LuminariaHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            LuminariaHasEvento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Light Event not found"}
        return JsonResponse(datos)

class CamarasHasEventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(CamarasHasEvento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Camera Event': event}
            else:
                datos= {'message': "Camera Event not found"}
            return JsonResponse(datos)
        else:
            events= list(CamarasHasEvento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Cameras Events':events}
            else:
                datos= {'message': "Cameras Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        CamarasHasEvento.objects.create(camaras=jd['camaras'],evento=jd['evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(CamarasHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            event= CamarasHasEvento.objects.get(id=id)
            event.camaras= jd['camaras']
            event.evento= jd['evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Camera Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(CamarasHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            CamarasHasEvento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Camera Event not found"}
        return JsonResponse(datos)

class RegadoHasEventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(RegadoHasEvento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Spray Event': event}
            else:
                datos= {'message': "Spray Event not found"}
            return JsonResponse(datos)
        else:
            events= list(RegadoHasEvento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Spray Events':events}
            else:
                datos= {'message': "Spray Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        RegadoHasEvento.objects.create(regado=jd['regado'],evento=jd['evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(RegadoHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            event= RegadoHasEvento.objects.get(id=id)
            event.regado= jd['regado']
            event.evento= jd['evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Spray Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(RegadoHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            RegadoHasEvento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Spray Event not found"}
        return JsonResponse(datos)

class SensorMovimientoHasEventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(SensorMovimientoHasEvento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Motion Sensor Event': event}
            else:
                datos= {'message': "Motion Sensor Event not found"}
            return JsonResponse(datos)
        else:
            events= list(SensorMovimientoHasEvento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Motion Sensor Events':events}
            else:
                datos= {'message': "Motion Sensor Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        SensorMovimientoHasEvento.objects.create(sensor_movimiento=jd['sensor_movimiento'],evento=jd['evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(SensorMovimientoHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            event= SensorMovimientoHasEvento.objects.get(id=id)
            event.sensor_movimiento= jd['sensor_movimiento']
            event.evento= jd['evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Motion Sensor Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(SensorMovimientoHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            SensorMovimientoHasEvento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Motion Sensor Event not found"}
        return JsonResponse(datos)
    
class TanqueAguaHasEventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(TanqueAguaHasEvento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Water Tank Event': event}
            else:
                datos= {'message': "Water Tank Event not found"}
            return JsonResponse(datos)
        else:
            events= list(TanqueAguaHasEvento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Water Tank Events':events}
            else:
                datos= {'message': "Water Tank Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TanqueAguaHasEvento.objects.create(tanque_agua=jd['tanque_agua'],evento=jd['evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(TanqueAguaHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            event= TanqueAguaHasEvento.objects.get(id=id)
            event.tanque_agua= jd['tanque_agua']
            event.evento= jd['evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Water Tank Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(TanqueAguaHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            TanqueAguaHasEvento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Water Tank Event not found"}
        return JsonResponse(datos)

class TermostatoHasEventoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if(id>0):
            events=list(TermostatoHasEvento.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'Thermostat Event': event}
            else:
                datos= {'message': "Thermostat Event not found"}
            return JsonResponse(datos)
        else:
            events= list(TermostatoHasEvento.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'Thermostat Events':events}
            else:
                datos= {'message': "Thermostat Events not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TermostatoHasEvento.objects.create(termostato=jd['termostato'],evento=jd['evento'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(TermostatoHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            event= TermostatoHasEvento.objects.get(id=id)
            event.termostato= jd['termostato']
            event.evento= jd['evento']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Thermostat Event not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(TermostatoHasEvento.objects.filter(id=id).values())
        if len(events) > 0:
            TermostatoHasEvento.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Thermostat Event not found"}
        return JsonResponse(datos)

class ComandosArduinoView(View):
    @csrf_exempt
    def recibir_comando(self, request):
        if request.method == 'POST':
            comando = request.POST.get('comando')
            if not comando.empty():
                jd = json.loads(comando.body)
                l1 = jd['l1']
                l2 = jd['l2']
                sx = jd['sx']
                sy = jd['sy']
                arduino(l1,l2,sx,sy)
                datos= {'mensaje': "Comando recibido correctamente"}
                return JsonResponse(datos)
            else:
                return JsonResponse({'Error': 'No se pudu enviar el comando'})
        else:
            return JsonResponse({'Error': 'Método no permitido'})
