import {weaponAttributes, ctx} from "./data.js"
import * as data from "./data.js"
import {Vec2} from "./vector.js";
import {toRad} from "./utils.js";
import * as utils from "./utils.js"

export class Weapon {
	constructor(master = null, {speed, range, damage, width} = {}) {
		this.master = master;
		this.speed = speed;
		this.range = range;
		this.damage = damage;
		this.width = width;
		this.position = new Vec2();
		this.angle = 0;
		this.rotationDirection = 1;
	}

	update() {
		this.position = this.master.position;
		this.angle = this.angle + this.speed;
	}

	draw() {
		ctx.save();

		ctx.translate(this.position.x, this.position.y);
		ctx.scale(-1, 1);
		ctx.rotate(toRad(this.angle));
		ctx.fillStyle = "red";
		ctx.drawImage(
			data.textures.sword,
			-this.width / 2, 
			-this.range - this.master.radius, 
			this.width, 
			this.range
		)

		ctx.restore();
	}

	getHitbox() {
		return {
			topLeft: utils.toRealCoords(new Vec2(-this.width / 2, -this.range - this.master.radius), this.position, this.angle),
			topRight: utils.toRealCoords(new Vec2(-this.width / 2 + this.width, -this.range - this.master.radius), this.position, this.angle),
			bottomLeft: utils.toRealCoords(new Vec2(-this.width / 2, -this.range - this.master.radius + this.range), this.position, this.angle),
			bottomRight: utils.toRealCoords(new Vec2(-this.width / 2 + this.width, -this.range - this.master.radius + this.range), this.position, this.angle),
		}
	}


	tick() {
		this.update();
		this.draw();
	}
}

export class Sword extends Weapon {
	constructor(master) {
		super(master, weaponAttributes.sword)
	}
}

export class Spear extends Weapon {
	constructor(master) {
		super(master, weaponAttributes.spear)
	}
}