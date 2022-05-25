import { Vector } from '../vector/vector.model';

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
    desired.normalize();
    //desired.multiply(0.05);
    desired.multiply(this.maxSpeed);

    steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  public display(triangle: fabric.Triangle): void {
    const theta: number = this.velocity.heading() + Math.PI / 2;
    triangle.top = this.location.y - this.height / 2;
    triangle.left = this.location.x - this.height / 2;
    triangle.rotate((theta * 180) / Math.PI);
  }
}
