import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { LocationsComponent } from './locations.component';


const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      {
        path: '',
        loadChildren: './locations-info/locations-info.module#LocationsInfoModule'
      },
      {
        path: 'create',
        loadChildren: './location-create/location-create.module#LocationCreateModule'
      },
      {
        path: ':id/edit',
        loadChildren: './location-create/location-create.module#LocationCreateModule'
      },
      {
        path: ':id',
        loadChildren: './location-single/location-single.module#LocationSingleModule'
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class LocationsRoutingModule {
}
