import {Vec2} from "./vector.js";
import {ctx} from "./data.js"

export const drawVector = (vec, org, magnifier = 1) => {
	ctx.beginPath();
	ctx.moveTo(org.x, org.y);
	ctx.lineTo(org.x + vec.x*magnifier, org.y + vec.y*magnifier);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.closePath();
}

