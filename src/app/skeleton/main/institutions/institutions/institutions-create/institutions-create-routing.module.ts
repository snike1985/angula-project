import { NgModule }                    from '@angular/core';
import {
  Routes,
  RouterModule
}                                       from '@angular/router';
import { InstitutionsCreateComponent }  from './institutions-create.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsCreateComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class InstitutionsCreateRoutingModule {
}
