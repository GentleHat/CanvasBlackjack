//player.js

function Player() {
	this.money = 500;
	this.bet = 0;
	this.hand = new Array();
	this.inHand = false;
	this.value = 0;
	this.stood = false;
	this.wins = 0;
	this.losses = 0;
}

Player.prototype.hit = function() {
	this.hand = deck.draw();
}

Player.prototype.addToBet = function(amount) {
	if (!this.inHand) {
		if (this.money >= this.bet + amount) {
			this.bet += amount;
		}
	}		
}

Player.prototype.hit = function() {
	if (this.inHand && !this.stood) {
		this.drawCard();
		cardsound.play();
		if (this.bustCheck()) this.bust();
	}
	
}

Player.prototype.bust = function() {
	this.stood = true;
	game.ui.setMessage("Bust");
	game.round.lose();
}

Player.prototype.stand = function() {
	if (this.inHand && !this.stood) {
		this.stood = true;
		this.value = getHandValue(this.hand);
		if (getHandValue2(this.hand) <= 21) {
			this.value = getHandValue2(this.hand);
		}
		console.log("Player stand with value: "+this.value);
		game.dealer.turn();
	}
}

Player.prototype.bustCheck = function() {
	if (getHandValue(this.hand) > 21) return true;
	else return false;
}

Player.prototype.drawCard = function() {
	this.hand.push(game.deck.drawCard());
}

Player.prototype.clearBet = function() {
	if (!this.inHand) this.bet = 0;
}

Player.prototype.takeHand = function() {
	this.hand = new Array();
}

Player.prototype.draw = function() {
	drawButton(25,475,200,100);
	ctx.fillStyle = "#FFF";
	ctx.font = "normal 20px Lucida Sans Unicode";
	ctx.textAlign = 'left';
	ctx.fillText("Money: $"+this.money,40,495);
	ctx.fillText("Wins: "+this.wins,40,525);
	ctx.fillText("Losses:"+this.losses,40,555);
	ctx.textAlign = 'center';

	ctx.fillText("Bet: "+this.bet, 615,500);

	for (var i=0;i<this.hand.length;i++) {
		var offset = 400 - (this.hand.length * 40);
		this.hand[i].draw(offset+(i*80), 300);
	}
	ctx.font = "normal 18px Arial"
	ctx.fillStyle = "#000";
	if (getBestHandValue(this.hand) != 0)
		ctx.fillText(getBestHandValue(this.hand), WIDTH/2, 450);
}

function getBestHandValue(array) {
	var num = getHandValue(array);
	if (getHandValue2(array) <= 21) {
		num = getHandValue2(array);
	}
	return num;
}

function getHandValue(array) { //Aces low
	var value = 0;
	for (var i=0;i<array.length;i++) {
		var a = array[i].number;
		if (a == null) continue;
		if (a == "A") value++;
		else if (a == "J") value += 10;
		else if (a == "Q") value += 10;
		else if (a == "K") value += 10;
		else if (a >= 2 && a <= 10) {
			value += a;
		}
	}
	return value;
}

function getHandValue2(array) { //Aces high
	var value = 0;
	var foundAce = false;
	for (var i=0;i<array.length;i++) {
		var a = array[i].number;
		if (a == null) continue;
		if (a == "A") {
			if (!foundAce) {
				value+=11;
				foundAce = true;
			}
			else value += 1;
		}
		else if (a == "J") value += 10;
		else if (a == "Q") value += 10;
		else if (a == "K") value += 10;
		else if (a >= 2 && a <= 10) {
			value += a;
		}
	}
	return value;
}