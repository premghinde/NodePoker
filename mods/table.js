var deck = require('./deck');

var Table = function() {};

Table.prototype = {

	constructor: Table,
	players: [],
	pot: 0,
	deck: deck,
	dealerPosition: null,

	listPlayers: function() {
		return this.players;
	},

	addPlayer: function(player) {
		player.table = this;
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

	setDealer: function() {
		if (this.dealerPosition) {
			if (this.dealerPosition === this.players.length - 1) {
				this.dealerPosition = 0;
			} else {
				this.dealerPosition++;
			}
			if (!this.players[this.dealerPosition].chips) {
				this.setDealer();
				this.players[this.dealerPosition].place = null;
			} else {
				this.players[this.dealerPosition].place = 0;
			}
		} else {
			this.dealerPosition = Math.floor(Math.random() * this.players.length);
			this.setDealer();
		}
		this.updateAllPlayers();
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