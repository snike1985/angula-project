import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';

import { UserRolesRoutingModule }    from './user-roles-routing.module';
import { UserRolesComponent }        from './user-roles.component';

import { UserRolesRequestsService }  from '../../../../services/main/settings/user-roles-requests.service';
import { FunctionsService }          from '../../../../services/main/settings/functions.service';


@NgModule( {
  imports: [
    CommonModule,
    UserRolesRoutingModule
  ],
  declarations: [
    UserRolesComponent
  ],
  providers: [
    FunctionsService,
    UserRolesRequestsService
  ]
} )
export class UserRolesModule {}
