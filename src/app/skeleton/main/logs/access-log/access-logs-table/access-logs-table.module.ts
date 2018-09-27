import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessLogRowModule } from '../access-log-row/access-log-row.module';

import { AccessLogsTableComponent } from './access-logs-table.component';


@NgModule( {
  imports: [
    CommonModule,
    AccessLogRowModule
  ],
  declarations: [
    AccessLogsTableComponent
  ],
  exports: [
    AccessLogsTableComponent
  ]
} )
export class AccessLogsTableModule {
}
