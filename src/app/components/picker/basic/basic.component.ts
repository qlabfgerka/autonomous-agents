import {
  AfterViewInit,
  Component,
  ElementRef,
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
export class BasicComponent implements OnInit, AfterViewInit {
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

    this.fabricCanvas.on('mouse:move', (e) => {
      if (!this.vehicle) return;
      if (this.interval) clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.vehicle.seek(
          new Vector(e.absolutePointer?.x!, e.absolutePointer?.y!)
        );
        this.vehicle.update();
        this.vehicle.display(this.triangle);
        this.updateTriangle();
      }, 10);
    });
  }

  ngOnInit(): void {}

  public addTriangle(x: number, y: number): void {
    this.clear();

    this.vehicle = new Vehicle(x, y, this.WIDTH, this.HEIGHT);
    this.triangle = new fabric.Triangle({
      top: y - this.HEIGHT / 2,
      left: x - this.WIDTH / 2,
      width: this.WIDTH,
      height: this.HEIGHT,
      fill: 'red',
    });

    this.fabricCanvas.add(this.triangle);
  }

  public clear(): void {
    if (this.interval) clearInterval(this.interval);
    this.fabricCanvas.clear();
  }

  private updateTriangle(): void {
    this.fabricCanvas.add(this.triangle);
  }
}
