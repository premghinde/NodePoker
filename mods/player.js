var Player = function() {};

Player.prototype = {

	constructor: Player,
	table: null,
	id: null,
	name: null,
	chips: 1000,
	cards: null,
	bet: null,
	dealer: false,
	smallBlind: false,
	bigBlind: false, 
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
		this.dealer = false;
		this.smallBlind = false;
		this.bigBlind = false;
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
		if (this.chips > bet) {
			this.chips -= bet;
		} else {
			bet = this.chips;
			this.chips = 0;
		}
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