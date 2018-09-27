import { NgModule }                  from '@angular/core';
import { UsersRoutingModule }        from './users-routing.module';
import { CommonModule }              from '@angular/common';

import { UsersComponent }            from './users.component';

import { UserRolesRequestsService }  from '../../../../services/main/settings/user-roles-requests.service';


@NgModule( {
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    UserRolesRequestsService
  ]
} )
export class UsersModule {}
