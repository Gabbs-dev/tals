import serial
import serial.tools.list_ports
import threading

# Listar puertos disponibles
puertos = serial.tools.list_ports.comports()
for puerto in puertos:
    print(puerto.device)

# Seleccionar puertos disponibles
puerto_fisico = serial.Serial('COM3', 9600)

# Funcion para leer datos
def manejar_puerto(pF, pV):
    while True:
        try:
            datos = pF.read(1024)
            pV.write(datos)
        except serial.SerialException as e:
            print(f"Error en la comunicación: {e}")
            break

# Puertos virtuales
puerto_virtual1 = serial.Serial('COM4', 9600)  # Cambia 'COM1' por un puerto disponible
puerto_virtual2 = serial.Serial('COM5', 9600)  # Cambia 'COM2' por un puerto disponible

# Creacion de hilos para manejar los puertos
hilo_envio = threading.Thread(target=manejar_puerto, args=(puerto_fisico, puerto_virtual1))
hilo_recepcion = threading.Thread(target=manejar_puerto, args=(puerto_fisico, puerto_virtual2))


# Inicio de los hilos
hilo_envio.start()
print('Puerto COM4 de envio [Abierto]')
print(puerto_virtual1)

hilo_recepcion.start()
print('Puerto COM5 de recepcion [Abierto]')
print(puerto_virtual2)
