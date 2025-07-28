const TPS = 60;

export const CONFIG = {
	lastTime: 0,
	accumulator: 0,
	tps: TPS,
	dt: 1/TPS,
	maxUpdates: 5,

	tickPass: -1
}

export const DEFAULTS = {
	health: 100
}

export let tickPass = false;

export const objects = [];

const swordTexture = new Image();
swordTexture.src = "sword.png";

export const textures = {
	sword: swordTexture
}

export const weaponAttributes = {
	sword: {
		speed: 0.1,
		range: 60,
		damage: 10,
		width: 20
	},
	spear: {
		speed: 5,
		range: 60,
		damage: 10,
		width: 50
	}
}

export const gameContainer = document.querySelector(".game-container");
export const gameCanvas = gameContainer.querySelector(".game-canvas");
export const gameContext = gameCanvas.getContext("2d");
export const ctx = gameContext;
export const canvasRect = gameCanvas.getBoundingClientRect();