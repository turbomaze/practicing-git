#!/usr/bin/env node

var express = require('express');
var http = require('http');
var socket = require('socket.io');
var fs = require('fs');

var app = express();
app.set('views', __dirname+'');
app.engine('html', require('ejs').renderFile);
var server = http.createServer(app);
var io = socket.listen(server);

server.listen(8080);

app.get('/', function(request, response) {
	response.render('index.html');
});

var numClients = 0;
io.sockets.on('connection', function(client) {
	numClients += 1;
	console.log("A client has connected. There "+(numClients==1?"is":"are")+" "+numClients+" "+(numClients==1?"person":"people")+" online");
});

var msgs = ["All of your base are belong to us.", "It dont be like it is but it do.", "Go Brazil!"];
var idx = 0;
setInterval(function() {  
	io.sockets.emit('log', msgs[idx]);
	idx = (idx+1)%msgs.length;
}, 3000);
