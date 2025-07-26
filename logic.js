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
		if (CONFIG.tickPass != 0) tick();
		CONFIG.accumulator -= CONFIG.dt;
	}
	if (CONFIG.tickPass == 1) CONFIG.tickPass = 0;
	CONFIG.lastTime = t;
	requestAnimationFrame(start)
}

const tick = () => {
	clear()
	for (const obj of data.objects) {
		obj.update();
		obj.handleBoundCollision();
		obj.handleCollision();
		obj.draw();
	}
}

const clear = () => {
	data.ctx.clearRect(0, 0, data.gameCanvas.width, data.gameCanvas.height)
}
