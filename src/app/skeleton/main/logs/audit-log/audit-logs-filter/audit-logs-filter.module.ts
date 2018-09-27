import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { AuditLogsFilterComponent } from './audit-logs-filter.component';


@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    AuditLogsFilterComponent
  ],
  exports: [
    AuditLogsFilterComponent
  ]
} )
export class AuditLogsFilterModule {
}
