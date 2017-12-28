var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var background = new Image();
background.src = "images/background.png";
var background2 = new Image();
background2.src = "images/background2.png";
//http://www.publicdomainpictures.net/view-image.php?image=101536

var starship = new Image();
starship.src = "images/starfighter2.png";
//http://disney.wikia.com/wiki/File:X-wing_SWB.png
var tiefighter = new Image();
tiefighter.src = "images/tie.png";
//http://starwars.wikia.com/wiki/File:TIEfighter2-Fathead.png
var laser = new Image();
laser.src = "images/laser.png";
var bgX = 0;
var bgW = ctx.canvas.width;
var bgH = ctx.canvas.height;
var imageEnd = bgW;
var playerX = 0;
var playerY = 0;
function moveBG(){
	setInterval(function(){
		move();
		player(playerX, playerY);
	}, 40);	
}

function player(coordinateX, coordinateY){
	ctx.drawImage(starship, coordinateX, coordinateY);
}
window.onkeydown = function change(event){
	var key = event.which || event.keyCode;
		if(key == 87){	
			if(playerY > 0){
				playerY -= 80;
			}
		} else if(key == 83){
			if(playerY < 480){
				playerY += 80;
			}
		} else if(key == 68){
			if(playerX < 1000){
				playerX += 100;
			}
		} else if(key == 65){
			if(playerX > 0){
				playerX -=100;
			}
		} else if(key == 13){
			ctx.drawImage(laser, playerX + 40, playerY);
			ctx.drawImage(laser, playerX + 40, playerY + 50);
		}
}

function move(){
	ctx.clearRect(0, 0, bgW, bgH);
	ctx.drawImage(background, bgX, 0, imageEnd, bgH, 0, 0, imageEnd, bgH);
	ctx.drawImage(background, 0, 0, bgW, bgH, imageEnd, 0, bgW, bgH);
	bgX = (bgX + 1) % 1200;
	if(imageEnd < 2){
		imageEnd = 1200;
	} else {
		imageEnd -= 1;
	}
}
