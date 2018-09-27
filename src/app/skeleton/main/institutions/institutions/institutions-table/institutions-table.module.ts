import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionsRowModule } from '../institutions-row/institutions-row.module';

import { InstitutionsTableComponent } from './institutions-table.component';


@NgModule( {
  imports: [
    CommonModule,
    InstitutionsRowModule
  ],
  declarations: [
    InstitutionsTableComponent
  ],
  exports: [
    InstitutionsTableComponent
  ]
} )
export class InstitutionsTableModule {
}
