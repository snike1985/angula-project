import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';

import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';

import { UserRolesInfoRoutingModule } from './user-roles-info-routing.module';
import { UserRolesInfoComponent }     from './user-roles-info.component';
import { UserRolesSearchModule }      from '../user-roles-search/user-roles-search.module';
import { UserRolesFilterModule }      from '../user-roles-filter/user-roles-filter.module';
import { UserRolesTableModule }       from '../user-roles-table/user-roles-table.module';

@NgModule({
  imports: [
    CommonModule,
    UserRolesFilterModule,
    UserRolesSearchModule,
    PerfectScrollbarModule,
    UserRolesTableModule,
    UserRolesInfoRoutingModule
  ],
  declarations: [
    UserRolesInfoComponent
  ]
})
export class UserRolesInfoModule { }
