#include <HTTPClient.h>
#include <WiFi.h>
#include "http_requests.h"
#include <ArduinoJson.h>
#include <ESP32Servo.h>

// PARA LA RED WIFI
#define ssid "IZZI-A5AA_plus"
#define wifiPassword "xydnqu96"
#define timeout 10000
 

// PINES DE SERVO Y BUZZER 

#define LED_PIN      27  // Pin del LED
#define BUZZER_PIN 14 // Pin del buzzer
#define SERVO_PIN 12 // Pin del servo motor
#define LEDC_CHANNEL 0
#define LEDC_FREQ 1000

Servo servo;

void setup() {
  
  Serial.begin(115200);
  connectToWifi();

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  // Configurar el controlador LEDC para el buzzer
  ledcSetup(LEDC_CHANNEL, LEDC_FREQ, 8); // Configurar canal, frecuencia y resolución (8 bits)
  ledcAttachPin(BUZZER_PIN, LEDC_CHANNEL);
  digitalWrite(LED_PIN, LOW); // Asegurar que el LED esté apagado al iniciar
  servo.attach(SERVO_PIN); // Asigna el pin 12 al servo motor

}
  


void loop() {

// CONTROLAMOS EL BUZZER CON LA RESPUESTA DEL GET 
String responseBuzzer;
int httpStatusCodeBuzzer  = performGetRequesBUZZER(responseBuzzer);

if (httpStatusCodeBuzzer  > 0) {
   // Imprimir la respuesta JSON recibida
  printJsonResponse(responseBuzzer);

  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, responseBuzzer);
  if (!error) {
    // Verificar si el documento JSON es un objeto y contiene datos
    if (doc.is<JsonObject>()) {
      JsonObject obj = doc.as<JsonObject>();
      
      // Verificar si los campos existen en el objeto JSON
      if (obj.containsKey("componente_id") && obj.containsKey("valor") && obj.containsKey("puerta")) {
        // Obtener los valores de los campos
        String componente_id = obj["componente_id"].as<String>();
        bool valor = obj["valor"].as<bool>();
        int puerta = obj["puerta"].as<int>();

        // Imprimir los valores obtenidos
        Serial.println("Componente ID: " + componente_id);
        Serial.println("Valor: " + String(valor));
        Serial.println("Puerta: " + String(puerta));

        // Controlamos el buzzer con los valores obtenidos, en este caso se valida que el nombre del componente obtenido sea BUZZER, que su clave puerta sea 3 y se valida si el valor se encuentra en verdadero o en falso y se prende o se apaga el buzzer de la esp

        if (componente_id == "BUZZER" && puerta == 1) {
          if (valor) {
            tone(BUZZER_PIN, 1000);
            delay(2000);
          } else {
            noTone(BUZZER_PIN);
          }
        }
      } else {
        Serial.println("Algunos campos necesarios no están presentes en el JSON");
      }
    } else {
      Serial.println("La respuesta JSON no es un objeto válido");
    }
  } else {
    Serial.print(F("Error al analizar JSON: "));
    Serial.println(error.c_str());
  }
}



// CONTROLAMOS EL SERVO MOTOR CON LA RESPUESTA DEL GET
String responseServo;
int httpStatusCodeServo  = performGetRequesPUERTA(responseServo);

if (httpStatusCodeServo  > 0) {
   // Imprimir la respuesta JSON recibida
  printJsonResponse(responseServo);

  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, responseServo);
  if (!error) {
    // Verificar si el documento JSON es un objeto y contiene datos
    if (doc.is<JsonObject>()) {
      JsonObject obj = doc.as<JsonObject>();
      
      // Verificar si los campos existen en el objeto JSON
      if (obj.containsKey("componente_id") && obj.containsKey("valor") && obj.containsKey("puerta")) {
        // Obtener los valores de los campos
        String componente_id = obj["componente_id"].as<String>();
        bool valor = obj["valor"].as<bool>();
        int puerta = obj["puerta"].as<int>();

        // Imprimir los valores obtenidos
        Serial.println("Componente ID: " + componente_id);
        Serial.println("Valor: " + String(valor));
        Serial.println("Puerta: " + String(puerta));

        // Controlamos el buzzer con los valores obtenidos, en este caso se valida que el nombre del componente obtenido sea BUZZER, que su clave puerta sea 3 y se valida si el valor se encuentra en verdadero o en falso y se prende o se apaga el buzzer de la esp

        if (componente_id == "PUERTA" && puerta == 1) {
          if (valor ) {
            servo.write(90);
            digitalWrite(LED_PIN, HIGH); // Encender el LED
            delay(2000);
          } else {
            servo.write(0);
            digitalWrite(LED_PIN, LOW); // Apagar el LED
          }
        }
      } else {
        Serial.println("Algunos campos necesarios no están presentes en el JSON");
      }
    } else {
      Serial.println("La respuesta JSON no es un objeto válido");
    }
  } else {
    Serial.print(F("Error al analizar JSON: "));
    Serial.println(error.c_str());
  }
}





  delay(3000);
} // cerramos lop




