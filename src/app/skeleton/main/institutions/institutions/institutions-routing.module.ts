import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { InstitutionsComponent } from './institutions.component';


const routes: Routes = [
  {
    path: '',
    component: InstitutionsComponent,
    children: [
      {
        path: '',
        loadChildren: './institutions-info/institutions-info.module#InstitutionsInfoModule'
      },
      {
        path: 'create',
        loadChildren: './institutions-create/institutions-create.module#InstitutionsCreateModule'
      },
      {
        path: ':id/edit',
        loadChildren: './institutions-create/institutions-create.module#InstitutionsCreateModule'
      },
      {
        path: ':id',
        loadChildren: './institution-single/institution-single.module#InstitutionSingleModule'
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class InstitutionsRoutingModule {
}
