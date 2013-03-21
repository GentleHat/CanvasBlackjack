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




