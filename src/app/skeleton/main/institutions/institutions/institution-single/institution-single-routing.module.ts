import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { InstitutionSingleComponent } from './institution-single.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionSingleComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class InstitutionSingleRoutingModule {
}
