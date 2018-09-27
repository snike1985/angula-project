import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScheduleSearchComponent } from './schedule-search.component';


@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScheduleSearchComponent
  ],
  exports: [
    ScheduleSearchComponent
  ]
} )
export class ScheduleSearchModule {
}
