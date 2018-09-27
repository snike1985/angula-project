import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { UserRolesInfoComponent }   from './user-roles-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserRolesInfoComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class UserRolesInfoRoutingModule { }
