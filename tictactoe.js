// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var isFullScreen = false;
fitToContainer(canvas);

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  if(isFullScreen){
	  canvas.width = innerWidth;
	  canvas.height = innerHeight;
  }
  else{
	 canvas.style.width ='50%';
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = 400; 
  }
  
  
}

// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
var xPos;
var yPos;
var items = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7,8],
  [9,10]
];
addEventListener("mousemove", function(event) {
	var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
	var sizeX = canvas.width/3;
	var sizeY = canvas.height/3;
	var bx = mouse.x - (mouse.x % sizeX);
	var by = mouse.y - (mouse.y % sizeY);
	if((bx/sizeX) >= 0 && (bx/sizeX)<3 && by/sizeY>=0 && by/sizeY <3){
		console.log(items[(bx/sizeX)][(by/sizeY)]);
	}
});

addEventListener("resize", function() {
	fitToContainer(canvas);
	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Object(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
function init() {
	c.beginPath();
	c.moveTo(canvas.width/3,0);
	c.lineTo(canvas.width/3,canvas.height);	
	c.stroke();
	
	c.moveTo(canvas.width*(2/3),0);
	c.lineTo(canvas.width*(2/3),canvas.height);	
	c.stroke();
	
	c.moveTo(0,canvas.height/3);
	c.lineTo(canvas.width,canvas.height/3);	
	c.stroke();
	
	c.moveTo(0,canvas.height*(2/3));
	c.lineTo	(canvas.width,canvas.height*(2/3));
	c.stroke();
}
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	//c.clearRect(0, 0, canvas.width, canvas.height);
	
}

init();
animate();