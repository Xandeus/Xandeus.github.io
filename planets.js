var unit = 100;
var count;
var planets = [];
var G = .1;
var startMouseX=0, startMouseY=0,endMouseX=0,endMouseY=0;
var isDragging = false;
var scalingFactor = 10;
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  var wideCount = width / unit;
  var highCount = height / unit;
  count = wideCount * highCount;
/*
  var index = 0;
  for (var y = 0; y < highCount; y++) {
    for (var x = 0; x < wideCount; x++) {
      planets[index++] = new Module(x*unit, y*unit,0,0,0,0,10);
    }
  }
  */
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
	planets.push(new Module(startMouseX,startMouseY,0,0,0,0,mass
	,scalingFactor*dist(startMouseX, startMouseY,endMouseX,endMouseY)));
	isDragging = false;
}
function draw() {
  background(0);

  for (var i = 0; i < planets.length; i++) {
    planets[i].update();
    planets[i].draw();
  }
  if(isDragging){
	line(startMouseX, startMouseY,endMouseX, endMouseY);
	stroke(255);
  }
		
}


function Module(_x, _y, _xv,_yv,_xa,_ya,_m,_v) {
  this.x = _x;
  this.y = _y;
  this.xv = _xv;
  this.yv = _yv;
  this.xa = _xa;
  this.ya = _ya;
  this.m = _m;
  this.v = _v;
}

// Custom method for updating the variables
Module.prototype.update = function() {
  this.x += this.xv;
  this.y += this.yv;
  this.xv += this.xa;
  this.yv += this.ya;
  /*
  if(this.x > width || this.x < 0){
	  this.xv*=-1;
  }
  if(this.y > height || this.y < 0){
	  this.yv*=-1;
  }
  */
  //ac = GM/r2
  //this.xa = 
  //for (var i = 0; i < planets.length; i++) {
   // console.log(planets[i].m);
 // }
 var accSumX = 0,accSumY = 0;
 for (var i = 0; i < planets.length; i++) {
	var p = planets[i];
	if(p != this){
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
}

// Custom method for drawing the object
Module.prototype.draw = function() {
  fill(255);
  ellipse(this.x,this.y, this.v/scalingFactor, this.v/scalingFactor);
}