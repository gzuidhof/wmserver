var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) { res.send('Hello world!'); });

var server = app.listen(7170);


var options = {
    debug: true
}

app.use('/api', ExpressPeerServer(server, options));

console.log("Server started, CTRL+C to quit");