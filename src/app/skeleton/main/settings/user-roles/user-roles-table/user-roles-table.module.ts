import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';

import { UserRoleRowModule }       from '../user-role-row/user-role-row.module';
import { UserRolesTableComponent } from './user-roles-table.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoleRowModule
  ],
  declarations: [
    UserRolesTableComponent
  ],
  exports: [
    UserRolesTableComponent
  ]
})
export class UserRolesTableModule { }
