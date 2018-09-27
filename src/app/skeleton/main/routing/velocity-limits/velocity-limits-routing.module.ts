import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { VelocityLimitsComponent }    from './velocity-limits.component';

const routes: Routes = [
  {
    path: '',
    component: VelocityLimitsComponent,
    children: [
      {
        path: '',
        loadChildren: './velocity-limits-info/velocity-limits-info.module#VelocityLimitsInfoModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VelocityLimitsRoutingModule { }
