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
		new Ball(new Vec2(150, 100), 30, new Vec2(-15, -4), "blue")
	)
	console.log(data.objects);
}

const initStyle = () => {
	data.gameCanvas.width = data.canvasRect.width;
	data.gameCanvas.height = data.canvasRect.height;
}

const initController = () => {

}