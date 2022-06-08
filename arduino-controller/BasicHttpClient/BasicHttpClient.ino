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

const int buttonPin = D1;

int buttonState = HIGH;

void setup() {
  pinMode(buttonPin, INPUT);
  
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  Serial.println('\n');
  lcd.begin(16, 2);
  lcd.print("Aqua Pro!");

  WiFiMulti.addAP("test", "luciana22");   // add Wi-Fi networks you want to connect to

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

void loop() {
  if(buttonPin == HIGH){
    Serial.println("Recibiendo on");
  }

  lcd.setCursor(0, 1);
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    WiFiClient client;

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    if (http.begin(client, "http://192.168.227.254:8000/api/medicion/")) {  // HTTP
      

      Serial.print("[HTTP] GET...\n");
      // start connection and send HTTP header
      int httpCode = http.GET();
      Serial.printf("%d\n",httpCode);

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);
        //Serial.println(http.getString());
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
    } else {
      Serial.printf("[HTTP} Unable to connect\n");
      lcd.print("Unable to Connect HTTP");
    }
  }
  delay(5000);
}
