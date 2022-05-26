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

  public multiply(n: number): void {
    this.y *= n;
    this.x *= n;
  }

  public divide(n: number): void {
    this.y /= n;
    this.x /= n;
  }

  public mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): void {
    const mag: number = this.mag();
    if (mag != 0) this.divide(mag);
  }

  public limit(max: number): void {
    if (this.mag() > 10 * 10) {
      this.normalize();
      this.multiply(max);
    }
  }

  public heading(): number {
    return Math.atan2(this.y, this.x);
  }

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public static sub(first: Vector, second: Vector): Vector {
    return new Vector(first.x - second.x, first.y - second.y);
  }

  public static add(first: Vector, second: Vector): Vector {
    return new Vector(first.x + second.x, first.y + second.y);
  }
}
