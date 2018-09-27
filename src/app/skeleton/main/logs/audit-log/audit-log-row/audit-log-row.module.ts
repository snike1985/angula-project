import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from '../../../../../modules/highlight.module';

import { AuditLogRowComponent } from './audit-log-row.component';


@NgModule( {
  imports: [
    CommonModule,
    HighlightModule
  ],
  declarations: [
    AuditLogRowComponent
  ],
  exports: [
    AuditLogRowComponent
  ]
} )
export class AuditLogRowModule {
}
