import { fabric } from 'fabric';
import { Vector } from '../vector/vector.model';
import { VehicleWrapper } from './vehicle-wrapper.model';

export class Vehicle {
  location: Vector;
  velocity: Vector;
  acceleration: Vector;

  maxSpeed: number;
  maxForce: number;
  r: number;

  width: number;
  height: number;

  static visibilityAngle: number = 60;

  constructor(x: number, y: number, width: number, height: number) {
    this.location = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.maxSpeed = 3.0;
    this.maxForce = 0.1;
    this.r = 3.0;

    this.width = width;
    this.height = height;
  }

  public setVelocity(velx: number, vely: number): void {
    this.velocity = new Vector(velx, vely);
  }

  public setRandomVelocity(): void {
    this.velocity = new Vector(
      this.getRandomIntInclusive(-1, 1),
      this.getRandomIntInclusive(-1, 1)
    );
  }

  public applyForce(force: Vector): void {
    this.acceleration.add(force);
  }

  public update(): void {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  public seek(target: Vector): void {
    const desired: Vector = Vector.sub(target, this.location);
    let steer: Vector;
    //desired.normalize();
    desired.mult(0.05);
    //desired.multiply(this.maxSpeed);

    steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  public search(target: Vector): Vector {
    const desired: Vector = Vector.sub(target, this.location);
    let steer: Vector;
    desired.normalize();
    desired.mult(this.maxSpeed);

    steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  public boundaries(height: number, width: number): void {
    let desired: Vector = null!;

    if (this.location.x < 50)
      desired = new Vector(this.maxSpeed, this.velocity.y);
    else if (this.location.x > width - 50)
      desired = new Vector(-this.maxSpeed, this.velocity.y);

    if (this.location.y < 50)
      desired = new Vector(this.velocity.x, this.maxSpeed);
    else if (this.location.y > height - 50)
      desired = new Vector(this.velocity.x, -this.maxSpeed);

    if (desired) {
      desired.normalize();
      desired.mult(this.maxSpeed);
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
    circle.mult(80);
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

  public seperate(vehicles: Array<VehicleWrapper>): Vector {
    const seperationDistance: number = 75;
    const sum: Vector = new Vector(0, 0);
    let steer: Vector = new Vector(0, 0);
    let count: number = 0;
    let diff: Vector;
    let d: number;

    for (const wrapper of vehicles) {
      d = Vector.dist(this.location, wrapper.vehicle.location);
      if (d > 0 && d < seperationDistance) {
        diff = Vector.sub(this.location, wrapper.vehicle.location);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        ++count;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      steer = Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
    }

    return steer;
  }

  public align(vehicles: Array<VehicleWrapper>): Vector {
    const neighbourDistance: number = 100;
    const sum: Vector = new Vector(0, 0);
    let count: number = 0;
    let steer: Vector;
    let d: number;

    for (const wrapper of vehicles) {
      d = Vector.dist(this.location, wrapper.vehicle.location);
      if (d > 0 && d < neighbourDistance) {
        sum.add(wrapper.vehicle.velocity);
        ++count;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);

      steer = Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return new Vector(0, 0);
    }
  }

  public cohesion(vehicles: Array<VehicleWrapper>): Vector {
    const neighbourDistance: number = 100;
    const sum: Vector = new Vector(0, 0);
    let count: number = 0;
    let d: number;

    for (const wrapper of vehicles) {
      d = Vector.dist(this.location, wrapper.vehicle.location);
      if (d > 0 && d < neighbourDistance && this.isVisible(wrapper)) {
        sum.add(wrapper.vehicle.location);
        ++count;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.search(sum);
    } else {
      return new Vector(0, 0);
    }
  }

  public isVisible(vehicle: VehicleWrapper): boolean {
    const vehicleFacing: Vector = vehicle.vehicle.velocity.clone();
    const vehiclePosition: Vector = vehicle.vehicle.location.clone();
    const position: Vector = this.location.clone();
    const v: Vector = Vector.sub(position, vehiclePosition);
    let theta: number;

    vehicleFacing.normalize();
    v.normalize();

    theta = Math.acos(Vector.dot(vehicleFacing, v));
    theta = (theta * 180) / Math.PI;

    return !(theta > Vehicle.visibilityAngle / 2);
  }

  public flock(vehicles: Array<VehicleWrapper>): void {
    const seperation: Vector = this.seperate(vehicles);
    const alignment: Vector = this.align(vehicles);
    const cohesion: Vector = this.cohesion(vehicles);
    seperation.mult(1.5);
    alignment.mult(1);
    cohesion.mult(1);
    this.applyForce(seperation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
