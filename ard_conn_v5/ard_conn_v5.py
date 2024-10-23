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

async def insertar_cameras(posicion_x,posicion_y):
  try:
    mycursor = mydb.cursor()
    sql = "INSERT INTO camaras (posicion_x,posicion_y) VALUES (%s,%s)"
    val = (posicion_x,posicion_y)
    mycursor.execute(sql, val)
    mydb.commit()
    print("Data succesfully inserted [camaras]")
  except mysql.connector.Error as err:
    print(f"Error al insertar datos en la base de datos: {err}")

async def insertar_luz(luz1,luz2,luz3,luz4,luz5,luz6):
  try:
    mycursor = mydb.cursor()
    sql = "INSERT INTO luminaria (luz1,luz2,luz3,luz4,luz5,luz6) VALUES (%s,%s,%s,%s,%s,%s)"
    val = (luz1,luz2,luz3,luz4,luz5,luz6)
    mycursor.execute(sql, val)
    mydb.commit()
    print("Data succesfully inserted [luminarias]")
  except mysql.connector.Error as err:
    print(f"Error al insertar datos en la base de datos: {err}")

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
        luz3 = data_json["estado_rele3"]
        luz4 = data_json["estado_rele4"]
        luz5 = data_json["estado_rele5"]
        luz6 = data_json["estado_rele6"]
        servo_x = data_json["estado_motx"]
        servo_y = data_json["estado_moty"]
        # Insertar los datos en la base de datos
        await insertar_na(nivel_agua)
        await insertar_mv(movimiento)
        await insertar_tmph(temperatura,humedad)
        await insertar_luz(luz1,luz2,luz3,luz4,luz5,luz6)
        await insertar_cameras(servo_x,servo_y)
      except (serial.SerialException, json.JSONDecodeError, mysql.connector.Error) as e:
        print(f"Error: {e}")
      await asyncio.sleep(2)
    else:
      # Esperar un segundo si existe algun error en la lectura o envio de los datos
      print("Error: Error al leer o enviar los datos")
      await asyncio.sleep(1)

# Main
async def main():
  await recibir_y_guardar_datos()

asyncio.run(main())