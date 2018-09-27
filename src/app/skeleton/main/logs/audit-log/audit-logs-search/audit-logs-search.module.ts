import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuditLogsSearchComponent } from './audit-logs-search.component';


@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuditLogsSearchComponent
  ],
  exports: [
    AuditLogsSearchComponent
  ]
} )
export class AuditLogsSearchModule {
}
