import {Vec2} from "./vector.js"
import {ctx, CONFIG, gameCanvas} from "./data.js"

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
		if (bounds.left.x <= 0 || bounds.right.x >= gameCanvas.width) this.velocity.x *= -1;
		if (bounds.top.y <= 0 || bounds.bottom.y >= gameCanvas.height) this.velocity.y *= -1;
	}

	handleCollision() {

	}
}

export const isCollided = (obj1, obj2) => {
	// is Collided
}