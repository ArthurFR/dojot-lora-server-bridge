var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1')
var dojotClient = mqtt.connect('mqtt://192.168.0.117')
const messageDevice = `{ "temperatureSensor" : 10.5,"humiditySensor" : 770, "barometer" : 50}`

// dojotClient.on('connect', function () {
//  client.subscribe('/admin/7fa810/attrs', function (err) {
//    if (!err) {
//       dojotClient.publish('presence', 'Hello dojot')
//    }
//  })
// })
returnFirst = function(obj) { for(key in obj){return obj[key];} }

client.on('connect', function () {
  client.subscribe('application/1/device/3431373260367a0e/rx', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  //console.log(JSON.parse(message.toString()).object)
  var messageObj = JSON.parse(message.toString()).object;
  Object.keys(messageObj).map(function(key, index) {messageObj[key] = returnFirst(messageObj[key])})
  console.log(messageObj);
  dojotClient.publish('/admin/4b7a9c/attrs', JSON.stringify(messageObj))
//   client.end()
})

