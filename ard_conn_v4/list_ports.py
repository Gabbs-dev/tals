import serial.tools.list_ports

puertos = serial.tools.list_ports.comports()
for puerto in puertos:
    print(puerto.device)
