import serial
import json
import mysql.connector
import asyncio
import socket
from queue import Queue

# Definir conexiones

# Base de Datos
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="tals"
)


# Funcion para conectar el socket
async def puerto_socket(): 
  # Socket para recibir datos de React
  host = '127.0.0.1'
  port = 12345
  try:
    my_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    inicio_server = my_server.bind( (host,port) )
    server_escucha = my_server.listen(5)
    if inicio_server:
      print('Servidor escuchando en ', host, ':', port)
      if server_escucha:
        while True:
          conn, addr = my_server.accept()
          print('Conexion establecida')
          print(addr)
          while True:
            data = conn.recv(1024)
            if data:
              procesar_comando_react(data)
              conn.sendall(b'Comandos recibidos correctamemte')
            else:
              print(b'Esperando comandos')
            conn.close()
      else:
        print('El servidor no esta escuchando')
    else:
      print('No se pudo inicializar el servidor')
  except:
    print(F'Error: No se pudo establecer conexion')

# Recibir React
async def procesar_comando_react(data):
  """Procesa los datos recibidos de React y construye el comando para el serial.
  Args:
    data (dict): Diccionario scon los datos recibidos.
  Returns:
    str: Comando a enviar al puerto serial.
  """
  try:
    l1 = int(data['l1'])
    l2 = int(data['l2'])
    sx = int(data['sx'])
    sy = int(data['sy'])
    comando = f"{l1},{l2},{sx},{sy}\n"
    command_queue(comando)
  except KeyError:
    print(F"Error: No se pudieron enviar los datos")
    return None
  except ValueError:
    print("Error: Los valores deben ser números enteros")

# Funciones para insertar datos en la base de datos
async def insertar_na(nivel_agua):
  try:
    mycursor = mydb.cursor()
    sql = "INSERT INTO tanque_agua (nivel_agua) VALUES (%s)"
    val = (nivel_agua,)
    mycursor.execute(sql, val)
    mydb.commit()
    print("Data succesfully inserted [nivel_agua]")
  except mysql.connector.Error as err:
    print(f"Error al insertar datos en la base de datos: {err}")

async def insertar_mv(movimiento):
  try:
    mycursor = mydb.cursor()
    sql = "INSERT INTO sensor_movimiento (estado) VALUES (%s)"
    val = (movimiento,)
    mycursor.execute(sql, val)
    mydb.commit()
    print("Data succesfully inserted [movimiento]")
  except mysql.connector.Error as err:
    print(f"Error al insertar datos en la base de datos: {err}")


async def insertar_tmph(temperatura,humedad):
  try:
    mycursor = mydb.cursor()
    sql = "INSERT INTO termostato (temperatura,humedad) VALUES (%s,%s)"
    val = (temperatura,humedad)
    mycursor.execute(sql, val)
    mydb.commit()
    print("Data succesfully inserted [termostato]")
  except mysql.connector.Error as err:
    print(f"Error al insertar datos en la base de datos: {err}")


async def insertar_luz(luz1,luz2):
  try:
    mycursor = mydb.cursor()
    sql = "INSERT INTO luminaria (luz1,luz2) VALUES (%s,%s)"
    val = (luz1,luz2)
    mycursor.execute(sql, val)
    mydb.commit()
    print("Data succesfully inserted [luminarias]")
  except mysql.connector.Error as err:
    print(f"Error al insertar datos en la base de datos: {err}")


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
      await asyncio.sleep(2)
    else:
      # Esperar un segundo si no hay comandos por enviar
      await asyncio.sleep(1)

# Recibir datos de arduino a traves del puerto virtual de comunicacion "COM2"
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
      await asyncio.sleep(2)
    else:
      # Esperar un segundo si existe algun error en la lectura o envio de los datos
      print("Error: Error al leer o enviar los datos")
      await asyncio.sleep(1)

# Main xd
async def main():
  # Inicializar el puerto socket (supuestamente)
  task_server = asyncio.create_task(puerto_socket())
  await task_server
  # Crear una tarea para recibir datos
  task_r = asyncio.create_task(recibir_y_guardar_datos())
  while True:
      await task_r

asyncio.run(main())
