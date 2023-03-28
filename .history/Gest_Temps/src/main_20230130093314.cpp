#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h"   
#include<IRremote.h>  


#define LedMarcheV 7
#define LedArreeR 8

#define DHTPIN 2   
#define DHTTYPE  DHT11



#define Ventilo 5
const char DIN_RECEPTEUR_INFRAROUGE = 10;
#define Buzzer 9

DHT dht(DHTPIN, DHTTYPE);


IRrecv monRecepteurInfraRouge (DIN_RECEPTEUR_INFRAROUGE);

decode_results messageRecu;


void setup() {   
    pinMode(LedMarcheV,OUTPUT);
    pinMode(LedArreeR,OUTPUT);
    monRecepteurInfraRouge.enableIRIn();
    monRecepteurInfraRouge.blink13(true);
    Serial.begin(9600);    
    dht.begin(); 
    delay(100);
}
void loop() 
{   
    float humidite = dht.readHumidity();
    float temperature = dht.readTemperature();

      if(monRecepteurInfraRouge.decode(&messageRecu))
      {
          if (messageRecu.value == 0xFF30CF)
        {
          digitalWrite(LedMarcheV,1);
          digitalWrite(LedArreeR,0);
          delay(10000);
        }
            if (messageRecu.value == 0xFF18E7)
        {
          digitalWrite(LedMarcheV,0);
          digitalWrite(LedArreeR,1);
          delay(10000);
        }
      }

    if( temperature >30)
      {
            tone(Buzzer,1000,500);
            digitalWrite(Ventilo,1);
            digitalWrite(LedMarcheV,1);
            digitalWrite(LedArreeR,0);
      }
      else
      {
        noTone(Buzzer);
        digitalWrite(Ventilo,0);
        digitalWrite(LedMarcheV,0);
        digitalWrite(LedArreeR,1);
      }
  
      
   
    Serial.print(dht.readTemperature());  
    Serial.print(" C"); 
    Serial.print("/");   
    Serial.print(dht.readHumidity());   
    Serial.println(" %"); 
    delay(200); 
}