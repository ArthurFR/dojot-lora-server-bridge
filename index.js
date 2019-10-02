const mqtt = require('mqtt')
var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  clientKafka = new kafka.KafkaClient({kafkaHost: '192.168.0.111:9092'}),
  producer = new Producer(clientKafka);

returnFirst = function(obj) { for(key in obj){return obj[key];} }

producer.on("ready", function() {
  const loraClient = mqtt.connect('mqtt://127.0.0.1')
  loraClient.on('connect', function () {
    loraClient.subscribe('application/1/device/3431373260367a0e/rx', function (err) {})
  })

  loraClient.on('message', function (topic, message) {
    const messageObj = JSON.parse(message.toString()).object;
    payloads = [{ topic: "loraTopic", messages: JSON.stringify(messageObj), partition: 0 }];

    producer.send(payloads, function(err, data) {});
  })
});

producer.on("error", function(err) {
  console.log(err);
});


 

