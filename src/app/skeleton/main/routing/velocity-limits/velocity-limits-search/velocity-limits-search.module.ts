import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VelocityLimitsSearchComponent } from './velocity-limits-search.component';


@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    VelocityLimitsSearchComponent
  ],
  exports: [
    VelocityLimitsSearchComponent
  ]
} )
export class VelocityLimitsSearchModule {
}
