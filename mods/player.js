var Player = function() {};

Player.prototype = {

	constructor: Player,
	table: null,
	id: null,
	name: null,
	chips: 1000,
	cards: null,
	bet: null,
	place: null, // dealer = 0 / small blind = 1 / big blind = 2,
	socket: null,

	setup: function(data) {
		if (data) {
			this.setId(data.id);
			this.setName(data.name);
			this.socket = data.socket;
			if (data.chips) {
				this.chips = data.chips;
			}
		}
		this.reset();
		return this;
	},

	reset: function() {
		this.cards = [];
		this.bet = 0;
		this.place = null;
	},

	setName: function(name) {
		this.name = name;
	},

	setId: function(id) {
		this.id = id;
	},

	setCard: function(card) {
		this.cards.push(card);
		this.socket.emit('newcard', {
			card: card
		});
	},

	placeBet: function(bet) {
		if (this.bet) {
			this.bet += bet;
		} else {
			this.bet = bet;
		}
		this.table.pot += bet;
	},

	fold: function() {

	},

	check: function() {

	}

}

module.exports = Player;