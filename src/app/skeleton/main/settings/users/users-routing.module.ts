import { NgModule }        from '@angular/core';
import {
  Routes,
  RouterModule
}                          from '@angular/router';

import { UsersComponent }  from './users.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        loadChildren: './users-info/users-info.module#UsersInfoModule',
      },
      {
        path: 'create',
        loadChildren: './user-create/user-create.module#UserCreateModule',
      },
      {
        path: ':id/edit',
        loadChildren: './user-create/user-create.module#UserCreateModule',
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class UsersRoutingModule {
}
