import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, BasicRoutingModule, MatButtonModule],
})
export class BasicModule {}
