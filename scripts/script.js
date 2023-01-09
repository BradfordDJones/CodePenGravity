console.log('Script start.');

let canvas;
let ctx;
let _counter = 1000000;

canvas = document.getElementById("_canvas");
counter = document.getElementById("_counter");
position = document.getElementById("_position");
velocity = document.getElementById("_velocity");
info = document.getElementById("_info");


ctx = canvas.getContext("2d");

class planet {
	constructor(_fillStyle, _strokeStyle, _x, _y, _radius, _lineWidth, _mass, _velX, _velY) {
		this.x = _x;
		this.y = _y;
		this.radius = _radius;
		this.lineWidth = _lineWidth;
		this.fillStyle = _fillStyle;
		this.strokeStyle = _strokeStyle;
		this.mass = _mass;

		this.velX = _velX;
		this.velY = _velY;
	}
	draw() {

		console.log('x:' + this.X() + ' y:' + this.Y());
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill()
	}

	getCoordinate(axis) {

	}

	move() {
			this.x += this.velX;
			this.y += this.velY;
	}

	VX = () => this.velX.toFixed(5);
	VY = () => this.velY.toFixed(5);
	X = () => this.x.toFixed(5);
	Y = () => this.y.toFixed(5);

	update() {
		planets.forEach(e => this.physics(e));
	}

	physics(obj2) {
		if (this !== obj2) {
			let d = this.getDistance(obj2);
			let f = (g * this.mass * obj2.mass) / Math.pow(d,2);
			let ang = this.getAngle(obj2);
			//info.value = ang + ":" + angMem;
			this.velX += Math.cos(ang*(Math.PI/180)) * f;
			this.velY += Math.sin(ang*(Math.PI/180)) * f;
//			info.value += this.name + ":"  + f;
			console.log('vx:' + this.VX() + ' vy:' + this.VY());
		}
	}

	getAngle(obj) {
		var dx = this.x - obj.x;
    	var dy = this.y - obj.y;

    	var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
    	var degree = theta * 180 / Math.PI; // [0, 180] then [-180, 0]; clockwise; 0° = east
    	if (degree < 0) degree += 360;      // [0, 360]; clockwise; 0° = east
    	return degree;
	}

	getDistance(obj2) {
		return Math.sqrt(Math.pow(this.x - obj2.x, 2) + Math.pow(this.y - obj2.y, 2));
	}
};

let g = 6.0e-5;

let planets = [
		new planet("#FFFF00", "#333300",	400, 100, 10, 2, 1100,  0.5,  0.0),
		new planet("#0000FF", "#111111",	700, 400, 10, 2, 1100,  0.0,  0.5),
		new planet("#00FFFF", "#111111",	400, 700, 10, 2, 1100, -0.5,  0.0),
		new planet("#FF0000", "#111111",	100, 400, 10, 2, 1100,  0.0, -0.5),
	]

/*
function doText() {
	counter.value = --_counter;

	position.value = planets.reduce((acc,p) => acc + "${p.name} (${p.X()},${p.Y()}) ","");

	velocity.value = planets.reduce((acc,p) => acc + "${p.name} (${p.VX()},${p.VY()}) ","");
}
*/

function step() {
	console.log(_counter);

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	planets.forEach(p => p.draw());
	planets.forEach(p => p.update());
	planets.forEach(p => p.move());
//	doText();
//	if (_counter-- > 0) {
//		console.log('pre raf');

		window.requestAnimationFrame(step);
//	}
}

console.log('Pre step.');

step();