var Player = function() {};

Player.prototype = {

	constructor: Player,
	id: null,
	name: null,
	chips: 1000,

	setup: function(data) {
		console.log('in player setup', data)
		if (data) {
			this.setId(data.id);
			this.setName(data.name);
			if (data.chips) {
				this.chips = data.chips;
			}
		}
		return this;
	},

	setName: function(name) {
		this.name = name;
	},

	setId: function(id) {
		this.id = id;
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