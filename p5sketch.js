var yoff;
var xPoint;
var yPoint;
var lineSize = 2;
var smoothness;
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  yoff = 0.0;
  smoothness = .1;
  reset();
}

function draw() {
  // Create an alpha blended background
  yoff = yoff + smoothness;
  n = noise(yoff) * width
  line(xPoint,yPoint,xPoint + lineSize, n);
  strokeWeight(2); 
  stroke(color(255-noise(yoff)*255, 255-noise(yoff)*255, 255-noise(yoff)*255, 255));
  if(xPoint < width){
	xPoint += lineSize;
	yPoint = n;
  }
  else{
	reset();
	console.log("reset");
  }
}
function mousePressed() {
  reset();
}
function reset(){
  clear();
  yPoint = height;
  xPoint = 0.0;	
}