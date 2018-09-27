import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { ScheduleFilterComponent } from './schedule-filter.component';


@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    ScheduleFilterComponent
  ],
  exports: [
    ScheduleFilterComponent
  ]
} )
export class ScheduleFilterModule {
}
