var Player = function() {};

Player.prototype = {

	constructor: Player,
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

	bet: function(bet) {
		Table.bet(bet || 50);
	},

	fold: function() {

	},

	check: function() {

	}

}

module.exports = Player;