//cards.js

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
}