import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef<HTMLCanvasElement>;

  private fabricCanvas!: fabric.Canvas;

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
    this.fabricCanvas.add(
      new fabric.Rect({
        top: y - 50,
        left: x - 50,
        width: 100,
        height: 100,
        fill: 'red',
      })
    );
  }

  public clear(): void {
    this.fabricCanvas.clear();
  }
}
