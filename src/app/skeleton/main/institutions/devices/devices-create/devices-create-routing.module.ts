import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { DevicesCreateComponent } from './devices-create.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesCreateComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class DevicesCreateRoutingModule {
}
