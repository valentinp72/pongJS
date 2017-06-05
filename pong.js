const WIDTH  = 800;
const HEIGHT = 400;
const BAT_W  = 10;
const BAT_H  = 100;
const BAT_SPEED = 4;

let ball;
let leftBat, rightBat;

let scoreA = 0, scoreB = 0;

function setup(){
	createCanvas(WIDTH, HEIGHT);
	noStroke();
	fill(255);
	textSize(20);
	textFont("Arial");

	ball = new Ball();

	leftBat  = new Bat(5);
	rightBat = new Bat(WIDTH - 15);
}

function draw(){

	background(51);

	rect(0, 5, WIDTH, 10);
	rect(0, HEIGHT - 15, WIDTH, 10);

	rect((WIDTH - 5) / 2, 5, 5, HEIGHT - 15);

	text(scoreA, WIDTH / 2 - 50, 50);
	text(scoreB, WIDTH / 2 + 50, 50);


	leftBat.checkComputer();
	leftBat.display();

	rightBat.checkPlayer()
	rightBat.display();

	ball.speed += 0.001;
	ball.move();
	ball.display();
}

function Bat(x){
	this.x = x;
	this.y = (HEIGHT - BAT_H) / 2;


	this.limit = function(){
		if(this.y < 15)
			this.y = 15;
		else if(this.y + BAT_H > HEIGHT - 15)
			this.y = HEIGHT - BAT_H - 15;
	}

	this.checkPlayer = function(){
		if(keyIsDown(UP_ARROW)){
			this.y -= BAT_SPEED;
		}
		else if(keyIsDown(DOWN_ARROW)){
			this.y += BAT_SPEED;
		}

		this.limit();
	};

	this.checkComputer = function(){
		if(ball.x < WIDTH / 2){
			if(this.y + BAT_H / 2 > ball.y + 10){
				this.y -= BAT_SPEED;
			}
			else if(this.y + BAT_H / 2 < ball.y - 10){
				this.y += BAT_SPEED;
			}
			this.limit();
		}
	};

	this.display = function(){
		rect(this.x, this.y, BAT_W, BAT_H);
	};
}

function randomNegativePositive(){
	if(random(100) >= 50)
		return 1;
	return -1;
}

function Ball(){

	this.init = function(){
		this.x = WIDTH  / 2;
		this.y = HEIGHT / 2;
		this.r = 30;
		this.speed = 1;

		this.xVelocity = random(2, 3) * randomNegativePositive();
		this.yVeloxity = random(1, 4) * randomNegativePositive();
	};

	this.init();

	this.move = function(){
		if(this.y + this.r / 2 >= HEIGHT - 15){
			this.yVeloxity *= -1;
		}
		else if(this.y - this.r / 2 <= 15){
			this.yVeloxity *= -1;
		}
		else if(this.x + this.r / 2 >= WIDTH - 5 - BAT_W){
			var dist = this.y - rightBat.y;
			if(dist >= 0 && dist <= BAT_H){
				this.xVelocity *= -1;
			}
			else {
				scoreA += 1;
				this.init();
				return false;
			}
		}
		else if(this.x - this.r / 2 <= BAT_W + 5){
			var dist = this.y - leftBat.y;
			if(dist >= 0 && dist <= BAT_H){
				this.xVelocity *= -1;
			}
			else {
				scoreB += 1;
				this.init();
				return false;
			}
		}
		this.x += this.speed * this.xVelocity;
		this.y += this.speed * this.yVeloxity;
	};

	this.display = function(){
		ellipse(this.x, this.y, this.r);
	};

}
