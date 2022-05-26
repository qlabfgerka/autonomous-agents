import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fabric } from 'fabric';
import { Vector } from 'src/app/models/vector/vector.model';
import { Vehicle } from 'src/app/models/vehicle/vehicle.model';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef<HTMLCanvasElement>;

  private fabricCanvas!: fabric.Canvas;
  private vehicle!: Vehicle;
  private triangle!: fabric.Triangle;
  private interval!: any;

  private readonly WIDTH: number = 25;
  private readonly HEIGHT: number = 50;
  private mousePosition!: fabric.Point;

  constructor() {}

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
    if (this.fabricCanvas) this.fabricCanvas.clear();
  }

  ngAfterViewInit(): void {
    this.fabricCanvas = new fabric.Canvas('canvas', {
      height: this.canvas.nativeElement.offsetHeight,
      width: this.canvas.nativeElement.offsetWidth,
    });

    this.fabricCanvas.on('mouse:down', (e) => {
      this.addTriangle(e.absolutePointer!.x!, e.absolutePointer!.y!);
    });

    this.fabricCanvas.on('mouse:move', (e) => {
      if (!this.mousePosition) return;

      this.mousePosition.x = e.absolutePointer?.x!;
      this.mousePosition.y = e.absolutePointer?.y!;
    });
  }

  ngOnInit(): void {}

  public addTriangle(x: number, y: number): void {
    this.clear();

    this.mousePosition = new fabric.Point(x, y);

    this.vehicle = new Vehicle(x, y, this.WIDTH, this.HEIGHT);
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
    });

    this.fabricCanvas.add(this.triangle);

    this.interval = setInterval(() => {
      this.vehicle.seek(new Vector(this.mousePosition.x, this.mousePosition.y));
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
