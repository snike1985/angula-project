import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { LocationsInfoComponent } from './locations-info.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsInfoComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class LocationsInfoRoutingModule {
}
