import { Vector } from '../vector/vector.model';
import { fabric } from 'fabric';

export class Vehicle {
  location: Vector;
  velocity: Vector;
  acceleration: Vector;

  maxSpeed: number;
  maxForce: number;
  r: number;

  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.location = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.maxSpeed = 5.0;
    this.maxForce = 0.1;
    this.r = 3.0;

    this.width = width;
    this.height = height;
  }

  public setVelocity(velx: number, vely: number): void {
    this.velocity = new Vector(velx, vely);
  }

  public applyForce(force: Vector): void {
    this.acceleration.add(force);
  }

  public update(): void {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.multiply(0);
  }

  public seek(target: Vector): void {
    const desired: Vector = Vector.sub(target, this.location);
    let steer: Vector;
    //desired.normalize();
    desired.multiply(0.05);
    //desired.multiply(this.maxSpeed);

    steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  public boundaries(): void {
    let desired: Vector = null!;

    if (this.location.x < 50)
      desired = new Vector(this.maxSpeed, this.velocity.y);
    else if (this.location.x > this.width - 50)
      desired = new Vector(-this.maxSpeed, this.velocity.y);

    if (this.location.y < 50)
      desired = new Vector(this.velocity.x, this.maxSpeed);
    else if (this.location.y > this.height - 50)
      desired = new Vector(this.velocity.x, -this.maxSpeed);

    if (desired) {
      desired.normalize();
      desired.multiply(this.maxSpeed);
      const steer: Vector = Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  public wander(): void {
    const circle: Vector = this.velocity.clone();
    let offset: Vector;
    let target: Vector;
    let rand: number = this.getRandomArbitrary(0, 6.28319);
    let h: number = this.velocity.heading();
    circle.normalize();
    circle.multiply(80);
    circle.add(this.location);

    offset = new Vector(25 * Math.cos(rand + h), 25 * Math.sin(rand + h));
    target = Vector.add(circle, offset);
    this.seek(target);
  }

  public display(triangle: fabric.Triangle): void {
    const theta: number = this.velocity.heading() + Math.PI / 2;
    triangle.angle = (theta * 180) / Math.PI;
    triangle.top = this.location.y;
    triangle.left = this.location.x;
  }

  public borders(height: number, width: number): void {
    if (this.location.x > width) this.location.x = this.width;
    if (this.location.x < this.width) this.location.x = width;
    if (this.location.y > height) this.location.y = this.height;
    if (this.location.y < 0) this.location.y = height;
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
