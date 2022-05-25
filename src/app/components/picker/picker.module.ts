import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerRoutingModule } from './picker-routing.module';
import { PickerComponent } from './picker.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PickerComponent],
  imports: [CommonModule, PickerRoutingModule, MatButtonModule],
})
export class PickerModule {}
