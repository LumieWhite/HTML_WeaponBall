import {CONFIG} from "./data.js"
import * as data from "./data.js"

export const start = (t) => {
	if (!t) { 
		requestAnimationFrame(start)
		return;
	}
	CONFIG.accumulator += t - CONFIG.lastTime;
	let update = 0;
	while (CONFIG.accumulator >= CONFIG.dt && update++ <= CONFIG.maxUpdates) {
		tick();
		CONFIG.accumulator -= CONFIG.dt;
	}
	CONFIG.lastTime = t;
	requestAnimationFrame(start)
}

const tick = () => {

	clear();
	draw();
}

const clear = () => {
	data.ctx.clearRect(0, 0, data.gameCanvas.width, data.gameCanvas.height)
}

const draw = () => {
	for (const obj of data.objects) {
		obj.update();
		obj.handleBoundCollision();
		obj.handleCollision();
		obj.draw();
	}
}