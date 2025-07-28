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

export const drawPoint = vec => {
	ctx.beginPath();
	ctx.arc(vec.x, vec.y, 5, 0, 2*Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

export const drawHitbox = box => {
	ctx.beginPath();
	ctx.moveTo(...box.topLeft.unpack());
	ctx.lineTo(...box.topRight.unpack());
	ctx.lineTo(...box.bottomRight.unpack());
	ctx.lineTo(...box.bottomLeft.unpack());
	ctx.lineTo(...box.topLeft.unpack());
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.closePath();
}

export const setOwnership = (master, weapon) => {
	master.weapon = weapon;
	weapon.master = master;
}

export const toRad = deg => deg*Math.PI / 180;

export const toRealCoords = (coords, origin, angleDeg) => {
	const angle = toRad(angleDeg);
	const realCoords = new Vec2(
		coords.x * Math.cos(angle) - coords.y * Math.sin(angle),
		coords.x * Math.sin(angle) + coords.y * Math.cos(angle)
	)
	realCoords.x = -realCoords.x + origin.x;
	realCoords.y = realCoords.y + origin.y;
	return realCoords;
}