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
#define RELE_PIN 6  // Rele 1 pin
#define RELE2_PIN 7  // Rele 2 pin
#define PIN_MOTX 8  // Servo eje x
#define PIN_MOTY 9  // Servo eje y

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
int vrele=0,vrele2=0,vmotx=0,vmoty=0,pos,pos1,pos2;
String cad,cad1,cad2,cad3,cad4;

// Tamaño del buffer JSON (ajuste según la cantidad de datos)
const size_t capacity = JSON_OBJECT_SIZE(8) + 10;
DynamicJsonDocument doc(capacity);

void setup() {
  Serial.begin(9600);
  motx.attach(PIN_MOTX);
  motx.write(0);
  moty.attach(PIN_MOTY);
  moty.write(0);
  pinMode(PIR_PIN, INPUT);
  pinMode(RELE_PIN, OUTPUT);
  digitalWrite(RELE_PIN, 0);
  pinMode(RELE2_PIN, OUTPUT);
  digitalWrite(RELE2_PIN, 0);
  dht.begin();
}

void loop() {
  // Medir nivel de agua
  unsigned long duration, cm;
  cm = sonar.ping_cm();

  // Detectar movimiento
  int movement = digitalRead(PIR_PIN);

  // Leer datos del puerto serial (comandos Python)
  if(Serial.available()){
    cad = Serial.readString();
    
    //Definir posicion de los indices 
    pos = cad.indexOf(',');
    pos1= cad.indexOf(',', pos + 1);
    pos2= cad.lastIndexOf(',');
    
    //Identificacion de los indices
    cad1= cad.substring(0,pos);
    cad2= cad.substring(pos+1,pos1);
    cad3= cad.substring(pos1+1,pos2);
    cad4= cad.substring(pos2+1);

    //Ejecucion de las ordenes
    if(vrele != cad1.toInt()){
      vrele = cad1.toInt();  
      digitalWrite(RELE_PIN,vrele); 
    }
    if(vrele2 != cad2.toInt()){
      vrele2 = cad2.toInt();
      digitalWrite(RELE2_PIN,vrele2);
    }
    if(vmotx != cad3.toInt()){
      vmotx = cad3.toInt();  
      motx.write(vmotx);  
    }
    if(vmoty != cad4.toInt()){
      vmoty = cad4.toInt();  
      moty.write(vmoty);  
    }
  }
  
  //Leer el estado del Relé
  int estado_rele = digitalRead(RELE_PIN);
  int estado_rele2 = digitalRead(RELE2_PIN);

  // Leer temperatura y humedad
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Verificar si las lecturas son correctas
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Error: Fallo al leer el sensor DHT."));
  } else {
    // Crear el objeto JSON
    JsonObject root = doc.to<JsonObject>();
    root["nivel_agua"] = cm;
    root["movimiento"] = movement;
    root["humedad"] = h;
    root["temperatura"] = t;
    root["estado_rele"] = estado_rele;
    root["estado_rele2"] = estado_rele2;
    root["estado_motx"] = vmotx;
    root["estado_moty"] = vmoty;

    // Serializar el JSON y enviarlo
    serializeJson(doc, Serial);
    Serial.println();
  }
  delay(4000);
}
