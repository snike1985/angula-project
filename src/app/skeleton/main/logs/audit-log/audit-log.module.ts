import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogsRoutingModule } from './audit-logs-routing.module';
import { AuditLogsTableModule } from './audit-logs-table/audit-logs-table.module';
import { AuditLogsFilterModule } from './audit-logs-filter/audit-logs-filter.module';
import { AuditLogsSearchModule } from './audit-logs-search/audit-logs-search.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuditLogComponent } from './audit-log.component';

import { ObjectTypesService } from '../../../../services/object-types.service';


@NgModule( {
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    AuditLogsTableModule,
    AuditLogsFilterModule,
    AuditLogsSearchModule,
    AuditLogsRoutingModule
  ],
  declarations: [
    AuditLogComponent
  ],
  providers: [
    ObjectTypesService
  ]
} )
export class AuditLogModule {
}
