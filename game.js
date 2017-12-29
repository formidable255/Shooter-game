var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var background = new Image();
background.src = "images/background.png";

var starship = new Image();
starship.src = "images/starfighter.png";

var tieFighter = new Image();
tieFighter.src = "images/tie.png";

var laser = new Image();
laser.src = "images/laser.png";

var explosion = new Image();
explosion.src = "images/explosion.png";

var state = tieFighter;
var bgX = 0;
var bgW = ctx.canvas.width;
var bgH = ctx.canvas.height;
var imageEnd = bgW;
var playerX = 0;
var playerY = 0;
var enemyX = 1120;
var enemyY = 0;
var random;
var difficulty = 8;
var hp = 3;
var score = 0;
var gameStart = false;


var waitScreen = setInterval(function(){
	move();
	player(500, 200);
}, 45);	

function start(){
	clearInterval(waitScreen);
	gameStart = true;
	setInterval(function(){
		move();
		enemy(state, enemyX, enemyY);
		player(playerX, playerY);
	}, 45);	
}

function enemy(state, enemyX, enemyY){
	ctx.drawImage(state, enemyX, enemyY);
	if(enemyX <= 0){
		hp--;
		resetEnemy();
	} else {
		this.enemyX = enemyX - difficulty;
	}
}

function player(coordinateX, coordinateY){
	ctx.drawImage(starship, coordinateX, coordinateY);
}

window.onkeydown = function change(event){
	if(gameStart == true){
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
		} else if(key == 16){
			ctx.drawImage(laser, playerX + 40, playerY);
			ctx.drawImage(laser, playerX + 40, playerY + 50);
			attack();
		} else if(key == 13){
			return false;
		}
	}
}

function destroy(){
	state = explosion;
	enemy(state, enemyX, enemyY);
	state = tieFighter;
	score += 500;
	if(score == 1000){
		difficulty += 5;
	} else if(score == 3000){
		difficulty += 5;
	} else if(score == 5000){
		difficulty += 5;
	} else if(score == 7000){
		difficulty += 5;
	} else if(score == 9000){
		difficulty += 5;
	}
}

function attack(){
	if(enemyY == playerY && playerX <= enemyX){
		destroy();
		resetEnemy();
	}
}

function resetEnemy(){
	random = Math.floor(Math.random()*7);
	if(random == 0){
		enemyY = 0;
	} else {
		enemyY = 80 * random;
	}
	enemyX = 1120;
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



/**
canvas background retrieved from:
//http://www.publicdomainpictures.net/view-image.php?image=101536

starship retrieved from:
//http://disney.wikia.com/wiki/File:X-wing_SWB.png

tie fighter retrieved from:
//http://starwars.wikia.com/wiki/File:TIEfighter2-Fathead.png

background image retrieved from:
http://3dhdwallpaper.com/Dark_Colors_Background-wallpapers.html
*/