const mqtt = require('mqtt')
var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  clientKafka = new kafka.KafkaClient({ kafkaHost: '192.168.0.111:9092' }),
  producer = new Producer(clientKafka),
  Consumer = kafka.Consumer,
  consumer = new Consumer(clientKafka, [{ topic: "loraDown2", partition: 0 }], {
    autoCommit: true,
    fromOffset: 'latest'
  });

const loraClientConsumer = mqtt.connect('mqtt://127.0.0.1')
loraClientConsumer.on('connect', function () {
  console.log('Lora MQTT consumer client connected')

  consumer.on('message', function (message) {
    const messageObj = JSON.parse(message.value);
    const publishPayload = {
      confirmed: true,
      fPort: 10,
      object: messageObj
    }
    console.log(publishPayload);

    loraClientConsumer.publish('application/1/device/3431373260367a0e/tx', JSON.stringify(publishPayload));
  });
})

// client.createTopics(topicsToCreate, (error, result) => {
//   // result is an array of any errors if a given topic could not be created
// });

returnFirst = function (obj) { for (key in obj) { return obj[key]; } }

producer.on("ready", function () {
  console.log('Producer ready')
  const loraClient = mqtt.connect('mqtt://127.0.0.1')
  loraClient.on('connect', function () {
    console.log('Lora MQTT client connected')
    loraClient.subscribe('application/1/device/3431373260367a0e/rx', function (err) { })

    // setInterval(() => {
    //   const messageObj = {
    //     temperatureSensor: { '1': 0 },
    //     humiditySensor: { '2': 0 },
    //     barometer: { '0': 0 }
    //   };
    //   const messageDown = JSON.stringify(messageObj);
    //   const payloads2 = [{ topic: "loraDown2", messages: messageDown, partition: 0 }];
    //   producer.send(payloads2, function (err, data) { });
    // }, 10000)
  })

  loraClient.on('message', function (topic, message) {
    const messageObj = JSON.parse(message.toString()).object;
    payloads = [
      { topic: "loraTopic", messages: JSON.stringify(messageObj), partition: 0 },
      { topic: "loraDown2", messages: JSON.stringify(messageObj), partition: 0 }
    ];


    const publishPayload = {
      confirmed: true,
      fPort: 10,
      object: messageObj
    }
    // loraClient.publish('application/1/device/3431373260367a0e/tx', JSON.stringify(publishPayload))
    console.log('Received: ', messageObj);
    producer.send(payloads, function(err, data) {});
  })
});

producer.on("error", function (err) {
  console.log(err);
});




