//ui.js

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