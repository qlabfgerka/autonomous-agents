import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlockRoutingModule } from './flock-routing.module';
import { FlockComponent } from './flock.component';


@NgModule({
  declarations: [
    FlockComponent
  ],
  imports: [
    CommonModule,
    FlockRoutingModule
  ]
})
export class FlockModule { }
