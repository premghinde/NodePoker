var Table = function() {};

Table.prototype = {

	constructor: Table,
	players: [],
	pot: 0,

	listPlayers: function() {
		return this.players;
	},

	addPlayer: function(player) {
		this.players.push(player);
	},

	status: function() {
		return {
			players: this.listPlayers(),
			pot: this.pot
		}
	}

};

module.exports = new Table();