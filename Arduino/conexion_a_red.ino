#include <HTTPClient.h>
#include <WiFi.h>
#include "http_requests.h"
#include <ArduinoJson.h>


#define ssid "IZZI-A5AA_plus"
#define wifiPassword "xydnqu96"
#define timeout 10000


//  #define SERVER_ADDRESS "http://192.168.1.12:3000/api/ultrasonico"
 
#define TRIGGER_PIN  13 // Pin de trigger del sensor ultrasónico
#define ECHO_PIN     12 // Pin de echo del sensor ultrasónico
#define LED_PIN      27  // Pin del LED
#define BUZZER_PIN 14 // Pin del buzzer

#define DISTANCIA_UMBRAL 30 // Distancia umbral para encender el LED en centímetros
#define DISTANCIA_MAXIMA 30 // Distancia máxima del sensor en centímetros
#define LEDC_CHANNEL 0
#define LEDC_FREQ 1000


void setup() {
  
  Serial.begin(115200);
  connectToWifi();

  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  // Configurar el controlador LEDC para el buzzer
  ledcSetup(LEDC_CHANNEL, LEDC_FREQ, 8); // Configurar canal, frecuencia y resolución (8 bits)
  ledcAttachPin(BUZZER_PIN, LEDC_CHANNEL);

}
  


void loop() {

String response;
int httpStatusCode = performGetRequestActuadores(response);

if (httpStatusCode > 0) {
   

  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, response);
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

        // Imprimir los valores del componente
        Serial.println("Componente ID: " + componente_id);
        Serial.println("Valor: " + String(valor));
        Serial.println("Puerta: " + String(puerta));

        
        if (componente_id == "BUZZER" && puerta == 3) {
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

  Serial.println("********************************************************************************");

  
  delay(3000);
} // cerramos lop




