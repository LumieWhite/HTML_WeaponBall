export class Vec2 {
	constructor(x = 0, y = 0) {
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

	normalize() {
		return new Vec2(this.x / this.magnitude(), this.y / this.magnitude());
	}

	normal() {
		return new Vec2(-this.x, this.y);
	}

	magnitude() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	}

	clone() {
		return new Vec2(this.x, this.y);
	}

	rotate(deg) {

	}

	flip() {
		return this.multiply(-1);
	}

	rescale(scalar) {
		return this.normalize().multiply(scalar);
	}

	dot(vector) {
		return this.x * vector.x + this.y * vector.y
	}
}

export const getDistance = (v1, v2) => Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));

export const getProj = (v1, v2) => {
	// v1 on v2
	return v2.multiply(v1.dot(v2)/Math.pow(v2.magnitude(), 2));
}