import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoundariesRoutingModule } from './boundaries-routing.module';
import { BoundariesComponent } from './boundaries.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BoundariesComponent],
  imports: [CommonModule, BoundariesRoutingModule, MatButtonModule],
})
export class BoundariesModule {}
