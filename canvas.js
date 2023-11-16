function updateGameArea() {
	myGameArea.clear();
	myGamePiece.newPos();
	myGamePiece.update();
}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function () {
		this.canvas.id = "myGameCanvas";
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
	},
	stop: function () {
		clearInterval(this.interval);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};

function component(width, height, color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.speed_x = 2;
	this.speed_y = 2;
	this.x = x;
	this.y = y;

	this.update = function () {
		ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.fillStyle = color;
		ctx.fillRect(
			this.width / -2,
			this.height / -2,
			this.width,
			this.height
		);
		ctx.restore();
	};

	this.newPos = function () {
		if (this.x - this.width / 2 < 0) this.speed_x = 2;
		else if (this.x + this.width / 2 >= myGameArea.context.canvas.width)
			this.speed_x = -2;

		if (this.y - this.height / 2 < 0) this.speed_y = -2;
		else if (this.y + this.height / 2 >= myGameArea.context.canvas.height)
			this.speed_y = 2;

		this.x += this.speed_x;
		this.y -= this.speed_y;
	};
}

var myGamePiece;
function startGame() {
	myGamePiece = new component(30, 30, "#FFD369", 150, 150);
	myGameArea.start();
}

startGame();
