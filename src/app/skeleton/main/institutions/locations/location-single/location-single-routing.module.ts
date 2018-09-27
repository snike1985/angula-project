import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { LocationSingleComponent } from './location-single.component';

const routes: Routes = [
  {
    path: '',
    component: LocationSingleComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class LocationSingleRoutingModule {
}
