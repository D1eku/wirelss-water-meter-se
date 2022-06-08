
#include <Arduino.h>
#include <LiquidCrystal.h>

const int rs = D2, en = D3, d4 = D5, d5 = D6, d6 = D7, d7 = D8;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

const string headerText = "Aqua Pro!";

const int buttonPin = D0;

void setup() {
  pinMode(buttonPin, INPUT);
  
  lcd.begin(16, 2);
  lcd.print(headerText);
  lcd.setCursor(0,1);
  lcd.print("Conecting....");
}

void clearScreen(){
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(headerText);
  lcd.setCursor(0,1);
}

void writeScreen(string toWrite){
  clearScreen();
  lcd.print(toWrite);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if(buttonState == HIGH){
    writeScreen("Chupalo felipe varas");
    delay(500);
  }else{
    clearScreen();
  }
}
