var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var evaluator = require('poker-evaluator');
var deck = require('./mods/deck');
var Player = require('./mods/player');
var table = require('./mods/table');

var gameChips = 5000;

io.sockets.on('connection', function (socket) {
	table.addPlayer(new Player().setup({
		name: 'Player',
		id: socket.id,
		chips: gameChips,
		socket: socket
	}));

	socket.on('setPlayerName', function (data) {
		table.listPlayers().forEach(function(player) {
			if (player.id === data.id) {
				player.setName(data.name);
			}
		});
		table.updateAllPlayers();
	});

	socket.on('dealcards', function() {
		table.deal();
		table.updateAllPlayers();
	});

	socket.on('bet', function() {
		console.log(arguments)
	});
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