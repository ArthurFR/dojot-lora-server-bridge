const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1')
const dojotClient = mqtt.connect('mqtt://192.168.0.117')
const { Kafka } = require('kafkajs')

returnFirst = function(obj) { for(key in obj){return obj[key];} }
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['192.168.9.111:9092', '192.168.0.119:9092', '192.168.0.123:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })
 
const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })
 
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}
 
run().catch(console.error)

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
