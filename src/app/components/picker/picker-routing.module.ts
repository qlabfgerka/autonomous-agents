import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickerComponent } from './picker.component';

const routes: Routes = [
  {
    path: '',
    component: PickerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./basic/basic.module').then((m) => m.BasicModule),
      },
      {
        path: 'random',
        loadChildren: () =>
          import('./random/random.module').then((m) => m.RandomModule),
      },
      {
        path: 'boundaries',
        loadChildren: () =>
          import('./boundaries/boundaries.module').then(
            (m) => m.BoundariesModule
          ),
      },
      {
        path: 'flock',
        loadChildren: () =>
          import('./flock/flock.module').then((m) => m.FlockModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickerRoutingModule {}
