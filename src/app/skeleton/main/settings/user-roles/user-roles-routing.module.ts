import { NgModule }            from '@angular/core';
import {
  Routes,
  RouterModule
}  from '@angular/router';

import { UserRolesComponent }  from './user-roles.component';

const routes: Routes = [
  {
    path: '',
    component: UserRolesComponent,
    children: [
      {
        path: '',
        loadChildren: './user-roles-info/user-roles-info.module#UserRolesInfoModule'
      },
      {
        path: 'create',
        loadChildren: './user-roles-create/user-roles-create.module#UserRolesCreateModule'
      },
      {
        path: ':id/edit',
        loadChildren: './user-roles-create/user-roles-create.module#UserRolesCreateModule'
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class UserRolesRoutingModule {
}
