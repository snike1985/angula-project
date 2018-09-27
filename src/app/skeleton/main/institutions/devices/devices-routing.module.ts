import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesComponent }     from './devices.component';


const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    children: [
      {
        path: '',
        loadChildren: './devices-info/devices-info.module#DevicesInfoModule'
      },
      {
        path: 'create',
        loadChildren: './devices-create/devices-create.module#DevicesCreateModule'
      },
      {
        path: ':id/edit',
        loadChildren: './devices-create/devices-create.module#DevicesCreateModule'
      },
      {
        path: ':id',
        loadChildren: './devices-single/devices-single.module#DevicesSingleModule'
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class DevicesRoutingModule {
}
