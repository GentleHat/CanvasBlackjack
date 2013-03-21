//dealer.js

function Dealer() {
	this.hand = new Array();
	this.inHand = false;
}
var dealer;
Dealer.prototype.turn = function() {
	dealer = this;
	this.takeTurn();
}

Dealer.prototype.takeTurn = function() {
	dealer = this;
	this.drawCard();
	cardsound.play();
	this.value = getHandValue(this.hand);
	if (getHandValue2(this.hand) <= 21) {
		this.value = getHandValue2(this.hand);
	}
	if (this.value <= 16)
	{
		setTimeout("dealer.takeTurn();",500);
		return;
	}
	else if (this.value < game.player.value) {
		game.ui.setMessage("You win!");
		game.round.win();
	}

	if (this.value > 21) {
		console.log("Dealer busted!");
		game.ui.setMessage("Dealer Busts!");
		game.round.win();
	}
	else if (this.value >= game.player.value) {
		console.log("Dealer has "+this.value);
		game.ui.setMessage("Dealer wins");
		game.round.lose();
	}
}
Dealer.prototype.drawCard = function() {
	this.hand.push(game.deck.drawCard());
}

Dealer.prototype.draw = function() {

	for (var i=0;i<this.hand.length;i++) {
		var offset = 400 - (this.hand.length * 40);
		this.hand[i].draw(offset+(i*80), 10);
	}
	ctx.fillStyle = "#000";
	if (getBestHandValue(this.hand) != 0)
		ctx.fillText(getBestHandValue(this.hand), WIDTH/2, 145);
}


Dealer.prototype.takeHand = function() {
	this.hand = new Array();
}