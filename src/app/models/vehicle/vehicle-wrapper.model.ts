import { Vehicle } from './vehicle.model';
import { fabric } from 'fabric';
import { Vector } from '../vector/vector.model';

export class VehicleWrapper {
  vehicle: Vehicle;
  triangle: fabric.Triangle;

  constructor(vehicle: Vehicle, triangle: fabric.Triangle) {
    this.vehicle = vehicle;
    this.triangle = triangle;
  }
}
