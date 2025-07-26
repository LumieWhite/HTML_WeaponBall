import {Vec2, getDistance, getProj} from "./vector.js";
import {ctx, CONFIG, gameCanvas, objects} from "./data.js";
import * as utils from "./utils.js";

export class Object {
	constructor(position, velocity, color) {
		this.position = position ?? new Vec2(0, 0);
		this.color = color ?? "black";
		this.velocity = velocity ?? new Vec2(0, 0);
	}

	draw() {console.log("Drawn")};

	update() {
		this.position = this.position.add(this.velocity.multiply(CONFIG.dt));
	}

	handleBoundCollision() {console.log("Object type")}

	handleCollision() {console.log("Object type")}
}

export class Ball extends Object {
	constructor(position, radius, velocity, color) {
		super(position, velocity, color);
		this.radius = radius ?? 10;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	};

	getBounds() {
		return {
			left: this.position.clone().add(new Vec2(-this.radius, 0)),
			right: this.position.clone().add(new Vec2(this.radius, 0)),
			top: this.position.clone().add(new Vec2(0, -this.radius)),
			bottom: this.position.clone().add(new Vec2(0, this.radius))
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
				const penDepth = this.radius + object.radius - dist + 5;
				const penVecCollider = this.velocity.flip().rescale(penDepth / 2);
				const penVecTarget = object.velocity.flip().rescale(penDepth / 2);

				const normal = this.position.subtract(object.position).normalize();
				const relVel = this.velocity.subtract(object.velocity);
				const sepVel = relVel.dot(normal);
				const newSepVel = -sepVel;
				const sepVelVec = normal.multiply(newSepVel);

				this.position = this.position.add(penVecCollider);
				object.position = object.position.add(penVecTarget);

				this.velocity = this.velocity.add(sepVelVec);
				object.velocity = object.velocity.add(sepVelVec.multiply(-1))
			
				this.update();
				object.update();
			}
		}
	}
}

export const isCollided = (obj1, obj2) => {
	// is Collided
}