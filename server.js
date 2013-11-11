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
	player = new Player();
	table.addPlayer(player.setup({
		name: 'Player' + socket.id,
		id: socket.id,
		chips: gameChips
	}));
	socket.emit('playerJoined', {
		name: 'Player' + socket.id
	});

	socket.on('my other event', function (data) {
		console.log(data);
	});
	socket.on('setPlayerName', function (data) {
		console.log(data);
		table.listPlayers().forEach(function(player) {
			console.log(player.id, data.id)
			if (player.id === data.id) {
				player.setName(data.name);
			}
		});
		console.log(table.listPlayers())
	});
	console.log(table.listPlayers())
	
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