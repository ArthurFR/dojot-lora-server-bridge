const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1')
const dojotClient = mqtt.connect('mqtt://192.168.0.117')

returnFirst = function(obj) { for(key in obj){return obj[key];} }

client.on('connect', function () {
  client.subscribe('application/1/device/3431373260367a0e/rx', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt');
    }
  })
})
 
client.on('message', function (topic, message) {
  const messageObj = JSON.parse(message.toString()).object;
  Object.keys(messageObj).map(function(key, index) {messageObj[key] = returnFirst(messageObj[key])});
  dojotClient.publish('/admin/4b7a9c/attrs', JSON.stringify(messageObj));
})

dojotClient.on('connect', function () {
  dojotClient.subscribe('/admin/4b7a9c/config', function (err) {
    if (!err) {
      //dojotclient.publish('presence', 'Hello mqtt');
    }
  })
})
 
dojotClient.on('message', function (topic, message) {
  const messageObj = JSON.parse(message.toString());
  const publishPayload = {
    confirmed: true,
    fPort: 10,
    object: {
        humiditySensor: {'0': messageObj.humiditySensorAct},
        barometer: {'1': messageObj.barometerAct},
        temperatureSensor: {'2': messageObj.temperatureSensorAct}
    }
  }
  console.log(publishPayload);
  client.publish('application/1/device/3431373260367a0e/tx', JSON.stringify(publishPayload))
})

