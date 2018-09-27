import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccessLogsSearchComponent } from './access-logs-search.component';


@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccessLogsSearchComponent
  ],
  exports: [
    AccessLogsSearchComponent
  ]
} )
export class AccessLogsSearchModule {
}
