import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './random.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RandomComponent],
  imports: [CommonModule, RandomRoutingModule, MatButtonModule],
})
export class RandomModule {}
