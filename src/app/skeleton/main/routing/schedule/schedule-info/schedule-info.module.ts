import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleInfoRoutingModule } from './schedule-info-routing.module';
import { ScheduleInfoComponent } from './schedule-info.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ScheduleFilterModule } from '../schedule-filter/schedule-filter.module';
import { ScheduleSearchModule } from '../schedule-search/schedule-search.module';
import { ScheduleTableModule } from '../schedule-table/schedule-table.module';

@NgModule( {
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    ScheduleFilterModule,
    ScheduleSearchModule,
    ScheduleTableModule,
    ScheduleInfoRoutingModule
  ],
  declarations: [
    ScheduleInfoComponent
  ]
} )
export class ScheduleInfoModule {
}
