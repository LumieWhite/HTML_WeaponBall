import {Vec2, getDistance, getProj} from "./vector.js";
import {ctx, CONFIG, gameCanvas, objects} from "./data.js";
import * as data from "./data.js"
import * as utils from "./utils.js";
import {Weapon, Sword} from "./weapon.js"

export class Ball {
	constructor(
			position = new Vec2(), 
			radius = 10, 
			velocity = new Vec2(), 
			color = "orange", 
			weapon = null
		) {
		this.position = position 
		this.color = color 
		this.velocity = velocity 
		this.radius = radius
		this.weapon = weapon
		this.health = data.DEFAULTS.health
	}

	tick() {
		if (this.weapon) utils.setOwnership(this, this.weapon);

		this.update();
		this.handleBoundCollision();
		this.handleCollision();
		this.draw();
	}

	update() {
		this.position = this.position.add(this.velocity.multiply(CONFIG.dt));
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black"
		ctx.stroke();
		ctx.closePath();

		ctx.save();

		ctx.translate(this.position.x, this.position.y);
		ctx.scale(1, -1);
		ctx.font = "20px Arial";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.health, 0, 0);

		ctx.restore();
	};

	getBounds() {
		return {
			left: this.position.add(new Vec2(-this.radius, 0)),
			right: this.position.add(new Vec2(this.radius, 0)),
			top: this.position.add(new Vec2(0, -this.radius)),
			bottom: this.position.add(new Vec2(0, this.radius))
		}
	}

	handleBoundCollision() {
		const bounds = this.getBounds();
		if (bounds.left.x < 0 || bounds.right.x > gameCanvas.width) {
			this.position.x = (this.position.x < gameCanvas.width / 2) ? this.radius : gameCanvas.width - this.radius;
			this.velocity.x *= -1;
		}
		if (bounds.top.y < 0 || bounds.bottom.y > gameCanvas.height) {
			this.position.y = (this.position.y < gameCanvas.height / 2) ? this.radius : gameCanvas.height - this.radius;
			this.velocity.y *= -1
		};
	}

	handleCollision() {
		for (const object of objects) {
			if (object == this) continue;
			const dist = getDistance(this.position, object.position)
			if (dist < this.radius + object.radius) {
			    const normal = this.position.subtract(object.position).normalize();

			    // 1. Penetration resolution
			    const penetrationDepth = this.radius + object.radius - dist;
			    const correction = normal.multiply(penetrationDepth / 2);

			    this.position = this.position.add(correction);
			    object.position = object.position.subtract(correction);

			    // 2. Velocity reflection (perfect elastic)
			    const relativeVelocity = this.velocity.subtract(object.velocity);
			    const sepVelocity = relativeVelocity.dot(normal);

			    // If already separating, no need to reflect
			    if (sepVelocity < 0) {
			        const impulse = normal.multiply(-sepVelocity);
			        this.velocity = this.velocity.add(impulse);
			        object.velocity = object.velocity.subtract(impulse);
			    }
			}

		}
	}
}

export class BallSword extends Ball {
	constructor(position = new Vec2(), radius = 10, velocity = new Vec2(), color = "orange") {
		super(position, radius, velocity, color, new Sword());
	}
}