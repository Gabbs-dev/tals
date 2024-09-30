import serial
import json
import mysql.connector
import asyncio
from queue import Queue
import socketio

# Definir conexiones

# Base de Datos
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="serial_test"
)

# Socket para recibir datos de React
sio = socketio.Server(async_mode='asgiio')
@sio.event
async def connect(sid, environ):
  print('Client connected:', sid)
if __name__ == '__main__':
  sio.run(host='127.0.0.1', port=8001)  # Bind to all interfaces (optional)

@sio.event
async def enviar_comando(sid, data):
    print('Received command:', data)
    comando = procesar_comando_react(data)
    if comando:
        command_queue.put(comando)
    else:
        # Manejar el error de formato de datos inválido
        await sio.emit('error', 'Formato de datos inválido', namespace='/')

# Recibir React
async def procesar_comando_react(data):
    """Procesa los datos recibidos de React y construye el comando para el serial.
    Args:
        data (dict): Diccionario scon los datos recibidos.
    Returns:
        str: Comando a enviar al puerto serial.
    """
    try:
        l1 = data['l1']
        l2 = data['l2']
        sx = data['sx']
        sy = data['sy']
        # ... (validaciones adicionales si es necesario)
        return f"{l1},{l2},{sx},{sy}\n"
    except KeyError:
        print("Error: Formato de datos inválido")
        return None

# Funciones para insertar datos en la base de datos
async def insertar_na(nivel_agua):
  mycursor = mydb.cursor()
  sql = "INSERT INTO ultrasonico (cm) VALUES (%s)"
  val = (nivel_agua,)
  mycursor.execute(sql, val)
  mydb.commit()
  print("Data succesfully inserted [nivel_agua]")

async def insertar_mv(movimiento):
  mycursor = mydb.cursor()
  sql = "INSERT INTO movimiento (estado) VALUES (%s)"
  val = (movimiento,)
  mycursor.execute(sql, val)
  mydb.commit()
  print("Data succesfully inserted [movimiento]")

async def insertar_tmph(temperatura,humedad):
  mycursor = mydb.cursor()
  sql = "INSERT INTO termometro (temperatura,humedad) VALUES (%s,%s)"
  val = (temperatura,humedad)
  mycursor.execute(sql, val)
  mydb.commit()
  print("Data succesfully inserted [termostato]")

async def insertar_luz(luz1,luz2):
  mycursor = mydb.cursor()
  sql = "INSERT INTO luminaria (estado_rele,estado_rele2) VALUES (%s,%s)"
  val = (luz1,luz2)
  mycursor.execute(sql, val)
  mydb.commit()
  print("Data succesfully inserted [luminarias]")

# Cola de peticiones
command_queue = Queue()

# Funciones de comunicaion Arduino-Python
async def enviar_comando():
  while True:
    if not command_queue.empty():
      comando = command_queue.get()
      async with serial.Serial('COM1',9600) as ser:
        await ser.write(comando.encode('utf-8'))
        print("Data sent successfully")
      asyncio.sleep(2)
    else:
      # Esperar un segundo si no hay comandos por enviar
      asyncio.sleep(1)

async def recibir_y_guardar_datos():
  ser = serial.Serial('COM2',9600)
  while True:
    data = ser.readline().decode('utf-8').strip()
    if data:
      try:
        # Convertir el string JSON a un diccionario
        data_json = json.loads(data)
        nivel_agua = data_json["nivel_agua"]
        movimiento = data_json["movimiento"]
        humedad = data_json["humedad"]
        temperatura = data_json["temperatura"]
        luz1 = data_json["estado_rele"]
        luz2 = data_json["estado_rele2"]
        # Insertar los datos en la base de datos
        await insertar_na(nivel_agua)
        await insertar_mv(movimiento)
        await insertar_tmph(temperatura,humedad)
        await insertar_luz(luz1,luz2)

      except (serial.SerialException, json.JSONDecodeError, mysql.connector.Error) as e:
        print(f"Error: {e}")
      #ser.close()
      asyncio.sleep(2)
    else:
      # Esperar un segundo si existe algun error en la lectura o envio de los datos
      print("Error: Error al leer o enviar los datos")
      asyncio.sleep(1)

'''
async def orden_django(l1,l2,sx,sy):
  comando = f"{l1},{l2},{sx},{sy}\n"
  command_queue.put(comando)
'''
async def main():
  # Crear una tarea para recibir datos
  task_r = asyncio.create_task(recibir_y_guardar_datos())
  while True:
      await task_r

asyncio.run(main())
