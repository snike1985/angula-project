import { NgModule } from '@angular/core';
import { RowModule } from '../../../../../modules/row.module';

import { ScheduleRowComponent } from './schedule-row.component';


@NgModule( {
  imports: [
    RowModule
  ],
  declarations: [
    ScheduleRowComponent
  ],
  exports: [
    ScheduleRowComponent
  ]
} )
export class ScheduleRowModule {
}
