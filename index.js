// const mqtt = require('mqtt')
// const client  = mqtt.connect('mqtt://127.0.0.1')
// const dojotClient = mqtt.connect('mqtt://192.168.0.117')
const kafka = require('kafka-node')
returnFirst = function(obj) { for(key in obj){return obj[key];} }

const client = new kafka.KafkaClient({kafkaHost: '192.168.0.111:9092'});
Producer = kafka.Producer,
producer = new Producer(client);

payloads = [
  { topic: 'topic1', messages: 'hi', partition: 0 },
  { topic: 'topic2', messages: ['hello', 'world', km] }
];
producer.on('ready', function () {
producer.send(payloads, function (err, data) {
  console.log(data);
});
});

producer.on('error', function (err) {})

// client.on('connect', function () {
//   client.subscribe('application/1/device/3431373260367a0e/rx', function (err) {
//     if (!err) {
//       client.publish('presence', 'Hello mqtt');
//     }
//   })
// })
 
// client.on('message', function (topic, message) {
//   const messageObj = JSON.parse(message.toString()).object;
//   // Object.keys(messageObj).map(function(key, index) {messageObj[key] = returnFirst(messageObj[key])});
//   // dojotClient.publish('/admin/4b7a9c/attrs', JSON.stringify(messageObj));
//   const publishPayload = {
//     confirmed: true,
//     fPort: 10,
//     object: messageObj
//   }
//   client.publish('application/1/device/3431373260367a0e/tx', JSON.stringify(publishPayload))
// })
