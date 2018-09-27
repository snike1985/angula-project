import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from '../../../../../modules/highlight.module';

import { AccessLogRowComponent } from './access-log-row.component';


@NgModule( {
  imports: [
    CommonModule,
    HighlightModule
  ],
  declarations: [
    AccessLogRowComponent
  ],
  exports: [
    AccessLogRowComponent
  ]
} )
export class AccessLogRowModule {
}
