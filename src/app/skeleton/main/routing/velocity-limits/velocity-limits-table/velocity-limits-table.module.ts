import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityLimitsRowModule } from '../velocity-limits-row/velocity-limits-row.module';


import { VelocityLimitsTableComponent } from './velocity-limits-table.component';

@NgModule( {
  imports: [
    CommonModule,
    VelocityLimitsRowModule
  ],
  declarations: [
    VelocityLimitsTableComponent
  ],
  exports: [
    VelocityLimitsTableComponent
  ]
} )
export class VelocityLimitsTableModule {
}
