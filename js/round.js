//round.js

var currentRound;
function Round() {
	this.over = false;
	currentRound = this;
}

Round.prototype.start = function() {

}

Round.prototype.update = function() {

}

Round.prototype.deal = function() {
	if (game.player.bet > 0 && !game.player.inHand && !game.dealer.inHand) {
		game.player.money -= game.player.bet;
		game.player.drawCard();
		game.player.drawCard();
		setTimeout("game.player.inHand=true;",750); //Delay player move
		doublecardsound.play();
		game.dealer.inHand=true;
		setTimeout("game.dealer.drawCard();cardsound.play();",620);

	}
}

Round.prototype.win = function() {
	//Player wins, give money and message
	game.ui.setMessage("You win!");
	game.player.money += game.player.bet * 2;
	game.player.bet = 0;
	game.player.wins++;
	setTimeout("currentRound.end()", 2000);
}

Round.prototype.check = function() {
	//Check if player busted
}

Round.prototype.lose = function() {
	game.player.bet = 0;
	game.player.losses++;
	setTimeout("currentRound.end()", 2500);
}

Round.prototype.end = function() {
	console.log("Round reset");
	this.over = true;
	game.player.takeHand();
	game.player.inHand = false;
	game.player.stood = false;
	game.dealer.takeHand();
	game.dealer.inHand = false;
	game.deck = new Deck();
}