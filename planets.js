var unit = 100;
var count;
var planets = [];
var player;
var G = .01;
var startMouseX=0, startMouseY=0,endMouseX=0,endMouseY=0;
var isDragging = false;
var hit = false;
var isPause = false;
var acceleration = .1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new PhyiscsObject(width/2,height/2,0,0,0,0,1,5,"player");
}

function mousePressed() {
	startMouseX = mouseX;
	startMouseY = mouseY;
}
function mouseDragged(){
	isDragging = true;
	endMouseX = mouseX;
	endMouseY = mouseY;
}
function mouseReleased(){
	console.log("Mouse released");
	var mass = 	prompt("Enter a mass!");
	planets.push(new PhyiscsObject(startMouseX,startMouseY,0,0,0,0,mass
	,dist(startMouseX, startMouseY,endMouseX,endMouseY),"planet"));
	isDragging = false;
}
function draw() {
  background(0);

  for (var i = 0; i < planets.length; i++) {
	if(!isPause){
		planets[i].update();
	}
    planets[i].draw();
  }
  if(!isPause){
	player.update();
  }
  player.draw();
  if(isDragging){
	line(startMouseX, startMouseY,endMouseX, endMouseY);
	stroke(255);
  }	
}


function PhyiscsObject(_x, _y, _xv,_yv,_xa,_ya,_m,_v,_tag) {
  this.x = _x;
  this.y = _y;
  this.xv = _xv;
  this.yv = _yv;
  this.xa = _xa;
  this.ya = _ya;
  this.m = _m;
  this.v = _v;
  this.tag = _tag;
}

// Custom method for updating the variables
PhyiscsObject.prototype.update = function() {
 this.x += this.xv;
 this.y += this.yv;
 this.xv += this.xa;
 this.yv += this.ya;
 var accSumX = 0,accSumY = 0;
 var collide = false;
 for (var i = 0; i < planets.length; i++) {
	var p = planets[i];
	var collideP;
	if(p != this){
		if(collideCircleCircle(this.x, this.y,this.v, p.x, p.y, p.v)){
			collide = true;
			collideP = p;
		}
		if(this.x != p.x){
			if(this.x > p.x){
				accSumX -= G*p.m/dist(this.x,this.y,p.x,p.y);
			}
			else{
				accSumX += G*p.m/dist(this.x,this.y,p.x,p.y);
			}
		}
		if(this.y != p.y){
			if(this.y > p.y){
				accSumY -= G*p.m/dist(this.x,this.y,p.x,p.y);
			}
			else{
				accSumY += G*p.m/dist(this.x,this.y,p.x,p.y);
			}
		}
	}
 }
 this.xa = accSumX;
 this.ya = accSumY;
 //Applying collision force
 if(collide){
	 //<1 loses velocity
	 collideP.xv =  (this.m*this.xv + collideP.m*collideP.xv)/collideP.m;
	 collideP.yv =  (this.m*this.yv + collideP.m*collideP.yv)/collideP.m;

	 this.xv =0;
	 this.yv =0;
	 
 }
 if(this.x > width+10){
	 this.x = 0;
 }
 else if(this.x < -10){
	 this.x = width;
 }
 if(this.y > height+10){
	 this.y = 0;
 }
 else if(this.y < -10){
	 this.y = height;
 }
 console.log(player.x);
}

// Custom method for drawing the object
PhyiscsObject.prototype.draw = function() {
  fill(255);
  if(this.tag == "planet"){
	ellipse(this.x,this.y, this.v, this.v);
	fill(255);	
	text("Mass:"+this.m,this.x+(this.v/2),this.y+(this.v/2));
	
  }
  else{
	rect(this.x,this.y,this.v,this.v);
	
  }
  //W Key
  if(keyIsDown(87)){
	player.ya = -acceleration;
  }
  //S key
  if(keyIsDown(83)){
	player.ya = acceleration;
  }
  //A key
  if(keyIsDown(65)){
	  player.xa = -acceleration;
  }
  //D key
  if(keyIsDown(68)){
	  player.xa = acceleration;
  }  
}
//Pause the game
function keyPressed() {
  if (keyCode == 32) {
    isPause = !isPause;
  } 
}