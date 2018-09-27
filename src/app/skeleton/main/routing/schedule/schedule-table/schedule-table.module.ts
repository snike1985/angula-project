import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleRowModule } from '../schedule-row/schedule-row.module';

import { ScheduleTableComponent } from './schedule-table.component';


@NgModule( {
  imports: [
    CommonModule,
    ScheduleRowModule
  ],
  declarations: [
    ScheduleTableComponent
  ],
  exports: [
    ScheduleTableComponent
  ]
} )
export class ScheduleTableModule {
}
