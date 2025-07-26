const TPS = 60;

export const CONFIG = {
	lastTime: 0,
	accumulator: 0,
	tps: TPS,
	dt: 1/TPS,
	maxUpdates: 5,

	tickPass: -1
}

export let tickPass = false;

export const objects = [];

export const gameContainer = document.querySelector(".game-container");
export const gameCanvas = gameContainer.querySelector(".game-canvas");
export const gameContext = gameCanvas.getContext("2d");
export const ctx = gameContext;
export const canvasRect = gameCanvas.getBoundingClientRect();