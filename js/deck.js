
function Deck() {
	this.cards = new Array();
	for (var i=1;i<53;i++) {
		var num = i % 13;
		if (num == 1) num = "A"
		else if (num == 11) num = "J";
		else if (num == 12) num = "Q";
		else if (num == 0) num = "K";
		var suit = "spade";
		if (i <= 13) suit = "spade";
		else if (i <= 26) suit = "club";
		else if (i <= 39) suit = "heart";
		else suit = "diamond";
		this.cards[i] = new Card(num, suit);
	}
	this.cards = this.cards.splice(1,52);
	this.shuffle();
	shufflesound.play();
}

Deck.prototype.drawCard = function() {
	//var card = new Card(this.cards[0].number, this.cards[0].suit);
	var card = this.cards[0];
	this.cards = this.cards.splice(1,this.cards.length);
	return card;
}

Deck.prototype.shuffle = function() {
	this.cards.shuffle();
}


function drawDeck() { //For debugging purposes, show the current deck
	for (var i=0;i<game.deck.cards.length;i++) {
		var x = i * 10;
		var y = i % 13 * 20;
		y+=20;
		game.deck.cards[i].draw(x,y);
	}
}

Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return this;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
}