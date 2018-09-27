import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogRowModule } from '../audit-log-row/audit-log-row.module';

import { AuditLogsTableComponent } from './audit-logs-table.component';


@NgModule( {
  imports: [
    CommonModule,
    AuditLogRowModule
  ],
  declarations: [
    AuditLogsTableComponent
  ],
  exports: [
    AuditLogsTableComponent
  ]
} )
export class AuditLogsTableModule {
}
