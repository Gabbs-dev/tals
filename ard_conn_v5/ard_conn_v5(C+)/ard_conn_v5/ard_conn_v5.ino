#include <NewPing.h>
#include <DHT.h>
#include <Servo.h>
#include <ArduinoJson.h>

#define TRIG_PIN 2  // pin emisor ultrasonico
#define ECHO_PIN 3  // pin receptor ultrasonico
#define MAX_DISTANCE 200  // Máxima distancia a medir en cm
#define PIR_PIN 4  // Pin sensor movimiento
#define DHTPIN 5  // DHT PIN
#define DHTTYPE DHT11  // TIPO: DHT 11
#define PIN_MOTX 8  // Servo eje x
#define PIN_MOTY 9  // Servo eje y

// Define pins para los seis módulos de relé
#define RELE_PIN 22  // Rele 1 pin
#define RELE2_PIN 23 // Rele 2 pin
#define RELE3_PIN 24 // Rele 3 pin 
#define RELE4_PIN 25 // Rele 4 pin 
#define RELE5_PIN 26 // Rele 5 pin
#define RELE6_PIN 27 // Rele 6 pin

//Parametros para domo de movimiento
Servo motx;
Servo moty;

//Parametros del sensor Ultrasonico
NewPing sonar(TRIG_PIN, ECHO_PIN, MAX_DISTANCE);

//Parametros del sensor de Movimiento
int pirSensor = digitalRead(PIR_PIN);

//Parametros del sensor de Temperatura
DHT dht(DHTPIN, DHTTYPE);

//Parametros para recibir ordenes de python
int vrele = 0, vrele2 = 0, vrele3 = 0, vrele4 = 0, vrele5 = 0, vrele6 = 0, vmotx = 0, vmoty = 40, pos, pos1, pos2, pos3, pos4, pos5, pos6;
String cad, cad1, cad2, cad3, cad4, cad5, cad6, cad7, cad8;

// Tamaño del buffer JSON (ajuste según la cantidad de datos)
const size_t capacity = JSON_OBJECT_SIZE(12) + 10;
DynamicJsonDocument doc(capacity);

// Movimiento automático
bool modo_automatico = false;
const int velocidad = 50; // Ajusta la velocidad del movimiento (ms)
const int angulo_min = 10;
const int angulo_max = 170;

// Switch de tareas
enum Modo {
  ENVIAR,
  RECIBIR
};
Modo modo_actual = ENVIAR;

void setup() {
  Serial.begin(9600);
  motx.attach(PIN_MOTX);
  motx.write(0);
  moty.attach(PIN_MOTY);
  moty.write(40);
  pinMode(PIR_PIN, INPUT);
  // Configura los pines de los relés como salidas
  pinMode(RELE_PIN, OUTPUT);
  digitalWrite(RELE_PIN, 0);
  pinMode(RELE2_PIN, OUTPUT);
  digitalWrite(RELE2_PIN, 0);
  pinMode(RELE3_PIN, OUTPUT);
  digitalWrite(RELE3_PIN, LOW);
  pinMode(RELE4_PIN, OUTPUT);
  digitalWrite(RELE4_PIN, LOW);
  pinMode(RELE5_PIN, OUTPUT);
  digitalWrite(RELE5_PIN, LOW);
  pinMode(RELE6_PIN, OUTPUT);
  digitalWrite(RELE6_PIN, LOW);
  dht.begin();
}

void loop() {
  switch (modo_actual) {
    case ENVIAR:
      enviarDatos();
      delay(1000);
      modo_actual = RECIBIR;
      break;
    case RECIBIR:
      recibirComandos();
      delay(1000);
      modo_actual = ENVIAR;
      break;
  }
}

void enviarDatos(){
  // Medir nivel de agua
  unsigned long duration, cm;
  cm = sonar.ping_cm();
  // Detectar movimiento
  int movement = digitalRead(PIR_PIN); 
  //Leer el estado del Relé
  int estado_rele = digitalRead(RELE_PIN);
  int estado_rele2 = digitalRead(RELE2_PIN);
  int estado_rele3 = digitalRead(RELE3_PIN);
  int estado_rele4 = digitalRead(RELE4_PIN);
  int estado_rele5 = digitalRead(RELE5_PIN);
  int estado_rele6 = digitalRead(RELE6_PIN);
  // Leer temperatura y humedad
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  // Verificar si las lecturas son correctas
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Error: Fallo al leer el sensor DHT."));
  } if (isnan(cm)) {
    Serial.println(F("Error: Fallo al leer el sensor Ultrasonico."));
  } if (isnan(movement)) {
    Serial.println(F("Error: Fallo al leer el sensor de Movimiento."));
  } if (isnan(estado_rele) || isnan(estado_rele2) || isnan(estado_rele3 || isnan(estado_rele4) || isnan(estado_rele5) || isnan(estado_rele6))) {
    Serial.println(F("Error: Fallo al leer el los modulos de Relé."));
  } if (isnan(vmotx) || isnan(vmoty)) {
    Serial.println(F("Error: Fallo al leer los Servomotores."));
  } else {
    // Crear el objeto JSON
    JsonObject root = doc.to<JsonObject>();
    root["nivel_agua"] = cm;
    root["movimiento"] = movement;
    root["humedad"] = h;
    root["temperatura"] = t;
    root["estado_rele"] = estado_rele;
    root["estado_rele2"] = estado_rele2;
    root["estado_rele3"] = estado_rele3;
    root["estado_rele4"] = estado_rele4;
    root["estado_rele5"] = estado_rele5;
    root["estado_rele6"] = estado_rele6;
    root["estado_motx"] = vmotx;
    root["estado_moty"] = vmoty;

    // Serializar el JSON y enviarlo
    serializeJson(doc, Serial);
    Serial.println();
  } 
}

void recibirComandos(){
  // Leer datos del puerto serial (comandos Python)
  if(Serial.available()){
    cad = Serial.readString();
    // Definir posicion de los indices (ajustado para 6 relés y 2 servomotores)
    pos = cad.indexOf(',');
    pos1 = cad.indexOf(',', pos + 1);
    pos2 = cad.indexOf(',', pos1 + 1);
    pos3 = cad.indexOf(',', pos2 + 1);
    pos4 = cad.indexOf(',', pos3 + 1);
    pos5 = cad.indexOf(',', pos4 + 1);
    pos6 = cad.lastIndexOf(',');
    // Identificacion de los indices
    cad1 = cad.substring(0, pos);          // Valor para el relé 1
    cad2 = cad.substring(pos + 1, pos1);   // Valor para el relé 2
    cad3 = cad.substring(pos1 + 1, pos2);  // Valor para el relé 3
    cad4 = cad.substring(pos2 + 1, pos3);  // Valor para el relé 4
    cad5 = cad.substring(pos3 + 1, pos4);  // Valor para el relé 5
    cad6 = cad.substring(pos4 + 1, pos5);  // Valor para el relé 6
    cad7 = cad.substring(pos5 + 1, pos6);  // Valor para el servomotor x
    cad8 = cad.substring(pos6 + 1);        // Valor para el servomotor y
    
    //Ejecucion de las ordenes
    if(vrele != cad1.toInt()){
      vrele = cad1.toInt();  
      digitalWrite(RELE_PIN,vrele); 
    }
    if(vrele2 != cad2.toInt()){
      vrele2 = cad2.toInt();
      digitalWrite(RELE2_PIN,vrele2);
    }
    if(vrele3 != cad3.toInt()){
      vrele3 = cad3.toInt();
      digitalWrite(RELE3_PIN,vrele3);
    }
    if(vrele4 != cad4.toInt()){
      vrele4 = cad4.toInt();
      digitalWrite(RELE4_PIN,vrele4);
    }
    if(vrele5 != cad5.toInt()){
      vrele5 = cad5.toInt();
      digitalWrite(RELE5_PIN,vrele5);
    }
    if(vrele6 != cad6.toInt()){
      vrele6 = cad6.toInt();
      digitalWrite(RELE6_PIN,vrele6);
    }
    if(vmotx != cad7.toInt()){
      vmotx = cad7.toInt();  
      motx.write(vmotx);  
    }
    if(vmoty != cad8.toInt()){
      vmoty = cad8.toInt();  
      moty.write(vmoty);  
    }
    // Limpiar el búfer para el proximo comando
    cad = "";
  }  
}
