//table.js

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
	ctx.font = "bold 30px Palatino Linotype";
	ctx.fillStyle="#333";
	ctx.fillText("Canvas BlackJack", 61, 124);
	ctx.fillStyle="#000";
	ctx.fillText("Canvas BlackJack", 60, 125);

	ctx.font = "normal 12px Palatino Linotype";
	ctx.fillText("By Lucas Penney", 60, 152);

	
	ctx.restore();

	ctx.drawImage(logo,650,25,125,175);

}