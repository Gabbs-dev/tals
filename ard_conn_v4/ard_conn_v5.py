import serial
import json
import mysql.connector
import asyncio
import threading
from queue import Queue

# Base de Datos
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="tals"
)

# Semáforo para controlar el acceso a la base de datos
sem = threading.Semaphore(1)

# Variable global para almacenar los últimos valores de luz1 y luz2
last_luz1 = None
last_luz2 = None

# Extrae el último registro de las tablas solicitadas y lo envía al Arduino.
async def bd_to_ard():
  global last_luz1, last_luz2
  while True:
    with sem:  # Adquiere el semáforo
      try:
        mycursor = mydb.cursor()
        sql = "SELECT luz1, luz2 FROM luminaria ORDER BY id DESC LIMIT 1"  # Ordenamos por ID descendiente y limitamos a 1 resultado
        mycursor.execute(sql)
        result = mycursor.fetchone()
        if result:
          luz1, luz2 = result
          if luz1 != last_luz1 or luz2 != last_luz2:
            comando = f"{luz1},{luz2},0,0\n"
            command_queue.put(comando)
            print(f"Dato enviado al Arduino: {comando}")
            last_luz1, last_luz2 = luz1, luz2
        else:
          print("No se encontraron datos en la tabla luminaria")
      except mysql.connector.Error as err:
        print(f"Error al extraer datos de la base de datos: {err}")
      await asyncio.sleep(2)


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
command_queue = Queue(5)


# Funciones de comunicaion Arduino-Python
async def enviar_comando():
  while True:
    if command_queue:
      comando = command_queue.get()
      with serial.Serial('COM1',9600) as ser:
        command = ser.write(comando.encode('ascii'))
        if command:
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
      await asyncio.sleep(10)
    else:
      # Esperar un segundo si existe algun error en la lectura o envio de los datos
      print("Error: Error al leer o enviar los datos")
      await asyncio.sleep(1)

# Main
async def main():
  task_bd = asyncio.create_task(bd_to_ard()) # Agregar tarea para leer la bd en espera de nuevas instrucciones
  task_s = asyncio.create_task(enviar_comando())  # Agregar tarea para enviar comandos
  #task_r = asyncio.create_task(recibir_y_guardar_datos()) # Agregar tarea para recibir datos y enviarlos a la bd
  while True:
    await asyncio.gather(task_bd,task_s)

asyncio.run(main())
