import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle/vehicle.model';
import { fabric } from 'fabric';
import { VehicleWrapper } from 'src/app/models/vehicle/vehicle-wrapper.model';

@Component({
  selector: 'app-flock',
  templateUrl: './flock.component.html',
  styleUrls: ['./flock.component.scss'],
})
export class FlockComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef<HTMLCanvasElement>;

  private fabricCanvas!: fabric.Canvas;
  private vehicles!: Array<VehicleWrapper>;
  private interval!: any;

  private readonly WIDTH: number = 25;
  private readonly HEIGHT: number = 50;

  constructor() {}

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
    if (this.fabricCanvas) this.fabricCanvas.clear();
  }

  ngAfterViewInit(): void {
    this.vehicles = new Array<VehicleWrapper>();
    this.fabricCanvas = new fabric.Canvas('canvas', {
      height: this.canvas.nativeElement.offsetHeight,
      width: this.canvas.nativeElement.offsetWidth,
    });

    this.fabricCanvas.on('mouse:down', (e) => {
      this.addTriangle(e.absolutePointer!.x!, e.absolutePointer!.y!);
    });

    this.interval = setInterval(() => {
      for (const wrapper of this.vehicles) {
        wrapper.vehicle.flock(this.vehicles);
        wrapper.vehicle.update();
        wrapper.vehicle.borders(
          this.fabricCanvas.height!,
          this.fabricCanvas.width!
        );
        wrapper.vehicle.display(wrapper.triangle);
        this.fabricCanvas.renderAll();
      }
    }, 10);
  }

  ngOnInit(): void {}

  public addTriangle(x: number, y: number): void {
    const vehicle = new Vehicle(x, y, this.WIDTH, this.HEIGHT);
    vehicle.setRandomVelocity();
    const triangle = new fabric.Triangle({
      top: y,
      left: x,
      width: this.WIDTH,
      height: this.HEIGHT,
      fill: 'red',
      selectable: false,
      originX: 'center',
      originY: 'top',
      centeredRotation: true,
      angle: 45,
    });
    this.vehicles.push(new VehicleWrapper(vehicle, triangle));

    this.fabricCanvas.add(this.vehicles[this.vehicles.length - 1].triangle);
  }

  public clear(): void {
    if (this.interval) clearInterval(this.interval);
    this.fabricCanvas.clear();
    this.vehicles = new Array<VehicleWrapper>();
  }
}
