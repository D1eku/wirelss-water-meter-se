
#include <Arduino.h>
#include <LiquidCrystal.h>

const int rs = D2, en = D3, d4 = D5, d5 = D6, d6 = D7, d7 = D8;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

const String headerText = "Aqua Pro!";

const int buttonPin = D0;

bool canShow = false;

void setup() {
  pinMode(buttonPin, INPUT);
  Serial.begin(115200);
  
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

void writeScreen(String toWrite){
  clearScreen();
  lcd.print(toWrite);
}

void loop() {
  int inputButton = digitalRead(buttonPin);//lee el input del boton
  if(canShow){//Si puedes mostrar la informacion en el lcd.
    writeScreen("Guaton Culiao");
    canShow = false;
    delay(1500);
  }
  else{
    clearScreen();
  }
  if(inputButton == HIGH){
    Serial.println("Input button is HIGH");
    if(canShow){
      canShow = false;
    }
    else{
      canShow = true;
    }
  }
}
