import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlockRoutingModule } from './flock-routing.module';
import { FlockComponent } from './flock.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FlockComponent],
  imports: [CommonModule, FlockRoutingModule, MatButtonModule],
})
export class FlockModule {}
