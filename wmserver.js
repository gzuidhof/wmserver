var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

var server = app.listen(7170);
app.get('/', function(req, res, next) {
  console.log("Index GET " + req.ip);
  res.send('Hello world!');
  });

var options = {
    debug: true
}

var pjs = ExpressPeerServer(server, options);

app.use('/peerjs', pjs);


console.log("Server started, CTRL+C to quit");

var connected = [];

pjs.on('connection', function (id) {
  console.log(id + " connected.");
  connected.push(id);
});
pjs.on('disconnect', function (id) {
  console.log(id + " disconnected.");

  var index = connected.indexOf(id);
  if (index > -1) {
    connected.splice(index, 1);
  }
});

app.get('/connectedpeers', function (req, res) {
  console.log("Connected peers request from " + req.ip);
  return res.jsonp(connected);
});
