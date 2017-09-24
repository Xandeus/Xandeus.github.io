// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var isFullScreen = false;
var randomStart = 0;
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
addEventListener("mousemove", function(event) {
	var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
	var sizeX = canvas.width/3;
	var sizeY = canvas.height/3;
	var bx = mouse.x - (mouse.x % sizeX);
	var by = mouse.y - (mouse.y % sizeY);
	console.log(mouse.x + " " + mouse.y);
});

addEventListener("resize", function() {
	fitToContainer(canvas);
	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
	
	
}
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	//c.clearRect(0, 0, canvas.width, canvas.height);
	c.beginPath();
	c.lineWidth =randomIntFromRange(1,5);
	c.moveTo(randomIntFromRange(0,canvas.width),randomIntFromRange(0,canvas.height));
	c.lineTo(randomIntFromRange(0,canvas.width),randomIntFromRange(0,canvas.height));	
	c.strokeStyle = getRandomColor();
	c.stroke();
	c.closePath();	
}

init();
animate();