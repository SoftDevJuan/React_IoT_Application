
 #ifndef HTTP_REQUESTS_H
 #define HTTP_REQUESTS_H
 #include <HTTPClient.h>
 #include <WiFi.h>
 #include <ArduinoJson.h>
 #define ssid "IZZI-A5AA_plus"
 #define wifiPassword "xydnqu96"
  

#define TRIGGER_PIN  13 // Pin de trigger del sensor ultrasónico
#define ECHO_PIN     12 // Pin de echo del sensor ultrasónico
#define LED_PIN      27  // Pin del LED
#define DISTANCIA_UMBRAL 30 // Distancia umbral para encender el LED en centímetros
#define DISTANCIA_MAXIMA 30 // Distancia máxima del sensor en centímetros
#define BUZZER_PIN 14 // Pin del buzzer
#define LEDC_CHANNEL 0
#define LEDC_TIMER 1
#define LEDC_FREQ 1000

  

  // get a buzzer puerta 1
  #define SERVER_ADDRESS_ACTUADORES "http://192.168.1.12:3000/api/actuadores/660357c90857750eec6c410d"

  // get a buzzer puerta 2
  // #define SERVER_ADDRESS_ACTUADORES "http://192.168.1.12:3000/api/actuadores/660357cd0857750eec6c4113"


  // get a buzzer puerta 3
  //#define SERVER_ADDRESS "http://192.168.1.12:3000/api/actuadores/660357d10857750eec6c4119"

  #define HTTP_TIMEOUT 5000 // tiempo de espera para la conexion



  void connectToWifi() {
    Serial.print("Conectando a ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, wifiPassword);

    unsigned long startAttempTime = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startAttempTime < HTTP_TIMEOUT) {
      delay(5000);
      Serial.print(".");
    }
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("Falló al conectar");
    } else {
      Serial.println("Conectado a la red wifi");
      Serial.println(WiFi.localIP());
    }
  }


int performGetRequestActuadores(String &response) {
  WiFiClient client;
  HTTPClient http;

  if (http.begin(client, SERVER_ADDRESS_ACTUADORES)) {
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      // Leer la respuesta JSON solo si la solicitud es exitosa
      response = http.getString();
     

      http.end();
      return httpResponseCode;
    } else {
      Serial.print("Error en la solicitud GET. Código de error: ");
      Serial.println(httpResponseCode);
    }
  } else {
    Serial.println("Error al conectar al servidor");
  }

  return 0; // Devolver un código de estado 0 en caso de error
}

// Agregar una función para imprimir la respuesta JSON recibida
void printJsonResponse(const String& response) {
  Serial.println("--------------------- ACTUADORES DISPONIBLES --------------------");
  Serial.println(response);
}


  #endif
