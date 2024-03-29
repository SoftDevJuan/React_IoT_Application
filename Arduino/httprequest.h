
 #ifndef HTTP_REQUESTS_H
 #define HTTP_REQUESTS_H
 #include <HTTPClient.h>
 #include <WiFi.h>
 #include <ArduinoJson.h>
 #define ssid "IZZI-A5AA_plus"
 #define wifiPassword "xydnqu96"
  

#define LED_PIN      27  // Pin del LED
#define BUZZER_PIN 14 // Pin del buzzer

  
  #define SERVER_ADDRESS "http://192.168.1.12:3000/api/ultrasonico"

  // get a buzzer puerta 1
  #define SERVER_ADDRESS_ACTUADORES "http://192.168.1.12:3000/api/actuadores/6606ebf1d2ae5af273d9837d"

  // get a buzzer puerta 2
  // #define SERVER_ADDRESS_ACTUADORES "http://192.168.1.12:3000/api/actuadores/660357cd0857750eec6c4113"


  // get a buzzer puerta 3
  //#define SERVER_ADDRESS "http://192.168.1.12:3000/api/actuadores/660357d10857750eec6c4119"

  // get a SERVO MOTOR "PUERTA" de la  puerta 1
  #define SERVER_ADDRESS_PUERTA "http://192.168.1.12:3000/api/actuadores/6606ec65d2ae5af273d98383"

// get a SERVO MOTOR "PUERTA" de la  puerta 2
// #define SERVER_ADDRESS_PUERTA "http://192.168.1.12:3000/api/actuadores/6606ec6ad2ae5af273d98385"

// get a SERVO MOTOR "PUERTA" de la  puerta 2
// #define SERVER_ADDRESS_PUERTA "http://192.168.1.12:3000/api/actuadores/6606ec6ed2ae5af273d98387"


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

// FUNCION PARA PETICON GET DE BUZZER 
int performGetRequesBUZZER(String &response) {
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

// FUNCION PARA PETICION GET DE PUERTA 
int performGetRequesPUERTA(String &response) {
  WiFiClient client;
  HTTPClient http;

  if (http.begin(client, SERVER_ADDRESS_PUERTA)) {
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
