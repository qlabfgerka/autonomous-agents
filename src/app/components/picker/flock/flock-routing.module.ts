import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlockComponent } from './flock.component';

const routes: Routes = [{ path: '', component: FlockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlockRoutingModule {}
