#include <MQTTClient.h>
#include <ESP8266WiFi.h>
#include <IRremoteESP8266.h>


#define TOPIC     "/remote/radio"
#define MQTT_ADDR "192.x.x.1"

IRsend irsend(2);
const char* ssid     = "xxx";
const char* password = "zzz";
WiFiClient net;
MQTTClient client;

void connect(); // <- predefine connect() for setup()

void setup() {
  Serial.begin(9600);
  irsend.begin();
  WiFi.begin(ssid, password);
  client.begin(MQTT_ADDR, net);
  connect();
}

void connect() {
  Serial.print("checking wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.print("\nconnecting...");
  while (!client.connect("arduino", "try", "try")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected!");

  client.subscribe(TOPIC);
}

void loop() {

  client.loop();
  delay(10); // <- fixes some issues with WiFi stability
  if(!client.connected()) {
    connect();
  }
}

void radioSend(unsigned long code) {
  for (int i = 0; i < 3; i++) {
    irsend.sendPanasonic(0x4004, code);
    delay(100);
  }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  if(payload == "power") {
    radioSend(0x500BCB9);
  }
  if(payload == "volup") {
    radioSend(0x5000401);
  }
  if(payload == "voldown") {
    radioSend(0x5008481);
  }
  if(payload == "tuner") {
    radioSend(0x500494C);
  }
  if(payload == "cd") {
    radioSend(0x500292C);
  }
  if(payload == "aux") {
    radioSend(0x500595C);
  }
  if(payload == "cdplay") {
    radioSend(0x5505005);
  }
  if(payload == "cdpause") {
    radioSend(0x5506035);
  }
  if(payload == "cdstop") {
    radioSend(0x5500055);
  }
  if(payload == "cdnext") {
    radioSend(0x5505207);
  }
  if(payload == "cdback") {
    radioSend(0x55092C7);
  }

}
