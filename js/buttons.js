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

}