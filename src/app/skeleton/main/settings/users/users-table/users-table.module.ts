import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { UserRowModule }        from '../user-row/user-row.module';

import { UsersTableComponent }  from './users-table.component';


@NgModule({
  imports: [
    CommonModule,
    UserRowModule
  ],
  declarations: [
    UsersTableComponent
  ],
  exports: [
    UsersTableComponent
  ]
})
export class UsersTableModule { }
