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
	x: canvas.width / 2,
	y: canvas.height/ 2 
};

var mouseDown = {
	x: canvas.width,
	y: canvas.width
}

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
});
addEventListener("mousedown", function(event) {
	var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;  
	console.log("Mouse down at " + mouse.x + " " + mouse.y);
	mouseDown.x = mouse.x;
	mouseDown.y = mouse.y;
});
addEventListener("mouseup", function(event) {
	var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;    
	console.log("Mouse up at " + mouse.x + " " + mouse.y);   
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
function Arrow(x, y, length, color) {
	this.x = x;
	this.y = y;
	this.length = length;
	this.color = color;

	this.update = function() {
		if(mDown){
			
		}
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.moveTo(x,y);
		c.lineTo(x+length,y);
		c.stroke();
	};
}

var a;
// Implementation
function init() {
	a = new Arrow(100,100,10,'black');
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(300,150);
	c.stroke();
	c.rect(mouse.x-2.5,mouse.y-2.5,5,5);
	c.stroke();
	a.update();
}

init();
animate();