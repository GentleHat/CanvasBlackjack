
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

