var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient({kafkaHost: '192.168.0.111:9092', requestTimeout: 60000}),
  consumer = new Consumer(client, [{ topic: "loraTopic"}], {
    autoCommit: false,
    fetchMaxWaitMs: 100
  });

//consumer.on("message", function(message) {
  //console.log(message);
/** { topic: 'cat', value: 'I have 385 cats', offset: 412, partition: 0, highWaterOffset: 413, key: null } */
//});
