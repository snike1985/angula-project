import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { ReactiveFormsModule }       from '@angular/forms';

import { UserRolesSearchComponent }  from './user-roles-search.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserRolesSearchComponent
  ],
  exports: [
    UserRolesSearchComponent
  ]
})
export class UserRolesSearchModule { }
