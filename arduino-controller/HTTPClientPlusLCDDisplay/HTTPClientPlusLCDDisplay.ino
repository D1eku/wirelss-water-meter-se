/**
   BasicHTTPClient.ino

    Created on: 24.05.2015

*/
#include <LiquidCrystal.h>


#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>

ESP8266WiFiMulti WiFiMulti;

const int rs = D2, en = D3, d4 = D5, d5 = D6, d6 = D7, d7 = D8;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

const String headerText = "Aqua Pro!";

const int buttonPin = D0;
const int ledLCDPin = D1;

bool canShow = false;
bool haveRequest = false;

const char* urlRequest = "http://192.168.5.1:8000/api/medicion/measure/";

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledLCDPin, OUTPUT);

  digitalWrite(ledLCDPin, HIGH);
  
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  lcd.begin(16, 2);
  lcd.print("Aqua pro!");
  lcd.setCursor(0,1);
  lcd.print("Conecting....");

  WiFiMulti.addAP("Raspberry-WIFI", "raspberryembebidos");   // add Wi-Fi networks you want to connect to
  //WiFiMulti.addAP("test", "luciana22"); 
  Serial.println("Connecting ...");
  int i = 0;
  while (WiFiMulti.run() != WL_CONNECTED) { // Wait for the Wi-Fi to connect: scan for Wi-Fi networks, and connect to the strongest of the networks above
    delay(1000);
    Serial.print('.');
  }
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());              // Tell us what network we're connected to
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());           // Send the IP address of the ESP8266 to the computer
}

void makeRequest(){
    WiFiClient client;
    HTTPClient http;
    Serial.print("[HTTP] begin...\n");
    
    if (http.begin(client, urlRequest)) {  // make http request to get measure
      Serial.print("[HTTP] GET...\n"); // start connection and send HTTP header
      int httpCode = http.GET();
      Serial.printf("%d\n",httpCode);
      if (httpCode > 0) {// httpCode will be negative on error
        // HTTP header has been send and Server response header has been handled
        // La request fue enviada y ahora esperamos la respuesta.
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);
        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
          lcd.clear();
          //lcd.print("HTTP Code Response: "+httpCode);
          lcd.print(payload);
          Serial.println("Si entra al if");
        }
        else{
          Serial.println("No entra al if");
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        lcd.print("Unable to Connect HTTP");
      }

      http.end();
    }else {
      Serial.printf("[HTTP} Unable to connect\n");
      lcd.print("Unable to Connect HTTP");
    }
}

void clearScreen(){
  lcd.clear();
}
void writeScreen(String toWrite){
  clearScreen();
  lcd.print(toWrite);
}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {//Siempre que haya conexion wifi.
    int inputButton = digitalRead(buttonPin);//lee el input del boton
    
    if(inputButton == HIGH){
      Serial.println("Input button is HIGH");
      if(canShow){
        canShow = false;
      }
      else{
        canShow = true;
      }
    }else{
      digitalWrite(ledLCDPin, LOW);
    }

    if(canShow){//Si puedes mostrar la informacion en el lcd.;
      digitalWrite(ledLCDPin, HIGH);//Enciende el lcd
      makeRequest();//Conectate a la pagina
      canShow = false;//Ya no puedes mostrar la data.
      delay(4000);
      clearScreen();//Limpia la pantalla
    }
    //else{//Si no limpia la pantalla.
    //  clearScreen();
    //}
    
  }
}
