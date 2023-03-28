#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h"   
#include<IRremote.h>  

#define DHTPIN 2   
#define DHTTYPE  DHT11

#define Ventilo 5

const int PIN_RECEPTEUR_INFRAROUGE = 10;
#define Buzzer 9

DHT dht(DHTPIN, DHTTYPE);


IRrecv monRecepteurInfraRouge(PIN_RECEPTEUR_INFRAROUGE);

decode_results messageRecu;


void setup() {   

    pinMode(Ventilo,OUTPUT);
    monRecepteurInfraRouge.enableIRIn();
    monRecepteurInfraRouge.blink13(true);
    Serial.begin(9600);    
    dht.begin(); 
    delay(100);
}
int InterfaceButun = LOW;
int maCommande = LOW;
int maCommande0 = LOW;
void loop() 
{   
    char incomingByte = Serial.read();
    float humidite = dht.readHumidity();
    float temperature = dht.readTemperature();
if(temperature >30)
      {
            digitalWrite(Ventilo,HIGH);
            tone(Buzzer,1000,500);
      }
    
   if (monRecepteurInfraRouge.decode(&messageRecu))
  {
    
    if (messageRecu.value == 0xFF30CF)
        {
          maCommande = HIGH;
          if (maCommande == HIGH)
          {
            digitalWrite(Ventilo,HIGH);
          delay(1000);
          }
          
        }
        else if (messageRecu.value == 0xFF6897)
          { maCommande = LOW;
            if (maCommande == LOW)
            {
              digitalWrite(Ventilo,LOW);
              delay(1000);
            }
            
          }
      monRecepteurInfraRouge.resume();
  }
  
      /*Serial.println(incomingByte);*/
      
    
     
     
    if(incomingByte == '1')
    {
      InterfaceButun =HIGH;
      if (InterfaceButun == HIGH)
      {
        digitalWrite(Ventilo,HIGH);
      }
    }
    else if(incomingByte == '0')
    {
      InterfaceButun =LOW;
      if (InterfaceButun == LOW)
      {
        if(digitalRead(Ventilo == HIGH))
        {
          digitalWrite(Ventilo,LOW);
        }
      }
    }
    
       else 
      {
        if (maCommande == HIGH || InterfaceButun == HIGH || temperature >30)
        {
          digitalWrite(Ventilo,HIGH);
        }
        else if (maCommande == LOW || InterfaceButun == LOW ||temperature<30)
        {
          maCommande0 = LOW;
          if (maCommande0 == LOW)
          {
            digitalWrite(Ventilo,LOW);
          }
          
        }
        //noTone(Buzzer);
        //digitalWrite(Ventilo,LOW);
        }
     
       
     

   
  // Serial.println(Serial.read());
  

   
    Serial.print(temperature); 
    delay(800); 
    Serial.print("°C"); 
    Serial.print("/");   
    Serial.print(humidite);   
    Serial.println(" %"); 
    delay(500); 
}
