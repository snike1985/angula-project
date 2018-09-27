import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { DeviceTypesComponent }     from './device-types.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceTypesComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceTypesRoutingModule { }
