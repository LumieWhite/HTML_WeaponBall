import * as data from "./data.js"
import {Object, Ball} from "./object.js"
import {Vec2} from "./vector.js"

export const init = () => {
	initGame();
	initStyle();
	initController();
}

const initGame = () => {
	data.objects.push(
		new Ball(new Vec2(150, 140), 30, new Vec2(10, -5), "blue"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black"),
		new Ball(new Vec2(200, 200), 20, new Vec2(-4, -40), "black")
	)
	console.log(data.objects);
}

const initStyle = () => {
	data.gameCanvas.width = data.canvasRect.width;
	data.gameCanvas.height = data.canvasRect.height;
}

const initController = () => {
	document.addEventListener("keyup", e => {
		if (e.code == "Space") data.CONFIG.tickPass = 1;
	})
}