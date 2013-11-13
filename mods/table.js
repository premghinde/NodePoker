var deck = require('./deck');
var evaluator = require('poker-evaluator');

var Table = function() {};

Table.prototype = {

	constructor: Table,
	players: [],
	pot: 0,
	deck: deck,
	dealerPosition: null,
	currentPlayer: null,

	listPlayers: function() {
		return this.players;
	},

	addPlayer: function(player) {
		player.table = this;
		this.players.push(player);
	},

	resetHands: function() {
		this.listPlayers().forEach(function(pl) {
			pl.reset();
		});
		this.setPositions();
	},

	evaluateHands: function() {
		var winner = null;
		this.listPlayers().forEach(function(pl) {
			var cards = [];
			pl.cards.forEach(function(card) {
				cards.push(card.str);
			});
			pl.rank = evaluator.evalHand(cards);
			if (winner) {
				if (winner.rank.value < pl.rank.value) {
					winner = pl;
				}
			} else {
				winner = pl;
			}
		});
		winner.chips += this.pot;
		this.reset();
		console.log('winner ',winner.name)
	},

	deal: function() {
		var cardsdealt = this.listPlayers()[0].cards.length;
		if (cardsdealt === 0) {
			for (var i = 0; i < 2; i++) {
				this.players.forEach(function(pl) {
					pl.setCard(deck.newCard());
				});
			}
		}
		if (cardsdealt === 2) {
			for (var i = 0; i < 3; i++) {
				var flopCard = deck.newCard();
				this.players.forEach(function(pl) {
					pl.setCard(flopCard);
				});
			}
		}
		if (cardsdealt === 5) {
			var turnCard = deck.newCard();
			this.players.forEach(function(pl) {
				pl.setCard(turnCard);
			});
		}
		if (cardsdealt === 6) {
			var riverCard = deck.newCard();
			this.players.forEach(function(pl) {
				pl.setCard(riverCard);
			});
		}
		if (cardsdealt > 6) {
			this.evaluateHands();
		}
	},

	setPositions: function() {
		if (this.dealerPosition !== null) {
			if (this.dealerPosition === this.players.length - 1) {
				this.dealerPosition = 0;
			} else {
				this.dealerPosition++;
			}
			if (!this.players[this.dealerPosition].chips) {
				this.players[this.dealerPosition].dealer = false;
				this.setPositions();
			} else {
				this.players[this.dealerPosition].dealer = true;
			}
			var smallBlindPosition = this.findActivePlayer(this.dealerPosition);
			this.players[smallBlindPosition].smallBlind = true;
			var bigBlindPosition = this.findActivePlayer(smallBlindPosition);
			this.players[bigBlindPosition].bigBlind = true;
		} else {
			this.dealerPosition = Math.floor(Math.random() * this.players.length);
			this.setPositions();
		}
		this.updateAllPlayers();
	},

	findActivePlayer: function(playerIdx) {
		if (playerIdx + 1 === this.players.length) {
			playerIdx = -1;
		}
		if (this.players[playerIdx + 1].chips) {
			return playerIdx + 1;
		} else {
			this.findActivePlayer(playerIdx + 1);
		}
	},

	reset: function() {
		this.pot = 0;
		this.resetHands();
	},

	status: function() {
		return {
			players: this.listPlayers(),
			pot: this.pot
		}
	},

	updateAllPlayers: function () {
		var that = this;
		this.status().players.forEach(function(pl) {
			var hand = '',
				holder = [];
			if (pl.cards.length % 2) {
				pl.cards.forEach(function(card){
					holder.push(card.str);
				});
				hand = evaluator.evalHand(holder).handName
			}
			pl.socket.emit('tableStatus', {
				name: pl.name,
				chips: pl.chips,
				cards: pl.cards,
				dealer: pl.dealer,
				smallBlind: pl.smallBlind,
				bigBlind: pl.bigBlind,
				bet: pl.bet,
				pot: that.pot,
				hand: hand
			});
		});	
	}

};

module.exports = new Table();