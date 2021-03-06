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

var gameOver = new Image();
gameOver.src = "images/gameover.png";

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
var life = 3;
var score = 0;
var gameStart = false;
var go;
var shoot = false;

//Keeps the background moving before game starts
var waitScreen = setInterval(function(){
	move();
	player(500, 200);
}, 45);	

//Resets the screen and starts the game
function start(){
	clearInterval(waitScreen);
	clearInterval(go);
	resetGame();
	interval();	
}

//Moves the background and all other ships, lasers
function interval(){
	go = setInterval(function(){
		move();
		player(playerX, playerY);
		enemy(state, enemyX, enemyY);
		if(shoot == true){
			ctx.drawImage(laser, playerX + 40, playerY);
			ctx.drawImage(laser, playerX + 40, playerY + 50);
			attack();
			shoot = false;
		}
	}, 45);
}

//Resets the game to the starting
function resetGame(){
	difficulty = 8;
	playerX = 0;
	playerY = 0;
	enemyX = 1120;
	enemyY = 0;
	gameStart = true;
	life = 3;
	score = 0;
	document.getElementById("lives").innerHTML = "Lives: " + life;
	document.getElementById("score").innerHTML = "Score: " + score;
}

//Draws the enemy ship and increases its speed based on score.
//Also causes a life to be lost when it reaches the other side.
function enemy(state, enemyX, enemyY){
	ctx.drawImage(state, enemyX, enemyY);
	if(enemyX <= 0){
		life--;
		document.getElementById("lives").innerHTML = "Lives: " + life;
		resetEnemy();
		if(life == 0){
			end();
		}
	} else {
		this.enemyX = enemyX - difficulty;
	}
}

//Draw the player
function player(coordinateX, coordinateY){
	ctx.drawImage(starship, coordinateX, coordinateY);
}

//Determinds which key is pressed by the user
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
		} else if(key == 75){
			shoot = true;
		} else if(key == 13){
			return false;
		}
	}
}

//Increases score and difficulty when a ship is destroyed.
//Draws a different animation
function destroy(){
	state = explosion;
	enemy(state, enemyX, enemyY);
	state = tieFighter;
	score += 500;
	document.getElementById("score").innerHTML = "Score: " + score;
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

//Determines whether or not an enemy should be destroyed
function attack(){
	if(enemyY == playerY && playerX <= enemyX){
		destroy();
		resetEnemy();
	}
}

//Enemy is reset back to the right side of the screen.
function resetEnemy(){
	random = Math.floor(Math.random()*7);
	if(random == 0){
		enemyY = 0;
	} else {
		enemyY = 80 * random;
	}
	enemyX = 1120;
}

//Draws the background continuously
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

//End screen when lost.
function end(){
	clearInterval(go);
	ctx.clearRect(0, 0, bgW, bgH);
	ctx.drawImage(gameOver, 0, 0);
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