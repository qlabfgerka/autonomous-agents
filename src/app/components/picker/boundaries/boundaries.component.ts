import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle/vehicle.model';
import { fabric } from 'fabric';

@Component({
  selector: 'app-boundaries',
  templateUrl: './boundaries.component.html',
  styleUrls: ['./boundaries.component.scss'],
})
export class BoundariesComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef<HTMLCanvasElement>;

  private fabricCanvas!: fabric.Canvas;
  private vehicle!: Vehicle;
  private triangle!: fabric.Triangle;
  private interval!: any;

  private readonly WIDTH: number = 25;
  private readonly HEIGHT: number = 50;

  constructor() {}

  ngAfterViewInit(): void {
    this.fabricCanvas = new fabric.Canvas('canvas', {
      height: this.canvas.nativeElement.offsetHeight,
      width: this.canvas.nativeElement.offsetWidth,
    });

    this.fabricCanvas.on('mouse:down', (e) => {
      this.addTriangle(e.absolutePointer!.x!, e.absolutePointer!.y!);
    });
  }

  ngOnInit(): void {}

  public addTriangle(x: number, y: number): void {
    this.clear();

    this.vehicle = new Vehicle(x, y, this.WIDTH, this.HEIGHT);
    this.vehicle.setVelocity(3, -2);
    this.triangle = new fabric.Triangle({
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

    this.fabricCanvas.add(this.triangle);

    this.interval = setInterval(() => {
      this.vehicle.boundaries(
        this.fabricCanvas.height!,
        this.fabricCanvas.width!
      );
      this.vehicle.update();
      this.vehicle.display(this.triangle);
      this.fabricCanvas.renderAll();
    }, 10);
  }

  public clear(): void {
    if (this.interval) clearInterval(this.interval);
    this.fabricCanvas.clear();
  }
}
