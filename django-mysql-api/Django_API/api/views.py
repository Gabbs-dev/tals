from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
import serial 
from .models import *
import json

# Create your views here

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

class LoginUserView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)
    def post(self, request):
        jd = json.loads(request.body)
        user = get_object_or_404(Usuario, nombre=jd['username'], password=jd['password'])
        if user is not None:
            token = Token.generate_key()
            print(token)
            return JsonResponse({'message': 'Success', 'token': token})
        else:
            return JsonResponse({'error': 'Invalid Credentials'})

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
            cams= Camaras.objects.order_by('id').last()
            if cams:
                data = {
                    'id': cams.id,
                    'posicion_x': cams.posicion_x,
                    'posicion_y': cams.posicion_y,
                }
                datos= {'message': "Success",'lastCamera':data}
            else:
                datos= {'message': "Last Camera not found"}
            return JsonResponse(datos) 

    def post(self, request):
        # Servos
        jd = json.loads(request.body)
        posicion_x = jd['posicion_x']
        posicion_y = jd['posicion_y']
        ser_command = f"{posicion_x},{posicion_y}\n"
        with serial.Serial('COM1', 9600) as ser:
            data = ser.readline().decode('utf-8').strip()
            if data:
                jd = json.loads(data)
                rele1 = jd['estado_rele']
                rele2 = jd['estado_rele2']
                rele3 = jd['estado_rele3']
                rele4 = jd['estado_rele4']
                rele5 = jd['estado_rele5']
                rele6 = jd['estado_rele6']
                command = f"{rele1},{rele2},{rele3},{rele4},{rele5},{rele6},"
                if command:
                    command += ser_command
                    print(command)
                    ser.write(command.encode('utf-8'))
                    return JsonResponse({'message': "Success"})
            return JsonResponse({'message': "Error"})

class LuminariaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if id > 0:
            return self._get_single_light(id)
        return self._get_last_light()

    def post(self, request):
        jd = json.loads(request.body)
        luz_values = [jd.get(f'luz{i}') for i in range(1, 7)]
        return self._process_lights(luz_values)

    # Métodos auxiliares
    def _get_single_light(self, id):
        light = Luminaria.objects.filter(id=id).values().first()
        if light:
            return JsonResponse({'message': "Success", 'Light': light})
        return JsonResponse({'message': "Light not found"})

    def _get_last_light(self):
        last_light = Luminaria.objects.order_by('id').last()
        if last_light:
            data = {
                'id': last_light.id,
                'luz1': last_light.luz1,
                'luz2': last_light.luz2,
                'luz3': last_light.luz3,
                'luz4': last_light.luz4,
                'luz5': last_light.luz5,
                'luz6': last_light.luz6,
                'date': last_light.date,
            }
            return JsonResponse({'message': "Success", 'lastLight': data})
        return JsonResponse({'message': "Data not found"})

    def _process_lights(self, luz_values):
        with serial.Serial('COM1', 9600) as ser:
            data = ser.readline().decode('utf-8').strip()
            if data:
                received = json.loads(data)
                command = self._build_command(luz_values, received)
                if command:
                    ser.write(command.encode('utf-8'))
                    return JsonResponse({'message': "Success"})
            return JsonResponse({'message': "Error"})

    def _build_command(self, luz_values, received):
        commands = []
        for i in range(6):
            luz_actual = luz_values[i]
            estado_rele = received.get(f'estado_rele{i + 1}')
            if luz_actual != estado_rele:
                # Agregamos el valor al comando si hay diferencia
                commands.append(str(luz_actual))
            else:
                # Si no hay diferencia, agregamos el valor existente
                commands.append(str(estado_rele))

        comando = f"{','.join(commands)},{0},{40}\n"

        if any(luz_values[i] != received.get(f'estado_rele{i + 1}') for i in range(6)):
            return comando
        return ""

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
            last_spray = Regado.objects.order_by('id').last()
            if last_spray:
                data = {
                    'id': last_spray.id,
                    'estado': last_spray.estado,
                    'nivel_humedad': last_spray.nivel_humedad,
                    'auto_riego_inicio': last_spray.auto_riego_inicio,
                    'auto_riego_cierre': last_spray.auto_riego_cierre,
                }
                datos = {'message': "Success", 'lastSpray': data}
            else:
                datos = {'message': "Data not found"}
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
                datos = {'message': "Success", 'MotionSensor': m_sensor}
            else:
                datos= {'message': "Motion Sensor not found"}
            return JsonResponse(datos)
        else:
            m_sensor = SensorMovimiento.objects.order_by('date').last()
            if m_sensor:
                data = {
                    'id': m_sensor.id,
                    'estado': m_sensor.estado,
                    'date': m_sensor.date,
                }
                datos = {'message': "Success", 'MotionSensor': data}
            else:
                datos = {'message': "Data not found"}
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
                datos = {'message': "Success", 'WaterTank': user}
            else:
                datos= {'message': "Water Tank not found"}
            return JsonResponse(datos)
        else:
            last_watertank = TanqueAgua.objects.order_by('date').last()
            if last_watertank:
                data = {
                    'id': last_watertank.id,
                    'nivel_agua': last_watertank.nivel_agua,
                    'date': last_watertank.date,
                }
                datos = {'message': "Success", 'Watertank': data}
            else:
                datos = {'message': "Data not found"}
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
            last_thermostat = Termostato.objects.order_by('date').last()
            if last_thermostat:
                data = {
                    'id': last_thermostat.id,
                    'temperatura': last_thermostat.temperatura,
                    'humedad': last_thermostat.humedad,
                    'date': last_thermostat.date,
                }
                datos = {'message': "Success", 'Thermostat': data}
            else:
                datos = {'message': "Data not found"}
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


class TanqueaguaNivelesView(View): 
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request, id=0):
        if(id>0):
            events=list(TanqueAguaNiveles.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'tanklevel': event}
            else:
                datos= {'message': "tanklevel not found"}
            return JsonResponse(datos)
        else:
            events= TanqueAguaNiveles.objects.order_by('id').last()
            if events:
                data = {
                    'id': events.id,
                    'nivel_maximo': events.nivel_maximo,
                    'nivel_minimo': events.nivel_minimo,
                    'altura': events.altura,
                    'diametro': events.diametro,
                }
                datos= {'message': "Success",'tanklevel':data}
            else:
                datos= {'message': "tanklevel not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TanqueAguaNiveles.objects.create(nivel_maximo=jd['nivel_maximo'],nivel_minimo=jd['nivel_minimo'],altura=jd['altura'],diametro=jd['diametro'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(TanqueAguaNiveles.objects.filter(id=id).values())
        if len(events) > 0:
            event= TanqueAguaNiveles.objects.get(id=id)
            event.nivel_maximo= jd['nivel_maximo']
            event.nivel_minimo= jd['nivel_minimo']
            event.altura= jd['altura']
            event.diametro= jd['diametro']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "Tanklevel not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(TanqueAguaNiveles.objects.filter(id=id).values())
        if len(events) > 0:
            TanqueAguaNiveles.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "tanklevel not found"}
        return JsonResponse(datos)

class TermostatoNivelesView(View): 
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request, id=0):
        if(id>0):
            events=list(TermostatoNiveles.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'thermLevel': event}
            else:
                datos= {'message': "thermLevel not found"}
            return JsonResponse(datos)
        else:
            events= TermostatoNiveles.objects.order_by('id').last()
            if events:
                data = {
                    'id': events.id,
                    'dispositivo': events.dispositivo,
                    'temperatura_deseada': events.temperatura_deseada,
                }
                datos = {'message': "Success",'thermLevel':data}
            else:
                datos = {'message': "thermsLevel not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TermostatoNiveles.objects.create(dispositivo=jd['dispositivo'],temperatura_deseada=jd['temperatura_deseada'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(TermostatoNiveles.objects.filter(id=id).values())
        if len(events) > 0:
            event= TermostatoNiveles.objects.get(id=id)
            event.dispositivo= jd['dispositivo']
            event.temperatura_deseada= jd['temperatura_deseada']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "thermLevel not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(TermostatoNiveles.objects.filter(id=id).values())
        if len(events) > 0:
            TermostatoNiveles.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "thermLevel not found"}
        return JsonResponse(datos)


class TemporizadorLuminariasView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request, id=0):
        if(id>0):
            events=list(TemporizadorLuminarias.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'timerLight': event}
            else:
                datos= {'message': "timer light not found"}
            return JsonResponse(datos)
        else:
            events= TemporizadorLuminarias.objects.order_by('id').last()
            if events:
                data = {
                    'id': events.id,
                    'dispositivo': events.dispositivo,
                    'horario_inicio': events.horario_inicio,
                    'horario_cierre': events.horario_cierre,
                }
                datos= {'message': "Success",'timerLight':data}
            else:
                datos= {'message': "timer light not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TemporizadorLuminarias.objects.create(dispositivo=jd['dispositivo'],horario_inicio=jd['horario_inicio'],horario_cierre=jd['horario_cierre'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(TemporizadorLuminarias.objects.filter(id=id).values())
        if len(events) > 0:
            event= TemporizadorLuminarias.objects.get(id=id)
            event.dispositivo= jd['dispositivo']
            event.horario_inicio= jd['horario_inicio']
            event.horario_cierre= jd['horario_cierre']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "timer light not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(TemporizadorLuminarias.objects.filter(id=id).values())
        if len(events) > 0:
            Temporizador.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "timer light not found"}
        return JsonResponse(datos)

class TemporizadorRegadoView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs) :
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request, id=0):
        if(id>0):
            events=list(TemporizadorRegado.objects.filter(id=id).values())
            if len(events) > 0:
                event=events[0]
                datos = {'message': "Success", 'timerSpray': event}
            else:
                datos= {'message': "timer spray not found"}
            return JsonResponse(datos)
        else:
            events= list(TemporizadorRegado.objects.values())
            if len(events)>0:
                datos= {'message': "Success",'timerSprays':events}
            else:
                datos= {'message': "timer sprays not found"}
            return JsonResponse(datos) 

    def post(self, request):
        jd = json.loads(request.body)
        TemporizadorRegado.objects.create(dispositivo=jd['dispositivo'],horario_inicio=jd['horario_inicio'],horario_cierre=jd['horario_cierre'])
        datos= {'message': "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        events= list(TemporizadorRegado.objects.filter(id=id).values())
        if len(events) > 0:
            event= TemporizadorRegado.objects.get(id=id)
            event.dispositivo= jd['dispositivo']
            event.horario_inicio= jd['horario_inicio']
            event.horario_cierre= jd['horario_cierre']
            event.save()
            datos= {'message': "Success"}
        else:
            datos= {'message': "timer spray not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        events= list(TemporizadorRegado.objects.filter(id=id).values())
        if len(events) > 0:
            Temporizador.objects.filter(id=id).delete()
            datos= {'message': "Success"}
        else:
            datos= {'message': "timer spray not found"}
        return JsonResponse(datos)
