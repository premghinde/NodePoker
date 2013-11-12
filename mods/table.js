var deck = require('./deck');

var Table = function() {};

Table.prototype = {

	constructor: Table,
	players: [],
	pot: 0,
	deck: deck,

	listPlayers: function() {
		return this.players;
	},

	addPlayer: function(player) {
		this.players.push(player);
	},

	hands: {

		newHands: function() {
			this.listPlayers().forEach(function(pl) {
				pl.reset();
			});
			this.updateAllPlayers();
		},

		nextStep: function() {
			this.deal();
		}

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
			pl.socket.emit('tableStatus', {
				name: pl.name,
				chips: pl.chips,
				cards: pl.cards,
				place: pl.place,
				bet: pl.bet,
				pot: that.pot
			});
		});	
	}


};

module.exports = new Table();