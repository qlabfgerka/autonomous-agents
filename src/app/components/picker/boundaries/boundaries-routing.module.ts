import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoundariesComponent } from './boundaries.component';

const routes: Routes = [{ path: '', component: BoundariesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoundariesRoutingModule {}
