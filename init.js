import * as data from "./data.js"
import {Ball, BallSword} from "./ball.js"
import {Vec2} from "./vector.js"

export const init = () => {
	initStyle();
	initGame();
	initController();
}

const initGame = () => {
	data.objects.push(
		new BallSword(new Vec2(150, 150), 30, new Vec2(-10, -10), "blue")
	)
	console.log(data.objects);
}

const initStyle = () => {
	data.gameCanvas.width = data.canvasRect.width;
	data.gameCanvas.height = data.canvasRect.height;
	data.ctx.translate(0, data.gameCanvas.height);
	data.ctx.scale(1, -1);
}

const initController = () => {
	document.addEventListener("keyup", e => {
		if (e.code == "Space") data.CONFIG.tickPass = 1;
		if (e.code == "ArrowUp") {
			for (const obj of data.objects) {
				obj.weapon.range += 10;
			}
		}
	})
}