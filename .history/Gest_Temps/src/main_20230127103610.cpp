#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h"   
#include<IRremote.h>  


#define DHTPIN 2   
#define DHTTYPE  DHT11



#define Ventilo 5
#define maTleCommande 10
#define Buzzer 9

DHT dht(DHTPIN, DHTTYPE);


IRrecv receptFonction(maTleCommande);
decode_results Consigne;


void setup() {   
    Serial.begin(9600);    
    dht.begin(); 
    delay(100);
}
void loop() 
{   
    float humidite = dht.readHumidity();
    float temperature = dht.readTemperature();

      if(receptFonction.decode(&Consigne))
      {
          if(Consigne.value == 0xFF30CF)
          {
            digitalWrite(Ventilo,!digitalRead(Ventilo));
          }
      }
      if( temperature >30)
      {
            tone(Buzzer,100,500);
            digitalWrite(Ventilo,1);
      }
      else
      {
        noTone(Buzzer);
        digitalWrite(Ventilo,0);
      }
    Serial.print(dht.readTemperature());  
    Serial.print(" C"); 
    Serial.print("/");   
    Serial.print(dht.readHumidity());   
    Serial.println(" %"); 
    delay(200); 
}
