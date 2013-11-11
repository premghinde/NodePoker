var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var evaluator = require('poker-evaluator');
var deck = require('./mods/deck');
var connectionids = [];

io.sockets.on('connection', function (socket) {
	console.log('woo hoooooooo someone connected!')
	console.log(socket.id)

	connectionids.push(socket.id)

	socket.emit('news', {
		hello: 'world'
	});

	socket.on('my other event', function (data) {
		console.log(data);
	});
	if (connectionids.length > 1) {
		socket.on('dealcard', function (data) {
			for (var i = 0; i < 54; i++) {
				socket.emit('newcard', {
					card: deck.newCard()
				})
			}
		});
	}
});

app.use(express.static(__dirname + '/'));

// console.log(evaluator.evalHand(['2c', 'As', 'Ad', '4c', '3c', '9s', 'Js']));
// console.log(evaluator.evalHand(['2s', 'Ac', 'Ah', '4c', '3c', 'Qs', 'Js']));
// console.log(evaluator.evalHand(['2c', 'Ah', 'Ad', '4c', '3c', 'Ks', 'Js']));
// console.log(evaluator.evalHand(['2c', 'Ah', 'Ad', '4c', '4d', 'Ks', '6s']));
// console.log(evaluator.evalHand(['5c', 'Ah', 'Ad', 'Tc', '4d', '8s', 'Ks']));

// create Table

// comms with players

// who is dealer?

// betting

server.listen(3001);