// const mqtt = require('mqtt')
// const client  = mqtt.connect('mqtt://127.0.0.1')
// const dojotClient = mqtt.connect('mqtt://192.168.0.117')
const kafka = require('kafka-node')
returnFirst = function(obj) { for(key in obj){return obj[key];} }

const client = new kafka.KafkaClient({kafkaHost: '192.168.0.111:9092'});
const clientConsumer = new kafka.KafkaClient({kafkaHost: '192.168.0.111:9092'});
Producer = kafka.Producer,
producer = new Producer(client);

Consumer = kafka.Consumer
consumer = new Consumer(
    clientConsumer,
    [
        { topic: 'loraTopic', partition: 0 },
    ],
    {
        autoCommit: false
    }
);

consumer.on('message', function (message) {
  console.log(message);
});

payloads = [
  { topic: 'loraTopic', messages: 'hi', partition: 0 },
  { topic: 'loraTopic', messages: ['hello', 'world'] }
];
producer.on('ready', function () {
  setInterval(()=>{
    producer.send(payloads, function (err, data) {
      console.log(data);
    });
  }, 10000)
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
