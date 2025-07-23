export class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(vector) {
		return new Vec2(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector) {
		return new Vec2(this.x - vector.x, this.y - vector.y)
	}

	multiply(scalar) {
		return new Vec2(this.x * scalar, this.y * scalar);
	}

	divide(scalar) {
		return new Vec2(this.x / scalar, this.y / scalar);
	}

	normal() {
		return new Vec2(this.x / this.magnitude(), this.y / this.magnitude());
	}

	magnitude() {
		return Math.sqrt(pow(this.x, 2) + pow(this.y, 2))
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
}