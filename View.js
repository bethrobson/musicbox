function View(canvas) {
	this.canvas = canvas;
	this.clicks = [];
	this.frameRate = 1000 / 30;
	this.radius = 80;
}

View.prototype.handleClick = function(event) {
	var view = this;
	var x = event.x - view.canvas.offsetLeft;
	var y = event.y - view.canvas.offsetTop;
	var pos = view.clicks.push({x: x, y: y, iteration: 0});
	Audio.play(x%10);
	setInterval(function() {
		view.clicks[pos-1].iteration = 0; 
		Audio.play(x%10); 
	}, Audio.loopRate);
};

View.prototype.updateDisplay = function() {
	var view = this;
	var context = view.canvas.getContext("2d");
	context.clearRect(0, 0, view.canvas.width, view.canvas.height);
	context.fillStyle = 'black';
	context.fillRect(0, 0, view.canvas.width, view.canvas.height);

	for (var i = 0; i < view.clicks.length; i++) {
		var circle = view.clicks[i];
		if (circle.iteration > view.radius) continue;
		circle.iteration += 1;

		var alpha = .7;
		if (circle.iteration > (view.radius - 15)) {
			alpha = (view.radius - circle.iteration) / 10;
		}
		view.drawCircle(context, circle.x, circle.y, circle.iteration, alpha);
	}
};

View.prototype.drawCircle = function(context, x, y, size, alpha) {
	context.beginPath();
	context.arc(x, y, size, 0, 2*Math.PI);
	context.fillStyle = "rgba(" + x%256 + ", " + y%256  + ", " + (x * y % 256)+ " ," + alpha + ")"; // better way to create an rgba?
	context.fill();
};





