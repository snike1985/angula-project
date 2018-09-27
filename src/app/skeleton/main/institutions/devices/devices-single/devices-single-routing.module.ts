import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { DevicesSingleComponent }     from './devices-single.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesSingleComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class DevicesSingleRoutingModule {
}
