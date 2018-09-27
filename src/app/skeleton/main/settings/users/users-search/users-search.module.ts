import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';

import { UsersSearchComponent }  from './users-search.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersSearchComponent
  ],
  exports: [
    UsersSearchComponent
  ]
})
export class UsersSearchModule {
}
