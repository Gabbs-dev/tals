import socket
import json

host = '127.0.0.1' # Direccion IP localhost
port = 12345       # Puerto

my_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
my_server.bind( (host,port) )
my_server.listen(5)

print('Servidor escuchando en ', host, ':', port)

while True:
    conn, addr = my_server.accept()
    print('Conexion establecida')

    while True:
        data = conn.recv(1024)
        if data:
            

        print('Datos recibidos: ', jd.decode())
        conn.sendall(b"{'message': Mensaje Recibido }")
    conn.close()
