import { NgModule }                  from '@angular/core';
import {
  Routes,
  RouterModule
}                                    from '@angular/router';

import { UserRolesCreateComponent }  from './user-roles-create.component';


const routes: Routes = [
  {
    path: '',
    component: UserRolesCreateComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class UserRolesCreateRoutingModule {
}
