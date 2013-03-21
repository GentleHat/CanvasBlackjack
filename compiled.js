AudioFX=function(){var f="0.4.0";var c=false,e=document.createElement("audio"),a=function(j){var i=e.canPlayType(j);return(i==="probably")||(i==="maybe")};if(e&&e.canPlayType){c={ogg:a('audio/ogg; codecs="vorbis"'),mp3:a("audio/mpeg;"),m4a:a("audio/x-m4a;")||a("audio/aac;"),wav:a('audio/wav; codecs="1"'),loop:(typeof e.loop==="boolean")}}var d=function(m,i,l){var k=document.createElement("audio");if(l){var j=function(){k.removeEventListener("canplay",j,false);l()};k.addEventListener("canplay",j,false)}if(i.loop&&!c.loop){k.addEventListener("ended",function(){k.currentTime=0;k.play()},false)}k.volume=i.volume||0.1;k.autoplay=i.autoplay;k.loop=i.loop;k.src=m;return k};var h=function(i){for(var j=0;j<i.length;j++){if(c&&c[i[j]]){return i[j]}}};var g=function(i){var k,j;for(k=0;k<i.length;k++){j=i[k];if(j.paused||j.ended){return j}}};var b=function(o,j,m){j=j||{};var i=j.formats||[],l=h(i),k=[];o=o+(l?"."+l:"");if(c){for(var p=0;p<(j.pool||1);p++){k.push(d(o,j,p==0?m:null))}}else{m()}return{audio:(k.length==1?k[0]:k),play:function(){var n=g(k);if(n){n.play()}},stop:function(){var r,q;for(r=0;r<k.length;r++){q=k[r];q.pause();q.currentTime=0}}}};b.version=f;b.supported=c;return b}();//sound.js

if (AudioFX.supported) {
  var shufflesound = AudioFX('sounds/cardshuffle', { formats: ['wav'], pool:2 });
  var cardsound = AudioFX('sounds/cardsound', { formats: ['wav'], pool:5 });
  var doublecardsound = AudioFX('sounds/cardsound2', { formats: ['wav'], pool:5 });
}
//buttons.js
var buttons;

function initButtons() {
	buttons = [

  		new Button(710, 450, 75, 20, "Bet 1", "game.player.addToBet(1);"),
  		new Button(710, 480, 75, 20, "Bet 10", "game.player.addToBet(10);"),
  		new Button(710, 510, 75, 20, "Bet 50", "game.player.addToBet(50);"),
  		new Button(710, 540, 75, 20, "Bet 100", "game.player.addToBet(100);"),
  		new Button(710, 570, 75, 20, "Clear", "game.player.clearBet();"),

  		new Button(580, 525, 70, 25, "Deal", "game.round.deal();"),

  		new Button(320,525, 70,25, "Hit", "game.player.hit();"),
  		new Button(420,525, 70,25, "Stand", "game.player.stand();")

  		//new Button(620, 450, 25, 25, "||", game.pause)
	];
}


//Button object
function Button(x,y,width,height,text,onclick) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.onclick = onclick;
	this.text = text;
	

	this.tryClick = function(clickx, clicky) {
		//console.log("Clicked button at" + this.x + " " + clicky);
    	if (clickx > this.x && clickx < (this.x + this.width)) {
    		if (clicky > this.y && clicky < (this.y + this.height)) {
    			eval(this.onclick);
	        }
    	}   
	}

	this.draw = function() {
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '13pt Lucida Sans Unicode';
		ctx.fillStyle = '#FFF';
		ctx.fillText(this.text, this.x+(this.width/2), this.y+(this.height/2));
	}
}

function drawButtons() {
	for (var i=0;i<buttons.length;i++) {
		var button = buttons[i];
		drawButton(button.x,button.y,button.width,button.height);
		buttons[i].draw();
	}
	
}


function drawButton(x,y,width,height) {
	ctx.fillStyle = '#393';
	ctx.roundRect(x-1,y-1,width+2,height+2,3)
	ctx.fill();
	ctx.roundRect(x,y,width,height,3);
	var grd = ctx.createLinearGradient(0, y, 0, y+height);
    // light blue
    grd.addColorStop(0, '#000');   
    // dark blue
    grd.addColorStop(1, '#333');
    ctx.fillStyle = grd;
    ctx.fill();

}//cards.js

var heart = "heart";
var spade = "spade";
var diamond = "diamond";
var club = "club";
var ace = "A";
var jack = "J";
var queen = "Q";
var king = "K";

function Card(number, suit) {
	this.number = number;
	this.suit = suit;
	this.x = 0;
	if (number > 0) this.x = number * 30;
	else if (number == ace) this.x = 0;
	else if (number == jack) this.x = 500;
	else if (number == queen) this.x = 530;
	else if (number == king) this.x = 560;
	this.y = 0;
	if (this.suit == heart) this.y = 1;
	else if (this.suit == spade) this.y = 150;
	else if (this.suit == club) this.y = 300;
	else if (this.suit == diamond) this.y = 450;
}

Card.prototype.draw = function(x,y) {
	drawCard(ctx, x, y, 75, this.number, this.suit); //60 - size value. 
}

Card.prototype.getValue = function() {
	//2 possible values because of aces? Hmm... 
}

function drawCard(context, x, y, size, number, suit) {

	var width = size;
	var height = size * 1.5;


	context.fillStyle = "#111";
	context.strokeStyle = "#111";
	context.roundRect(x-1,y-1,width+2,height+2,size/16);
	context.stroke();
	context.fill();

	context.fillStyle = "#FFF";
	context.strokeStyle = "#FFF";
	context.roundRect(x,y,width,height,size/16);
	context.stroke();
	context.fill();

	context.fillStyle = "#000";
	var fontsize = size / 4;
	ctx.font = "normal " + fontsize + "px Serif";
	//ctx.font = 'Italic 30px Sans-Serif';
    ctx.textAlign = 'center';
	ctx.textBaseline = 'center';
    fontsize = 0;
	context.fillText(number,x+(width/7),y+(height/6));
	context.fillText(number,x+(width-(width/7))-fontsize/2,y+(height-(height/6))+fontsize/2);

	//Draw suit
	if (suit == "heart") drawHeart(context, x+(width/2),y+(height/3), size/3, size/2);
	else if (suit == "spade") drawSpade(context, x+(width/2),y+(height/3), size/3, size/2);
	else if (suit == "club") drawClub(context, x+(width/2),y+(height/3), size/3, size/2);
	else if (suit == "diamond") drawDiamond(context, x+(width/2),y+(height/3), size/3, size/2);
}

function drawSpade(context, x, y, width, height){
    context.save();
    var bottomWidth = width * 0.7;
    var topHeight = height * 0.7;
    var bottomHeight = height * 0.3;
 
    context.beginPath();
    context.moveTo(x, y);
 
    // top left of spade          
    context.bezierCurveTo(
		x, y + topHeight / 2, // control point 1
    	x - width / 2, y + topHeight / 2, // control point 2
    	x - width / 2, y + topHeight // end point
    );
 
    // bottom left of spade
    context.bezierCurveTo(
		x - width / 2, y + topHeight * 1.3, // control point 1
    	x, y + topHeight * 1.3, // control point 2
    	x, y + topHeight // end point
    );
 
    // bottom right of spade
    context.bezierCurveTo(
		x, y + topHeight * 1.3, // control point 1
    	x + width / 2, y + topHeight * 1.3, // control point 2
    	x + width / 2, y + topHeight // end point
    );
 
    // top right of spade
    context.bezierCurveTo(
		x + width / 2, y + topHeight / 2, // control point 1
    	x, y + topHeight / 2, // control point 2
    	x, y // end point
    );
 
    context.closePath();
    context.fill();
 
    // bottom of spade
    context.beginPath();
    context.moveTo(x, y + topHeight);
    context.quadraticCurveTo(
		x, y + topHeight + bottomHeight, // control point
    	x - bottomWidth / 2, y + topHeight + bottomHeight // end point
    );
    context.lineTo(x + bottomWidth / 2, y + topHeight + bottomHeight);
    context.quadraticCurveTo(
		x, y + topHeight + bottomHeight, // control point
    	x, y + topHeight // end point
    );
    context.closePath();
    context.fillStyle = "black";
    context.fill();
    context.restore();
}
 
function drawHeart(context, x, y, width, height){
	context.save();
    context.beginPath();
	var topCurveHeight = height * 0.3;
    context.moveTo(x, y + topCurveHeight);
    // top left curve
    context.bezierCurveTo(
		x, y, 
		x - width / 2, y, 
		x - width / 2, y + topCurveHeight
	);
 
    // bottom left curve
    context.bezierCurveTo(
		x - width / 2, y + (height + topCurveHeight) / 2, 
		x, y + (height + topCurveHeight) / 2, 
		x, y + height
	);
 
    // bottom right curve
    context.bezierCurveTo(
		x, y + (height + topCurveHeight) / 2, 
		x + width / 2, y + (height + topCurveHeight) / 2, 
		x + width / 2, y + topCurveHeight
	);
 
    // top right curve
    context.bezierCurveTo(
		x + width / 2, y, 
		x, y, 
		x, y + topCurveHeight
	);
 
    context.closePath();
    context.fillStyle = "red";
    context.fill();
	context.restore();
}
 
function drawClub(context, x, y, width, height){
	context.save();
	var circleRadius = width * 0.3;
	var bottomWidth = width * 0.5;
	var bottomHeight = height * 0.35;
    context.fillStyle = "black";
 
    // top circle
    context.beginPath();
    context.arc(
		x, y + circleRadius + (height * 0.05), 
		circleRadius, 0, 2 * Math.PI, false
	);
    context.fill();
 
    // bottom right circle
    context.beginPath();
    context.arc(
		x + circleRadius, y + (height * 0.6), 
		circleRadius, 0, 2 * Math.PI, false
	);
    context.fill();
 
    // bottom left circle
    context.beginPath();
    context.arc(
		x - circleRadius, y + (height * 0.6), 
		circleRadius, 0, 2 * Math.PI, false
	);
    context.fill();
 
    // center filler circle
    context.beginPath();
    context.arc(
		x, y + (height * 0.5), 
		circleRadius / 2, 0, 2 * Math.PI, false
	);
    context.fill();
 
    // bottom of club
    context.moveTo(x, y + (height * 0.6));
    context.quadraticCurveTo(
		x, y + height, 
		x - bottomWidth / 2, y + height
	);
    context.lineTo(x + bottomWidth / 2, y + height);
    context.quadraticCurveTo(
		x, y + height, 
		x, y + (height * 0.6)
	);
    context.closePath();
    context.fill();
	context.restore();
}
 
function drawDiamond(context, x, y, width, height){
	context.save();
    context.beginPath();
    context.moveTo(x, y);
 
    // top left edge
    context.lineTo(x - width / 2, y + height / 2);
 
    // bottom left edge
    context.lineTo(x, y + height);
 
    // bottom right edge
    context.lineTo(x + width / 2, y + height / 2);
 
    // closing the path automatically creates
    // the top right edge
    context.closePath();
 
    context.fillStyle = "red";
    context.fill();
	context.restore();
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}//dealer.js

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
}//functions.js

Function.prototype.inherit = function(parent) {
  this.prototype = Object.create(parent.prototype);
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  //return this;
};


function getCurrentMs() {
	var date = new Date();
	var ms = date.getTime() / 1000;
	return ms;
}

function DegToRad(d) {
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}
//Prototype for drawing a rounded rectangle
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
var _canvas = document.getElementById('canvas');
var ctx = null;



var WIDTH = 800;
var HEIGHT = 600;
var VERSION = "1.0";

/* Loading */

var game = new Game();
initButtons();

//sounds
if (AudioFX.supported) {
  var shufflesound = AudioFX('sounds/cardshuffle', { formats: ['wav'], pool:2 });
  var cardsound = AudioFX('sounds/cardsound', { formats: ['wav'], pool:5 });
  var doublecardsound = AudioFX('sounds/cardsound2', { formats: ['wav'], pool:5 });
}


//HTML onLoad event - Loading the game
$(window).load(function() {
		//check whether browser supports getting canvas context
		if (_canvas && _canvas.getContext) {
			ctx = canvas.getContext('2d');
			// ... drawing here ...
			ctx.strokeStyle = "rgb(0,0,0)"
		}

		//Setup double buffering (_canvasBuffer)
		_canvas = document.getElementById('canvas');
		if (_canvas && _canvas.getContext) {
			ctx = _canvas.getContext('2d');
			_canvasBuffer = document.createElement('canvas');
			_canvasBuffer.width = _canvas.width;
			_canvasBuffer.height = _canvas.height;
			_canvasBufferContext = _canvasBuffer.getContext('2d');
		}
		//Finally call the game loop
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		loop();
	}
)


function Game() {
	this.started = true;
	this.gameover = false;
	this.player = new Player();
	this.dealer = new Dealer();
	this.deck = new Deck();
	this.round = new Round();
	this.ui = new UI();
}

Game.prototype.update = function() {
	this.round.update();
	if (this.round.over) {
		if (this.player.money == 0) {
			this.gameOver();
			return;
		}
		else this.round = new Round();
	}

}

Game.prototype.gameOver = function() {
	ctx.fillStyle = 'red';
	ctx.fillText("Game Over", WIDTH/2, HEIGHT/2);
	this.gameover = true;
}


/* Game Loop */

var frameTime = 0;
function loop()
{
	if (getCurrentMs() - frameTime > 0.064) {
		frameTime = getCurrentMs();
		draw();
		update();
		loop();
	}
	else setTimeout('loop()', 64);
}

function draw() {
	if (game.started) {
		drawTable();
		//drawDeck(); //debugging
		game.ui.draw();
		game.player.draw();
		game.dealer.draw();
		drawButtons();
	}
	else {

	}
	ctx.drawImage(_canvasBuffer, 0, 0); //Flip the buffer
}

function update() {
	if (game.started) {
		game.update();
	}
}

//input.js

/* Interactivity */

$(window).load(function() {
	window.addEventListener('keydown', handleKeyDown, true);
	window.addEventListener('keyup', handleKeyUp, true);
});

var keys = [];
function Mouse() {
	this.x = 0;
	this.y = 0;
}
var mouse = new Mouse();
//Disable browsers usual function of scrolling with up/down arrow keys
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40 && event.keyCode!=32}  

function handleKeyDown(evt) {
	keys[evt.keyCode] = true;
}
function handleKeyUp(evt) {
	keys[evt.keyCode] = false;
}

//Function for key bindings
function handleInteractions() {

}


//Mouse movement
$('#canvas').mousemove(function(e){
    mouse.x = e.pageX - this.offsetLeft,
    mouse.y = e.pageY - this.offsetTop
});

//Mouse clicks hook
$("#canvas").click(function(e){
   var parentOffset = $(this).offset(); 
   //or $(this).offset(); if you really just want the current element's offset
   var relX = e.pageX - parentOffset.left;
   var relY = e.pageY - parentOffset.top;

   	if (game.gameover) {
		game = new Game();
		return;
	}

   for (var i = 0; i < buttons.length; i++) {
	    var button = buttons[i];
	    button.tryClick(e.offsetX, e.offsetY);
	}


  
});




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
}//round.js

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
}//table.js

var logo = new Image();
logo.src = "images/blackjack.svg";

function drawTable() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,800,600);

	//Draw table shadow
	ctx.fillStyle = "#333";
	ctx.beginPath();
	ctx.arc(WIDTH/2, -320, 804, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
	//Draw table
	ctx.fillStyle = "#191";
	ctx.beginPath();
	ctx.arc(WIDTH/2, -320, 800, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();


	
	
	ctx.strokeStyle = "#CCC";
	ctx.roundRect((WIDTH/2)-200, 160, 400, 100, 10);
	ctx.stroke();
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#000";
	drawSpade(ctx, (WIDTH/2)-150,175, 50, 70);
	drawDiamond(ctx, (WIDTH/2)-50,175, 50, 70);
	ctx.stroke();
	drawClub(ctx, (WIDTH/2)+50,175, 50, 70);
	drawHeart(ctx, (WIDTH/2)+150,175, 50, 70);
	ctx.stroke();


	ctx.save();
	ctx.rotate(DegToRad(-30));
	ctx.font = "bold 36px Palatino Linotype";
	ctx.fillStyle="#333";
	ctx.fillText("BlackJack", 51, 154);
	ctx.fillStyle="#000";
	ctx.fillText("BlackJack", 50, 155);

	ctx.font = "normal 12px Palatino Linotype";
	ctx.fillText("By GentleHat.com", 50, 182);

	
	ctx.restore();

	ctx.drawImage(logo,650,25,125,175);

}//ui.js

function UI() {
	this.message = null;
}

UI.prototype.draw = function() {
	if (this.message != null) {
		ctx.fillStyle = "#000";
		ctx.textAlign = 'center';
		ctx.font = 'bold 20px Arial'
		ctx.fillText(this.message, (WIDTH/2), 283);
	}
	//drawCircle(20,20,20,"#66C")
	//drawCircle(20,20,18,"#224");
}

UI.prototype.setMessage = function(str) {
	this.message = str;
	setTimeout("game.ui.message=null;", 2000);
}


UI.prototype.clearMessage = function() {
	this.message = null;
}


function drawCircle(x,y,radius,color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
}