function updateGameArea() {
	myGameArea.clear();
	myGamePiece.newPos();
	myGamePiece.update();
}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function () {
		this.canvas.id = "myGameCanvas";
		this.canvas.width = window.innerWidth - 4; // -4 is becaouse of the canvas 2px border
		this.canvas.height = window.innerHeight - 4; // -4 is becaouse of the canvas 2px border
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

function component(width, height, speed, color, border_color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.speed = speed;
	// speed x & y components divided into x_right, x_left, y_up and y_down
	// to avoid lagging after quick key/diretion changes
	this.speed_x_r = 0;
	this.speed_x_l = 0;
	this.speed_y_u = 0;
	this.speed_y_d = 0;
	this.x = x;
	this.y = y;

	addEventListener("keydown", (e) => {
		switch (e.code) {
			case "ArrowRight":
				this.speed_x_r = speed;
				break;
			case "ArrowLeft":
				this.speed_x_l = -speed;
				break;
			case "ArrowUp":
				this.speed_y_u = speed;
				break;
			case "ArrowDown":
				this.speed_y_d = -speed;
				break;
		}
	});

	addEventListener("keyup", (e) => {
		switch (e.code) {
			case "ArrowRight":
				this.speed_x_r = 0;
				break;
			case "ArrowLeft":
				this.speed_x_l = 0;
				break;
			case "ArrowUp":
				this.speed_y_u = 0;
				break;
			case "ArrowDown":
				this.speed_y_d = 0;
				break;
		}
	});

	this.update = function () {
		ctx = myGameArea.context;
		ctx.save();
		ctx.shadowBlur = 7;
		ctx.shadowColor = "grey";
		ctx.fillStyle = color;
		ctx.translate(this.x, this.y);
		ctx.fillRect(
			this.width / -2,
			this.height / -2,
			this.width,
			this.height
		);
		ctx.strokeStyle = border_color;
		ctx.strokeRect(
			this.width / -2,
			this.height / -2,
			this.width,
			this.height
		);
		ctx.restore();
	};

	this.newPos = function () {
		ctx = myGameArea.context;

		// handle cases when player goes outside of visible area
		// appear on the other side of the screen
		if (this.x < 0 - this.width / 2)
			this.x = ctx.canvas.width + this.width / 2;
		else if (this.x > ctx.canvas.width + this.width / 2)
			this.x = 0 - this.width / 2;

		if (this.y < 0 - this.height / 2)
			this.y = ctx.canvas.height + this.height / 2;
		else if (this.y > ctx.canvas.height + this.height / 2)
			this.y = 0 - this.height / 2;

		// change position values
		this.x += this.speed_x_r;
		this.x += this.speed_x_l;
		this.y -= this.speed_y_u;
		this.y -= this.speed_y_d;
	};
}

var myGamePiece;
function startGame() {
	myGamePiece = new component(
		50,
		50,
		4,
		"red",
		"#880808",
		window.innerWidth / 2,
		window.innerHeight / 2
	);
	myGameArea.start();
}
