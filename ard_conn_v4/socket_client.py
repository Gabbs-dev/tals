import socket

my_socket = socket.socket()
my_socket.connect()

print('Conectado exitosamente al Servidor')

my_socket.sendall(b'Hola desde el Cliente!')

respuesta = my_socket.recv(1024)
print(respuesta)

