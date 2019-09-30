const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1')
const dojotClient = mqtt.connect('mqtt://192.168.0.117')
const kafka = require('kafka-node'),

returnFirst = function(obj) { for(key in obj){return obj[key];} }
Producer = kafka.Producer
KeyedMessage = kafka.KeyedMessage
kafkaClient = new kafka.KafkaClient({kafkaHost: '192.168.0.111:9092'})
kafkaProducer = new Producer(client)

// Consumer = kafka.Consumer
// consumer = new Consumer(
//     kafkaClient,
//     [
//         { topic: 'loraTopic', partition: 0 },
//     ],
//     {
//         autoCommit: false
//     }
// );

// consumer.on('message', function (message) {
//   console.log(message);
// });

// client.on('connect', function () {
//   client.subscribe('application/1/device/3431373260367a0e/rx', function (err) {
//     if (!err) {
//       client.publish('presence', 'Hello mqtt');
//     }
//   })
// })

kafkaProducer.on('ready', function () {
  // client.on('message', function (topic, message) {
  //   const messageObj = JSON.parse(message.toString()).object;
  //   const payloads = [
  //     { topic: 'loraTopic', messages: message,},
  //   ];

  //   producer.send(payloads, function (err, data) {
  //       // console.log(data);
  //   });
  // })
  while(true) {
    setTimeout( ()=> {
      const payloads = [
        { topic: 'loraTopic', messages: 'hi',},
      ];
      kafkaProducer.send(payloads, function (err, data) {
        console.log(data);
      });
    }, 1000)
  }
});
