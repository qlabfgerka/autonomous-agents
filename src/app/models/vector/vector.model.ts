export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(v: Vector): void {
    this.y += v.y;
    this.x += v.x;
  }

  public subtract(v: Vector): void {
    this.y -= v.y;
    this.x -= v.x;
  }

  public mult(n: number): void {
    this.y *= n;
    this.x *= n;
  }

  public div(n: number): void {
    this.y /= n;
    this.x /= n;
  }

  public mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): void {
    const mag: number = this.mag();
    if (mag != 0) this.div(mag);
  }

  public limit(max: number): void {
    if (this.mag() > max * max) {
      this.normalize();
      this.mult(max);
    }
  }

  public heading(): number {
    return Math.atan2(this.y, this.x);
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public dist(vector: Vector): number {
    const dx: number = this.x - vector.x;
    const dy: number = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public setMag(mag: number): void {
    this.normalize();
    this.mult(mag);
  }

  public static sub(first: Vector, second: Vector): Vector {
    return new Vector(first.x - second.x, first.y - second.y);
  }

  public static add(first: Vector, second: Vector): Vector {
    return new Vector(first.x + second.x, first.y + second.y);
  }

  public static dist(first: Vector, second: Vector): number {
    const dx: number = first.x - second.x;
    const dy: number = first.y - second.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static dot(first: Vector, second: Vector): number {
    return first.x * second.x + first.y * second.y;
  }
}
