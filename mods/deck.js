var Deck = function () {};

Deck.prototype = {

	constructor: Deck,

	cards: [],

	setup: function () {
		var vals = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
			suits = ['c', 'd', 's', 'h'],
			i,
			j;

		for (i = 0; i < vals.length; i++) {
			for (j = 0; j < suits.length; j++) {
				this.cards.push({
					val: vals[i],
					suit: suits[j]
				});
			}
		}

		this.shuffle();
	},

	newCard: function () {
		return this.cards.shift();
	},

	shuffle: function () {
		var counter = this.cards.length,
			temp,
			index;

		while (counter > 0) {
			index = (Math.random() * counter--) | 0;
			temp = this.cards[counter];
			this.cards[counter] = this.cards[index];
			this.cards[index] = temp;
		}
	}

};

var deck = new Deck();
deck.setup();
module.exports = deck;